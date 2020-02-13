# Rebalance Calc

## About this repo
A Portfolio Rebalancing and Tax Optimization Calculator

View the live site: www.rebalancecalc.com

If you have data from the previous version, a backward compatibility mode can be found [here](www.rebalancecalc.com/backwardCompat/v1/)

## Cool features:

### The app is newly refactored!

Shiny new features:
* Drag-and-drop
* Concrete sale and purchase suggestions on an account and asset level
    * The previous version suggested an allocation, but trade amounts were left as an exercise to the user
* Improved error detection and clearer error messages

Core features that haven't gone anywhere
* The site automatically persists every change to the URL
    * It's easy to save, share, and restore your work
* Your input never leaves the page
    * There's no analytics, and the URL hash (where the data persists) doesn't get sent to the server

## Feel free to self-host!
These steps can be used to develop locally, or to self-host the site

* Dependencies
    * `nodejs`
        * Any relatively new release should work (the current LTS release is a solid choice)
        * Install from [here](https://nodejs.org/en/download/) or [via a package manager](https://nodejs.org/en/download/package-manager/).
    * `python3`
        * This is necessary to work around [a bug](https://github.com/parcel-bundler/parcel/issues/1778), and should be fixed [when parcel 2 comes out](https://github.com/parcel-bundler/parcel/pull/3996)
        * `python3` is available from most package managers and the Windows 10 app store
* Steps:
    1. `git clone` this repo or download the source as a zip from GitHub
    1. Open a terminal or powershell session in the root folder of your copy of this repo
    1. Run `npm install`
    1. Run `npm dev`
        * This watches for changes, builds the source code, bundles it, and starts a server
        * The app should be available at http://localhost:1234 while npm dev runs
        * Pressing `ctrl` + `c` or closing the terminal should kill the dev server
    1. Start a web server in the `./dist/` folder
        1. Open an additional terminal and navigate to the `./dist/` folder
        1. Run `python3 -m http.server 8000`
        1. Open a browser and navigate to http://localhost:8000
            * Use this link because you don't have to manually navigate to `index.html` to open the site (a bug noted above in the dependencies section)
        1. Pressing `ctrl` + `c` or closing the terminal should kill the http server

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
