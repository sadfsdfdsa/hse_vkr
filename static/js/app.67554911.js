(function(t){function e(e){for(var a,o,i=e[0],l=e[1],c=e[2],u=0,h=[];u<i.length;u++)o=i[u],r[o]&&h.push(r[o][0]),r[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);d&&d(e);while(h.length)h.shift()();return n.push.apply(n,c||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],a=!0,i=1;i<s.length;i++){var l=s[i];0!==r[l]&&(a=!1)}a&&(n.splice(e--,1),t=o(o.s=s[0]))}return t}var a={},r={app:0},n=[];function o(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=a,o.d=function(t,e,s){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(s,a,function(e){return t[e]}.bind(null,a));return s},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var d=l;n.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"478d":function(t,e,s){},"56d7":function(t,e,s){"use strict";s.r(e);var a=s("f213"),r=s("5f5b"),n=s("8c4f"),o=s("2f62"),i=s("2b0e"),l=(s("f9e3"),s("2dd8"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"main"}},[s("b-container",{staticClass:"mt-5"},[s("div",{staticClass:"wrapper fadeInDown"},[s("div",{staticClass:"mt-5",attrs:{id:"formContent"}},[s("div"),s("form",{staticClass:"mt-5"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.login,expression:"login"}],staticClass:"fadeIn second",attrs:{type:"text",id:"login",name:"login",placeholder:"login"},domProps:{value:t.login},on:{input:function(e){e.target.composing||(t.login=e.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"fadeIn third",attrs:{type:"text",id:"password",name:"password",placeholder:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),s("input",{staticClass:"fadeIn fourth",attrs:{type:"button",value:"Log In"},on:{click:function(e){return t.submit()}}})]),s("div",{attrs:{id:"formFooter"}},[s("a",{staticClass:"underlineHover",attrs:{href:"#"}},[t._v("Forgot Password?")])])])])])],1)}),c=[],d={data:()=>({login:null,password:null}),methods:{submit(){this.login&&this.password?this.$api.post("/login",{login:this.login,password:this.password}).then(t=>{t.data.error?this.$snotify.error(t.data.error):(this.$store.commit("set_user",{name:t.data.fio,role:t.data.role,control:t.data.control}),localStorage.login=this.login,localStorage.password=this.password,localStorage.name=t.data.fio,this.$router.push({path:"/account"}))}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)}):this.$snotify.warning("Введите логин и пароль!")}},created(){localStorage.getItem("login")&&this.$api.post("/login",{login:localStorage.getItem("login"),password:localStorage.getItem("password")}).then(t=>{t.data.error?this.$snotify.error(t.data.error):(this.$store.commit("set_user",{name:t.data.fio,role:t.data.role,control:t.data.control}),this.$router.push({path:"/account"}))}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})}},u=d,h=(s("6e4c"),s("2877")),m=Object(h["a"])(u,l,c,!1,null,"2172e481",null),_=m.exports,b=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("b-container",[1===this.user_role?s("div",[s("teacher_template")],1):s("div",[s("student_template")],1)])],1)},f=[],p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("b-row",[s("b-col",[s("h3",[t._v("Скачать файл: "),s("a",{attrs:{href:"/api/v1/file/"+this.$store.state.username+"_project.docx",download:""}},[t._v("download")])])])],1),0===this.$store.state.user_control?s("div",[s("b-row",{staticClass:"mt-2"},[s("b-col",{attrs:{sm:"6"}},[s("b-form-file",{attrs:{state:Boolean(t.file),placeholder:"Выберите или перетащите сюда новый файл...","drop-placeholder":"Drop file here...",accept:".doc, .docx"},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}})],1)],1),s("b-row",[s("b-col",{staticClass:"text-sm-center",attrs:{sm:"6"}},[s("em",[t._v("Предыдущий файл сотрется!")])])],1),t.loader_teacher_date?s("div",{staticClass:"text-center"},[s("b-spinner",{attrs:{variant:"primary",label:"Spinning"}})],1):t._e(),t.student_date?s("div",{staticClass:"mt-2"},[s("b-card",{staticClass:"mb-2",staticStyle:{"max-width":"20rem"},attrs:{title:"Ваша запись"}},[s("b-card-text",[s("b-row",[s("b-col",[t._v("Teacher:")]),s("b-col",[t._v(t._s(t.student_date.teacher))])],1),s("b-row",[s("b-col",[t._v("Date:")]),s("b-col",[t._v("\n                            "+t._s(t.student_date.begin.getDate()+"."+t.student_date.begin.getMonth()+"."+t.student_date.begin.getFullYear())+"\n                        ")])],1),s("b-row",[s("b-col",[t._v("Time:")]),s("b-col",[t._v("\n                            "+t._s(t.student_date.begin.getHours())+":"+t._s(t.student_date.begin.getMinutes())+"-"+t._s(t.student_date.end.getHours())+":"+t._s(t.student_date.end.getMinutes())+"\n                        ")])],1)],1),s("b-button",{staticClass:"btn-sm",on:{click:function(e){return t.remove()}}},[t._v("Отменить")])],1)],1):s("div",{ref:"student_table_show"},[s("b-row",{staticClass:"mt-2"},[t.free_dates.length>0||t.loader_teacher_date?s("b-col",{attrs:{sm:"6"}},[s("b-row",[s("b-col",[s("h5",[t._v("Свободное время преподавателей")])])],1),s("b-row",[s("b-col",[s("b-table",{ref:"dates_table_student",attrs:{striped:"",hover:"",items:t.free_dates,fields:t.fields},scopedSlots:t._u([{key:"cell(teacher)",fn:function(e){return[t._v("\n                                    "+t._s(e.item.teacher)+"\n                                ")]}},{key:"cell(date)",fn:function(e){return[t._v("\n                                    "+t._s(e.item.begin.getDate()+"."+e.item.begin.getMonth()+"."+e.item.begin.getFullYear())+"\n                                ")]}},{key:"cell(begin)",fn:function(e){return[t._v("\n                                    "+t._s(e.item.begin.getHours())+":"+t._s(e.item.begin.getMinutes())+"\n                                ")]}},{key:"cell(end)",fn:function(e){return[t._v("\n                                    "+t._s(e.item.end.getHours())+":"+t._s(e.item.end.getMinutes())+"\n                                ")]}},{key:"cell(confirm)",fn:function(e){return[s("b-button",{staticClass:"btn-sm",on:{click:function(s){return t.add(e.item)}}},[t._v("+")])]}}],null,!1,1517769231)})],1)],1)],1):s("b-col",[s("b-card",{staticClass:"mb-2 text-center",attrs:{title:"К сожалению, нет доступного для записи времени..."}})],1)],1)],1),this.student_history.length>0?s("b-row",{staticClass:"mt-2"},[s("b-col",[s("b-table",{ref:"errors_table",attrs:{striped:"",hover:"",items:t.student_history,fields:t.fields2}})],1)],1):s("b-row",[s("b-col",[s("b-card",{staticClass:"mb-2 text-center",attrs:{title:"Ошибок нет"}})],1)],1)],1):1===this.$store.state.user_control?s("div",[s("b-row",[s("b-col",[s("b-card",{staticClass:"mb-2 text-center",attrs:{title:"Нормоконтроль пройден"}})],1)],1)],1):s("div",[s("b-row",[s("b-col",[s("b-card",{staticClass:"mb-2 text-center",attrs:{title:"Нормоконтроль не пройден"}})],1)],1)],1)],1)},g=[],v=s("ea76"),y=s.n(v),$={name:"Account_student",components:{DatePicker:y.a},data:()=>({fields:[{key:"teacher",label:"Преподаватель",sortable:!0},{key:"date",label:"День",sortable:!0},{key:"begin",label:"Начало",sortable:!0},{key:"end",label:"Конец",sortable:!0},{key:"confirm",label:"",sortable:!1}],loader_teacher_date:!0,free_dates:[],student_date:null,fields2:[{key:"error",label:"Ошибка",variant:"danger"},{key:"comment",label:"Комментарий"}],student_history:[],file:null,return_file:null}),methods:{remove(){this.loader_teacher_date=!0,this.$api.post("/time/student",{date:{date:this.student_date.date.getTime(),begin:this.student_date.begin.getTime(),end:this.student_date.end.getTime()},teacher:this.student_date.teacher,student:this.$store.state.username,action:"delete"}).then(t=>{"success"===t.data.result?(this.$snotify.success("Время отменено!"),this.student_date=null,this.loader_teacher_date=!1):this.$snotify.error("error")}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)}),this.$api.get("/time/free").then(t=>{t.data.error||(t.data.forEach(function(t){dates.push({begin:new Date(t.begin),end:new Date(t.end),teacher:t.teacher})}),this.free_dates=dates,this.loader_teacher_date=!1)}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)}),this.loader_teacher_date=!1},add(t){this.$api.post("/time/student",{date:{date:t.date.getTime(),begin:t.begin.getTime(),end:t.end.getTime()},teacher:t.teacher,student:this.$store.state.username,action:"create"}).then(e=>{"success"===e.data.result?(this.$snotify.success("Время зарезервировано!"),this.student_date={date:t.date,begin:t.begin,end:t.end,teacher:t.teacher}):this.$snotify.error("error")}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})},get_history(){this.$api.get("/check/?student="+this.$store.state.username).then(t=>{t.data?this.student_history=t.data:this.$snotify.info("Не забудьте сделать запись!")}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})}},created(){if(this.$store.state.username&&0===this.$store.state.user_control){let t=[];this.$api.get("/time/student/?student="+this.$store.state.username).then(e=>{"success"===e.data.result?this.student_date={date:new Date(e.data.date.date),begin:new Date(e.data.date.begin),end:new Date(e.data.date.end),teacher:e.data.date.teacher}:(this.$snotify.info("Не забудьте сделать запись!"),this.$api.get("/time/free/").then(e=>{e.data.error||(e.data.forEach(function(e){t.push({date:new Date(e.date),begin:new Date(e.begin),end:new Date(e.end),teacher:e.teacher})}),this.free_dates=t),this.loader_teacher_date=!1}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})),this.loader_teacher_date=!1}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)}).then(()=>{this.get_history()})}},watch:{file:function(t,e){if(this.file){let t=new FormData;t.append("student",this.$store.state.username),t.append("file",this.file),this.$api.post("/file",t).then(t=>{this.$snotify.success("Файл загружен!")})}}}},w=$,k=Object(h["a"])(w,p,g,!1,null,"9b560df6",null),x=k.exports,C=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("b-row",{staticClass:"mt-2"},[s("b-col",[s("h5",[t._v("Создайте свободные места для записи")])])],1),s("b-row",{staticClass:"mt-2 justify-content-start"},[s("b-col",{staticClass:"col-md-auto"},[s("div",{staticClass:"text-center"},[t._v("Выберите дату")]),s("date-picker",{attrs:{format:"YYYY-MM-DD",lang:"ru",placeholder:"День"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),s("b-col",{staticClass:"col-md-auto"},[s("div",{staticClass:"text-center"},[t._v("Время начала проверки")]),s("date-picker",{attrs:{lang:"ru",type:"time",format:"HH:mm","minute-step":10,placeholder:"Время начала","time-picker-options":{start:"08:10",step:"00:20",end:"19:30"}},model:{value:t.begin_time,callback:function(e){t.begin_time=e},expression:"begin_time"}})],1),s("b-col",{staticClass:"col-md-auto"},[s("div",{staticClass:"text-center"},[t._v("Время окончания проверки")]),s("date-picker",{attrs:{lang:"ru",type:"time",format:"HH:mm","minute-step":10,placeholder:"Время окончания","time-picker-options":{start:this.begin_time.getHours()+":"+(this.begin_time.getMinutes()+20),step:"00:20",end:"19:30"}},model:{value:t.end_time,callback:function(e){t.end_time=e},expression:"end_time"}})],1),s("b-col",{staticClass:"col-md-auto align-self-end"},[s("b-button",{staticClass:"btn-md",attrs:{variant:"primary"},on:{click:function(e){return t.add()}}},[t._v("Добавить время")])],1)],1),s("b-row",{staticClass:"mt-3"},[s("b-col",{attrs:{sm:"5"}},[s("b-row",[s("b-col",[s("h5",[t._v("Ваше свободное время")])])],1),s("b-row",[s("b-col",[s("b-table",{ref:"dates_table_teacher",attrs:{striped:"",hover:"",items:t.dates,fields:t.fields},scopedSlots:t._u([{key:"cell(date)",fn:function(e){return[t._v("\n                            "+t._s(e.item.date.getDate()+"."+e.item.date.getMonth()+"."+e.item.date.getFullYear())+"\n                        ")]}},{key:"cell(begin)",fn:function(e){return[t._v("\n                            "+t._s(e.item.begin.getHours())+":"+t._s(e.item.begin.getMinutes())+"\n                        ")]}},{key:"cell(end)",fn:function(e){return[t._v("\n                            "+t._s(e.item.end.getHours())+":"+t._s(e.item.end.getMinutes())+"\n                        ")]}},{key:"cell(del)",fn:function(e){return[s("b-button",{staticClass:"btn-sm",on:{click:function(s){return t.remove(e)}}},[t._v("X")])]}}])})],1)],1),t.loader_teacher_date?s("div",{staticClass:"text-center"},[s("b-spinner",{attrs:{variant:"primary",label:"Spinning"}})],1):t._e(),0!==t.dates.length||t.loader_teacher_date?t._e():s("b-row",{staticClass:"text-center"},[s("b-col",[s("h6",[t._v("Добавьте дату")])])],1)],1),s("b-col",{attrs:{sm:"1"}}),s("b-col",{attrs:{sm:"6"}},[s("b-row",[s("b-col",[s("h5",[t._v("Ваше расписание")])])],1),s("b-row",[s("b-col",[s("b-table",{ref:"dates_table_teacher",attrs:{striped:"",hover:"",items:t.check_dates,fields:t.fields2},scopedSlots:t._u([{key:"cell(date)",fn:function(e){return[t._v("\n                            "+t._s(e.item.date.getDate()+"."+e.item.date.getMonth()+"."+e.item.date.getFullYear())+"\n                        ")]}},{key:"cell(begin)",fn:function(e){return[t._v("\n                            "+t._s(e.item.begin.getHours())+":"+t._s(e.item.begin.getMinutes())+"\n                        ")]}},{key:"cell(end)",fn:function(e){return[t._v("\n                            "+t._s(e.item.end.getHours())+":"+t._s(e.item.end.getMinutes())+"\n                        ")]}},{key:"cell(student)",fn:function(e){return[t._v("\n                            "+t._s(e.item.student)+"\n                        ")]}},{key:"cell(check)",fn:function(e){return[s("b-button",{staticClass:"btn-sm",on:{click:function(s){return t.go_check(e)}}},[t._v("Проверка")])]}}])})],1)],1),t.loader_teacher_date?s("div",{staticClass:"text-center"},[s("b-spinner",{attrs:{variant:"primary",label:"Spinning"}})],1):t._e(),0!==t.check_dates.length||t.loader_teacher_date?t._e():s("b-row",{staticClass:"text-center"},[s("b-col",[s("h6",[t._v("Записей нет")])])],1)],1)],1)],1)},S=[],D={name:"Account_teacher",components:{DatePicker:y.a},data:()=>({fields:[{key:"date",label:"День",sortable:!0},{key:"begin",label:"Начало",sortable:!0},{key:"end",label:"Конец",sortable:!0},{key:"del",label:"",sortable:!1}],fields2:[{key:"date",label:"День",sortable:!0},{key:"begin",label:"Начало",sortable:!0},{key:"end",label:"Конец",sortable:!0},{key:"student",label:"Студент",sortable:!1},{key:"check",label:"",sortable:!1}],date:new Date,begin_time:new Date(114e5),end_time:new Date(126e5),dates:[],check_dates:[],loader_teacher_date:!0}),methods:{add(){let t;this.begin_time<this.end_time?(t=null,t={date:this.date,begin:this.begin_time,end:this.end_time},t.date.setMonth(t.date.getMonth()+1),t.begin.setFullYear(t.date.getFullYear()),t.begin.setMonth(t.date.getMonth()),t.begin.setDate(t.date.getDate()),t.end.setFullYear(t.date.getFullYear()),t.end.setMonth(t.date.getMonth()),t.end.setDate(t.date.getDate()),this.$api.post("/time/teacher",{date:{begin:this.begin_time.getTime(),end:this.end_time.getTime()},teacher:this.$store.state.username,action:"create"}).then(e=>{"success"===e.data.result?(this.dates.push(t),this.$snotify.success("Время добавлено!")):this.$snotify.error("Это время уже занято")}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})):this.$snotify.warning("Время окончения должно быть больше времени начала"),this.date=new Date,this.begin_time=new Date(114e5),this.end_time=new Date(126e5)},remove(t){this.$api.post("/time/teacher",{date:{date:t.item.date.getTime(),begin:t.item.begin.getTime(),end:t.item.end.getTime()},teacher:this.$store.state.username,action:"delete"}).then(e=>{e.data.result?(this.dates=this.dates.filter(function(e){return e!==t.item}),this.$refs.dates_table_teacher.refresh()):this.$snotify.error(e.data.error)}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})},go_check(t){this.$router.push({path:"/work/"+t.item.student})}},created:function(){this.$api.get("/time/teacher/?teacher="+this.$store.state.username).then(t=>{for(let e=0;e<t.data.dates.length;e++){let s=t.data.dates[e];s.student?this.check_dates.push({date:new Date(s.date),begin:new Date(s.begin),end:new Date(s.end),student:s.student}):this.dates.push({date:new Date(s.date),begin:new Date(s.begin),end:new Date(s.end)})}this.loader_teacher_date=!1})}},E=D,M=Object(h["a"])(E,C,S,!1,null,"36b812d4",null),j=M.exports,O={components:{student_template:x,teacher_template:j},data:()=>({role:["student","teacher"]}),computed:Object(o["b"])(["username","user_role"]),beforeCreate(){this.$store.state.username||this.$router.push("/")}},T=O,H=Object(h["a"])(T,b,f,!1,null,"a7f7021a",null),P=H.exports,I=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("b-container",[s("b-row",{staticClass:"mt-2"},[s("b-col",[s("h4",[t._v("Student:\n                "+t._s(t.student_fio))])])],1),s("b-row",[s("b-col",[s("h4",[t._v("Скачать файл:\n                    "),s("a",{attrs:{href:"/api/v1/file/"+t.student_fio+"_project.docx",download:""}},[t._v("Download")])])])],1),t.student_history.length>0||0!==t.student_history_length_old?s("b-row",[s("b-col",[s("b-row",[s("b-col",[s("b-table",{ref:"errors_table",attrs:{striped:"",hover:"",items:t.student_history,fields:t.fields},scopedSlots:t._u([{key:"cell(del)",fn:function(e){return[s("b-button",{staticClass:"btn-sm",attrs:{variant:"success"},on:{click:function(s){return t.remove_item(e)}}},[t._v("Ошибка\n                                    исправлена\n                                ")])]}}],null,!1,3504380411)})],1)],1),s("b-row",[s("b-col",[s("b-button",{staticClass:"btn-lg",attrs:{variant:"warning"},on:{click:function(e){return t.failed_control()}}},[t._v("Нормоконтроль не\n                            пройден\n                        ")])],1),s("b-col",[s("b-button",{staticClass:"btn-lg",attrs:{variant:"success"},on:{click:function(e){return t.passed_control()}}},[t._v("Успешно прошел\n                            нормоконтроль\n                        ")])],1)],1)],1)],1):t._e(),s("b-row",{staticClass:"mt-2"},[s("b-col",[s("b-table",{ref:"dates_table_teacher",attrs:{striped:"",hover:"",items:t.default_errors,fields:t.fields2},scopedSlots:t._u([{key:"cell(button)",fn:function(e){return[s("b-form-checkbox",{attrs:{value:e.item.text,size:"lg",stacked:""},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}})]}},{key:"cell(error)",fn:function(e){return[t._v("\n                        "+t._s(e.item.text)+"\n                    ")]}},{key:"cell(comment)",fn:function(e){return[s("b-form-input",{attrs:{"v-model":t.default_errors[t.default_errors.indexOf(e.item)].comment,placeholder:"Комментарий"}})]}}])})],1)],1),s("b-row",[s("b-col",[s("b-form-input",{attrs:{placeholder:"Ошибка"},model:{value:t.error_text,callback:function(e){t.error_text=e},expression:"error_text"}})],1),s("b-col",[s("b-form-input",{attrs:{placeholder:"Комментарий"},model:{value:t.comment_text,callback:function(e){t.comment_text=e},expression:"comment_text"}})],1),s("b-col",[s("b-button",{staticClass:"btn-md",on:{click:function(e){return t.add_item(t.item)}}},[t._v("Добавить ошибку")])],1)],1),s("b-row",{staticClass:"mt-3"},[0===t.student_history_length_old?s("b-col",[s("b-button",{staticClass:"btn-lg",on:{click:function(e){return t.end_check()}}},[t._v("Отправить на повторный")])],1):s("b-col",[s("b-button",{staticClass:"btn-lg",attrs:{variant:"warning"},on:{click:function(e){return t.failed_control()}}},[t._v("Нормоконтроль не пройден\n                ")])],1),s("b-col",[s("b-button",{staticClass:"btn-lg",attrs:{variant:"success"},on:{click:function(e){return t.passed_control()}}},[t._v("Успешно прошел нормоконтроль\n                ")])],1)],1)],1)],1)},Y=[],F={name:"Check_page",data:()=>({fields:[{key:"error",label:"Ошибка",variant:"danger"},{key:"comment",label:"Комментарий"},{key:"del",label:""}],fields2:[{key:"button",label:"Ошибка"},{key:"error",label:"Текст ошибки"},{key:"comment",label:"Комментарий"}],status:[],default_errors:[{text:"4.0 Ошибка оформления листа",comment:""},{text:"4.0 Ошибка нумерации страниц",comment:""},{text:"4.0 Ошибка шрифтов",comment:""},{text:"4.0 Ошибка абзацного членения",comment:""},{text:"4.0 Отсутствует список терминов",comment:""},{text:"4.0 Присутствуют неприменимые обороты",comment:""},{text:"4.0 Ошибка наименивания команд и тд",comment:""},{text:"4.1 Смысловая ошибка в заголовках",comment:""},{text:"4.1 Ошибка структуры разделов",comment:""},{text:"4.2 Ошибка оформления списков",comment:""},{text:"4.3 Ошибка оформления таблиц",comment:""},{text:"4.4 Ошибка оформления формул",comment:""},{text:"4.5 Ошибка оформления иллюстраций",comment:""},{text:"4.6 Ошибка оформления библиографического списка",comment:""},{text:"4.7 Ошибка оформления приложений",comment:""}],student_history:[],student_history_length_old:0,student_fio:null,error_text:"",comment_text:"",item:null}),methods:{get_history(){this.$api.get("/check/?student="+this.student_fio).then(t=>{t.data?(this.student_history=t.data,this.student_history_length_old=this.student_history.length):this.$snotify.info("Не забудьте сделать запись!")}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})},remove_item(t){this.$api.post("/check",{action:"remove",student:this.student_fio,data:{error:t.item.error}}).then(e=>{"true"===e.data.success?(this.student_history=this.student_history.filter(function(e){return e!==t.item}),this.$refs.errors_table.refresh()):this.$snotify.error(e.data.error)}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})},add_item(){this.error_text&&(this.default_errors.push({text:this.error_text,comment:this.comment_text}),this.status.push(this.error_text),this.error_text="",this.comment_text="")},end_check(){0!==this.student_history.length||0===this.student_history_length_old?(this.status.forEach(t=>{let e="";for(let s in this.default_errors.values())if(s.text===t){e=s.comment;break}this.$api.post("/check",{action:"add",student:this.student_fio,data:{error:t,comment:e}})}),this.$api.post("/time/teacher",{teacher:localStorage.getItem("name"),student:this.student_fio,action:"end"}).then(t=>{t.data.result?(this.$router.push("/account"),this.$snotify.info("Success!")):this.$snotify.error(t.data.error)}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})):this.$snotify.warning("Ошибок нет!")},passed_control(){0===this.student_history.length&&0===this.status.length?this.$api.post("/student/passed",{student:this.student_fio}).then(()=>{this.$api.post("/time/teacher",{teacher:localStorage.getItem("name"),student:this.student_fio,action:"end"}).then(t=>{t.data.result?(this.$router.push("/account"),this.$snotify.info("Success!")):this.$snotify.error(t.data.error)}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)}):this.$snotify.warning("В работе еще есть ошибки!")},failed_control(){this.$api.post("/student/failed",{student:this.student_fio}).then(()=>{this.end_check()}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})}},created:function(){this.student_fio=this.$route.params.student_fio,this.get_history()}},N=F,A=Object(h["a"])(N,I,Y,!1,null,"65d365da",null),R=A.exports,B=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("b-container",[s("b-row",[t._v(t._s(t.student_fio))])],1)],1)},J=[],L={name:"History_page",data:()=>({item:null}),methods:{},created:function(){this.student_fio=this.$route.params.student_fio}},U=L,z=Object(h["a"])(U,B,J,!1,null,"8acc45a0",null),K=z.exports;const V=[{path:"/",component:_,name:"indexPage",meta:{}},{path:"/account",component:P,name:"accountPage",meta:{}},{path:"/work/:student_fio",component:R,name:"checkPage",meta:{}},{path:"/history",component:K,name:"historyPage",meta:{}}];var X=V,q=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("Navigation"),s("router-view"),s("vue-snotify")],1)},G=[],Q=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"dark"}},[s("b-navbar-brand",{attrs:{href:"#"}},[t._v("HSE Exams")]),s("b-navbar-nav",{staticClass:"ml-auto text-center"},[s("div",[s("b-button",{attrs:{variant:"success"},on:{click:t.login_teacher}},[t._v("\n                    Teacher\n                ")])],1),s("div",{staticClass:"ml-1"},[s("b-button",{attrs:{variant:"info"},on:{click:t.login_student}},[t._v("\n                    Student\n                ")])],1),s("div",{staticClass:"ml-4"},[s("b-button",{attrs:{variant:"warning"},on:{click:t.reset_control}},[t._v("\n                    Reset\n                ")])],1)]),s("b-navbar-nav",{staticClass:"ml-auto"},[this.username?s("div",[s("div",{staticClass:"ml-5 text-light"},[s("strong",[t._v("Username:")]),t._v(" "+t._s(this.username)+"\n                ")]),s("div",{staticClass:"ml-5 text-light"},[s("strong",[t._v("Role:")]),t._v("\n                    "+t._s(this.roles_dict[this.user_role])+"\n                    "),s("b-button",{on:{click:function(e){return t.exit()}}},[t._v("Sign out")])],1)]):t._e()])],1)],1)},W=[],Z={name:"Navigation",data:()=>({roles_dict:["student","teacher"]}),methods:{exit(){this.$store.commit("set_user",{name:null,role:0,control:null}),localStorage.removeItem("login"),localStorage.removeItem("password"),this.$router.push({path:"/"})},login_teacher(){localStorage.login="sh@mail.ru",localStorage.password="123",localStorage.name="A K Shuvaev",this.$router.push({path:"/"})},login_student(){localStorage.login="nv@mail.ru",localStorage.password="123",localStorage.name="V I Novikov",this.$router.push({path:"/"})},reset_control(){this.$api.get("/dev/unset_control").then(t=>{this.$snotify.info("Success reset control"),this.$router.push({path:"/"})}).catch(t=>{this.$snotify.error(`Error status ${t.response.status}`)})}},computed:Object(o["b"])(["username","user_role"])},tt=Z,et=Object(h["a"])(tt,Q,W,!1,null,"7b051990",null),st=et.exports,at={components:{Navigation:st}},rt=at,nt=(s("5c0b"),Object(h["a"])(rt,q,G,!1,null,null,null)),ot=nt.exports;const it=s("bc3a");var lt=it.create({baseURL:"/api/v1"});i["default"].use(r["a"]),i["default"].use(n["a"]),i["default"].use(o["a"]),i["default"].use(a["b"],{toast:{position:a["a"].rightTop,timeout:3e3}}),i["default"].prototype.$api=lt;const ct=new o["a"].Store({state:{username:null,user_role:0,user_control:!1},mutations:{set_user(t,e){t.username=e.name,t.user_role=e.role,t.user_control=e.control}}}),dt=new n["a"]({routes:X,mode:"history",scrollBehavior:()=>({y:0})});new i["default"]({el:"#app",router:dt,store:ct,render:t=>t(ot)})},"5c0b":function(t,e,s){"use strict";var a=s("5e27"),r=s.n(a);r.a},"5e27":function(t,e,s){},"6e4c":function(t,e,s){"use strict";var a=s("478d"),r=s.n(a);r.a}});