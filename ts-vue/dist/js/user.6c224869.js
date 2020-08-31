(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user"],{"159b":function(e,t,a){var s=a("da84"),r=a("fdbc"),n=a("17c2"),i=a("9112");for(var o in r){var c=s[o],u=c&&c.prototype;if(u&&u.forEach!==n)try{i(u,"forEach",n)}catch(l){u.forEach=n}}},"17c2":function(e,t,a){"use strict";var s=a("b727").forEach,r=a("a640"),n=a("ae40"),i=r("forEach"),o=n("forEach");e.exports=i&&o?[].forEach:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}},"25a3":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user-add"},[e.loading?a("div",{staticClass:"loading"},[a("a-spin",{staticClass:"spin",attrs:{size:"large"}})],1):e._e(),e.loading?e._e():a("a-form",{attrs:{form:e.form},on:{submit:e.handleFormSubmit}},[a("a-form-item",{attrs:{label:"用户名","label-col":{span:6},"wrapper-col":{span:12},colon:"",required:"","has-feedback":""}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["userName",{initialValue:e.userName,rules:[{required:!0,message:"请输入用户名"},{pattern:e.$data.regUserName,message:"限英文字母、数字"}]}],expression:"['userName',\n        { initialValue: userName,rules: [{ required: true, message: '请输入用户名' },{ pattern: $data.regUserName, message: '限英文字母、数字' }] },\n      ]"}],staticClass:"int",attrs:{placeholder:"限英文字母、数字"}})],1),a("a-form-item",{attrs:{label:"姓名","label-col":{span:6},"wrapper-col":{span:12},colon:"",required:"","has-feedback":""}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{initialValue:e.name,rules:[{required:!0,message:"请输入用户名"},{pattern:e.$data.regName,message:"限中文、不超过5个字"}]}],expression:"['name',{initialValue: name, rules: [{ required: true, message: '请输入用户名' },{ pattern: $data.regName, message: '限中文、不超过5个字' }] },\n      ]"}],staticClass:"int",attrs:{placeholder:"限中文、不超过5个字"}})],1),a("a-form-item",{attrs:{label:"角色","label-col":{span:6},"wrapper-col":{span:12},required:""}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["role",{initialValue:e.role,rules:[{required:!0,message:"请选择角色"}]}],expression:"['role',{ initialValue: role, rules: [{ required: true, message: '请选择角色' }]}]"}],staticClass:"int"},[a("my-icon",{attrs:{slot:"suffixIcon",type:"icondown2"},slot:"suffixIcon"}),e._l(e.rolesList,(function(t){return a("a-select-option",{attrs:{value:t.id}},[e._v(e._s("SPEAKER"===t.name?"主讲老师":"辅导老师"))])}))],2)],1),a("a-form-item",{attrs:{label:"用户组","label-col":{span:6},"wrapper-col":{span:12}}},[a("div",{staticClass:"label-group"},[e.gz_groupsList.length?a("div",{staticClass:"group-panel"},e._l(e.gz_groupsList,(function(t,s){return a("span",{key:t.id,class:{active:!0===t.check},attrs:{"data-id":t.id},on:{click:function(a){return e.groupSelect(t.id)}}},[e._v(e._s(t.name)+" ")])})),0):e._e(),e.cz_groupsList.length?a("div",{staticClass:"group-panel"},e._l(e.cz_groupsList,(function(t,s){return a("span",{key:t.id,class:{active:!0===t.check},attrs:{"data-id":t.id},on:{click:function(a){return e.groupSelect(t.id)}}},[e._v(e._s(t.name)+" ")])})),0):e._e(),e.qt_groupsList.length?a("div",{staticClass:"group-panel"},e._l(e.qt_groupsList,(function(t,s){return a("span",{key:t.id,class:{active:!0===t.check},attrs:{"data-id":t.id},on:{click:function(a){return e.groupSelect(t.id)}}},[e._v(e._s(t.name)+" ")])})),0):e._e()]),a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["group",{initialValue:e.groups.length?JSON.stringify(e.groups):"",rules:[{required:!0,message:"请选择用户组"}]}],expression:"['group', { initialValue: groups.length ? JSON.stringify(groups):'',rules: [{ required: true, message: '请选择用户组' }]}]"}],staticClass:"int",attrs:{placeholder:"请选择用户组",type:"hidden"}})],1),a("a-form-item",{attrs:{"wrapper-col":{span:12,offset:6}}},[a("a-checkbox",{model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[e._v(" 立即启用 ")])],1),a("a-form-item",{attrs:{"wrapper-col":{span:12,offset:6}}},[a("a-button",{staticClass:"submit-btn",attrs:{type:"primary","html-type":"submit",loading:e.submitLoading}},[e._v(" 提交 ")])],1)],1)],1)},r=[],n=(a("4160"),a("c975"),a("a434"),a("b0c0"),a("159b"),a("d4ec")),i=a("bee2"),o=a("99de"),c=a("7e84"),u=a("262e"),l=a("9ab4"),d=a("60a3"),p=a("4c28"),f=a("b364"),g=a("fe69"),h=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(o["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.beforeRouteLeaveConfig={isEdit:!1,submit:!1},e.regUserName=f["c"],e.regName=f["a"],e.loading=!0,e.userName="",e.name="",e.role="",e.groups=[],e.submitLoading=!1,e.status=!1,e.rolesList=[],e.groupsList=[],e.cz_groupsList=[],e.gz_groupsList=[],e.qt_groupsList=[],e}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"beforeCreate",value:function(){var e=this;this.form=this.$form.createForm(this,{onFieldsChange:function(t){e.beforeRouteLeaveConfig.isEdit=!0}})}},{key:"handleFormSubmit",value:function(e){var t=this;e.preventDefault(),this.form.validateFields((function(e,a){if(!e){if(t.submitLoading)return;t.beforeRouteLeaveConfig.submit=!0,t.submitLoading=!0;var s=parseInt(t.$route.query.id);Object(p["c"])(s,a.userName,a.name,a.role,a.group,t.status).then((function(e){t.$message.success("修改成功！"),t.$router.push({path:"/setting/userlist"})})).catch((function(e){t.submitLoading=!1,"FS0010"===e.data.errcode?t.$message.error(t.$messagevalue.FS0010):t.$message.error(e.data.errmsg)}))}}))}},{key:"getGroupsList",value:function(){var e=this;Object(p["e"])().then((function(t){e.groupsList=t.data.retval,e.userDetail()})).catch((function(t){e.$message.error(t.data.errmsg)}))}},{key:"getRolesList",value:function(){var e=this;Object(p["f"])().then((function(t){e.rolesList=t.data.retval})).catch((function(t){e.$message.error(t.data.errmsg)}))}},{key:"setGroupsListCheck",value:function(){var e=this;this.groupsList.forEach((function(t){t.check=!1,e.groups.forEach((function(e){e===t.id&&(console.log(e),t.check=!0)}))}))}},{key:"groupSelect",value:function(e){var t=this;this.groupsList.forEach((function(a){if(a.id===e){var s=t.groups.indexOf(e);s>-1?t.groups.splice(s,1):t.groups.push(e)}})),this.beforeRouteLeaveConfig.isEdit=!0,this.setGroupsListCheck(),this.form.setFieldsValue({group:this.groups.length?JSON.stringify(this.groups):""})}},{key:"mounted",value:function(){this.getGroupsList(),this.getRolesList()}},{key:"userDetail",value:function(){var e=this,t=parseInt(this.$route.query.id);Object(p["g"])(t).then((function(t){var a=t.data.retval;e.userName=a.username,e.name=a.name,e.role=a.roleId,e.status="CLK"===a.status,a.groups.forEach((function(t){e.groups.push(t.id)})),e.$nextTick((function(){e.setGroupsListCheck()})),e.loading=!1})).catch((function(t){e.loading=!1,e.$message.error(t.data.errmsg)}))}},{key:"setgroupslist",value:function(e){var t=[],a=[],s=[];e.forEach((function(e){e.name.indexOf("初中")>-1?t.push(e):e.name.indexOf("高中")>-1?a.push(e):s.push(e)})),this.cz_groupsList=t,this.gz_groupsList=a,this.qt_groupsList=s}}]),t}(d["f"]);Object(l["a"])([Object(d["g"])("groupsList")],h.prototype,"setgroupslist",null),h=Object(l["a"])([Object(d["a"])({beforeRouteLeave:function(e,t,a){this.beforeRouteLeaveConfig.submit?a():this.beforeRouteLeaveConfig.isEdit?Object(g["a"])((function(){a()})):a()}})],h);var m=h,v=m,b=(a("d8e1"),a("2877")),y=Object(b["a"])(v,s,r,!1,null,"5c53a546",null);t["default"]=y.exports},"322a":function(e,t,a){"use strict";var s=a("60d3"),r=a.n(s);r.a},"408f":function(e,t,a){},"40e4":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user"},[a("div",{staticClass:"search"},[a("span",[a("label",[e._v("用户名：")]),a("a-input",{staticClass:"int",attrs:{placeholder:"请输入"},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1),a("span",[a("label",[e._v("姓名：")]),a("a-input",{staticClass:"int",attrs:{placeholder:"请输入"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("span",[a("a-button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")]),a("a-button",{staticClass:"res-btn",on:{click:e.reset}},[e._v("重置")])],1)]),a("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:e.addUser}},[e._v("添加用户")]),e.selectedRowKeys.length>0?a("a-alert",{staticClass:"userAlert",attrs:{type:"info",showIcon:""}},[a("div",{attrs:{slot:"message"},slot:"message"},[e._v(" 已选择 "),a("font",{attrs:{color:"$link-color"}},[e._v(e._s(e.selectedRowKeys.length))]),e._v(" 项 "),a("a",{staticClass:"deleteLink",attrs:{href:"javascript:void(0);"},on:{click:e.handleDelAll}},[e._v("批量禁用")])],1)]):e._e(),a("a-table",{staticClass:"userList",attrs:{rowSelection:e.rowSelection,rowKey:e.rowKey,columns:e.columns,dataSource:e.data,loading:!e.ready,pagination:e.paginationConf},on:{change:e.handlePageChange},scopedSlots:e._u([{key:"groups",fn:function(t){return a("span",{},[a("a-tooltip",{attrs:{placement:"topLeft"}},[e._l(t,(function(t,s){return s<2?a("a-tag",{key:t},[e._v(" "+e._s(t)+" ")]):e._e()})),e._v(" "+e._s(t.length>2?"...":"")+" "),t.length>2?a("template",{slot:"title"},e._l(t,(function(t,s){return a("span",{key:t,staticStyle:{"font-size":"12px"}},[e._v(e._s(s?"、":"")+e._s(t))])})),0):e._e()],2)],1)}},{key:"role",fn:function(t){return a("span",{},[e._v(" "+e._s("SPEAKER"===t?"主讲老师":"辅导老师")+" ")])}},{key:"status",fn:function(e){return a("status",{attrs:{color:"ELB"===e?"#FF462D":"#0CCE8F",backGroundColor:"ELB"===e?"#FFECEA":"#E6FAF3",text:"CLK"===e?"启用":"禁用",width:52}})}},{key:"operate",fn:function(t){return a("span",{staticClass:"operate"},[a("a",{attrs:{href:"javascript:void(0)"},on:{click:function(a){return e.editUser(t.id)}}},[e._v("编辑")]),a("a",{attrs:{href:"javascript:void(0)"},on:{click:function(a){return e.setPassworld(t)}}},[e._v("重置密码")]),a("a",{attrs:{href:"javascript:void(0)"},on:{click:function(a){return e.handleDel(t)}}},[e._v(e._s("CLK"===t.status?"禁用":"启用"))])])}}])}),a("a-modal",{staticClass:"password-pop",attrs:{title:"重置密码",keyboard:!1,closable:!1,width:"432px"},on:{ok:e.passwordHandleOk},model:{value:e.passwordModel.visible,callback:function(t){e.$set(e.passwordModel,"visible",t)},expression:"passwordModel.visible"}},[a("div",{staticClass:"item"},[a("div",{staticClass:"label"},[e._v("姓 名：")]),a("a-input",{staticClass:"int",attrs:{placeholder:"姓名",type:"text",readOnly:""},on:{change:e.passwordInputChange},model:{value:e.passwordModel.name,callback:function(t){e.$set(e.passwordModel,"name",t)},expression:"passwordModel.name"}})],1),a("div",{staticClass:"item"},[a("div",{staticClass:"label"},[e._v("新密码：")]),a("a-input",{staticClass:"int",attrs:{placeholder:"密码至少6位，不支持中文符号",type:"text"},on:{change:e.passwordInputChange},model:{value:e.passwordModel.text,callback:function(t){e.$set(e.passwordModel,"text",t)},expression:"passwordModel.text"}})],1),e.passwordModel.err?a("div",{staticClass:"password-err"},[e._v("密码至少6位，不支持中文符号")]):e._e()])],1)},r=[],n=(a("99af"),a("a15b"),a("d81d"),a("fb6a"),a("b0c0"),a("d3b7"),a("ac1f"),a("25f0"),a("466d"),a("1276"),a("cd17"),a("ed3b")),i=a("d4ec"),o=a("bee2"),c=a("99de"),u=a("7e84"),l=a("262e"),d=a("9ab4"),p=a("60a3"),f=a("4c28"),g=a("b364"),h=a("e532"),m=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.ready=!0,e.data=[],e.passwordModel={visible:!1,id:0,text:"",name:"",err:!1,reg:g["b"]},e.pageSize=20,e.paginationConf={total:0,showSizeChanger:!0,showTotal:function(e){return"共 ".concat(e," 条记录")},defaultPageSize:e.pageSize,pageSizeOptions:["10","20"],current:1},e.userName="",e.name="",e.searchUserName="",e.searchName="",e.columns=[{title:"用户名",dataIndex:"username"},{title:"姓名",dataIndex:"name"},{title:"角色",dataIndex:"role",scopedSlots:{customRender:"role"}},{title:"用户组",dataIndex:"groups",scopedSlots:{customRender:"groups"}},{title:"状态",align:"center",dataIndex:"status",scopedSlots:{customRender:"status"}},{title:"修改时间",align:"center",dataIndex:"updateTime"},{title:"操作",align:"center",scopedSlots:{customRender:"operate"}}],e.selectedRowKeys=[],e}return Object(l["a"])(t,e),Object(o["a"])(t,[{key:"onSelectChange",value:function(e){console.log("selectedRowKeys changed: ",e),this.selectedRowKeys=e}},{key:"handlePageChange",value:function(e){this.paginationConf.current=e.current,this.pageSize!==e.pageSize&&(this.paginationConf.current=1,this.pageSize=e.pageSize),this.userList(),document.body.scrollTop=document.documentElement.scrollTop=0}},{key:"mounted",value:function(){this.userList()}},{key:"search",value:function(){this.paginationConf.current=1,this.searchUserName=this.userName,this.searchName=this.name,this.userList()}},{key:"reset",value:function(){this.paginationConf.current=1,this.userName="",this.name="",this.searchUserName=this.userName,this.searchName=this.name,this.userList()}},{key:"userList",value:function(){var e=this;this.ready=!1,Object(f["h"])(this.paginationConf.current,this.pageSize,this.searchUserName,this.searchName).then((function(t){e.data=t.data.retval.users,e.paginationConf.total=t.data.retval.total,t.data.retval.total<=e.paginationConf.pageSize&&(e.paginationConf.itemRender=function(e,t,a){return"prev"===t?"":"next"===t?"":a}),e.ready=!0})).catch((function(t){e.$message.error(t.data.errmsg)}))}},{key:"rowKey",value:function(e){return"".concat(e.id,"&").concat(e.username)}},{key:"handleSelectKeyChange",value:function(e){this.selectedRowKeys=e}},{key:"editUser",value:function(e){this.$router.push({path:"/setting/useredit",query:{id:e.toString()}})}},{key:"addUser",value:function(){this.$router.push({path:"/setting/useradd"})}},{key:"getSelectUserNames",value:function(){return this.selectedRowKeys.map((function(e){return e.split("&")[1]}))}},{key:"getSelectUserIds",value:function(){return this.selectedRowKeys.map((function(e){return parseInt(e.split("&")[0])}))}},{key:"handleDel",value:function(e){var t=this,a=this.$createElement;n["a"].confirm({title:"".concat("CLK"===e.status?"禁用":"启用","确定"),icon:"none",keyboard:!1,content:a("div",{},[a("p","确认要".concat("CLK"===e.status?"禁用":"启用").concat(e.username,"用户吗？").concat("CLK"===e.status?"禁用后用户将无法登陆系统。":"启用后用户将正常登陆系统。"))]),okText:"确定",cancelText:"取消",onOk:function(){var a="CLK"===e.status?"ELB":"CLK";t.setChangeStatus([e.id],a)}})}},{key:"setChangeStatus",value:function(e,t){var a=this;Object(f["b"])(e,t).then((function(e){a.userList(),a.selectedRowKeys=[],a.$message.success("修改成功！")})).catch((function(e){a.$message.error(e.data.errmsg)}))}},{key:"handleDelAll",value:function(){var e=this,t="",a=this.getSelectUserNames();t=a.slice(0,3).join("、"),a.length>3&&(t+="…等".concat(a.length,"条记录"));var s=this.$createElement;n["a"].confirm({title:"批量禁用确定",icon:"none",keyboard:!1,content:s("div",{},[s("p","确认要禁用用户".concat(t,"吗？禁用后用户将无法登陆系统。"))]),okText:"确定",cancelText:"取消",onOk:function(){e.setChangeStatus(e.getSelectUserIds(),"ELB")}})}},{key:"setPassworld",value:function(e){this.passwordModel.visible=!0,this.passwordModel.id=e.id,this.passwordModel.err=!1,this.passwordModel.text="",this.passwordModel.name=e.name}},{key:"passwordHandleOk",value:function(){var e=this;if(!this.passwordModel.text.match(this.passwordModel.reg))return this.passwordModel.err=!0,!1;this.passwordModel.visible=!1,Object(f["i"])(this.passwordModel.id,this.passwordModel.text).then((function(t){e.$message.success("重置密码成功")})).catch((function(t){e.$message.error(t.data.errmsg)}))}},{key:"passwordInputChange",value:function(){this.passwordModel.text.match(this.passwordModel.reg)&&(this.passwordModel.err=!1),this.passwordModel.text||(this.passwordModel.err=!0)}},{key:"rowSelection",get:function(){var e=this.selectedRowKeys;return{selectedRowKeys:e,onChange:this.onSelectChange,hideDefaultSelections:!0,columnWidth:40,getCheckboxProps:function(e){return{props:{disabled:"ELB"===e.status}}}}}}]),t}(p["f"]);m=Object(d["a"])([Object(p["a"])({components:{status:h["a"]}})],m);var v=m,b=v,y=(a("da59"),a("cd5d"),a("2877")),k=Object(y["a"])(b,s,r,!1,null,"1e619d5c",null);t["default"]=k.exports},4160:function(e,t,a){"use strict";var s=a("23e7"),r=a("17c2");s({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},"466d":function(e,t,a){"use strict";var s=a("d784"),r=a("825a"),n=a("50c4"),i=a("1d80"),o=a("8aa5"),c=a("14c3");s("match",1,(function(e,t,a){return[function(t){var a=i(this),s=void 0==t?void 0:t[e];return void 0!==s?s.call(t,a):new RegExp(t)[e](String(a))},function(e){var s=a(t,e,this);if(s.done)return s.value;var i=r(e),u=String(this);if(!i.global)return c(i,u);var l=i.unicode;i.lastIndex=0;var d,p=[],f=0;while(null!==(d=c(i,u))){var g=String(d[0]);p[f]=g,""===g&&(i.lastIndex=o(u,n(i.lastIndex),l)),f++}return 0===f?null:p}]}))},"4d63":function(e,t,a){var s=a("83ab"),r=a("da84"),n=a("94ca"),i=a("7156"),o=a("9bf2").f,c=a("241c").f,u=a("44e7"),l=a("ad6d"),d=a("9f7f"),p=a("6eeb"),f=a("d039"),g=a("69f3").set,h=a("2626"),m=a("b622"),v=m("match"),b=r.RegExp,y=b.prototype,k=/a/g,w=/a/g,_=new b(k)!==k,C=d.UNSUPPORTED_Y,L=s&&n("RegExp",!_||C||f((function(){return w[v]=!1,b(k)!=k||b(w)==w||"/a/i"!=b(k,"i")})));if(L){var x=function(e,t){var a,s=this instanceof x,r=u(e),n=void 0===t;if(!s&&r&&e.constructor===x&&n)return e;_?r&&!n&&(e=e.source):e instanceof x&&(n&&(t=l.call(e)),e=e.source),C&&(a=!!t&&t.indexOf("y")>-1,a&&(t=t.replace(/y/g,"")));var o=i(_?new b(e,t):b(e,t),s?this:y,x);return C&&a&&g(o,{sticky:a}),o},O=function(e){e in x||o(x,e,{configurable:!0,get:function(){return b[e]},set:function(t){b[e]=t}})},S=c(b),j=0;while(S.length>j)O(S[j++]);y.constructor=x,x.prototype=y,p(r,"RegExp",x)}h("RegExp")},"60d3":function(e,t,a){},"6e84":function(e,t,a){},7156:function(e,t,a){var s=a("861d"),r=a("d2bb");e.exports=function(e,t,a){var n,i;return r&&"function"==typeof(n=t.constructor)&&n!==a&&s(i=n.prototype)&&i!==a.prototype&&r(e,i),e}},a15b:function(e,t,a){"use strict";var s=a("23e7"),r=a("44ad"),n=a("fc6a"),i=a("a640"),o=[].join,c=r!=Object,u=i("join",",");s({target:"Array",proto:!0,forced:c||!u},{join:function(e){return o.call(n(this),void 0===e?",":e)}})},a434:function(e,t,a){"use strict";var s=a("23e7"),r=a("23cb"),n=a("a691"),i=a("50c4"),o=a("7b0b"),c=a("65f0"),u=a("8418"),l=a("1dde"),d=a("ae40"),p=l("splice"),f=d("splice",{ACCESSORS:!0,0:0,1:2}),g=Math.max,h=Math.min,m=9007199254740991,v="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!p||!f},{splice:function(e,t){var a,s,l,d,p,f,b=o(this),y=i(b.length),k=r(e,y),w=arguments.length;if(0===w?a=s=0:1===w?(a=0,s=y-k):(a=w-2,s=h(g(n(t),0),y-k)),y+a-s>m)throw TypeError(v);for(l=c(b,s),d=0;d<s;d++)p=k+d,p in b&&u(l,d,b[p]);if(l.length=s,a<s){for(d=k;d<y-s;d++)p=d+s,f=d+a,p in b?b[f]=b[p]:delete b[f];for(d=y;d>y-s+a;d--)delete b[d-1]}else if(a>s)for(d=y-s;d>k;d--)p=d+s-1,f=d+a-1,p in b?b[f]=b[p]:delete b[f];for(d=0;d<a;d++)b[d+k]=arguments[d+2];return b.length=y-s+a,l}})},a640:function(e,t,a){"use strict";var s=a("d039");e.exports=function(e,t){var a=[][e];return!!a&&s((function(){a.call(null,t||function(){throw 1},1)}))}},ad84:function(e,t,a){"use strict";var s=a("afdc"),r=a.n(s);r.a},afdc:function(e,t,a){},b364:function(e,t,a){"use strict";a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return n}));a("4d63"),a("ac1f"),a("25f0");var s=new RegExp(/^[a-zA-Z0-9]+$/),r=new RegExp(/^[\u4e00-\u9fa5]{1,5}$/),n=new RegExp(/[~`!@#$%^&*()\-\+\=\{\[\}\]\|\:;\"\'<,>.?\/\w]{6,20}$/);new RegExp(/\|\|\|/g),new RegExp(/[\u4e00-\u9fa50-9~`!@#$%^&*()\-\+\=\{\[\}\]\|\:;\"\'<,>.?\/_]{1,2000}$/)},bee2:function(e,t,a){"use strict";function s(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function r(e,t,a){return t&&s(e.prototype,t),a&&s(e,a),e}a.d(t,"a",(function(){return r}))},c545:function(e,t,a){},c975:function(e,t,a){"use strict";var s=a("23e7"),r=a("4d64").indexOf,n=a("a640"),i=a("ae40"),o=[].indexOf,c=!!o&&1/[1].indexOf(1,-0)<0,u=n("indexOf"),l=i("indexOf",{ACCESSORS:!0,1:0});s({target:"Array",proto:!0,forced:c||!u||!l},{indexOf:function(e){return c?o.apply(this,arguments)||0:r(this,e,arguments.length>1?arguments[1]:void 0)}})},cd5d:function(e,t,a){"use strict";var s=a("c545"),r=a.n(s);r.a},d81d:function(e,t,a){"use strict";var s=a("23e7"),r=a("b727").map,n=a("1dde"),i=a("ae40"),o=n("map"),c=i("map");s({target:"Array",proto:!0,forced:!o||!c},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},d8e1:function(e,t,a){"use strict";var s=a("408f"),r=a.n(s);r.a},da59:function(e,t,a){"use strict";var s=a("6e84"),r=a.n(s);r.a},e532:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{staticClass:"status-ico",class:{"status-ico-small":"small"===e.size},style:e.style},[a("span",{style:{backgroundColor:e.color}}),e._v(" "+e._s(e.text)+" ")])},r=[],n=(a("99af"),a("d4ec")),i=a("bee2"),o=a("99de"),c=a("7e84"),u=a("262e"),l=a("9ab4"),d=a("60a3"),p=function(e){function t(){return Object(n["a"])(this,t),Object(o["a"])(this,Object(c["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"style",get:function(){return"color:".concat(this.color,";background-color: ").concat(this.backGroundColor,";width:").concat(this.width,"px;")}}]),t}(d["f"]);Object(l["a"])([Object(d["d"])({default:"normal"})],p.prototype,"size",void 0),Object(l["a"])([Object(d["d"])({default:"#0CCE8F"})],p.prototype,"color",void 0),Object(l["a"])([Object(d["d"])({default:"#E6FAF3"})],p.prototype,"backGroundColor",void 0),Object(l["a"])([Object(d["d"])({default:"启用"})],p.prototype,"text",void 0),Object(l["a"])([Object(d["d"])({default:62})],p.prototype,"width",void 0),p=Object(l["a"])([d["a"]],p);var f=p,g=f,h=(a("ad84"),a("2877")),m=Object(h["a"])(g,s,r,!1,null,"7d16aa9b",null);t["a"]=m.exports},fe69:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("cd17");var s=a("ed3b"),r="系统发现您还有内容没保存，确定要退出当前页面吗？";function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r;s["a"].confirm({title:"提示",icon:function(e){return e("a-icon",{props:{type:"exclamation-circle",theme:"filled"}})},keyboard:!1,content:t,okText:"确定",cancelText:"取消",onOk:function(){e()}})}},ff95:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user-add"},[e.loading?a("div",{staticClass:"loading"},[a("a-spin",{staticClass:"spin",attrs:{size:"large"}})],1):e._e(),e.loading?e._e():a("a-form",{attrs:{form:e.form},on:{submit:e.handleFormSubmit}},[a("a-form-item",{attrs:{label:"用户名","label-col":{span:6},"wrapper-col":{span:12},colon:"",required:"","has-feedback":""}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["userName",{initialValue:e.userName,rules:[{required:!0,message:"请输入用户名"},{pattern:e.$data.regUserName,message:"限英文字母、数字"}]}],expression:"['userName',\n        { initialValue: userName,rules: [{ required: true, message: '请输入用户名' },{ pattern: $data.regUserName, message: '限英文字母、数字' }] },\n      ]"}],staticClass:"int",attrs:{placeholder:"限英文字母、数字"}})],1),a("a-form-item",{attrs:{label:"姓名","label-col":{span:6},"wrapper-col":{span:12},colon:"",required:"","has-feedback":""}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{initialValue:e.name,rules:[{required:!0,message:"请输入用户名"},{pattern:e.$data.regName,message:"限中文、不超过5个字"}]}],expression:"['name',{initialValue: name, rules: [{ required: true, message: '请输入用户名' },{ pattern: $data.regName, message: '限中文、不超过5个字' }] },\n      ]"}],staticClass:"int",attrs:{placeholder:"限中文、不超过5个字"}})],1),a("a-form-item",{attrs:{label:"密码","label-col":{span:6},"wrapper-col":{span:12},colon:"",required:"","has-feedback":""}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{initialValue:e.passworld,rules:[{required:!0,message:"请输入密码"},{pattern:e.$data.regPassworld,message:"密码至少6位，不支持中文符号"}]}],expression:"['password', { initialValue: passworld,rules: [{ required: true, message: '请输入密码' },{ pattern: $data.regPassworld, message: '密码至少6位，不支持中文符号' }]}]"}],staticClass:"int",attrs:{placeholder:"密码至少6位，不支持中文符号"}})],1),a("a-form-item",{attrs:{label:"角色","label-col":{span:6},"wrapper-col":{span:12},required:""}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["role",{initialValue:e.role,rules:[{required:!0,message:"请选择角色"}]}],expression:"['role',{ initialValue: role, rules: [{ required: true, message: '请选择角色' }]}]"}],staticClass:"int"},[a("my-icon",{attrs:{slot:"suffixIcon",type:"icondown2"},slot:"suffixIcon"}),e._l(e.rolesList,(function(t){return a("a-select-option",{attrs:{value:t.id}},[e._v(e._s("SPEAKER"===t.name?"主讲老师":"辅导老师"))])}))],2)],1),a("a-form-item",{attrs:{label:"用户组","label-col":{span:6},"wrapper-col":{span:12}}},[a("div",{staticClass:"label-group"},[e.gz_groupsList.length?a("div",{staticClass:"group-panel"},e._l(e.gz_groupsList,(function(t,s){return a("span",{key:t.id,class:{active:!0===t.check},attrs:{"data-id":t.id},on:{click:function(a){return e.groupSelect(t.id)}}},[e._v(e._s(t.name)+" ")])})),0):e._e(),e.cz_groupsList.length?a("div",{staticClass:"group-panel"},e._l(e.cz_groupsList,(function(t,s){return a("span",{key:t.id,class:{active:!0===t.check},attrs:{"data-id":t.id},on:{click:function(a){return e.groupSelect(t.id)}}},[e._v(e._s(t.name)+" ")])})),0):e._e(),e.qt_groupsList.length?a("div",{staticClass:"group-panel"},e._l(e.qt_groupsList,(function(t,s){return a("span",{key:t.id,class:{active:!0===t.check},attrs:{"data-id":t.id},on:{click:function(a){return e.groupSelect(t.id)}}},[e._v(e._s(t.name)+" ")])})),0):e._e()]),a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["group",{initialValue:e.groups.length?JSON.stringify(e.groups):"",rules:[{required:!0,message:"请选择用户组"}]}],expression:"['group', { initialValue: groups.length ? JSON.stringify(groups):'',rules: [{ required: true, message: '请选择用户组' }]}]"}],staticClass:"int",attrs:{placeholder:"请选择用户组",type:"hidden"}})],1),a("a-form-item",{attrs:{"wrapper-col":{span:12,offset:6}}},[a("a-checkbox",{model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[e._v(" 立即启用 ")])],1),a("a-form-item",{attrs:{"wrapper-col":{span:12,offset:6}}},[a("a-button",{staticClass:"submit-btn",attrs:{type:"primary","html-type":"submit",loading:e.submitLoading}},[e._v(" 提交 ")])],1)],1)],1)},r=[],n=(a("4160"),a("c975"),a("a434"),a("b0c0"),a("159b"),a("d4ec")),i=a("bee2"),o=a("99de"),c=a("7e84"),u=a("262e"),l=a("9ab4"),d=a("60a3"),p=a("4c28"),f=a("b364"),g=a("fe69"),h=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(o["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.beforeRouteLeaveConfig={submit:!1},e.regUserName=f["c"],e.regName=f["a"],e.regPassworld=f["b"],e.loading=!0,e.userName="",e.name="",e.passworld="",e.role="",e.groups=[],e.status=!0,e.submitLoading=!1,e.rolesList=[],e.groupsList=[],e.cz_groupsList=[],e.gz_groupsList=[],e.qt_groupsList=[],e}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"mounted",value:function(){this.getGroupsList(),this.getRolesList()}},{key:"beforeCreate",value:function(){this.form=this.$form.createForm(this)}},{key:"handleFormSubmit",value:function(e){var t=this;e.preventDefault(),this.form.validateFields((function(e,a){if(!e){if(t.submitLoading)return;t.beforeRouteLeaveConfig.submit=!0,t.submitLoading=!0,Object(p["a"])(a.userName,a.name,a.password,a.role,a.group,t.status).then((function(e){t.submitLoading=!1,t.$message.success("添加成功！"),t.$router.push({path:"/setting/userlist"})})).catch((function(e){t.submitLoading=!1,"FS0010"===e.data.errcode?t.$message.error(t.$messagevalue.FS0010):t.$message.error(e.data.errmsg)}))}}))}},{key:"getGroupsList",value:function(){var e=this;Object(p["e"])().then((function(t){e.groupsList=t.data.retval,e.loading=!1})).catch((function(t){e.loading=!1,e.$message.error(t.data.errmsg)}))}},{key:"getRolesList",value:function(){var e=this;Object(p["f"])().then((function(t){e.rolesList=t.data.retval,e.role=e.rolesList.length?e.rolesList[0].id:""})).catch((function(t){e.$message.error(t.data.errmsg)}))}},{key:"setGroupsListCheck",value:function(){var e=this;this.groupsList.forEach((function(t){t.check=!1,e.groups.forEach((function(e){e===t.id&&(console.log(e),t.check=!0)}))}))}},{key:"groupSelect",value:function(e){var t=this;this.groupsList.forEach((function(a){if(a.id===e){var s=t.groups.indexOf(e);s>-1?t.groups.splice(s,1):t.groups.push(e)}})),this.setGroupsListCheck(),this.form.setFieldsValue({group:this.groups.length?JSON.stringify(this.groups):""})}},{key:"setgroupslist",value:function(e){var t=[],a=[],s=[];e.forEach((function(e){e.name.indexOf("初中")>-1?t.push(e):e.name.indexOf("高中")>-1?a.push(e):s.push(e)})),this.cz_groupsList=t,this.gz_groupsList=a,this.qt_groupsList=s}}]),t}(d["f"]);Object(l["a"])([Object(d["g"])("groupsList")],h.prototype,"setgroupslist",null),h=Object(l["a"])([Object(d["a"])({beforeRouteLeave:function(e,t,a){if(this.beforeRouteLeaveConfig.submit)a();else{var s=this.form.getFieldsValue();s.userName||s.name||s.password||s.group?Object(g["a"])((function(){a()})):a()}}})],h);var m=h,v=m,b=(a("322a"),a("2877")),y=Object(b["a"])(v,s,r,!1,null,"59d4f5de",null);t["default"]=y.exports}}]);
//# sourceMappingURL=user.6c224869.js.map