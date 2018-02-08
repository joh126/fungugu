layui.define(function(t){var e=function(){function t(t){return null==t?String(t):_[B.call(t)]||"object"}function e(e){return"function"==t(e)}function n(t){return null!=t&&t==t.window}function r(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function i(e){return"object"==t(e)}function o(t){return i(t)&&!n(t)&&Object.getPrototypeOf(t)==Object.prototype}function a(t){var e=!!t&&"length"in t&&t.length,r=w.type(t);return"function"!=r&&!n(t)&&("array"==r||0===e||"number"==typeof e&&e>0&&e-1 in t)}function s(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function u(t){return t in D?D[t]:D[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function c(t,e){return"number"!=typeof e||L[s(t)]?e:e+"px"}function l(t){return"children"in t?O.call(t.children):w.map(t.childNodes,function(t){if(1==t.nodeType)return t})}function f(t,e){var n,r=t?t.length:0;for(n=0;n<r;n++)this[n]=t[n];this.length=r,this.selector=e||""}function h(t,e,n){for(b in e)n&&(o(e[b])||W(e[b]))?(o(e[b])&&!o(t[b])&&(t[b]={}),W(e[b])&&!W(t[b])&&(t[b]=[]),h(t[b],e[b],n)):e[b]!==x&&(t[b]=e[b])}function p(t,e){return null==e?w(t):w(t).filter(e)}function d(t,n,r,i){return e(n)?n.call(t,r,i):n}function m(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function v(t,e){var n=t.className||"",r=n&&n.baseVal!==x;if(e===x)return r?n.baseVal:n;r?n.baseVal=e:t.className=e}function g(t){try{return t?"true"==t||"false"!=t&&("null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?w.parseJSON(t):t):t}catch(e){return t}}function y(t,e){e(t);for(var n=0,r=t.childNodes.length;n<r;n++)y(t.childNodes[n],e)}var x,b,w,E,j,T,S=[],C=S.concat,N=S.filter,O=S.slice,P=window.document,A={},D={},L={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},$=/^\s*<(\w+|!)[^>]*>/,F=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,M=/^(?:body|html)$/i,R=/([A-Z])/g,z=["val","css","html","text","data","width","height","offset"],Z=P.createElement("table"),q=P.createElement("tr"),H={tr:P.createElement("tbody"),tbody:Z,thead:Z,tfoot:Z,td:q,th:q,"*":P.createElement("div")},I=/complete|loaded|interactive/,V=/^[\w-]*$/,_={},B=_.toString,U={},X=P.createElement("div"),J={tabindex:"tabIndex",readonly:"readOnly",for:"htmlFor",class:"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},W=Array.isArray||function(t){return t instanceof Array};return U.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var r,i=t.parentNode,o=!i;return o&&(i=X).appendChild(t),r=~U.qsa(i,e).indexOf(t),o&&X.removeChild(t),r},j=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},T=function(t){return N.call(t,function(e,n){return t.indexOf(e)==n})},U.fragment=function(t,e,n){var r,i,a;return F.test(t)&&(r=w(P.createElement(RegExp.$1))),r||(t.replace&&(t=t.replace(k,"<$1></$2>")),e===x&&(e=$.test(t)&&RegExp.$1),e in H||(e="*"),(a=H[e]).innerHTML=""+t,r=w.each(O.call(a.childNodes),function(){a.removeChild(this)})),o(n)&&(i=w(r),w.each(n,function(t,e){z.indexOf(t)>-1?i[t](e):i.attr(t,e)})),r},U.Z=function(t,e){return new f(t,e)},U.isZ=function(t){return t instanceof U.Z},U.init=function(t,n){var r;if(!t)return U.Z();if("string"==typeof t)if("<"==(t=t.trim())[0]&&$.test(t))r=U.fragment(t,RegExp.$1,n),t=null;else{if(n!==x)return w(n).find(t);r=U.qsa(P,t)}else{if(e(t))return w(P).ready(t);if(U.isZ(t))return t;if(W(t))r=function(t){return N.call(t,function(t){return null!=t})}(t);else if(i(t))r=[t],t=null;else if($.test(t))r=U.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==x)return w(n).find(t);r=U.qsa(P,t)}}return U.Z(r,t)},w=function(t,e){return U.init(t,e)},w.extend=function(t){var e,n=O.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){h(t,n,e)}),t},U.qsa=function(t,e){var n,r="#"==e[0],i=!r&&"."==e[0],o=r||i?e.slice(1):e,a=V.test(o);return t.getElementById&&a&&r?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:O.call(a&&!r&&t.getElementsByClassName?i?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},w.contains=P.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},w.type=t,w.isFunction=e,w.isWindow=n,w.isArray=W,w.isPlainObject=o,w.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},w.isNumeric=function(t){var e=Number(t),n=typeof t;return null!=t&&"boolean"!=n&&("string"!=n||t.length)&&!isNaN(e)&&isFinite(e)||!1},w.inArray=function(t,e,n){return S.indexOf.call(e,t,n)},w.camelCase=j,w.trim=function(t){return null==t?"":String.prototype.trim.call(t)},w.uuid=0,w.support={},w.expr={},w.noop=function(){},w.map=function(t,e){var n,r,i,o=[];if(a(t))for(r=0;r<t.length;r++)null!=(n=e(t[r],r))&&o.push(n);else for(i in t)null!=(n=e(t[i],i))&&o.push(n);return function(t){return t.length>0?w.fn.concat.apply([],t):t}(o)},w.each=function(t,e){var n,r;if(a(t)){for(n=0;n<t.length;n++)if(!1===e.call(t[n],n,t[n]))return t}else for(r in t)if(!1===e.call(t[r],r,t[r]))return t;return t},w.grep=function(t,e){return N.call(t,e)},window.JSON&&(w.parseJSON=JSON.parse),w.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){_["[object "+e+"]"]=e.toLowerCase()}),w.fn={constructor:U.Z,length:0,forEach:S.forEach,reduce:S.reduce,push:S.push,sort:S.sort,splice:S.splice,indexOf:S.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=U.isZ(e)?e.toArray():e;return C.apply(U.isZ(this)?this.toArray():this,n)},map:function(t){return w(w.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return w(O.apply(this,arguments))},ready:function(t){return I.test(P.readyState)&&P.body?t(w):P.addEventListener("DOMContentLoaded",function(){t(w)},!1),this},get:function(t){return t===x?O.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return S.every.call(this,function(e,n){return!1!==t.call(e,n,e)}),this},filter:function(t){return e(t)?this.not(this.not(t)):w(N.call(this,function(e){return U.matches(e,t)}))},add:function(t,e){return w(T(this.concat(w(t,e))))},is:function(t){return this.length>0&&U.matches(this[0],t)},not:function(t){var n=[];if(e(t)&&t.call!==x)this.each(function(e){t.call(this,e)||n.push(this)});else{var r="string"==typeof t?this.filter(t):a(t)&&e(t.item)?O.call(t):w(t);this.forEach(function(t){r.indexOf(t)<0&&n.push(t)})}return w(n)},has:function(t){return this.filter(function(){return i(t)?w.contains(this,t):w(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!i(t)?t:w(t)},last:function(){var t=this[this.length-1];return t&&!i(t)?t:w(t)},find:function(t){var e=this;return t?"object"==typeof t?w(t).filter(function(){var t=this;return S.some.call(e,function(e){return w.contains(e,t)})}):1==this.length?w(U.qsa(this[0],t)):this.map(function(){return U.qsa(this,t)}):w()},closest:function(t,e){var n=[],i="object"==typeof t&&w(t);return this.each(function(o,a){for(;a&&!(i?i.indexOf(a)>=0:U.matches(a,t));)a=a!==e&&!r(a)&&a.parentNode;a&&n.indexOf(a)<0&&n.push(a)}),w(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=w.map(n,function(t){if((t=t.parentNode)&&!r(t)&&e.indexOf(t)<0)return e.push(t),t});return p(e,t)},parent:function(t){return p(T(this.pluck("parentNode")),t)},children:function(t){return p(this.map(function(){return l(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||O.call(this.childNodes)})},siblings:function(t){return p(this.map(function(t,e){return N.call(l(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return w.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=function(t){var e,n;return A[t]||(e=P.createElement(t),P.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),A[t]=n),A[t]}(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var n=e(t);if(this[0]&&!n)var r=w(t).get(0),i=r.parentNode||this.length>1;return this.each(function(e){w(this).wrapAll(n?t.call(this,e):i?r.cloneNode(!0):r)})},wrapAll:function(t){if(this[0]){w(this[0]).before(t=w(t));for(var e;(e=t.children()).length;)t=e.first();w(t).append(this)}return this},wrapInner:function(t){var n=e(t);return this.each(function(e){var r=w(this),i=r.contents(),o=n?t.call(this,e):t;i.length?i.wrapAll(o):r.append(o)})},unwrap:function(){return this.parent().each(function(){w(this).replaceWith(w(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var e=w(this);(t===x?"none"==e.css("display"):t)?e.show():e.hide()})},prev:function(t){return w(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return w(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;w(this).empty().append(d(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=d(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function(t,e){var n;return"string"!=typeof t||1 in arguments?this.each(function(n){if(1===this.nodeType)if(i(t))for(b in t)m(this,b,t[b]);else m(this,t,d(this,e,n,this.getAttribute(t)))}):0 in this&&1==this[0].nodeType&&null!=(n=this[0].getAttribute(t))?n:x},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){m(this,t)},this)})},prop:function(t,e){return t=J[t]||t,1 in arguments?this.each(function(n){this[t]=d(this,e,n,this[t])}):this[0]&&this[0][t]},removeProp:function(t){return t=J[t]||t,this.each(function(){delete this[t]})},data:function(t,e){var n="data-"+t.replace(R,"-$1").toLowerCase(),r=1 in arguments?this.attr(n,e):this.attr(n);return null!==r?g(r):x},val:function(t){return 0 in arguments?(null==t&&(t=""),this.each(function(e){this.value=d(this,t,e,this.value)})):this[0]&&(this[0].multiple?w(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var n=w(this),r=d(this,t,e,n.offset()),i=n.offsetParent().offset(),o={top:r.top-i.top,left:r.left-i.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)});if(!this.length)return null;if(P.documentElement!==this[0]&&!w.contains(P.documentElement,this[0]))return{top:0,left:0};var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(e,n){if(arguments.length<2){var r=this[0];if("string"==typeof e){if(!r)return;return r.style[j(e)]||getComputedStyle(r,"").getPropertyValue(e)}if(W(e)){if(!r)return;var i={},o=getComputedStyle(r,"");return w.each(e,function(t,e){i[e]=r.style[j(e)]||o.getPropertyValue(e)}),i}}var a="";if("string"==t(e))n||0===n?a=s(e)+":"+c(e,n):this.each(function(){this.style.removeProperty(s(e))});else for(b in e)e[b]||0===e[b]?a+=s(b)+":"+c(b,e[b])+";":this.each(function(){this.style.removeProperty(s(b))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(w(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return!!t&&S.some.call(this,function(t){return this.test(v(t))},u(t))},addClass:function(t){return t?this.each(function(e){if("className"in this){E=[];var n=v(this);d(this,t,e,n).split(/\s+/g).forEach(function(t){w(this).hasClass(t)||E.push(t)},this),E.length&&v(this,n+(n?" ":"")+E.join(" "))}}):this},removeClass:function(t){return this.each(function(e){if("className"in this){if(t===x)return v(this,"");E=v(this),d(this,t,e,E).split(/\s+/g).forEach(function(t){E=E.replace(u(t)," ")}),v(this,E.trim())}})},toggleClass:function(t,e){return t?this.each(function(n){var r=w(this);d(this,t,n,v(this)).split(/\s+/g).forEach(function(t){(e===x?!r.hasClass(t):e)?r.addClass(t):r.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return t===x?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return t===x?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),r=M.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(w(t).css("margin-top"))||0,n.left-=parseFloat(w(t).css("margin-left"))||0,r.top+=parseFloat(w(e[0]).css("border-top-width"))||0,r.left+=parseFloat(w(e[0]).css("border-left-width"))||0,{top:n.top-r.top,left:n.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||P.body;t&&!M.test(t.nodeName)&&"static"==w(t).css("position");)t=t.offsetParent;return t})}},w.fn.detach=w.fn.remove,["width","height"].forEach(function(t){var e=t.replace(/./,function(t){return t[0].toUpperCase()});w.fn[t]=function(i){var o,a=this[0];return i===x?n(a)?a["inner"+e]:r(a)?a.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){(a=w(this)).css(t,d(this,i,e,a[t]()))})}}),["after","prepend","before","append"].forEach(function(e,n){var r=n%2;w.fn[e]=function(){var e,i,o=w.map(arguments,function(n){var r=[];return"array"==(e=t(n))?(n.forEach(function(t){return t.nodeType!==x?r.push(t):w.zepto.isZ(t)?r=r.concat(t.get()):void(r=r.concat(U.fragment(t)))}),r):"object"==e||null==n?n:U.fragment(n)}),a=this.length>1;return o.length<1?this:this.each(function(t,e){i=r?e:e.parentNode,e=0==n?e.nextSibling:1==n?e.firstChild:2==n?e:null;var s=w.contains(P.documentElement,i);o.forEach(function(t){if(a)t=t.cloneNode(!0);else if(!i)return w(t).remove();i.insertBefore(t,e),s&&y(t,function(t){if(!(null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src)){var e=t.ownerDocument?t.ownerDocument.defaultView:window;e.eval.call(e,t.innerHTML)}})})})},w.fn[r?e+"To":"insert"+(n?"Before":"After")]=function(t){return w(t)[e](this),this}}),U.Z.prototype=f.prototype=w.fn,U.uniq=T,U.deserializeValue=g,w.zepto=U,w}();!function(t){function e(t){return t._zid||(t._zid=f++)}function n(t,n,i,o){if((n=r(n)).ns)var a=function(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}(n.ns);return(m[e(t)]||[]).filter(function(t){return t&&(!n.e||t.e==n.e)&&(!n.ns||a.test(t.ns))&&(!i||e(t.fn)===e(i))&&(!o||t.sel==o)})}function r(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function i(t,e){return t.del&&!g&&t.e in y||!!e}function o(t){return x[t]||g&&y[t]||t}function a(n,a,s,c,f,h,p){var d=e(n),v=m[d]||(m[d]=[]);a.split(/\s/).forEach(function(e){if("ready"==e)return t(document).ready(s);var a=r(e);a.fn=s,a.sel=f,a.e in x&&(s=function(e){var n=e.relatedTarget;if(!n||n!==this&&!t.contains(this,n))return a.fn.apply(this,arguments)}),a.del=h;var d=h||s;a.proxy=function(t){if(!(t=u(t)).isImmediatePropagationStopped()){t.data=c;var e=d.apply(n,t._args==l?[t]:[t].concat(t._args));return!1===e&&(t.preventDefault(),t.stopPropagation()),e}},a.i=v.length,v.push(a),"addEventListener"in n&&n.addEventListener(o(a.e),a.proxy,i(a,p))})}function s(t,r,a,s,u){var c=e(t);(r||"").split(/\s/).forEach(function(e){n(t,e,a,s).forEach(function(e){delete m[c][e.i],"removeEventListener"in t&&t.removeEventListener(o(e.e),e.proxy,i(e,u))})})}function u(e,n){return!n&&e.isDefaultPrevented||(n||(n=e),t.each(j,function(t,r){var i=n[t];e[t]=function(){return this[r]=b,i&&i.apply(n,arguments)},e[r]=w}),e.timeStamp||(e.timeStamp=Date.now()),(n.defaultPrevented!==l?n.defaultPrevented:"returnValue"in n?!1===n.returnValue:n.getPreventDefault&&n.getPreventDefault())&&(e.isDefaultPrevented=b)),e}function c(t){var e,n={originalEvent:t};for(e in t)E.test(e)||t[e]===l||(n[e]=t[e]);return u(n,t)}var l,f=1,h=Array.prototype.slice,p=t.isFunction,d=function(t){return"string"==typeof t},m={},v={},g="onfocusin"in window,y={focus:"focusin",blur:"focusout"},x={mouseenter:"mouseover",mouseleave:"mouseout"};v.click=v.mousedown=v.mouseup=v.mousemove="MouseEvents",t.event={add:a,remove:s},t.proxy=function(n,r){var i=2 in arguments&&h.call(arguments,2);if(p(n)){var o=function(){return n.apply(r,i?i.concat(h.call(arguments)):arguments)};return o._zid=e(n),o}if(d(r))return i?(i.unshift(n[r],n),t.proxy.apply(null,i)):t.proxy(n[r],n);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,r){return this.on(t,e,n,r,1)};var b=function(){return!0},w=function(){return!1},E=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,j={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,n,r,i,o){var u,f,m=this;return e&&!d(e)?(t.each(e,function(t,e){m.on(t,n,r,e,o)}),m):(d(n)||p(i)||!1===i||(i=r,r=n,n=l),i!==l&&!1!==r||(i=r,r=l),!1===i&&(i=w),m.each(function(l,p){o&&(u=function(t){return s(p,t.type,i),i.apply(this,arguments)}),n&&(f=function(e){var r,o=t(e.target).closest(n,p).get(0);if(o&&o!==p)return r=t.extend(c(e),{currentTarget:o,liveFired:p}),(u||i).apply(o,[r].concat(h.call(arguments,1)))}),a(p,e,i,r,n,f||u)}))},t.fn.off=function(e,n,r){var i=this;return e&&!d(e)?(t.each(e,function(t,e){i.off(t,n,e)}),i):(d(n)||p(r)||!1===r||(r=n,n=l),!1===r&&(r=w),i.each(function(){s(this,e,r,n)}))},t.fn.trigger=function(e,n){return e=d(e)||t.isPlainObject(e)?t.Event(e):u(e),e._args=n,this.each(function(){e.type in y&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,r){var i,o;return this.each(function(a,s){(i=c(d(e)?t.Event(e):e))._args=r,i.target=s,t.each(n(s,e.type||e),function(t,e){if(o=e.proxy(i),i.isImmediatePropagationStopped())return!1})}),o},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){d(t)||(e=t,t=e.type);var n=document.createEvent(v[t]||"Events"),r=!0;if(e)for(var i in e)"bubbles"==i?r=!!e[i]:n[i]=e[i];return n.initEvent(t,r,!0),u(n)}}(e),function(t){function e(e,n,r,i){if(e.global)return function(e,n,r){var i=t.Event(n);return t(e).trigger(i,r),!i.isDefaultPrevented()}(n||p,r,i)}function n(t,n){var r=n.context;if(!1===n.beforeSend.call(r,t,n)||!1===e(n,r,"ajaxBeforeSend",[t,n]))return!1;e(n,r,"ajaxSend",[t,n])}function r(t,n,r,i){var a=r.context;r.success.call(a,t,"success",n),i&&i.resolveWith(a,[t,"success",n]),e(r,a,"ajaxSuccess",[n,r,t]),o("success",n,r)}function i(t,n,r,i,a){var s=i.context;i.error.call(s,r,n,t),a&&a.rejectWith(s,[r,n,t]),e(i,s,"ajaxError",[r,i,t||n]),o(n,r,i)}function o(n,r,i){var o=i.context;i.complete.call(o,r,n),e(i,o,"ajaxComplete",[r,i]),function(n){n.global&&!--t.active&&e(n,null,"ajaxStop")}(i)}function a(){}function s(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function u(e,n,r,i){return t.isFunction(n)&&(i=r,r=n,n=void 0),t.isFunction(r)||(i=r,r=void 0),{url:e,data:n,success:r,dataType:i}}function c(e,n,r,i){var o,a=t.isArray(n),s=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),i&&(n=r?i:i+"["+(s||"object"==o||"array"==o?n:"")+"]"),!i&&a?e.add(u.name,u.value):"array"==o||!r&&"object"==o?c(e,u,r,n):e.add(n,u)})}var l,f,h=+new Date,p=window.document,d=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,m=/^(?:text|application)\/javascript/i,v=/^(?:text|application)\/xml/i,g="application/json",y="text/html",x=/^\s*$/,b=p.createElement("a");b.href=window.location.href,t.active=0,t.ajaxJSONP=function(e,o){if(!("type"in e))return t.ajax(e);var a,s,u=e.jsonpCallback,c=(t.isFunction(u)?u():u)||"Zepto"+h++,l=p.createElement("script"),f=window[c],d=function(e){t(l).triggerHandler("error",e||"abort")},m={abort:d};return o&&o.promise(m),t(l).on("load error",function(n,u){clearTimeout(s),t(l).off().remove(),"error"!=n.type&&a?r(a[0],m,e,o):i(null,u||"error",m,e,o),window[c]=f,a&&t.isFunction(f)&&f(a[0]),f=a=void 0}),!1===n(m,e)?(d("abort"),m):(window[c]=function(){a=arguments},l.src=e.url.replace(/\?(.+)=\?/,"?$1="+c),p.head.appendChild(l),e.timeout>0&&(s=setTimeout(function(){d("timeout")},e.timeout)),m)},t.ajaxSettings={type:"GET",beforeSend:a,success:a,error:a,complete:a,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:g,xml:"application/xml, text/xml",html:y,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:a},t.ajax=function(o){var u,c,h=t.extend({},o||{}),d=t.Deferred&&t.Deferred();for(l in t.ajaxSettings)void 0===h[l]&&(h[l]=t.ajaxSettings[l]);!function(n){n.global&&0==t.active++&&e(n,null,"ajaxStart")}(h),h.crossDomain||((u=p.createElement("a")).href=h.url,u.href=u.href,h.crossDomain=b.protocol+"//"+b.host!=u.protocol+"//"+u.host),h.url||(h.url=window.location.toString()),(c=h.url.indexOf("#"))>-1&&(h.url=h.url.slice(0,c)),function(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()&&"jsonp"!=e.dataType||(e.url=s(e.url,e.data),e.data=void 0)}(h);var w=h.dataType,E=/\?.+=\?/.test(h.url);if(E&&(w="jsonp"),!1!==h.cache&&(o&&!0===o.cache||"script"!=w&&"jsonp"!=w)||(h.url=s(h.url,"_="+Date.now())),"jsonp"==w)return E||(h.url=s(h.url,h.jsonp?h.jsonp+"=?":!1===h.jsonp?"":"callback=?")),t.ajaxJSONP(h,d);var j,T=h.accepts[w],S={},C=function(t,e){S[t.toLowerCase()]=[t,e]},N=/^([\w-]+:)\/\//.test(h.url)?RegExp.$1:window.location.protocol,O=h.xhr(),P=O.setRequestHeader;if(d&&d.promise(O),h.crossDomain||C("X-Requested-With","XMLHttpRequest"),C("Accept",T||"*/*"),(T=h.mimeType||T)&&(T.indexOf(",")>-1&&(T=T.split(",",2)[0]),O.overrideMimeType&&O.overrideMimeType(T)),(h.contentType||!1!==h.contentType&&h.data&&"GET"!=h.type.toUpperCase())&&C("Content-Type",h.contentType||"application/x-www-form-urlencoded"),h.headers)for(f in h.headers)C(f,h.headers[f]);if(O.setRequestHeader=C,O.onreadystatechange=function(){if(4==O.readyState){O.onreadystatechange=a,clearTimeout(j);var e,n=!1;if(O.status>=200&&O.status<300||304==O.status||0==O.status&&"file:"==N){if(w=w||function(t){return t&&(t=t.split(";",2)[0]),t&&(t==y?"html":t==g?"json":m.test(t)?"script":v.test(t)&&"xml")||"text"}(h.mimeType||O.getResponseHeader("content-type")),"arraybuffer"==O.responseType||"blob"==O.responseType)e=O.response;else{e=O.responseText;try{e=function(t,e,n){if(n.dataFilter==a)return t;var r=n.context;return n.dataFilter.call(r,t,e)}(e,w,h),"script"==w?(0,eval)(e):"xml"==w?e=O.responseXML:"json"==w&&(e=x.test(e)?null:t.parseJSON(e))}catch(t){n=t}if(n)return i(n,"parsererror",O,h,d)}r(e,O,h,d)}else i(O.statusText||null,O.status?"error":"abort",O,h,d)}},!1===n(O,h))return O.abort(),i(null,"abort",O,h,d),O;var A=!("async"in h)||h.async;if(O.open(h.type,h.url,A,h.username,h.password),h.xhrFields)for(f in h.xhrFields)O[f]=h.xhrFields[f];for(f in S)P.apply(O,S[f]);return h.timeout>0&&(j=setTimeout(function(){O.onreadystatechange=a,O.abort(),i(null,"timeout",O,h,d)},h.timeout)),O.send(h.data?h.data:null),O},t.get=function(){return t.ajax(u.apply(null,arguments))},t.post=function(){var e=u.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=u.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,r){if(!this.length)return this;var i,o=this,a=e.split(/\s/),s=u(e,n,r),c=s.success;return a.length>1&&(s.url=a[0],i=a[1]),s.success=function(e){o.html(i?t("<div>").html(e.replace(d,"")).find(i):e),c&&c.apply(o,arguments)},t.ajax(s),this};var w=encodeURIComponent;t.param=function(e,n){var r=[];return r.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(w(e)+"="+w(n))},c(r,e,n),r.join("&").replace(/%20/g,"+")}}(e),function(t){t.fn.serializeArray=function(){var e,n,r=[],i=function(t){if(t.forEach)return t.forEach(i);r.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(r,o){n=o.type,(e=o.name)&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&i(t(o).val())}),r},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(e),function(){try{getComputedStyle(void 0)}catch(e){var t=getComputedStyle;window.getComputedStyle=function(e,n){try{return t(e,n)}catch(t){return null}}}}(),t("zepto",e)});