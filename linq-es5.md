## Language-Integrated Query (LINQ) 

LINQ is a set of features that extends powerful query capabilities to any JavaScript based language. This library is a complete implementation of LINQ Enumerable class. 

The methods in this class provide an implementation of the standard query operators for querying data sources that implement Iterable<T>. The standard query operators are general purpose methods that follow the LINQ pattern and enable you to express traversal, filter, and projection operations over data in JavaScript or any related programming languages (TypeScript, CoffeeScript, etc).
Methods that are used in a query that returns a sequence of values do not consume the target data until the query object is enumerated. This is known as deferred execution. Methods that are used in a query that returns a singleton value execute and consume the target data immediately.

### Implementation details
This library is implemented in TypeScript language and compatible with [Ecma-262 Edition 5.1](http://www.ecma-international.org/ecma-262/5.1/). It will run on any browser or Node engine. It will even run on Node 0.12.

The library is transpiled into JavaScript and distributed as native node module. The source is Browserified and distributed as standalone UMD module. Browser compatible file located in ./dist directory and could be used directly via Enumerable global variable. [See Example](https://jsfiddle.net/ENikS/pyvjcfa0/)

This library uses Iterable interface T[System.iterator] natively implemented by most Javascript engines for collection types (Array, Map, Set, String). As result iterations are done much faster compared to IEnumerable implementation. The code is also backwards compatible with IEnumerable implementation. 

All relevant methods are implemented with deferred  execution so no unnecessary iterations are performed. 
### Installation
```
npm install linq-es5
```

### Using
```javascript
var Enumerable = require("linq-es5");

var count =  Enumerable.asEnumerable( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] )
                       .Where(a => a % 2 == 1)
                       .Count()

```
For live example you could play with please follow this link https://jsfiddle.net/ENikS/pyvjcfa0

Original information about C# implementation available at https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx 


### Naming Convention
Method names follow original C# convention (Name starts with capital letter) for compatibility reasons. It is done so that code could be cut/pasted from C# to JavaScritp with just minor reformatting.

### Implemented methods
For list of implemented methods and for help on individual methods please follow this link:
https://github.com/ENikS/LINQ/wiki