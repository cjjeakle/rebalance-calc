"use strict"


/*
Example data
------------
*/

var exampleData = '\
{\
  "assetClassesInefficient": [\
    {\
      "name": "US Bond",\
      "allocation": 20,\
      "notes": "BND, FBIDX, ..."\
    }\
  ],\
  "assetClassesCredit": [\
    {\
      "name": "ex-US Stock",\
      "allocation": 24,\
      "notes": "VXUS, FSGUX, ..."\
    }\
  ],\
  "assetClassesEfficient": [\
    {\
      "name": "US Stock",\
      "allocation": 56,\
      "notes": "VTI, FSTMX, ..."\
    }\
  ],\
  "accountsTaxable": [\
    {\
      "name": "Brokerage acct",\
      "balance": 2000,\
      "notes": "No special tax treatment"\
    }\
  ],\
  "accountsDeferred": [\
    {\
      "name": "401 (k)",\
      "balance": 12000,\
      "notes": "Tax deferred"\
    }\
  ],\
  "accountsFree": [\
    {\
      "name": "HSA",\
      "balance": 4000,\
      "notes": "No taxes on healthcare"\
    },\
    {\
      "name": "Roth IRA",\
      "balance": 7000,\
      "notes": "No taxes on growth"\
    }\
  ]\
}\
'


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
    return new Array(length).map(function() { return null; });
}


/*
Key classes
-----------
*/


function assetClass (name, allocation, notes, parentCollection) {
    this.name = ko.observable(name);
    this.allocation = ko.observable(parseFloat(allocation));
    this.notes = ko.observable(notes);
    this.parentCollection = parentCollection;

    this.allocation.subscribe(computePercentAllocated);
    this.allocation.subscribe(computeAssetAllocation);

    this.remove = function() {
        this.parentCollection.remove(this);
    }

    this.readAllocation = function() {
        return this.allocation() ? parseFloat(this.allocation()) : 0;
    }

    this.resetRemainder = function() {
        this.remainder = this.readAllocation() / 100 * viewModel.totalAccountBalance();
    }

    this.getIndex = function() {
        return this.parentCollection.indexOf(this);
    }

    this.moveUp = function() {
        moveElementUp(this.parentCollection, this.getIndex());
    }
    this.moveDown = function(){
        moveElementDown(this.parentCollection, this.getIndex());
    }

    this.remainder = this.readAllocation();
}

function account (name, balance, notes, parentCollection) {
    this.name = ko.observable(name);
    this.balance = ko.observable(parseFloat(balance));
    this.remainder = this.balance();
    this.notes = ko.observable(notes);
    this.parentCollection = parentCollection;

    this.balance.subscribe(computeTotalAccountBalance);
    this.balance.subscribe(computeAssetAllocation);

    this.remove = function() {
        this.parentCollection.remove(this);
    }

    this.readBalance = function() {
        return this.balance() ? parseFloat(this.balance()) : 0;
    }

    this.resetRemainder = function() {
        this.remainder = this.readBalance();
    }


    this.getIndex = function() {
        return this.parentCollection.indexOf(this);
    }

    this.moveUp = function() {
        moveElementUp(this.parentCollection, this.getIndex());
    }
    this.moveDown = function(){
        moveElementDown(this.parentCollection, this.getIndex());
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

    var defaultAssetOffset = 1; // Shift to account for the account name column
    var inefficientAssetOffset = defaultAssetOffset;
    var creditAssetOffset = inefficientAssetOffset + viewModel.assetClassesInefficient().length;
    var efficientAssetOffset = creditAssetOffset + viewModel.assetClassesCredit().length;

    var defaultAccountOffset = 0;
    var taxableAccountOffset = defaultAccountOffset;
    var deferredAccountOffset = taxableAccountOffset + viewModel.accountsTaxable().length;
    var freeAccountOffset = deferredAccountOffset + viewModel.accountsDeferred().length;

    // Assign least tax efficient assets to:
    // Tax deferred -> tax free -> taxable
    allocateAssets(viewModel.assetClassesInefficient(),
        viewModel.accountsDeferred(), 
        inefficientAssetOffset, 
        deferredAccountOffset, 
        allocationMatrix);
    allocateAssets(viewModel.assetClassesInefficient(),
        viewModel.accountsFree(), 
        inefficientAssetOffset, 
        freeAccountOffset, 
        allocationMatrix);
    allocateAssets(viewModel.assetClassesInefficient(),
        viewModel.accountsTaxable(), 
        inefficientAssetOffset, 
        taxableAccountOffset, 
        allocationMatrix);

    // Assign the most tax efficient assets (eligible for foreign tax credit) to:
    // Taxable -> wait for remainder pass
    allocateAssets(viewModel.assetClassesCredit(),
        viewModel.accountsTaxable(),
        creditAssetOffset,
        taxableAccountOffset,
        allocationMatrix);

    // Assign the highest expected growth assets to:
    // tax free -> wait for remainder pass
    allocateAssets(viewModel.assetClassesEfficient(), 
        viewModel.accountsFree(),
        efficientAssetOffset,
        freeAccountOffset,
        allocationMatrix);

    // Assign the remaining assets anywhere
    allocateAssets(allAssetsView(),
        allAccountsView(),
        defaultAssetOffset,
        defaultAccountOffset,
        allocationMatrix);

    // Apply the calculated allocation matrix to the view model
    viewModel.computedAllocation(allocationMatrix);
}

function createAllocationMatrix(numAccounts, numAssetClasses) {
    var matrix = arrayOfNulls(numAccounts);
    for(var i = 0; i < matrix.length; i++) {
        matrix[i] = arrayOfNulls(numAssetClasses + 1);
        matrix[i][0] = allAccountsView()[i].name;
    }

    return matrix;
}

function allocateAssets(assets, accounts, assetDataOffset, accountDataOffset, allocationMatrix) {
    var assetIndex = 0;
    var accountIndex = 0;

    while (assetIndex < assets.length && accountIndex < accounts.length) {
        var currentAsset = assets[assetIndex];
        var currentAccount = accounts[accountIndex];

        if (currentAsset.remainder < 0) {
            assetIndex++;
            continue;
        }
        if (currentAccount.remainder < 0) {
            accountIndex++;
            continue;
        }

        if (currentAccount.remainder < currentAsset.remainder) {
            currentAsset.remainder -= currentAccount.remainder;

            var allocationInfo = accountAllocationDescription(currentAccount.remainder, currentAccount.readBalance());
            allocationMatrix[accountIndex + accountDataOffset][assetIndex + assetDataOffset] = allocationInfo;

            // Mark the account as depleted
            currentAccount.remainder = -1;
            denoteAccountFullyAllocated(allocationMatrix, accountIndex + accountDataOffset);
        } else {
            currentAccount.remainder -= currentAsset.remainder;

            var allocationInfo = accountAllocationDescription(currentAsset.remainder, currentAccount.readBalance());
            allocationMatrix[accountIndex + accountDataOffset][assetIndex + assetDataOffset] = allocationInfo;

            // Mark the asset as depleted
            currentAsset.remainder = -1;
            denoteAssetFullyAllocated(allocationMatrix, assetIndex + assetDataOffset)
        }
    }
}

function accountAllocationDescription(amountAllocated, accountBalance) {
    return 'amount: $' 
        + amountAllocated.toFixed(2) 
        + ' (' 
        + (accountBalance != 0 ? (amountAllocated / accountBalance * 100).toFixed(2) : 0) 
        + '%)';
}

function denoteAccountFullyAllocated(allocationMatrix, accountDataIndex) {
    for (var i = 0; i < allocationMatrix[accountDataIndex].length; i++) {
        if(!allocationMatrix[accountDataIndex][i]) {
            allocationMatrix[accountDataIndex][i] = accountAllocationDescription(0, 0);
        }
    }
}

function denoteAssetFullyAllocated(allocationMatrix, assetDataIndex) {
    for (var i = 0; i < allocationMatrix.length; i++) {
        if(!allocationMatrix[i][assetDataIndex]) {
            allocationMatrix[i][assetDataIndex] = accountAllocationDescription(0, 0);
        }
    }
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