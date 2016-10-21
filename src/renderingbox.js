
if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.debug = true;

BiSheng.RenderContext = (function() {

	RenderContext = function(ctx) {
		this.ctx = ctx;

		this.strokeStyle = "black";
		this.font = "48px serif";
	};

	RenderContext.prototype.strokeRect = function(x, y, width, height) {
		this.ctx.strokeStyle = this.strokeStyle;
		this.ctx.strokeRect(x, y, width, height);
		return this;
	};

	RenderContext.prototype.fillText = function(text, x, y) {
		this.ctx.font = this.font;
		this.ctx.fillText(text, x, y);
	};

	return RenderContext;

})();

BiSheng.RenderingBox = (function() {

	RenderingBox = function(x, y, w, h, parent) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		this.type = "unknown";

		this.parent = parent; // parent box

		this.children = [];
	};

	RenderingBox.prototype.addChild = function(index, childBox) {
		this.children.splice(index, childBox);
	};

	RenderingBox.prototype.appendChild = function(childBox) {
		this.children.push(childBox);
	};

	RenderingBox.prototype.removeChild = function(index) {
		this.children.splice(index);
	};

	RenderingBox.prototype.render = function(ctx) {

		if (BiSheng.debug) {
			// render self first
			ctx.strokeStyle = "black";
			ctx.strokeRect(this.x, this.y, this.width, this.height);
			ctx.font = "18px serif";
			ctx.fillText(this.type, this.x, this.y + 18);
		}
		
		// recursive render children
		for (var i = 0;  i < this.children.length; i++) {
			var child = this.children[i];
			child.render(ctx);
		}
	};

	RenderingBox.prototype.contains = function(p) {
		return p.x >= this.x 
			&& p.x <= (this.x + this.width) 
			&& p.y >= this.y 
			&& p.y <= (this.y + this.height);
	};

	RenderingBox.prototype.locateToBox = function(p) {
		if (!this.contains(p)) {
			return null;
		}
		if (this.isEmpty()) {
			return this;
		}

		for (var i = 0; i < this.children.length; i++) {
			var childBox = this.children[i];
			if (childBox.locateToBox(p) != null) {
				return childBox;
			}
		}
		return this;
	};

	RenderingBox.prototype.isEmpty = function() {
		return this.children.length === 0;
	};

	RenderingBox.prototype.grow = function() {

	};

	return RenderingBox;
})();

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



BiSheng.RenderingPage = (function() {
	
	RenderingPage = function(pageDef) {
		BiSheng.RenderingBox.call(this, 0, 0, pageDef.width, pageDef.height, null);

		this.pageDef = pageDef;
		this.width = this.pageDef.width;
		this.height = this.pageDef.height;

		this.type = "page";
		
		this.headerFrame;
		this.bodyFrame;
		this.footerFrame;

		this.init();
	};

	RenderingPage.prototype = new BiSheng.RenderingBox();

	RenderingPage.prototype.init = function() {
		if (this.pageDef == null || this.pageDef === undefined) {
			throw "no page def";
		}

		var leftMargin = this.pageDef.margin.left;
		var topMargin = this.pageDef.margin.top;
		var rightMargin = this.pageDef.margin.right;
		var bottomMargin = this.pageDef.margin.bottom;

		this.constructHeaderFrame();
		this.constructBodyFrame();
		this.constructFooterFrame();
	};

	RenderingPage.prototype.constructHeaderFrame = function() {
		var leftMargin = this.pageDef.margin.left;
		var topMargin = this.pageDef.margin.top;
		var rightMargin = this.pageDef.margin.right;
		var bottomMargin = this.pageDef.margin.bottom;

		var headerMargin = this.pageDef.headerMargin;
		var headerWidth = this.width - leftMargin - rightMargin;
		var headerHeight = topMargin - headerMargin;

		var x = leftMargin;
		var y = headerMargin;
		var w = headerWidth;
		var h = headerHeight;
		this.headerFrame = new BiSheng.RenderingFrame(x, y, w, h, this);
		this.appendChild(this.headerFrame);
	};

	RenderingPage.prototype.constructBodyFrame = function() {
		var leftMargin = this.pageDef.margin.left;
		var topMargin = this.pageDef.margin.top;
		var rightMargin = this.pageDef.margin.right;
		var bottomMargin = this.pageDef.margin.bottom;

		var bodyWidth = this.width - leftMargin - rightMargin;
		var bodyHeight = this.height - topMargin - bottomMargin;

		var x = leftMargin;
		var y = topMargin;
		var w = bodyWidth;
		var h = bodyHeight;
		this.bodyFrame = new BiSheng.RenderingFrame(x, y, w, h, this);

		this.bodyFrame.init();
		this.appendChild(this.bodyFrame);
	};

	RenderingPage.prototype.constructFooterFrame = function() {
		var leftMargin = this.pageDef.margin.left;
		var topMargin = this.pageDef.margin.top;
		var rightMargin = this.pageDef.margin.right;
		var bottomMargin = this.pageDef.margin.bottom;
		var bodyHeight = this.height - topMargin - bottomMargin;

		var footerWdith = this.width - leftMargin - rightMargin;
		var footerHeight = this.height - bodyHeight - topMargin - this.pageDef.footerMargin;

		var x = leftMargin;
		var y = this.height - bottomMargin;
		var w = footerWdith;
		var h = footerHeight;
		this.footerFrame = new BiSheng.RenderingFrame(x, y, w, h, this);
		this.appendChild(this.footerFrame);
	};

	RenderingPage.prototype.constructFrame = function(x, y, w, h) {
		var frame = new BiSheng.RenderingFrame(x, y, w, h, this);
		return frame;
	};

	return RenderingPage;
})();


BiSheng.RenderingFrame = (function() {
	
	RenderingFrame = function(x, y, w, h, parent) {
		BiSheng.RenderingBox.call(this, x, y, w, h, parent);

		this.type = "frame";
	};

	RenderingFrame.prototype = new BiSheng.RenderingBox();

	RenderingFrame.prototype.init = function() {
		this.createContentBox();
	};

	RenderingFrame.prototype.createContentBox = function() {
		// apply margin
		var h = this.getLineHeight();
		var box = new BiSheng.RenderingContentBox(this.x, this.y, this.width, h, this);
		this.appendChild(box);
	};

	RenderingFrame.prototype.getLineHeight = function() {
		return 20;
	};
	
	RenderingFrame.prototype.grow = function() {
		// RenderingBox.prototype.grow.call(this);
		RenderingBox.prototype.grow.apply(this);
		console.log("grow 1: " + (this.w + 1));
	};	

	return RenderingFrame;
})();

BiSheng.RenderingContentBox = (function() {

	RenderingContentBox = function(x, y, w, h, parent) {
		BiSheng.RenderingBox.call(this, x, y, w, h, parent);

		this.type = "content-box";
	};

	RenderingContentBox.prototype = new BiSheng.RenderingBox();

	return RenderingContentBox;
})();


BiSheng.RenderingDocument = (function() {

	RenderingDocument = function() {

	};

	return RenderingDocument;

})();