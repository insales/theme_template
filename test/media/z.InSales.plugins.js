/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {},
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling $.cookie().
            cookies = document.cookie ? document.cookie.split('; ') : [],
            i = 0,
            l = cookies.length;

        for (; i < l; i++) {
            var parts = cookies[i].split('='),
                name = decode(parts.shift()),
                cookie = parts.join('=');

            if (key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));

!function(t){var e,a;return a="undefined"!=typeof window&&null!==window?window:global,a.BarRating=e=function(){function e(){var e=this,a=function(){e.$elem.wrap(t("<div />",{"class":e.options.wrapperClass}))},n=function(){e.$elem.unwrap()},r=function(){var a;return a=e.options.initialRating?t('option[value="'+e.options.initialRating+'"]',e.$elem):t("option:selected",e.$elem)},i=function(){var t=r();e.$elem.data("barrating",{userOptions:e.options,currentRatingValue:t.val(),currentRatingText:t.data("html")?t.data("html"):t.text(),originalRatingValue:t.val(),originalRatingText:t.data("html")?t.data("html"):t.text()}),e.$elem.data("barrating").deselectable=e.$elem.find("option:first").val()?!1:!0},s=function(){e.$elem.removeData("barrating")},l=function(){var a=t("<div />",{"class":"br-widget"});return e.$elem.find("option").each(function(){var n,r,i,s,l;n=t(this).val(),n&&(r=t(this).text(),i=t(this).data("html"),i&&(r=i),s=t("<a />",{href:"#","data-rating-value":n,"data-rating-text":r}),l=t("<span />",{html:e.options.showValues?r:""}),a.append(s.append(l)))}),e.options.showSelectedRating&&a.append(t("<div />",{text:"","class":"br-current-rating"})),e.options.reverse&&a.addClass("br-reverse"),e.options.readonly&&a.addClass("br-readonly"),a},o=function(){return e.options.reverse?"nextAll":"prevAll"},u=function(t){e.$elem.find('option[value="'+t+'"]').prop("selected",!0),e.$elem.change()},d=function(t){t=t?t:e.$elem.data("barrating").currentRatingText,e.options.showSelectedRating&&e.$elem.parent().find(".br-current-rating").text(t)},c=function(t){t.find("a").removeClass("br-selected br-current"),t.find('a[data-rating-value="'+e.$elem.data("barrating").currentRatingValue+'"]').addClass("br-selected br-current")[o()]().addClass("br-selected")},g=function(a){a.on("click",function(n){var r,i,s=t(this);return n.preventDefault(),a.removeClass("br-active br-selected"),s.addClass("br-selected")[o()]().addClass("br-selected"),r=s.attr("data-rating-value"),i=s.attr("data-rating-text"),s.hasClass("br-current")&&e.$elem.data("barrating").deselectable?(s.removeClass("br-selected br-current")[o()]().removeClass("br-selected br-current"),r="",i=""):(a.removeClass("br-current"),s.addClass("br-current")),e.$elem.data("barrating").currentRatingValue=r,e.$elem.data("barrating").currentRatingText=i,u(r),d(i),e.options.onSelect.call(this,e.$elem.data("barrating").currentRatingValue,e.$elem.data("barrating").currentRatingText),!1})},h=function(e){e.on({mouseenter:function(){var a=t(this);e.removeClass("br-active br-selected"),a.addClass("br-active")[o()]().addClass("br-active"),d(a.attr("data-rating-text"))}})},f=function(t,e){e.on({mouseleave:function(){t.removeClass("br-active"),d(),c(e)}})},b=function(e){e.on("touchstart",function(e){e.preventDefault(),e.stopPropagation(),t(this).click()})},m=function(t){t.on("click",function(t){t.preventDefault()})};this.show=function(){var t,n;e.$elem.data("barrating")||(a(),i(),t=l(),t.insertAfter(e.$elem),c(t),d(),n=t.find("a"),e.options.fastClicks&&b(n),e.options.readonly?m(n):(g(n),h(n),f(n,t)),e.$elem.hide())},this.set=function(t){this.$elem.find('option[value="'+t+'"]').val()&&(this.$elem.data("barrating").currentRatingValue=t,this.$elem.data("barrating").currentRatingText=this.$elem.find('option[value="'+t+'"]').text(),u(this.$elem.data("barrating").currentRatingValue),d(this.$elem.data("barrating").currentRatingText),c(this.$widget))},this.clear=function(){this.$elem.data("barrating").currentRatingValue=this.$elem.data("barrating").originalRatingValue,this.$elem.data("barrating").currentRatingText=this.$elem.data("barrating").originalRatingText,u(this.$elem.data("barrating").currentRatingValue),d(this.$elem.data("barrating").currentRatingText),c(this.$widget),this.$elem.data("barrating").userOptions.onClear.call(this,this.$elem.data("barrating").currentRatingValue,this.$elem.data("barrating").currentRatingText)},this.destroy=function(){var t=this.$elem.data("barrating").currentRatingValue,e=this.$elem.data("barrating").currentRatingText,a=this.$elem.data("barrating").userOptions;this.$widget.off().remove(),s(),n(),this.$elem.show(),a.onDestroy.call(this,t,e)}}return e.prototype.init=function(e,a){return this.$elem=t(a),this.options=t.extend({},t.fn.barrating.defaults,e),this.options},e}(),t.fn.barrating=function(a,n){return this.each(function(){var r=new e;if(t(this).is("select")||t.error("Sorry, this plugin only works with select fields."),r.hasOwnProperty(a)){if(r.init(n,this),"show"===a)return r.show(n);if(r.$elem.data("barrating"))return r.$widget=t(this).next(".br-widget"),r[a](n)}else{if("object"==typeof a||!a)return n=a,r.init(n,this),r.show();t.error("Method "+a+" does not exist on jQuery.barrating")}})},t.fn.barrating.defaults={initialRating:null,showValues:!1,showSelectedRating:!0,reverse:!1,readonly:!1,fastClicks:!0,wrapperClass:"br-wrapper",onSelect:function(t,e){},onClear:function(t,e){},onDestroy:function(t,e){}},t.fn.barrating.defaults}(jQuery);
//# sourceMappingURL=jquery.barrating.min.js.map
/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
*/
(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);
/*! nouislider - 8.0.2 - 2015-07-06 13:22:09 */

!function(a){if("function"==typeof define&&define.amd)define([],a);else if("object"==typeof exports){var b=require("fs");module.exports=a(),module.exports.css=function(){return b.readFileSync(__dirname+"/nouislider.min.css","utf8")}}else window.noUiSlider=a()}(function(){"use strict";function a(a){return a.filter(function(a){return this[a]?!1:this[a]=!0},{})}function b(a,b){return Math.round(a/b)*b}function c(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.defaultView||c.parentWindow,e=c.documentElement,f=d.pageXOffset;return/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(f=0),{top:b.top+d.pageYOffset-e.clientTop,left:b.left+f-e.clientLeft}}function d(a){return"number"==typeof a&&!isNaN(a)&&isFinite(a)}function e(a){var b=Math.pow(10,7);return Number((Math.round(a*b)/b).toFixed(7))}function f(a,b,c){j(a,b),setTimeout(function(){k(a,b)},c)}function g(a){return Math.max(Math.min(a,100),0)}function h(a){return Array.isArray(a)?a:[a]}function i(a){var b=a.split(".");return b.length>1?b[1].length:0}function j(a,b){a.classList?a.classList.add(b):a.className+=" "+b}function k(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")}function l(a,b){a.classList?a.classList.contains(b):new RegExp("(^| )"+b+"( |$)","gi").test(a.className)}function m(a,b){return 100/(b-a)}function n(a,b){return 100*b/(a[1]-a[0])}function o(a,b){return n(a,a[0]<0?b+Math.abs(a[0]):b-a[0])}function p(a,b){return b*(a[1]-a[0])/100+a[0]}function q(a,b){for(var c=1;a>=b[c];)c+=1;return c}function r(a,b,c){if(c>=a.slice(-1)[0])return 100;var d,e,f,g,h=q(c,a);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],f+o([d,e],c)/m(f,g)}function s(a,b,c){if(c>=100)return a.slice(-1)[0];var d,e,f,g,h=q(c,b);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],p([d,e],(c-f)*m(f,g))}function t(a,c,d,e){if(100===e)return e;var f,g,h=q(e,a);return d?(f=a[h-1],g=a[h],e-f>(g-f)/2?g:f):c[h-1]?a[h-1]+b(e-a[h-1],c[h-1]):e}function u(a,b,c){var e;if("number"==typeof b&&(b=[b]),"[object Array]"!==Object.prototype.toString.call(b))throw new Error("noUiSlider: 'range' contains invalid value.");if(e="min"===a?0:"max"===a?100:parseFloat(a),!d(e)||!d(b[0]))throw new Error("noUiSlider: 'range' value isn't numeric.");c.xPct.push(e),c.xVal.push(b[0]),e?c.xSteps.push(isNaN(b[1])?!1:b[1]):isNaN(b[1])||(c.xSteps[0]=b[1])}function v(a,b,c){return b?void(c.xSteps[a]=n([c.xVal[a],c.xVal[a+1]],b)/m(c.xPct[a],c.xPct[a+1])):!0}function w(a,b,c,d){this.xPct=[],this.xVal=[],this.xSteps=[d||!1],this.xNumSteps=[!1],this.snap=b,this.direction=c;var e,f=[];for(e in a)a.hasOwnProperty(e)&&f.push([a[e],e]);for(f.sort(function(a,b){return a[0]-b[0]}),e=0;e<f.length;e++)u(f[e][1],f[e][0],this);for(this.xNumSteps=this.xSteps.slice(0),e=0;e<this.xNumSteps.length;e++)v(e,this.xNumSteps[e],this)}function x(a,b){if(!d(b))throw new Error("noUiSlider: 'step' is not numeric.");a.singleStep=b}function y(a,b){if("object"!=typeof b||Array.isArray(b))throw new Error("noUiSlider: 'range' is not an object.");if(void 0===b.min||void 0===b.max)throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");a.spectrum=new w(b,a.snap,a.dir,a.singleStep)}function z(a,b){if(b=h(b),!Array.isArray(b)||!b.length||b.length>2)throw new Error("noUiSlider: 'start' option is incorrect.");a.handles=b.length,a.start=b}function A(a,b){if(a.snap=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'snap' option must be a boolean.")}function B(a,b){if(a.animate=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'animate' option must be a boolean.")}function C(a,b){if("lower"===b&&1===a.handles)a.connect=1;else if("upper"===b&&1===a.handles)a.connect=2;else if(b===!0&&2===a.handles)a.connect=3;else{if(b!==!1)throw new Error("noUiSlider: 'connect' option doesn't match handle count.");a.connect=0}}function D(a,b){switch(b){case"horizontal":a.ort=0;break;case"vertical":a.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}function E(a,b){if(!d(b))throw new Error("noUiSlider: 'margin' option must be numeric.");if(a.margin=a.spectrum.getMargin(b),!a.margin)throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")}function F(a,b){if(!d(b))throw new Error("noUiSlider: 'limit' option must be numeric.");if(a.limit=a.spectrum.getMargin(b),!a.limit)throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")}function G(a,b){switch(b){case"ltr":a.dir=0;break;case"rtl":a.dir=1,a.connect=[0,2,1,3][a.connect];break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}function H(a,b){if("string"!=typeof b)throw new Error("noUiSlider: 'behaviour' must be a string containing options.");var c=b.indexOf("tap")>=0,d=b.indexOf("drag")>=0,e=b.indexOf("fixed")>=0,f=b.indexOf("snap")>=0;a.events={tap:c||f,drag:d,fixed:e,snap:f}}function I(a,b){if(a.format=b,"function"==typeof b.to&&"function"==typeof b.from)return!0;throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")}function J(a){var b,c={margin:0,limit:0,animate:!0,format:U};b={step:{r:!1,t:x},start:{r:!0,t:z},connect:{r:!0,t:C},direction:{r:!0,t:G},snap:{r:!1,t:A},animate:{r:!1,t:B},range:{r:!0,t:y},orientation:{r:!1,t:D},margin:{r:!1,t:E},limit:{r:!1,t:F},behaviour:{r:!0,t:H},format:{r:!1,t:I}};var d={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"};return Object.keys(d).forEach(function(b){void 0===a[b]&&(a[b]=d[b])}),Object.keys(b).forEach(function(d){var e=b[d];if(void 0===a[d]){if(e.r)throw new Error("noUiSlider: '"+d+"' is required.");return!0}e.t(c,a[d])}),c.pips=a.pips,c.style=c.ort?"top":"left",c}function K(a,b,c){var d=a+b[0],e=a+b[1];return c?(0>d&&(e+=Math.abs(d)),e>100&&(d-=e-100),[g(d),g(e)]):[d,e]}function L(a){a.preventDefault();var b,c,d=0===a.type.indexOf("touch"),e=0===a.type.indexOf("mouse"),f=0===a.type.indexOf("pointer"),g=a;return 0===a.type.indexOf("MSPointer")&&(f=!0),d&&(b=a.changedTouches[0].pageX,c=a.changedTouches[0].pageY),(e||f)&&(b=a.clientX+window.pageXOffset,c=a.clientY+window.pageYOffset),g.points=[b,c],g.cursor=e||f,g}function M(a,b){var c=document.createElement("div"),d=document.createElement("div"),e=["-lower","-upper"];return a&&e.reverse(),j(d,T[3]),j(d,T[3]+e[b]),j(c,T[2]),c.appendChild(d),c}function N(a,b,c){switch(a){case 1:j(b,T[7]),j(c[0],T[6]);break;case 3:j(c[1],T[6]);case 2:j(c[0],T[7]);case 0:j(b,T[6])}}function O(a,b,c){var d,e=[];for(d=0;a>d;d+=1)e.push(c.appendChild(M(b,d)));return e}function P(a,b,c){j(c,T[0]),j(c,T[8+a]),j(c,T[4+b]);var d=document.createElement("div");return j(d,T[1]),c.appendChild(d),d}function Q(b,d){function e(a,b,c){if("range"===a||"steps"===a)return M.xVal;if("count"===a){var d,e=100/(b-1),f=0;for(b=[];(d=f++*e)<=100;)b.push(d);a="positions"}return"positions"===a?b.map(function(a){return M.fromStepping(c?M.getStep(a):a)}):"values"===a?c?b.map(function(a){return M.fromStepping(M.getStep(M.toStepping(a)))}):b:void 0}function m(b,c,d){var e=M.direction,f={},g=M.xVal[0],h=M.xVal[M.xVal.length-1],i=!1,j=!1,k=0;return M.direction=0,d=a(d.slice().sort(function(a,b){return a-b})),d[0]!==g&&(d.unshift(g),i=!0),d[d.length-1]!==h&&(d.push(h),j=!0),d.forEach(function(a,e){var g,h,l,m,n,o,p,q,r,s,t=a,u=d[e+1];if("steps"===c&&(g=M.xNumSteps[e]),g||(g=u-t),t!==!1&&void 0!==u)for(h=t;u>=h;h+=g){for(m=M.toStepping(h),n=m-k,q=n/b,r=Math.round(q),s=n/r,l=1;r>=l;l+=1)o=k+l*s,f[o.toFixed(5)]=["x",0];p=d.indexOf(h)>-1?1:"steps"===c?2:0,!e&&i&&(p=0),h===u&&j||(f[m.toFixed(5)]=[h,p]),k=m}}),M.direction=e,f}function n(a,b,c){function e(a){return["-normal","-large","-sub"][a]}function f(a,b,c){return'class="'+b+" "+b+"-"+h+" "+b+e(c[1])+'" style="'+d.style+": "+a+'%"'}function g(a,d){M.direction&&(a=100-a),d[1]=d[1]&&b?b(d[0],d[1]):d[1],i.innerHTML+="<div "+f(a,"noUi-marker",d)+"></div>",d[1]&&(i.innerHTML+="<div "+f(a,"noUi-value",d)+">"+c.to(d[0])+"</div>")}var h=["horizontal","vertical"][d.ort],i=document.createElement("div");return j(i,"noUi-pips"),j(i,"noUi-pips-"+h),Object.keys(a).forEach(function(b){g(b,a[b])}),i}function o(a){var b=a.mode,c=a.density||1,d=a.filter||!1,f=a.values||!1,g=a.stepped||!1,h=e(b,f,g),i=m(c,b,h),j=a.format||{to:Math.round};return I.appendChild(n(i,d,j))}function p(){return G["offset"+["Width","Height"][d.ort]]}function q(a,b){void 0!==b&&(b=Math.abs(b-d.dir)),Object.keys(R).forEach(function(c){var d=c.split(".")[0];a===d&&R[c].forEach(function(a){a(h(B()),b,r(Array.prototype.slice.call(Q)))})})}function r(a){return 1===a.length?a[0]:d.dir?a.reverse():a}function s(a,b,c,e){var f=function(b){return I.hasAttribute("disabled")?!1:l(I,T[14])?!1:(b=L(b),a===S.start&&void 0!==b.buttons&&b.buttons>1?!1:(b.calcPoint=b.points[d.ort],void c(b,e)))},g=[];return a.split(" ").forEach(function(a){b.addEventListener(a,f,!1),g.push([a,f])}),g}function t(a,b){var c,d,e=b.handles||H,f=!1,g=100*(a.calcPoint-b.start)/p(),h=e[0]===H[0]?0:1;if(c=K(g,b.positions,e.length>1),f=y(e[0],c[h],1===e.length),e.length>1){if(f=y(e[1],c[h?0:1],!1)||f)for(d=0;d<b.handles.length;d++)q("slide",d)}else f&&q("slide",h)}function u(a,b){var c=G.getElementsByClassName(T[15]),d=b.handles[0]===H[0]?0:1;c.length&&k(c[0],T[15]),a.cursor&&(document.body.style.cursor="",document.body.removeEventListener("selectstart",document.body.noUiListener));var e=document.documentElement;e.noUiListeners.forEach(function(a){e.removeEventListener(a[0],a[1])}),k(I,T[12]),q("set",d),q("change",d)}function v(a,b){var c=document.documentElement;if(1===b.handles.length&&(j(b.handles[0].children[0],T[15]),b.handles[0].hasAttribute("disabled")))return!1;a.stopPropagation();var d=s(S.move,c,t,{start:a.calcPoint,handles:b.handles,positions:[J[0],J[H.length-1]]}),e=s(S.end,c,u,{handles:b.handles});if(c.noUiListeners=d.concat(e),a.cursor){document.body.style.cursor=getComputedStyle(a.target).cursor,H.length>1&&j(I,T[12]);var f=function(){return!1};document.body.noUiListener=f,document.body.addEventListener("selectstart",f,!1)}}function w(a){var b,e,g=a.calcPoint,h=0;return a.stopPropagation(),H.forEach(function(a){h+=c(a)[d.style]}),b=h/2>g||1===H.length?0:1,g-=c(G)[d.style],e=100*g/p(),d.events.snap||f(I,T[14],300),H[b].hasAttribute("disabled")?!1:(y(H[b],e),q("slide",b),q("set",b),q("change",b),void(d.events.snap&&v(a,{handles:[H[h]]})))}function x(a){var b,c;if(!a.fixed)for(b=0;b<H.length;b+=1)s(S.start,H[b].children[0],v,{handles:[H[b]]});a.tap&&s(S.start,G,w,{handles:H}),a.drag&&(c=[G.getElementsByClassName(T[7])[0]],j(c[0],T[10]),a.fixed&&c.push(H[c[0]===H[0]?1:0].children[0]),c.forEach(function(a){s(S.start,a,v,{handles:H})}))}function y(a,b,c){var e=a!==H[0]?1:0,f=J[0]+d.margin,h=J[1]-d.margin,i=J[0]+d.limit,l=J[1]-d.limit;return H.length>1&&(b=e?Math.max(b,f):Math.min(b,h)),c!==!1&&d.limit&&H.length>1&&(b=e?Math.min(b,i):Math.max(b,l)),b=M.getStep(b),b=g(parseFloat(b.toFixed(7))),b===J[e]?!1:(a.style[d.style]=b+"%",a.previousSibling||(k(a,T[17]),b>50&&j(a,T[17])),J[e]=b,Q[e]=M.fromStepping(b),q("update",e),!0)}function z(a,b){var c,e,f;for(d.limit&&(a+=1),c=0;a>c;c+=1)e=c%2,f=b[e],null!==f&&f!==!1&&("number"==typeof f&&(f=String(f)),f=d.format.from(f),(f===!1||isNaN(f)||y(H[e],M.toStepping(f),c===3-d.dir)===!1)&&q("update",e))}function A(a){var b,c,e=h(a);for(d.dir&&d.handles>1&&e.reverse(),d.animate&&-1!==J[0]&&f(I,T[14],300),b=H.length>1?3:1,1===e.length&&(b=1),z(b,e),c=0;c<H.length;c++)q("set",c)}function B(){var a,b=[];for(a=0;a<d.handles;a+=1)b[a]=d.format.to(Q[a]);return r(b)}function C(){T.forEach(function(a){a&&k(I,a)}),I.innerHTML="",delete I.noUiSlider}function D(){var a=J.map(function(a,b){var c=M.getApplicableStep(a),d=i(String(c[2])),e=Q[b],f=100===a?null:c[2],g=Number((e-c[2]).toFixed(d)),h=0===a?null:g>=c[1]?c[2]:c[0]||!1;return[h,f]});return r(a)}function E(a,b){R[a]=R[a]||[],R[a].push(b),"update"===a.split(".")[0]&&H.forEach(function(a,b){q("update",b)})}function F(a){var b=a.split(".")[0],c=a.substring(b.length);Object.keys(R).forEach(function(a){var d=a.split(".")[0],e=a.substring(d.length);b&&b!==d||c&&c!==e||delete R[a]})}var G,H,I=b,J=[-1,-1],M=d.spectrum,Q=[],R={};if(I.noUiSlider)throw new Error("Slider was already initialized.");return G=P(d.dir,d.ort,I),H=O(d.handles,d.dir,G),N(d.connect,I,H),x(d.events),d.pips&&o(d.pips),{destroy:C,steps:D,on:E,off:F,get:B,set:A}}function R(a,b){if(!a.nodeName)throw new Error("noUiSlider.create requires a single element.");var c=J(b,a),d=Q(a,c);d.set(c.start),a.noUiSlider=d}var S=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},T=["noUi-target","noUi-base","noUi-origin","noUi-handle","noUi-horizontal","noUi-vertical","noUi-background","noUi-connect","noUi-ltr","noUi-rtl","noUi-dragable","","noUi-state-drag","","noUi-state-tap","noUi-active","","noUi-stacking"];w.prototype.getMargin=function(a){return 2===this.xPct.length?n(this.xVal,a):!1},w.prototype.toStepping=function(a){return a=r(this.xVal,this.xPct,a),this.direction&&(a=100-a),a},w.prototype.fromStepping=function(a){return this.direction&&(a=100-a),e(s(this.xVal,this.xPct,a))},w.prototype.getStep=function(a){return this.direction&&(a=100-a),a=t(this.xPct,this.xSteps,this.snap,a),this.direction&&(a=100-a),a},w.prototype.getApplicableStep=function(a){var b=q(a,this.xPct),c=100===a?2:1;return[this.xNumSteps[b-2],this.xVal[b-c],this.xNumSteps[b-c]]},w.prototype.convert=function(a){return this.getStep(this.toStepping(a))};var U={to:function(a){return a.toFixed(2)},from:Number};return{create:R}});
/**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.1
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);if(!e.length)return;case "object":if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});
"use strict";
/*!
 * jQuery Mobile Events
 * by Ben Major (www.ben-major.co.uk)
 *
 * Copyright 2011, Ben Major
 * Licensed under the MIT License:
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
(function(n){function l(){var n=e();n!==s&&(s=n,f.trigger("orientationchange"))}function i(t,i,r,u){var f=r.type;r.type=i;n.event.dispatch.call(t,r,u);r.type=f}var f,g,e,s,h,c,o;n.attrFn=n.attrFn||{};var r=navigator.userAgent.toLowerCase(),u=r.indexOf("chrome")>-1&&(r.indexOf("windows")>-1||r.indexOf("macintosh")>-1||r.indexOf("linux")>-1)&&r.indexOf("mobile")<0&&r.indexOf("android")<0,t={tap_pixel_range:5,swipe_h_threshold:50,swipe_v_threshold:50,taphold_threshold:750,doubletap_int:500,touch_capable:window.navigator.msPointerEnabled?!1:"ontouchstart"in window&&!u,orientation_support:"orientation"in window&&"onorientationchange"in window,startevent:window.navigator.msPointerEnabled?"MSPointerDown":"ontouchstart"in window&&!u?"touchstart":"mousedown",endevent:window.navigator.msPointerEnabled?"MSPointerUp":"ontouchstart"in window&&!u?"touchend":"mouseup",moveevent:window.navigator.msPointerEnabled?"MSPointerMove":"ontouchstart"in window&&!u?"touchmove":"mousemove",tapevent:"ontouchstart"in window&&!u?"tap":"click",scrollevent:"ontouchstart"in window&&!u?"touchmove":"scroll",hold_timer:null,tap_timer:null};if(n.isTouchCapable=function(){return t.touch_capable},n.getStartEvent=function(){return t.startevent},n.getEndEvent=function(){return t.endevent},n.getMoveEvent=function(){return t.moveevent},n.getTapEvent=function(){return t.tapevent},n.getScrollEvent=function(){return t.scrollevent},n.each(["tapstart","tapend","tapmove","tap","tap2","tap3","tap4","singletap","doubletap","taphold","swipe","swipeup","swiperight","swipedown","swipeleft","swipeend","scrollstart","scrollend","orientationchange"],function(t,i){n.fn[i]=function(n){return n?this.on(i,n):this.trigger(i)};n.attrFn[i]=!0}),n.event.special.tapstart={setup:function(){var r=this,u=n(r);u.on(t.startevent,function f(n){if(u.data("callee",f),n.which&&n.which!==1)return!1;var e=n.originalEvent,o={position:{x:t.touch_capable?e.touches[0].screenX:n.screenX,y:t.touch_capable?e.touches[0].screenY:n.screenY},offset:{x:t.touch_capable?e.touches[0].pageX-e.touches[0].target.offsetLeft:n.offsetX,y:t.touch_capable?e.touches[0].pageY-e.touches[0].target.offsetTop:n.offsetY},time:Date.now(),target:n.target};return i(r,"tapstart",n,o),!0})},remove:function(){n(this).off(t.startevent,n(this).data.callee)}},n.event.special.tapmove={setup:function(){var r=this,u=n(r);u.on(t.moveevent,function f(n){u.data("callee",f);var e=n.originalEvent,o={position:{x:t.touch_capable?e.touches[0].screenX:n.screenX,y:t.touch_capable?e.touches[0].screenY:n.screenY},offset:{x:t.touch_capable?e.touches[0].pageX-e.touches[0].target.offsetLeft:n.offsetX,y:t.touch_capable?e.touches[0].pageY-e.touches[0].target.offsetTop:n.offsetY},time:Date.now(),target:n.target};return i(r,"tapmove",n,o),!0})},remove:function(){n(this).off(t.moveevent,n(this).data.callee)}},n.event.special.tapend={setup:function(){var r=this,u=n(r);u.on(t.endevent,function f(n){u.data("callee",f);var e=n.originalEvent,o={position:{x:t.touch_capable?e.changedTouches[0].screenX:n.screenX,y:t.touch_capable?e.changedTouches[0].screenY:n.screenY},offset:{x:t.touch_capable?e.changedTouches[0].pageX-e.changedTouches[0].target.offsetLeft:n.offsetX,y:t.touch_capable?e.changedTouches[0].pageY-e.changedTouches[0].target.offsetTop:n.offsetY},time:Date.now(),target:n.target};return i(r,"tapend",n,o),!0})},remove:function(){n(this).off(t.endevent,n(this).data.callee)}},n.event.special.taphold={setup:function(){var o=this,u=n(o),s,r={x:0,y:0},f=0,e=0;u.on(t.startevent,function h(n){if(n.which&&n.which!==1)return!1;u.data("tapheld",!1);s=n.target;var c=n.originalEvent,l=Date.now(),a={x:t.touch_capable?c.touches[0].screenX:n.screenX,y:t.touch_capable?c.touches[0].screenY:n.screenY},v={x:t.touch_capable?c.touches[0].pageX-c.touches[0].target.offsetLeft:n.offsetX,y:t.touch_capable?c.touches[0].pageY-c.touches[0].target.offsetTop:n.offsetY};return r.x=n.originalEvent.targetTouches?n.originalEvent.targetTouches[0].pageX:n.pageX,r.y=n.originalEvent.targetTouches?n.originalEvent.targetTouches[0].pageY:n.pageY,f=r.x,e=r.y,t.hold_timer=window.setTimeout(function(){var y=r.x-f,p=r.y-e;if(n.target==s&&(r.x==f&&r.y==e||y>=-t.tap_pixel_range&&y<=t.tap_pixel_range&&p>=-t.tap_pixel_range&&p<=t.tap_pixel_range)){u.data("tapheld",!0);var w=Date.now(),b={x:t.touch_capable?c.touches[0].screenX:n.screenX,y:t.touch_capable?c.touches[0].screenY:n.screenY},k={x:t.touch_capable?c.touches[0].pageX-c.touches[0].target.offsetLeft:n.offsetX,y:t.touch_capable?c.touches[0].pageY-c.touches[0].target.offsetTop:n.offsetY},d=w-l,g={startTime:l,endTime:w,startPosition:a,startOffset:v,endPosition:b,endOffset:k,duration:d,target:n.target};u.data("callee1",h);i(o,"taphold",n,g)}},t.taphold_threshold),!0}).on(t.endevent,function c(){u.data("callee2",c);u.data("tapheld",!1);window.clearTimeout(t.hold_timer)}).on(t.moveevent,function l(n){u.data("callee3",l);f=n.originalEvent.targetTouches?n.originalEvent.targetTouches[0].pageX:n.pageX;e=n.originalEvent.targetTouches?n.originalEvent.targetTouches[0].pageY:n.pageY})},remove:function(){n(this).off(t.startevent,n(this).data.callee1).off(t.endevent,n(this).data.callee2).off(t.moveevent,n(this).data.callee3)}},n.event.special.doubletap={setup:function(){var s=this,r=n(s),h,f,e,u,c,o=!1;r.on(t.startevent,function l(n){return n.which&&n.which!==1?!1:(r.data("doubletapped",!1),h=n.target,r.data("callee1",l),u=n.originalEvent,e={position:{x:t.touch_capable?u.touches[0].screenX:n.screenX,y:t.touch_capable?u.touches[0].screenY:n.screenY},offset:{x:t.touch_capable?u.touches[0].pageX-u.touches[0].target.offsetLeft:n.offsetX,y:t.touch_capable?u.touches[0].pageY-u.touches[0].target.offsetTop:n.offsetY},time:Date.now(),target:n.target},!0)}).on(t.endevent,function a(n){var u=Date.now(),p=r.data("lastTouch")||u+1,v=u-p,l,y;window.clearTimeout(f);r.data("callee2",a);v<t.doubletap_int&&n.target==h&&v>100?(r.data("doubletapped",!0),window.clearTimeout(t.tap_timer),l={position:{x:t.touch_capable?n.originalEvent.changedTouches[0].screenX:n.screenX,y:t.touch_capable?n.originalEvent.changedTouches[0].screenY:n.screenY},offset:{x:t.touch_capable?n.originalEvent.changedTouches[0].pageX-n.originalEvent.changedTouches[0].target.offsetLeft:n.offsetX,y:t.touch_capable?n.originalEvent.changedTouches[0].pageY-n.originalEvent.changedTouches[0].target.offsetTop:n.offsetY},time:Date.now(),target:n.target},y={firstTap:e,secondTap:l,interval:l.time-e.time},o||i(s,"doubletap",n,y),o=!0,c=window.setTimeout(function(){o=!1},t.doubletap_int)):(r.data("lastTouch",u),f=window.setTimeout(function(){window.clearTimeout(f)},t.doubletap_int,[n]));r.data("lastTouch",u)})},remove:function(){n(this).off(t.startevent,n(this).data.callee1).off(t.endevent,n(this).data.callee2)}},n.event.special.singletap={setup:function(){var f=this,r=n(f),e=null,o=null,u={x:0,y:0};r.on(t.startevent,function s(n){return n.which&&n.which!==1?!1:(o=Date.now(),e=n.target,r.data("callee1",s),u.x=n.originalEvent.targetTouches?n.originalEvent.targetTouches[0].pageX:n.pageX,u.y=n.originalEvent.targetTouches?n.originalEvent.targetTouches[0].pageY:n.pageY,!0)}).on(t.endevent,function h(n){if(r.data("callee2",h),n.target==e){var s=n.originalEvent.changedTouches?n.originalEvent.changedTouches[0].pageX:n.pageX,c=n.originalEvent.changedTouches?n.originalEvent.changedTouches[0].pageY:n.pageY;t.tap_timer=window.setTimeout(function(){if(!r.data("doubletapped")&&!r.data("tapheld")&&u.x==s&&u.y==c){var e=n.originalEvent,h={position:{x:t.touch_capable?e.changedTouches[0].screenX:n.screenX,y:t.touch_capable?e.changedTouches[0].screenY:n.screenY},offset:{x:t.touch_capable?e.changedTouches[0].pageX-e.changedTouches[0].target.offsetLeft:n.offsetX,y:t.touch_capable?e.changedTouches[0].pageY-e.changedTouches[0].target.offsetTop:n.offsetY},time:Date.now(),target:n.target};h.time-o<t.taphold_threshold&&i(f,"singletap",n,h)}},t.doubletap_int)}})},remove:function(){n(this).off(t.startevent,n(this).data.callee1).off(t.endevent,n(this).data.callee2)}},n.event.special.tap={setup:function(){var e=this,u=n(e),o=!1,s=null,h,r={x:0,y:0},f;u.on(t.startevent,function c(n){return u.data("callee1",c),n.which&&n.which!==1?!1:(o=!0,r.x=n.originalEvent.targetTouches?n.originalEvent.targetTouches[0].pageX:n.pageX,r.y=n.originalEvent.targetTouches?n.originalEvent.targetTouches[0].pageY:n.pageY,h=Date.now(),s=n.target,f=n.originalEvent.targetTouches?n.originalEvent.targetTouches:[n],!0)}).on(t.endevent,function l(n){var a,y,c,d;u.data("callee2",l);var p=n.originalEvent.targetTouches?n.originalEvent.changedTouches[0].pageX:n.pageX,w=n.originalEvent.targetTouches?n.originalEvent.changedTouches[0].pageY:n.pageY,b=r.x-p,k=r.y-w,v;if(s==n.target&&o&&Date.now()-h<t.taphold_threshold&&(r.x==p&&r.y==w||b>=-t.tap_pixel_range&&b<=t.tap_pixel_range&&k>=-t.tap_pixel_range&&k<=t.tap_pixel_range)){for(a=n.originalEvent,y=[],c=0;c<f.length;c++)d={position:{x:t.touch_capable?a.changedTouches[c].screenX:n.screenX,y:t.touch_capable?a.changedTouches[c].screenY:n.screenY},offset:{x:t.touch_capable?a.changedTouches[c].pageX-a.changedTouches[c].target.offsetLeft:n.offsetX,y:t.touch_capable?a.changedTouches[c].pageY-a.changedTouches[c].target.offsetTop:n.offsetY},time:Date.now(),target:n.target},y.push(d);switch(f.length){case 1:v="tap";break;case 2:v="tap2";break;case 3:v="tap3";break;case 4:v="tap4"}i(e,v,n,y)}})},remove:function(){n(this).off(t.startevent,n(this).data.callee1).off(t.endevent,n(this).data.callee2)}},n.event.special.swipe={setup:function(){function s(o){i=n(o.currentTarget);i.data("callee1",s);u.x=o.originalEvent.targetTouches?o.originalEvent.targetTouches[0].pageX:o.pageX;u.y=o.originalEvent.targetTouches?o.originalEvent.targetTouches[0].pageY:o.pageY;f.x=u.x;f.y=u.y;e=!0;var h=o.originalEvent;r={position:{x:t.touch_capable?h.touches[0].screenX:o.screenX,y:t.touch_capable?h.touches[0].screenY:o.screenY},offset:{x:t.touch_capable?h.touches[0].pageX-h.touches[0].target.offsetLeft:o.offsetX,y:t.touch_capable?h.touches[0].pageY-h.touches[0].target.offsetTop:o.offsetY},time:Date.now(),target:o.target}}function h(s){i=n(s.currentTarget);i.data("callee2",h);f.x=s.originalEvent.targetTouches?s.originalEvent.targetTouches[0].pageX:s.pageX;f.y=s.originalEvent.targetTouches?s.originalEvent.targetTouches[0].pageY:s.pageY;var c,a=i.parent().data("xthreshold")?i.parent().data("xthreshold"):i.data("xthreshold"),v=i.parent().data("ythreshold")?i.parent().data("ythreshold"):i.data("ythreshold"),p=typeof a!="undefined"&&a!==!1&&parseInt(a)?parseInt(a):t.swipe_h_threshold,w=typeof v!="undefined"&&v!==!1&&parseInt(v)?parseInt(v):t.swipe_v_threshold;if(u.y>f.y&&u.y-f.y>w&&(c="swipeup"),u.x<f.x&&f.x-u.x>p&&(c="swiperight"),u.y<f.y&&f.y-u.y>w&&(c="swipedown"),u.x>f.x&&u.x-f.x>p&&(c="swipeleft"),c!=undefined&&e){u.x=0;u.y=0;f.x=0;f.y=0;e=!1;var l=s.originalEvent,y={position:{x:t.touch_capable?l.touches[0].screenX:s.screenX,y:t.touch_capable?l.touches[0].screenY:s.screenY},offset:{x:t.touch_capable?l.touches[0].pageX-l.touches[0].target.offsetLeft:s.offsetX,y:t.touch_capable?l.touches[0].pageY-l.touches[0].target.offsetTop:s.offsetY},time:Date.now(),target:s.target},k=Math.abs(r.position.x-y.position.x),d=Math.abs(r.position.y-y.position.y),b={startEvnt:r,endEvnt:y,direction:c.replace("swipe",""),xAmount:k,yAmount:d,duration:y.time-r.time};o=!0;i.trigger("swipe",b).trigger(c,b)}}function c(u){var s;if(i=n(u.currentTarget),s="",i.data("callee3",c),o){var l=i.data("xthreshold"),a=i.data("ythreshold"),v=typeof l!="undefined"&&l!==!1&&parseInt(l)?parseInt(l):t.swipe_h_threshold,y=typeof a!="undefined"&&a!==!1&&parseInt(a)?parseInt(a):t.swipe_v_threshold,h=u.originalEvent,f={position:{x:t.touch_capable?h.changedTouches[0].screenX:u.screenX,y:t.touch_capable?h.changedTouches[0].screenY:u.screenY},offset:{x:t.touch_capable?h.changedTouches[0].pageX-h.changedTouches[0].target.offsetLeft:u.offsetX,y:t.touch_capable?h.changedTouches[0].pageY-h.changedTouches[0].target.offsetTop:u.offsetY},time:Date.now(),target:u.target};r.position.y>f.position.y&&r.position.y-f.position.y>y&&(s="swipeup");r.position.x<f.position.x&&f.position.x-r.position.x>v&&(s="swiperight");r.position.y<f.position.y&&f.position.y-r.position.y>y&&(s="swipedown");r.position.x>f.position.x&&r.position.x-f.position.x>v&&(s="swipeleft");var p=Math.abs(r.position.x-f.position.x),w=Math.abs(r.position.y-f.position.y),b={startEvnt:r,endEvnt:f,direction:s.replace("swipe",""),xAmount:p,yAmount:w,duration:f.time-r.time};i.trigger("swipeend",b)}e=!1;o=!1}var l=this,i=n(l),e=!1,o=!1,u={x:0,y:0},f={x:0,y:0},r;i.on(t.startevent,s);i.on(t.moveevent,h);i.on(t.endevent,c)},remove:function(){n(this).off(t.startevent,n(this).data.callee1).off(t.moveevent,n(this).data.callee2).off(t.endevent,n(this).data.callee3)}},n.event.special.scrollstart={setup:function(){function o(n,t){r=t;i(u,r?"scrollstart":"scrollend",n)}var u=this,f=n(u),r,e;f.on(t.scrollevent,function s(n){f.data("callee",s);r||o(n,!0);clearTimeout(e);e=setTimeout(function(){o(n,!1)},50)})},remove:function(){n(this).off(t.scrollevent,n(this).data.callee)}},f=n(window),o={"0":!0,"180":!0},t.orientation_support){var p=window.innerWidth||f.width(),w=window.innerHeight||f.height();h=p>w&&p-w>50;c=o[window.orientation];(h&&c||!h&&!c)&&(o={"-90":!0,"90":!0})}n.event.special.orientationchange=g={setup:function(){if(t.orientation_support)return!1;s=e();f.on("throttledresize",l);return!0},teardown:function(){return t.orientation_support?!1:(f.off("throttledresize",l),!0)},add:function(n){var t=n.handler;n.handler=function(n){return n.orientation=e(),t.apply(this,arguments)}}};n.event.special.orientationchange.orientation=e=function(){var i=!0,n=document.documentElement;return i=t.orientation_support?o[window.orientation]:n&&n.clientWidth/n.clientHeight<1.1,i?"portrait":"landscape"};n.event.special.throttledresize={setup:function(){n(this).on("resize",k)},teardown:function(){n(this).off("resize",k)}};var b=250,k=function(){v=Date.now();y=v-d;y>=b?(d=v,n(this).trigger("throttledresize")):(a&&window.clearTimeout(a),a=window.setTimeout(l,b-y))},d=0,a,v,y;n.each({scrollend:"scrollstart",swipeup:"swipe",swiperight:"swipe",swipedown:"swipe",swipeleft:"swipe",swipeend:"swipe",tap2:"tap"},function(t,i){n.event.special[t]={setup:function(){n(this).on(i,n.noop)}}})})(jQuery)

/**
 * Owl carousel
 * @version 2.0.0-beta.3
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($, window, document, undefined) {

	/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Proxied event handlers.
		 * @protected
		 */
		this._handlers = {};

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from beeing retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Widths of all items.
		 */
		this._widths = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		/**
		 * Current state information for the drag operation.
		 * @todo #261
		 * @protected
		 */
		this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		};

		/**
		 * Current state information and their tags.
		 * @type {Object}
		 * @protected
		 */
		this._states = {
			current: {},
			tags: {
				'initializing': [ 'busy' ],
				'animating': [ 'busy' ],
				'dragging': [ 'interacting' ]
			}
		};

		$.each([ 'onResize', 'onThrottledResize' ], $.proxy(function(i, handler) {
			this._handlers[handler] = $.proxy(this[handler], this);
		}, this));

		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
			this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
				= new plugin(this);
		}, this));

		$.each(Owl.Workers, $.proxy(function(priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,
		rewind: false,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,

		fallbackEasing: 'swing',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		refreshClass: 'owl-refresh',
		loadedClass: 'owl-loaded',
		loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		responsiveClass: 'owl-responsive',
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		stageClass: 'owl-stage',
		stageOuterClass: 'owl-stage-outer',
		grabClass: 'owl-grab'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Enumeration for types.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Type = {
		Event: 'event',
		State: 'state'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * List of workers involved in the update process.
	 */
	Owl.Workers = [ {
		filter: [ 'width', 'settings' ],
		run: function() {
			this._width = this.$element.width();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			this.$stage.children('.cloned').remove();
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var margin = this.settings.margin || '',
				grid = !this.settings.autoWidth,
				rtl = this.settings.rtl,
				css = {
					'width': 'auto',
					'margin-left': rtl ? margin : '',
					'margin-right': rtl ? '' : margin
				};

			!grid && this.$stage.children().css(css);

			cache.css = css;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				merge = null,
				iterator = this._items.length,
				grid = !this.settings.autoWidth,
				widths = [];

			cache.items = {
				merge: false,
				width: width
			};

			while (iterator--) {
				merge = this._mergers[iterator];
				merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

				cache.items.merge = merge > 1 || cache.items.merge;

				widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
			}

			this._widths = widths;
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var clones = [],
				items = this._items,
				settings = this.settings,
				view = Math.max(settings.items * 2, 4),
				size = Math.ceil(items.length / 2) * 2,
				repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
				append = '',
				prepend = '';

			repeat /= 2;

			while (repeat--) {
				clones.push(this.normalize(clones.length / 2, true));
				append = append + items[clones[clones.length - 1]][0].outerHTML;
				clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
				prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
			}

			this._clones = clones;

			$(append).addClass('cloned').appendTo(this.$stage);
			$(prepend).addClass('cloned').prependTo(this.$stage);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				size = this._clones.length + this._items.length,
				iterator = -1,
				previous = 0,
				current = 0,
				coordinates = [];

			while (++iterator < size) {
				previous = coordinates[iterator - 1] || 0;
				current = this._widths[this.relative(iterator)] + this.settings.margin;
				coordinates.push(previous + current * rtl);
			}

			this._coordinates = coordinates;
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var padding = this.settings.stagePadding,
				coordinates = this._coordinates,
				css = {
					'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
					'padding-left': padding || '',
					'padding-right': padding || ''
				};

			this.$stage.css(css);
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			var iterator = this._coordinates.length,
				grid = !this.settings.autoWidth,
				items = this.$stage.children();

			if (grid && cache.items.merge) {
				while (iterator--) {
					cache.css.width = this._widths[this.relative(iterator)];
					items.eq(iterator).css(cache.css);
				}
			} else if (grid) {
				cache.css.width = cache.items.width;
				items.css(cache.css);
			}
		}
	}, {
		filter: [ 'items' ],
		run: function() {
			this._coordinates.length < 1 && this.$stage.removeAttr('style');
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
			cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
			this.reset(cache.current);
		}
	}, {
		filter: [ 'position' ],
		run: function() {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: [ 'width', 'position', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [], i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.active').removeClass('active');
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

			if (this.settings.center) {
				this.$stage.children('.center').removeClass('center');
				this.$stage.children().eq(this.current()).addClass('center');
			}
		}
	} ];

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function() {
		this.enter('initializing');
		this.trigger('initialize');

		this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

		if (this.settings.autoWidth && !this.is('pre-loading')) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
			}
		}

		this.$element.addClass(this.options.loadingClass);

		// create stage
		this.$stage = $('<' + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>')
			.wrap('<div class="' + this.settings.stageOuterClass + '"/>');

		// append stage
		this.$element.append(this.$stage.parent());

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// check visibility
		if (this.$element.is(':visible')) {
			// update view
			this.refresh();
		} else {
			// invalidate width
			this.invalidate('width');
		}

		this.$element
			.removeClass(this.options.loadingClass)
			.addClass(this.options.loadedClass);

		// register event handlers
		this.registerEventHandlers();

		this.leave('initializing');
		this.trigger('initialized');
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function() {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class',
					this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
				);
			}
		}

		if (this.settings === null || this._breakpoint !== match) {
			this.trigger('change', { property: { name: 'settings', value: settings } });
			this._breakpoint = match;
			this.settings = settings;
			this.invalidate('settings');
			this.trigger('changed', { property: { name: 'settings', value: this.settings } });
		}
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function() {
		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function(item) {
		var event = this.trigger('prepare', { content: item });

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.options.itemClass).append(item)
		}

		this.trigger('prepared', { content: event.data });

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function() {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};

		!this.is('valid') && this.enter('valid');
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function(dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function() {
		this.enter('refreshing');
		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		this.$element.addClass(this.options.refreshClass);

		this.update();

		this.$element.removeClass(this.options.refreshClass);

		this.leave('refreshing');
		this.trigger('refreshed');
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function() {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (!this.$element.is(':visible')) {
			return false;
		}

		this.enter('resizing');

		if (this.trigger('resize').isDefaultPrevented()) {
			this.leave('resizing');
			return false;
		}

		this.invalidate('width');

		this.refresh();

		this.leave('resizing');
		this.trigger('resized');
	};

	/**
	 * Registers event handlers.
	 * @todo Check `msPointerEnabled`
	 * @todo #261
	 * @protected
	 */
	Owl.prototype.registerEventHandlers = function() {
		if ($.support.transition) {
			this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
		}

		if (this.settings.responsive !== false) {
			this.on(window, 'resize', this._handlers.onThrottledResize);
		}

		if (this.settings.mouseDrag) {
			this.$element.addClass(this.options.dragClass);
			this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
		}

		if (this.settings.touchDrag){
			this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
			this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
		}
	};

	/**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function(event) {
		var stage = null;

		if (event.which === 3) {
			return;
		}

		if ($.support.transform) {
			stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
			stage = {
				x: stage[stage.length === 16 ? 12 : 4],
				y: stage[stage.length === 16 ? 13 : 5]
			};
		} else {
			stage = this.$stage.position();
			stage = {
				x: this.settings.rtl ?
					stage.left + this.$stage.width() - this.width() + this.settings.margin :
					stage.left,
				y: stage.top
			};
		}

		if (this.is('animating')) {
			$.support.transform ? this.animate(stage.x) : this.$stage.stop()
			this.invalidate('position');
		}

		this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

		this.speed(0);

		this._drag.time = new Date().getTime();
		this._drag.target = $(event.target);
		this._drag.stage.start = stage;
		this._drag.stage.current = stage;
		this._drag.pointer = this.pointer(event);

		$(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

		$(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
			var delta = this.difference(this._drag.pointer, this.pointer(event));

			$(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

			if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
				return;
			}

			event.preventDefault();

			this.enter('dragging');
			this.trigger('drag');
		}, this));
	};

	/**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function(event) {
		var minimum = null,
			maximum = null,
			pull = null,
			delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this.difference(this._drag.stage.start, delta);

		if (!this.is('dragging')) {
			return;
		}

		event.preventDefault();

		if (this.settings.loop) {
			minimum = this.coordinates(this.minimum());
			maximum = this.coordinates(this.maximum() + 1) - minimum;
			stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
		} else {
			minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
			stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
		}

		this._drag.stage.current = stage;

		this.animate(stage.x);
	};

	/**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragEnd = function(event) {
		var delta = this.difference(this._drag.pointer, this.pointer(event)),
			stage = this._drag.stage.current,
			direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

		$(document).off('.owl.core');

		this.$element.removeClass(this.options.grabClass);

		if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
			this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
			this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
			this.invalidate('position');
			this.update();

			this._drag.direction = direction;

			if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
				this._drag.target.one('click.owl.core', function() { return false; });
			}
		}

		if (!this.is('dragging')) {
			return;
		}

		this.leave('dragging');
		this.trigger('dragged');
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function(coordinate, direction) {
		var position = -1,
			pull = 30,
			width = this.width(),
			coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function(index, value) {
				if (coordinate > value - pull && coordinate < value + pull) {
					position = index;
				} else if (this.op(coordinate, '<', value)
					&& this.op(coordinate, '>', coordinates[index + 1] || value - width)) {
					position = direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @todo #270
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function(coordinate) {
		var animate = this.speed() > 0;

		this.is('animating') && this.onTransitionEnd();

		if (animate) {
			this.enter('animating');
			this.trigger('translate');
		}

		if ($.support.transform3d && $.support.transition) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px,0px,0px)',
				transition: (this.speed() / 1000) + 's'
			});
		} else if (animate) {
			this.$stage.animate({
				left: coordinate + 'px'
			}, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
		} else {
			this.$stage.css({
				left: coordinate + 'px'
			});
		}
	};

	/**
	 * Checks whether the carousel is in a specific state or not.
	 * @param {String} state - The state to check.
	 * @returns {Boolean} - The flag which indicates if the carousel is busy.
	 */
	Owl.prototype.is = function(state) {
		return this._states.current[state] && this._states.current[state] > 0;
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function(position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} [part] - The part to invalidate.
	 * @returns {Array.<String>} - The invalidated parts.
	 */
	Owl.prototype.invalidate = function(part) {
		if ($.type(part) === 'string') {
			this._invalidated[part] = true;
			this.is('valid') && this.leave('valid');
		}
		return $.map(this._invalidated, function(v, i) { return i });
	};

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function(position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
	};

	/**
	 * Normalizes an absolute or a relative position of an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function(position, relative) {
		var n = this._items.length,
			m = relative ? 0 : this._clones.length;

		if (!$.isNumeric(position) || n < 1) {
			position = undefined;
		} else if (position < 0 || position >= n + m) {
			position = ((position - m / 2) % n + n) % n + m / 2;
		}

		return position;
	};

	/**
	 * Converts an absolute position of an item into a relative one.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function(position) {
		position -= this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function(relative) {
		var settings = this.settings,
			maximum = this._coordinates.length,
			boundary = Math.abs(this._coordinates[maximum - 1]) - this._width,
			i = -1, j;

		if (settings.loop) {
			maximum = this._clones.length / 2 + this._items.length - 1;
		} else if (settings.autoWidth || settings.merge) {
			// binary search
			while (maximum - i > 1) {
				Math.abs(this._coordinates[j = maximum + i >> 1]) < boundary
					? i = j : maximum = j;
			}
		} else if (settings.center) {
			maximum = this._items.length - 1;
		} else {
			maximum = this._items.length - settings.items;
		}

		if (relative) {
			maximum -= this._clones.length / 2;
		}

		return Math.max(maximum, 0);
	};

	/**
	 * Gets the minimum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function(relative) {
		return relative ? 0 : this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function(position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function(position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function(position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

		if (position === undefined) {
			return $.map(this._clones, function(v, i) { return map(i) });
		}

		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function(speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function(position) {
		var coordinate = null;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[position - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1);
		} else {
			coordinate = this._coordinates[position - 1] || 0;
		}

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function(from, to, factor) {
		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function(position, speed) {
		var current = this.current(),
			revert = null,
			distance = position - this.relative(current),
			direction = (distance > 0) - (distance < 0),
			items = this._items.length,
			minimum = this.minimum(),
			maximum = this.maximum();

		if (this.settings.loop) {
			if (!this.settings.rewind && Math.abs(distance) > items / 2) {
				distance += direction * -1 * items;
			}

			position = current + distance;
			revert = ((position - minimum) % items + items) % items + minimum;

			if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
				current = revert - distance;
				position = revert;
				this.reset(current);
			}
		} else if (this.settings.rewind) {
			maximum += 1;
			position = (position % maximum + maximum) % maximum;
		} else {
			position = Math.max(minimum, Math.min(maximum, position));
		}

		this.speed(this.duration(current, position, speed));
		this.current(position);

		if (this.$element.is(':visible')) {
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onTransitionEnd = function(event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.leave('animating');
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function() {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			throw 'Can not detect viewport width.';
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function(content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function() {
			return this.nodeType === 1;
		}).each($.proxy(function(index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset($.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function(content, position) {
		var current = this.relative(this._current);

		position = position === undefined ? this._items.length : this.normalize(position, true);
		content = content instanceof jQuery ? content : $(content);

		this.trigger('add', { content: content, position: position });

		content = this.prepare(content);

		if (this._items.length === 0 || position === this._items.length) {
			this._items.length === 0 && this.$stage.append(content);
			this._items.length !== 0 && this._items[position - 1].after(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this._items[current] && this.reset(this._items[current].index());

		this.invalidate('items');

		this.trigger('added', { content: content, position: position });
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function(position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', { content: this._items[position], position: position });

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', { content: null, position: position });
	};

	/**
	 * Preloads images with auto width.
	 * @todo Replace by a more generic approach
	 * @protected
	 */
	Owl.prototype.preloadAutoWidthImages = function(images) {
		images.each($.proxy(function(i, element) {
			this.enter('pre-loading');
			element = $(element);
			$(new Image()).one('load', $.proxy(function(e) {
				element.attr('src', e.target.src);
				element.css('opacity', 1);
				this.leave('pre-loading');
				!this.is('pre-loading') && !this.is('initializing') && this.refresh();
			}, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
		}, this));
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function() {

		this.$element.off('.owl.core');
		this.$stage.off('.owl.core');
		$(document).off('.owl.core');

		if (this.settings.responsive !== false) {
			window.clearTimeout(this.resizeTimer);
			this.off(window, 'resize', this._handlers.onThrottledResize);
		}

		for (var i in this._plugins) {
			this._plugins[i].destroy();
		}

		this.$stage.children('.cloned').remove();

		this.$stage.unwrap();
		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();

		this.$element
			.removeClass(this.options.refreshClass)
			.removeClass(this.options.loadingClass)
			.removeClass(this.options.loadedClass)
			.removeClass(this.options.rtlClass)
			.removeClass(this.options.dragClass)
			.removeClass(this.options.grabClass)
			.attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
			.removeData('owl.carousel');
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function(a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers a public event.
	 * @todo Remove `status`, `relatedTarget` should be used instead.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=carousel] - The event namespace.
	 * @param {String} [state] - The state which is associated with the event.
	 * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function(name, data, namespace, state, enter) {
		var status = {
			item: { count: this._items.length, index: this.current() }
		}, handler = $.camelCase(
			$.grep([ 'on', name, namespace ], function(v) { return v })
				.join('-').toLowerCase()
		), event = $.Event(
			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
			$.extend({ relatedTarget: this }, status, data)
		);

		if (!this._supress[name]) {
			$.each(this._plugins, function(name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.register({ type: Owl.Type.Event, name: name });
			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].call(this, event);
			}
		}

		return event;
	};

	/**
	 * Enters a state.
	 * @param name - The state name.
	 */
	Owl.prototype.enter = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			if (this._states.current[name] === undefined) {
				this._states.current[name] = 0;
			}

			this._states.current[name]++;
		}, this));
	};

	/**
	 * Leaves a state.
	 * @param name - The state name.
	 */
	Owl.prototype.leave = function(name) {
		$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
			this._states.current[name]--;
		}, this));
	};

	/**
	 * Registers an event or state.
	 * @public
	 * @param {Object} object - The event or state to register.
	 */
	Owl.prototype.register = function(object) {
		if (object.type === Owl.Type.Event) {
			if (!$.event.special[object.name]) {
				$.event.special[object.name] = {};
			}

			if (!$.event.special[object.name].owl) {
				var _default = $.event.special[object.name]._default;
				$.event.special[object.name]._default = function(e) {
					if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
						return _default.apply(this, arguments);
					}
					return e.namespace && e.namespace.indexOf('owl') > -1;
				};
				$.event.special[object.name].owl = true;
			}
		} else if (object.type === Owl.Type.State) {
			if (!this._states.tags[object.name]) {
				this._states.tags[object.name] = object.tags;
			} else {
				this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
			}

			this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
				return $.inArray(tag, this._states.tags[object.name]) === i;
			}, this));
		}
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function(events) {
		$.each(events, $.proxy(function(index, event) {
			this._supress[event] = true;
		}, this));
	};

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function(events) {
		$.each(events, $.proxy(function(index, event) {
			delete this._supress[event];
		}, this));
	};

	/**
	 * Gets unified pointer coordinates from event.
	 * @todo #261
	 * @protected
	 * @param {Event} - The `mousedown` or `touchstart` event.
	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
	 */
	Owl.prototype.pointer = function(event) {
		var result = { x: null, y: null };

		event = event.originalEvent || event || window.event;

		event = event.touches && event.touches.length ?
			event.touches[0] : event.changedTouches && event.changedTouches.length ?
				event.changedTouches[0] : event;

		if (event.pageX) {
			result.x = event.pageX;
			result.y = event.pageY;
		} else {
			result.x = event.clientX;
			result.y = event.clientY;
		}

		return result;
	};

	/**
	 * Gets the difference of two vectors.
	 * @todo #261
	 * @protected
	 * @param {Object} - The first vector.
	 * @param {Object} - The second vector.
	 * @returns {Object} - The difference.
	 */
	Owl.prototype.difference = function(first, second) {
		return {
			x: first.x - second.x,
			y: first.y - second.y
		};
	};

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @todo Navigation plugin `next` and `prev`
	 * @public
	 */
	$.fn.owlCarousel = function(option) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			var $this = $(this),
				data = $this.data('owl.carousel');

			if (!data) {
				data = new Owl(this, typeof option == 'object' && option);
				$this.data('owl.carousel', data);

				$.each([
					'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
				], function(i, event) {
					data.register({ type: Owl.Type.Event, name: event });
					data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
						if (e.namespace && e.relatedTarget !== this) {
							this.suppress([ event ]);
							data[event].apply(this, [].slice.call(arguments, 1));
							this.release([ event ]);
						}
					}, data));
				});
			}

			if (typeof option == 'string' && option.charAt(0) !== '_') {
				data[option].apply(data, args);
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.0.0-beta.3
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto refresh plugin.
	 * @class The Auto Refresh Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoRefresh = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Refresh interval.
		 * @protected
		 * @type {number}
		 */
		this._interval = null;

		/**
		 * Whether the element is currently visible or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._visible = null;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoRefresh) {
					this.watch();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoRefresh.Defaults = {
		autoRefresh: true,
		autoRefreshInterval: 500
	};

	/**
	 * Watches the element.
	 */
	AutoRefresh.prototype.watch = function() {
		if (this._interval) {
			return;
		}

		this._visible = this._core.$element.is(':visible');
		this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
	};

	/**
	 * Refreshes the element.
	 */
	AutoRefresh.prototype.refresh = function() {
		if (this._core.$element.is(':visible') === this._visible) {
			return;
		}

		this._visible = !this._visible;

		this._core.$element.toggleClass('owl-hidden', !this._visible);

		this._visible && (this._core.invalidate('width') && this._core.refresh());
	};

	/**
	 * Destroys the plugin.
	 */
	AutoRefresh.prototype.destroy = function() {
		var handler, property;

		window.clearInterval(this._interval);

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.0.0-beta.3
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function(carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = ((e.property && e.property.value) || this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function(i, v) { this.load(v) }, this);

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position)), load);
						position++;
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	}

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false
	}

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function(position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function(index, element) {
			var $element = $(element), image,
				url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src');

			this._core.trigger('load', { element: $element, url: url }, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function() {
					$element.css('opacity', 1);
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this)).attr('src', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function() {
					$element.css({
						'background-image': 'url(' + url + ')',
						'opacity': '1'
					});
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	}

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.0.0-beta.3
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight && e.property.name == 'position'){
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoHeight
					&& e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function() {
		var start = this._core._current,
			end = start + this._core.settings.items,
			visible = this._core.$stage.children().toArray().slice(start, end);
			heights = [],
			maxheight = 0;

		$.each(visible, function(index, item) {
			heights.push($(item).height());
		});

		maxheight = Math.max.apply(null, heights);

		this._core.$stage.parent()
			.height(maxheight)
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.0.0-beta.3
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * All event handlers.
		 * @todo The cloned content removale is too late
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this._core.register({ type: 'state', name: 'playing', tags: [ 'interacting' ] });
				}
			}, this),
			'resize.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.is('resizing')) {
					this._core.$stage.find('.cloned .owl-video-frame').remove();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position' && this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				var $element = $(e.content).find('.owl-video');

				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function(target, item) {
		var type = target.attr('data-vimeo-id') ? 'vimeo' : 'youtube',
			id = target.attr('data-vimeo-id') || target.attr('data-youtube-id'),
			width = target.attr('data-width') || this._core.settings.videoWidth,
			height = target.attr('data-height') || this._core.settings.videoHeight,
			url = target.attr('href');

		if (url) {
			id = url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function(target, video) {
		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'style="width:' + video.width + 'px;height:' + video.height + 'px;"' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function(path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = '<div class="owl-video-tn ' + lazyClass + '" ' + srcType + '="' + path + '"></div>';
				} else {
					tnLink = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + path + ')"></div>';
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap('<div class="owl-video-wrapper"' + dimensions + '></div>');

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "http://img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: 'http://vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function() {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
		this._core.leave('playing');
		this._core.trigger('stopped', null, 'video');
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} event - The event arguments.
	 */
	Video.prototype.play = function(event) {
		var target = $(event.target),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html;

		if (this._playing) {
			return;
		}

		this._core.enter('playing');
		this._core.trigger('play', null, 'video');

		item = this._core.items(this._core.relative(item.index()));

		this._core.reset(item.index());

		if (video.type === 'youtube') {
			html = '<iframe width="' + width + '" height="' + height + '" src="http://www.youtube.com/embed/' +
				video.id + '?autoplay=1&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
		} else if (video.type === 'vimeo') {
			html = '<iframe src="http://player.vimeo.com/video/' + video.id +
				'?autoplay=1" width="' + width + '" height="' + height +
				'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		}

		$('<div class="owl-video-frame">' + html + '</div>').insertAfter(item.find('.owl-video'));

		this._playing = item.addClass('owl-video-playing');
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function() {
		var element = document.fullscreenElement || document.mozFullScreenElement ||
				document.webkitFullscreenElement;

		return element && $(element).parent().hasClass('owl-video-frame');
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function() {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.0.0-beta.3
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					this.swapping = e.type == 'translated';
				}
			}, this),
			'translate.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function() {

		if (this.core.settings.items !== 1) {
			return;
		}

		if (!$.support.animation || !$.support.transition) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.one($.support.animation.end, clear)
				.css( { 'left': left + 'px' } )
				.addClass('animated owl-animated-out')
				.addClass(outgoing);
		}

		if (incoming) {
			next.one($.support.animation.end, clear)
				.addClass('animated owl-animated-in')
				.addClass(incoming);
		}
	};

	Animate.prototype.clear = function(e) {
		$(e.target).css( { 'left': '' } )
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.onTransitionEnd();
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.0.0-beta.3
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * The autoplay interval.
		 * @type {Number}
		 */
		this._interval = null;

		/**
		 * Indicates whenever the autoplay is paused.
		 * @type {Boolean}
		 */
		this._paused = false;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'settings') {
					if (this._core.settings.autoplay) {
						this.play();
					} else {
						this.stop();
					}
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.autoplay) {
					this.play();
				}
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				if (e.namespace) {
					this.play(t, s);
				}
			}, this),
			'stop.owl.autoplay': $.proxy(function(e) {
				if (e.namespace) {
					this.stop();
				}
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
					this.play();
				}
			}, this)
		};

		// register event handlers
		this._core.$element.on(this._handlers);

		// set default options
		this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - The interval before the next animation starts.
	 * @param {Number} [speed] - The animation speed for the animations.
	 */
	Autoplay.prototype.play = function(timeout, speed) {
		this._paused = false;

		if (this._core.is('rotating')) {
			return;
		}

		this._core.enter('rotating');

		this._interval = window.setInterval($.proxy(function() {
			if (this._paused || this._core.is('busy') || this._core.is('interacting') || document.hidden) {
				return;
			}
			this._core.next(speed || this._core.settings.autoplaySpeed);
		}, this), timeout || this._core.settings.autoplayTimeout);
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function() {
		if (!this._core.is('rotating')) {
			return;
		}

		window.clearInterval(this._interval);
		this._core.leave('rotating');
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function() {
		if (!this._core.is('rotating')) {
			return;
		}

		this._paused = true;
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function() {
		var handler, property;

		this.stop();

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.0.0-beta.3
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
						$(e.content).find('[data-dot]').andSelf('[data-dot]').attr('data-dot') + '</div>');
				}
			}, this),
			'added.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, this._templates.pop());
				}
			}, this),
			'remove.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && !this._initialized) {
					this._core.trigger('initialize', null, 'navigation');
					this.initialize();
					this.update();
					this.draw();
					this._initialized = true;
					this._core.trigger('initialized', null, 'navigation');
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._initialized) {
					this._core.trigger('refresh', null, 'navigation');
					this.update();
					this.draw();
					this._core.trigger('refreshed', null, 'navigation');
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: true,
		navText: [ '<i class="fa fa-chevron-left" />', '<i class="fa fa-chevron-right" />' ],
		navSpeed: false,
		navElement: 'div',
		navContainer: false,
		navContainerClass: '',
		navBaseContainerClass: 'owl-nav slider-control',
		navClass: [ 'slider-left', 'slider-right' ],
		navBaseClass: [ 'owl-prev', 'owl-next' ],
		slideBy: 1,
		dotClass: '',
		dotBaseClass: 'owl-dot slider-dot',
		dotsClass: '',
		dotsBaseClass: 'owl-dots slider-dots',
		dots: false,
		dotsEach: false,
		dotsData: false,
		dotsSpeed: false,
		dotsContainer: false
	};

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function() {
		var override,
			settings = this._core.settings;

		// create DOM structure for relative navigation
		this._controls.$relative = (settings.navContainer ? $(settings.navContainer)
			: $('<div>').addClass(settings.navContainerClass).addClass(settings.navBaseContainerClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$previous = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[0])
			.addClass(settings.navBaseClass[0])
			.html(settings.navText[0])
			.prependTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.prev(settings.navSpeed);
			}, this));
		this._controls.$next = $('<' + settings.navElement + '>')
			.addClass(settings.navClass[1])
			.addClass(settings.navBaseClass[1])
			.html(settings.navText[1])
			.appendTo(this._controls.$relative)
			.on('click', $.proxy(function(e) {
				this.next(settings.navSpeed);
			}, this));

		// create DOM structure for absolute navigation
		if (!settings.dotsData) {
			this._templates = [ $('<div>')
				.addClass(settings.dotClass)
				.addClass(settings.dotBaseClass)
				.append($('<span>'))
				.prop('outerHTML') ];
		}

		this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer)
			: $('<div>').addClass(settings.dotsClass).addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

		this._controls.$absolute.on('click', 'div', $.proxy(function(e) {
			var index = $(e.target).parent().is(this._controls.$absolute)
				? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, settings.dotsSpeed);
		}, this));

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	};

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function() {
		var handler, control, property, override;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			this._controls[control].remove();
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function() {
		var i, j, k,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			maximum = this._core.maximum(true),
			settings = this._core.settings,
			size = settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items;

		if (settings.slideBy !== 'page') {
			settings.slideBy = Math.min(settings.slideBy, settings.items);
		}

		if (settings.dots || settings.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: Math.min(maximum, i - lower),
						end: i - lower + size - 1
					});
					if (Math.min(maximum, i - lower) === maximum) {
						break;
					}
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	};

	/**
	 * Draws the user interface.
	 * @todo The option `dotsData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function() {
		var difference,
			settings = this._core.settings,
			disabled = this._core.items().length <= settings.items,
			index = this._core.relative(this._core.current()),
			loop = settings.loop || settings.rewind;

		this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

		if (settings.nav) {
			this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
			this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
		}

		this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

		if (settings.dots) {
			difference = this._pages.length - this._controls.$absolute.children().length;

			if (settings.dotsData && difference !== 0) {
				this._controls.$absolute.html(this._templates.join(''));
			} else if (difference > 0) {
				this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
			} else if (difference < 0) {
				this._controls.$absolute.children().slice(difference).remove();
			}

			this._controls.$absolute.find('.active').removeClass('active');
			this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}
	};

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function(event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotsData
				? 1 : settings.dotsEach || settings.items)
		};
	};

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function() {
		var current = this._core.relative(this._core.current());
		return $.grep(this._pages, $.proxy(function(page, index) {
			return page.start <= current && page.end >= current;
		}, this)).pop();
	};

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function(successor) {
		var position, length,
			settings = this._core.settings;

		if (settings.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += settings.slideBy : position -= settings.slideBy;
		}

		return position;
	};

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	};

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	};

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function(position, speed, standard) {
		var length;

		if (!standard) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.0.0-beta.3
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash index for the items.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function(e) {
				if (e.namespace && this._core.settings.startPosition === 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				if (e.namespace) {
					var hash = $(e.content).find('[data-hash]').andSelf('[data-hash]').attr('data-hash');

					if (!hash) {
						return;
					}

					this._hashes[hash] = e.content;
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name === 'position') {
					var current = this._core.items(this._core.relative(this._core.current())),
						hash = $.map(this._hashes, function(item, hash) {
							return item === current ? hash : null;
						}).join();

					if (!hash || window.location.hash.slice(1) === hash) {
						return;
					}

					window.location.hash = hash;
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function(e) {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]);

			if (position === undefined || position === this._core.current()) {
				return;
			}

			this._core.to(this._core.relative(position), false, true);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	};

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function() {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.0.0-beta.3
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	var style = $('<support>').get(0).style,
		prefixes = 'Webkit Moz O ms'.split(' '),
		events = {
			transition: {
				end: {
					WebkitTransition: 'webkitTransitionEnd',
					MozTransition: 'transitionend',
					OTransition: 'oTransitionEnd',
					transition: 'transitionend'
				}
			},
			animation: {
				end: {
					WebkitAnimation: 'webkitAnimationEnd',
					MozAnimation: 'animationend',
					OAnimation: 'oAnimationEnd',
					animation: 'animationend'
				}
			}
		},
		tests = {
			csstransforms: function() {
				return !!test('transform');
			},
			csstransforms3d: function() {
				return !!test('perspective');
			},
			csstransitions: function() {
				return !!test('transition');
			},
			cssanimations: function() {
				return !!test('animation');
			}
		};

	function test(property, prefixed) {
		var result = false,
			upper = property.charAt(0).toUpperCase() + property.slice(1);

		$.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
			if (style[property] !== undefined) {
				result = prefixed ? property : true;
				return false;
			}
		});

		return result;
	}

	function prefixed(property) {
		return test(property, true);
	}

	if (tests.csstransitions()) {
		/* jshint -W053 */
		$.support.transition = new String(prefixed('transition'))
		$.support.transition.end = events.transition.end[ $.support.transition ];
	}

	if (tests.cssanimations()) {
		/* jshint -W053 */
		$.support.animation = new String(prefixed('animation'))
		$.support.animation.end = events.animation.end[ $.support.animation ];
	}

	if (tests.csstransforms()) {
		/* jshint -W053 */
		$.support.transform = new String(prefixed('transform'));
		$.support.transform3d = tests.csstransforms3d();
	}

})(window.Zepto || window.jQuery, window, document);

/*


   Magic Zoom Plus v5.0.8 
   Copyright 2015 Magic Toolbox
   Buy a license: https://www.magictoolbox.com/magiczoomplus/
   License agreement: https://www.magictoolbox.com/license/


*/
eval(function(m,a,g,i,c,k){c=function(e){return(e<a?'':c(parseInt(e/a)))+((e=e%a)>35?String.fromCharCode(e+29):e.toString(36))};if(!''.replace(/^/,String)){while(g--){k[c(g)]=i[g]||c(g)}i=[function(e){return k[e]}];c=function(){return'\\w+'};g=1};while(g--){if(i[g]){m=m.replace(new RegExp('\\b'+c(g)+'\\b','g'),i[g])}}return m}('1j.8P=(17(){1c w,y;w=y=(17(){1c S={4q:"fx.3-b3-8-fy",eC:0,7J:{},$aH:17(W){1a(W.$5U||(W.$5U=++M.eC))},9v:17(W){1a(M.7J[W]||(M.7J[W]={}))},$F:17(){},$1n:17(){1a 1n},$1r:17(){1a 1r},es:"dD-"+1o.6e(1o.6O()*1t a5().eo()),3o:17(W){1a(2D!=W)},aF:17(X,W){1a(2D!=X)?X:W},8X:17(W){1a!!(W)},1P:17(W){if(!M.3o(W)){1a 1n}if(W.$4G){1a W.$4G}if(!!W.5M){if(1==W.5M){1a"5Z"}if(3==W.5M){1a"ek"}}if(W.1I&&W.eK){1a"fb"}if(W.1I&&W.9N){1a"29"}if((W 5g 1j.eM||W 5g 1j.bC)&&W.57===M.3y){1a"3M"}if(W 5g 1j.69){1a"4b"}if(W 5g 1j.bC){1a"17"}if(W 5g 1j.5W){1a"1O"}if(M.1e.4K){if(M.3o(W.cd)){1a"1z"}}1k{if(W===1j.1z||W.57==1j.1u||W.57==1j.eb||W.57==1j.dJ||W.57==1j.fj||W.57==1j.fh){1a"1z"}}if(W 5g 1j.a5){1a"eP"}if(W 5g 1j.dd){1a"fe"}if(W===1j){1a"1j"}if(W===1m){1a"1m"}1a 93(W)},1X:17(ab,aa){if(!(ab 5g 1j.69)){ab=[ab]}if(!aa){1a ab[0]}1S(1c Z=0,X=ab.1I;Z<X;Z++){if(!M.3o(ab)){7G}1S(1c Y in aa){if(!eM.2w.41.2b(aa,Y)){7G}3x{ab[Z][Y]=aa[Y]}3R(W){}}}1a ab[0]},9U:17(aa,Z){if(!(aa 5g 1j.69)){aa=[aa]}1S(1c Y=0,W=aa.1I;Y<W;Y++){if(!M.3o(aa[Y])){7G}if(!aa[Y].2w){7G}1S(1c X in(Z||{})){if(!aa[Y].2w[X]){aa[Y].2w[X]=Z[X]}}}1a aa[0]},em:17(Y,X){if(!M.3o(Y)){1a Y}1S(1c W in(X||{})){if(!Y[W]){Y[W]=X[W]}}1a Y},$3x:17(){1S(1c X=0,W=29.1I;X<W;X++){3x{1a 29[X]()}3R(Y){}}1a 1h},$A:17(Y){if(!M.3o(Y)){1a M.$([])}if(Y.eL){1a M.$(Y.eL())}if(Y.eK){1c X=Y.1I||0,W=1t 69(X);5l(X--){W[X]=Y[X]}1a M.$(W)}1a M.$(69.2w.ao.2b(Y))},6q:17(){1a 1t a5().eo()},4a:17(aa){1c Y;4r(M.1P(aa)){1B"8O":Y={};1S(1c Z in aa){Y[Z]=M.4a(aa[Z])}1G;1B"4b":Y=[];1S(1c X=0,W=aa.1I;X<W;X++){Y[X]=M.4a(aa[X])}1G;1R:1a aa}1a M.$(Y)},$:17(Y){1c W=1r;if(!M.3o(Y)){1a 1h}if(Y.$aL){1a Y}4r(M.1P(Y)){1B"4b":Y=M.em(Y,M.1X(M.69,{$aL:M.$F}));Y.36=Y.ds;1a Y;1G;1B"1O":1c X=1m.cW(Y);if(M.3o(X)){1a M.$(X)}1a 1h;1G;1B"1j":1B"1m":M.$aH(Y);Y=M.1X(Y,M.3v);1G;1B"5Z":M.$aH(Y);Y=M.1X(Y,M.3Y);1G;1B"1z":Y=M.1X(Y,M.1u);1G;1B"ek":1B"17":1B"4b":1B"eP":1R:W=1n;1G}if(W){1a M.1X(Y,{$aL:M.$F})}1k{1a Y}},$1t:17(W,Y,X){1a M.$(M.cv.7L(W)).bK(Y||{}).1x(X||{})},76:17(X,Z,ad){1c aa,Y,ab,ac=[],W=-1;ad||(ad=M.es);aa=M.$(ad)||M.$1t("2l",{id:ad,1y:"9T/6M"}).1Z((1m.fO||1m.3H),"1H");Y=aa.f8||aa.eV;if("1O"!=M.1P(Z)){1S(1c ab in Z){ac.38(ab+":"+Z[ab])}Z=ac.6Y(";")}if(Y.eO){W=Y.eO(X+" {"+Z+"}",Y.fL.1I)}1k{W=Y.fP(X,Z)}1a W},fE:17(Z,W){1c Y,X;Y=M.$(Z);if("5Z"!==M.1P(Y)){1a}X=Y.f8||Y.eV;if(X.f2){X.f2(W)}1k{if(X.eY){X.eY(W)}}},fX:17(){1a"fd-fv-fq-fi-fo".4v(/[g7]/g,17(Y){1c X=1o.6O()*16|0,W=Y=="x"?X:(X&3|8);1a W.8p(16)}).9b()},6b:(17(){1c W;1a 17(X){if(!W){W=1m.7L("a")}W.3T("6K",X);1a("!!"+W.6K).4v("!!","")}})(),fY:17(Y){1c Z=0,W=Y.1I;1S(1c X=0;X<W;++X){Z=31*Z+Y.ex(X);Z%=fV}1a Z}};1c M=S;1c N=S.$;if(!1j.dG){1j.dG=S;1j.$dD=S.$}M.69={$4G:"4b",6a:17(Z,aa){1c W=13.1I;1S(1c X=13.1I,Y=(aa<0)?1o.1V(0,X+aa):aa||0;Y<X;Y++){if(13[Y]===Z){1a Y}}1a-1},5F:17(W,X){1a 13.6a(W,X)!=-1},ds:17(W,Z){1S(1c Y=0,X=13.1I;Y<X;Y++){if(Y in 13){W.2b(Z,13[Y],Y,13)}}},2V:17(W,ab){1c aa=[];1S(1c Z=0,X=13.1I;Z<X;Z++){if(Z in 13){1c Y=13[Z];if(W.2b(ab,13[Z],Z,13)){aa.38(Y)}}}1a aa},fJ:17(W,aa){1c Z=[];1S(1c Y=0,X=13.1I;Y<X;Y++){if(Y in 13){Z[Y]=W.2b(aa,13[Y],Y,13)}}1a Z}};M.9U(5W,{$4G:"1O",4X:17(){1a 13.4v(/^\\s+|\\s+$/g,"")},eq:17(W,X){1a(X||1n)?(13.8p()===W.8p()):(13.5u().8p()===W.5u().8p())},5A:17(){1a 13.4v(/-\\D/g,17(W){1a W.9g(1).9b()})},9Z:17(){1a 13.4v(/[A-Z]/g,17(W){1a("-"+W.9g(0).5u())})},fU:17(W){1a 5D(13,W||10)},fM:17(){1a 2F(13)},cS:17(){1a!13.4v(/1r/i,"").4X()},4F:17(X,W){W=W||"";1a(W+13+W).6a(W+X+W)>-1}});S.9U(bC,{$4G:"17",1E:17(){1c X=M.$A(29),W=13,Y=X.6Q();1a 17(){1a W.6i(Y||1h,X.5E(M.$A(29)))}},2E:17(){1c X=M.$A(29),W=13,Y=X.6Q();1a 17(Z){1a W.6i(Y||1h,M.$([Z||(M.1e.2n?1j.1z:1h)]).5E(X))}},2y:17(){1c X=M.$A(29),W=13,Y=X.6Q();1a 1j.4D(17(){1a W.6i(W,X)},Y||0)},cB:17(){1c X=M.$A(29),W=13;1a 17(){1a W.2y.6i(W,X)}},c7:17(){1c X=M.$A(29),W=13,Y=X.6Q();1a 1j.f6(17(){1a W.6i(W,X)},Y||0)}});1c T={},L=2H.fN.5u(),K=L.3s(/(3W|5K|4K|bF)\\/(\\d+\\.?\\d*)/i),P=L.3s(/(fQ|ap)\\/(\\d+\\.?\\d*)/i)||L.3s(/(eu|4l|8L|dV|6h|ap)\\/(\\d+\\.?\\d*)/i),R=L.3s(/4q\\/(\\d+\\.?\\d*)/i),G=1m.6k.2l;17 H(X){1c W=X.9g(0).9b()+X.ao(1);1a X in G||("er"+W)in G||("ev"+W)in G||("7D"+W)in G||("O"+W)in G}M.1e={2L:{fK:!!(1m.fD),fC:!!(1j.et),bl:!!(1m.ei),4Z:!!(1m.fF||1m.fG||1m.9K||1m.eN||1m.fI||1m.fH||1m.fR||1m.fS||1m.g2),cl:!!(1j.g1)&&!!(1j.g3)&&(1j.8K&&"g6"in 1t 8K),1Y:H("1Y"),2g:H("2g"),8V:H("8V"),ef:H("ef"),4Y:1n,eW:1n,8q:1n,75:(17(){1a 1m.g0.fZ("bU://bV.b1.b8/fB/fT/fW#f9","1.1")})()},cY:17(){1a"fa"in 1j||(1j.dY&&1m 5g dY)}(),3t:L.3s(/(6y|bb\\d+|fu).+|fp|fs\\/|fr|fw|fm|ft|fA|fc|fg|ip(dr|df|ad)|ff|hQ|hj |hi|hh|hf|3t.+dV|hg|6h m(hk|in)i|hp( ho)?|e9|p(hn|hd)\\/|h1|h2|h9|hq(4|6)0|g8|hr|hL\\.(1e|43)|hP|hN|hM (ce|e9)|hw|hs/)?1r:1n,7n:(K&&K[1])?K[1].5u():(1j.6h)?"bF":!!(1j.h0)?"4K":(2D!==1m.gp||1h!=1j.go)?"5K":(1h!==1j.gt||!2H.gx)?"3W":"gw",4q:(K&&K[2])?2F(K[2]):0,3B:(P&&P[1])?P[1].5u():"",7l:(P&&P[2])?2F(P[2]):0,8a:"",aw:"",4W:"",2n:0,4N:L.3s(/ip(?:ad|df|dr)/)?"8R":(L.3s(/(?:gv|6y)/)||2H.4N.3s(/gm|8Y|gl/i)||["gd"])[0].5u(),ej:1m.8U&&"dI"==1m.8U.5u(),f1:0,49:17(){1a(1m.8U&&"dI"==1m.8U.5u())?1m.3H:1m.6k},4Y:1j.4Y||1j.gc||1j.gb||1j.g9||1j.ge||2D,9s:1j.9s||1j.eU||1j.eU||1j.gf||1j.gk||1j.gj||2D,2i:1n,7p:17(){if(M.1e.2i){1a}1c Z,Y;M.1e.2i=1r;M.3H=M.$(1m.3H);M.8Y=M.$(1j);3x{1c X=M.$1t("2Y").1x({1f:2N,1g:2N,5d:"5O",2e:"5C",1H:-gi}).1Z(1m.3H);M.1e.f1=X.d8-X.cZ;X.2P()}3R(W){}3x{Z=M.$1t("2Y");Y=Z.2l;Y.eQ="eR:2d(a8://),2d(a8://),gg 2d(a8://)";M.1e.2L.eW=(/(2d\\s*\\(.*?){3}/).3e(Y.eR);Y=1h;Z=1h}3R(W){}if(!M.1e.7v){M.1e.7v=M.9Q("2g").9Z()}3x{Z=M.$1t("2Y");Z.2l.eQ=M.9Q("2V").9Z()+":5e(gh);";M.1e.2L.8q=!!Z.2l.1I&&(!M.1e.2n||M.1e.2n>9);Z=1h}3R(W){}if(!M.1e.2L.8q){M.$(1m.6k).1A("6E-gz-3p")}if(2D===1j.gS&&2D!==1j.gQ){T.2S="gO"}M.3v.2U.2b(M.$(1m),"9z")}};(17(){1c aa=[],Z,Y,X;17 W(){1a!!(29.9N.bT)}4r(M.1e.7n){1B"4K":if(!M.1e.4q){M.1e.4q=!!(1j.8K)?3:2}1G;1B"5K":M.1e.4q=(P&&P[2])?2F(P[2]):0;1G}M.1e[M.1e.7n]=1r;if(P&&"eu"===P[1]){M.1e.3B="4l"}if(!!1j.4l){M.1e.4l=1r}if(P&&"ap"===P[1]){M.1e.3B="6h";M.1e.6h=1r}if("8L"===M.1e.3B&&(R&&R[1])){M.1e.7l=2F(R[1])}if("6y"==M.1e.4N&&M.1e.3W&&(R&&R[1])){M.1e.6u=1r}Z=({5K:["-ew-","ev","ew"],3W:["-3W-","er","3W"],4K:["-7D-","7D","7D"],bF:["-o-","O","o"]})[M.1e.7n]||["","",""];M.1e.8a=Z[0];M.1e.aw=Z[1];M.1e.4W=Z[2];M.1e.2n=(!M.1e.4K)?2D:(1m.ep)?1m.ep:17(){1c ab=0;if(M.1e.ej){1a 5}4r(M.1e.4q){1B 2:ab=6;1G;1B 3:ab=7;1G}1a ab}();aa.38(M.1e.4N+"-3p");if(M.1e.3t){aa.38("3t-3p")}if(M.1e.6u){aa.38("6y-1e-3p")}if(M.1e.2n){M.1e.3B="ie";M.1e.7l=M.1e.2n;aa.38("ie"+M.1e.2n+"-3p");1S(Y=11;Y>M.1e.2n;Y--){aa.38("gY-ie"+Y+"-3p")}}if(M.1e.3W&&M.1e.4q<gX){M.1e.2L.4Z=1n}if(M.1e.4Y){M.1e.4Y.2b(1j,17(){M.1e.2L.4Y=1r})}if(M.1e.2L.75){aa.38("75-3p")}1k{aa.38("6E-75-3p")}X=(1m.6k.5L||"").3s(/\\S+/g)||[];1m.6k.5L=M.$(X).5E(aa).6Y(" ");if(M.1e.2n&&M.1e.2n<9){1m.7L("8c");1m.7L("dE")}})();(17(){M.1e.4Z={9w:M.1e.2L.4Z,5p:17(){1a!!(1m.gW||1m[M.1e.4W+"gV"]||1m.4Z||1m.gN||1m[M.1e.4W+"gM"])},bH:17(W,X){X||(X={});if(13.9w){M.$(1m).1C(13.aT,13.ez=17(Y){if(13.5p()){X.bE&&X.bE()}1k{M.$(1m).1N(13.aT,13.ez);X.bB&&X.bB()}}.2E(13));M.$(1m).1C(13.b2,13.5S=17(Y){X.8y&&X.8y();M.$(1m).1N(13.b2,13.5S)}.2E(13));(W[M.1e.4W+"gE"]||W[M.1e.4W+"gD"]||W.gC||17(){}).2b(W)}1k{if(X.8y){X.8y()}}},dL:(1m.9K||1m.eN||1m[M.1e.4W+"gB"]||1m[M.1e.4W+"gF"]||17(){}).1E(1m),aT:1m.eE?"gG":(1m.9K?"":M.1e.4W)+"gK",b2:1m.eE?"gH":(1m.9K?"":M.1e.4W)+"gI",gJ:M.1e.4W,gL:1h}})();1c V=/\\S+/g,J=/^(3G(c2|c0|bY|d9)gA)|((78|7X)(c2|c0|bY|d9))$/,O={"gU":("2D"===93(G.cO))?"gT":"cO"},Q={dH:1r,gP:1r,2r:1r,dF:1r,1l:1r},I=(1j.cP)?17(Y,W){1c X=1j.cP(Y,1h);1a X?X.gR(W)||X[W]:1h}:17(Z,X){1c Y=Z.gy,W=1h;W=Y?Y[X]:1h;if(1h==W&&Z.2l&&Z.2l[X]){W=Z.2l[X]}1a W};17 U(Y){1c W,X;X=(M.1e.3W&&"2V"==Y)?1n:(Y in G);if(!X){W=M.1e.aw+Y.9g(0).9b()+Y.ao(1);if(W in G){1a W}}1a Y}M.9Q=U;M.3Y={cG:17(W){1a!(W||"").4F(" ")&&(13.5L||"").4F(W," ")},1A:17(aa){1c X=(13.5L||"").3s(V)||[],Z=(aa||"").3s(V)||[],W=Z.1I,Y=0;1S(;Y<W;Y++){if(!M.$(X).5F(Z[Y])){X.38(Z[Y])}}13.5L=X.6Y(" ");1a 13},1T:17(ab){1c X=(13.5L||"").3s(V)||[],aa=(ab||"").3s(V)||[],W=aa.1I,Z=0,Y;1S(;Z<W;Z++){if((Y=M.$(X).6a(aa[Z]))>-1){X.9X(Y,1)}}13.5L=ab?X.6Y(" "):"";1a 13},ga:17(W){1a 13.cG(W)?13.1T(W):13.1A(W)},3K:17(X){1c Y=X.5A(),W=1h;X=O[Y]||(O[Y]=U(Y));W=I(13,X);if("2t"===W){W=1h}if(1h!==W){if("2r"==X){1a M.3o(W)?2F(W):1}if(J.3e(X)){W=5D(W,10)?W:"5Q"}}1a W},3F:17(X,W){1c Z=X.5A();3x{if("2r"==X){13.cH(W);1a 13}X=O[Z]||(O[Z]=U(Z));13.2l[X]=W+(("63"==M.1P(W)&&!Q[Z])?"2v":"")}3R(Y){}1a 13},1x:17(X){1S(1c W in X){13.3F(W,X[W])}1a 13},gu:17(){1c W={};M.$A(29).36(17(X){W[X]=13.3K(X)},13);1a W},cH:17(Y,W){1c X;W=W||1n;13.2l.2r=Y;Y=5D(2F(Y)*2N);if(W){if(0===Y){if("3f"!=13.2l.5a){13.2l.5a="3f"}}1k{if("6n"!=13.2l.5a){13.2l.5a="6n"}}}if(M.1e.2n&&M.1e.2n<9){if(!9x(Y)){if(!~13.2l.2V.6a("bw")){13.2l.2V+=" cK:cT.d4.bw(8B="+Y+")"}1k{13.2l.2V=13.2l.2V.4v(/8B=\\d*/i,"8B="+Y)}}1k{13.2l.2V=13.2l.2V.4v(/cK:cT.d4.bw\\(8B=\\d*\\)/i,"").4X();if(""===13.2l.2V){13.2l.5B("2V")}}}1a 13},bK:17(W){1S(1c X in W){if("3M"===X){13.1A(""+W[X])}1k{13.3T(X,""+W[X])}}1a 13},4i:17(){1a 13.1x({7A:"3k",5a:"3f"})},5q:17(){1a 13.1x({7A:"",5a:"6n"})},1F:17(){1a{1f:13.d8,1g:13.gs}},8u:17(X){1c W=13.1F();W.1f-=(2F(13.3K("3G-1M-1f")||0)+2F(13.3K("3G-2R-1f")||0));W.1g-=(2F(13.3K("3G-1H-1f")||0)+2F(13.3K("3G-2Q-1f")||0));if(!X){W.1f-=(2F(13.3K("78-1M")||0)+2F(13.3K("78-2R")||0));W.1g-=(2F(13.3K("78-1H")||0)+2F(13.3K("78-2Q")||0))}1a W},6X:17(){1a{1H:13.7W,1M:13.80}},gn:17(){1c W=13,X={1H:0,1M:0};do{X.1M+=W.80||0;X.1H+=W.7W||0;W=W.4H}5l(W);1a X},8b:17(){1c aa=13,X=0,Z=0;if(M.3o(1m.6k.7I)){1c W=13.7I(),Y=M.$(1m).6X(),ab=M.1e.49();1a{1H:W.1H+Y.y-ab.gq,1M:W.1M+Y.x-ab.gr}}do{X+=aa.gZ||0;Z+=aa.hz||0;aa=aa.hA}5l(aa&&!(/^(?:3H|hB)$/i).3e(aa.a9));1a{1H:Z,1M:X}},7S:17(){1c X=13.8b();1c W=13.1F();1a{1H:X.1H,2Q:X.1H+W.1g,1M:X.1M,2R:X.1M+W.1f}},5k:17(X){3x{13.hC=X}3R(W){13.hy=X}1a 13},2P:17(){1a(13.4H)?13.4H.ak(13):13},5i:17(){M.$A(13.hx).36(17(W){if(3==W.5M||8==W.5M){1a}M.$(W).5i()});13.2P();13.bo();if(13.$5U){M.7J[13.$5U]=1h;4P M.7J[13.$5U]}1a 1h},3n:17(Y,X){X=X||"2Q";1c W=13.4h;("1H"==X&&W)?13.ht(Y,W):13.b5(Y);1a 13},1Z:17(Y,X){1c W=M.$(Y).3n(13,X);1a 13},eg:17(W){13.3n(W.4H.b0(13,W));1a 13},9O:17(W){if("5Z"!==M.1P("1O"==M.1P(W)?W=1m.cW(W):W)){1a 1n}1a(13==W)?1n:(13.5F&&!(M.1e.d0))?(13.5F(W)):(13.cX)?!!(13.cX(W)&16):M.$A(13.7T(W.a9)).5F(W)}};M.3Y.hu=M.3Y.3K;M.3Y.hv=M.3Y.1x;if(!1j.3Y){1j.3Y=M.$F;if(M.1e.7n.3W){1j.1m.7L("hD")}1j.3Y.2w=(M.1e.7n.3W)?1j["[[hE.2w]]"]:{}}M.9U(1j.3Y,{$4G:"5Z"});M.3v={1F:17(){if(M.1e.cY||M.1e.hO||M.1e.d0){1a{1f:1j.5f,1g:1j.4J}}1a{1f:M.1e.49().cZ,1g:M.1e.49().hK}},6X:17(){1a{x:1j.hG||M.1e.49().80,y:1j.hF||M.1e.49().7W}},hH:17(){1c W=13.1F();1a{1f:1o.1V(M.1e.49().hI,W.1f),1g:1o.1V(M.1e.49().hJ,W.1g)}}};M.1X(1m,{$4G:"1m"});M.1X(1j,{$4G:"1j"});M.1X([M.3Y,M.3v],{26:17(Z,X){1c W=M.9v(13.$5U),Y=W[Z];if(2D!==X&&2D===Y){Y=W[Z]=X}1a(M.3o(Y)?Y:1h)},34:17(Y,X){1c W=M.9v(13.$5U);W[Y]=X;1a 13},2X:17(X){1c W=M.9v(13.$5U);4P W[X];1a 13}});if(!(1j.aS&&1j.aS.2w&&1j.aS.2w.bj)){M.1X([M.3Y,M.3v],{bj:17(W){1a M.$A(13.9p("*")).2V(17(Y){3x{1a(1==Y.5M&&Y.5L.4F(W," "))}3R(X){}})}})}M.1X([M.3Y,M.3v],{9u:17(){1a 13.bj(29[0])},7T:17(){1a 13.9p(29[0])}});if(M.1e.4Z.9w&&!1m.cD){M.3Y.cD=17(){M.1e.4Z.bH(13)}}M.1u={$4G:"1z",62:M.$1n,2a:17(){1a 13.5c().3z()},5c:17(){if(13.cC){13.cC()}1k{13.cd=1r}1a 13},3z:17(){if(13.ch){13.ch()}1k{13.h8=1n}1a 13},4I:17(){13.62=M.$1r;1a 13},7K:17(){1c X,W;X=((/3A/i).3e(13.1y))?13.2C[0]:13;1a(!M.3o(X))?{x:0,y:0}:{x:X.2O,y:X.2K}},6j:17(){1c X,W;X=((/3A/i).3e(13.1y))?13.2C[0]:13;1a(!M.3o(X))?{x:0,y:0}:{x:X.5n||X.2O+M.1e.49().80,y:X.5o||X.2K+M.1e.49().7W}},bf:17(){1c W=13.4e||13.ha;5l(W&&3==W.5M){W=W.4H}1a W},7Y:17(){1c X=1h;4r(13.1y){1B"7x":1B"hb":1B"hc":X=13.9D||13.h7;1G;1B"8k":1B"ba":1B"ee":X=13.9D||13.h6;1G;1R:1a X}3x{5l(X&&3==X.5M){X=X.4H}}3R(W){X=1h}1a X},6D:17(){if(!13.cj&&13.2o!==2D){1a(13.2o&1?1:(13.2o&2?3:(13.2o&4?2:0)))}1a 13.cj},h3:17(){1a(13.2k&&("3A"===13.2k||13.2k===13.59))||(/3A/i).3e(13.1y)},h4:17(){1a 13.2k?(("3A"===13.2k||13.59===13.2k)&&13.9Y):1===13.2C.1I&&(13.6d.1I?13.6d[0].3D==13.2C[0].3D:1r)}};M.bd="ci";M.bk="h5";M.9q="";if(!1m.ci){M.bd="he";M.bk="hm";M.9q="8f"}M.1u.1w={1y:"",x:1h,y:1h,2I:1h,2o:1h,4e:1h,9D:1h,$4G:"1z.4k",62:M.$1n,5G:M.$([]),4d:17(W){1c X=W;13.5G.38(X)},2a:17(){1a 13.5c().3z()},5c:17(){13.5G.36(17(X){3x{X.5c()}3R(W){}});1a 13},3z:17(){13.5G.36(17(X){3x{X.3z()}3R(W){}});1a 13},4I:17(){13.62=M.$1r;1a 13},7K:17(){1a{x:13.2O,y:13.2K}},6j:17(){1a{x:13.x,y:13.y}},bf:17(){1a 13.4e},7Y:17(){1a 13.9D},6D:17(){1a 13.2o},e3:17(){1a 13.5G.1I>0?13.5G[0].bf():2D}};M.1X([M.3Y,M.3v],{1C:17(Y,aa,ab,ae){1c ad,W,Z,ac,X;if("1O"==M.1P(Y)){X=Y.7H(" ");if(X.1I>1){Y=X}}if(M.1P(Y)=="4b"){M.$(Y).36(13.1C.2E(13,aa,ab,ae));1a 13}if(!Y||!aa||M.1P(Y)!="1O"||M.1P(aa)!="17"){1a 13}if(Y=="9z"&&M.1e.2i){aa.2b(13);1a 13}Y=T[Y]||Y;ab=5D(ab||50);if(!aa.$9C){aa.$9C=1o.6e(1o.6O()*M.6q())}ad=M.3v.26.2b(13,"8l",{});W=ad[Y];if(!W){ad[Y]=W=M.$([]);Z=13;if(M.1u.1w[Y]){M.1u.1w[Y].1K.5m.2b(13,ae)}1k{W.3j=17(af){af=M.1X(af||1j.e,{$4G:"1z"});M.3v.2U.2b(Z,Y,M.$(af))};13[M.bd](M.9q+Y,W.3j,1n)}}ac={1y:Y,fn:aa,bc:ab,cc:aa.$9C};W.38(ac);W.hl(17(ag,af){1a ag.bc-af.bc});1a 13},1N:17(ac){1c aa=M.3v.26.2b(13,"8l",{}),Y,W,X,ad,ab,Z;ab=29.1I>1?29[1]:-2N;if("1O"==M.1P(ac)){Z=ac.7H(" ");if(Z.1I>1){ac=Z}}if(M.1P(ac)=="4b"){M.$(ac).36(13.1N.2E(13,ab));1a 13}ac=T[ac]||ac;if(!ac||M.1P(ac)!="1O"||!aa||!aa[ac]){1a 13}Y=aa[ac]||[];1S(X=0;X<Y.1I;X++){W=Y[X];if(-2N==ab||!!ab&&ab.$9C===W.cc){ad=Y.9X(X--,1)}}if(0===Y.1I){if(M.1u.1w[ac]){M.1u.1w[ac].1K.2P.2b(13)}1k{13[M.bk](M.9q+ac,Y.3j,1n)}4P aa[ac]}1a 13},2U:17(aa,ac){1c Z=M.3v.26.2b(13,"8l",{}),Y,W,X;aa=T[aa]||aa;if(!aa||M.1P(aa)!="1O"||!Z||!Z[aa]){1a 13}3x{ac=M.1X(ac||{},{1y:aa})}3R(ab){}if(2D===ac.2I){ac.2I=M.6q()}Y=Z[aa]||[];1S(X=0;X<Y.1I&&!(ac.62&&ac.62());X++){Y[X].fn.2b(13,ac)}},bt:17(X,W){1c aa=("9z"==X)?1n:1r,Z=13,Y;X=T[X]||X;if(!aa){M.3v.2U.2b(13,X);1a 13}if(Z===1m&&1m.9M&&!Z.aG){Z=1m.6k}if(1m.9M){Y=1m.9M(X);Y.5T(W,1r,1r)}1k{Y=1m.fz();Y.9R=X}if(1m.9M){Z.aG(Y)}1k{Z.fl("8f"+W,Y)}1a Y},bo:17(){1c X=M.3v.26.2b(13,"8l");if(!X){1a 13}1S(1c W in X){M.3v.1N.2b(13,W)}M.3v.2X.2b(13,"8l");1a 13}});(17(W){if("8j"===1m.8m){1a W.1e.7p.2y(1)}if(W.1e.3W&&W.1e.4q<fk){(17(){(W.$(["2f","8j"]).5F(1m.8m))?W.1e.7p():29.9N.2y(50)})()}1k{if(W.1e.4K&&W.1e.2n<9&&1j==1H){(17(){(W.$3x(17(){W.1e.49().g5("1M");1a 1r}))?W.1e.7p():29.9N.2y(50)})()}1k{W.3v.1C.2b(W.$(1m),"g4",W.1e.7p);W.3v.1C.2b(W.$(1j),"5X",W.1e.7p)}}})(S);M.3y=17(){1c aa=1h,X=M.$A(29);if("3M"==M.1P(X[0])){aa=X.6Q()}1c W=17(){1S(1c ad in 13){13[ad]=M.4a(13[ad])}if(13.57.$3I){13.$3I={};1c af=13.57.$3I;1S(1c ae in af){1c ac=af[ae];4r(M.1P(ac)){1B"17":13.$3I[ae]=M.3y.cy(13,ac);1G;1B"8O":13.$3I[ae]=M.4a(ac);1G;1B"4b":13.$3I[ae]=M.4a(ac);1G}}}1c ab=(13.3J)?13.3J.6i(13,29):13;4P 13.bT;1a ab};if(!W.2w.3J){W.2w.3J=M.$F}if(aa){1c Z=17(){};Z.2w=aa.2w;W.2w=1t Z;W.$3I={};1S(1c Y in aa.2w){W.$3I[Y]=aa.2w[Y]}}1k{W.$3I=1h}W.57=M.3y;W.2w.57=W;M.1X(W.2w,X[0]);M.1X(W,{$4G:"3M"});1a W};S.3y.cy=17(W,X){1a 17(){1c Z=13.bT;1c Y=X.6i(W,29);1a Y}};(17(Z){1c Y=Z.$;1c W=5,X=aZ;Z.1u.1w.1Q=1t Z.3y(Z.1X(Z.1u.1w,{1y:"1Q",3J:17(ac,ab){1c aa=ab.6j();13.x=aa.x;13.y=aa.y;13.2O=ab.2O;13.2K=ab.2K;13.2I=ab.2I;13.2o=ab.6D();13.4e=ac;13.4d(ab)}}));Z.1u.1w.1Q.1K={1v:{7e:X,2o:1},5m:17(aa){13.34("1z:1Q:1v",Z.1X(Z.4a(Z.1u.1w.1Q.1K.1v),aa||{}));13.1C("6B",Z.1u.1w.1Q.1K.3j,1);13.1C("5Y",Z.1u.1w.1Q.1K.3j,1);13.1C("2W",Z.1u.1w.1Q.1K.bz,1);if(Z.1e.4K&&Z.1e.2n<9){13.1C("9a",Z.1u.1w.1Q.1K.3j,1)}},2P:17(){13.1N("6B",Z.1u.1w.1Q.1K.3j);13.1N("5Y",Z.1u.1w.1Q.1K.3j);13.1N("2W",Z.1u.1w.1Q.1K.bz);if(Z.1e.4K&&Z.1e.2n<9){13.1N("9a",Z.1u.1w.1Q.1K.3j)}},bz:17(aa){aa.3z()},3j:17(ad){1c ac,aa,ab;aa=13.26("1z:1Q:1v");if(ad.1y!="9a"&&ad.6D()!=aa.2o){1a}if(13.26("1z:1Q:ax")){13.2X("1z:1Q:ax");1a}if("6B"==ad.1y){ac=1t Z.1u.1w.1Q(13,ad);13.34("1z:1Q:9y",ac)}1k{if("5Y"==ad.1y){ac=13.26("1z:1Q:9y");if(!ac){1a}ab=ad.6j();13.2X("1z:1Q:9y");ac.4d(ad);if(ad.2I-ac.2I<=aa.7e&&1o.8z(1o.4z(ab.x-ac.x,2)+1o.4z(ab.y-ac.y,2))<=W){13.2U("1Q",ac)}1m.2U("5Y",ad)}1k{if(ad.1y=="9a"){ac=1t Z.1u.1w.1Q(13,ad);13.2U("1Q",ac)}}}}}})(S);(17(X){1c W=X.$;X.1u.1w.2J=1t X.3y(X.1X(X.1u.1w,{1y:"2J",2m:"3E",6l:1n,3J:17(ab,aa,Z){1c Y=aa.6j();13.x=Y.x;13.y=Y.y;13.2O=aa.2O;13.2K=aa.2K;13.2I=aa.2I;13.2o=aa.6D();13.4e=ab;13.4d(aa);13.2m=Z}}));X.1u.1w.2J.1K={5m:17(){1c Z=X.1u.1w.2J.1K.cu.2E(13),Y=X.1u.1w.2J.1K.92.2E(13);13.1C("6B",X.1u.1w.2J.1K.bG,1);13.1C("5Y",X.1u.1w.2J.1K.92,1);1m.1C("7E",Z,1);1m.1C("5Y",Y,1);13.34("1z:2J:4t:1m:5s",Z);13.34("1z:2J:4t:1m:7j",Y)},2P:17(){13.1N("6B",X.1u.1w.2J.1K.bG);13.1N("5Y",X.1u.1w.2J.1K.92);W(1m).1N("7E",13.26("1z:2J:4t:1m:5s")||X.$F);W(1m).1N("5Y",13.26("1z:2J:4t:1m:7j")||X.$F);13.2X("1z:2J:4t:1m:5s");13.2X("1z:2J:4t:1m:7j")},bG:17(Z){1c Y;if(1!=Z.6D()){1a}Z.3z();Y=1t X.1u.1w.2J(13,Z,"3E");13.34("1z:2J:3E",Y)},92:17(Z){1c Y;Y=13.26("1z:2J:3E");if(!Y){1a}Z.3z();Y=1t X.1u.1w.2J(13,Z,"9I");13.2X("1z:2J:3E");13.2U("2J",Y)},cu:17(Z){1c Y;Y=13.26("1z:2J:3E");if(!Y){1a}Z.3z();if(!Y.6l){Y.6l=1r;13.2U("2J",Y)}Y=1t X.1u.1w.2J(13,Z,"cs");13.2U("2J",Y)}}})(S);(17(X){1c W=X.$;X.1u.1w.4f=1t X.3y(X.1X(X.1u.1w,{1y:"4f",7d:1n,73:1h,3J:17(aa,Z){1c Y=Z.6j();13.x=Y.x;13.y=Y.y;13.2O=Z.2O;13.2K=Z.2K;13.2I=Z.2I;13.2o=Z.6D();13.4e=aa;13.4d(Z)}}));X.1u.1w.4f.1K={1v:{7e:7s},5m:17(Y){13.34("1z:4f:1v",X.1X(X.4a(X.1u.1w.4f.1K.1v),Y||{}));13.1C("1Q",X.1u.1w.4f.1K.3j,1)},2P:17(){13.1N("1Q",X.1u.1w.4f.1K.3j)},3j:17(aa){1c Z,Y;Z=13.26("1z:4f:1z");Y=13.26("1z:4f:1v");if(!Z){Z=1t X.1u.1w.4f(13,aa);Z.73=4D(17(){Z.7d=1r;aa.62=X.$1n;13.2U("1Q",aa);13.2X("1z:4f:1z")}.1E(13),Y.7e+10);13.34("1z:4f:1z",Z);aa.4I()}1k{3P(Z.73);13.2X("1z:4f:1z");if(!Z.7d){Z.4d(aa);aa.4I().2a();13.2U("4f",Z)}1k{}}}}})(S);(17(ac){1c ab=ac.$;17 W(ad){1a ad.2k?(("3A"===ad.2k||ad.59===ad.2k)&&ad.9Y):1===ad.2C.1I&&(ad.6d.1I?ad.6d[0].3D==ad.2C[0].3D:1r)}17 Y(ad){if(ad.2k){1a("3A"===ad.2k||ad.59===ad.2k)?ad.9J:1h}1k{1a ad.2C[0].3D}}17 Z(ad){if(ad.2k){1a("3A"===ad.2k||ad.59===ad.2k)?ad:1h}1k{1a ad.2C[0]}}ac.1u.1w.21=1t ac.3y(ac.1X(ac.1u.1w,{1y:"21",id:1h,3J:17(ae,ad){1c af=Z(ad);13.id=af.9J||af.3D;13.x=af.5n;13.y=af.5o;13.5n=af.5n;13.5o=af.5o;13.2O=af.2O;13.2K=af.2K;13.2I=ad.2I;13.2o=0;13.4e=ae;13.4d(ad)}}));1c X=10,aa=7s;ac.1u.1w.21.1K={5m:17(ad){13.1C(["51",1j.2H.3b?"7Q":"7R"],ac.1u.1w.21.1K.72,1);13.1C(["5R",1j.2H.3b?"6o":"6v"],ac.1u.1w.21.1K.6T,1);13.1C("2W",ac.1u.1w.21.1K.az,1)},2P:17(){13.1N(["51",1j.2H.3b?"7Q":"7R"],ac.1u.1w.21.1K.72);13.1N(["5R",1j.2H.3b?"6o":"6v"],ac.1u.1w.21.1K.6T);13.1N("2W",ac.1u.1w.21.1K.az)},az:17(ad){ad.3z()},72:17(ad){if(!W(ad)){13.2X("1z:21:1z");1a}13.34("1z:21:1z",1t ac.1u.1w.21(13,ad));13.34("1z:1Q:ax",1r)},6T:17(ag){1c ae=ac.6q(),af=13.26("1z:21:1z"),ad=13.26("1z:21:1v");if(!af||!W(ag)){1a}13.2X("1z:21:1z");if(af.id==Y(ag)&&ag.2I-af.2I<=aa&&1o.8z(1o.4z(Z(ag).5n-af.x,2)+1o.4z(Z(ag).5o-af.y,2))<=X){13.2X("1z:1Q:9y");ag.2a();af.4d(ag);13.2U("21",af)}}}})(S);M.1u.1w.3q=1t M.3y(M.1X(M.1u.1w,{1y:"3q",7d:1n,73:1h,3J:17(X,W){13.x=W.x;13.y=W.y;13.2O=W.2O;13.2K=W.2K;13.2I=W.2I;13.2o=0;13.4e=X;13.4d(W)}}));M.1u.1w.3q.1K={1v:{7e:aZ},5m:17(W){13.34("1z:3q:1v",M.1X(M.4a(M.1u.1w.3q.1K.1v),W||{}));13.1C("21",M.1u.1w.3q.1K.3j,1)},2P:17(){13.1N("21",M.1u.1w.3q.1K.3j)},3j:17(Y){1c X,W;X=13.26("1z:3q:1z");W=13.26("1z:3q:1v");if(!X){X=1t M.1u.1w.3q(13,Y);X.73=4D(17(){X.7d=1r;Y.62=M.$1n;13.2U("21",Y)}.1E(13),W.7e+10);13.34("1z:3q:1z",X);Y.4I()}1k{3P(X.73);13.2X("1z:3q:1z");if(!X.7d){X.4d(Y);Y.4I().2a();13.2U("3q",X)}1k{}}}};(17(ab){1c aa=ab.$;17 W(ac){1a ac.2k?(("3A"===ac.2k||ac.59===ac.2k)&&ac.9Y):1===ac.2C.1I&&(ac.6d.1I?ac.6d[0].3D==ac.2C[0].3D:1r)}17 Y(ac){if(ac.2k){1a("3A"===ac.2k||ac.59===ac.2k)?ac.9J:1h}1k{1a ac.2C[0].3D}}17 Z(ac){if(ac.2k){1a("3A"===ac.2k||ac.59===ac.2k)?ac:1h}1k{1a ac.2C[0]}}1c X=10;ab.1u.1w.2p=1t ab.3y(ab.1X(ab.1u.1w,{1y:"2p",2m:"3E",id:1h,6l:1n,3J:17(ae,ad,ac){1c af=Z(ad);13.id=af.9J||af.3D;13.2O=af.2O;13.2K=af.2K;13.5n=af.5n;13.5o=af.5o;13.x=af.5n;13.y=af.5o;13.2I=ad.2I;13.2o=0;13.4e=ae;13.4d(ad);13.2m=ac}}));ab.1u.1w.2p.1K={5m:17(){1c ad=ab.1u.1w.2p.1K.9G.1E(13),ac=ab.1u.1w.2p.1K.6T.1E(13);13.1C(["51",1j.2H.3b?"7Q":"7R"],ab.1u.1w.2p.1K.72,1);13.1C(["5R",1j.2H.3b?"6o":"6v"],ab.1u.1w.2p.1K.6T,1);13.1C(["7N",1j.2H.3b?"6r":"7h"],ab.1u.1w.2p.1K.9G,1);13.34("1z:2p:4t:1m:5s",ad);13.34("1z:2p:4t:1m:7j",ac);aa(1m).1C(1j.2H.3b?"6r":"7h",ad,1);aa(1m).1C(1j.2H.3b?"6o":"6v",ac,1)},2P:17(){13.1N(["51",1j.2H.3b?"7Q":"7R"],ab.1u.1w.2p.1K.72);13.1N(["5R",1j.2H.3b?"6o":"6v"],ab.1u.1w.2p.1K.6T);13.1N(["7N",1j.2H.3b?"6r":"7h"],ab.1u.1w.2p.1K.9G);aa(1m).1N(1j.2H.3b?"6r":"7h",13.26("1z:2p:4t:1m:5s")||ab.$F,1);aa(1m).1N(1j.2H.3b?"6o":"6v",13.26("1z:2p:4t:1m:7j")||ab.$F,1);13.2X("1z:2p:4t:1m:5s");13.2X("1z:2p:4t:1m:7j")},72:17(ad){1c ac;if(!W(ad)){1a}ac=1t ab.1u.1w.2p(13,ad,"3E");13.34("1z:2p:3E",ac)},6T:17(ad){1c ac;ac=13.26("1z:2p:3E");if(!ac||!ac.6l||ac.id!=Y(ad)){1a}ac=1t ab.1u.1w.2p(13,ad,"9I");13.2X("1z:2p:3E");13.2U("2p",ac)},9G:17(ad){1c ac;ac=13.26("1z:2p:3E");if(!ac||!W(ad)){1a}if(ac.id!=Y(ad)){13.2X("1z:2p:3E");1a}if(!ac.6l&&1o.8z(1o.4z(Z(ad).5n-ac.x,2)+1o.4z(Z(ad).5o-ac.y,2))>X){ac.6l=1r;13.2U("2p",ac)}if(!ac.6l){1a}ac=1t ab.1u.1w.2p(13,ad,"cs");13.2U("2p",ac)}}})(S);M.1u.1w.3Z=1t M.3y(M.1X(M.1u.1w,{1y:"3Z",4c:1,a7:1,cq:1,2m:"iH",3J:17(X,W){13.2I=W.2I;13.2o=0;13.4e=X;13.x=W.4o[0].2O+(W.4o[1].2O-W.4o[0].2O)/2;13.y=W.4o[0].2K+(W.4o[1].2K-W.4o[0].2K)/2;13.ct=1o.8z(1o.4z(W.4o[0].2O-W.4o[1].2O,2)+1o.4z(W.4o[0].2K-W.4o[1].2K,2));13.4d(W)},40:17(W){1c X;13.2m="jW";if(W.2C[0].3D!=13.5G[0].4o[0].3D||W.2C[1].3D!=13.5G[0].4o[1].3D){1a}X=1o.8z(1o.4z(W.2C[0].2O-W.2C[1].2O,2)+1o.4z(W.2C[0].2K-W.2C[1].2K,2));13.a7=13.4c;13.4c=X/13.ct;13.cq=13.4c/13.a7;13.x=W.2C[0].2O+(W.2C[1].2O-W.2C[0].2O)/2;13.y=W.2C[0].2K+(W.2C[1].2K-W.2C[0].2K)/2;13.4d(W)}}));M.1u.1w.3Z.1K={5m:17(){13.1C("51",M.1u.1w.3Z.1K.a1,1);13.1C("5R",M.1u.1w.3Z.1K.aJ,1);13.1C("7N",M.1u.1w.3Z.1K.aD,1)},2P:17(){13.1N("51",M.1u.1w.3Z.1K.a1);13.1N("5R",M.1u.1w.3Z.1K.aJ);13.1N("7N",M.1u.1w.3Z.1K.aD)},a1:17(X){1c W;if(X.4o.1I!=2){1a}X.3z();W=1t M.1u.1w.3Z(13,X);13.34("1z:3Z:1z",W)},aJ:17(X){1c W;W=13.26("1z:3Z:1z");if(!W){1a}X.3z();13.2X("1z:3Z:1z")},aD:17(X){1c W;W=13.26("1z:3Z:1z");if(!W){1a}X.3z();W.40(X);13.2U("3Z",W)}};(17(ab){1c Z=ab.$;ab.1u.1w.4x=1t ab.3y(ab.1X(ab.1u.1w,{1y:"4x",3J:17(ah,ag,aj,ad,ac,ai,ae){1c af=ag.6j();13.x=af.x;13.y=af.y;13.2I=ag.2I;13.4e=ah;13.jX=aj||0;13.as=ad||0;13.7V=ac||0;13.jY=ai||0;13.jV=ae||0;13.bD=ag.bD||0;13.aX=1n;13.4d(ag)}}));1c aa,X;17 W(){aa=1h}17 Y(ac,ad){1a(ac>50)||(1===ad&&!("8Y"==ab.1e.4N&&ac<1))||(0===ac%12)||(0==ac%4.jU)}ab.1u.1w.4x.1K={9R:"jQ"in 1m||ab.1e.2n>8?"jR":"jS",5m:17(){13.1C(ab.1u.1w.4x.1K.9R,ab.1u.1w.4x.1K.3j,1)},2P:17(){13.1N(ab.1u.1w.4x.1K.9R,ab.1u.1w.4x.1K.3j,1)},3j:17(ah){1c ai=0,af=0,ad=0,ac=0,ag,ae;if(ah.cp){ad=ah.cp*-1}if(ah.cm!==2D){ad=ah.cm}if(ah.cn!==2D){ad=ah.cn}if(ah.co!==2D){af=ah.co*-1}if(ah.7V){ad=-1*ah.7V}if(ah.as){af=ah.as}if(0===ad&&0===af){1a}ai=0===ad?af:ad;ac=1o.1V(1o.3w(ad),1o.3w(af));if(!aa||ac<aa){aa=ac}ag=ai>0?"6e":"3N";ai=1o[ag](ai/aa);af=1o[ag](af/aa);ad=1o[ag](ad/aa);if(X){3P(X)}X=4D(W,7s);ae=1t ab.1u.1w.4x(13,ah,ai,af,ad,0,aa);ae.aX=Y(aa,ah.bD||0);13.2U("4x",ae)}}})(S);M.8Y=M.$(1j);M.cv=M.$(1m);1a S})();(17(I){if(!I){67"6I 6H 6G"}1c H=I.$;1c G=1j.jT||1j.jZ||1h;w.a6=1t I.3y({24:1h,2i:1n,1v:{9j:I.$F,6c:I.$F,by:I.$F,5S:I.$F,7a:I.$F,cw:I.$F,9P:1n,cA:1r},1D:1h,8i:1h,bu:0,7k:{9j:17(J){if(J.4e&&(7s===J.4e.9W||cx===J.4e.9W)&&J.k0){13.1v.9j.1E(1h,(J.2f-(13.1v.cA?13.bu:0))/J.k7).2y(1);13.bu=J.2f}},6c:17(J){if(J){H(J).2a()}13.8h();if(13.2i){1a}13.2i=1r;13.81();!13.1v.9P&&13.1v.9j.1E(1h,1).2y(1);13.1v.6c.1E(1h,13).2y(1);13.1v.7a.1E(1h,13).2y(1)},by:17(J){if(J){H(J).2a()}13.8h();13.2i=1n;13.81();13.1v.by.1E(1h,13).2y(1);13.1v.7a.1E(1h,13).2y(1)},5S:17(J){if(J){H(J).2a()}13.8h();13.2i=1n;13.81();13.1v.5S.1E(1h,13).2y(1);13.1v.7a.1E(1h,13).2y(1)}},9L:17(){H(["5X","bM","cz"]).36(17(J){13.24.1C(J,13.7k["8f"+J].2E(13).cB(1))},13)},8h:17(){if(13.8i){3x{3P(13.8i)}3R(J){}13.8i=1h}H(["5X","bM","cz"]).36(17(K){13.24.1N(K)},13)},81:17(){13.1F();if(13.24.26("1t")){1c J=13.24.4H;13.24.2P().2X("1t").1x({2e:"k8",1H:"2t"});J.5i()}},ck:17(K){1c L=1t 8K(),J;H(["bM","k9"]).36(17(M){L["8f"+M]=H(17(N){13.7k["8f"+M].2b(13,N)}).1E(13)},13);L.5S=H(17(){13.1v.cw.1E(1h,13).2y(1);13.1v.9P=1n;13.9L();13.24.1U=K}).1E(13);L.6c=H(17(){if(7s!==L.9W&&cx!==L.9W){13.7k.5S.2b(13);1a}J=L.k6;13.9L();if(G&&!I.1e.4K&&!("8R"===I.1e.4N&&I.1e.4q<k5)){13.24.3T("1U",G.k1(J))}1k{13.24.1U=K}}).1E(13);L.a4("k2",K);L.k3="k4";L.jP()},3J:17(K,J){13.1v=I.1X(13.1v,J);13.24=H(K)||I.$1t("24",{},{"1V-1f":"3k","1V-1g":"3k"}).1Z(I.$1t("2Y").1A("3p-at-24").1x({2e:"5C",1H:-dA,1f:10,1g:10,5d:"3f"}).1Z(1m.3H)).34("1t",1r);if(I.1e.2L.cl&&13.1v.9P&&"1O"==I.1P(K)){13.ck(K);1a}1c L=17(){if(13.ca()){13.7k.6c.2b(13)}1k{13.7k.5S.2b(13)}L=1h}.1E(13);13.9L();if("1O"==I.1P(K)){13.24.1U=K}1k{if(I.1e.4K&&5==I.1e.4q&&I.1e.2n<9){13.24.c9=17(){if(/2f|8j/.3e(13.24.8m)){13.24.c9=1h;L&&L()}}.1E(13)}13.24.1U=K.2q("1U")}13.24&&13.24.8j&&L&&(13.8i=L.2y(2N))},jO:17(){13.8h();13.81();13.2i=1n;1a 13},ca:17(){1c J=13.24;1a(J.9r)?(J.9r>0):(J.8m)?("8j"==J.8m):J.1f>0},1F:17(){1a 13.1D||(13.1D={1f:13.24.9r||13.24.1f,1g:13.24.c1||13.24.1g})}})})(w);(17(H){if(!H){67"6I 6H 6G"}if(H.5w){1a}1c G=H.$;H.5w=1t H.3y({3J:17(J,I){1c K;13.el=H.$(J);13.1v=H.1X(13.1v,I);13.5t=1n;13.7f=13.br;K=H.5w.7P[13.1v.1Y]||13.1v.1Y;if("17"===H.1P(K)){13.7f=K}1k{13.5J=13.8w(K)||13.8w("66")}if("1O"==H.1P(13.1v.71)){13.1v.71="jz"===13.1v.71?6m:5D(13.1v.71)||1}},1v:{c3:60,5z:8g,1Y:"66",71:1,4U:"jA",c8:H.$F,7m:H.$F,bR:H.$F,c6:H.$F,9A:1n,jB:1n},4g:1h,5J:1h,7f:1h,jC:17(I){13.1v.1Y=I;I=H.5w.7P[13.1v.1Y]||13.1v.1Y;if("17"===H.1P(I)){13.7f=I}1k{13.7f=13.br;13.5J=13.8w(I)||13.8w("66")}},4V:17(K){1c I=/\\%$/,J;13.4g=K;13.bi=0;13.2m=0;13.jy=0;13.8T={};13.7y="7y"===13.1v.4U||"7y-4p"===13.1v.4U;13.7w="7w"===13.1v.4U||"7w-4p"===13.1v.4U;1S(J in 13.4g){I.3e(13.4g[J][0])&&(13.8T[J]=1r);if("4p"===13.1v.4U||"7y-4p"===13.1v.4U||"7w-4p"===13.1v.4U){13.4g[J].4p()}}13.bm=H.6q();13.c5=13.bm+13.1v.5z;13.1v.c8.2b();if(0===13.1v.5z){13.6p(1);13.1v.7m.2b()}1k{13.9H=13.c4.1E(13);if(!13.1v.9A&&H.1e.2L.4Y){13.5t=H.1e.4Y.2b(1j,13.9H)}1k{13.5t=13.9H.c7(1o.5y(jx/13.1v.c3))}}1a 13},bn:17(){if(13.5t){if(!13.1v.9A&&H.1e.2L.4Y&&H.1e.9s){H.1e.9s.2b(1j,13.5t)}1k{dM(13.5t)}13.5t=1n}},2a:17(I){I=H.3o(I)?I:1n;13.bn();if(I){13.6p(1);13.1v.7m.2y(10)}1a 13},b9:17(K,J,I){K=2F(K);J=2F(J);1a(J-K)*I+K},c4:17(){1c J=H.6q(),I=(J-13.bm)/13.1v.5z,K=1o.6e(I);if(J>=13.c5&&K>=13.1v.71){13.bn();13.6p(1);13.1v.7m.2y(10);1a 13}if(13.7y&&13.bi<K){1S(1c L in 13.4g){13.4g[L].4p()}}13.bi=K;if(!13.1v.9A&&H.1e.2L.4Y){13.5t=H.1e.4Y.2b(1j,13.9H)}13.6p((13.7w?K:0)+13.7f(I%1))},6p:17(I){1c J={},L=I;1S(1c K in 13.4g){if("2r"===K){J[K]=1o.5y(13.b9(13.4g[K][0],13.4g[K][1],I)*2N)/2N}1k{J[K]=13.b9(13.4g[K][0],13.4g[K][1],I);13.8T[K]&&(J[K]+="%")}}13.1v.bR(J,13.el);13.7g(J);13.1v.c6(J,13.el)},7g:17(I){1a 13.el.1x(I)},8w:17(I){1c J,K=1h;if("1O"!==H.1P(I)){1a 1h}4r(I){1B"8D":K=G([0,0,1,1]);1G;1B"66":K=G([0.25,0.1,0.25,1]);1G;1B"66-in":K=G([0.42,0,1,1]);1G;1B"66-cb":K=G([0,0,0.58,1]);1G;1B"66-in-cb":K=G([0.42,0,0.58,1]);1G;1B"d1":K=G([0.47,0,0.jt,0.ju]);1G;1B"d2":K=G([0.39,0.jv,0.kb,1]);1G;1B"jw":K=G([0.jD,0.aQ,0.55,0.95]);1G;1B"d5":K=G([0.55,0.jE,0.68,0.53]);1G;1B"d3":K=G([0.25,0.46,0.45,0.94]);1G;1B"jL":K=G([0.jM,0.cf,0.jN,0.jK]);1G;1B"cU":K=G([0.55,0.jJ,0.jF,0.19]);1G;1B"cJ":K=G([0.jG,0.61,0.cg,1]);1G;1B"jI":K=G([0.ka,0.9V,0.cg,1]);1G;1B"kf":K=G([0.e1,0.cf,0.ed,0.22]);1G;1B"kB":K=G([0.cV,0.84,0.44,1]);1G;1B"kA":K=G([0.77,0,0.88,1]);1G;1B"kz":K=G([0.kC,0.aQ,0.kx,0.ki]);1G;1B"kj":K=G([0.23,1,0.32,1]);1G;1B"kk":K=G([0.86,0,0.kl,1]);1G;1B"d7":K=G([0.95,0.aQ,0.kh,0.kg]);1G;1B"d6":K=G([0.19,1,0.22,1]);1G;1B"kd":K=G([1,0,0,1]);1G;1B"ke":K=G([0.6,0.ky,0.98,0.km]);1G;1B"kn":K=G([0.ku,0.82,0.cV,1]);1G;1B"kw":K=G([0.kt,0.ks,0.15,0.86]);1G;1B"cI":K=G([0.6,-0.28,0.aW,0.9V]);1G;1B"cE":K=G([0.88,0.9c,0.32,1.ay]);1G;1B"kp":K=G([0.68,-0.55,0.kq,1.55]);1G;1R:I=I.4v(/\\s/g,"");if(I.3s(/^4S-4T\\((?:-?[0-9\\.]{0,}[0-9]{1,},){3}(?:-?[0-9\\.]{0,}[0-9]{1,})\\)$/)){K=I.4v(/^4S-4T\\s*\\(|\\)$/g,"").7H(",");1S(J=K.1I-1;J>=0;J--){K[J]=2F(K[J])}}}1a G(K)},br:17(U){1c I=0,T=0,Q=0,V=0,S=0,O=0,P=13.1v.5z;17 N(W){1a((I*W+T)*W+Q)*W}17 M(W){1a((V*W+S)*W+O)*W}17 K(W){1a(3*I*W+2*T)*W+Q}17 R(W){1a 1/(7s*W)}17 J(W,X){1a M(L(W,X))}17 L(ad,ae){1c ac,ab,aa,X,W,Z;17 Y(af){if(af>=0){1a af}1k{1a 0-af}}1S(aa=ad,Z=0;Z<8;Z++){X=N(aa)-ad;if(Y(X)<ae){1a aa}W=K(aa);if(Y(W)<0.be){1G}aa=aa-X/W}ac=0;ab=1;aa=ad;if(aa<ac){1a ac}if(aa>ab){1a ab}5l(ac<ab){X=N(aa);if(Y(X-ad)<ae){1a aa}if(ad>X){ac=aa}1k{ab=aa}aa=(ab-ac)*0.5+ac}1a aa}Q=3*13.5J[0];T=3*(13.5J[2]-13.5J[0])-Q;I=1-Q-T;O=3*13.5J[1];S=3*(13.5J[3]-13.5J[1])-O;V=1-O-S;1a J(U,R(P))}});H.5w.7P={8D:"8D",jr:"d1",ir:"d2",is:"d7",it:"d6",iu:"d5",iq:"d3",io:"cU",ij:"cJ",ik:"cI",il:"cE",cF:17(J,I){I=I||[];1a 1o.4z(2,10*--J)*1o.eB(20*J*1o.eG*(I[0]||1)/3)},im:17(J,I){1a 1-H.5w.7P.cF(1-J,I)},cL:17(K){1S(1c J=0,I=1;1;J+=I,I/=2){if(K>=(7-4*J)/11){1a I*I-1o.4z((11-6*J-11*K)/4,2)}}},iv:17(I){1a 1-H.5w.7P.cL(1-I)},3k:17(I){1a 0}}})(w);(17(H){if(!H){67"6I 6H 6G"}if(H.8E){1a}1c G=H.$;H.8E=1t H.3y(H.5w,{3J:17(I,J){13.an=I;13.1v=H.1X(13.1v,J);13.5t=1n;13.$3I.3J()},4V:17(M){1c I=/\\%$/,L,K,J=M.1I;13.aq=M;13.8W=1t 69(J);1S(K=0;K<J;K++){13.8W[K]={};1S(L in M[K]){I.3e(M[K][L][0])&&(13.8W[K][L]=1r);if("4p"===13.1v.4U||"7y-4p"===13.1v.4U||"7w-4p"===13.1v.4U){13.aq[K][L].4p()}}}13.$3I.4V([]);1a 13},6p:17(I){1S(1c J=0;J<13.an.1I;J++){13.el=H.$(13.an[J]);13.4g=13.aq[J];13.8T=13.8W[J];13.$3I.6p(I)}}})})(w);(17(H){if(!H){67"6I 6H 6G";1a}if(H.ar){1a}1c G=H.$;H.ar=17(J,K){1c I=13.74=H.$1t("2Y",1h,{2e:"5C","z-8J":cM}).1A("iD");H.$(J).1C("7x",17(){I.1Z(1m.3H)});H.$(J).1C("8k",17(){I.2P()});H.$(J).1C("7E",17(P){1c R=20,O=H.$(P).6j(),N=I.1F(),M=H.$(1j).1F(),Q=H.$(1j).6X();17 L(U,S,T){1a(T<(U-S)/2)?T:((T>(U+S)/2)?(T-S):(U-S)/2)}I.1x({1M:Q.x+L(M.1f,N.1f+2*R,O.x-Q.x)+R,1H:Q.y+L(M.1g,N.1g+2*R,O.y-Q.y)+R})});13.9T(K)};H.ar.2w.9T=17(I){13.74.4h&&13.74.ak(13.74.4h);13.74.3n(1m.bx(I))}})(w);(17(H){if(!H){67"6I 6H 6G";1a}if(H.iE){1a}1c G=H.$;H.8M=17(L,K,J,I){13.8G=1h;13.52=H.$1t("bQ",1h,{2e:"5C","z-8J":cM,5a:"3f",2r:0.8}).1A(I||"").1Z(J||1m.3H);13.cR(L);13.5q(K)};H.8M.2w.5q=17(I){13.52.5q();13.8G=13.4i.1E(13).2y(H.aF(I,iF))};H.8M.2w.4i=17(I){3P(13.8G);13.8G=1h;if(13.52&&!13.av){13.av=1t w.5w(13.52,{5z:H.aF(I,eD),7m:17(){13.52.5i();4P 13.52;13.av=1h}.1E(13)}).4V({2r:[13.52.3K("2r"),0]})}};H.8M.2w.cR=17(I){13.52.4h&&13.74.ak(13.52.4h);13.52.3n(1m.bx(I))}})(w);(17(H){if(!H){67"6I 6H 6G"}if(H.7c){1a}1c K=H.$,G=1h,O={"3u":1,4b:2,63:3,"17":4,1O:2N},I={"3u":17(R,Q,P){if("3u"!=H.1P(Q)){if(P||"1O"!=H.1P(Q)){1a 1n}1k{if(!/^(1r|1n)$/.3e(Q)){1a 1n}1k{Q=Q.cS()}}}if(R.41("2u")&&!K(R["2u"]).5F(Q)){1a 1n}G=Q;1a 1r},1O:17(R,Q,P){if("1O"!==H.1P(Q)){1a 1n}1k{if(R.41("2u")&&!K(R["2u"]).5F(Q)){1a 1n}1k{G=""+Q;1a 1r}}},63:17(S,R,Q){1c P=1n,U=/%$/,T=(H.1P(R)=="1O"&&U.3e(R));if(Q&&!"63"==93 R){1a 1n}R=2F(R);if(9x(R)){1a 1n}if(9x(S.7r)){S.7r=cQ.iC}if(9x(S.aC)){S.aC=cQ.js}if(S.41("2u")&&!K(S["2u"]).5F(R)){1a 1n}if(S.7r>R||R>S.aC){1a 1n}G=T?(R+"%"):R;1a 1r},4b:17(S,Q,P){if("1O"===H.1P(Q)){3x{Q=1j.iB.ix(Q)}3R(R){1a 1n}}if(H.1P(Q)==="4b"){G=Q;1a 1r}1k{1a 1n}},"17":17(R,Q,P){if(H.1P(Q)==="17"){G=Q;1a 1r}1k{1a 1n}}},J=17(U,T,Q){1c S;S=U.41("33")?U.33:[U];if("4b"!=H.1P(S)){1a 1n}1S(1c R=0,P=S.1I-1;R<=P;R++){if(I[S[R].1y](S[R],T,Q)){1a 1r}}1a 1n},M=17(U){1c S,R,T,P,Q;if(U.41("33")){P=U.33.1I;1S(S=0;S<P;S++){1S(R=S+1;R<P;R++){if(O[U.33[S]["1y"]]>O[U.33[R].1y]){Q=U.33[S];U.33[S]=U.33[R];U.33[R]=Q}}}}1a U},N=17(S){1c R;R=S.41("33")?S.33:[S];if("4b"!=H.1P(R)){1a 1n}1S(1c Q=R.1I-1;Q>=0;Q--){if(!R[Q].1y||!O.41(R[Q].1y)){1a 1n}if(H.3o(R[Q]["2u"])){if("4b"!==H.1P(R[Q]["2u"])){1a 1n}1S(1c P=R[Q]["2u"].1I-1;P>=0;P--){if(!I[R[Q].1y]({1y:R[Q].1y},R[Q]["2u"][P],1r)){1a 1n}}}}if(S.41("1R")&&!J(S,S["1R"],1r)){1a 1n}1a 1r},L=17(P){13.4B={};13.1v={};13.cN(P)};H.1X(L.2w,{cN:17(R){1c Q,P,S;1S(Q in R){if(!R.41(Q)){7G}P=(Q+"").4X().5A();if(!13.4B.41(P)){13.4B[P]=M(R[Q]);if(!N(13.4B[P])){67"iy iz iA ii \'"+Q+"\' ih in "+R}13.1v[P]=2D}}},7g:17(Q,P){Q=(Q+"").4X().5A();if(H.1P(P)=="1O"){P=P.4X()}if(13.4B.41(Q)){G=P;if(J(13.4B[Q],P)){13.1v[Q]=G}G=1h}},eZ:17(P){P=(P+"").4X().5A();if(13.4B.41(P)){1a H.3o(13.1v[P])?13.1v[P]:13.4B[P]["1R"]}},7M:17(Q){1S(1c P in Q){13.7g(P,Q[P])}},eX:17(){1c Q=H.1X({},13.1v);1S(1c P in Q){if(2D===Q[P]&&2D!==13.4B[P]["1R"]){Q[P]=13.4B[P]["1R"]}}1a Q},8S:17(P){K(P.7H(";")).36(K(17(Q){Q=Q.7H(":");13.7g(Q.6Q().4X(),Q.6Y(":"))}).1E(13))},8X:17(P){P=(P+"").4X().5A();1a 13.4B.41(P)},hY:17(P){P=(P+"").4X().5A();1a 13.8X(P)&&H.3o(13.1v[P])},2P:17(P){P=(P+"").4X().5A();if(13.8X(P)){4P 13.1v[P];4P 13.4B[P]}}});H.7c=L}(w));(17(K){if(!K){67"6I 6H 6G";1a}1c J=K.$;if(K.8Z){1a}1c I="bU://bV.b1.b8/hZ/75",H="bU://bV.b1.b8/i0/i1";1c G=17(L){13.6t={};13.7i=J(L);13.7C=J(1m.9S(I,"75"));13.7C.3T("1f",13.7i.9r||13.7i.1f);13.7C.3T("1g",13.7i.c1||13.7i.1g);13.1i=J(1m.9S(I,"1i"));13.1i.hX(H,"6K",13.7i.2q("1U"));13.1i.3T("1f","2N%");13.1i.3T("1g","2N%");13.1i.1Z(13.7C)};G.2w.6C=17(){1a 13.7C};G.2w.5e=17(L){if(1o.5y(L)<1){1a}if(!13.6t.5e){13.6t.5e=J(1m.9S(I,"2V"));13.6t.5e.3T("id","bX");13.6t.5e.b5(J(1m.9S(I,"hW")).bK({"in":"hS",bZ:L}));13.6t.5e.1Z(13.7C);13.1i.3T("2V","2d(#bX)")}1k{13.6t.5e.4h.3T("bZ",L)}1a 13};K.8Z=G}(w));1c r=(17(I){1c H=I.$;1c G=17(K,J){13.3h={8a:"3p",3r:"7Z",2e:"2Q",1D:{hT:"2v",1f:"2t",1g:"2t"},hU:["1g","1f"]};13.3I=K;13.4u=1h;13.6S=1h;13.2G=1h;13.2M={};13.eF=[];13.5P=1h;13.aK=1h;13.5H=1h;13.3h=I.1X(13.3h,J);13.3g=13.3h.8a+"-aP";13.8n=13.3h.8a+"-6N";13.ec()};G.2w={ec:17(){13.4u=I.$1t("2Y").1A(13.3g).1A(13.3g+"-"+13.3h.3r).1x({5a:"3f"});13.6S=I.$1t("2Y").1A(13.3g+"-6S").1Z(13.4u);13.4u.1Z(13.3I);H(["4C","4y"]).36(17(J){13.2M[J]=I.$1t("2o").1A(13.3g+"-2o").1A(13.3g+"-2o-"+J).1Z(13.4u).1C("1Q 21",(17(L,K){H(L).5G[0].2a().4I();H(L).5c();13.5O(K)}).2E(13,J))}.1E(13));13.2M.4C.1A(13.3g+"-2o-4O");13.2G=I.$1t("hV").1C("1Q 21",17(J){J.2a()})},dS:17(K){1c J=I.$1t("i2").1A(13.8n).3n(K).1Z(13.2G);1t I.a6(K,{7a:13.9B.1E(13)});13.eF.38(J);1a J},dk:17(K){1c J=13.5P||13.2G.9u(13.8n+"-6L")[0];if(J){H(J).1T(13.8n+"-6L")}13.5P=H(K);if(!13.5P){1a}13.5P.1A(13.8n+"-6L");13.5O(13.5P)},bP:17(){if(13.6S!==13.2G.4H){H(13.2G).1Z(13.6S);13.eA();H(1j).1C("7t",13.5H=13.9B.1E(13));13.bP.1E(13).2y(1);1a}1c J=13.3I.1F();if(J.1g>0&&J.1g>J.1f){13.7O("4Q")}1k{13.7O("7Z")}13.9B();13.4u.1x({5a:""})},2a:17(){if(13.5H){H(1j).1N("7t",13.5H)}13.4u.5i()},5O:17(W,M){1c O={x:0,y:0},Z="4Q"==13.3h.3r?"1H":"1M",R="4Q"==13.3h.3r?"1g":"1f",N="4Q"==13.3h.3r?"y":"x",V=13.2G.4H.1F()[R],S=13.2G.4H.8b(),L=13.2G.1F()[R],U,J,Y,P,K,T,Q,X=[];if(13.aK){13.aK.2a()}1k{13.2G.1x("1Y",I.1e.7v+5W.79(32)+"6Z")}if(2D===M){M=8g}U=13.2G.8b();if("1O"==I.1P(W)){O[N]=("4y"==W)?1o.1V(U[Z]-S[Z]-V,V-L):1o.2h(U[Z]-S[Z]+V,0)}1k{if("5Z"==I.1P(W)){J=W.1F();Y=W.8b();O[N]=1o.2h(0,1o.1V(V-L,U[Z]+V/2-Y[Z]-J[R]/2))}1k{1a}}if(I.1e.5K&&"6y"==I.1e.4N||I.1e.2n&&I.1e.2n<10){if("1O"==I.1P(W)&&O[N]==U[Z]-S[Z]){U[Z]+=0===U[Z]-S[Z]?30:-30}O["7X-"+Z]=[((L<=V)?0:(U[Z]-S[Z])),O[N]];4P O.x;4P O.y;if(!13.bA){13.bA=1t I.8E([13.2G],{5z:eD})}X.38(O);13.bA.4V(X);Q=O["7X-"+Z][1]}1k{13.2G.1x({1Y:I.1e.7v+5W.79(32)+M+"7D 66",2g:"4m("+O.x+"2v, "+O.y+"2v, 0)"});Q=O[N]}if(Q>=0){13.2M.4C.1A(13.3g+"-2o-4O")}1k{13.2M.4C.1T(13.3g+"-2o-4O")}if(Q<=V-L){13.2M.4y.1A(13.3g+"-2o-4O")}1k{13.2M.4y.1T(13.3g+"-2o-4O")}Q=1h},eA:17(){1c L,K,M,T,S,V,N,R,Q,U,aa,X,Y,W={x:0,y:0},J,P,O=aZ,Z=17(ad){1c ac,ab=0;1S(ac=1.5;ac<=90;ac+=1.5){ab+=(ad*1o.eB(ac/1o.eG/2))}(T<0)&&(ab*=(-1));1a ab};S=H(17(ab){W={x:0,y:0};J="4Q"==13.3h.3r?"1H":"1M";P="4Q"==13.3h.3r?"1g":"1f";L="4Q"==13.3h.3r?"y":"x";X=13.2G.4H.1F()[P];aa=13.2G.1F()[P];M=X-aa;if(M>=0){1a}if(ab.2m=="3E"){if(2D===Y){Y=0}13.2G.3F("1Y",I.1e.7v+5W.79(32)+"e5");V=ab[L];Q=ab.y;R=ab.x;U=1n}1k{if("9I"==ab.2m){if(U){1a}N=Z(1o.3w(T));Y+=N;(Y<=M)&&(Y=M);(Y>=0)&&(Y=0);W[L]=Y;13.2G.3F("1Y",I.1e.7v+5W.79(32)+O+"7D  4S-4T(.0, .0, .0, 1)");13.2G.3F("2g","4m("+W.x+"2v, "+W.y+"2v, 5Q)");T=0}1k{if(U){1a}if("7Z"==13.3h.3r&&1o.3w(ab.x-R)>1o.3w(ab.y-Q)||"4Q"==13.3h.3r&&1o.3w(ab.x-R)<1o.3w(ab.y-Q)){ab.2a();T=ab[L]-V;Y+=T;W[L]=Y;13.2G.3F("2g","4m("+W.x+"2v, "+W.y+"2v, 5Q)");if(Y>=0){13.2M.4C.1A(13.3g+"-2o-4O")}1k{13.2M.4C.1T(13.3g+"-2o-4O")}if(Y<=M){13.2M.4y.1A(13.3g+"-2o-4O")}1k{13.2M.4y.1T(13.3g+"-2o-4O")}}1k{U=1r}}V=ab[L]}}).1E(13);13.2G.1C("2p",S)},9B:17(){1c M,L,J,K=13.3I.1F();if(K.1g>0&&K.1g>K.1f){13.7O("4Q")}1k{13.7O("7Z")}M="4Q"==13.3h.3r?"1g":"1f";L=13.2G.1F()[M];J=13.4u.1F()[M];if(L<=J){13.4u.1A("6E-2M");13.2G.3F("1Y","").1F();13.2G.3F("2g","4m(0,0,0)");13.2M.4C.1A(13.3g+"-2o-4O");13.2M.4y.1T(13.3g+"-2o-4O")}1k{13.4u.1T("6E-2M")}if(13.5P){13.5O(13.5P,0)}},7O:17(J){if("4Q"!==J&&"7Z"!==J||J==13.3h.3r){1a}13.4u.1T(13.3g+"-"+13.3h.3r);13.3h.3r=J;13.4u.1A(13.3g+"-"+13.3h.3r);13.2G.3F("1Y","3k").1F();13.2G.3F("2g","").3F("7X","")}};1a G})(w);1c h=y.$;if(!y.1e.87){y.1e.87=y.9Q("2g").9Z()}1c o={4A:{1y:"1O","2u":["2W","7z"],"1R":"7z"},3O:{33:[{1y:"1O","2u":["1l","2B","48","3L"],"1R":"1l"},{1y:"3u","2u":[1n]}],"1R":"1l"},eh:{33:[{1y:"1O","2u":["2t"]},{1y:"63",7r:1}],"1R":"2t"},dh:{33:[{1y:"1O","2u":["2t"]},{1y:"63",7r:1}],"1R":"2t"},91:{1y:"1O","1R":"2R"},ib:{1y:"63",7r:0,"1R":15},7F:{33:[{1y:"1O","2u":["2Q","1H","3L"],"1R":"3L"},{1y:"3u","2u":[1n]}],"1R":"3L"},2A:{33:[{1y:"1O","2u":["1j","dq","3L"]},{1y:"3u","2u":[1n]}],"1R":"1j"},65:{33:[{1y:"1O","2u":["1l","2B","3L"],"1R":"1l"},{1y:"3u","2u":[1n]}],"1R":"1l"},3V:{1y:"1O","2u":["2W","3i"],"1R":"2W"},3X:{1y:"3u","1R":1r},e8:{1y:"3u","1R":1r},3a:{33:[{1y:"1O","2u":["aM","3i","3L"]},{1y:"3u","2u":[1n]}],"1R":"aM"},e2:{1y:"3u","1R":1r},e0:{1y:"3u","1R":1n},9f:{1y:"3u","1R":1n},a2:{1y:"3u","1R":1r},dz:{1y:"3u","1R":1n},dp:{1y:"3u","1R":1r},aV:{1y:"1O","2u":["2W","7z"],"1R":"2W"},5x:{1y:"1O"},bO:{1y:"1O","1R":"ic 6F 1l"},8H:{1y:"1O","1R":"eJ 6F 1l"},8Q:{1y:"1O","1R":"eJ 6F 2A"},ig:{1y:"1O","1R":"i9"},i8:{1y:"1O","1R":"i4"},i5:{1y:"1O","1R":"i6"}};1c l={3O:{33:[{1y:"1O","2u":["1l","2B","3L"],"1R":"1l"},{1y:"3u","2u":[1n]}],"1R":"1l"},3V:{1y:"1O","2u":["2W"],"1R":"2W"},8Q:{1y:"1O","1R":"hR 6F 2A"},bO:{1y:"1O","1R":"i7 6F 1l"},8H:{1y:"1O","1R":"iG 21 6F 1l"}};1c n="8P",B="1q",b=20,z=["db","de","dP","dO","e7","dl"];1c t,p={},D=h([]),F,e=1j.jc||1,E,x=1r,f=y.1e.2L.8V?"4m(":"9d(",A=y.1e.2L.8V?",0)":")",m=1h;1c q=(17(){1c H,K,J,I,G;1a G})();17 v(I){1c H,G;H="";1S(G=0;G<I.1I;G++){H+=5W.79(14^I.ex(G))}1a H}17 i(I){1c H=[],G=1h;(I&&(G=h(I)))&&(H=D.2V(17(J){1a J.3U===G}));1a H.1I?H[0]:1h}17 a(I){1c H=h(1j).1F(),G=h(1j).6X();I=I||0;1a{1M:I,2R:H.1f-I,1H:I,2Q:H.1g-I,x:G.x,y:G.y}}17 c(G){1a(G.2k&&("3A"===G.2k||G.2k===G.59))||(/3A/i).3e(G.1y)}17 g(G){1a G.2k?(("3A"===G.2k||G.59===G.2k)&&G.9Y):1===G.2C.1I&&(G.6d.1I?G.6d[0].3D==G.2C[0].3D:1r)}17 s(){1c I=y.$A(29),H=I.6Q(),G=p[H];if(G){1S(1c J=0;J<G.1I;J++){G[J].6i(1h,I)}}}17 C(){1c K=29[0],G,J,H=[];3x{do{J=K.a9;if(/^[A-am-z]*$/.3e(J)){if(G=K.2q("id")){if(/^[A-am-z][-A-am-je-jf]*/.3e(G)){J+="#"+G}}H.38(J)}K=K.4H}5l(K&&K!==1m.6k);H=H.4p();y.76(H.6Y(" ")+"> .1q-8c > 24",{1f:"2N% !2s;"},"1q-et-6M",1r)}3R(I){}}17 u(){1c H=1h,I=1h,G=17(){1j.jb(1m.3H.80,1m.3H.7W);1j.aG(1t 1u("7t"))};I=f6(17(){1c L=1j.3r==90||1j.3r==-90,K=1j.4J,J=(L?f5.ja:f5.j6)*0.85;if((H==1h||H==1n)&&((L&&K<J)||(!L&&K<J))){H=1r;G()}1k{if((H==1h||H==1r)&&((L&&K>J)||(!L&&K>J))){H=1n;G()}}},j7);1a I}17 d(){y.76(".3p-3f-6S, .3p-at-24",{7A:"eS !2s","2h-1g":"0 !2s","2h-1f":"0 !2s","1V-1g":"3k !2s","1V-1f":"3k !2s",1f:"f4 !2s",1g:"f4 !2s",2e:"5C !2s",1H:"-a3 !2s",1M:"0 !2s",5d:"3f !2s","-3W-2g":"3k !2s",2g:"3k !2s","-3W-1Y":"3k !2s",1Y:"3k !2s"},"9o-8C-6M");y.76(".3p-at-24 24",{7A:"dC-eS !2s",3G:"0 !2s",78:"0 !2s","2h-1g":"0 !2s","2h-1f":"0 !2s","1V-1g":"3k !2s","1V-1f":"3k !2s","-3W-2g":"3k !2s",2g:"3k !2s","-3W-1Y":"3k !2s",1Y:"3k !2s"},"9o-8C-6M");if(y.1e.6u){y.76(".3t-3p .1q-2A .1q-2A-bg",{7A:"3k !2s"},"9o-8C-6M")}if(y.1e.6u&&("4l"!==y.1e.3B||44==y.1e.7l)){y.76(".3t-3p .1q-1l-1j.1q-2B, .3t-3p .1q-1l-1j.1q-2B:j8",{"3G-j9":"0 !2s"},"9o-8C-6M")}}1c k=17(J,K,H,I,G){13.1J={1U:1h,2d:1h,64:1,1d:1h,2m:0,1D:{1f:0,1g:0},2f:1n};13.1l={1U:1h,2d:1h,64:1,1d:1h,2m:0,1D:{1f:0,1g:0},2f:1n};if("8O"==y.1P(J)){13.1J=J}1k{if("1O"==y.1P(J)){13.1J.2d=y.6b(J)}}if("8O"==y.1P(K)){13.1l=K}1k{if("1O"==y.1P(K)){13.1l.2d=y.6b(K)}}13.3m=H;13.1v=I;13.4n=G;13.7b=1h;13.43=1h;13.1d=1h};k.2w={9t:17(I,H,G){1c J=I.7T("24")[0];if(G){13.1J.1d=J||y.$1t("24").1Z(I)}if(e>1){13.1J.2d=I.2q("3Q-1i-2x");if(13.1J.2d){13.1J.64=2}13.1l.2d=I.2q("3Q-1l-1i-2x");if(13.1l.2d){13.1l.64=2}}13.1J.1U=I.2q("3Q-1i")||I.2q("jg")||(J?J.2q("1U"):1h);if(13.1J.1U){13.1J.1U=y.6b(13.1J.1U)}13.1J.2d=13.1J.2d||13.1J.1U;if(13.1J.2d){13.1J.2d=y.6b(13.1J.2d)}13.1l.1U=I.2q("3Q-1l-1i")||I.2q("6K");if(13.1l.1U){13.1l.1U=y.6b(13.1l.1U)}13.1l.2d=13.1l.2d||13.1l.1U;if(13.1l.2d){13.1l.2d=y.6b(13.1l.2d)}13.3m=I.2q("3Q-3m")||I.2q("8x")||H;13.43=I.2q("3Q-43");13.4n=I;1a 13},aI:17(G){1c H=1h;if(29.1I>1&&"17"===y.1P(29[1])){H=29[1]}if(0!==13[G].2m){if(13[G].2f){13.6c(H)}1a}if(13[G].2d&&13[G].1d&&!13[G].1d.2q("1U")&&!13[G].1d.2q("jh")){13[G].1d.3T("1U",13[G].2d)}13[G].2m=1;1t y.a6(13[G].1d||13[G].2d,{7a:h(17(I){13[G].2f=1r;13[G].2m=I.2i?2:-1;if(I.2i){13[G].1D=I.1F();if(!13[G].1d){13[G].1d=h(I.24);13[G].1d.2q("2l");13[G].1d.5B("2l");13[G].1D.1f/=13[G].64;13[G].1D.1g/=13[G].64}1k{13[G].1d.1x({"1V-1f":13[G].1D.1f,"1V-1g":13[G].1D.1g});if(13[G].1d.9m&&13[G].1d.9m!=13[G].1d.1U){13[G].2d=13[G].1d.9m}1k{if(y.6b(13[G].1d.2q("1U")||"")!=13[G].2d){13[G].1d.3T("1U",13[G].2d)}}}}13.6c(H)}).1E(13)})},9e:17(){13.aI("1J",29[0])},bJ:17(){13.aI("1l",29[0])},5X:17(){13.7b=1h;if(29.1I>0&&"17"===y.1P(29[0])){13.7b=29[0]}13.9e();13.bJ()},6c:17(G){if(G){G.2b(1h,13)}if(13.7b&&13.1J.2f&&13.1l.2f){13.7b.2b(1h,13);13.7b=1h;1a}},2f:17(){1a(13.1J.2f&&13.1l.2f)},2i:17(){1a(2===13.1J.2m&&2===13.1l.2m)},8v:17(H){1c G="1J"==H?"1l":"1J";if(!13[H].2f||(13[H].2f&&2===13[H].2m)){1a 13[H].2d}1k{if(!13[G].2f||(13[G].2f&&2===13[G].2m)){1a 13[G].2d}1k{1a 1h}}},6C:17(H){1c G="1J"==H?"1l":"1J";if(!13[H].2f||(13[H].2f&&2===13[H].2m)){1a 13[H].1d}1k{if(!13[G].2f||(13[G].2f&&2===13[G].2m)){1a 13[G].1d}1k{1a 1h}}},1F:17(H){1c G="1J"==H?"1l":"1J";if(!13[H].2f||(13[H].2f&&2===13[H].2m)){1a 13[H].1D}1k{if(!13[G].2f||(13[G].2f&&2===13[G].2m)){1a 13[G].1D}1k{1a{1f:0,1g:0}}}},jo:17(H){1c G="1J"==H?"1l":"1J";if(!13[H].2f||(13[H].2f&&2===13[H].2m)){1a 13[H].64}1k{if(!13[G].2f||(13[G].2f&&2===13[G].2m)){1a 13[G].64}1k{1a 1}}},6z:17(G){13.1d=13.6C(G)}};1c j=17(H,G){13.1v=1t y.7c(o);13.1p=h(17(){if(29.1I>1){1a 13.7g(29[0],29[1])}1k{1a 13.eZ(29[0])}}).1E(13.1v);13.f0=1t y.7c(l);13.3C=[];13.1i=1h;13.6P=1h;13.3U=h(H).1C("3E jp 2W",17(I){I.2a()});13.id=1h;13.1d=1h;13.6W=1h;13.9k=1h;13.6x=1h;13.7q={1f:0,1g:0};13.1D={1f:0,1g:0};13.2c={1f:0,1g:0};13.3d={1f:0,1g:0};13.2j={1H:0,1M:0,2Q:0,2R:0};13.2i=1n;13.1L=1n;13.5I=1h;13.aA=1h;13.5H=h(17(){if(13.1L){13.1i.1d.1x({"1V-1g":1o.2h(13.1i.1F("1l").1g,13.6A())});13.1i.1d.1x({"1V-1f":1o.2h(13.1i.1F("1l").1f,13.7B())})}13.bh(29[0])}).1E(13);13.bp=h(17(I){3P(13.aA);13.aA=h(13.5H).2y(10,"5O"===I.1y)}).2E(13);13.1s=1h;13.1b=1h;13.3a=1h;13.bq=1h;13.6U=0;13.bW=1r;13.6g=1h;13.5r=1h;13.6N=1h;13.3c=1h;13.3S=1h;13.3X=1h;13.5h=1h;13.8r=1h;13.4R=1h;13.8t=1h;13.56=1h;13.4j=1h;13.4L=[];13.2M={};13.4V(G)};j.2w={eT:17(G){13.1v.7M(1j[B+"7c"]||{});13.1v.8S(13.3U.2q("3Q-1v")||"");if(y.1e.3t){13.1v.7M(13.f0.eX());13.1v.7M(1j[B+"jq"]||{});13.1v.8S(13.3U.2q("3Q-3t-1v")||"")}if("1O"==y.1P(G)){13.1v.8S(G||"")}1k{13.1v.7M(G||{})}if(13.1p("5x")){13.1p("5x",13.1p("5x").4v(","," "))}if(1n===13.1p("7F")){13.1p("7F","3L")}if(1n===13.1p("3a")){13.1p("3a","3L")}4r(13.1p("3a")){1B"3L":13.6U=0;1G;1B"aM":13.6U=2;1G;1B"3i":13.6U=6m;1G}if("3L"===13.1p("3O")){13.1p("3O",1n)}if("3L"===13.1p("2A")){13.1p("2A",1n)}if("3L"===13.1p("65")){13.1p("65",1n)}if(E){if("1l"==13.1p("3O")){13.1p("91","2z")}}if(y.1e.3t&&"1l"==13.1p("3O")&&"2z"==13.1p("91")){if(13.1p("2A")){13.1p("3O",1n)}1k{13.1p("4A","2W")}}},4V:17(H){1c G;13.eT(H);if(x&&!13.1p("a2")){1a}13.id=13.3U.2q("id")||"1q-"+1o.6e(1o.6O()*y.6q());13.3U.3T("id",13.id);13.1d=y.$1t("8c").1A("1q-8c");C(13.3U);13.6W=13.3U.ei("24");13.9k=13.6W?13.6W.2q("1U"):1h;13.6x=h(13.3U).2q("8x");h(13.3U).5B("8x");13.6P=1t k().9t(13.3U,13.6x,1r);13.1i=13.6P;13.1d.eg(13.1i.1J.1d).1A(13.1p("5x"));if(1r!==13.1p("dz")){13.1d.1C("jn",17(I){I.2a();1a 1n})}13.1d.1A("1q-"+13.1p("4A")+"-1l");if(!13.1p("2A")){13.1d.1A("1q-6E-2A")}13.1s={1d:y.$1t("2Y",{"3M":"1q-1s"},{1H:0}).1Z(13.1d),1i:y.$1t("24",{1U:"3Q:1i/dw;dv,dt/du="},{2e:"5C",1H:0,1M:0}),1f:0,1g:0,2Z:{x:0,y:0},5v:{x:0,y:0},1D:{1f:0,1g:0},3G:{x:0,y:0},dx:0,dy:0,5N:1n,4i:17(){if(y.1e.2L.2g){13.1d.1x({2g:"9d(-a3,-a3)"})}1k{13.1d.1x({1H:-dA})}}};13.1s.4i();13.1s.1d.3n(13.1s.1i);13.1b={1d:y.$1t("2Y",{"3M":"1q-1l-1j"},{1H:-dB}).1A(13.1p("5x")).1Z(F),1i:y.$1t("24",{1U:"3Q:1i/dw;dv,dt/du="},{2e:"5C"}),a0:0,1f:0,1g:0,5f:0,4J:0,1D:{1f:"2t",6R:"2v",1g:"2t",6w:"2v"},1W:13.1p("3O"),2e:13.1p("91"),4k:1n,2T:1n,3l:1n,5p:1n,6J:h(17(){13.1b.5p=1n!==29[0];13.1d[13.1b.5p?"1T":"1A"]("1q-6E-1l")}).1E(13),4i:h(17(){1c I=h(13.1d).26("cr");13.1b.1d.1N("2S");13.1b.1d.1x({1H:-dB}).1Z(F);13.1b.1d.1T("1q-9F 1q-p-"+("1l"==13.1b.1W?13.1b.2e:13.1b.1W));if(!13.1L&&I){I.2P()}13.1b.1i.2q("2l");13.1b.1i.5B("2l")}).1E(13),9h:h(17(I){13.1d[1n===I?"1A":"1T"]("1q-6E-1l");13.1d["2B"==I?"1A":"1T"]("1q-2B-1l");13.1b.1d["2B"==I?"1A":"1T"]("1q-2B");13.1b.1d["48"==I?"1A":"1T"]("1q-48");if("1l"!=I){13.1d.1T("1q-2z-1l");13.1b.1d.1T("1q-2z")}13.1b.1W=I;if(1n===I){13.1b.6J(1n)}1k{if("48"===I){13.1b.6J(1r)}}}).1E(13)};13.1b.1d.3n(13.1b.1i);13.1b.9h(13.1p("3O"));13.1b.1i.5B("1f");13.1b.1i.5B("1g");if("2D"!==93(q)){h(13.1d).34("cr",y.$1t(((1o.6e(1o.6O()*bN)+1)%2)?"bQ":"2Y").1x({7A:"dC",5d:"3f",5a:"6n",jm:q[1],ji:q[2],dH:q[3],jj:"jk-jl",2e:"5C",1H:8,1M:8,7X:"2t",1f:"2t",j5:"2R","j4-1g":"iO",dF:iP}).5k(v(q[0])));if(h(h(13.1d).26("cr")).7T("a")[0]){h(h(h(13.1d).26("cr")).7T("a")[0]).1C("21 1Q",17(I){I.5c();1j.a4(13.6K)})}}if((G=(""+13.1p("eh")).3s(/^([0-9]+)?(2v|%)?$/))){13.1b.1D.6R=G[2]||"2v";13.1b.1D.1f=(2F(G[1])||"2t")}if((G=(""+13.1p("dh")).3s(/^([0-9]+)?(2v|%)?$/))){13.1b.1D.6w=G[2]||"2v";13.1b.1D.1g=(2F(G[1])||"2t")}if("2B"==13.1b.1W){13.1d.1A("1q-2B-1l");13.1b.1d.1A("1q-2B");if("2t"===13.1b.1D.1f){13.1b.1D.6R="%";13.1b.1D.1f=70}if("2t"===13.1b.1D.1g){13.1b.1D.6w="%"}}1k{if(13.1p("1l-2e").3s(/^#/)){if(13.1b.4k=h(13.1p("1l-2e").4v(/^#/,""))){if(h(13.1b.4k).1F().1g>50){if("2t"===13.1b.1D.1f){13.1b.1D.6R="%";13.1b.1D.1f=2N}if("2t"===13.1b.1D.1g){13.1b.1D.6w="%";13.1b.1D.1g=2N}}}1k{13.1p("1l-2e","2R")}}if("48"==13.1b.1W){if("2t"===13.1b.1D.1f){13.1b.1D.6R="2v"}if("2t"===13.1b.1D.1g){13.1b.1D.6w="2v"}}if("1l"==13.1b.1W){if("2t"===13.1b.1D.1f||"2z"==13.1p("1l-2e")){13.1b.1D.6R="%";13.1b.1D.1f=2N}if("2t"===13.1b.1D.1g||"2z"==13.1p("1l-2e")){13.1b.1D.6w="%";13.1b.1D.1g=2N}}if("2z"==13.1p("1l-2e")){13.1d.1A("1q-2z-1l")}}13.1b.2e=13.1b.4k?"4k":13.1p("1l-2e");13.1s.3G.x=2F(13.1s.1d.3K("3G-1M-1f")||"0");13.1s.3G.y=2F(13.1s.1d.3K("3G-1H-1f")||"0");13.1i.9e(17(){if(2!==13.1i.1J.2m){1a}13.1i.6z("1J");13.1D=13.1i.1d.1F();13.ea();13.2i=1r;if(1r===13.1p("9f")){13.6V()}}.1E(13));if(1r!==13.1p("9f")||"3i"==13.1p("4A")){13.1i.5X(h(17(I){13.7o(I,1r)}).1E(13));13.5r=h(13.8o).1E(13).2y(8d)}13.dc()},2a:17(){13.dR();if(13.1b){13.1b.1d.5i()}if(13.4j){13.4j.2a();13.4j=1h}if(13.3c){13.3c.5i()}if(13.1L){h(y.1e.49()).1x({5d:""})}h(13.3C).36(17(G){h(G.4n).1T("1q-6N-6L").1T(13.1p("5x")||"1q-$iQ-6M-3M-6F-2P$")},13);if(13.6W){13.3U.3n(13.6W);if(13.9k){13.6W.3T("1U",13.9k)}}if(13.6x){13.3U.3T("8x",13.6x)}if(13.1d){13.1d.5i()}},7o:17(I,J){1c H=13.5T,G=13.1i;13.5T=1h;if(2!==I.1l.2m){13.1i=I;13.2i=1r;13.1b.6J(1n);1a}13.1i=I;13.1i.6z(13.1L?"1l":"1J");13.1b.1i.1U=13.1i.8v("1l");13.1b.1d.1T("1q-48");13.1b.1i.2q("2l");13.1b.1i.5B("2l");13.1b.1d.1F();4D(h(17(){1c L=13.1b.1i.1F(),K;13.3d=13.1i.1F("1l");if(L.1f*L.1g>1&&L.1f*L.1g<13.3d.1f*13.3d.1g){13.3d=L}13.2c=y.4a(13.3d);if("48"==13.1b.1W){13.1b.1d.1A("1q-48")}13.da();13.1s.1i.1U=13.1i.1d.9m||13.1i.1d.1U;13.1b.6J(13.1b.1W&&!(13.1L&&"48"==13.1b.1W));13.2i=1r;13.5I=1h;13.5H();13.1d.1A("1q-2i");13.aY();if(G!==13.1i){s("de",13.id,G.4n,13.1i.4n);if(13.9n){K=13.9n;13.9n=1h;13.40(K.1i,K.dj)}}1k{s("db",13.id)}if(H){13.1d.2U(H.1y,H)}1k{if(13.1L&&"3i"==13.1p("3V")){13.4w()}1k{if(!!J){13.6V()}}}}).1E(13),iR)},dc:17(){1c H=13.id,G,I;I=1t dd("1l\\\\-id(\\\\s+)?:(\\\\s+)?"+H+"($|;)");if(y.1e.2L.bl){G=y.$A(1m.b7(\'[3Q-1l-id="\'+13.id+\'"]\'));G=h(G).5E(y.$A(1m.b7(\'[aO*="1l-id"]\')).2V(17(J){1a I.3e(J.2q("aO")||"")}))}1k{G=y.$A(1m.9p("A")).2V(17(J){1a H==J.2q("3Q-1l-id")||I.3e(J.2q("aO")||"")})}h(G).36(17(K){1c J,L;h(K).1C("2W",17(M){M.3z()});J=1t k().9t(K,13.6x);if(13.1i.1l.1U.4F(J.1l.1U)&&13.1i.1J.1U.4F(J.1J.1U)){h(J.4n).1A("1q-6N-6L");J=13.1i;J.4n=K}if(!J.43&&13.1i.43){J.43=13.1i.43}L=h(17(){13.40(J)}).1E(13);h(K).1C("6B",17(M){if("di"in M){M.di()}},5);h(K).1C("21 "+("7z"==13.1p("aV")?"7x 8k":"1Q"),h(17(N,M){if(13.5V){3P(13.5V)}13.5V=1n;if("7x"==N.1y){13.5V=h(L).2y(M)}1k{if("21"==N.1y||"1Q"==N.1y){L()}}}).2E(13,60)).1A(13.1p("5x")).1A("1q-6N");J.9e();if(1r!==13.1p("9f")){J.bJ()}13.3C.38(J)},13)},40:17(G,H){if(!13.2i){13.9n={1i:G,dj:H};1a}if(!G||G===13.1i){1a 1n}13.4E(1h,1r);13.2i=1n;13.1d.1T("1q-2i");13.5r=h(13.8o).1E(13).2y(8d);G.5X(h(17(O){1c I,P,N,K,J,M,L=(y.1e.2n<10)?"1F":"7I";13.aY();O.6z("1J");if(!O.1d){13.2i=1r;13.1d.1A("1q-2i");1a}13.8I(O);I=13.1i.1d[L]();if(13.1L){O.6z("1l");N=y.$1t("2Y").1A("1q-2A-bg");if(y.1e.2L.8q||y.1e.2n<10){N.3n(y.$1t("24",{1U:O.8v("1l")}).1x({2r:0}))}1k{N.3n(1t y.8Z(O.1d).5e(b).6C().1x({2r:0}))}h(N).1x({"z-8J":-99}).1Z(13.3c)}if(13.1L&&"1l"===13.1b.1W&&"3i"===13.1p("3V")){h(O.1d).1x({2r:0}).1Z(13.1d);P=I;J=[O.1d,13.1i.1d];M=[{2r:[0,1]},{2r:[1,0]}];h(O.1d).1x({"1V-1f":1o.2h(O.1F("1l").1f,13.7B()),"1V-1g":1o.2h(O.1F("1l").1g,13.6A())})}1k{13.1d.1x({1g:13.1d[L]().1g});13.1i.1d.1x({2e:"5C",1H:0,1M:0,2Q:0,2R:0,1f:"2N%",1g:"2N%","1V-1f":"","1V-1g":""});h(O.1d).1x({"1V-1f":1o.2h(O.1F(13.1L?"1l":"1J").1f,13.1L?13.7B():6m),"1V-1g":1o.2h(O.1F(13.1L?"1l":"1J").1g,13.1L?13.6A():6m),2e:"iN",1H:0,1M:0,2r:0,2g:""}).1Z(13.1d);P=h(O.1d)[L]();if(!H){h(O.1d).1x({"2h-1f":I.1f,1g:I.1g,"1V-1f":I.1f,"1V-1g":""})}13.1d.1x({1g:"",5d:""}).1F();h(O.1d).1F();J=[O.1d,13.1i.1d];M=[y.1X({2r:[0,1]},H?{4c:[0.6,1]}:{"2h-1f":[I.1f,P.1f],"1V-1f":[I.1f,P.1f],1g:[I.1g,P.1g]}),{2r:[1,0]}]}if(13.1L){if(13.3S.4h&&N.4h){K=h(13.3S.4h).3K("2r");if(y.1e.5K){J=J.5E([N.4h]);M=M.5E([{2r:[0.bS,K]}])}1k{J=J.5E([N.4h,13.3S.4h]);M=M.5E([{2r:[0.bS,K]},{2r:[K,0.bS]}])}}}1t y.8E(J,{5z:(H||13.1p("dp"))?H?8d:iM:0,1Y:H?"4S-4T(0.88, 0.9c, 0.aB, 1.ay)":(I.1f==P.1f)?"8D":"4S-4T(0.25, .1, .1, 1)",7m:h(17(){13.1i.1d.2P().2q("2l");13.1i.1d.5B("2l");h(O.1d).1x(13.1L?{1f:"2t",1g:"2t"}:{1f:"",1g:""}).1x({"2h-1f":"","2h-1g":"",2r:"","1V-1f":1o.2h(O.1F(13.1L?"1l":"1J").1f,13.1L?13.7B():6m),"1V-1g":1o.2h(O.1F(13.1L?"1l":"1J").1g,13.1L?13.6A():6m)});if(13.1L){13.3S.2P();13.3S=2D;13.3S=N.3F("z-8J",-2N);h(13.3S.4h).1x({2r:""});if(13.3X){if(O.3m){if(O.43){13.3X.5k("").3n(y.$1t("a",{6K:O.43}).1C("21 1Q",13.8N.1E(13)).5k(O.3m))}1k{13.3X.5k(O.3m).1A("1q-5q")}}1k{13.3X.1T("1q-5q")}}}13.7o(O)}).1E(13),bR:h(17(Q,R){if(2D!==Q.4c){R.3F("2g","4c("+Q.4c+")")}})}).4V(M)}).1E(13))},8I:17(H){1c G=1n;h(13.3C).36(17(I){h(I.4n).1T("1q-6N-6L");if(I===H){G=1r}});if(G&&H.4n){h(H.4n).1A("1q-6N-6L")}if(13.4j){13.4j.dk(H.dT)}},da:17(G){if(13.1i.3m&&"3L"!==13.1p("7F")&&"2B"!==13.1b.1W){if(!13.1b.3m){13.1b.3m=y.$1t("2Y",{"3M":"1q-3m"}).1Z(13.1b.1d.1A("3m-"+13.1p("7F")))}13.1b.3m.5k(13.1i.3m)}},6V:17(G,I){1c H;if(!13.1L){if(13.6U<=0){1a}13.6U--}if(2D===I){if(!13.1b.2T&&!13.1b.3l){if(13.1p("3O")){if("7z"==13.1p("4A")){I=13.1p("bO")}1k{if("2W"==13.1p("4A")){I=13.1p("8H")}}}1k{I=13.1p("2A")?13.1p("8Q"):""}}1k{I=13.1p("2A")?13.1p("8Q"):""}}if(!I){13.b4();1a}H=13.1d;if(!13.3a){13.3a=y.$1t("2Y",{"3M":"1q-3a"});13.bq=y.$1t("bQ",{"3M":"1q-3a-iI"}).3n(1m.bx(I)).1Z(13.3a);h(13.3a).1Z(13.1d)}1k{h(13.bq).5k(I)}13.3a.1x({"1Y-dK":""}).1T("1q-3a-3f");if(13.1L){H=13.4R}1k{if((13.1b.2T||13.1b.3l)&&"2B"!==13.1b.1W&&"2z"==13.1b.2e){H=13.1b.1d}}if(1r===G){4D(h(17(){13.3a.1A("1q-3a-3f")}).1E(13),16)}13.3a.1Z(H)},b4:17(){if(13.3a){13.3a.1x({"1Y-dK":"e5"}).1A("1q-3a-3f")}},8o:17(){if(!13.6g){13.6g=y.$1t("2Y",{"3M":"1q-iJ"});13.1d.3n(13.6g);13.6g.1F()}13.6g.1A("e4")},aY:17(){3P(13.5r);13.5r=1h;if(13.6g){h(13.6g).1T("e4")}},7u:17(I,M){1c L=y.4a(13.1b.1D),K=(!13.1L&&13.1b.4k)?h(13.1b.4k).1F():{1f:0,1g:0},H,G,J=13.1D,N={x:0,y:0};M=M||13.1b.2e;13.7q=13.1i.1d.1F();13.1D=13.1i.1d.1F();13.2j=13.1i.1d.7I();if(!K.1g){K=13.1D}if(1n===13.1p("e2")||1n===13.1b.1W||"48"===13.1b.1W){I=1n}if("48"==13.1b.1W){if("2t"===L.1f){L.1f=13.3d.1f}if("2t"===L.1g){L.1g=13.3d.1g}}if(13.1L&&"2B"==13.1b.1W){L.1f=70;L.1g="2t"}if("2B"==13.1b.1W&&"2t"===L.1g){13.1b.1f=2F(L.1f/2N)*1o.2h(K.1f,K.1g);13.1b.1g=13.1b.1f}1k{if("1l"==13.1b.1W&&"2z"==M){13.1D=13.1d.1F();K=13.1D;13.2j=13.1d.7I();13.1b.1f=K.1f;13.1b.1g=K.1g}1k{13.1b.1f=("%"===L.6R)?2F(L.1f/2N)*K.1f:5D(L.1f);13.1b.1g=("%"===L.6w)?2F(L.1g/2N)*K.1g:5D(L.1g)}}if("48"==13.1b.1W){G=1o.2h(1o.2h(13.1b.1f/13.3d.1f,13.1b.1g/13.3d.1g),1);13.1b.1f=13.3d.1f*G;13.1b.1g=13.3d.1g*G}13.1b.1f=1o.3N(13.1b.1f);13.1b.1g=1o.3N(13.1b.1g);13.1b.a0=13.1b.1f/13.1b.1g;13.1b.1d.1x({1f:13.1b.1f,1g:13.1b.1g});if(I){K=13.1L?13.3c.1F():13.1b.1d.1F();if(!13.1L&&(13.7q.1f*13.7q.1g)/(13.3d.1f*13.3d.1g)>0.8){13.2c.1f=1.5*13.3d.1f;13.2c.1g=1.5*13.3d.1g}1k{13.2c=y.4a(13.3d)}}if(1n!==13.1b.1W&&!13.1b.2T&&!(13.1L&&"3i"==13.1p("3V"))){if((13.7q.1f*13.7q.1g)/(13.2c.1f*13.2c.1g)>0.8){13.2c=y.4a(13.3d);13.1b.6J(1n)}1k{13.1b.6J(1r)}}13.1b.1i.1x({1f:13.2c.1f,1g:13.2c.1g});H=13.1b.1d.8u();13.1b.5f=1o.3N(H.1f);13.1b.4J=1o.3N(H.1g);13.1s.1f=1o.3N(13.1b.5f/(13.2c.1f/13.1D.1f));13.1s.1g=1o.3N(13.1b.4J/(13.2c.1g/13.1D.1g));13.1s.1d.1x({1f:13.1s.1f,1g:13.1s.1g});13.1s.1i.1x(13.1D);y.1X(13.1s,13.1s.1d.1F());if(13.1b.2T){3P(13.4M);13.4M=1h;if(13.1s.5N){13.1s.2Z.x*=(13.1D.1f/J.1f);13.1s.2Z.y*=(13.1D.1g/J.1g);N.x=13.1s.5v.x;N.y=13.1s.5v.y}1k{N.x=13.2j.1M+13.1s.1f/2+(13.1s.2Z.x*(13.1D.1f/J.1f));N.y=13.2j.1H+13.1s.1g/2+(13.1s.2Z.y*(13.1D.1g/J.1g))}13.7U(1h,N)}},bh:17(K){1c N,M,G,L,J,I,H=h(13.1d).26("cr");G=a(5);J=13.1b.2e;L=13.1L?"2z":13.1b.4k?"4k":13.1p("1l-2e");I=13.1L&&"1l"==13.1b.1W?13.3c:1m.3H;if(13.1L){G.y=0;G.x=0}if(!K){13.7u(1r,L)}if(!13.1b.3l&&!13.1b.2T){1a}N=13.2j.1H;if("2B"!==13.1b.1W){if(K){13.7u(1n);1a}4r(L){1B"2z":1B"4k":N=0;M=0;1G;1B"1H":N=13.2j.1H-13.1b.1g-13.1p("1l-5b");if(G.1H>N){N=13.2j.2Q+13.1p("1l-5b");L="2Q"}M=13.2j.1M;1G;1B"2Q":N=13.2j.2Q+13.1p("1l-5b");if(G.2Q<N+13.1b.1g){N=13.2j.1H-13.1b.1g-13.1p("1l-5b");L="1H"}M=13.2j.1M;1G;1B"1M":M=13.2j.1M-13.1b.1f-13.1p("1l-5b");if(G.1M>M&&G.2R>=13.2j.2R+13.1p("1l-5b")+13.1b.1f){M=13.2j.2R+13.1p("1l-5b");L="2R"}1G;1B"2R":1R:M=13.2j.2R+13.1p("1l-5b");if(G.2R<M+13.1b.1f&&G.1M<=13.2j.1M-13.1b.1f-13.1p("1l-5b")){M=13.2j.1M-13.1b.1f-13.1p("1l-5b");L="1M"}1G}4r(13.1p("1l-2e")){1B"1H":1B"2Q":if(G.1H>N||G.2Q<N+13.1b.1g){L="2z"}1G;1B"1M":1B"2R":if(G.1M>M||G.2R<M+13.1b.1f){L="2z"}1G}13.1b.2e=L;13.7u(1n);if(K){1a}if("4k"==L){I=13.1b.4k;G.y=0;G.x=0}if("2z"==L){if("48"!==13.1b.1W){13.1b.1d.1A("1q-2z");13.1d.1A("1q-2z-1l")}13.1s.4i();N=13.2j.1H+G.y;M=13.2j.1M+G.x;if(!13.1L&&y.1e.2n&&y.1e.2n<11){N=0;M=0;I=13.1d}}1k{N+=G.y;M+=G.x;13.1d.1T("1q-2z-1l");13.1b.1d.1T("1q-2z")}13.1b.1d.1x({1H:N,1M:M})}1k{13.7u(1n);if(y.1e.2n&&y.1e.2n<11){I=13.1d}}13.1b.1d[13.1L?"1A":"1T"]("1q-1L");if(!13.1L&&H){H.1Z("1l"==13.1b.1W&&"2z"==L?13.1b.1d:13.1d,((1o.6e(1o.6O()*bN)+1)%2)?"1H":"2Q")}13.1b.1d.1Z(I)},dQ:17(M){1c I,G,K,J,L=1n,H=M.aX?5:3/54;h(M).2a();H=(2N+H*1o.3w(M.7V))/2N;if(M.7V<0){H=1/H}if("2B"==13.1b.1W){G=1o.1V(2N,1o.5y(13.1b.1f*H));G=1o.2h(G,13.1D.1f*0.9);K=G/13.1b.a0;13.1b.1f=1o.3N(G);13.1b.1g=1o.3N(K);13.1b.1d.1x({1f:13.1b.1f,1g:13.1b.1g});I=13.1b.1d.8u();13.1b.5f=1o.3N(I.1f);13.1b.4J=1o.3N(I.1g);L=1r}1k{if(!13.1L&&"1l"==13.1b.1W){G=1o.1V(50,1o.5y(13.1s.1f*H));G=1o.2h(G,13.1D.1f*0.9);K=G/13.1b.a0;13.2c.1f=1o.3N((13.1b.5f/G)*13.1D.1f);13.2c.1g=1o.3N((13.1b.4J/K)*13.1D.1g);13.1b.1i.1x({1f:13.2c.1f,1g:13.2c.1g})}1k{1a}}J=h(1j).6X();13.1s.1f=1o.3N(13.1b.5f/(13.2c.1f/13.1D.1f));13.1s.1g=1o.3N(13.1b.4J/(13.2c.1g/13.1D.1g));13.1s.1d.1x({1f:13.1s.1f,1g:13.1s.1g});y.1X(13.1s,13.1s.1d.1F());if(13.1b.2T){3P(13.4M);13.4M=1h;if(L){13.4M=1r}13.7U(1h,{x:M.x-J.x,y:M.y-J.y});if(L){13.4M=1h}}},9i:17(I){1c H,G=I?"3q 1Q":"51"+(!y.1e.3t?(1j.2H.3b?" 6r":1j.2H.b6?" 7h":" 7E"):""),J=13.1d.26("1q:5j:4w:fn",(!I)?h(17(K){H=(y.1e.2n<9)?y.1X({},K):K;if(!13.5I){3P(13.5I);13.5I=4D(h(17(){13.4w(H)}).1E(13),iK)}}).2E(13):h(13.4w).2E(13));13.1d.34("1q:5j:4w:1z",G).1C(G,J,10)},bv:17(H){1c G=13.1d.26("1q:5j:4w:1z"),I=13.1d.26("1q:5j:4w:fn");13.1d.1N(G,I);13.1d.2X("1q:5j:4w:fn")},9l:17(H){1c G=H?"3q 1Q":"5R"+(!y.1e.3t?(1j.2H.3b?" ba":1j.2H.b6?" ee":" 8k"):""),I=13.1d.26("1q:5j:4E:fn",h(17(J){if(c(J)&&!g(J)){1a}if(13.1b.1d!==J.7Y()&&!(("2z"==13.1b.2e||"2B"==13.1b.1W)&&13.1b.1d.9O(J.7Y()))&&!13.1d.9O(J.7Y())){13.4E(J)}}).2E(13));13.1d.34("1q:5j:4E:1z",G).1C(G,I,20)},bs:17(){1c G=13.1d.26("1q:5j:4E:1z"),H=13.1d.26("1q:5j:4E:fn");13.1d.1N(G,H);13.1d.2X("1q:5j:4E:fn")},ea:17(){13.dW=13.5s.1E(13);13.1d.1C(["51",1j.2H.3b?"7Q":"7R"],h(17(G){if((y.1e.6u||"6y"===y.1e.4N&&y.1e.5K)&&13.1p("3O")&&"2W"!==13.1p("4A")&&"51"===G.1y){G.3z();if(y.1e.5K){G.5c()}}if(!13.1b.2T){1a}if("2z"===13.1b.2e){13.1s.5v=G.7K()}}).2E(13),10);13.1d.1C(["5R",1j.2H.3b?"6o":"6v"],h(17(G){if(c(G)&&g(G)){13.1s.9E=1n}}).2E(13),10);13.1d.1C("7N "+("6y"===y.1e.4N?"":1j.2H.3b?"6r":1j.2H.b6?"7h":"7E"),h(13.7U).2E(13));if(13.1p("3O")){13.9i("2W"===13.1p("4A"));13.9l("2W"===13.1p("4A")&&!13.1p("2A"))}13.1d.1C("6B",17(G){G.5c()},10).1C("1Q",h(17(G){13.1d.bt("eb","2W");if(13.1L){13.3c.2U("1Q",G)}}).1E(13),15);if(13.1p("2A")){13.1d.1C("21 1Q",h(13.2A).2E(13),15)}1k{13.1d.1C("21 1Q",h(13.8N).2E(13),15)}if(13.3C.1I>1){13.bL()}if(!y.1e.3t&&13.1p("e0")){13.1d.1C("4x",13.dQ.2E(13))}h(1j).1C("7t 5O",13.bp)},dR:17(){if(13.1d){13.1d.1N("4x")}h(1j).1N("7t 5O",13.bp);h(13.3C).36(17(G){h(G.4n).bo()})},4w:17(M){1c N,L,J,K,G,H=0,I=0;if(!13.2i||!13.1b.5p||13.1b.2T||13.1b.3l){if(!13.1i.2f()){if(M){13.5T=y.1X({},M);M.4I()}13.1i.5X(13.7o.1E(13));if(!13.5r){13.5r=h(13.8o).1E(13).2y(8d)}}1a}if(M&&"6r"==M.1y&&"3A"==M.2k){1a}if(!13.1p("3O")&&13.1p("2A")&&!13.1L){13.1b.2T=1r;1a}13.1b.3l=1r;if(13.1L&&"1l"==13.1b.1W){K=13.1i.1d.7S();13.5h.1A("1q-1l-in");G=13.4R.7S();I=((K.1M+K.2R)/2-(G.1M+G.2R)/2);H=((K.1H+K.2Q)/2-(G.1H+G.2Q)/2)}13.1b.1i.1N("2S");13.1b.1d.1T("1q-9F").1N("2S");13.1b.1d.1A("1q-3l");13.1d.1A("1q-3l");13.bh();L=("1l"==13.1b.1W)?13.1b.2e:13.1b.1W;if(y.1e.2L.1Y&&!(13.1L&&"3i"==13.1p("3V"))){if("2z"==L){J=13.1i.1d.1F();13.1b.1i.1x({2g:"4m(0,"+H+"2v, 0) 4c("+J.1f/13.2c.1f+", "+J.1g/13.2c.1g+")"}).1F();13.1b.1i.1C("2S",h(17(){13.1b.1i.1N("2S");13.1b.1d.1T("1q-3l 1q-p-"+L);13.1b.3l=1n;13.1b.2T=1r}).1E(13));13.1b.1d.1A("1q-p-"+L).1F();if(!y.1e.3t&&y.1e.4l&&("4l"===y.1e.3B||"6h"===y.1e.3B)){13.1b.3l=1n;13.1b.2T=1r}}1k{13.1b.1d.1C("2S",h(17(){13.1b.1d.1N("2S");13.1b.1d.1T("1q-3l 1q-p-"+L)}).1E(13));13.1b.1d.1A("1q-p-"+L).1F();13.1b.1d.1T("1q-p-"+L);13.1b.3l=1n;13.1b.2T=1r}}1k{13.1b.1d.1T("1q-3l");13.1b.3l=1n;13.1b.2T=1r}if(!13.1L){13.6V(1r)}if(M){M.2a().4I();N=M.7K();if("2B"==13.1b.1W&&(/21/i).3e(M.1y)){N.y-=13.1b.1g/2+10}if("2z"==L&&((/21/i).3e(M.1y)||c(M))){13.1s.2Z={x:0,y:0};N.x=-(N.x-13.2j.1M-13.1D.1f/2)*(13.2c.1f/13.1D.1f);N.y=-(N.y-13.2j.1H-13.1D.1g/2)*(13.2c.1g/13.1D.1g)}}1k{N={x:13.2j.1M+(13.2j.2R-13.2j.1M)/2,y:13.2j.1H+(13.2j.2Q-13.2j.1H)/2}}13.1d.1T("1q-3l").1A("1q-2T");N.x+=-I;N.y+=-H;13.1s.5v={x:0,y:0};13.1s.dx=0;13.1s.dy=0;13.7U(M,N,1r);s("dP",13.id)},4E:17(I,N){1c L,J,G,H,K=0,M=0,O=13.1b.2T;13.5T=1h;if(!13.2i){1a}if(I&&"ba"==I.1y&&"3A"==I.2k){1a}3P(13.4M);13.4M=1h;3P(13.5I);13.5I=1h;13.1b.3l=1n;13.1b.2T=1n;if(1r!==N&&!13.1L){if(O){13.6V()}}if(!13.1b.5p){1a}if(I){I.2a()}13.1b.1i.1N("2S");13.1b.1d.1T("1q-3l").1N("2S");if(13.1L){H=13.4R.7S();if("3i"!==13.1p("3V")){13.5h.1T("1q-1l-in")}13.1i.1d.1x({"1V-1g":13.6A()});G=13.1i.1d.7S();M=((G.1M+G.2R)/2-(H.1M+H.2R)/2);K=((G.1H+G.2Q)/2-(H.1H+H.2Q)/2)}L=("1l"==13.1b.1W)?13.1b.2e:13.1b.1W;if(y.1e.2L.1Y&&I&&!(13.1L&&"3i"==13.1p("3V"))){if("2z"==L){13.1b.1i.1C("2S",h(17(){13.1b.1i.1N("2S");13.1d.1T("1q-2T");4D(h(17(){13.1b.4i()}).1E(13),32)}).1E(13));J=13.1i.1d.1F();13.1b.1d.1A("1q-9F 1q-p-"+L).1F();13.1b.1i.1x({2g:"4m(0,"+K+"2v,0) 4c("+J.1f/13.2c.1f+", "+J.1g/13.2c.1g+")"})}1k{13.1b.1d.1C("2S",h(17(){13.1b.4i();13.1d.1T("1q-2T")}).1E(13));13.1b.1d.3K("2r");13.1b.1d.1A("1q-9F 1q-p-"+L);13.1d.1T("1q-2T")}}1k{13.1b.4i();13.1d.1T("1q-2T")}13.1s.dx=0;13.1s.dy=0;13.1s.5v={x:0,y:0};13.1s.4i();if(O){s("dO",13.id)}},7U:17(Q,P,O){1c I=P,K,J,M=0,H,L=0,G,R,N=1n;if(13.5T&&!13.1i.2f()){13.5T=Q}if(!13.1b.2T&&!O){1a}if(Q){h(Q).3z().5c();if(c(Q)&&!g(Q)){1a}N=(/21/i).3e(Q.1y)||c(Q);if(N&&!13.1s.9E){13.1s.9E=N}if(!I){I=Q.7K()}}if("48"==13.1b.1W){1a}if("1l"==13.1b.1W&&"2z"===13.1b.2e&&(Q&&N||!Q&&13.1s.5N)){13.1s.5N=1r;K=13.1s.2Z.x+(I.x-13.1s.5v.x);J=13.1s.2Z.y+(I.y-13.1s.5v.y);13.1s.5v=I;M=1o.2h(0,13.1b.5f-13.2c.1f)/2;H=-M;L=1o.2h(0,13.1b.4J-13.2c.1g)/2;G=-L}1k{13.1s.5N=1n;K=I.x-13.2j.1M;J=I.y-13.2j.1H;H=13.1D.1f-13.1s.1f;G=13.1D.1g-13.1s.1g;K-=13.1s.1f/2;J-=13.1s.1g/2}if("2B"!==13.1b.1W){K=1o.1V(M,1o.2h(K,H));J=1o.1V(L,1o.2h(J,G))}13.1s.2Z.x=K=1o.5y(K);13.1s.2Z.y=J=1o.5y(J);if("1l"==13.1b.1W&&"2z"!=13.1b.2e){if(y.1e.2L.2g){13.1s.1d.1x({2g:"9d("+13.1s.2Z.x+"2v,"+13.1s.2Z.y+"2v)"});13.1s.1i.1x({2g:"9d("+-(13.1s.2Z.x+13.1s.3G.x)+"2v, "+-(13.1s.2Z.y+13.1s.3G.y)+"2v)"})}1k{13.1s.1d.1x({1H:13.1s.2Z.y,1M:13.1s.2Z.x});13.1s.1i.1x({1H:-(13.1s.2Z.y+13.1s.3G.y),1M:-(13.1s.2Z.x+13.1s.3G.x)})}}if("2B"==13.1b.1W){if(13.1s.9E&&!(Q&&"3q"==Q.1y)){I.y-=13.1b.1g/2+10}R=h(1j).6X();13.1b.1d.1x((y.1e.2n&&y.1e.2n<11)?{1H:I.y-13.2j.1H-13.1b.1g/2,1M:I.x-13.2j.1M-13.1b.1f/2}:{1H:I.y+R.y-13.1b.1g/2,1M:I.x+R.x-13.1b.1f/2})}if(!13.4M){13.1s.dx=0;13.1s.dy=0;13.5s(1)}},5s:17(I){1c H,G;if(!j0(I)){I=13.1s.5N?0.2:0.1}H=((13.1s.2Z.x-13.1s.dx)*I);G=((13.1s.2Z.y-13.1s.dy)*I);13.1s.dx+=H;13.1s.dy+=G;if(!13.4M||1o.3w(H)>0.be||1o.3w(G)>0.be){13.1b.1i.1x(y.1e.2L.2g?{2g:f+(13.1s.5N?13.1s.dx:-(13.1s.dx*(13.2c.1f/13.1D.1f)-1o.1V(0,13.2c.1f-13.1b.5f)/2))+"2v,"+(13.1s.5N?13.1s.dy:-(13.1s.dy*(13.2c.1g/13.1D.1g)-1o.1V(0,13.2c.1g-13.1b.4J)/2))+"2v"+A+" 4c(1)"}:{1M:-(13.1s.dx*(13.2c.1f/13.1D.1f)+1o.2h(0,13.2c.1f-13.1b.5f)/2),1H:-(13.1s.dy*(13.2c.1g/13.1D.1g)+1o.2h(0,13.2c.1g-13.1b.4J)/2)})}if("2B"==13.1b.1W){1a}13.4M=4D(13.dW,16)},bL:17(){1c S,I,N=30,K=j3,P,Q="",H={},G,M,R=0,T={1Y:y.1e.87+5W.79(32)+"dX 4S-4T(.18,.35,.58,1)"},J,O,L=h(17(U){if(!13.2i||13.1b.2T){1a}if(U.2m=="3E"){3P(13.5I);13.5I=1h;R=0;H={x:U.x,y:U.y,dg:U.2I};S=13.1D.1f;I=S/2;13.1i.1d.1N("2S");13.1i.1d.3F("1Y","");13.1i.1d.3F("2g","4m(0, 0, 0)");O=1h}1k{G=(U.x-H.x);M={x:0,y:0,z:0};if(1h===O){O=(1o.3w(U.x-H.x)<1o.3w(U.y-H.y))}if(O){1a}U.2a();if("9I"==U.2m){R=0;J=1h;P=U.2I-H.dg;if(1o.3w(G)>I||(P<K&&1o.3w(G)>N)){if((Q=(G>0)?"dU":(G<=0)?"iW":"")){if(Q=="dU"){J=13.83();R+=S*10}1k{J=13.89();R-=S*10}}}M.x=R;M.dZ=-90*(M.x/S);13.1i.1d.1C("2S",h(17(V){13.1i.1d.1N("2S");13.1i.1d.3F("1Y","");if(J){13.1i.1d.1x({2g:"4m("+M.x+"2v, 5Q, 5Q)"});13.40(J,1r)}}).1E(13));13.1i.1d.1x(T);13.1i.1d.1x({"1Y-5z":M.x?"iX":"dX",2r:1-0.7*1o.3w(M.x/S),2g:"4m("+M.x+"2v, 5Q, 5Q)"});G=0;1a}M.x=G;M.z=-50*1o.3w(M.x/I);M.dZ=-60*(M.x/I);13.1i.1d.1x({2r:1-0.7*1o.3w(M.x/I),2g:"4m("+M.x+"2v, 5Q, "+M.z+"2v)"})}}).1E(13);13.1d.1C("2p",L)},dn:17(){1c H,G;if(13.3C.1I){13.4L=13.3C}1k{H=13.3U.2q("3Q-aU");if(H){if(y.1e.2L.bl){G=y.$A(1m.b7(\'.8P[3Q-aU="\'+H+\'"]\'))}1k{G=y.$A(1m.9p("A")).2V(17(I){1a H==I.2q("3Q-aU")})}h(G).36(17(J){1c I,K;I=i(J);if(I&&I.3C.1I>0){1a}if(I){K=1t k(I.1i.1J.2d,I.1i.1l.2d,I.1i.3m,1h,I.1i.4n)}1k{K=1t k().9t(J,I?I.6x:1h)}if(13.1i.1l.1U.4F(K.1l.1U)&&13.1i.1J.1U.4F(K.1J.1U)){K=13.1i}13.4L.38(K)},13);13.6P=13.1i}}if(13.4L.1I>1){13.5h.1A("dN-aP");13.56=y.$1t("2Y",{"3M":"1q-2A-iV"}).1Z(13.5h);13.4j=1t r(13.56);h(13.4L).36(17(I){1c J=h(17(K){13.8I(I);13.40(I)}).1E(13);I.dT=13.4j.dS(y.$1t("24",{1U:I.8v("1J")}).1C("21 1Q",17(K){K.2a()}).1C("21 "+("7z"==13.1p("aV")?"7x 8k":"1Q"),h(17(L,K){if(13.5V){3P(13.5V)}13.5V=1n;if("7x"==L.1y){13.5V=h(J).2y(K)}1k{if("21"==L.1y||"1Q"==L.1y){J()}}}).2E(13,60)))},13);13.2M.4y.5q();13.2M.4C.5q()}1k{13.5h.1T("dN-aP");13.2M.4y.4i();13.2M.4C.4i()}},e6:17(){1c G;if(13.4j){13.4j.2a();13.4j=1h}if(13.56){13.56.2P();13.56=1h}if(13.4L.1I>1&&!13.3C.1I){13.1d.1N("2p");13.1i.1d.2P().2q("2l");13.1i.1d.5B("2l");13.6P.1d.1Z(13.1d);13.7o(13.6P);5l(G=13.4L.iU()){if(G!==13.6P){if(G.1J.1d){G.1J.1d.5i();G.1J.1d=1h}if(G.1l.1d){G.1l.1d.5i();G.1l.1d=1h}G=1h}}}13.4L=[]},6f:17(){if(!13.2i||!13.1L){1a}if("8R"==y.1e.4N&&"8L"==y.1e.3B&&7==5D(y.1e.7l)){dM(m);m=1h}h(1m).1N("bI",13.8F);13.4E(1h,1r);13.2i=1n;if(w.1e.4Z.9w&&w.1e.4Z.5p()){w.1e.4Z.dL()}1k{if(y.1e.2L.1Y){13.1d.1N("2S").1x({1Y:""});13.1d.1C("2S",13.8A);if(y.1e.4l&&("4l"===y.1e.3B||"6h"===y.1e.3B)){4D(h(17(){13.8A()}).1E(13),8g)}13.3S.1N("2S").1x({1Y:""});13.3S.1x({1Y:"aR 0.6s 4S-4T(0.e1, 0.iY, 0.ed, 0.iZ) 0.6Z"}).1F();if(y.1e.6u&&"4l"!==y.1e.3B){13.1d.1x({1Y:"aR .4s 4S-4T(0.8g, 0, 0.aW, 0.9V) 6Z"}).1F()}1k{13.1d.1x({1Y:"aR .4s 4S-4T(0.8g, -0.j2, 0.aW, 0.9V) 6Z"}).1F()}if("3i"==13.1p("3V")&&"2B"!==13.1p("65")){13.1i.1d.1x({"1V-1g":13.1i.1F("1l").1g});13.1i.1d.1x({"1V-1f":13.1i.1F("1l").1f})}13.3S.1x({2r:0.4});13.1d.1x({2r:0.j1,2g:"4c(0.4)"})}1k{13.8A()}}},2A:17(I){if(!13.1i.2f()||!13.2i||13.1L){if(!13.1i.2f()){if(I){13.5T=y.1X({},I);I.4I()}13.1i.5X(13.7o.1E(13));if(!13.5r){13.5r=h(13.8o).1E(13).2y(8d)}}1a}if(I){I.4I()}1c G=h(13.1d).26("cr"),H=1m.iT();13.b4();13.6U--;13.4E(1h,1r);13.bv();13.bs();13.2i=1n;if(!13.3c){13.3c=y.$1t("2Y").1A("1q-2A").1A(13.1p("5x")).1x({2r:0});13.5h=y.$1t("2Y").1A("1q-2A-dm").1Z(13.3c);13.8t=y.$1t("2Y").1A("1q-2A-iS").1Z(13.5h);h(["4C","4y","6f"]).36(17(K){1c J="1q-2o";13.2M[K]=y.$1t("2o",{8x:13.1p("9T-iL-"+K)}).1A(J).1A(J+"-"+K);H.b5(13.2M[K]);4r(K){1B"4C":13.2M[K].1C("21 1Q",17(L){L.2a();13.40(13.83())}.2E(13));1G;1B"4y":13.2M[K].1C("21 1Q",17(L){L.2a();13.40(13.89())}.2E(13));1G;1B"6f":13.2M[K].1C("21 1Q",17(L){L.2a();13.6f()}.2E(13));1G}},13);13.8t.3n(H);13.3c.1C("4x 51 3q",h(17(J){h(J).2a()}));if(13.1p("e8")){13.3c.1C("21 1Q",17(J){if("3i"!==13.1p("3V")&&13.1d.9O(J.e3())){1a}J.2a();13.6f()}.2E(13))}13.8F=h(17(K){1c J=1h;if(27!==K.8s&&37!==K.8s&&39!==K.8s){1a}h(K).2a();if(27===K.8s){13.6f()}1k{J=(37===K.8s)?13.83():13.89();if(J){13.40(J)}}}).2E(13);13.8e=h(17(){1c J;13.1d.1N("2S").1x({1Y:"",2g:"4m(0,0,0)"});if(13.1L){1a}13.1L=1r;13.3c.1x({2r:1});13.1b.9h(13.1p("65"));13.2c=y.4a(13.3d);13.5H();if(13.3X&&13.1i.3m){if(13.1i.43){13.3X.3n(y.$1t("a",{6K:13.1i.43}).1C("21 1Q",13.8N.1E(13)).5k(13.1i.3m))}1k{13.3X.5k(13.1i.3m)}13.3X.1A("1q-5q")}if("3i"!==13.1p("3V")){13.9i(1r);13.9l(1r)}13.2i=1r;if("3i"===13.1p("3V")){13.4w()}if(y.1e.3t&&13.bW&&13.1b.5p){13.6V(1r,13.1p("8H"));13.bW=1n}13.8t.1T("1q-3f").1A("1q-97 1q-6n");13.56&&13.56.1T("1q-3f").1A("1q-97 1q-6n");if(13.4j){13.4j.bP();13.8I(13.1i)}if(G){G.1Z(13.3c,((1o.6e(1o.6O()*bN)+1)%2)?"1H":"2Q")}if(13.4L.1I&&!13.3C.1I){13.bL()}h(1m).1C("bI",13.8F);if("8R"==y.1e.4N&&"8L"==y.1e.3B&&7==5D(y.1e.7l)){m=u()}s("e7",13.id)}).1E(13);13.8A=h(17(){13.1d.1N("2S");if(!13.1L){1a}if(13.1L){h(1m).1N("bI",13.8F);13.4E(1h,1r)}13.e6();13.1L=1n;13.1b.9h(13.1p("3O"));13.1d.b0(13.1i.6C("1J"),13.1i.1d);13.1i.6z("1J");h(13.1i.1d).1x({1f:"",1g:"","1V-1f":1o.2h(13.1i.1F("1J").1f),"1V-1g":1o.2h(13.1i.1F("1J").1g)});13.1d.1x({2r:"",1Y:""});13.1d.1x({2g:"4m(0,0,0)"});13.1d.1Z(13.3U);13.7u(1r);if(13.3X){13.3X.2P();13.3X=1h}13.bv();13.bs();if("3i"==13.1p("4A")){13.4w()}1k{if(1n!==13.1p("3O")){13.9i("2W"===13.1p("4A"));13.9l("2W"===13.1p("4A")&&!13.1p("2A"))}}13.6V();13.3S.1N("2S");13.3c.2P();13.3S.2P();13.3S=1h;h(y.1e.49()).1x({5d:""});h(1m.3H).1x({5d:""});13.2i=1r;if(y.1e.2n<10){13.5H()}1k{h(1j).bt("dJ","7t")}s("dl",13.id)}).1E(13);13.8r=y.$1t("2Y",{"3M":"1q-1i-dm"}).1Z(13.5h);13.4R=y.$1t("8c").1Z(13.8r)}13.dn();h(y.1e.49()).1x({5d:"3f"});h(1m.3H).1x({5d:"3f"}).1F();if("dq"==13.1p("2A")){13.aE();w.1e.4Z.bH(13.3c,{bE:h(17(){13.8e()}).1E(13),bB:13.8A,8y:h(17(){13.aN()}).1E(13)})}1k{4D(h(17(){13.aN()}).1E(13),96)}},aE:17(){1c G;G=y.$1t("24",{1U:13.1i.8v("1l")});13.3S=y.$1t("2Y").1A("1q-2A-bg").3n((y.1e.2L.8q||y.1e.2n<10)?G:1t y.8Z(G).5e(b).6C()).1Z(13.3c);if("3i"===13.1p("3V")){13.5h.1A("1q-3i-1l"+("1l"===13.1p("65")?" 1q-1l-in":"")).1F()}13.1d.b0(13.1i.6C("1l"),13.1i.1d);13.1i.6z("1l");13.3c.1Z(1m.3H);13.7B=17(){1c H=13.8r;if(h(13.4R).1F().1f>50){H=13.4R}1a 17(){1a"3i"==13.1p("3V")&&"2B"!==13.1p("65")?6m:1o.5y(h(H).8u().1f)}}.2b(13);13.6A=17(){1c H=13.8r;if(h(13.4R).1F().1g>50){H=13.4R}1a 17(){1a"3i"==13.1p("3V")&&"2B"!==13.1p("65")?6m:1o.5y(h(H).8u().1g)}}.2b(13);13.8t.1T("1q-97 1q-6n").1A("1q-3f");13.56&&13.56.1T("1q-97 1q-6n").1A("1q-3f");13.1i.1d.1x({"1V-1g":1o.2h(13.1i.1F("1l").1g,13.6A())});13.1i.1d.1x({"1V-1f":1o.2h(13.1i.1F("1l").1f,13.7B())});13.4R.3n(13.1d);if(13.1p("3X")){13.3X=y.$1t("dE",{"3M":"1q-3m"}).1Z(13.4R)}},aN:17(){13.aE();13.1d.1x({1Y:""});13.1d.1x({2g:"4c(0.6)"}).1F();if(y.1e.6u&&"4l"!==y.1e.3B){13.1d.1x({1Y:y.1e.87+" 0.6s 4S-4T(0.88, 0.9c, 0.aB, 1) 6Z"})}1k{13.1d.1x({1Y:y.1e.87+" 0.6s 4S-4T(0.88, 0.9c, 0.aB, 1.ay) 6Z"})}if(y.1e.2L.1Y){13.1d.1C("2S",13.8e);if(y.1e.4l&&("4l"===y.1e.3B||"6h"===y.1e.3B)){4D(h(17(){13.8e()}).1E(13),jd)}}1k{13.8e.2y(16,13)}13.3c.1x({2r:1});13.1d.1x({2g:"4c(1)"})},8N:17(){if(13.1i.43){1j.a4(13.1i.43,"ia")}},89:17(){1c G=(13.1L?13.4L:13.3C).2V(17(J){1a(-1!==J.1J.2m||-1!==J.1l.2m)}),H=G.1I,I=h(G).6a(13.1i)+1;1a(1>=H)?1h:G[(I>=H)?0:I]},83:17(){1c G=(13.1L?13.4L:13.3C).2V(17(J){1a(-1!==J.1J.2m||-1!==J.1l.2m)}),H=G.1I,I=h(G).6a(13.1i)-1;1a(1>=H)?1h:G[(I<0)?H-1:I]},f3:17(H,I){1c G=13.3C.2V(17(J){1a((J.1l.1U.4F(H)||J.1l.2d.4F(H))&&(J.1J.1U.4F(I)||J.1J.2d.4F(I)))})||[];1a G[0]||((I&&H&&"1O"===y.1P(I)&&"1O"===y.1P(H))?1t k(I,H):1h)},au:17(H){1c G=13.3C.2V(17(I){1a(I.4n===H)})||[];1a G[0]},f7:17(G){1a 13.3C[G]}};t={4q:"i3.0.8",4V:17(J,H){1c I=1h,G=[];y.$A((J?[h(J)]:y.$A(1m.9u("8P")).5E(y.$A(1m.9u("al"))))).36((17(K){if(h(K)){if(!i(K)){I=1t j(K,H);if(x&&!I.1p("a2")){I.2a();I=1h}1k{D.38(I);G.38(I)}}}}).1E(13));1a J?G[0]:G},2a:17(J){1c H,I,G;if(J){(I=i(J))&&(I=D.9X(D.6a(I),1))&&I[0].2a()&&(4P I[0]);1a}5l(H=D.1I){I=D.9X(H-1,1);I[0].2a();4P I[0]}},iw:17(G){13.2a(G);1a 13.4V(G)},40:17(L,K,J,H){1c I=i(L),G;if(I){G="5Z"===y.1P(K)?I.au(K):I.f3(K,J);if(G){I.40(G)}}},kr:17(J,I){1c H=i(J),G;if(H){4r(y.1P(I)){1B"5Z":G=H.au(I);1G;1B"63":G=H.f7(I);1G;1R:}if(G){H.40(G)}}},4C:17(H){1c G;(G=i(H))&&G.40(G.83())},4y:17(H){1c G;(G=i(H))&&G.40(G.89())},ko:17(H){1c G;(G=i(H))&&G.4w()},kv:17(H){1c G;(G=i(H))&&G.4E()},2A:17(H){1c G;(G=i(H))&&G.2A()},6f:17(H){1c G;(G=i(H))&&G.6f()},eH:17(G,H){if(!p[G]){p[G]=[]}if("17"==y.1P(H)){p[G].38(H)}},kc:17(G){1a!!i(G)}};h(1m).1C("9z",17(){1c H=1j[B+"7c"]||{};d();F=y.$1t("2Y",{"3M":"3p-3f-6S"}).1Z(1m.3H);E=(y.1e.3t&&1j.en&&1j.en("(1V-ey-1f: eI), (1V-ey-1g: eI)").jH);if(y.1e.3t){y.1X(o,l)}1S(1c G=0;G<z.1I;G++){if(H[z[G]]&&y.$F!==H[z[G]]){t.eH(z[G],H[z[G]])}}t.4V();x=1n});1j.al=1j.al||{};1a t})();',62,1279,'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||this||||function|||return|zoomBox|var|node|jBrowser|width|height|null|image|window|else|zoom|document|false|Math|option|mz|true|lens|new|Event|options|Custom|jSetCss|type|event|jAddClass|case|jAddEvent|size|jBind|jGetSize|break|top|length|small|handler|expanded|left|jRemoveEvent|string|jTypeOf|btnclick|default|for|jRemoveClass|src|max|mode|extend|transition|jAppendTo||tap|||img||jFetch|||arguments|stop|call|zoomSize|url|position|loaded|transform|min|ready|boundaries|pointerType|style|state|ieMode|button|touchdrag|getAttribute|opacity|important|auto|enum|px|prototype||jDelay|inner|expand|magnifier|changedTouches|undefined|jBindAsEvent|parseFloat|context|navigator|timeStamp|mousedrag|clientY|features|buttons|100|clientX|jRemove|bottom|right|transitionend|active|jCallEvent|filter|click|jDel|div|pos||||oneOf|jStore||jEach||push||hint|pointerEnabled|expandBox|zoomSizeOrigin|test|hidden|rootCSS|settings|always|handle|none|activating|caption|append|defined|magic|dbltap|orientation|match|mobile|boolean|Doc|abs|try|Class|stopDefaults|touch|uaName|additionalImages|identifier|dragstart|jSetCssProp|border|body|parent|init|jGetCss|off|class|ceil|zoomMode|clearTimeout|data|catch|expandBg|setAttribute|placeholder|expandZoomOn|webkit|expandCaption|Element|touchpinch|update|hasOwnProperty||link|||||preview|getDoc|detach|array|scale|pushToEvents|target|dblbtnclick|styles|firstChild|hide|expandThumbs|custom|chrome|translate3d|origin|touches|reverse|version|switch||listeners|root|replace|activate|mousescroll|next|pow|zoomOn|schema|prev|setTimeout|deactivate|has|J_TYPE|parentNode|stopQueue|innerHeight|trident|expandGallery|moveTimer|platform|disabled|delete|vertical|expandFigure|cubic|bezier|direction|start|domPrefix|jTrim|requestAnimationFrame|fullScreen||touchstart|messageBox||||expandNav|constructor||MSPOINTER_TYPE_TOUCH|visibility|distance|stopDistribution|overflow|blur|innerWidth|instanceof|expandStage|kill|handlers|changeContent|while|add|pageX|pageY|enabled|show|loadTimer|move|timer|toLowerCase|spos|FX|cssClass|round|duration|jCamelize|removeAttribute|absolute|parseInt|concat|contains|events|resizeCallback|activateTimer|cubicBezier|gecko|className|nodeType|innertouch|scroll|selectedItem|0px|touchend|onerror|initEvent|J_UUID|updateTimer|String|load|mouseup|element|||isQueueStopped|number|dppx|expandZoomMode|ease|throw||Array|indexOf|getAbsoluteURL|onload|targetTouches|floor|close|loadingBox|opera|apply|jGetPageXY|documentElement|dragged|Infinity|visible|pointerup|render|now|pointermove||filters|androidBrowser|MSPointerUp|hunits|originalTitle|android|setCurNode|expandMaxHeight|mousedown|getNode|getButton|no|to|found|not|MagicJS|enable|href|selected|css|thumb|random|primaryImage|shift|wunits|wrapper|onTouchEnd|hintRuns|showHint|originalImg|jGetScroll|join|0s||cycles|onTouchStart|tm|tooltip|svg|addCSS||padding|fromCharCode|oncomplete|callback|Options|timedout|threshold|easeFn|set|MSPointerMove|originalImage|end|_handlers|uaVersion|onComplete|engine|setupZoom|onready|normalSize|minimum|200|resize|setSize|cssTransformProp|continuous|mouseover|alternate|hover|display|expandMaxWidth|canvas|ms|mousemove|zoomCaption|continue|split|getBoundingClientRect|storage|getClientXY|createElement|fromJSON|touchmove|setOrientation|Transition|pointerdown|MSPointerDown|jGetRect|byTag|animate|deltaY|scrollTop|margin|getRelated|horizontal|scrollLeft|_cleanup||getPrev||||cssTransform|175|getNext|cssPrefix|jGetPosition|figure|400|onExpand|on|600|_unbind|_timer|complete|mouseout|_EVENTS_|readyState|itemCSS|showLoading|toString|cssFilters|expandImageStage|keyCode|expandControls|getInnerSize|getURL|parseCubicBezier|title|fallback|sqrt|onClose|Opacity|reset|linear|PFX|keyboardCallback|hideTimer|textClickZoomHint|setActiveThumb|index|XMLHttpRequest|safari|Message|openLink|object|MagicZoom|textExpandHint|ios|fromString|pStyles|compatMode|perspective|pStyles_arr|exists|win|SVGImage||zoomPosition|handleMouseUp|typeof||||fade|||dblclick|toUpperCase|885|translate|loadSmall|lazyZoom|charAt|setMode|registerActivateEvent|onprogress|originalImgSrc|registerDeactivateEvent|currentSrc|nextImage|magiczoom|getElementsByTagName|_event_prefix_|naturalWidth|cancelAnimationFrame|parseNode|byClass|getStorage|capable|isNaN|btnclickEvent|domready|forceAnimation|reflow|J_EUID|relatedTarget|touchmovement|deactivating|onTouchMove|loopBind|dragend|pointerId|exitFullscreen|_bind|createEvent|callee|hasChild|xhr|normalizeCSS|eventType|createElementNS|text|implement|045|status|splice|isPrimary|dashize|aspectRatio|handleTouchStart|autostart|10000px|open|Date|ImageLoader|previousScale|https|tagName|||||||||||removeChild|MagicZoomPlus|Za|el_arr|slice|opr|styles_arr|Tooltip|deltaX|temporary|imageByOrigin|hideFX|cssDomPrefix|ignore|275|onClick|resizeTimer|320|maximum|handleTouchMove|prepareExpandedView|ifndef|dispatchEvent|uuid|loadImg|handleTouchEnd|scrollFX|J_EXT|once|expandToWindow|rel|thumbs|05|all|HTMLElement|changeEventName|gallery|selectorTrigger|735|isMouse|hideLoading|300|replaceChild|w3|errorEventName||hideHint|appendChild|msPointerEnabled|querySelectorAll|org|calc|pointerout||priority|_event_add_|000001|getTarget||reflowZoom|cycle|getElementsByClassName|_event_del_|query|startTime|stopAnimation|jClearEvents|onResize|hintMessage|cubicBezierAtTime|unregisterDeactivateEvent|jRaiseEvent|loadedBytes|unregisterActivateEvent|Alpha|createTextNode|onabort|onclick|selectorsMoveFX|onExit|Function|deltaMode|onEnter|presto|handleMouseDown|request|keydown|loadZoom|setProps|swipe|abort|101|textHoverZoomHint|run|span|onBeforeRender|0001|caller|http|www|mobileZoomHint|filterBlur|Left|stdDeviation|Bottom|naturalHeight|Top|fps|loop|finishTime|onAfterRender|interval|onStart|onreadystatechange|isReady|out|euid|cancelBubble||03|355|preventDefault|addEventListener|which|loadBlob|xhr2|wheelDelta|wheelDeltaY|wheelDeltaX|detail|curScale||dragmove|_initialDistance|handleMouseMove|doc|onxhrerror|304|wrap|error|progressiveLoad|jDefer|stopPropagation|requestFullScreen|easeOutBack|elasticIn|jHasClass|jSetOpacity|easeInBack|easeOutCubic|progid|bounceIn|999|parseSchema|styleFloat|getComputedStyle|Number|setMessage|jToBool|DXImageTransform|easeInCubic|165|getElementById|compareDocumentPosition|touchScreen|clientWidth|webkit419|easeInSine|easeOutSine|easeOutQuad|Microsoft|easeInQuad|easeOutExpo|easeInExpo|offsetWidth|Right|setCaption|onZoomReady|setupSelectors|RegExp|onUpdate|od|ts|zoomHeight|stopImmediatePropagation|onswipe|selectItem|onExpandClose|stage|setupExpandGallery||transitionEffect|fullscreen|hone|forEach|R0lGODlhAQABAAD|ACwAAAAAAQABAAACADs|base64|gif|||rightClick|10000|100000|inline|mjs|figcaption|zIndex|magicJS|fontWeight|backcompat|UIEvent|delay|cancel|clearInterval|with|onZoomOut|onZoomIn|changeZoomLevel|unregisterEvents|addItem|selector|backward|firefox|moveBind|300ms|DocumentTouch|deg|variableZoom|895|upscale|getOriginalTarget|shown|0ms|destroyExpandGallery|onExpandOpen|closeOnClickOutside|phone|registerEvents|MouseEvent|setupContent|685|MSPointerOut|animation|enclose|zoomWidth|querySelector|backCompat|textnode||nativize|matchMedia|getTime|documentMode||Webkit|stylesId|runtime|crios|Moz|moz|charCodeAt|device|onchange|initDrag|cos|UUID|500|msExitFullscreen|items|PI|registerCallback|767px|Click|item|toArray|Object|cancelFullScreen|insertRule|date|cssText|background|block|loadOptions|mozCancelAnimationFrame|styleSheet|multibackground|getJSON|removeRule|get|touchOptions|scrollbarsWidth|deleteRule|imageByURL|10px|screen|setInterval|imageByIndex|sheet|Image|ontouchstart|collection|hiptop|xxxxxxxx|regexp|iris|iemobile|KeyEvent|yxxx|KeyboardEvent|420|fireEvent|compal||xxxxxxxxxxxx|avantgo|4xxx|blackberry|bada|elaine|meego|xxxx|blazer|v3|g4bc9bfe|createEventObject|fennec|TR|air|evaluate|removeCSS|fullscreenEnabled|msFullscreenEnabled|webkitCancelFullScreen|webkitexitFullscreen|map|xpath|cssRules|toFloat|userAgent|head|addRule|edge|mozCancelFullScreen|oCancelFullScreen|SVG11|jToInt|4294967296|feature|generateUUID|getHashCode|hasFeature|implementation|ProgressEvent|msCancelFullScreen|FormData|DOMContentLoaded|doScroll|withCredentials|xy|symbian|oRequestAnimationFrame|jToggleClass|webkitRequestAnimationFrame|mozRequestAnimationFrame|other|msRequestAnimationFrame|oCancelAnimationFrame|red|2px|9999|webkitCancelRequestAnimationFrame|msCancelAnimationFrame|linux|mac|jGetFullScroll|mozInnerScreenY|getBoxObjectFor|clientTop|clientLeft|offsetHeight|WebKitPoint|jGetStyles|webos|unknown|taintEnabled|currentStyle|cssfilters|Width|ExitFullscreen|requestFullscreen|RequestFullScreen|RequestFullscreen|CancelFullScreen|MSFullscreenChange|MSFullscreenError|fullscreenerror|prefix|fullscreenchange|activeElement|FullScreen|webkitIsFullScreen|webkitTransitionEnd|lineHeight|WebKitTransitionEvent|getPropertyValue|TransitionEvent|cssFloat|float|FullscreenElement|fullscreenElement|536|lt|offsetLeft|ActiveXObject|plucker|pocket|isTouchEvent|isPrimaryTouch|removeEventListener|toElement|fromElement|returnValue|psp|srcElement|pointerover|MSPointerOver|re|attachEvent|mmp|netfront|midp|maemo|lge|ob|sort|detachEvent|ixi|os|palm|series|treo|xiino|insertBefore|jGetStyle|jSetStyle|xda|childNodes|innerText|offsetTop|offsetParent|html|innerHTML|iframe|DOMElement|pageYOffset|pageXOffset|jGetFullSize|scrollWidth|scrollHeight|clientHeight|up|windows|wap|presto925|vodafone|kindle|Tap|SourceGraphic|units|sides|ul|feGaussianBlur|setAttributeNS|isset|2000|1999|xlink|li|v5|Next|textBtnPrev|Previous|Touch|textBtnNext|Close|_self|zoomDistance|Hover||||textBtnClose|parameter|the|cubicOut|backIn|backOut|elasticOut||cubicIn||quadOut|sineOut|expoIn|expoOut|quadIn|bounceOut|refresh|parse|Incorrect|definition|of|JSON|NEGATIVE_INFINITY|MagicToolboxTooltip|MessageBox|5000|Double|pinchstart|message|loading|120|btn|350|relative|2em|2147483647|dummy|256|controls|createDocumentFragment|pop|thumbnails|forward|100ms|030|220|isFinite|01|280|201|line|textAlign|availHeight|250|before|radius|availWidth|scrollTo|devicePixelRatio|800|z0|9_|rev|srcset|fontSize|fontFamily|sans|serif|color|contextmenu|getRatio|selectstart|MobileOptions|sineIn|POSITIVE_INFINITY|745|715|575|easeInOutSine|1000|curFrame|infinite|normal|roundCss|setTransition|445|085|675|215|matches|easeInOutCubic|055|955|easeInOutQuad|455|515|destroy|send|onwheel|wheel|mousewheel|URL|000244140625|deltaFactor|pinchupdate|delta|deltaZ|webkitURL|lengthComputable|createObjectURL|GET|responseType|blob|537|response|total|static|progress|645|565|running|easeInOutExpo|easeInCirc|easeInQuart|035|795|06|easeOutQuint|easeInOutQuint|07|335|easeOutCirc|zoomIn|easeInOutBack|265|switchTo|135|785|075|zoomOut|easeInOutCirc|855|04|easeInQuint|easeInOutQuart|easeOutQuart|755'.split('|'),0,{}))
