if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.PageDef = (function() {

	PageDef = function(width, height, margin) {
		this.width = width;
		this.height = height;
		this.margin = margin;

		this.headerMargin;
		this.footerMargin;
	};
	
	return PageDef;
})();

