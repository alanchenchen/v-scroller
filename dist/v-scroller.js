!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("vScroller",[],e):"object"==typeof exports?exports.vScroller=e():t.vScroller=e()}(this,function(){return function(t){function e(s){if(i[s])return i[s].exports;var a=i[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=0)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(1),a={install:function(t,e){t.component(s.a.name,s.a)}};e.default=a,"undefined"!=typeof window&&window.Vue&&window.Vue.use(a)},function(t,e,i){"use strict";function s(t){i(2)}var a=i(8),n=i(9),r=i(7),o=s,l=r(a.a,n.a,!1,o,"data-v-3e122608",null);e.a=l.exports},function(t,e,i){var s=i(3);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i(5)("5b5c06b8",s,!0)},function(t,e,i){e=t.exports=i(4)(void 0),e.push([t.i,"._container[data-v-3e122608]{position:relative;overflow:hidden;width:100%;height:100%}._container .horizonalMode[data-v-3e122608]{position:absolute;width:auto;height:100%}._scrollBar[data-v-3e122608]{position:absolute;right:0;width:.1rem;height:4rem;border-radius:1rem;background:rgba(0,0,0,.55)}._content[data-v-3e122608],.fresh[data-v-3e122608]{position:absolute;width:100%}.fresh[data-v-3e122608]{left:0;height:1.1rem;text-align:center;color:#4b8bf4;font-size:.3rem}.downfresh[data-v-3e122608]{top:-1.1rem}.upload[data-v-3e122608]{bottom:-.8rem;height:.8rem!important}.upload .nomore[data-v-3e122608]{line-height:.8rem}.arrow[data-v-3e122608]{stroke:#4b8bf4;height:.4rem;margin:.15rem auto 0;transform:translateZ(0) rotate(0deg);transition:transform .2s linear}.arrow_active[data-v-3e122608]{transform:translateZ(0) rotate(180deg)}.spinner[data-v-3e122608]{stroke:#4b8bf4;width:.7rem;height:.6rem;margin:.3rem auto 0}.upload .spinner[data-v-3e122608]{margin:.1rem auto 0;width:.6rem;height:.6rem;fill:#ec4949}",""])},function(t,e){function i(t,e){var i=t[1]||"",a=t[3];if(!a)return i;if(e&&"function"==typeof btoa){var n=s(a);return[i].concat(a.sources.map(function(t){return"/*# sourceURL="+a.sourceRoot+t+" */"})).concat([n]).join("\n")}return[i].join("\n")}function s(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var s=i(e,t);return e[2]?"@media "+e[2]+"{"+s+"}":s}).join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},a=0;a<this.length;a++){var n=this[a][0];"number"==typeof n&&(s[n]=!0)}for(a=0;a<t.length;a++){var r=t[a];"number"==typeof r[0]&&s[r[0]]||(i&&!r[2]?r[2]=i:i&&(r[2]="("+r[2]+") and ("+i+")"),e.push(r))}},e}},function(t,e,i){function s(t){for(var e=0;e<t.length;e++){var i=t[e],s=u[i.id];if(s){s.refs++;for(var a=0;a<s.parts.length;a++)s.parts[a](i.parts[a]);for(;a<i.parts.length;a++)s.parts.push(n(i.parts[a]));s.parts.length>i.parts.length&&(s.parts.length=i.parts.length)}else{for(var r=[],a=0;a<i.parts.length;a++)r.push(n(i.parts[a]));u[i.id]={id:i.id,refs:1,parts:r}}}}function a(){var t=document.createElement("style");return t.type="text/css",d.appendChild(t),t}function n(t){var e,i,s=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(s){if(f)return m;s.parentNode.removeChild(s)}if(v){var n=c++;s=p||(p=a()),e=r.bind(null,s,n,!1),i=r.bind(null,s,n,!0)}else s=a(),e=o.bind(null,s),i=function(){s.parentNode.removeChild(s)};return e(t),function(s){if(s){if(s.css===t.css&&s.media===t.media&&s.sourceMap===t.sourceMap)return;e(t=s)}else i()}}function r(t,e,i,s){var a=i?"":s.css;if(t.styleSheet)t.styleSheet.cssText=g(e,a);else{var n=document.createTextNode(a),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(n,r[e]):t.appendChild(n)}}function o(t,e){var i=e.css,s=e.media,a=e.sourceMap;if(s&&t.setAttribute("media",s),a&&(i+="\n/*# sourceURL="+a.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var h=i(6),u={},d=l&&(document.head||document.getElementsByTagName("head")[0]),p=null,c=0,f=!1,m=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,i){f=i;var a=h(t,e);return s(a),function(e){for(var i=[],n=0;n<a.length;n++){var r=a[n],o=u[r.id];o.refs--,i.push(o)}e?(a=h(t,e),s(a)):a=[];for(var n=0;n<i.length;n++){var o=i[n];if(0===o.refs){for(var l=0;l<o.parts.length;l++)o.parts[l]();delete u[o.id]}}}};var g=function(){var t=[];return function(e,i){return t[e]=i,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var i=[],s={},a=0;a<e.length;a++){var n=e[a],r=n[0],o=n[1],l=n[2],h=n[3],u={id:t+":"+a,css:o,media:l,sourceMap:h};s[r]?s[r].parts.push(u):i.push(s[r]={id:r,parts:[u]})}return i}},function(t,e){t.exports=function(t,e,i,s,a,n){var r,o=t=t||{},l=typeof t.default;"object"!==l&&"function"!==l||(r=t,o=t.default);var h="function"==typeof o?o.options:o;e&&(h.render=e.render,h.staticRenderFns=e.staticRenderFns,h._compiled=!0),i&&(h.functional=!0),a&&(h._scopeId=a);var u;if(n?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},h._ssrRegister=u):s&&(u=s),u){var d=h.functional,p=d?h.render:h.beforeCreate;d?(h._injectStyles=u,h.render=function(t,e){return u.call(e),p(t,e)}):h.beforeCreate=p?[].concat(p,u):[u]}return{esModule:r,exports:o,options:h}}},function(t,e,i){"use strict";e.a={name:"scroller",props:{snapping:{type:Boolean,default:!1},isDownFresh:{type:Boolean,default:!1},isUpLoad:{type:Boolean,default:!1},smooth:{type:Boolean,default:!0},horizonalMode:{type:Boolean,default:!1}},data:function(){return{startTime:0,miniTime:350,translateX:0,translateY:0,transition:"",startX:0,startY:0,downY:0,upY:0,maxX:0,posi:{x:0,y:0},damping:4,x:0,y:0,downfresh:!0,loadFinish:!1,isVertical:null,isHorizonal:null}},mounted:function(){this.translateX="translate3d(0,0,0)",this.translateY="translate3d(0,0,0)"},updated:function(){var t=this;this.$nextTick(function(){var e=Number.parseFloat(getComputedStyle(t.$refs.content).height);t.upY=e-Number.parseFloat(getComputedStyle(t.$refs.container).height),!t.horizonalMode&&t.isDownFresh?t.downY=Number.parseFloat(getComputedStyle(t.$refs.down).height):!t.horizonalMode&&t.isUpLoad&&(t.downY=Number.parseFloat(getComputedStyle(t.$refs.up).height));var i=Number.parseFloat(getComputedStyle(t.$refs.content).width);t.maxX=i-Number.parseFloat(getComputedStyle(t.$refs.container).width)})},computed:{translate:function(){return this.horizonalMode?this.translateX:this.translateY}},methods:{start:function(t){this.startTime=(new Date).getTime(),this.startX=t.touches[0].clientX,this.startY=t.touches[0].clientY,this.$emit("beforeScroll")},move:function(t){var e=t.changedTouches[0].clientX-this.startX,i=t.changedTouches[0].clientY-this.startY;if(this.transition="all 0s",this.horizonalMode||this.isVertical||(this.isVertical={flag:2*Math.abs(i)>Math.abs(e)}),this.horizonalMode&&!this.isHorizonal&&(this.isHorizonal={flag:Math.abs(e)>1.5*Math.abs(i)}),!this.horizonalMode&&this.isVertical.flag){var s=this.posi.y+i,a=this.isUpLoad?-this.upY-this.downY:-this.upY,n=!this.isUpLoad||this.loadFinish;if(s>=0)var r=0+s/this.damping;else if(n&&s<=a)var r=a+(s-a)/this.damping;this.translateY=s>=0||n&&s<=a?"translate3d(0,"+r+"px,0)":"translate3d(0,"+s+"px,0)",this.y=-Number.parseInt(this.$refs.content.style.transform.split("(")[1].split(",")[1])}else if(this.horizonalMode&&this.isHorizonal.flag){var o=this.posi.x+e;if(o>=0)var l=0+o/this.damping;else if(o<=-this.maxX)var l=-this.maxX+(o+this.maxX)/this.damping;o>=0||o<=-this.maxX?this.translateX="translate3d("+l+"px,0,0)":this.translateX="translate3d("+o+"px,0,0)",this.x=-Number.parseInt(this.$refs.content.style.transform.split("(")[1].split(",")[0])}this.$emit("scroll")},end:function(t){var e=this;this.snapping?this.transition="all 0.2s ease-out":this.transition="all 0.4s ease-out";var i=(new Date).getTime(),s=i-this.startTime,a=t.changedTouches[0].clientX-this.startX,n=t.changedTouches[0].clientY-this.startY;this.smooth&&s<=this.miniTime&&(this.horizonalMode?a=(t.changedTouches[0].clientX-this.startX)*s/60:n=(t.changedTouches[0].clientY-this.startY)*s/60),!this.horizonalMode&&this.isVertical&&this.isVertical.flag?(this.posi.y+=n,this.posi.y=Math.ceil(this.posi.y),this.posi.y>0?this.isDownFresh?this.posi.y>0&&this.posi.y/this.damping<this.downY?(this.posi.y=0,this.translateY="translate3d(0,"+this.posi.y+"px,0)",this.y=this.posi.y):this.posi.y/this.damping>=this.downY&&(this.translateY="translate3d(0,"+this.downY+"px,0)",this.downfresh=!1,setTimeout(function(){e.downfresh=!0,e.translateY="translate3d(0,0,0)",e.posi.y=0,e.y=e.posi.y,e.$emit("downFresh"),e.$emit("afterScroll")},1500)):(this.posi.y=0,this.translateY="translate3d(0,"+this.posi.y+"px,0)",this.y=this.posi.y):this.posi.y<=-this.upY?(this.posi.y=this.isUpLoad?-this.upY-this.downY:-this.upY,this.translateY="translate3d(0,"+this.posi.y+"px,0)",this.isUpLoad&&!this.loadFinish?setTimeout(function(){e.$emit("upLoad"),e.$emit("afterScroll"),e.y=-e.posi.y},1500):this.y=this.upY):(this.translateY="translate3d(0,"+this.posi.y+"px,0)",this.y=-this.posi.y),this.$emit("afterScroll")):this.horizonalMode&&this.isHorizonal&&this.isHorizonal.flag&&(this.posi.x+=a,this.posi.x=Math.ceil(this.posi.x),this.posi.x>0?(this.posi.x=0,this.translateX="translate3d("+this.posi.x+"px,0,0)",this.x=this.posi.x):this.posi.x<=-this.maxX?(this.posi.x=-this.maxX,this.translateX="translate3d("+this.posi.x+"px,0,0)",this.isUpLoad&&(this.$emit("upLoad"),this.x=-this.posi.x,this.$emit("afterScroll"))):(this.translateX="translate3d("+this.posi.x+"px,0,0)",this.x=-this.posi.x),this.$emit("afterScroll")),this.isVertical=null,this.isHorizonal=null},closeLoad:function(){this.loadFinish=!0},refreshLoad:function(){this.loadFinish=!1},getPosition:function(){return{x:this.x,y:this.y}},scrollTo:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.transition=e?"all 0.3s ease-out":"all 0s",this.horizonalMode?(this.posi.x=-t,this.translateX="translate3d("+this.posi.x+"px,0,0)",this.x=-this.posi.x):(this.posi.y=-t,this.translateY="translate3d("+this.posi.y+"px,0,0)",this.y=-this.posi.y)}}}},function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"container",staticClass:"_container"},[i("div",{ref:"content",staticClass:"_content",class:{horizonalMode:t.horizonalMode},style:{transition:t.transition,transform:t.translate},on:{touchstart:t.start,touchmove:t.move,touchend:t.end}},[!t.horizonalMode&&t.isDownFresh?i("div",{ref:"down",staticClass:"downfresh fresh"},[t.downfresh?i("div",[i("svg",{staticClass:"arrow",class:{arrow_active:-t.y>=t.downY},attrs:{"data-v-ecaca2b0":"",viewBox:"0 0 63.657 63.657","xml:space":"preserve"}},[i("g",[i("g",[i("g",[i("g",[i("polygon",{attrs:{points:"31.891,63.657 0.012,35.835 2.642,32.821 31.886,58.343 61.009,32.824 63.645,35.832",fill:"#AAA"}})])]),t._v(" "),i("g",[i("g",[i("rect",{attrs:{x:"29.827",width:"4",height:"60",fill:"#AAA"}})])])]),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g")]),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g"),t._v(" "),i("g")]),t._v(" "),i("p",[t._v("下拉刷新")])]):t._t("downrefresh",[i("svg",{staticClass:"spinner",attrs:{viewBox:"0 0 64 64"}},[i("g",{attrs:{"stroke-width":"7","stroke-linecap":"round"}},[i("line",{attrs:{x1:"10",x2:"10",y1:"27.3836",y2:"36.4931"}},[i("animate",{attrs:{attributeName:"y1",dur:"750ms",values:"16;18;28;18;16;16",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"y2",dur:"750ms",values:"48;46;36;44;48;48",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"stroke-opacity",dur:"750ms",values:"1;.4;.5;.8;1;1",repeatCount:"indefinite"}})]),i("line",{attrs:{x1:"24",x2:"24",y1:"18.6164",y2:"45.3836"}},[i("animate",{attrs:{attributeName:"y1",dur:"750ms",values:"16;16;18;28;18;16",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"y2",dur:"750ms",values:"48;48;46;36;44;48",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"stroke-opacity",dur:"750ms",values:"1;1;.4;.5;.8;1",repeatCount:"indefinite"}})]),i("line",{attrs:{x1:"38",x2:"38",y1:"16.1233",y2:"47.8767"}},[i("animate",{attrs:{attributeName:"y1",dur:"750ms",values:"18;16;16;18;28;18",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"y2",dur:"750ms",values:"44;48;48;46;36;44",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"stroke-opacity",dur:"750ms",values:".8;1;1;.4;.5;.8",repeatCount:"indefinite"}})]),i("line",{attrs:{x1:"52",x2:"52",y1:"16",y2:"48"}},[i("animate",{attrs:{attributeName:"y1",dur:"750ms",values:"28;18;16;16;18;28",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"y2",dur:"750ms",values:"36;44;48;48;46;36",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"stroke-opacity",dur:"750ms",values:".5;.8;1;1;.4;.5",repeatCount:"indefinite"}})])])])])],2):t._e(),t._v(" "),!t.horizonalMode&&t.isUpLoad?i("div",{ref:"up",staticClass:"upload fresh"},[t.loadFinish?t._t("nomore",[i("div",{staticClass:"nomore"},[t._v("没有更多内容了")])]):t._t("upload",[i("svg",{staticClass:"spinner",attrs:{viewBox:"0 0 64 64"}},[i("g",[i("circle",{attrs:{cx:"16",cy:"32","stroke-width":"0",r:"3"}},[i("animate",{attrs:{attributeName:"fill-opacity",dur:"750ms",values:".5;.6;.8;1;.8;.6;.5;.5",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"r",dur:"750ms",values:"3;3;4;5;6;5;4;3",repeatCount:"indefinite"}})]),i("circle",{attrs:{cx:"32",cy:"32","stroke-width":"0",r:"3.09351"}},[i("animate",{attrs:{attributeName:"fill-opacity",dur:"750ms",values:".5;.5;.6;.8;1;.8;.6;.5",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"r",dur:"750ms",values:"4;3;3;4;5;6;5;4",repeatCount:"indefinite"}})]),i("circle",{attrs:{cx:"48",cy:"32","stroke-width":"0",r:"4.09351"}},[i("animate",{attrs:{attributeName:"fill-opacity",dur:"750ms",values:".6;.5;.5;.6;.8;1;.8;.6",repeatCount:"indefinite"}}),i("animate",{attrs:{attributeName:"r",dur:"750ms",values:"5;4;3;3;4;5;6;5",repeatCount:"indefinite"}})])])])])],2):t._e(),t._v(" "),t._t("default")],2)])},a=[],n={render:s,staticRenderFns:a};e.a=n}])});
