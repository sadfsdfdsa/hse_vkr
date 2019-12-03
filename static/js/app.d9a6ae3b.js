(function(e){function t(t){for(var s,i,o=t[0],l=t[1],d=t[2],u=0,b=[];u<o.length;u++)i=o[u],a[i]&&b.push(a[i][0]),a[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);c&&c(t);while(b.length)b.shift()();return r.push.apply(r,d||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],s=!0,o=1;o<n.length;o++){var l=n[o];0!==a[l]&&(s=!1)}s&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var s={},a={app:0},r=[];function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=s,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var d=0;d<o.length;d++)t(o[d]);var c=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);var s=n("f213"),a=n("5f5b"),r=n("8c4f"),i=n("2f62"),o=n("2b0e"),l=(n("f9e3"),n("2dd8"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"main"}},[n("b-container",[n("div",{staticClass:"wrapper fadeInDown"},[n("div",{attrs:{id:"formContent"}},[n("form",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.login,expression:"login"}],staticClass:"fadeIn second",attrs:{type:"text",id:"login",name:"login",placeholder:"login"},domProps:{value:e.login},on:{input:function(t){t.target.composing||(e.login=t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"fadeIn third",attrs:{type:"text",id:"password",name:"password",placeholder:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),n("input",{staticClass:"fadeIn fourth",attrs:{type:"button",value:"Log In"},on:{click:function(t){return e.submit()}}})]),n("div",{attrs:{id:"formFooter"}},[n("a",{staticClass:"underlineHover",attrs:{href:"#"}},[e._v("Forgot Password?")])])])])])],1)}),d=[],c={data:()=>({login:null,password:null}),methods:{submit(){this.login&&this.password?this.$api.post("/login",{login:this.login,password:this.password}).then(e=>{e.data.error?this.$snotify.error(e.data.error):(this.$store.commit("set_user",{name:this.login,role:e.data.role}),this.$router.push({path:"/account"}))}).catch(e=>{this.$snotify.error(`Error status ${e.response.status}`)}):this.$snotify.warning("Введите логин и пароль!")}}},u=c,b=(n("b1df"),n("2877")),f=Object(b["a"])(u,l,d,!1,null,"4d6322c3",null),m=f.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-container",[n("b-row",[n("b-col",[e._v("Username:")]),n("b-col",[e._v(e._s(this.username))]),n("b-col",[e._v(e._s(this.role[this.user_role]))])],1),1===this.user_role?n("div",[n("teacher_template")],1):n("div",[n("student_template")],1)],1)],1)},p=[],_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-row",{staticClass:"mt-5"},[e.student_date?n("div",[n("b-row",[e._v("Ваш нормоконтроль:")]),n("b-row",[e._v(e._s(e.student_date.teacher))]),n("b-row",[n("b-col",[e._v(e._s(e.student_date.date.toString().split("00:00:00")[0]))]),n("b-col",[e._v("\n                    "+e._s(e.student_date.begin.getHours())+":"+e._s(e.student_date.begin.getMinutes())+"-"+e._s(e.student_date.end.getHours())+":"+e._s(e.student_date.end.getMinutes())+"\n                ")])],1)],1):n("div",{ref:"student_table_show"},[n("b-col",{attrs:{sm:"6"}},[n("b-row",[e._v("Свободное время преподавателей")]),n("b-row",[n("b-table",{ref:"dates_table_student",attrs:{striped:"",hover:"",items:e.free_dates,fields:e.fields},scopedSlots:e._u([{key:"cell(teacher)",fn:function(t){return[e._v("\n                            "+e._s(t.item.teacher)+" + ФИО\n                        ")]}},{key:"cell(date)",fn:function(t){return[e._v("\n                            "+e._s(t.item.date.toString().split("00:00:00")[0])+"\n                        ")]}},{key:"cell(begin)",fn:function(t){return[e._v("\n                            "+e._s(t.item.begin.getHours())+":"+e._s(t.item.begin.getMinutes())+"\n                        ")]}},{key:"cell(end)",fn:function(t){return[e._v("\n                            "+e._s(t.item.end.getHours())+":"+e._s(t.item.end.getMinutes())+"\n                        ")]}},{key:"cell(confirm)",fn:function(t){return[n("b-button",{staticClass:"btn-sm",on:{click:function(n){return e.add(t.item)}}},[e._v("+")])]}}],null,!1,536675294)})],1)],1)],1)])],1)},g=[],v=n("ea76"),y=n.n(v),w={name:"Account_student",components:{DatePicker:y.a},data:()=>({fields:[{key:"teacher",label:"Преподаватель",sortable:!0},{key:"date",label:"День",sortable:!0},{key:"begin",label:"Начало",sortable:!0},{key:"end",label:"Конец",sortable:!0},{key:"confirm",label:"",sortable:!1}],free_dates:[],student_date:null}),methods:{add(e){this.$api.post("/time/student",{date:{date:e.date.getTime(),begin:e.begin.getTime(),end:e.end.getTime()},teacher:e.teacher,student:this.$store.state.username,action:"create"}).then(t=>{"success"===t.data.result?(this.$snotify.success("success"),this.student_date={date:e.date,begin:e.begin,end:e.end,teacher:e.teacher}):this.$snotify.error("error")}).catch(e=>{this.$snotify.error(`Error status ${e.response.status}`)})}},beforeCreate(){if(this.$store.state.username){let e=[],t=!1;this.$api.get("/time/student?student="+this.$store.state.username).then(e=>{"success"===e.data.result?(this.student_date={date:new Date(e.data.date.date),begin:new Date(e.data.date.begin),end:new Date(e.data.date.end),teacher:e.data.date.teacher},t=!0):this.$snotify.info("Не забудьте сделать запись!")}).catch(e=>{this.$snotify.error(`Error status ${e.response.status}`)}),t||this.$api.get("/time/free").then(t=>{t.data.error||(t.data.forEach(function(t){e.push({date:new Date(t.date),begin:new Date(t.begin),end:new Date(t.end),teacher:t.teacher})}),this.free_dates=e)}).catch(e=>{this.$snotify.error(`Error status ${e.response.status}`)})}}},k=w,$=Object(b["a"])(k,_,g,!1,null,"19039b45",null),x=$.exports,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-row",[n("b-col",[e._v("Teacher")])],1),n("b-row",[n("b-col",{attrs:{sm:"7"}},[n("date-picker",{attrs:{format:"YYYY-MM-DD",lang:"en",confirm:""},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),n("date-picker",{attrs:{lang:"en",type:"time",format:"HH:mm","minute-step":10,placeholder:"Start","time-picker-options":{start:"08:10",step:"00:20",end:"19:30"},confirm:""},model:{value:e.begin_time,callback:function(t){e.begin_time=t},expression:"begin_time"}}),n("date-picker",{attrs:{lang:"en",type:"time",format:"HH:mm","minute-step":10,placeholder:"End","time-picker-options":{start:this.begin_time.getHours()+":"+(this.begin_time.getMinutes()+20),step:"00:20",end:"19:30"},confirm:""},model:{value:e.end_time,callback:function(t){e.end_time=t},expression:"end_time"}})],1),n("b-col",[n("b-button",{staticClass:"btn-md",attrs:{variant:"primary"},on:{click:function(t){return e.add()}}},[e._v("Add date")])],1)],1),n("b-row",[n("b-col",{attrs:{sm:"5"}},[n("b-row",[e._v("Ваше свободное время")]),n("b-row",[n("b-table",{ref:"dates_table_teacher",attrs:{striped:"",hover:"",items:e.dates,fields:e.fields},scopedSlots:e._u([{key:"cell(date)",fn:function(t){return[e._v("\n                        "+e._s(t.item.date.toString().split("00:00:00")[0])+"\n                    ")]}},{key:"cell(begin)",fn:function(t){return[e._v("\n                        "+e._s(t.item.begin.getHours())+":"+e._s(t.item.begin.getMinutes())+"\n                    ")]}},{key:"cell(end)",fn:function(t){return[e._v("\n                        "+e._s(t.item.end.getHours())+":"+e._s(t.item.end.getMinutes())+"\n                    ")]}},{key:"cell(del)",fn:function(t){return[n("b-button",{staticClass:"btn-sm",on:{click:function(n){return e.remove(t)}}},[e._v("X")])]}}])})],1)],1),n("b-col",{attrs:{sm:"1"}}),n("b-col",{attrs:{sm:"6"}},[n("b-row",[e._v("Расписание")]),n("b-row",[n("b-table",{ref:"dates_table_teacher",attrs:{striped:"",hover:"",items:e.check_dates,fields:e.fields2},scopedSlots:e._u([{key:"cell(date)",fn:function(t){return[e._v("\n                        "+e._s(t.item.date.toString().split("00:00:00")[0])+"\n                    ")]}},{key:"cell(begin)",fn:function(t){return[e._v("\n                        "+e._s(t.item.begin.getHours())+":"+e._s(t.item.begin.getMinutes())+"\n                    ")]}},{key:"cell(end)",fn:function(t){return[e._v("\n                        "+e._s(t.item.end.getHours())+":"+e._s(t.item.end.getMinutes())+"\n                    ")]}},{key:"cell(student)",fn:function(t){return[e._v("\n                        "+e._s(t.item.student)+"+ФИО\n                    ")]}},{key:"cell(check)",fn:function(t){return[n("b-button",{staticClass:"btn-sm",on:{click:function(n){return e.check(t)}}},[e._v("Проверка")])]}}])})],1)],1)],1)],1)},E=[],H={name:"Account_teacher",components:{DatePicker:y.a},data:()=>({fields:[{key:"date",label:"День",sortable:!0},{key:"begin",label:"Начало",sortable:!0},{key:"end",label:"Конец",sortable:!0},{key:"del",label:"",sortable:!1}],fields2:[{key:"date",label:"День",sortable:!0},{key:"begin",label:"Начало",sortable:!0},{key:"end",label:"Конец",sortable:!0},{key:"student",label:"Студент",sortable:!1},{key:"check",label:"",sortable:!1}],date:null,begin_time:new Date,end_time:new Date,dates:[],check_dates:[]}),methods:{add(){if(this.begin_time<this.end_time){let e={date:this.date,begin:this.begin_time,end:this.end_time};this.$api.post("/time/teacher",{date:{date:this.date.getTime(),begin:this.begin_time.getTime(),end:this.end_time.getTime()},teacher:this.$store.state.username,action:"create"}).then(t=>{"success"===t.data.result?(this.dates.push(e),this.$snotify.success(t.data.result)):this.$snotify.error(t.data.error)}).catch(e=>{this.$snotify.error(`Error status ${e.response.status}`)})}else this.$snotify.warning("Время окончения должно быть больше времени начала")},remove(e){this.$api.post("/time/teacher",{date:{date:e.item.date.getTime(),begin:e.item.begin.getTime(),end:e.item.end.getTime()},teacher:this.$store.state.username,action:"delete"}).then(t=>{t.data.result?(this.dates=this.dates.filter(function(t){return t!==e.item}),this.$refs.dates_table_teacher.refresh()):this.$snotify.error(t.data.error)}).catch(e=>{this.$snotify.error(`Error status ${e.response.status}`)})}},created:function(){let e=[],t=[];this.$api.get("/time/teacher?teacher="+this.$store.state.username).then(n=>{n.data.dates.forEach(function(n){n.student?t.push({date:new Date(n.date),begin:new Date(n.begin),end:new Date(n.end),student:n.student}):e.push({date:new Date(n.date),begin:new Date(n.begin),end:new Date(n.end)})})}),this.check_dates=t,this.dates=e}},O=H,j=Object(b["a"])(O,D,E,!1,null,"1293c7dc",null),M=j.exports,S={components:{student_template:x,teacher_template:M},data:()=>({role:["student","teacher"]}),computed:Object(i["b"])(["username","user_role"]),beforeCreate(){this.$store.state.username||this.$router.push("/")}},P=S,C=Object(b["a"])(P,h,p,!1,null,"b8a9d3dc",null),T=C.exports;const I=[{path:"/",component:m,name:"indexPage",meta:{}},{path:"/account",component:T,name:"accountPage",meta:{}}];var N=I,Y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Navigation"),n("router-view"),n("vue-snotify")],1)},A=[],F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"primary"}},[n("b-navbar-brand",{attrs:{href:"#"}},[e._v("HSE Exams")]),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:{name:"indexPage"}}},[e._v("Home")])],1)],1)],1)],1)},J=[],L={name:"Navigation"},U=L,B=Object(b["a"])(U,F,J,!1,null,"e2d180f8",null),R=B.exports,X={components:{Navigation:R}},q=X,z=(n("5c0b"),Object(b["a"])(q,Y,A,!1,null,null,null)),G=z.exports;const K=n("bc3a");var Q=K.create({baseURL:"/api/v1"});o["default"].use(a["a"]),o["default"].use(r["a"]),o["default"].use(i["a"]),o["default"].use(s["b"],{toast:{position:s["a"].rightTop,timeout:3e3}}),o["default"].prototype.$api=Q;const V=new i["a"].Store({state:{username:"",user_role:0},mutations:{set_user(e,t){e.username=t.name,e.user_role=t.role}}}),W=new r["a"]({routes:N,mode:"history",scrollBehavior:()=>({y:0})});new o["default"]({el:"#app",router:W,store:V,render:e=>e(G)})},"5c0b":function(e,t,n){"use strict";var s=n("5e27"),a=n.n(s);a.a},"5e27":function(e,t,n){},b1df:function(e,t,n){"use strict";var s=n("c564"),a=n.n(s);a.a},c564:function(e,t,n){}});