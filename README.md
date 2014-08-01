# QuodJS - Object Oriented JavaScript

A small library to add basic OO features to JavaScript.

## Version

v0.0.2

## Model
This library tries to emulate OO functionalities in the same way PHP does. The same code
should behave the same way both in PHP and in QuodJS.

This module is slightly different from other languages like Java. For example, in QuodJS
when extending a class you can also override properties instead of just shadowing them like in Java.

## Documentation

An annotated version of the code is available in `src/annotated`,
and the generated documentation (made with [Docco] (http://jashkenas.github.io/docco/))
can be found in `docs/quod.html`.

## Install

To use QuodJS just include `src/quod.min.js` in your HTML file.

## Node.js

QuodJS is tested and working with Node.js v0.11.13.

## Testing

`tests` contains an usage example and a few unit tests to run against the code.
The same test can be run in Node.js by installing [QUnit module for Node] (https://github.com/kof/node-qunit)
and running command `qunit -c src/quod.js -t tests/quod.tests.js` in the root folder.

## Changelog

### v0.0.1

Initial public release.

## Disclaimer

This project is just "for fun", some kind of syntactic sugar added to the language
I use (and actually like) the most. I'm sure there are plenty of ways to achieve the same
results with better performances, or a cleaner code, I just haven't found them yet.
If you care to contribute, be my guest ^_^

## License

Released under the MIT License. See the bundled `LICENSE` file for details.
