(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-670b6eb8"],{"17c7":function(t,e,a){},"456d":function(t,e,a){var i=a("4bf8"),o=a("0d58");a("5eda")("keys",(function(){return function(t){return o(i(t))}}))},"5eda":function(t,e,a){var i=a("5ca1"),o=a("8378"),r=a("79e5");t.exports=function(t,e){var a=(o.Object||{})[t]||Object[t],l={};l[t]=e(a),i(i.S+i.F*r((function(){a(1)})),"Object",l)}},9406:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard-container"},["operator"===t.$store.state.user.mode?a("el-row",{staticStyle:{height:"100%"},attrs:{gutter:10}},[a("el-col",{staticStyle:{height:"100%"},attrs:{span:7}},[a("el-card",{staticClass:"no-padding",staticStyle:{height:"100%"}},[a("div",{staticClass:"dashboard-title"},[t._v("商户信息")]),t._v(" "),a("div",{staticStyle:{padding:"10px 30px"}},t._l(t.commercialInfo,(function(e,i){return a("div",{key:i,staticClass:"detail-info"},[t.map[i]?a("span",{staticStyle:{"line-height":"50px"}},[a("span",{staticStyle:{color:"#4E5BF2","font-weight":"bold","font-size":"12px"}},[t._v(t._s(t.map[i]))]),t._v(" "),a("div",{staticClass:"line"}),t._v(" "),a("span",{staticStyle:{"font-size":"18px"}},[t._v(t._s(e))])]):t._e()])})),0)])],1),t._v(" "),a("el-col",{staticClass:"dashboard-data",staticStyle:{height:"100%"},attrs:{span:17}},[a("el-card",{staticStyle:{height:"calc(100% - 210px)","margin-bottom":"10px",overflow:"auto"}},[a("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"APP列表",name:"first"}},[a("div",{staticStyle:{"margin-bottom":"20px"}},[t._v("APP列表")]),t._v(" "),a("el-table",{attrs:{data:t.appListInfo.appArray,"element-loading-text":"加载中，请稍候","element-loading-spinner":"el-icon-loading",border:"",stripe:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"商户号",prop:"commercialNumber"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"APP名称",prop:"appName"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商户号",prop:"commercialNumber"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"白名单",prop:"appWhiteList"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"回调地址",prop:"appBackUrl"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"APPkey",prop:"appKey"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"创建时间",prop:"createTime"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作人",prop:"operatorName"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作时间",prop:"operatorTime"}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"新增APP",name:"second"}},[a("el-form",{ref:"addForm",attrs:{model:t.addForm,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"应用LOGO","label-width":"100px",prop:"appImg"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","show-file-list":!1,"before-upload":t.handleUploadPicture}},[t.addForm.appImg?a("img",{staticClass:"avatar",attrs:{src:t.addForm.appImg}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),a("el-form-item",{attrs:{label:"APP名称",prop:"appName"}},[a("el-input",{staticStyle:{width:"unset"},attrs:{autocomplete:"off"},model:{value:t.addForm.appName,callback:function(e){t.$set(t.addForm,"appName",e)},expression:"addForm.appName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"回调地址",prop:"appBackUrl"}},[a("el-input",{staticStyle:{width:"unset"},attrs:{autocomplete:"off"},model:{value:t.addForm.appBackUrl,callback:function(e){t.$set(t.addForm,"appBackUrl",e)},expression:"addForm.appBackUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"白名单",prop:"appWhiteList"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea",autocomplete:"off"},model:{value:t.addForm.appWhiteList,callback:function(e){t.$set(t.addForm,"appWhiteList",e)},expression:"addForm.appWhiteList"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleAddAPP}},[t._v("确定")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.activeName="first"}}},[t._v("返回")])],1)],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"修改密码",name:"third"}},[a("el-form",{ref:"modifyForm",attrs:{model:t.modifyForm,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"原密码",prop:"appId"}},[a("el-input",{staticStyle:{width:"unset"},attrs:{type:"password",autocomplete:"off"},model:{value:t.modifyForm.oldPwd,callback:function(e){t.$set(t.modifyForm,"oldPwd",e)},expression:"modifyForm.oldPwd"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"新密码",prop:"appName"}},[a("el-input",{staticStyle:{width:"unset"},attrs:{type:"password",autocomplete:"off"},model:{value:t.modifyForm.newPwd,callback:function(e){t.$set(t.modifyForm,"newPwd",e)},expression:"modifyForm.newPwd"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"重复新密码",prop:"appKey"}},[a("el-input",{staticStyle:{width:"unset"},attrs:{type:"password",autocomplete:"off"},model:{value:t.modifyForm.newPwd2,callback:function(e){t.$set(t.modifyForm,"newPwd2",e)},expression:"modifyForm.newPwd2"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleModifyPwd}},[t._v("确定")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.activeName="first"}}},[t._v("返回")])],1)],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"白名单",name:"fourth"}},[a("el-form",{ref:"ipsForm",attrs:{model:t.ipsForm,"label-width":"60px"}},[a("el-form-item",{attrs:{label:"IP"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea",rows:5,autocomplete:"off",placeholder:"IP之间以“,”隔开"},model:{value:t.ipsForm.ips,callback:function(e){t.$set(t.ipsForm,"ips",e)},expression:"ipsForm.ips"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleIpsForm}},[t._v("确定")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.activeName="first"}}},[t._v("返回")])],1)],1)],1)],1)],1),t._v(" "),a("el-card",{staticStyle:{height:"200px"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"dashboard-button",on:{click:function(e){t.activeName="second"}}},[a("i",{staticClass:"el-icon-document-add",staticStyle:{"font-size":"40px","line-height":"80px"}}),t._v(" "),a("div",{staticStyle:{color:"#000","font-size":"14px","margin-top":"10px"}},[t._v("新增APP")])])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"dashboard-button",on:{click:function(e){t.activeName="third"}}},[a("i",{staticClass:"el-icon-lock",staticStyle:{"font-size":"40px","line-height":"80px"}}),t._v(" "),a("div",{staticStyle:{color:"#000","font-size":"14px","margin-top":"10px"}},[t._v("修改密码")])])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"dashboard-button",on:{click:function(e){t.activeName="fourth"}}},[a("i",{staticClass:"el-icon-tickets",staticStyle:{"font-size":"40px","line-height":"80px"}}),t._v(" "),a("div",{staticStyle:{color:"#000","font-size":"14px","margin-top":"10px"}},[t._v("设置白名单")])])])],1)],1)],1)],1):a("el-row",{staticStyle:{height:"100%"},attrs:{gutter:10}},[a("el-col",{attrs:{span:6}},[a("el-card",[a("div",{staticClass:"admin-title"},[t._v("今日代收金额")]),t._v(" "),a("div",{staticClass:"admin-number"},[t._v("0")])])],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-card",[a("div",{staticClass:"admin-title"},[t._v("订单数量")]),t._v(" "),a("div",{staticClass:"admin-number"},[t._v("0")])])],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-card",[a("div",{staticClass:"admin-title"},[t._v("成功数量")]),t._v(" "),a("div",{staticClass:"admin-number"},[t._v("0")])])],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-card",[a("div",{staticClass:"admin-title"},[t._v("失败数量")]),t._v(" "),a("div",{staticClass:"admin-number"},[t._v("0")])])],1)],1)],1)},o=[],r=(a("ac6a"),a("456d"),a("c24f")),l=a("9aba"),n=a("720d"),c={name:"Dashboard",data:function(){return{name:localStorage.getItem("name"),commercialInfo:{},appListInfo:{appArray:[]},activeName:"first",addForm:{appWhiteList:"",appBackUrl:"",appKey:"",appImg:"",appId:"",appName:"",commercialNumber:function(t){return localStorage.getItem("number")}()},modifyForm:{commercialName:function(t){return localStorage.getItem("name")}(),commercialNumber:function(t){return localStorage.getItem("number")}(),oldPwd:"",newPwd:"",newPwd2:""},ipsForm:{commercialNumber:function(t){return localStorage.getItem("number")}(),ips:""},map:{commercialName:"商户名",commercialIphone:"商户手机号",commercialNumber:"商户号",commercialBalance:"商户余额",commercialRatio:"服务费收取比例",creationTime:"创建时间",updateTime:"\t修改时间",appName:"应用名",appBackUrl:"回调地址",appIsPut:"是否上架",createTime:"创建时间",appKey:"appKey"}}},created:function(){this.getCommercialInfo(),this.getAPPListInfo()},methods:{getCommercialInfo:function(){var t=this;Object(r["f"])({commercialId:localStorage.getItem("id")||"182f04b9-b4e0-4515-8a09-b91c3397fadc",commercialNumber:localStorage.getItem("number")}).then((function(e){e.commercial.creationTime=new Date(e.commercial.creationTime).toLocaleString(),e.commercial.updateTime=new Date(e.commercial.updateTime).toLocaleString(),t.commercialInfo=e.commercial||{}}))},getAPPListInfo:function(){var t=this;Object(r["c"])({commercialNumber:localStorage.getItem("number")}).then((function(e){t.appListInfo.appArray=e.rows}))},handleUploadPicture:function(t){var e=this,a=new FormData;a.append("file",t),a.append("imgType",1),a.append("commercialNumber",localStorage.getItem("number")),Object(l["e"])(a).then((function(t){e.addForm.appImg=t.src}))},handleAddAPP:function(){var t=this;Object(r["a"])(this.addForm).then((function(e){"10000"===e.errCode&&(t.$message({type:"success",message:e.mes}),t.initForm(t.addForm),t.getAPPListInfo())}))},handleModifyPwd:function(){var t=this,e=Object.assign({},this.modifyForm),a=new n["JSEncrypt"];a.setPublicKey(localStorage.getItem("publicKey")),e.oldPwd=a.encrypt(e.oldPwd),e.newPwd=a.encrypt(e.newPwd),delete e.newPwd2,Object(r["k"])(e).then((function(e){"10000"===e.errCode&&(t.$message({type:"success",message:e.mes}),t.initForm(t.modifyForm))}))},handleIpsForm:function(){var t=this;Object(r["h"])(this.ipsForm).then((function(e){"10000"===e.errorCode&&(t.$message.success(e.mes),t.initForm(t.ipsForm))})).catch((function(e){t.$message.error(e)}))},initForm:function(t){var e=Object.keys(t);e.forEach((function(e){"commercialNumber"!==e&&"commercialName"!==e&&(t[e]="")}))}}},s=c,m=(a("af54"),a("2877")),p=Object(m["a"])(s,i,o,!1,null,null,null);e["default"]=p.exports},"9aba":function(t,e,a){"use strict";a.d(e,"e",(function(){return o})),a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return l})),a.d(e,"c",(function(){return n})),a.d(e,"d",(function(){return c}));var i=a("b775");function o(t){return Object(i["a"])({url:"/instead-pay-web/upload/qrUpload",method:"post",data:t})}function r(t){return Object(i["a"])({url:"/instead-pay-web/qr/insert",method:"post","Content-Type":"multipart/form-data",data:t})}function l(t){return Object(i["a"])({url:"/instead-pay-web/qr/distributionQrCodeByHand",method:"post","Content-Type":"multipart/form-data",data:t})}function n(t){return Object(i["a"])({url:"/instead-pay-web/qr/queryQrAll",method:"post","Content-Type":"multipart/form-data",data:t})}function c(t){return Object(i["a"])({url:"/instead-pay-web/qr/updateEnableStatus",method:"post","Content-Type":"multipart/form-data",data:t})}},af54:function(t,e,a){"use strict";var i=a("17c7"),o=a.n(i);o.a}}]);