(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["manage"],{"03db":function(e,t,a){},"1e26":function(e,t,a){"use strict";var n=a("03db"),o=a.n(n);o.a},"24b8":function(e,t,a){"use strict";var n=a("6412"),o=a.n(n);o.a},2830:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"manage-forbidden"},[a("div",{staticClass:"search"},[a("span",[a("label",[e._v("姓名：")]),a("a-input",{staticClass:"int",attrs:{placeholder:"请输入"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("span",[a("label",[e._v("学员ID：")]),a("a-input",{staticClass:"int-2",attrs:{placeholder:"请输入"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("a-button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")]),a("a-button",{staticClass:"res-btn",on:{click:e.reset}},[e._v("重置")])],1),a("a-table",{staticClass:"list",attrs:{columns:e.columns,dataSource:e.data,loading:!e.ready,pagination:e.paginationConf},on:{change:e.handlePageChange}})],1)},o=[],i=(a("99af"),a("b0c0"),a("d4ec")),r=a("bee2"),s=a("99de"),c=a("7e84"),u=a("262e"),l=a("9ab4"),d=a("60a3"),f=a("e532"),h=a("6e0d"),b=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(s["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.channelId=520186,e.ready=!1,e.name="",e.status="SELECT",e.data=[],e.pageSize=20,e.paginationConf={total:0,showSizeChanger:!0,showTotal:function(e){return"共 ".concat(e," 条记录")},defaultPageSize:e.pageSize,pageSizeOptions:["10","20"],current:1},e.columns=[{title:"学员ID",dataIndex:"id"},{title:"学员姓名",dataIndex:"name"}],e.selectedRowKeys=[],e}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"mounted",value:function(){this.list()}},{key:"search",value:function(){}},{key:"reset",value:function(){}},{key:"onChange",value:function(e,t){console.log(e,t)}},{key:"onSelectChange",value:function(e){console.log("selectedRowKeys changed: ",e)}},{key:"handlePageChange",value:function(e){this.paginationConf.current=e.current,this.pageSize!==e.pageSize&&(this.paginationConf.current=1,this.pageSize=e.pageSize),this.list(),document.body.scrollTop=document.documentElement.scrollTop=0}},{key:"list",value:function(){this.ready=!0,this.data=[{id:12,name:"张三",time:"2019-12-12: 10:22"},{id:23,name:"张三",time:"2019-12-12: 10:22"}],Object(h["a"])(this.channelId,this.paginationConf.current,this.pageSize).then((function(e){console.log(e)}))}},{key:"rowKey",value:function(e){return"".concat(e.id,"&").concat(e.username)}},{key:"handleSelectKeyChange",value:function(e){this.selectedRowKeys=e}}]),t}(d["f"]);b=Object(l["a"])([Object(d["a"])({components:{status:f["a"]}})],b);var p=b,v=p,y=(a("a300"),a("2877")),m=Object(y["a"])(v,n,o,!1,null,"4583eef7",null);t["default"]=m.exports},"4dc1":function(e,t,a){"use strict";var n=a("eb5d"),o=a.n(n);o.a},"4e24":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",{staticClass:"tabs"},e._l(e.lists,(function(t,n){return a("li",{key:n,staticClass:"panel"},[a("router-link",{attrs:{to:t.path}},[e._v(e._s(t.name))])],1)})),0)},o=[],i=a("d4ec"),r=a("99de"),s=a("7e84"),c=a("262e"),u=a("9ab4"),l=a("60a3"),d=function(e){function t(){return Object(i["a"])(this,t),Object(r["a"])(this,Object(s["a"])(t).apply(this,arguments))}return Object(c["a"])(t,e),t}(l["f"]);Object(u["a"])([Object(l["d"])({type:Array,default:function(){return[]}})],d.prototype,"lists",void 0),d=Object(u["a"])([l["a"]],d);var f=d,h=f,b=(a("1e26"),a("2877")),p=Object(b["a"])(h,n,o,!1,null,"a5f21f08",null);t["a"]=p.exports},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,a){var n=a("1d80"),o=a("5899"),i="["+o+"]",r=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),c=function(e){return function(t){var a=String(n(t));return 1&e&&(a=a.replace(r,"")),2&e&&(a=a.replace(s,"")),a}};e.exports={start:c(1),end:c(2),trim:c(3)}},6412:function(e,t,a){},"6e0d":function(e,t,a){"use strict";a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return s})),a.d(t,"d",(function(){return c}));var n=a("759a"),o=a("ee50");function i(e,t,a,i,r,s,c){var u={url:"".concat(n["b"],"/bullet/screen/list"),method:"POST",data:{channelId:e,current:t,size:a}};return"undefined"!==typeof i&&(u.data.subjectId=i),"undefined"!==typeof r&&(u.data.studentName=r),"undefined"!==typeof s&&(u.data.screenContent=s),"undefined"!==typeof c&&(u.data.sendDate=c),Object(o["a"])(u)}function r(e,t,a,i,r,s){var c={url:"".concat(n["b"],"/estoppel/list"),method:"POST",data:{channelId:e,current:t,size:a}};return"undefined"!==typeof i&&(c.data.subjectId=i),"undefined"!==typeof r&&(c.data.studentName=r),"undefined"!==typeof s&&(c.data.sendDate=s),Object(o["a"])(c)}function s(e,t,a){var i={url:"".concat(n["b"],"/sensitive/word/list"),method:"POST",data:{channelId:e}};return"undefined"!==typeof t&&(i.data.subjectId=t),"undefined"!==typeof a&&(i.data.planId=a),Object(o["a"])(i)}function c(e,t,a,i){var r={url:"".concat(n["b"],"/sensitive/word/save"),method:"POST",data:{channelId:e,words:t}};return"undefined"!==typeof a&&(r.data.subjectId=a),"undefined"!==typeof i&&(r.data.planId=i),Object(o["a"])(r)}},7156:function(e,t,a){var n=a("861d"),o=a("d2bb");e.exports=function(e,t,a){var i,r;return o&&"function"==typeof(i=t.constructor)&&i!==a&&n(r=i.prototype)&&r!==a.prototype&&o(e,r),e}},7544:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"manage-keyword"},[a("div",{staticClass:"left font-14pt-title"},[e._v("敏感词：")]),a("div",{staticClass:"right"},[a("a-textarea",{staticClass:"keyword-textarea",attrs:{rows:9},on:{change:e.handleKeyWordChange},model:{value:e.keyWord,callback:function(t){e.keyWord=t},expression:"keyWord"}}),a("div",{staticClass:"keyword-count font-12pt-body"},[e._v("共"+e._s(e.keyWordList.length)+"个")]),a("a-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("提交")])],1)])},o=[],i=(a("a15b"),a("a9e3"),a("ac1f"),a("1276"),a("d4ec")),r=a("bee2"),s=a("99de"),c=a("7e84"),u=a("262e"),l=a("9ab4"),d=a("60a3"),f=a("6e0d"),h=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(s["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.roomId=0,e.character="，",e.keyWord="",e.keyWordList=[],e}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"mounted",value:function(){var e=this;void 0!==this.$route.query.roomId&&""!==this.$route.query.roomId?(this.$route.query.roomId&&(this.roomId=Number(this.$route.query.roomId)),Object(f["b"])(this.roomId).then((function(t){"0"===t.data.errcode?(e.keyWordList=t.data.retval.sensitives,e.keyWord=t.data.retval.sensitives.join(e.character)):e.$message.error("查询敏感词失败")}))):this.$message.error("没有频道id!")}},{key:"handleKeyWordChange",value:function(){this.keyWordList=this.keyWord.split(this.character),"string"===typeof this.keyWordList[this.keyWordList.length-1]&&""!==this.keyWordList[this.keyWordList.length-1]||this.keyWordList.pop()}},{key:"handleSubmit",value:function(e){var t=this;Object(f["d"])(this.roomId,this.keyWordList).then((function(e){"0"===e.data.errcode&&t.$message.success("保存成功")}))}}]),t}(d["f"]);h=Object(l["a"])([d["a"]],h);var b=h,p=b,v=(a("24b8"),a("2877")),y=Object(v["a"])(p,n,o,!1,null,"acd5b708",null);t["default"]=y.exports},"799e":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"manage-barrage"},[a("div",{staticClass:"search"},[a("div",[a("span",[a("label",[e._v("姓名：")]),a("a-input",{staticClass:"int",attrs:{placeholder:"请输入"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("span",[a("label",[e._v("学员ID：")]),a("a-input",{staticClass:"int-2",attrs:{placeholder:"请输入"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("span",[a("label",[e._v("弹幕内容：")]),a("a-input",{staticClass:"int-3",attrs:{placeholder:"请输入"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("a-button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")]),a("a-button",{staticClass:"res-btn",on:{click:e.reset}},[e._v("重置")])],1)]),a("a-alert",{staticClass:"userAlert",attrs:{type:"info",showIcon:""}},[a("div",{attrs:{slot:"message"},slot:"message"},[e._v(" 已选择 "),a("font",{attrs:{color:"$link-color"}},[e._v("2")]),e._v(" 项 "),a("a",{staticClass:"deleteLink",attrs:{href:"javascript:void(0);"}},[e._v("批量删除")])],1)]),a("a-table",{staticClass:"list",attrs:{rowSelection:e.rowSelection,rowKey:e.rowKey,columns:e.columns,dataSource:e.data,loading:!e.ready,pagination:e.paginationConf},on:{change:e.handlePageChange},scopedSlots:e._u([{key:"operate",fn:function(t){return a("span",{staticClass:"operate"},[a("a",{attrs:{href:"javascript:void(0)"},on:{click:function(a){return e.editUser(t.id)}}},[e._v("删除")])])}}])})],1)},o=[],i=(a("99af"),a("b0c0"),a("d4ec")),r=a("bee2"),s=a("99de"),c=a("7e84"),u=a("262e"),l=a("9ab4"),d=a("60a3"),f=a("e532"),h=a("6e0d"),b=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(s["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.channelId=520186,e.ready=!1,e.name="",e.status="SELECT",e.data=[],e.pageSize=20,e.paginationConf={total:0,showSizeChanger:!0,showTotal:function(e){return"共 ".concat(e," 条记录")},defaultPageSize:e.pageSize,pageSizeOptions:["10","20"],current:1},e.columns=[{title:"学员ID",dataIndex:"id"},{title:"学员姓名",dataIndex:"name"},{title:"弹幕内容",dataIndex:"barrage"},{title:"操作",align:"center",scopedSlots:{customRender:"operate"}}],e.selectedRowKeys=[],e}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"mounted",value:function(){this.list()}},{key:"search",value:function(){}},{key:"reset",value:function(){}},{key:"onChange",value:function(e,t){console.log(e,t)}},{key:"onSelectChange",value:function(e){console.log("selectedRowKeys changed: ",e),this.selectedRowKeys=e}},{key:"handlePageChange",value:function(e){this.paginationConf.current=e.current,this.pageSize!==e.pageSize&&(this.paginationConf.current=1,this.pageSize=e.pageSize),this.list(),document.body.scrollTop=document.documentElement.scrollTop=0}},{key:"list",value:function(){this.ready=!0,this.data=[{id:12,name:"张三",barrage:"张老师讲课真棒，哔哔哔",time:"2019-12-12: 10:22"},{id:23,name:"张三",barrage:"张老师讲课真棒，哔哔哔",time:"2019-12-12: 10:22"}],Object(h["c"])(this.channelId,this.paginationConf.current,this.pageSize).then((function(e){console.log(e)}))}},{key:"rowKey",value:function(e){return"".concat(e.id,"&").concat(e.username)}},{key:"handleSelectKeyChange",value:function(e){this.selectedRowKeys=e}},{key:"rowSelection",get:function(){var e=this.selectedRowKeys;return{selectedRowKeys:e,onChange:this.onSelectChange,hideDefaultSelections:!0,columnWidth:40,getCheckboxProps:function(e){return{props:{disabled:"ELB"===e.status}}}}}}]),t}(d["f"]);b=Object(l["a"])([Object(d["a"])({components:{status:f["a"]}})],b);var p=b,v=p,y=(a("4dc1"),a("2877")),m=Object(y["a"])(v,n,o,!1,null,"6cd4e318",null);t["default"]=m.exports},a15b:function(e,t,a){"use strict";var n=a("23e7"),o=a("44ad"),i=a("fc6a"),r=a("a640"),s=[].join,c=o!=Object,u=r("join",",");n({target:"Array",proto:!0,forced:c||!u},{join:function(e){return s.call(i(this),void 0===e?",":e)}})},a300:function(e,t,a){"use strict";var n=a("b3fb"),o=a.n(n);o.a},a434:function(e,t,a){"use strict";var n=a("23e7"),o=a("23cb"),i=a("a691"),r=a("50c4"),s=a("7b0b"),c=a("65f0"),u=a("8418"),l=a("1dde"),d=a("ae40"),f=l("splice"),h=d("splice",{ACCESSORS:!0,0:0,1:2}),b=Math.max,p=Math.min,v=9007199254740991,y="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!f||!h},{splice:function(e,t){var a,n,l,d,f,h,m=s(this),g=r(m.length),j=o(e,g),O=arguments.length;if(0===O?a=n=0:1===O?(a=0,n=g-j):(a=O-2,n=p(b(i(t),0),g-j)),g+a-n>v)throw TypeError(y);for(l=c(m,n),d=0;d<n;d++)f=j+d,f in m&&u(l,d,m[f]);if(l.length=n,a<n){for(d=j;d<g-n;d++)f=d+n,h=d+a,f in m?m[h]=m[f]:delete m[h];for(d=g;d>g-n+a;d--)delete m[d-1]}else if(a>n)for(d=g-n;d>j;d--)f=d+n-1,h=d+a-1,f in m?m[h]=m[f]:delete m[h];for(d=0;d<a;d++)m[d+j]=arguments[d+2];return m.length=g-n+a,l}})},a9e3:function(e,t,a){"use strict";var n=a("83ab"),o=a("da84"),i=a("94ca"),r=a("6eeb"),s=a("5135"),c=a("c6b6"),u=a("7156"),l=a("c04e"),d=a("d039"),f=a("7c73"),h=a("241c").f,b=a("06cf").f,p=a("9bf2").f,v=a("58a8").trim,y="Number",m=o[y],g=m.prototype,j=c(f(g))==y,O=function(e){var t,a,n,o,i,r,s,c,u=l(e,!1);if("string"==typeof u&&u.length>2)if(u=v(u),t=u.charCodeAt(0),43===t||45===t){if(a=u.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+u}for(i=u.slice(2),r=i.length,s=0;s<r;s++)if(c=i.charCodeAt(s),c<48||c>o)return NaN;return parseInt(i,n)}return+u};if(i(y,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var k,C=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof C&&(j?d((function(){g.valueOf.call(a)})):c(a)!=y)?u(new m(O(t)),a,C):O(t)},I=n?h(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;I.length>S;S++)s(m,k=I[S])&&!s(C,k)&&p(C,k,b(m,k));C.prototype=g,g.constructor=C,r(o,y,C)}},ad84:function(e,t,a){"use strict";var n=a("afdc"),o=a.n(n);o.a},ae1d:function(e,t,a){"use strict";var n=a("c1b0"),o=a.n(n);o.a},afdc:function(e,t,a){},b3fb:function(e,t,a){},c1b0:function(e,t,a){},d027:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Layout",[a("breadcrumb",{attrs:{list:e.breadcrumbList}}),a("div",{staticClass:"manage"},[a("tabs",{attrs:{lists:e.tabsList}}),a("div",{staticClass:"container"},[a("router-view")],1)],1)],1)},o=[],i=(a("a434"),a("d4ec")),r=a("bee2"),s=a("99de"),c=a("7e84"),u=a("262e"),l=a("9ab4"),d=a("60a3"),f=a("cb2f"),h=a("608d"),b=a("4e24"),p=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(s["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.tabsList=[{name:"敏感词设置",path:"/manage/keyword"}],e.breadcrumbList=[{name:"home",path:"/",title:"首页"},{name:"manage",path:"/manage",title:"管理"}],e}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"mounted",value:function(){this.setCourseInfo()}},{key:"setCourseInfo",value:function(){var e=this.$route.query.courseTitle;if(e){var t={title:e,name:"course",path:"/course"};this.breadcrumbList.splice(1,0,t)}}}]),t}(d["f"]);p=Object(l["a"])([Object(d["a"])({components:{Layout:f["a"],Breadcrumb:h["a"],Tabs:b["a"]}})],p);var v=p,y=v,m=(a("ae1d"),a("2877")),g=Object(m["a"])(y,n,o,!1,null,"c39a3180",null);t["default"]=g.exports},e532:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{staticClass:"status-ico",class:{"status-ico-small":"small"===e.size},style:e.style},[a("span",{style:{backgroundColor:e.color}}),e._v(" "+e._s(e.text)+" ")])},o=[],i=(a("99af"),a("d4ec")),r=a("bee2"),s=a("99de"),c=a("7e84"),u=a("262e"),l=a("9ab4"),d=a("60a3"),f=function(e){function t(){return Object(i["a"])(this,t),Object(s["a"])(this,Object(c["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(r["a"])(t,[{key:"style",get:function(){return"color:".concat(this.color,";background-color: ").concat(this.backGroundColor,";width:").concat(this.width,"px;")}}]),t}(d["f"]);Object(l["a"])([Object(d["d"])({default:"normal"})],f.prototype,"size",void 0),Object(l["a"])([Object(d["d"])({default:"#0CCE8F"})],f.prototype,"color",void 0),Object(l["a"])([Object(d["d"])({default:"#E6FAF3"})],f.prototype,"backGroundColor",void 0),Object(l["a"])([Object(d["d"])({default:"启用"})],f.prototype,"text",void 0),Object(l["a"])([Object(d["d"])({default:62})],f.prototype,"width",void 0),f=Object(l["a"])([d["a"]],f);var h=f,b=h,p=(a("ad84"),a("2877")),v=Object(p["a"])(b,n,o,!1,null,"7d16aa9b",null);t["a"]=v.exports},eb5d:function(e,t,a){}}]);
//# sourceMappingURL=manage.c4fdf584.js.map