~function(t){function e(){}t.yf={setItem:function(t,e){return localStorage.setItem(t,encodeURIComponent("object"==typeof e?JSON.stringify(e):String(e)))},getItem:function(t){return decodeURIComponent(localStorage.getItem(t)).match(/\{/),JSON.parse(decodeURIComponent(localStorage.getItem(t)))},removeItem:function(t){return!!localStorage.getItem(t)&&!localStorage.removeItem(t)},isIe:function(){return navigator.userAgent.toLowerCase().indexOf("msie")>=0},jsonParse:function(t){return this.isIe()?JSON.parse(decodeURIComponent(JSON.stringify(t))):t}},yf.userInfo=yf.getItem("userInfo"),$("#userName").append(yf.userInfo.userName),$("#cityLink").find(".name").text(yf.userInfo.city),$.ajax({type:"get",url:"/api/v1/moduleAuthority/"+encodeURIComponent(yf.userInfo.city),dataType:"json",async:!1,success:function(t){if(!t||!t.data)return layer.msg(t.msg);t=yf.jsonParse(t.data);yf.layoutData=t.otherModule,yf.treeModuleData=t.treeModule},error:function(t){}}),yf.placeholder=function(){function t(t){return(t=t||window.event).target||t.srcElement}function e(e){var n=t(e);if(n&&("INPUT"==n.tagName||"TEXTAREA"==n.tagName)){var i=n.__emptyHintEl;i&&(n.value?i.style.display="none":i.style.display="")}}function n(e){var n=t(e);if(n&&("INPUT"==n.tagName||"TEXTAREA"==n.tagName)){var i=n.__emptyHintEl;i&&(i.style.display="none")}}if(!("placeholder"in document.createElement("input"))){document.addEventListener?(document.addEventListener("focus",n,!0),document.addEventListener("blur",e,!0)):(document.attachEvent("onfocusin",n),document.attachEvent("onfocusout",e));for(var i=[document.getElementsByTagName("input"),document.getElementsByTagName("textarea")],o=0;o<2;o++)for(var a=i[o],r=0;r<a.length;r++){var s=a[r],l=s.getAttribute("placeholder"),c=s.__emptyHintEl;c&&s.value?c.style.display="none":c&&!s.value&&(c.style.display="block"),l&&!c&&((c=document.createElement("span")).innerHTML=l,c.className="emptyhint",c.onclick=function(t){return function(){try{t.focus()}catch(t){}}}(s),s.parentNode.style.position="relative",s.value&&(c.style.display="none"),s.parentNode.appendChild(c),s.__emptyHintEl=c)}}},Array.prototype.indexOf=function(t){for(var e=0;e<this.length;e++)if(this[e]==t)return e;return-1},Array.prototype.remove=function(t){var e=this.indexOf(t);return e>-1&&this.splice(e,1),this},Array.prototype.unique=function(){this.sort();for(var t=[this[0]],e=1;e<this.length;e++)this[e]!==t[t.length-1]&&t.push(this[e]);return t};var n=function(){this.name=""};n.prototype.init=function(t,e){var n=this,i=t.split("/"),o=i[i.length-1].substring(i[i.length-1].lastIndexOf("."));if(this.fileName=i[i.length-1].substring(0,i[i.length-1].lastIndexOf(".")),".css"==o){(r=document.createElement("link")).setAttribute("rel","stylesheet"),r.setAttribute("type","text/css"),r.setAttribute("href",t),r.setAttribute("data-href",this.fileName);var a=!0;$("link[data-href]").each(function(t,e){$(e).attr("data-href")==n.fileName?a=!0:(a=!0,document.getElementsByTagName("head")[0].appendChild(r))}),a||document.getElementsByTagName("head")[0].appendChild(r),e&&e()}else if(".js"==o){var r=document.createElement("script");r.setAttribute("charset","utf-8"),r.setAttribute("type","text/javascript"),r.setAttribute("src",t),r.setAttribute("data-href",this.fileName),$("script[data-href]").each(function(t,e){$(e).attr("data-href")==n.fileName&&$($("script[data-href='"+n.fileName+"']")).remove()}),void 0!==e&&(r.readyState?r.onreadystatechange=function(){"loaded"!=r.readyState&&"complete"!=r.readyState||(r.onreadystatechange=null,e())}:r.onload=function(){e()}),document.body.appendChild(r)}};yf.matchTitle=function(t){document.title={houseValuation:"房产估值",layout:"房产估值",valuationRecord:"估值记录",auditPriceRecord:"核价记录",personalData:"基本资料",accountManagement:"账号管理",jurisdictionManagement:"权限管理",moduleExplain:"应用说明"}[t]},yf.matchRouter=function(t){return t?t.match(/.*\/([^?]*)/)[1]:location.href.match(/.*\/([^?]*)/)[1]};var i={version:"1.0.0",map:function(t){t=t.split("?")[0];return i.routes.defined.hasOwnProperty(t)?i.routes.defined[t]:new i.core.route(t)},load:function(t,e){if(e.reload||!$(t).attr("data-refresh")){var n=document.createElement("script");return n.type="type/javascript",n.src=e.controllerUrl,$(t).attr("data-refresh","true").html($.ajax({url:e.templateUrl,async:!1}).responseText).append(n),this}},root:function(t){i.routes.root=t},rescue:function(t){i.routes.rescue=t},history:{initial:{},pushState:function(t,e,n){i.history.supported?i.dispatch(n)&&history.pushState(t,e,n):i.history.fallback&&(window.location.hash="#"+n)},popState:function(t){var e=!i.history.initial.popped&&location.href==i.history.initial.URL;i.history.initial.popped=!0,e||i.dispatch(document.location.pathname)},listen:function(t){if(i.history.supported=!(!window.history||!window.history.pushState),i.history.fallback=t,i.history.supported)i.history.initial.popped="state"in window.history,i.history.initial.URL=location.href,window.onpopstate=i.history.popState;else if(i.history.fallback){for(route in i.routes.defined)"#"!=route.charAt(0)&&(i.routes.defined["#"+route]=i.routes.defined[route],i.routes.defined["#"+route].path="#"+route);i.listen()}}},match:function(t,e){var n,o,a,r,s,l={},c=null;for(c in i.routes.defined)if(null!==c&&void 0!==c)for(n=(c=i.routes.defined[c]).partition(),r=0;r<n.length;r++){if(o=n[r],s=t,o.search(/:/)>0)for(a=0;a<o.split("/").length;a++)a<s.split("/").length&&":"===o.split("/")[a].charAt(0)&&(l[o.split("/")[a].replace(/:/,"")]=s.split("/")[a],s=s.replace(s.split("/")[a],o.split("/")[a]));if(o===s.split("?")[0])return e&&(c.params=l),c}return null},dispatch:function(t){var e,n;if(i.routes.current!==t){if(i.routes.previous=i.routes.current,i.routes.current=t,n=i.match(t,!0),i.routes.previous&&null!==(e=i.match(i.routes.previous))&&null!==e.do_exit&&e.do_exit(),null!==n)return n.run(),!0;null!==i.routes.rescue&&i.routes.rescue()}},listen:function(){var t=function(){i.dispatch(location.hash)};""===location.hash&&null!==i.routes.root&&(location.hash=i.routes.root),"onhashchange"in window&&(!document.documentMode||document.documentMode>=8)?window.onhashchange=t:setInterval(t,50),""!==location.hash&&i.dispatch(location.hash)},core:{route:function(t){this.path=t,this.action=null,this.do_enter=[],this.do_exit=null,this.params={},i.routes.defined[t]=this}},routes:{current:null,root:null,rescue:null,previous:null,defined:{}}};i.core.route.prototype={to:function(t){return this.action=function(){t&&($("div[show-view]").html($.ajax({url:t.templateUrl,async:!1}).responseText),yf.matchTitle(yf.matchRouter()),yf.loadFile(t.controllerUrl),yf.placeholder(),yf.runNavActive(),yf.mainScroll.init())},this},enter:function(t){return t instanceof Array?this.do_enter=this.do_enter.concat(t):this.do_enter.push(t),this},exit:function(t){return this.do_exit=t,this},partition:function(){for(var t,e,n=[],i=[],o=/\(([^}]+?)\)/g;t=o.exec(this.path);)n.push(t[1]);for(i.push(this.path.split("(")[0]),e=0;e<n.length;e++)i.push(i[i.length-1]+n[e]);return i},run:function(){var t,e=!1;if(i.routes.defined[this.path].hasOwnProperty("do_enter")&&i.routes.defined[this.path].do_enter.length>0)for(t=0;t<i.routes.defined[this.path].do_enter.length;t++)if(!1===i.routes.defined[this.path].do_enter[t].apply(this,[])){e=!0;break}e||i.routes.defined[this.path].action()}};var o=function(){this.setings={timer:null,node:"",showNode:"",callBack:function(){}}};o.prototype={init:function(t){$.extend(this.setings,t||{});var e=this,n=this.setings.node,i=this.setings.showNode;this.setings.callBack;n.each(function(t,n){$(n).hover(function(){$(i).length&&("#non_competition"==i.selector&&e.autoSeat(n),e.show(i))},function(){$(i).length&&e.hide(i)})}),i.hover(function(){e.show(i)},function(){e.hide(i)})},show:function(t,e){this.setings.node.addClass("on"),this.setings.showNode.addClass("on"),this.timer&&clearTimeout(this.timer),t.stop(!0,!0).show(),this.setings.callBack&&this.setings.callBack()},hide:function(t){var e=this;this.timer=setTimeout(function(){t.stop(!0,!0).hide(),e.setings.node.removeClass("on"),e.setings.showNode.removeClass("on"),clearTimeout(this.timer)},200)},autoSeat:function(t){var e=$(t).position().top,n=$(t).height(),i=$(t).position().left;$("#non_competition").css({top:e-n+"px",left:i+"px"})}};var a=function(){this.setings={tabId:"",contents:"",offset:""},this.setings.tabId};a.prototype.init=function(t,e){var n=this,e=e||0;if($.extend(this.setings,t||{}),this.setings.index=e||0,$(this.setings.tabId)){if(this.childNode=$(this.setings.tabId).children(),this.childPanel=$(this.setings.contents).children(),$(this.childNode).each(function(t,e){$(e).attr("data-id",t),$(e).unbind().bind("click",function(){n.changeTab($(this),t,$(this).text())})}),this.childNode.hasClass("active")){var i=$(this.setings.tabId).children(".active");n.changeTab($(i),$(i).attr("data-id"),$(i).text())}else this.childNode.eq(e).addClass("active").siblings().removeClass("active"),this.childPanel.eq(e).show().siblings().hide(),this.setings.callBack&&this.setings.callBack();return this.setings.text=$(this.childNode).eq(e).text(),this.setings}},a.prototype.changeTab=function(t,e,n){$(this.childNode).removeClass("active"),$(t).addClass("active"),"opacity"==this.setings.offset?$(this.childPanel).eq(e).removeClass("none").show().siblings().addClass("none").hide():$(this.childPanel).eq(e).show().siblings().hide(),this.setings.index=e,this.setings.text=n,this.setings.callBack&&this.setings.callBack()},e.prototype={_init:function(t,e){this.oSecond=$(t),this.timer=null,this.iSecond=60,this.oSecond.length&&this._interval(e)},_interval:function(t){var e=this,n=t||e.iSecond;e.oSecond.addClass("disable"),this.timer=setInterval(function(){e.oSecond.text(n<=10?"0"+--n+"S":--n+"S"),n<=0&&(clearInterval(e.timer),e.oSecond.removeClass("disable").text("获取验证码"))},1e3)}},yf.mainScroll=function(){var t="";return{init:function(){return this.oContentBody=$("div[show-view]"),this.oScrollWamp=$("#scrollWamp"),this.resize(),this.scroll(),this},resize:function(){var e=this;t=$(window).height()-$(".header").height(),e.oContentBody.css({height:t}),$(window).width()<=1200&&(e.oContentBody.css("width","990px"),$("body").addClass("hidden")),$(window).resize(function(){yf.autopromptingAlign(),t=$(window).height()-$(".header").height(),e.oContentBody.css({width:"auto",height:t}),e.oScrollWamp.css({height:t}),$("body").removeClass("hidden"),$(window).width()<=1200&&(e.oContentBody.css("width","990px"),$("body").addClass("hidden"))})},scroll:function(){this.oScrollWamp.length&&this.oScrollWamp.mCustomScrollbar({setHeight:t,scrollInertia:180,theme:"minimal-dark",axis:"y",alwaysShowScrollbar:2,callbacks:{whileScrolling:function(){if(yf.autopromptingAlign(),$('div[data-type="loading"]').is(":visible")){var t=function(){$('div[data-type="loading"]').each(function(t,e){var n=$(e).attr("data-id"),i=$("#"+n);$(e).css({top:i.offset().top,left:i.offset().left,width:i.outerWidth(),height:i.outerHeight()})})};t(),$(window).resize(t)}$("#non_competition").length&&$("#non_competition").hide()}}})},stopMainScroll:function(){this.oScrollWamp.mCustomScrollbar("disable")},updateMainScroll:function(){this.oScrollWamp.mCustomScrollbar("update")}}}(),yf.autopromptingAlign=function(){if($('div[data-type="autoprompting"]').is(":visible")){var t=$('div[data-type="autoprompting"]'),e=$("#"+t.data().elmid);t.css({top:e.offset().top+e.height()+5+"px",left:e.offset().left})}},yf.tabInit=function(t,e){for(var n=$(t),i=n.find(".layui-tab-title"),o=n.find(".layui-tab-content"),a="",r="",s=0;s<e.length;s++)0==s?(a+='<li data-module="'+e[s].nameEn+'" class="layui-this">'+e[s].nameZn+"</li>",r+='<div id="'+e[s].nameEn+'" class="layui-tab-item layui-show"><div class="loading"><img src="src/content/js/third/layer/css/modules/layer/default/loading-2.gif">正在加载...</div></div>'):(a+='<li data-module="'+e[s].nameEn+'">'+e[s].nameZn+"</li>",r+='<div id="'+e[s].nameEn+'" class="layui-tab-item"><div class="loading"><img src="src/content/js/third/layer/css/modules/layer/default/loading-2.gif">正在加载...</div></div>');i.html(a),o.html(r)},yf.loading=function(t){if(!$('div[data-id="'+$(t).attr("id")+'"]').length){var t=$(t),e=$('<div class="loading" data-type="loading" data-id="'+t.attr("id")+'" style="position:absolute;width:100%;height:100%;left:0;top:0;line-height:100%;background-color:#fff;background-color:rgba(255,255,255,.5);filter:alpha(opacity=50);z-index: 99999999;">        <div style="position:absolute;top:50%;width: 100%;line-height: 25px;color:#333">        <img src="src/content/js/third/layer/css/modules/layer/default/loading-2.gif" class="mCS_img_loaded">正在加载...</div></div>');e.css({width:t.outerWidth(),height:t.outerHeight()}),$(t).addClass("pv").append(e)}},yf.removeLoading=function(t){$(t).removeClass("pv"),$('div[data-id="'+$(t).attr("id")+'"]').remove()},yf.msg=function(t){return"200"!=t.code?!layer.msg(t.msg):1},yf.matchModule=function(t,e){try{for(var n=[],i=0;i<t.length;i++)for(var o=0;o<yf.layoutData.length;o++)-1!=t[i].indexOf(yf.layoutData[o].nameEn)&&yf.layoutData[o].cityAuthority==yf.userInfo.city&&n.push(yf.layoutData[o])}catch(t){}return e?e(n):n};yf.updataCity=function(t){yf.setItem("userInfo",{city:t,userName:yf.userInfo.userName}),yf.userInfo.city=t,$("#cityLink").find(".name").text(t)},yf.limitStr=function(t,e,n){var i,o=$(t),a=$(e);a.text(n-o.val().length),o.on("keyup",function(){i=$(this).val(),rLen=n-i.length,rLen<=0&&(o.val(o.val().substring(0,n)),rLen=0),a.text(rLen)})},yf.subStr=function(t,e){return null!=t?t.length<=e?t:t.substring(0,e)+"...":""},yf.priceTypeShow={0:"市场评估价",1:"抵押评估价",2:"自定义抵押评估价"},yf.REGS={PASS_WORLD:/(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{8,16}$/},t.onload=function(){};var r,s,l;yf.path=i,yf.tab=function(t,e){return r?r.init(t,e):(r=new a).init(t,e)},yf.loadFile=function(t,e){return s?s.init(t,e):(s=new n).init(t,e)},yf.menuDown=function(t){return l?l.init(t):(l=new o).init(t)},yf.param=function(t){return function(t){var e=RegExp("[?&]"+t+"=([^&]*)").exec(window.location.href);return e&&decodeURIComponent(e[1].replace(/\+/g," "))}(t)},yf.runNavActive=function(){return function(){var t=$("#header"),e=$("#navTree"),n=t.find("a[data-href]"),i=e.find("a[data-href]"),o=[];n.each(function(t,e){o.push($(e))}),i.each(function(t,e){o.push($(e))});for(var a=0;a<o.length;a++)try{var r=$(o).eq(a)[0].data().href;if($(o).eq(a)[0].removeClass("active"),location.href.match(r)){$(o).eq(a)[0].addClass("active"),$(o).eq(a)[0].parent().parent().prev(".lead").addClass("activity");continue}(location.href.indexOf("layout")>-1||location.href.indexOf("houseValuation")>-1)&&$(o).eq(0)[0].parent().parent().prev(".lead").addClass("activity")}catch(t){}}()},yf.stopMainScroll=function(){return yf.mainScroll.stopMainScroll()},yf.updateMainScroll=function(){return yf.mainScroll.updateMainScroll()},yf.scroll=function(t){return function(t){var e=$(t.elmId);e.mCustomScrollbar("destroy"),e.mCustomScrollbar({setHeight:t.height||e.outerHeight(),scrollInertia:180,theme:"minimal-dark",axis:"y"})}(t)},yf.replaceHtml=function(t){return function(t){return t.replace(/<.[^<>]*?>|\s/g,"")}(t)},yf.filterStr=function(t){return function(t){return"0"==t?t:(void 0!=t&&null!=t&&""!=t&&"请选择"!=t||(t="--"),t)}(t)},yf.dateStampFn=function(t,e){return function(t){if("--"==t)return t;var e=new Date(parseInt(t));return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()}(t)},yf._timer=function(t,n){return(new e)._init(t,n)},yf.limitLength=function(t){return function(t){var e=$(t).parent().siblings().text();e.indexOf("：")>0&&(e=e.substr(0,e.indexOf("：")));var n=$(t).attr("length"),i=$(t).val();i.length>n&&(i=i.substr(0,n),$(t).val(i),layer.tips(e+"不能超过"+n+"个字符",t,{tips:[1,"#666"],time:4e3}))}(t)},yf}(window);