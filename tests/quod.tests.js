/*!
* QuodJS - Object Oriented JavaScript v0.0.1
* http://goffreder.github.io
*
* Copyright 2014, Emanuele Biancardi
* Released under the MIT License
*/

// Preparing the test field
var setTestField = function() {
    Class("One", { c : 1 }, {
        mult : function mult(n, m) { return n * m * this.c; },
        test : function test() { return 1; },
        result : function result() { return this.test(); }
    });

    Class("Two", { c : 2 }, {
        test : function test() { return 2; },
        superTest : function superTest() { return this.Super("test"); },
        superResult : function superResult() { return this.Super("result"); },
        superMult : function superMult(n, m) { return this.Super("mult", n, m); }
    }).Extends("One");

    Class("Three", { c : 3 }, {
        mult : function mult(n, m) { return n * m * this.c; },
        test : function test() { return 3; },
        result : function result() { return 3; }
    }).Extends("Two");

    Class("Four", { c : 4 }, {
        test : function test() { return 4; }
    }).Extends("Three");

    o1 = New("One");
    o2 = New("Two");
    o3 = New("Three");
    o4 = New("Four");
}
setTestField();


// First module: Inheritance and super
QUnit.module("Inheritance and super");
QUnit.test("o1.test()", function(assert) {
    assert.equal(o1.test(), 1);
});
QUnit.test("o1.result()", function(assert) {
    assert.equal(o1.result(), 1);
});
QUnit.test("o2.test()", function(assert) {
    assert.equal(o2.test(), 2);
});
QUnit.test("o2.result()", function(assert) {
    assert.equal(o2.result(), 2);
});
QUnit.test("o2.superTest()", function(assert) {
    assert.equal(o2.superTest(), 1);
});
QUnit.test("o2.superResult()", function(assert) {
    assert.equal(o2.superResult(), 2);
});
QUnit.test("o3.test()", function(assert) {
    assert.equal(o3.test(), 3);
});
QUnit.test("o3.result()", function(assert) {
    assert.equal(o3.result(), 3);
});
QUnit.test("o3.superTest()", function(assert) {
    assert.equal(o3.superTest(), 1);
});
QUnit.test("o3.superResult()", function(assert) {
    assert.equal(o3.superResult(), 3);
});
QUnit.test("o4.test()", function(assert) {
    assert.equal(o4.test(), 4);
});
QUnit.test("o4.result()", function(assert) {
    assert.equal(o4.result(), 3);
});
QUnit.test("o4.superTest()", function(assert) {
    assert.equal(o4.superTest(), 1);
});
QUnit.test("o4.superResult()", function(assert) {
    assert.equal(o4.superResult(), 4);
});
QUnit.test("o1.mult(10, 10)", function(assert) {
    assert.equal(o1.mult(10, 10), 100);
});
QUnit.test("o2.mult(10, 10)", function(assert) {
    assert.equal(o2.mult(10, 10), 200);
});
QUnit.test("o2.superMult(10, 10)", function(assert) {
    assert.equal(o2.superMult(10, 10), 200);
});
QUnit.test("o3.mult(10, 10)", function(assert) {
    assert.equal(o3.mult(10, 10), 300);
});
QUnit.test("o3.superMult(10, 10)", function(assert) {
    assert.equal(o3.superMult(10, 10), 300);
});
QUnit.test("o4.mult(10, 10)", function(assert) {
    assert.equal(o4.mult(10, 10), 400);
});
QUnit.test("o4.superMult(10, 10)", function(assert) {
    assert.equal(o4.superMult(10, 10), 400);
});
