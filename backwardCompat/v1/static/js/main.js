'use strict'


/*
Example data
------------
*/


var exampleData = '\
{\
  "assetClassesInefficient": [\
    {\
      "name": "US Bond",\
      "allocation": 35,\
      "notes": "BND, FBIDX, ..."\
    }\
  ],\
  "assetClassesCredit": [\
    {\
      "name": "ex-US Stock",\
      "allocation": 16.25,\
      "notes": "VXUS, FSGUX, ..."\
    }\
  ],\
  "assetClassesEfficient": [\
    {\
      "name": "US Stock",\
      "allocation": 48.75,\
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


// The singleton instance of the view model.
var viewModel = new AppViewModel();

// A global array tracking valid subscriptions to the addition and removal of accounts.
var addAndRemoveSubscriptions = [];

var emptyStateJson = '{}';

function getStateAsUrlHash() {
    if (assetCount() > 0 || accountCount() > 0) {
        return '#' + encodeURI(ko.toJSON(viewModel, stripExtraViewModelData));
    } else {
        return '';
    }
}

var isLoading = false;
function pushStateToUrl() {
    if (isLoading) {
        return;
    }

    var stateHash = getStateAsUrlHash();
    if (window.location.hash != stateHash) {
        history.pushState(undefined, undefined, stateHash);
    }
    updateSaveLink();
}

function updateSaveLink() {
    $('#save-link').attr('href', window.location.href);
}

function toggleUrlLink() {
    $('#save-complete-prompt').toggle('easeInOutElastic', function() {
        if ($('#save-complete-prompt').is(":visible")) {
            $('#save-btn').text('hide link');
        } else {
            $('#save-btn').text('save');
        }
    });
}

function loadState(portfolioJSON) {
    isLoading = true;
    detachAddAndRemoveSubscriptions();

    var portfolioData = JSON.parse(portfolioJSON);

    // Assets
    var data = [];
    (portfolioData.assetClassesInefficient || []).forEach(function(assetClass) {
        data.push(createInefficientAssetClass(assetClass.name, assetClass.allocation, assetClass.notes));
    });
    viewModel.assetClassesInefficient(data);

    data = [];
    (portfolioData.assetClassesCredit || []).forEach(function(assetClass) {
        data.push(createCreditAssetClass(assetClass.name, assetClass.allocation, assetClass.notes));
    });
    viewModel.assetClassesCredit(data);

    data = [];
    (portfolioData.assetClassesEfficient || []).forEach(function(assetClass) {
        data.push(createEfficientAssetClass(assetClass.name, assetClass.allocation, assetClass.notes));
    });
    viewModel.assetClassesEfficient(data);

    // Accounts
    data = [];
    (portfolioData.accountsTaxable || []).forEach(function(account) {
        data.push(createTaxableAccount(account.name, account.balance, account.notes));
    });
    viewModel.accountsTaxable(data);

    data = [];
    (portfolioData.accountsDeferred || []).forEach(function(account) {
        data.push(createDeferredAccount(account.name, account.balance, account.notes));
    });
    viewModel.accountsDeferred(data);

    data = [];
    (portfolioData.accountsFree || []).forEach(function(account) {
        data.push(createFreeAccount(account.name, account.balance, account.notes));
    });
    viewModel.accountsFree(data);
    
    attachAddAndRemoveSubscriptions();
    invokeAddAndRemoveEventSubscribers();
    isLoading = false;
}

function loadFromCurrentUrl() {
    var stateJSON = emptyStateJson;
    if(window.location.hash) {
        stateJSON = decodeURI(window.location.hash.substring(1));
    }
    loadState(stateJSON);
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

    this.name.subscribe(pushStateToUrl);
    this.notes.subscribe(pushStateToUrl);
    this.allocation.subscribe(computePercentAllocated);
    this.allocation.subscribe(globalCalculations);

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

    this.name.subscribe(pushStateToUrl);
    this.notes.subscribe(pushStateToUrl);
    this.balance.subscribe(computeTotalAccountBalance);
    this.balance.subscribe(globalCalculations);

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

    this.newInefficientAssetClass = function() { viewModel.assetClassesInefficient.push(createInefficientAssetClass(null, null, null)); };
    this.newCreditAssetClass = function() { viewModel.assetClassesCredit.push(createCreditAssetClass(null, null, null)); };
    this.newEfficientAssetClass = function() { viewModel.assetClassesEfficient.push(createEfficientAssetClass(null, null, null)); };
    this.newTaxableAccount = function() { viewModel.accountsTaxable.push(createTaxableAccount(null, null, null)); };
    this.newDeferredAccount = function() { viewModel.accountsDeferred.push(createDeferredAccount(null, null, null)); };
    this.newFreeAccount = function() { viewModel.accountsFree.push(createFreeAccount(null, null, null)); };
    
    this.percentAllocated = ko.observable(0);
    this.totalAccountBalance = ko.observable(0);

    this.computedAllocationHeaders = ko.observableArray([]);
    this.computedAllocation = ko.observableArray([]);
}

function createInefficientAssetClass(name, allocation, notes) {
    return new assetClass(name, allocation, notes, viewModel.assetClassesInefficient);
}

function createCreditAssetClass(name, allocation, notes) {
    return new assetClass(name, allocation, notes, viewModel.assetClassesCredit);
}

function createEfficientAssetClass(name, allocation, notes) {
    return new assetClass(name, allocation, notes, viewModel.assetClassesEfficient);
}

function createTaxableAccount(name, balance, notes) {
    return new account(name, balance, notes, viewModel.accountsTaxable);
}

function createDeferredAccount(name, balance, notes) {
    return new account(name, balance, notes, viewModel.accountsDeferred);
}

function createFreeAccount(name, balance, notes) {
    return new account(name, balance, notes, viewModel.accountsFree);
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

function resetRemainderTracking() {
    allAssetsView().forEach(function(element) { element.resetRemainder(); });
    allAccountsView().forEach(function(element) { element.resetRemainder(); });
}


/*
Computation invoking functions, and change subscription code
-------------------------------
*/


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

// Calculations to be run after every change
function globalCalculations() {
    pushStateToUrl();
    computeAssetAllocation();
}

// Subscribes relevant functions to the addition and removal of assets and accounts
// (to update calculated values).
// Immediately invokes each subscribed function once.
function attachAddAndRemoveSubscriptions() {
    addAndRemoveSubscriptions.push(viewModel.assetClassesInefficient.subscribe(computePercentAllocated));
    addAndRemoveSubscriptions.push(viewModel.assetClassesEfficient.subscribe(computePercentAllocated));
    addAndRemoveSubscriptions.push(viewModel.assetClassesCredit.subscribe(computePercentAllocated));
    addAndRemoveSubscriptions.push(viewModel.accountsTaxable.subscribe(computeTotalAccountBalance));
    addAndRemoveSubscriptions.push(viewModel.accountsDeferred.subscribe(computeTotalAccountBalance));
    addAndRemoveSubscriptions.push(viewModel.accountsFree.subscribe(computeTotalAccountBalance));

    addAndRemoveSubscriptions.push(viewModel.assetClassesInefficient.subscribe(globalCalculations));
    addAndRemoveSubscriptions.push(viewModel.assetClassesEfficient.subscribe(globalCalculations));
    addAndRemoveSubscriptions.push(viewModel.assetClassesCredit.subscribe(globalCalculations));
    addAndRemoveSubscriptions.push(viewModel.accountsTaxable.subscribe(globalCalculations));
    addAndRemoveSubscriptions.push(viewModel.accountsDeferred.subscribe(globalCalculations));
    addAndRemoveSubscriptions.push(viewModel.accountsFree.subscribe(globalCalculations));
}

function invokeAddAndRemoveEventSubscribers() {
    computePercentAllocated();
    computeTotalAccountBalance();
    globalCalculations();
}

// Removes all asset and account add/remove subscriptions.
function detachAddAndRemoveSubscriptions() {
    addAndRemoveSubscriptions.forEach(function(subscription) {
        subscription.dispose();
    });
    addAndRemoveSubscriptions = [];
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
Initialize view model and subscriptions
-------------------------
*/


loadFromCurrentUrl();


/*
Apply bindings to the DOM
-------------------------
*/


// Activates knockout.js
ko.applyBindings(viewModel);

// Watch for changes to the current URL state (back/forward buttons pressed, etc), 
// and apply the data encoded in the URL.
window.onpopstate = function(event) {
    loadFromCurrentUrl();
};
