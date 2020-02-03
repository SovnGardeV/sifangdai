(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63786853"],{"371d":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-card",{staticClass:"filter-container"},[a("el-form",{staticStyle:{"text-align":"right"},attrs:{inline:!0}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"收款人",clearable:"",size:"mini"},model:{value:e.mainTable.filter.receiptName,callback:function(t){e.$set(e.mainTable.filter,"receiptName",t)},expression:"mainTable.filter.receiptName"}})],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"启用状态",clearable:"",size:"mini"},model:{value:e.mainTable.filter.enableStatus,callback:function(t){e.$set(e.mainTable.filter,"enableStatus",t)},expression:"mainTable.filter.enableStatus"}},[a("el-option",{attrs:{value:0,label:"停用"}},[e._v("停用")]),e._v(" "),a("el-option",{attrs:{value:1,label:"启用"}},[e._v("启用")])],1)],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"账号类型",clearable:"",size:"mini"},model:{value:e.mainTable.filter.receiptType,callback:function(t){e.$set(e.mainTable.filter,"receiptType",t)},expression:"mainTable.filter.receiptType"}},e._l(e.map,(function(t,i){return a("el-option",{key:i,attrs:{value:i,label:t}},[e._v(e._s(t))])})),1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.getQRList}},[a("i",{staticClass:"el-icon-search"})])],1)],1)],1),e._v(" "),a("el-card",[a("el-col",{staticStyle:{"text-align":"right","margin-bottom":"10px",position:"relative","z-index":"2"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.addQR}},[e._v("新增二维码")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.distributeQR}},[e._v("分配二维码")])],1),e._v(" "),a("el-row",{attrs:{gutter:10}},e._l(e.mainTable.array,(function(t){return a("el-col",{key:t.qrId,attrs:{xs:24,sm:12,lg:8,xl:6}},[a("el-card",{staticStyle:{"margin-bottom":"10px",position:"relative"}},[a("img",{staticStyle:{"border-radius":"4px"},attrs:{src:t.qrUrl,alt:"",width:"150px",height:"150px"}}),e._v(" "),a("div",{staticClass:"qr-info"},[a("div",{staticClass:"account"},[e._v(e._s(t.bankAccount))]),e._v(" "),a("div",{staticClass:"name"},[e._v(e._s(t.receiptName))]),e._v(" "),a("div",{staticClass:"account-type"},[e._v(e._s(e.map[t.receiptType]))]),e._v(" "),a("div",{staticClass:"time"},[e._v(e._s(new Date(t.createTime).toLocaleString()))]),e._v(" "),a("div",{staticClass:"circle",class:1==t.enableStatus?"circle-success":"circle-error",attrs:{title:"当前状态："+(1==t.enableStatus?"启用":"停用")},on:{click:function(a){return e.changeStatus(t)}}},[a("i",{staticClass:"el-icon-check enable-status"}),e._v(" "),a("i",{staticClass:"el-icon-close disable-status"})])])])],1)})),1)],1),e._v(" "),a("el-dialog",{attrs:{width:"400px",center:"",title:"新增二维码",visible:e.mainTable.dialogAddVisible},on:{"update:visible":function(t){return e.$set(e.mainTable,"dialogAddVisible",t)}}},[a("el-form",{ref:"addForm",attrs:{model:e.mainTable.addForm,rules:e.mainTable.formRules}},[a("el-form-item",{attrs:{label:"二维码路径","label-width":"100px",prop:"qrUrl"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","show-file-list":!1,"before-upload":e.handleUploadPicture}},[e.mainTable.addForm.qrUrl?a("img",{staticClass:"avatar",attrs:{src:e.mainTable.addForm.qrUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"状态","label-width":"100px",prop:"enableStatus"}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.mainTable.addForm.enableStatus,callback:function(t){e.$set(e.mainTable.addForm,"enableStatus",t)},expression:"mainTable.addForm.enableStatus"}},[a("el-option",{attrs:{value:1,label:"启用"}},[e._v("启用")]),e._v(" "),a("el-option",{attrs:{value:0,label:"停用"}},[e._v("停用")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"账号","label-width":"100px"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.mainTable.addForm.bankAccount,callback:function(t){e.$set(e.mainTable.addForm,"bankAccount",t)},expression:"mainTable.addForm.bankAccount"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"收款名","label-width":"100px",prop:"receiptName"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.mainTable.addForm.receiptName,callback:function(t){e.$set(e.mainTable.addForm,"receiptName",t)},expression:"mainTable.addForm.receiptName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"二维码类型","label-width":"100px",prop:"receiptType"}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.mainTable.addForm.receiptType,callback:function(t){e.$set(e.mainTable.addForm,"receiptType",t)},expression:"mainTable.addForm.receiptType"}},[a("el-option",{attrs:{value:1,label:"支付宝"}},[e._v("支付宝")]),e._v(" "),a("el-option",{attrs:{value:2,label:"微信"}},[e._v("微信")]),e._v(" "),a("el-option",{attrs:{value:3,label:"银行卡"}},[e._v("银行卡")])],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.mainTable.dialogAddVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.handleAddQR}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{width:"400px",center:"",title:"分配二维码",visible:e.mainTable.dialogDistributeVisible},on:{"update:visible":function(t){return e.$set(e.mainTable,"dialogDistributeVisible",t)}}},[e.showCard.qrUrl?a("div",{staticStyle:{"text-align":"center"}},[a("img",{key:e.showCard.qrUrl,staticStyle:{border:"1px dashed #999",padding:"4px","border-radius":"4px"},attrs:{width:"240px",height:"240px",alt:""}}),e._v(" "),a("div",{staticStyle:{padding:"20px"}},[a("i",{staticClass:"el-icon-success",staticStyle:{color:"#18D78A"}}),e._v("\n        分配成功\n      ")]),e._v(" "),a("div",{staticStyle:{"font-size":"48px",color:"#F79709","font-weight":"bold"}},[e._v(e._s(e.showCard.floatMoney))])]):a("div",[a("el-form",{ref:"distribuForm",attrs:{model:e.mainTable.distribuForm,rules:e.mainTable.formRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"应用名称",prop:"applicationName"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.mainTable.distribuForm.applicationName,callback:function(t){e.$set(e.mainTable.distribuForm,"applicationName",t)},expression:"mainTable.distribuForm.applicationName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"应用类型",prop:"applicationType"}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.mainTable.distribuForm.applicationType,callback:function(t){e.$set(e.mainTable.distribuForm,"applicationType",t)},expression:"mainTable.distribuForm.applicationType"}},[a("el-option",{attrs:{value:1,label:"代收"}},[e._v("代收")]),e._v(" "),a("el-option",{attrs:{value:2,label:"代付"}},[e._v("代付")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"外部订单号",prop:"outId"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.mainTable.distribuForm.outId,callback:function(t){e.$set(e.mainTable.distribuForm,"outId",t)},expression:"mainTable.distribuForm.outId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"打款人姓名",prop:"makerName"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.mainTable.distribuForm.makerName,callback:function(t){e.$set(e.mainTable.distribuForm,"makerName",t)},expression:"mainTable.distribuForm.makerName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"数量",prop:"num"}},[a("el-input",{attrs:{min:"0",type:"number",autocomplete:"off"},model:{value:e.mainTable.distribuForm.num,callback:function(t){e.$set(e.mainTable.distribuForm,"num",t)},expression:"mainTable.distribuForm.num"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"操作金额",prop:"operatorMoney"}},[a("el-input",{attrs:{min:"0",type:"number",autocomplete:"off"},model:{value:e.mainTable.distribuForm.operatorMoney,callback:function(t){e.$set(e.mainTable.distribuForm,"operatorMoney",t)},expression:"mainTable.distribuForm.operatorMoney"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"支付类型",prop:"payType"}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.mainTable.distribuForm.payType,callback:function(t){e.$set(e.mainTable.distribuForm,"payType",t)},expression:"mainTable.distribuForm.payType"}},[a("el-option",{attrs:{value:1,label:"支付宝"}},[e._v("支付宝")]),e._v(" "),a("el-option",{attrs:{value:2,label:"微信"}},[e._v("微信")]),e._v(" "),a("el-option",{attrs:{value:3,label:"银行卡"}},[e._v("银行卡")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"订单标识",prop:"remark"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.mainTable.distribuForm.remark,callback:function(t){e.$set(e.mainTable.distribuForm,"remark",t)},expression:"mainTable.distribuForm.remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.mainTable.dialogDistributeVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.handleDistributeQR}},[e._v("确 定")])],1)],1)])],1)},r=[],l=(a("6b54"),a("ac6a"),a("456d"),a("9aba")),o=a("ed08"),n=a("3452"),s=a.n(n),m={data:function(){return{map:{1:"支付宝二维码",2:"微信二维码",3:"银行卡",4:"支付宝账号",5:"微信账号"},showCard:{qrUrl:"",floatMoney:""},mainTable:{array:[],filter:{qrUrl:"",enableStatus:"",bankAccount:"",receiptName:"",receiptType:""},addForm:{qrUrl:"",enableStatus:"",receiptName:"",receiptType:"",commercialNumber:localStorage.getItem("number")},distribuForm:{commercialNumber:localStorage.getItem("number"),outId:"",operatorMoney:"",makerName:"",num:"",applicationType:"",payType:"",time:"",sign:"",remark:"",applicationName:""},formRules:{qrUrl:[{required:!0,trigger:"blur"}],enableStatus:[{required:!0,trigger:"blur"}],receiptName:[{required:!0,trigger:"blur"}],receiptType:[{required:!0,trigger:"blur"}],commercialNumber:[{required:!0,trigger:"blur"}],operatorMoney:[{required:!0,trigger:"blur"}],makerName:[{required:!0,trigger:"blur"}],num:[{required:!0,trigger:"blur"}],outId:[{required:!0,trigger:"blur"}],applicationType:[{required:!0,trigger:"blur"}],payType:[{required:!0,trigger:"blur"}],applicationName:[{required:!0,trigger:"blur"}]},dialogAddVisible:!1,dialogDistributeVisible:!1}}},created:function(){this.getQRList()},methods:{changeStatus:function(e){var t=e.qrId,a=e.enableStatus;Object(l["d"])({qrId:t,status:0===a?1:0}).then((function(t){"10000"===t.errorCode&&(e.enableStatus=0===a?1:0)}))},initForm:function(e,t){var a=this,i=Object.keys(e);i.forEach((function(t){"commercialNumber"!==t&&(e[t]="")})),this.$nextTick((function(e){a.$refs[t].clearValidate()}))},addQR:function(){this.initForm(this.mainTable.addForm,"addForm"),this.mainTable.dialogAddVisible=!0},handleUploadPicture:function(e){var t=this,a=new FormData;a.append("file",e),a.append("imgType",2),a.append("commercialNumber",localStorage.getItem("number")),Object(l["e"])(a).then((function(e){t.mainTable.addForm.qrUrl=e.src}))},handleAddQR:function(){var e=this;Object(l["a"])(this.mainTable.addForm).then((function(t){e.$message({type:"success",message:t.mes}),e.mainTable.dialogAddVisible=!1,e.getQRList()}))},distributeQR:function(){this.initForm(this.mainTable.distribuForm,"distribuForm"),this.mainTable.dialogDistributeVisible=!0},getQRList:function(){var e=this,t={commercialNumber:localStorage.getItem("number"),filter:function(e){return Object(o["a"])(e)}(this.mainTable.filter)};Object(l["c"])(t).then((function(t){"10000"===t.errorCode&&(e.mainTable.array=t.rows||[])}))},handleDistributeQR:function(){var e=this;this.mainTable.distribuForm.time=(new Date).getTime();var t=this.mainTable.distribuForm,a=t.applicationName,i=t.applicationType,r=t.commercialNumber,o=t.operatorMoney,n=t.makerName,m=t.num,c=t.outId,u=t.payType,b=t.remark,d=t.time,p="applicationName="+a+"&applicationType="+i+"&commercialNumber="+r+"&makerName="+n+"&num="+m+"&operatorMoney="+o+"&outId="+c+"&payType="+u+"&remark="+b+"&time="+d;this.mainTable.distribuForm.sign=s.a.MD5(p).toString(),Object(l["b"])(this.mainTable.distribuForm).then((function(t){"10000"===t.errorCode&&(e.showCard.qrUrl=t.qrUrl,e.showCard.floatMoney=t.floatMoney,e.$message.success(t.mes))}))}}},c=m,u=(a("691c"),a("2877")),b=Object(u["a"])(c,i,r,!1,null,"53a7cf1c",null);t["default"]=b.exports},"691c":function(e,t,a){"use strict";var i=a("b1a8"),r=a.n(i);r.a},"9aba":function(e,t,a){"use strict";a.d(t,"e",(function(){return r})),a.d(t,"a",(function(){return l})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return n})),a.d(t,"d",(function(){return s}));var i=a("b775");function r(e){return Object(i["a"])({url:"/instead-pay-web/upload/qrUpload",method:"post",data:e})}function l(e){return Object(i["a"])({url:"/instead-pay-web/qr/insert",method:"post","Content-Type":"multipart/form-data",data:e})}function o(e){return Object(i["a"])({url:"/instead-pay-web/qr/distributionQrCodeByHand",method:"post","Content-Type":"multipart/form-data",data:e})}function n(e){return Object(i["a"])({url:"/instead-pay-web/qr/queryQrAll",method:"post","Content-Type":"multipart/form-data",data:e})}function s(e){return Object(i["a"])({url:"/instead-pay-web/qr/updateEnableStatus",method:"post","Content-Type":"multipart/form-data",data:e})}},b1a8:function(e,t,a){}}]);