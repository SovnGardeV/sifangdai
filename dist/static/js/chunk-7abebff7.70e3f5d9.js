(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7abebff7"],{1381:function(e,t,a){"use strict";var n=a("69a0"),r=a.n(n);r.a},"1f27":function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"c",(function(){return i})),a.d(t,"b",(function(){return l}));var n=a("b775");function r(e){return Object(n["a"])({url:"/instead-pay-web/menu/addMenu",method:"POST","Content-Type":"multipart/form-data",data:e})}function i(){return Object(n["a"])({url:"/instead-pay-web/menu/queryMenu",method:"POST"})}function l(e){return Object(n["a"])({url:"/instead-pay-web/menu/addRoleMenu",method:"POST",data:e})}},"456d":function(e,t,a){var n=a("4bf8"),r=a("0d58");a("5eda")("keys",(function(){return function(e){return r(n(e))}}))},"5eda":function(e,t,a){var n=a("5ca1"),r=a("8378"),i=a("79e5");e.exports=function(e,t){var a=(r.Object||{})[e]||Object[e],l={};l[e]=t(a),n(n.S+n.F*i((function(){a(1)})),"Object",l)}},"69a0":function(e,t,a){},"738b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"body-container"},[a("el-row",{staticClass:"full-height",attrs:{gutter:10}},[a("el-col",{staticClass:"full-height",attrs:{span:4}},[a("el-card",{staticClass:"full-height",staticStyle:{position:"relative"}},[a("el-tree",{staticClass:"over-content",attrs:{data:e.tree.array,props:{label:"menuName"},"expand-on-click-node":!1,accordion:""},on:{"node-click":e.handleNodeClick}}),e._v(" "),a("el-button",{staticClass:"bottom-btn",attrs:{size:"small",icon:"el-icon-box"},on:{click:e.backToRootMenu}},[e._v("返回根目录")])],1)],1),e._v(" "),a("el-col",{staticClass:"full-height",attrs:{span:20}},[a("el-card",{staticClass:"full-height"},[a("el-row",{staticStyle:{"margin-bottom":"10px"}},[a("i",{staticClass:"el-icon-folder",staticStyle:{"font-weight":"bold"}}),e._v(" "),a("span",{staticStyle:{"font-size":"13px","margin-left":"10px"}},[e._v(e._s("菜单名："+(e.parentNodeInfo.menuName||"根目录")))]),e._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"primary",size:"mini"},on:{click:e.addMenu}},[e._v("新增目录")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.mainTable.loading,expression:"mainTable.loading"}],attrs:{data:e.mainTable.array,"element-loading-text":"加载中，请稍候","element-loading-spinner":"el-icon-loading",border:"",stripe:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"菜单名",prop:"menuName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"菜单路径",prop:"menuUrl"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"一级目录"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(t.row.parentName||"root")+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"路由",prop:"urlPre"}})],1)],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{width:"400px",center:"",title:"新增目录",visible:e.mainTable.dialogFormVisible},on:{"update:visible":function(t){return e.$set(e.mainTable,"dialogFormVisible",t)}}},[a("el-form",{ref:"form",attrs:{model:e.mainTable.form,rules:e.mainTable.formRules}},[a("el-form-item",{attrs:{label:"菜单名","label-width":"80px",prop:"menuName"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.mainTable.form.menuName,callback:function(t){e.$set(e.mainTable.form,"menuName",t)},expression:"mainTable.form.menuName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"菜单路径","label-width":"80px",prop:"menuUrl"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.mainTable.form.menuUrl,callback:function(t){e.$set(e.mainTable.form,"menuUrl",t)},expression:"mainTable.form.menuUrl"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"路由","label-width":"80px"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.mainTable.form.urlPre,callback:function(t){e.$set(e.mainTable.form,"urlPre",t)},expression:"mainTable.form.urlPre"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.mainTable.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.handleSubmitForm}},[e._v("确 定")])],1)],1)],1)},r=[],i=(a("ac6a"),a("456d"),a("1f27")),l=a("ed08"),o={data:function(){var e=this;return{tree:{array:e.$store.getters.router},mainTable:{dialogFormVisible:!1,loading:!1,array:[],form:{menuName:"",menuUrl:"",urlPre:"",parentId:"root",commercialNumber:localStorage.getItem("number")},formRules:{menuName:[{required:!0,trigger:"blur"}],menuUrl:[{required:!0,trigger:"blur"}]},pager:{index:1,pager:1,size:10}},parentNodeInfo:{},cache:{array:[]}}},created:function(){this.getMainTreeData()},methods:{addMenu:function(){this.mainTable.dialogFormVisible=!0,this.initForm()},initForm:function(){var e=this,t=Object.keys(this.mainTable.form);t.forEach((function(t){"commercialNumber"!==t&&(e.mainTable.form[t]="")})),this.$nextTick((function(t){e.$refs.form.clearValidate()}))},getMainTreeData:function(){var e=this;this.mainTable.loading=!0,Object(i["c"])().then((function(t){e.tree.array=e.cache.array=e.mainTable.array=Object(l["b"])(t.rows)||[]})).finally((function(t){e.mainTable.loading=!1}))},handleNodeClick:function(e){this.parentNodeInfo=e,this.mainTable.array=e.children||[]},handleSubmitForm:function(){var e=this;this.mainTable.form.parentId=this.parentNodeInfo.menuId||"root",Object(i["a"])(this.mainTable.form).then((function(t){"10000"===t.errorCode&&(e.$message({type:"success",message:t.mes}),e.getMainTreeData(),e.mainTable.dialogFormVisible=!1)}))},backToRootMenu:function(){this.parentNodeInfo={},this.mainTable.array=this.cache.array}}},s=o,c=(a("1381"),a("2877")),m=Object(c["a"])(s,n,r,!1,null,null,null);t["default"]=m.exports}}]);