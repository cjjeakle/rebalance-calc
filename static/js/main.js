"use strict"

/*
Example data
*/
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
    viewModel.assetClasses([]);
    viewModel.accounts([]);
}

function getStateAsUrl() {
    var portfolioData = {
        assetClasses: viewModel.assetClasses,
        accounts: viewModel.accounts
    };

    var stripExtraData = function (key, value) {
        switch(key) {
            case 'parentCollection':
            case 'remainder':
                return;
            default:
                return value;
        }
    }

    return window.location.pathname + "#" + encodeURI(ko.toJSON(portfolioData, stripExtraData));
}

function saveState() {
    $('#save-complete-prompt').hide("easeOutQuart");
    $('#save-link').attr("href", getStateAsUrl());
    $('#save-complete-prompt').show("easeOutQuart");
}

function loadState(portfolioJSON) {
    var portfolioData = JSON.parse(portfolioJSON);

    clearState();

    portfolioData.assetClasses.forEach(function(assetClass) {
        addAssetClass(assetClass.name, assetClass.allocation, assetClass.notes);
    });
    portfolioData.accounts.forEach(function(account) {
        addAccount(account.name, account.balance, account.notes);
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
Web app classes
---------------
*/


class assetClass {
    constructor(name, allocation, notes, parentCollection) {
        this.name = ko.observable(name);
        this.allocation = ko.observable(parseFloat(allocation));
        this.remainder = this.readAllocation();
        this.notes = ko.observable(notes);
        this.parentCollection = parentCollection;

        this.allocation.subscribe(computepercentAllocated);
        this.allocation.subscribe(computeAssetAllocation);
    }

    remove() {
        this.parentCollection.remove(this);
    }

    readAllocation() {
        return this.allocation() ? this.allocation() : 0;
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
        return this.balance() ? this.balance() : 0;
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
Web app view model and view model manipulation functions
--------------------------------------------------------
*/


function AppViewModel() {
    this.assetClasses = ko.observableArray([]);
    this.accounts = ko.observableArray([]);

    this.newAssetClass = function() { addAssetClass(null, null, null); };
    this.newAccount = function() { addAccount(null, null, null); };
    
    this.percentAllocated = ko.observable(0);
    this.totalAccountBalance = ko.observable(0);

    this.computedAllocationHeaders = ko.observableArray([]);
    this.computedAllocation = ko.observableArray([]);
}

var viewModel = new AppViewModel();

function addAssetClass(name, allocation, notes) {
    viewModel.assetClasses.push(new assetClass(name, allocation, notes, viewModel.assetClasses));
}

function addAccount(name, balance, notes) {
    viewModel.accounts.push(new account(name, balance, notes, viewModel.accounts));
}

function computepercentAllocated() {
    viewModel.percentAllocated(0);
    viewModel.assetClasses().forEach(function(assetClass){
        viewModel.percentAllocated(viewModel.percentAllocated() + assetClass.readAllocation());
    });
}

function computeTotalAccountBalance() {
    viewModel.totalAccountBalance(0);
    viewModel.accounts().forEach(function(account){
        viewModel.totalAccountBalance(viewModel.totalAccountBalance() + account.readBalance());
    });
}


/*
The asset allocation calculator
-------------------------------
*/


function computeAssetAllocation() {
    // Only compute the asset allocation matrix if there exist both accounts and assets
    if (viewModel.accounts().length == 0 ||
        viewModel.assetClasses().length == 0) {
        viewModel.computedAllocationHeaders([]);
        viewModel.computedAllocation([]);
        return;
    }

    var currentAccountIndex = 0;
    var currentAssetIndex = 0;

    var currentAccount = viewModel.accounts()[currentAccountIndex];
    var currentAsset = viewModel.assetClasses()[currentAssetIndex];
    var allocationMatrix = createAllocationMatrix();

    currentAccount.resetRemainder();
    currentAsset.resetRemainder();

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

    viewModel.computedAllocation(allocationMatrix);
}

function createAllocationMatrix() {
    var numAccounts = viewModel.accounts().length;
    var numAssetClasses = viewModel.assetClasses().length;

    viewModel.computedAllocationHeaders(['']);
    viewModel.assetClasses().forEach(function(assetClass) {
        viewModel.computedAllocationHeaders.push(assetClass.name);
    });

    var matrix = arrayOfNulls(numAccounts);
    for(var i = 0; i < matrix.length; i++) {
        matrix[i] = (arrayOfNulls(accountVectorDataIndex(numAssetClasses)));
        matrix[i][0] = viewModel.accounts()[i].name;
    }

    return matrix;
}

// Add 1 to account vector when accessing data.
// This is to account for the title entry.
function accountVectorDataIndex(index) {
    return index + 1;
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


viewModel.assetClasses.subscribe(computepercentAllocated);
viewModel.accounts.subscribe(computeTotalAccountBalance);
viewModel.assetClasses.subscribe(computeAssetAllocation);
viewModel.accounts.subscribe(computeAssetAllocation);


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