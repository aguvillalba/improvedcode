tinyMCEPopup.requireLangPack();

function ImprovedCodeEditor() {
	var _cmSettings = null;

	this.init = function () {
		tinyMCEPopup.resizeToInnerSize();

		// Remove Gecko spellchecking
		if (tinymce.isGecko)
			document.body.spellcheck = tinyMCEPopup.editor.getParam("gecko_spellcheck");

		document.getElementById('htmlSource').value = tinyMCEPopup.editor.getContent({source_view : true});
		_setWrap('soft');

		this.resizeInputs();

		_cmSettings = tinyMCEPopup.getWindowArg("settings");
		if(_cmSettings.optionsBar) {
			document.getElementById('wraped').checked = _cmSettings.lineWrapping;
			document.getElementById('highlighting').checked = true;
			document.getElementById('indented').checked = _cmSettings.autoIndent;
			document.getElementById('linenumbers').checked = _cmSettings.lineNumbers;
		} else {
			var el = document.getElementById('optionsBar');
			el.parentNode.removeChild(el);
		}

		_cmSettings.url = tinyMCEPopup.getWindowArg("plugin_url");
		_cmSettings.themeUrl = "js/codemirror/theme/";
		_cmSettings.theme = _sanitizeTheme(_cmSettings.theme, _cmSettings.themeUrl);
		_loadCssTheme();
		_cmSettings.cme = _initCodeMirror(_cmSettings);
		_resizeCodeMirror();
		if(_cmSettings.autoIndent) { _indentCode(true); }
	};

	this.resizeInputs = function() {
		var vp = tinyMCEPopup.dom.getViewPort(window), el;

		el = document.getElementById('htmlSource');

		if (el) {
			el.style.width = (vp.w - 20) + 'px';
			el.style.height = (vp.h - 65) + 'px';
		}

		if(null !== _cmSettings) _resizeCodeMirror();
	};

	this.saveContent = function() {
		var content = document.getElementById('htmlSource').value;
		if(null !== _cmSettings) {
			content = _cmSettings.cme.getDoc().getValue();
		}
		tinyMCEPopup.editor.setContent(content, {source_view : true});
		tinyMCEPopup.close();
	};

	this.toggleHighlighting = function(elm) {
		if(elm.checked) {
			_cmSettings.cme.setOption("theme",_cmSettings.theme);
		} else {
			_cmSettings.cme.setOption("theme","none");
		}
	};

	this.toggleIndent = function(elm) {
		_indentCode(elm.checked);
	};

	this.toggleLineNumbers = function(elm) {
		_cmSettings.cme.setOption("lineNumbers",elm.checked);
	};

	this.toggleWordWrap = function(elm) {
		_cmSettings.cme.setOption("lineWrapping",elm.checked);
	};

	////////////////////////////////////////////
	/**
	*	Private Methods
	*/

	function _fileExists(url)
	{
		var http = new XMLHttpRequest();
		http.open('HEAD', url, false);
		http.send();
		return http.status==200;
	};

	function _indentCode(on) {
		var lines = _cmSettings.cme.getDoc().lineCount();
		var indent_mode = on ? "smart" : "substract";
		for(var i=0;i<lines;i++) {
			_cmSettings.cme.indentLine(i,indent_mode);
		}
	};

	function _initCodeMirror(settings,theme) {
		var textArea = document.getElementById("htmlSource");
		var myCodeMirror = CodeMirror.fromTextArea(
								textArea
								,{
									indentUnit: settings.indentUnit
									,tabSize: settings.tabSize
									,lineNumbers: settings.lineNumbers
									,theme: settings.theme
									,lineWrapping: settings.lineWrapping
									,mode: "application/xml"
								}
							);
		return myCodeMirror;
	};

	function _loadCssTheme() {
		if('' == _cmSettings.theme || 'default' == _cmSettings.theme) return null;

		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", _cmSettings.themeUrl + _cmSettings.theme + ".css");
		document.getElementsByTagName("head")[0].appendChild(fileref);	

	};

	function _resizeCodeMirror() {
		var vp = tinyMCEPopup.dom.getViewPort(window);
		_cmSettings.cme.setSize("100%",vp.h - 60);
	};

	function _sanitizeTheme(theme, themeUrl) {
		if('' == theme || 'default' == theme) return 'default';

		if(_fileExists(themeUrl + theme + ".css")) {
			return theme;
		} else {
			return '';
		}
	};

	function _setWrap(val) {
		var v, n, s = document.getElementById('htmlSource');

		s.wrap = val;

		if (!tinymce.isIE) {
			v = s.value;

			n = s.cloneNode(false);
			n.setAttribute("wrap", val);
			s.parentNode.replaceChild(n, s);
			n.value = v;
		}
	};
}

var ice = new ImprovedCodeEditor();
tinyMCEPopup.onInit.add(ice.init, ice);

