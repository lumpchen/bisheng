
if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.ContentBox = (function() {

	ContentBox = function(width, height, toParentMatrix) {
		this.toParentMatrix = toParentMatrix;

		this.rect = this.rectToParent();

		this.lineList = [];

		this.init();
	};

	ContentBox.prototype.rectToParent = function() {
		var p = this.toParentMatrix.applyToPoint(0, 0);
		return BiSheng.Rect(p.x, p.y, width, height);
	};

	ContentBox.prototype.init = function() {
		
	};

	ContentBox.prototype.addContentLine = function() {

	};

	return ContentBox;
})();