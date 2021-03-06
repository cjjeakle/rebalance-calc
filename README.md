# Rebalance Calc

## About this repo
A Portfolio Rebalancing and Tax Optimization Calculator

View the live site: https://www.rebalancecalc.com

If you have data from the previous version, a backward compatibility mode can be found [here](http://www.rebalancecalc.com/backwardCompat/v1/)

## Cool features:

### The app is newly refactored!

Shiny new features:
* Lists support drag-and-drop re-ordering
* Undo and redo support
* Concrete sale and purchase suggestions on an account and asset level
    * The previous version suggested an allocation, but trade amounts were left as an exercise to the user
* Improved error detection and clearer error messages
* URL state is replaced, rather than adding to the browser history
    * This should making the browser back button much more usable with this version of the app

Core features that haven't gone anywhere:
* Rich example data to demonstrate key features
* Lots of helpful tips and tricks, be sure to take a look!
* It's easy to persist and sync state
    * Simply bookmark the page in a state you want to preserve, the URL bar contains everything you've entered
    * Use your browser's bookmark sync feature (or copy-paste) to take your URL state elsewhere
* The tool respects your privacy
    * There are no ads or analytics
    * The tool's state saves to the "#" fragment of the URL, and browsers do not send the URL hash to the server

## UX Caveats
This tool is best used on a computer, the UI can get quite overwhelming on mobile (it works, but can be clunky).

## Feel free to self-host!
These steps can be used to develop locally, or to self-host the site

* Dependencies
    * `nodejs`
        * Any relatively new release should work (the current LTS release is a solid choice)
        * Install from [here](https://nodejs.org/en/download/) or [via a package manager](https://nodejs.org/en/download/package-manager/).
* Steps:
    1. `git clone` this repo or download the source as a zip from GitHub
    1. Open a terminal or powershell session in the root folder of your copy of this repo
    1. Run `npm install`
    1. Run `npm run dev`
        * This watches for changes, builds the source code, bundles it, and starts a server
            * Caveat: the `assets` directory is only copied at startup, you'll have to stop and re-run `npm dev` to get updates to files in that folder
        * The app should be available at http://localhost:1234 while npm dev runs
        * Press `ctrl` + `c` or close the terminal to stop the dev server

## Using a previous version:
To find a previous version, particularly if you'd like to self-host without needing to run any build tools, check out the older releases [here](https://github.com/cjjeakle/rebalance-calc/releases/).

## License:
The MIT License (MIT)

Copyright (c) 2020 Chris Jeakle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
