Class("One", {
    c : 1
}, {
    mult : function mult(n, m) {
        return n * m * this.c;
    },
    test : function test() {
        return 1;
    },
    result : function result() {
        return this.test();
    }
});

Class("Two", {
    c : 2
}, {
    test : function test() {
        return 2;
    },
    superTest : function superTest() {
        return this.Super("test");
    },
    superResult : function superResult() {
        return this.Super("result");
    },
    superMult : function superMult(n, m) {
        return this.Super("mult", n, m);
    }
}).Extends("One");

Class("Three", {
    c : 3
}, {
    mult : function mult(n, m) {
        return n * m * this.c;
    },
    test : function test() {
        return 3;
    },
    result : function result() {
        return 3;
    }
}).Extends("Two");

Class("Four", {
    c : 4
}, {
    test : function test() {
        return 4;
    }
}).Extends("Three");

var o1 = New("One");
var o2 = New("Two");
var o3 = New("Three");
var o4 = New("Four");

console.log("o1.test(): " + o1.test() + " (expected 1)");
console.log("o1.result(): " + o1.result() + " (expected 1)");
console.log("o2.test(): " + o2.test() + " (expected 2)");
console.log("o2.result(): " + o2.result() + " (expected 2)");
console.log("o2.superTest(): " + o2.superTest() + " (expected 1)");
console.log("o2.superResult(): " + o2.superResult() + " (expected 2)");
console.log("o3.test(): " + o3.test() + " (expected 3)");
console.log("o3.result(): " + o3.result() + " (expected 3)");
console.log("o3.superTest(): " + o3.superTest() + " (expected 1)");
console.log("o3.superResult(): " + o3.superResult() + " (expected 3)");
console.log("o4.test(): " + o4.test() + " (expected 4)");
console.log("o4.result(): " + o4.result() + " (expected 3)");
console.log("o4.superTest(): " + o4.superTest() + " (expected 1)");
console.log("o4.superResult(): " + o4.superResult() + " (expected 4)");
console.log("o1.mult(10,10): " + o1.mult(10, 10) + " (expected 100)");
console.log("o2.mult(10,10): " + o2.mult(10, 10) + " (expected 200)");
console.log("o2.superMult(10,10): " + o2.superMult(10,10) + " (expected 200)");
console.log("o3.mult(10,10): " + o3.mult(10,10) + " (expected 300)");
console.log("o3.superMult(10,10): " + o3.superMult(10,10) + " (expected 300)");
console.log("o4.mult(10,10): " + o4.mult(10,10) + " (expected 400)");
console.log("o4.superMult(10,10): " + o4.superMult(10,10) + " (expected 400)");
