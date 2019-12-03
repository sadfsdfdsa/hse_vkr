<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <b-row class="mt-5">
            <div ref="student_table_show" v-if="!student_date">
                <b-col sm="6">
                    <b-row>Свободное время преподавателей</b-row>
                    <b-row>
                        <b-table ref="dates_table_student" striped hover :items="free_dates" :fields="fields">
                            <template v-slot:cell(teacher)="item">
                                {{item.item.teacher}} + ФИО
                            </template>
                            <template v-slot:cell(date)="item">
                                {{item.item.date.toString().split('00:00:00')[0]}}
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
                    <b-col>{{student_date.date.toString().split('00:00:00')[0]}}</b-col>
                    <b-col>
                        {{student_date.begin.getHours()}}:{{student_date.begin.getMinutes()}}-{{student_date.end.getHours()}}:{{student_date.end.getMinutes()}}
                    </b-col>
                </b-row>
            </div>
        </b-row>
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
            student_date: null
        }),
        methods: {
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
        },
        beforeCreate() {
            if (this.$store.state.username) {
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
        }
    }
</script>

<style scoped>

</style>