
if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.Document = (function() {

	Document = function(styleSheet) {
		this.styleSheet = styleSheet;
		this.pageSequenceList = [];
		this.lineContainerMap = {}; // id : node

		this.pageList = [];

		this.sectionBreak = [];
	};

	this.ContentNode = function(nodeType) {
		this.NodeType = {
			Paragraph : 0, 
			Table : 1
		};
		this.nodeType = nodeType;
		this.contentLineList = [];

		this.appendLine = function(contentLine) {
			this.contentLineList.push(contentLine);
		};

		this.insertLine = function(whereLine, newLine) {
			var index = this.contentLineList.index(whereLine);
			this.contentLineList.splice(index, 1, newLine);
		};

		this.deleteLine = function(contentLine) {
			var index = this.contentLineList.indexOf(contentLine);
			this.contentLineList.splice(index, 1);
		};
	};

	Document.prototype.newPage = function(pageAfter) {
		var index = 0;
		var pageSeq;
		for (var i = 0; i < this.pageSequenceList.length; i++) {
			pageSeq = this.pageSequenceList[i];
			if (pageSeq.pageCount() + index > pageAfter) {
				var insertPageNo = pageAfter - index;
				pageSeq.newPage(insertPageNo);
			}
		}
	};

	Document.prototype.addSectionBreak = function(index) {
		// sort page sequences
		this.sectionBreak.push(index);
	};

	Document.prototype.getPage = function(pageIndex) {
		for (var i = 0; i < this.pageSequenceList.length; i++) {
			var pageSeq = this.pageSequenceList[i];
			if (pageSeq.pageCount() + index > pageIndex) {
				return pageSeq.pageAt(pageIndex - index);
			}
		}
	};

	Document.prototype.takeClick = function(page, point) {
		
	};

	Document.prototype.getSectionDef = function(sectionName) {
		return this.styleSheet.getSectionDef(sectionName);
	};

	Document.prototype.newPageSequence = function(name) {

	};


	function uuidGen() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    	var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    	return v.toString(16);
		});
	};

	return Document;
})();

BiSheng.Point = {
	x : 0, 
	y : 0
};

BiSheng.Selection = function() {

};


















