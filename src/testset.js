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
console.log("a.pippo: "+a.pippo);
console.log("a.foo(): "+a.foo());
console.log("b.pippo: "+b.pippo);
console.log("b.foo(): "+b.foo());
b.bar();
console.log("c.pippo: "+c.pippo);
console.log("c.foo(): "+c.foo());
