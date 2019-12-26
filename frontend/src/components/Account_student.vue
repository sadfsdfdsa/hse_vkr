<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div v-if="this.$store.state.user_control===0">
            <b-row>
                <b-col sm="4">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Upload</span>
                        </div>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile01">
                            <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <div ref="student_table_show" v-if="!student_date">
                <b-col sm="6">
                    <b-row>Свободное время преподавателей</b-row>
                    <b-row>
                        <b-table ref="dates_table_student" striped hover :items="free_dates" :fields="fields">
                            <template v-slot:cell(teacher)="item">
                                {{item.item.teacher}}
                            </template>
                            <template v-slot:cell(date)="item">
                                {{item.item.date.getDay()+'.'+item.item.date.getMonth()+'.'+item.item.date.getFullYear()}}
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
                    </b-row>
                </b-col>
            </div>
            <div v-else>
                <b-row>Ваш нормоконтроль:</b-row>
                <b-row>{{student_date.teacher}}</b-row>
                <b-row>
                    <b-col>
                        {{student_date.date.getDay()+'.'+student_date.date.getMonth()+'.'+student_date.date.getFullYear()}}
                    </b-col>
                    <b-col>
                        {{student_date.begin.getHours()}}:{{student_date.begin.getMinutes()}}-{{student_date.end.getHours()}}:{{student_date.end.getMinutes()}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-button class="btn-sm" @click="remove()">Delete (test)</b-button>
                </b-row>
            </div>
            <b-row>
                <b-table ref="errors_table" striped hover :items="student_history" :fields="fields2">
                </b-table>
            </b-row>
        </div>
        <div v-else-if="this.$store.state.user_control===1">
            <b-row>Passed</b-row>
        </div>
        <div v-else>
            <b-row>Failed</b-row>
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
        }),
        methods: {
            remove() {
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
                        this.$snotify.success("success");
                        this.student_date = null
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
                                    date: new Date(item.date),
                                    begin: new Date(item.begin),
                                    end: new Date(item.end),
                                    teacher: item.teacher
                                })
                            });
                            this.free_dates = dates;
                        }
                    })
                    .catch(e => {
                        this.$snotify.error(`Error status ${e.response.status}`);
                    });
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
                            this.$snotify.success("success");
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
                this.$api.get("/check?student=" + this.$store.state.username)
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
            }
        },
        beforeCreate() {
            if (this.$store.state.username && this.$store.state.user_control === 0) {
                let dates = [];
                let flag = false;
                this.$api.get("/time/student?student=" + this.$store.state.username)
                    .then((data) => {
                        if (data.data.result === "success") {
                            this.student_date = {
                                date: new Date(data.data.date.date),
                                begin: new Date(data.data.date.begin),
                                end: new Date(data.data.date.end),
                                teacher: data.data.date.teacher
                            };
                            flag = true;

                        } else {
                            this.$snotify.info("Не забудьте сделать запись!")
                        }
                    })
                    .catch(e => {
                        this.$snotify.error(`Error status ${e.response.status}`);
                    });
                if (!flag) {
                    this.$api.get("/time/free")
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
                        })
                        .catch(e => {
                            this.$snotify.error(`Error status ${e.response.status}`);
                        });
                }
            }
        },
        created() {
            if (this.$store.state.user_control === 0) {
                this.get_history();
            }
        }
    }
</script>

<style scoped>

</style>