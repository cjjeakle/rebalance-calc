"use strict"

/*
Example data
*/
var exampleData = `
{
  "assetClasses": [
    {
      "name": "US Stock",
      "allocation": "56",
      "notes": "VTI, FSTMX, ..."
    },
    {
      "name": "ex-US Stock",
      "allocation": "24",
      "notes": "VXUS, FSGUX, ..."
    },
    {
      "name": "US Bond",
      "allocation": "20",
      "notes": "BND, FBIDX, ..."
    }
  ],
  "accounts": [
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
      "name": "401 (k)",
      "balance": "12000",
      "notes": "Tax deferred"
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
*/

function clearState() {
    viewModel.assetClasses([]);
    viewModel.accounts([]);
}

function saveState() {
    $('#save-complete-prompt').hide("easeOutQuart");

    var portfolioData = {
        assetClasses: viewModel.assetClasses,
        accounts: viewModel.accounts
    };

    $('#save-link').attr("href", window.location.pathname + "#" + encodeURI(ko.toJSON(portfolioData)));
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

function moveUp(observableArray, index) {
    var start = index - 1;
    var numReplaced = 2;
    
    if (index > 0) {
        var rawArray = observableArray();
        var priorElement = rawArray[index - 1];
        var movedElement = rawArray[index];
        observableArray.splice(start, numReplaced, movedElement, priorElement);
    }
}

function moveDown(observableArray, index) {
    var start = index;
    var numReplaced = 2;
    
    if (index < (observableArray().length - 1)) {
        var rawArray = observableArray();
        var nextElement = rawArray[index + 1];
        var movedElement = rawArray[index];
        observableArray.splice(start, numReplaced, nextElement, movedElement);
    }
}


/*
Web App Classes
*/
class assetClass {
    constructor(name, allocation, notes) {
        this.name = ko.observable(name);
        this.allocation = ko.observable(allocation);
        this.notes = ko.observable(notes);

        this.allocation.subscribe(computepercentAllocated);

        this.name.subscribe(computeAssetAllocation);
        this.allocation.subscribe(computeAssetAllocation);
        this.notes.subscribe(computeAssetAllocation);
    }

    remove() {
        viewModel.assetClasses.remove(this);
    }

    readAllocation() {
        return this.allocation() ? this.allocation() : 0;
    }

    getIndex() {
        return viewModel.assetClasses.indexOf(this);
    }

    moveUp() {
        moveUp(viewModel.assetClasses, this.getIndex());
    }
    moveDown(){
        moveDown(viewModel.assetClasses, this.getIndex());
    }
}

class account {
    constructor(name, balance, notes) {
        this.name = ko.observable(name);
        this.balance = ko.observable(balance);
        this.notes = ko.observable(notes);

        this.balance.subscribe(computeTotalAccountBalance);

        this.name.subscribe(computeAssetAllocation);
        this.balance.subscribe(computeAssetAllocation);
        this.notes.subscribe(computeAssetAllocation);
    }

    remove() {
        viewModel.accounts.remove(this);
    }

    readBalance() {
        return this.balance() ? this.balance() : 0;
    }

    getIndex() {
        return viewModel.accounts.indexOf(this);
    }

    moveUp() {
        moveUp(viewModel.accounts, this.getIndex());
    }
    moveDown(){
        moveDown(viewModel.accounts, this.getIndex());
    }
}


/*
Web App Logic
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
    viewModel.assetClasses.push(new assetClass(name, allocation, notes));
}

function addAccount(name, balance, notes) {
    viewModel.accounts.push(new account(name, balance, notes));
}

function computepercentAllocated() {
    viewModel.percentAllocated(0);
    viewModel.assetClasses().forEach(function(assetClass){
        viewModel.percentAllocated(viewModel.percentAllocated() + parseFloat(assetClass.readAllocation()));
    });
}

function computeTotalAccountBalance() {
    viewModel.totalAccountBalance(0);
    viewModel.accounts().forEach(function(account){
        viewModel.totalAccountBalance(viewModel.totalAccountBalance() + parseFloat(account.readBalance()));
    });
}


// TODO: This function is a tangled mess of repeated code, state, and nested logic. Refactor into stateless functions.
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

    var currentAccountBalance = parseFloat(viewModel.accounts()[currentAccountIndex].readBalance());
    var currentAccountRemainder = currentAccountBalance;

    var currentAssetBalance = parseFloat(viewModel.assetClasses()[currentAssetIndex].readAllocation()) / 100 * viewModel.totalAccountBalance();
    var currentAssetRemainder = currentAssetBalance;

    var allocationMatrix = [[viewModel.accounts()[currentAccountIndex].name()]];

    for (;;) {
        if(currentAccountRemainder < currentAssetRemainder) {
            currentAssetRemainder -= currentAccountRemainder;

            var allocationInfo = 'amount: $' + currentAccountRemainder.toFixed(2) + ' (' + (currentAccountRemainder / currentAccountBalance * 100).toFixed(2) + '%)';
            var accountVector = allocationMatrix[allocationMatrix.length-1];
            accountVector.push(allocationInfo);

            while ((accountVector.length - 1) < viewModel.assetClasses().length) {
                accountVector.push('amount: $0 (0%)');
            }

            currentAccountIndex++;
            if(currentAccountIndex  == viewModel.accounts().length) {
                break;
            }

            var nextAccountVector = [viewModel.accounts()[currentAccountIndex].name()];
            for (var depletedAssetClasses = 0; depletedAssetClasses < currentAssetIndex; depletedAssetClasses++) {
                nextAccountVector.push('amount: $0 (0%)');
            }
            allocationMatrix.push(nextAccountVector);
            
            var currentAccountBalance = parseFloat(viewModel.accounts()[currentAccountIndex].readBalance());
            var currentAccountRemainder = currentAccountBalance;
        } else {
            currentAccountRemainder -= currentAssetRemainder;

            var allocationInfo = 'amount: $' + currentAssetRemainder.toFixed(2) + ' (' + (currentAssetRemainder / currentAccountBalance * 100).toFixed(2) + '%)';
            allocationMatrix[allocationMatrix.length-1].push(allocationInfo);

            currentAssetIndex++;
            if (currentAssetIndex == viewModel.assetClasses().length) {
                break;
            }

            var currentAssetBalance = parseFloat(viewModel.assetClasses()[currentAssetIndex].readAllocation()) / 100 * viewModel.totalAccountBalance();
            var currentAssetRemainder = currentAssetBalance;
        }
    }

    viewModel.computedAllocationHeaders(['']);
    viewModel.assetClasses().forEach(function(assetClass) {
        viewModel.computedAllocationHeaders.push(assetClass.name());
    });

    viewModel.computedAllocation(allocationMatrix);
}

viewModel.assetClasses.subscribe(computepercentAllocated);
viewModel.assetClasses.subscribe(computeAssetAllocation);
viewModel.accounts.subscribe(computeTotalAccountBalance);
viewModel.accounts.subscribe(computeAssetAllocation);

// Activates knockout.js
ko.applyBindings(viewModel);

// Restore any saved state
if(window.location.hash) {
    loadState(decodeURI(window.location.hash.substring(1)));
}