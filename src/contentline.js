
if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.ContentLine = (function() {

	ContentLine = function(width, height, matrix) {
		this.box = new BiSheng.Box(width, height);

		this.matrix = matrix;

		this.init();
	};

	ContentLine.prototype.init = function() {
		
	};

	return ContentLine;
})();