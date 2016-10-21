
if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.Frame = (function() {

	Frame = function(width, height, toPageMatrix) {
		this.width = width;
		this.height = height;
		this.toPageMatrix = toPageMatrix;

		this.rect = this.rectToPage();

		this.init();
	};

	Frame.prototype = new BiSheng.Rect();

	Frame.prototype.rectToPage = function() {
		var p = this.toPageMatrix.applyToPoint(0, 0);
		return BiSheng.Rect(p.x, p.y, width, height);
	};

	Frame.prototype.hit = function(point) {
		return this.rect.contains(point);
	};

	Frame.prototype.init = function() {
		// build first empty content box
		var w = this.calcWidth();
		var h = this.calcHeight();
		var box = new BiSheng.ContentBox();
	};

	Frame.prototype.calcWidth = function() {
		// calculate drawable width
		return this.width;
	};

	Frame.prototype.calcHeight = function() {
		// calculate drawable height
		return this.height;
	};

	return Frame;
})();