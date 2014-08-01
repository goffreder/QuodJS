// # QuodJS - Object Oriented JavaScript
/*!
 * QuodJS - Object Oriented JavaScript v0.0.1
 * http://goffreder.github.io
 *
 * Copyright 2014, Emanuele Biancardi
 * Released under the MIT License
 */
// This library works by auto-executing an anonym function that adds to the
// scope the defined properties. Passing along the `scope` (instead of adding
// everything directly to the `window` object) allows the library to work
// also within Node.js.
(function(scope) {
	// This function emulates the `Class` keyword of object-oriented languages.
	//
	// It takes as arguments the `name` of the new class, its public `properties`
	// and its `prototype`, and returns the new Class object. The methods in the prototype
	// MUST NOT be anonymous for the `Super` mechanism to work correctly.
	//
	// To do this, it adds a `Class` property to the `Object` prototype
	// (so it can be called upon the scope).
	/**
	 * Adds a new Class to the system.
	 * @method Class
	 * @param {String} name The name of the class.
	 * @param {Object} properties The public properties of the class, with their initialization values.
	 * @param {Object} prototype The public methods of the class.
	 * @return {Function} The new Class class.
	 */
	Object.defineProperty(Object.prototype, "Class", {
		// The value for the `Class` property.
		value : function(name, properties, prototype) {
			// Adds a `name` property to the `scope` and sets it to a new, auto-executing `Function`
			// object that returns a function `name`, that in turn returns this
			// (thus becoming a constructor for `name` objects).
			var func = "return function " + name + "(){";
			func += " return this; }";
			scope[name] = new Function(
				func
			)();
			// Iterates through the passed `properties` and adds them to the constructor
			// as public properties.
			for(var p in properties) {
				scope[name][p] = properties[p];
			}
			// The constructor prototype is set to the passed `prototype`. All its methods are public.
			scope[name].prototype = prototype;
			// Returns the constructor.
			return scope[name];
		}
	});
	// This function emulates the `New` keyword of object-oriented languages.
	//
	// It takes as argument the name of the class that we want to instantiate
	// and returns a new object of the given class.
	//
	// It replaces the native `new` JavaScript keyword, allowing us to add the class properties
	// to the new object.
	//
	// This function is again added to the `Object` prototype.
	/**
	* Instantiates a new object for the given Class.
	* @method New
	* @param {String} Classname The name of the class.
	* @return {Object} The new Class object.
	*/
	Object.defineProperty(Object.prototype, "New", {
		// The value for the `New` property.
		value : function(Classname) {
			// Instantiates a new object by calling the `Classname` method of the `scope` object.
			var obj = new scope[Classname]();
			// Iterates through the class properties and adds them to the new object.
			for(var p in scope[Classname])
				obj[p] = scope[Classname][p];
			// Returns the new object.
			return obj;
		}
	});
	// This function emulates the `Extends` keyword of object-oriented languages.
	//
	// It takes as argument the name of the class that we want to extend.
	//
	// This function is added to the `Function` object, allowing us to chain after
	// a new Class instance.
	/**
	* Extends a given Class with the newly created class.
	* @method Extends
	* @param {String} Classname The name of the other class extended by this class.
	*/
	Object.defineProperty(Function.prototype, "Extends", {
		// The value for the `Extends` property.
		value: function (Classname) {
			// Iterates through the extended class prototype, adding to the extending
			// class any method that has not been overrided (and thus not already added
			// to the class).
			for(var p in scope[Classname].prototype)
				if('undefined' === typeof this.prototype[p]) {
					this.prototype[p] = scope[Classname].prototype[p];
					// To maintain a reference to the superclasses methods and prototype, we add an
					// `heritage` object where we store for every inherited method or property, who this class
					// has inherited it from.
					if('undefined' === typeof this.prototype.heritage)
						this.prototype.heritage = {};
					if('undefined' !== typeof scope[Classname].prototype.heritage)
						this.prototype.heritage[p] = scope[Classname].prototype.heritage[p] || Classname;
					else
						this.prototype.heritage[p] = Classname;
			}
			// Iterates through the extended class properties, adding to the extending
			// class any property that has not been overrided (and thus not already added
			// to the class).
			for(var p in scope[Classname])
				if('undefined' === typeof this[p]) {
					this[p] = scope[Classname][p];
					if('undefined' === typeof this.prototype.heritage)
						this.prototype.heritage = {};
					if('undefined' !== typeof scope[Classname].prototype.heritage)
						this.prototype.heritage[p] = scope[Classname].prototype.heritage[p] || Classname;
					else
						this.prototype.heritage[p] = Classname;
				}
			// Sets the extended class as `superclass` for the extending class.
			// The `superclass` property is added to the prototype to maintain
			// some kind of information hiding.
			this.prototype.superclass = scope[Classname];
		}
	});
	// This function emulates the `Super` keyword of object-oriented languages.
	//
	// It takes as argument the method or the property we want from the superclass, plus any other argument
	// that we need to pass to it if it's a method.
	//
	// Again, this function is added to the `Object` prototype.
	/**
	* Returns the superclass prototype for the given class.
	* @method Super
	* @param {String} p The method or the property we want from the superclass.
	* @return {Mixed} The wanted property or method return.
	*/
	Object.defineProperty(Object.prototype, "Super", {
		value : function(p) {
			var caller = arguments.callee.caller.name;
			var args = [].splice.call(arguments, 0);
			args.splice(0, 1);
			var prop;
			// If we call `Super` in an inherited method, we need to get method or property `p` from
			// the class we have inherited it.
			if('undefined' !== typeof this.heritage[caller]) { prop = scope[this.heritage[caller]].prototype.superclass.prototype[p]; }
			else { prop = this.superclass.prototype[p]; }
			if('function' === typeof prop)
				return prop.apply(this, args);
			return prop;
		}
	});
})(this);
