

if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.Editor = (function() {

	Editor = function(document) {
		this.options = {
		    textColor: 'WindowText',
		    backgroundColor: 'Window',
		    selectionColor: 'Highlight',
		    focusColor: '#09f',
		    fontFamily: '"Courier New", Courier, monospace',
		    fontSize: 14,
		    padding: 5,
		    width: 640,
		    height: 480
		};

		this.className = 'bisheng-editor';

		this.documentDiv = this.createDocumentDiv();

		this.cursor = new BiSheng.Cursor(this);

		this.pageCanvasList = [];
	};
	

	Editor.prototype.createDocumentDiv = function() {
		this.createDocumentDiv = document.createElement('div');
	  	this.createDocumentDiv.className = this.className;
	  	this.createDocumentDiv.style.display = 'inline-block';
		this.createDocumentDiv.style.position = 'relative';
		this.createDocumentDiv.style.backgroundColor = this.options.backgroundColor;
		this.createDocumentDiv.style.border = this.options.padding + 'px solid ' + this.options.backgroundColor;
		this.createDocumentDiv.style.overflow = 'hidden';
		this.createDocumentDiv.tabIndex = 0; // tabindex is necessary to get focus
		// this.createDocumentDiv.addEventListener('focus', this.focus.bind(this), false);
		return this.createDocumentDiv;
	};

	Editor.prototype.createPageCanvas = function(w, h, pageIndex) {
		var pageDiv = document.createElement('div');
	  	pageDiv.className = "page-div";
	  	pageDiv.style.display = 'inline-block';
		pageDiv.style.position = 'relative';
		pageDiv.style.backgroundColor = this.options.backgroundColor;
		pageDiv.style.border = this.options.padding + 'px solid ' + this.options.backgroundColor;
		pageDiv.style.overflow = 'hidden';


		var canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		canvas.style.display = "block";

		pageDiv.appendChild(canvas);
		this.documentDiv.appendChild(pageDiv);

		this.pageCanvasList.push(canvas);
		return canvas;
	};

	Editor.prototype.setCursor = function(pageIndex, x, y) {
		// this.cursor.setPosition(rect.left, rect.top);

		var pageCanvas = this.pageCanvasList[pageIndex];
		var rect = pageCanvas.getBoundingClientRect();
		this.cursor.setPosition(rect.left + x, rect.top + y);
	};

	Editor.prototype.getDocumentElement = function() {
		return this.documentDiv;
	};

	return Editor;

})();

BiSheng.Selction = (function() {

	Selction = function() {

	};

	return Selction;

})();


BiSheng.Cursor = (function() {

	Cursor = function(editor) {
		this.color = 'red';

		this.blinkInterval = 500;

		this.el = document.createElement('div');
		this.el.style.position = 'absolute';
		this.el.style.width = '10px';
		// this.el.style.height = this.editor.getFontMetrics().getHeight() + 'px';
		this.el.style.height = 20 + 'px';
		this.el.style.backgroundColor = this.color;

		// editor.getDocumentElement().appendChild(this.el);
		document.body.appendChild(this.el);

	  	this.el.style.zIndex = 24;
		this.interval = setInterval(this.blink.bind(this), this.blinkInterval);
	};

	Cursor.prototype.blink = function() {
		if (parseInt(this.el.style.opacity, 10)) {
			this.el.style.opacity = 0;
		} else {
			this.el.style.opacity = 1;
		}
	};


	Cursor.prototype.setVisible = function(visible) {
		clearInterval(this.interval);
  		if (visible) {
    		this.el.style.display = 'block';
    		this.el.style.opacity = 1;
    		this.interval = setInterval(this.blink.bind(this), this.blinkInterval);
  		} else {
    		this.el.style.display = 'none';
  		}
  		this.visible = visible;
	};

	Cursor.prototype.setPosition = function(x, y) {
		this.el.style.left = x + 'px';
		this.el.style.top = y + 'px';
	};

	return Cursor;

})();