## Core Workflows
* Visit http://localhost:1234
* Load the example data, ensure it all works
* Save and load
  * Enter some data, copy the URL state, paste in a new tab and verify pages are identical 
* URL update
  * Does editing update the URL?
  * Do undo and redo update the URL?
* Check drag and drop works
* Verify lock allocation works

### Known quirks
* After starting up/loading with no state in the URL, the undo button will be enabled but undoing will be a no-op
  * The "undoable" event on the state stack is the initial load
  * During a clean start there is nothing in the URL to load, thus undoing takes us from empty state -to-> empty state (which is the no-op we see)

## Backward Compat
* [This URL](http://localhost:1234/#%7B%22assetClassesInefficient%22:%5B%7B%22name%22:%22US%20Bond%22,%22allocation%22:35,%22notes%22:%22BND,%20FBIDX,%20...%22%7D%5D,%22assetClassesCredit%22:%5B%7B%22name%22:%22ex-US%20Stock%22,%22allocation%22:16.25,%22notes%22:%22VXUS,%20FSGUX,%20...%22%7D%5D,%22assetClassesEfficient%22:%5B%7B%22name%22:%22US%20Stock%22,%22allocation%22:48.75,%22notes%22:%22VTI,%20FSTMX,%20...%22%7D%5D,%22accountsTaxable%22:%5B%7B%22name%22:%22Brokerage%20acct%22,%22balance%22:2000,%22notes%22:%22No%20special%20tax%20treatment%22%7D%5D,%22accountsDeferred%22:%5B%7B%22name%22:%22401%20(k)%22,%22balance%22:12000,%22notes%22:%22Tax%20deferred%22%7D%5D,%22accountsFree%22:%5B%7B%22name%22:%22HSA%22,%22balance%22:4000,%22notes%22:%22No%20taxes%20on%20healthcare%22%7D,%7B%22name%22:%22Roth%20IRA%22,%22balance%22:7000,%22notes%22:%22No%20taxes%20on%20growth%22%7D%5D%7D) should present a link to backward compat mode
  * Does opening it load the data?
* Does history update when you edit things in backward compat mode?

### Known quirks
* Loading example state and clearing state do not change the URL hash
  * The URL only updates in response to user actions that modify the state