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
		}
	});
	Object.defineProperty(Object.prototype, "New", {
		value : function(Classname) {
			var obj = new scope[Classname]();
			for(var p in scope[Classname])
				obj[p] = scope[Classname][p];
			return obj;
		}
	});
	Object.defineProperty(Function.prototype, "Extends", {
		value: function (Classname) {
			for(var p in scope[Classname].prototype)
				if('undefined' === typeof this.prototype[p])
					this.prototype[p] = scope[Classname].prototype[p];
			for(var p in scope[Classname])
				if('undefined' === typeof this[p])
					this[p] = scope[Classname][p];
			this.prototype.superclass = scope[Classname];
		}
	});
	Object.defineProperty(Object.prototype, "Super", {
		value : function(Class) {
			return Class.superclass.prototype;
		}
	});
})(this);
