"use strict"


/*
Example data
------------
*/

// todo: revise
var exampleData = `
{
  "assetClasses": [
    {
      "name": "US Bond",
      "allocation": "20",
      "notes": "BND, FBIDX, ..."
    },
    {
      "name": "US Stock",
      "allocation": "56",
      "notes": "VTI, FSTMX, ..."
    },
    {
      "name": "ex-US Stock",
      "allocation": "24",
      "notes": "VXUS, FSGUX, ..."
    }
  ],
  "accounts": [
    {
      "name": "401 (k)",
      "balance": "12000",
      "notes": "Tax deferred"
    },
    {
      "name": "HSA",
      "balance": "4000",
      "notes": "No taxes on healthcare"
    },
    {
      "name": "Roth IRA",
      "balance": "7000",
      "notes": "No taxes on growth"
    },
    {
      "name": "Taxable brokerage acct",
      "balance": "2000",
      "notes": null
    }
  ]
}
`


/*
Utility functions
-----------------
*/


function clearState() {
    viewModel.assetClassesInefficient([]);
    viewModel.assetClassesCredit([]);
    viewModel.assetClassesEfficient([]);
    viewModel.accountsTaxable([]);
    viewModel.accountsDeferred([]);
    viewModel.accountsFree([]);
}

function getStateAsUrl() {
    return window.location.pathname + "#" + encodeURI(ko.toJSON(viewModel, stripExtraViewModelData));
}

function saveState() {
    $('#save-complete-prompt').hide("easeOutQuart");
    $('#save-link').attr("href", getStateAsUrl());
    $('#save-complete-prompt').show("easeOutQuart");
}

function loadState(portfolioJSON) {
    var portfolioData = JSON.parse(portfolioJSON);

    clearState();

    portfolioData.assetClassesInefficient.forEach(function(assetClass) {
        addInefficientAssetClass(assetClass.name, assetClass.allocation, assetClass.notes);
    });
    portfolioData.assetClassesCredit.forEach(function(assetClass) {
        addCreditAssetClass(assetClass.name, assetClass.allocation, assetClass.notes);
    });
    portfolioData.assetClassesEfficient.forEach(function(assetClass) {
        addEfficientAssetClass(assetClass.name, assetClass.allocation, assetClass.notes);
    });


    portfolioData.accountsTaxable.forEach(function(account) {
        addTaxableAccount(account.name, account.balance, account.notes);
    });
    portfolioData.accountsDeferred.forEach(function(account) {
        addDeferredAccount(account.name, account.balance, account.notes);
    });
    portfolioData.accountsFree.forEach(function(account) {
        addFreeAccount(account.name, account.balance, account.notes);
    });
}

function loadFromCurrentUrl() {
    clearState();
    if(window.location.hash) {
        loadState(decodeURI(window.location.hash.substring(1)));
    }
}

function clearCurrentStateAndUrl() {
    clearState();
    window.location.hash = '';
}

function stripExtraViewModelData(key, value) {
    switch(key) {
        case 'parentCollection':
        case 'remainder':
        case 'percentAllocated':
        case 'totalAccountBalance':
        case 'computedAllocationHeaders':
        case 'computedAllocation':
            return;
        default:
            return value;
    }
}

function moveElementUp(observableArray, index) {
    var start = index - 1;
    var numReplaced = 2;

    if (index > 0) {
        var rawArray = observableArray();
        var priorElement = rawArray[index - 1];
        var movedElement = rawArray[index];
        observableArray.splice(start, numReplaced, movedElement, priorElement);
    }
}

function moveElementDown(observableArray, index) {
    var start = index;
    var numReplaced = 2;
    
    if (index < (observableArray().length - 1)) {
        var rawArray = observableArray();
        var nextElement = rawArray[index + 1];
        var movedElement = rawArray[index];
        observableArray.splice(start, numReplaced, nextElement, movedElement);
    }
}

function arrayOfNulls(length) {
    return new Array(length).map(function() {})
}


/*
Key classes
-----------
*/


class assetClass {
    constructor(name, allocation, notes, parentCollection) {
        this.name = ko.observable(name);
        this.allocation = ko.observable(parseFloat(allocation));
        this.remainder = this.readAllocation();
        this.notes = ko.observable(notes);
        this.parentCollection = parentCollection;

        this.allocation.subscribe(computePercentAllocated);
        this.allocation.subscribe(computeAssetAllocation);
    }

    remove() {
        this.parentCollection.remove(this);
    }

    readAllocation() {
        return this.allocation() ? parseFloat(this.allocation()) : 0;
    }

    resetRemainder() {
        this.remainder = this.readAllocation() / 100 * viewModel.totalAccountBalance();
    }

    getIndex() {
        return this.parentCollection.indexOf(this);
    }

    moveUp() {
        moveElementUp(this.parentCollection, this.getIndex());
    }
    moveDown(){
        moveElementDown(this.parentCollection, this.getIndex());
    }

    toJSON() {
        var noCircularReference = ko.toJS(this);
        delete noCircularReference.parentCollection;
        return noCircularReference;
    }
}

class account {
    constructor(name, balance, notes, parentCollection) {
        this.name = ko.observable(name);
        this.balance = ko.observable(parseFloat(balance));
        this.remainder = this.balance();
        this.notes = ko.observable(notes);
        this.parentCollection = parentCollection;

        this.balance.subscribe(computeTotalAccountBalance);
        this.balance.subscribe(computeAssetAllocation);
    }

    remove() {
        this.parentCollection.remove(this);
    }

    readBalance() {
        return this.balance() ? parseFloat(this.balance()) : 0;
    }

    resetRemainder() {
        this.remainder = this.readBalance();
    }


    getIndex() {
        return this.parentCollection.indexOf(this);
    }

    moveUp() {
        moveElementUp(this.parentCollection, this.getIndex());
    }
    moveDown(){
        moveElementDown(this.parentCollection, this.getIndex());
    }

    toJSON() {
        var noCircularReference = ko.toJS(this);
        delete noCircularReference.parentCollection;
        return noCircularReference;
    }
}


/*
View model and view model manipulation functions
--------------------------------------------------------
*/


function AppViewModel() {
    this.assetClassesInefficient = ko.observableArray([]);
    this.assetClassesCredit = ko.observableArray([]);
    this.assetClassesEfficient = ko.observableArray([]);
    this.accountsTaxable = ko.observableArray([]);
    this.accountsDeferred = ko.observableArray([]);
    this.accountsFree = ko.observableArray([]);

    this.newInefficientAssetClass = function() { addInefficientAssetClass(null, null, null); };
    this.newCreditAssetClass = function() { addCreditAssetClass(null, null, null); };
    this.newEfficientAssetClass = function() { addEfficientAssetClass(null, null, null); };
    this.newTaxableAccount = function() { addTaxableAccount(null, null, null); };
    this.newDeferredAccount = function() { addDeferredAccount(null, null, null); };
    this.newFreeAccount = function() { addFreeAccount(null, null, null); };
    
    this.percentAllocated = ko.observable(0);
    this.totalAccountBalance = ko.observable(0);

    this.computedAllocationHeaders = ko.observableArray([]);
    this.computedAllocation = ko.observableArray([]);
}

var viewModel = new AppViewModel();

function addInefficientAssetClass(name, allocation, notes) {
    viewModel.assetClassesInefficient.push(new assetClass(name, allocation, notes, viewModel.assetClassesInefficient));
}

function addCreditAssetClass(name, allocation, notes) {
    viewModel.assetClassesCredit.push(new assetClass(name, allocation, notes, viewModel.assetClassesCredit));
}

function addEfficientAssetClass(name, allocation, notes) {
    viewModel.assetClassesEfficient.push(new assetClass(name, allocation, notes, viewModel.assetClassesEfficient));
}

function addTaxableAccount(name, balance, notes) {
    viewModel.accountsTaxable.push(new account(name, balance, notes, viewModel.accountsTaxable));
}

function addDeferredAccount(name, balance, notes) {
    viewModel.accountsDeferred.push(new account(name, balance, notes, viewModel.accountsDeferred));
}

function addFreeAccount(name, balance, notes) {
    viewModel.accountsFree.push(new account(name, balance, notes, viewModel.accountsFree));
}

function allAssetsView() {
    return viewModel.assetClassesInefficient().concat(viewModel.assetClassesCredit(), viewModel.assetClassesEfficient());
}

function allAccountsView() {
    return viewModel.accountsTaxable().concat(viewModel.accountsDeferred(), viewModel.accountsFree());
}

function assetCount() {
    return viewModel.assetClassesInefficient().length + viewModel.assetClassesCredit().length + viewModel.assetClassesEfficient().length;
}

function accountCount() {
    return viewModel.accountsTaxable().length + viewModel.accountsDeferred().length + viewModel.accountsFree().length;
}

function computePercentAllocated() {
    viewModel.percentAllocated(0);
    allAssetsView().forEach(function(assetClass){
        viewModel.percentAllocated(viewModel.percentAllocated() + assetClass.readAllocation());
    });
}

function computeTotalAccountBalance() {
    viewModel.totalAccountBalance(0);
    allAccountsView().forEach(function(account){
        viewModel.totalAccountBalance(viewModel.totalAccountBalance() + account.readBalance());
    });
}

function resetRemainderTracking() {
    allAssetsView().forEach(function(element) { element.resetRemainder(); });
    allAccountsView().forEach(function(element) { element.resetRemainder(); });
}


/*
The asset allocation calculator
-------------------------------
*/


function computeAssetAllocation() {
    resetRemainderTracking();

    viewModel.computedAllocationHeaders(['']);
    allAssetsView().forEach(function(assetClass) {
        viewModel.computedAllocationHeaders.push(assetClass.name);
    });

    var allocationMatrix = createAllocationMatrix(accountCount(), assetCount());

    leastTaxEfficientPass(allocationMatrix);
    mostTaxEfficientPass(allocationMatrix);
    remainderPass(allocationMatrix);

    viewModel.computedAllocation(allocationMatrix);
}

function createAllocationMatrix(numAccounts, numAssetClasses) {
    var matrix = arrayOfNulls(numAccounts);
    for(var i = 0; i < matrix.length; i++) {
        matrix[i] = (arrayOfNulls(accountVectorDataIndex(numAssetClasses)));
        matrix[i][0] = allAccountsView()[i].name;
    }

    return matrix;
}

// Add 1 to account vector when accessing data.
// This is to account for the title entry.
function accountVectorDataIndex(index) {
    return index + 1;
}

// Assign least tax efficient assets to:
// Tax deferred -> tax free -> taxable
function leastTaxEfficientPass(allocationMatrix) {
//todo
}

// Assign the most tax efficient assets to:
// Taxable -> tax deferred -> tax free
function mostTaxEfficientPass(allocationMatrix) {
//todo
}

// Assign the remaining assets (assuming they are sorted by potential for growth desc):
// Tax free -> tax deferred -> taxable
function remainderPass(allocationMatrix) {
    //todo
    var allAssets = allAssetsView();
    var allAccounts = allAccountsView();

    for (;;) {
        if(currentAccount.remainder < currentAsset.remainder) {
            currentAsset.remainder -= currentAccount.remainder;

            var allocationInfo = accountAllocationDescription(currentAccount.remainder, currentAccount.readBalance());
            allocationMatrix[currentAccountIndex][accountVectorDataIndex(currentAssetIndex)] = allocationInfo;

            denoteAccountFullyAllocated(allocationMatrix[currentAccountIndex], currentAssetIndex);

            currentAccountIndex++;
            if(currentAccountIndex  == viewModel.accounts().length) {
                break;
            }

            currentAccount = viewModel.accounts()[currentAccountIndex];
            currentAccount.resetRemainder();
        } else {
            currentAccount.remainder -= currentAsset.remainder;

            var allocationInfo = accountAllocationDescription(currentAsset.remainder, currentAccount.readBalance());
            allocationMatrix[currentAccountIndex][accountVectorDataIndex(currentAssetIndex)] = allocationInfo;

            denoteAssetFullyAllocated(allocationMatrix, currentAssetIndex);

            currentAssetIndex++;
            if (currentAssetIndex == viewModel.assetClasses().length) {
                break;
            }

            currentAsset = viewModel.assetClasses()[currentAssetIndex];
            currentAsset.resetRemainder();
        }
    }
}

function denoteAccountFullyAllocated(accountVector) {
    for(var i = 0; i < accountVector.length; i++) {
        if(!accountVector[i]) {
            accountVector[i] = accountAllocationDescription(0, 0);
        }
    }
}

function denoteAssetFullyAllocated(allocationMatrix, assetIndex) {
    allocationMatrix.forEach(function(accountVector) {
        if(!accountVector[accountVectorDataIndex(assetIndex)]) {
            accountVector[accountVectorDataIndex(assetIndex)] = (accountAllocationDescription(0, 0));
        }
    });
}

function accountAllocationDescription(amountAllocated, accountBalance) {
    return 'amount: $' 
        + amountAllocated.toFixed(2) 
        + ' (' 
        + (accountBalance != 0 ? (amountAllocated / accountBalance * 100).toFixed(2) : 0) 
        + '%)';
}


/*
Subscribe to the addition and removal of assets and accounts
(to update calculated values)
------------------------------------------------------------
*/


viewModel.assetClassesInefficient.subscribe(computePercentAllocated);
viewModel.assetClassesEfficient.subscribe(computePercentAllocated);
viewModel.assetClassesCredit.subscribe(computePercentAllocated);
viewModel.accountsTaxable.subscribe(computeTotalAccountBalance);
viewModel.accountsDeferred.subscribe(computeTotalAccountBalance);
viewModel.accountsFree.subscribe(computeTotalAccountBalance);

viewModel.assetClassesInefficient.subscribe(computeAssetAllocation);
viewModel.assetClassesEfficient.subscribe(computeAssetAllocation);
viewModel.assetClassesCredit.subscribe(computeAssetAllocation);
viewModel.accountsTaxable.subscribe(computeAssetAllocation);
viewModel.accountsDeferred.subscribe(computeAssetAllocation);
viewModel.accountsFree.subscribe(computeAssetAllocation);


/*
Apply bindings to the DOM
-------------------------
*/


// Activates knockout.js
ko.applyBindings(viewModel);

// Restore any saved state and watch for changes to the desired state
loadFromCurrentUrl();
$(window).bind("hashchange",function(event) {
    loadFromCurrentUrl();
});