
if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.Point = (function() {

	Point = function(x, y) {
		this.x = x != null ? x : 0;
		this.y = y != null ? y : 0;
	};

	Point.prototype.create = function(x, y) {
		return new Point(x, y);
	};

	Point.fromArray = function(arr) {
		return new Point(arr[0], arr[1]);
	};

	Point.prototype.set = function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	};

	Point.prototype.copy = function(p) {
		this.x = p.x;
		this.y = p.y;
		return this;
	};

	Point.prototype.equals = function(p, tolerance) {
		if (tolerance == null) {
			tolerance = 0.0000001;
		}
		return (Math.abs(p.x - this.x) <= tolerance) && (Math.abs(p.y - this.y) <= tolerance);
	};

	return Point;
})();

BiSheng.Rect = (function() {

	Rect = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};

	Rect.prototype.contains = function(p) {
		return p.x >= this.x 
			&& p.x <= (this.x + this.width) 
			&& p.y >= this.y 
			&& p.y <= (this.y + this.height);
	};

	return Rect;
})();


BiSheng.Box = (function() {

	Box = function(width, height, parent) {
		this.width = width;
		this.height = height;
		this.children = [];

		this.parent = parent;
		this.flowable = true;

		this.flowHeight = 0;

		this.matrix = new Matrix();
	};

	Box.prototype.translate = function(tx, ty) {
		this.matrix.translate(tx, ty);
	};

	Box.prototype.isFlowable = function() {
		return this.flowable;
	};

	Box.prototype.setFlowable = function(flowable) {
		this.flowable = flowable;
	};

	Box.prototype.glowable = function(grow) {
		var h = this.flowHeight + grow;
		if (h < this.height) {
			return false;
		}
		return true;
	};
	
	Box.prototype.grow = function(grow) {
		this.height += grow;
		return this;
	};

	Box.prototype.appendChild = function(childBox) {
		this.children.push(childBox);

		this.flowHeight += childBox.height;
		return this;
	};

	Box.prototype.getFlowHeight = function() {
		if (this.children.length === 0) {
			return 0;
		}
		var flowHeight = 0;
		for (var i = 0; i < this.children.length; i++) {
			flowHeight += this.children[i].height;
		}
		return flowHeight;
	};

	Box.prototype.remain = function() {
		return this.height - this.flowHeight;
	};

	Box.prototype.contains = function(point) {

	};

	return Box;

})();

