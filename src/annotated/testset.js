// # ooJS - Test Set
/**
 * ooJS - Object Oriented JavaScript v0.0.1
 * http://goffreder.github.io
 *
 * Copyright 2014, Emanuele Biancardi
 * Released under the MIT License
 */
new Class('A', {
    pippo : "pluto"
}, {
    foo : function() {
        return 10;
    },
    bar : function() {
        console.log("bar of A");
    }
});

new Class('B', {}, {
    foo : function() {
        return Super(this).foo() * 2;
    }
}).Extends('A');

new Class('C', {}, {
    foo : function() {
        return Super(this).foo() * 2;
    }
}).Extends('B');


var a = New('A');
var b = New('B');
var c = New('C');

console.log("Test set output:");
// `a.pippo: pluto`
console.log("a.pippo: "+a.pippo);
// `a.foo(): 10`
console.log("a.foo(): "+a.foo());
// `b.pippo: pluto`
console.log("b.pippo: "+b.pippo);
// `b.foo(): 20`
console.log("b.foo(): "+b.foo());
// `bar of A`
b.bar();
// `c.pippo: pluto`
console.log("c.pippo: "+c.pippo);
// `c.foo(): 40`
console.log("c.foo(): "+c.foo());
