<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <b-row>
            <b-col><h3>Скачать файл: <a :href="'/api/v1/file/'+this.$store.state.username+'_project.docx'"
                                        download>download</a></h3>
            </b-col>
        </b-row>
        <div v-if="this.$store.state.user_control===0">
            <b-row class="mt-2">
                <b-col sm="6">
                    <b-form-file
                            v-model="file"
                            :state="Boolean(file)"
                            placeholder="Выберите или перетащите сюда новый файл..."
                            drop-placeholder="Drop file here..."
                            accept=".doc, .docx"
                    ></b-form-file>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="6" class="text-sm-center"><em>Предыдущий файл сотрется!</em></b-col>
            </b-row>
            <div v-if="loader_teacher_date" class="text-center">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
            <div ref="student_table_show" v-if="!student_date">
                <b-row class="mt-2">
                    <b-col v-if="free_dates.length>0 || loader_teacher_date" sm="6">
                        <b-row>
                            <b-col><h5>Свободное время преподавателей</h5></b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-table ref="dates_table_student" striped hover :items="free_dates" :fields="fields">
                                    <template v-slot:cell(teacher)="item">
                                        {{item.item.teacher}}
                                    </template>
                                    <template v-slot:cell(date)="item">
                                        {{item.item.begin.getDate()+'.'+item.item.begin.getMonth()+'.'+item.item.begin.getFullYear()}}
                                    </template>
                                    <template v-slot:cell(begin)="item">
                                        {{item.item.begin.getHours()}}:{{item.item.begin.getMinutes()}}
                                    </template>
                                    <template v-slot:cell(end)="item">
                                        {{item.item.end.getHours()}}:{{item.item.end.getMinutes()}}
                                    </template>
                                    <template v-slot:cell(confirm)="item">
                                        <b-button class="btn-sm" @click="add(item.item)">+</b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col v-else>
                        <b-card title="К сожалению, нет доступного для записи времени..."
                                class="mb-2 text-center"></b-card>
                    </b-col>
                </b-row>
            </div>
            <div v-else class="mt-2">
                <b-card title="Ваша запись" style="max-width: 20rem;" class="mb-2">
                    <b-card-text>
                        <b-row>
                            <b-col>Teacher:</b-col>
                            <b-col>{{student_date.teacher}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col>Date:</b-col>
                            <b-col>
                                {{student_date.begin.getDate()+'.'+student_date.begin.getMonth()+'.'+student_date.begin.getFullYear()}}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>Time:</b-col>
                            <b-col>
                                {{student_date.begin.getHours()}}:{{student_date.begin.getMinutes()}}-{{student_date.end.getHours()}}:{{student_date.end.getMinutes()}}
                            </b-col>
                        </b-row>
                    </b-card-text>
                    <b-button class="btn-sm" @click="remove()">Отменить</b-button>

                </b-card>
            </div>
            <b-row class="mt-2" v-if="this.student_history.length>0">
                <b-col>
                    <b-table ref="errors_table" striped hover :items="student_history" :fields="fields2">
                    </b-table>
                </b-col>
            </b-row>
            <b-row v-else>
                <b-col>
                    <b-card title="Ошибок нет" class="mb-2 text-center"></b-card>
                </b-col>
            </b-row>
        </div>
        <div v-else-if="this.$store.state.user_control===1">
            <b-row>
                <b-col>
                    <b-card title="Нормоконтроль пройден" class="mb-2 text-center"></b-card>
                </b-col>
            </b-row>
        </div>
        <div v-else>
            <b-row>
                <b-col>
                    <b-card title="Нормоконтроль не пройден" class="mb-2 text-center"></b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import DatePicker from 'vue2-datepicker';

    export default {
        name: "Account_student",
        components: {DatePicker},
        data: () => ({
            fields: [
                {
                    key: 'teacher',
                    label: 'Преподаватель',
                    sortable: true
                },
                {
                    key: 'date',
                    label: 'День',
                    sortable: true
                },
                {
                    key: 'begin',
                    label: 'Начало',
                    sortable: true
                },
                {
                    key: 'end',
                    label: 'Конец',
                    sortable: true
                },
                {
                    key: 'confirm',
                    label: '',
                    sortable: false
                },
            ],
            loader_teacher_date: true,
            free_dates: [],
            student_date: null,
            fields2: [
                {
                    key: 'error',
                    label: 'Ошибка',
                    variant: 'danger'
                },
                {
                    key: 'comment',
                    label: 'Комментарий',
                },
            ],
            student_history: [],
            file: null,
            return_file: null
        }),
        methods: {
            remove() {
                this.loader_teacher_date = true;
                this.$api.post("/time/student", {
                    date: {
                        date: this.student_date.date.getTime(),
                        begin: this.student_date.begin.getTime(),
                        end: this.student_date.end.getTime(),
                    },
                    teacher: this.student_date.teacher,
                    student: this.$store.state.username,
                    action: 'delete'
                }).then((data) => {
                    if (data.data.result === 'success') {
                        this.$snotify.success("Время отменено!");
                        this.student_date = null;
                        this.loader_teacher_date = false
                    } else {
                        this.$snotify.error("error")
                    }
                }).catch(e => {
                    this.$snotify.error(`Error status ${e.response.status}`);
                });
                this.$api.get("/time/free")
                    .then((data) => {
                        if (!data.data.error) {
                            data.data.forEach(function (item) {
                                dates.push({
                                    begin: new Date(item.begin),
                                    end: new Date(item.end),
                                    teacher: item.teacher
                                })
                            });
                            this.free_dates = dates;
                            this.loader_teacher_date = false;
                        }
                    })
                    .catch(e => {
                        this.$snotify.error(`Error status ${e.response.status}`);
                    });
                this.loader_teacher_date = false
            },
            add(item) {
                this.$api.post("/time/student", {
                    date: {
                        date: item.date.getTime(),
                        begin: item.begin.getTime(),
                        end: item.end.getTime(),
                    },
                    teacher: item.teacher,
                    student: this.$store.state.username,
                    action: 'create'
                })
                    .then((data) => {
                        if (data.data.result === 'success') {
                            this.$snotify.success("Время зарезервировано!");
                            this.student_date = {
                                date: item.date,
                                begin: item.begin,
                                end: item.end,
                                teacher: item.teacher
                            };
                        } else {
                            this.$snotify.error("error")
                        }
                    }).catch(e => {
                    this.$snotify.error(`Error status ${e.response.status}`);
                });
            },
            get_history() {
                this.$api.get("/check/?student=" + this.$store.state.username)
                    .then((data) => {
                        if (data.data) {
                            this.student_history = data.data;
                        } else {
                            this.$snotify.info("Не забудьте сделать запись!")
                        }
                    })
                    .catch(e => {
                        this.$snotify.error(`Error status ${e.response.status}`);
                    });
            },
        },
        created() {
            if (this.$store.state.username && this.$store.state.user_control === 0) {
                let dates = [];
                this.$api.get("/time/student/?student=" + this.$store.state.username)
                    .then((data) => {
                        if (data.data.result === "success") {
                            this.student_date = {
                                date: new Date(data.data.date.date),
                                begin: new Date(data.data.date.begin),
                                end: new Date(data.data.date.end),
                                teacher: data.data.date.teacher
                            };
                        } else {
                            this.$snotify.info("Не забудьте сделать запись!");
                            this.$api.get("/time/free/")
                                .then((data) => {
                                    if (!data.data.error) {
                                        data.data.forEach(function (item) {
                                            dates.push({
                                                date: new Date(item.date),
                                                begin: new Date(item.begin),
                                                end: new Date(item.end),
                                                teacher: item.teacher
                                            })
                                        });
                                        this.free_dates = dates;
                                    }
                                    this.loader_teacher_date = false;

                                })
                                .catch(e => {
                                    this.$snotify.error(`Error status ${e.response.status}`);
                                });
                        }
                        this.loader_teacher_date = false;

                    })
                    .catch(e => {
                        this.$snotify.error(`Error status ${e.response.status}`);
                    }).then(() => {
                    this.get_history();
                })
            }
        },
        watch: {
            file: function (val, oldVal) {
                if (this.file) {
                    let formData = new FormData();
                    formData.append('student', this.$store.state.username);
                    formData.append('file', this.file);
                    this.$api.post("/file", formData)
                        .then((data) => {
                            this.$snotify.success("Файл загружен!")
                            //todo
                            // if (data.data) {
                            //     this.$snotify.success("Файл загружен!")
                            // } else {
                            //     this.$snotify.warning("Файл поврежден!")
                            // }
                        })
                    // .catch(e => {
                    //     this.$snotify.error(`Error status ${e.response.status}`);
                    // });
                }
            }
        }
    }
</script>

<style scoped>

</style>