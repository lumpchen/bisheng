
if ("undefined" === typeof BiSheng) {
    var BiSheng = {};
}

BiSheng.StyleSheet = (function() {
	
	StyleSheet = function() {
		this.sectionDefMap = {};
		this.paragraphStyleMap = {};

		this.SectionDef = function() {
			this.width;
			this.height;
			this.margin;
			this.headerMargin;
			this.footerMargin;
		};

		this.ParagraphStyle = function() {

			this.alignment = BiSheng.Alignment.left;
			this.margin;
			this.lineHeight;

			this.spacingBefore;
			this.spacingAfter;

			this.fontFamily;
			this.fontSize;

			this.calcLineHeight = function() {
				return this.lineHeight;
			};
		};
	};

	StyleSheet.prototype.addSectionDef = function(name, def) {
		this.sectionDefMap[name] = def;
	};
	StyleSheet.prototype.getSectionDef = function(name) {
		return this.sectionDefMap[name];
	};
	StyleSheet.prototype.addParaStyle = function(name, style) {
		this.paragraphStyleMap[name] = style;
	};
	StyleSheet.prototype.getParaStyle = function(name) {
		return this.paragraphStyleMap[name];
	};

	return StyleSheet;
})();

BiSheng.Alignment = {
	left : 0,
	centered : 1,
	right : 2,
	justify : 3
};

BiSheng.Margin = {
	left : 0,
	top : 0,
	right : 0,
	bottom : 0
};
