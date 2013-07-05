(function(){var extend=tinymce.extend;tinymce.PluginManager.requireLangPack('improvedcode');tinymce.create('tinymce.plugins.ImprovedCodePlugin',{init:function(ed,url){var t=this;t.settings=extend({height:580,indentUnit:4,tabSize:4,lineWrapping:true,lineNumbers:true,autoIndent:true,optionsBar:true,theme:'default'},ed.getParam('improvedcode_options'));ed.addCommand('mceImprovedCode',function(){ed.focus();ed.selection.collapse(true);ed.selection.setContent('<span class="CuRCaRet" style="display:none">&#0;</span>');ed.windowManager.open({file:url+'/improvedcode.htm',width:720,height:t.settings.height,inline:true,resizable:true,maximizable:true},{plugin_url:url,settings:t.settings})});ed.addButton('improvedcode',{title:'improvedcode.desc',cmd:'mceImprovedCode',image:url+'/img/htmlplus.gif'});ed.onNodeChange.add(function(ed,cm,n){cm.setActive('improvedcode',n.nodeName=='IMG')})},createControl:function(n,cm){return null},getInfo:function(){return{longname:'Improved source code highlighter plugin',author:'Agustin Villalba',authorurl:'http://www.agustinvillalba.com',infourl:'http://www.agustinvillalba.com/portfolio.html',version:'1.2.1'}}});tinymce.PluginManager.add('improvedcode',tinymce.plugins.ImprovedCodePlugin)})();
