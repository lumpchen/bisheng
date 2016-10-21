
if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.Page = (function() {

	Page = function(pageDef) {
		this.pageDef = pageDef;

		this.width = this.pageDef.width;
		this.height = this.pageDef.height;

		this.matrix = new Matrix();

		this.headerFrame;
		this.bodyFrame;
		this.footerFrame;
		this.constuctFrames();
	};

	Page.prototype.constuctFrames = function() {
		if (this.pageDef == null || this.pageDef === undefined) {
			throw "no page def";
		}

		var leftMargin = this.pageDef.margin.left;
		var topMargin = this.pageDef.margin.top;
		var rightMargin = this.pageDef.margin.right;
		var bottomMargin = this.pageDef.margin.bottom;

		// construct header frame
		var headerMargin = this.pageDef.headerMargin;
		var headerMartrix = this.matrix.clone().translate(leftMargin, headerMargin);
		var headerWidth = this.width - leftMargin - rightMargin;
		var headerHeight = topMargin - headerMargin;
		this.headerFrame = new BiSheng.Frame(headerWidth, headerHeight, headerMartrix);
 
		// construct body frame
		var bodyMatrix = this.matrix.clone().translate(leftMargin, topMargin);
		var bodyWidth = this.width - leftMargin - rightMargin;
		var bodyHeight = this.height - topMargin - bottomMargin;
		this.bodyFrame = new BiSheng.Frame(bodyWidth, bodyHeight, bodyMatrix);

		// construct footer frame
		var footerWdith = this.width - leftMargin - rightMargin;
		var footerHeight = this.height - bodyHeight - topMargin - this.pageDef.footerMargin;
		var footerMatrix = this.matrix.clone().translate(leftMargin, this.height - bottomMargin);
		this.footerFrame = new BiSheng.Frame(footerWdith, footerHeight, footerMatrix);
	};

	Page.prototype.takeClick = function(point) {

	};

	return Page;
})();
