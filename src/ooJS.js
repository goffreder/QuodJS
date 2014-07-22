(function(scope) {
	Object.defineProperty(Object.prototype, "Class", {
		value : function(name, properties, prototype) {
			scope[name] = new Function(
				"return function " + name + "(){ return this; }"
			)();
			for(var p in properties) {
				scope[name][p] = properties[p];
			}
			scope[name].prototype = prototype;
			return scope[name];
		},
		enumerable : false
	});
	Object.defineProperty(Object.prototype, "New", {
		value : function(Class) {
			var obj = new Class();
			for(var p in Class)
				obj[p] = Class[p];
			return obj;
		},
		enumerable : false
	});
	Object.defineProperty(Function.prototype, "Extends", {
		value: function (Class) {
			for(var p in Class.prototype)
				if('undefined' === typeof this.prototype[p])
					this.prototype[p] = Class.prototype[p];
			for(var p in Class) this[p] = Class[p];
			this.prototype.superclass = Class;
			return true;
		},
		enumerable: false
	});
	Object.defineProperty(Object.prototype, "Super", {
		value : function(Class) {
			return Class.superclass.prototype;
		},
		enumerable : false
	});
})(this);
