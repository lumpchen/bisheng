

if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.PageSequence = (function(sectionName, sectionDef) {
	
	PageSequence = function() {
		this.sectionName = sectionName;
		this.sectoinDef = sectoinDef;

		this.pageList = [];
	};

	PageSequence.prototype.newPage = function() {
		var pageDef = new BiSheng.PageDef();
		pageDef.width = this.sectoinDef.width;
		pageDef.height = this.sectoinDef.height;
		pageDef.margin = this.sectoinDef.margin;
		pageDef.headerMargin = this.sectoinDef.headerMargin;
		pageDef.footerMargin = this.sectoinDef.footerMargin;

		var newPage = new BiSheng.Page(pageDef);
		return newPage;
	};

	PageSequence.prototype.newPage = function(pageIndex) {
		var newPage = this.newPage();
		this.pageList.splice(pageIndex, 0, newPage);
	};

	PageSequence.prototype.pageCount = function() {
		return this.pageList.length;
	};

	PageSequence.prototype.addPage = function(page) {
		this.pageList.push(page);
	};

	PageSequence.prototype.pageAt = function(pageIndex) {
		return this.pageList[pageIndex];
	};

	return PageSequence;
	
})();