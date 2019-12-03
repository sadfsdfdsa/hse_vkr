<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <b-row>
            <b-col>Teacher</b-col>
        </b-row>
        <b-row>
            <b-col sm="7">
                <date-picker v-model="date" format="YYYY-MM-DD" lang="en" confirm></date-picker>
                <date-picker v-model="begin_time" lang="en" type="time"
                             format="HH:mm" :minute-step="10" placeholder="Start"
                             :time-picker-options="{ start: '08:10', step: '00:20', end: '19:30' }"
                             confirm>
                </date-picker>

                <date-picker v-model="end_time" lang="en" type="time"
                             format="HH:mm" :minute-step="10" placeholder="End"
                             :time-picker-options="{ start: this.begin_time.getHours()+':'+(this.begin_time.getMinutes()+20),
                             step: '00:20', end: '19:30' }" confirm>
                </date-picker>
            </b-col>
            <b-col>
                <b-button @click="add()" class="btn-md" variant="primary">Add date</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="5">
                <b-row>Ваше свободное время</b-row>
                <b-row>
                    <b-table ref="dates_table_teacher" striped hover :items="dates" :fields="fields">
                        <template v-slot:cell(date)="item">
                            {{item.item.date.toString().split('00:00:00')[0]}}
                        </template>
                        <template v-slot:cell(begin)="item">
                            {{item.item.begin.getHours()}}:{{item.item.begin.getMinutes()}}
                        </template>
                        <template v-slot:cell(end)="item">
                            {{item.item.end.getHours()}}:{{item.item.end.getMinutes()}}
                        </template>
                        <template v-slot:cell(del)="item">
                            <b-button class="btn-sm" @click="remove(item)">X</b-button>
                        </template>
                    </b-table>
                </b-row>
            </b-col>
            <b-col sm="1">
            </b-col>
            <b-col sm="6">
                <b-row>Расписание</b-row>
                <b-row>
                    <b-table ref="dates_table_teacher" striped hover :items="check_dates" :fields="fields2">
                        <template v-slot:cell(date)="item">
                            {{item.item.date.toString().split('00:00:00')[0]}}
                        </template>
                        <template v-slot:cell(begin)="item">
                            {{item.item.begin.getHours()}}:{{item.item.begin.getMinutes()}}
                        </template>
                        <template v-slot:cell(end)="item">
                            {{item.item.end.getHours()}}:{{item.item.end.getMinutes()}}
                        </template>
                        <template v-slot:cell(student)="item">
                            {{item.item.student}}+ФИО
                        </template>
                        <template v-slot:cell(check)="item">
                            <b-button class="btn-sm" @click="check(item)">Проверка</b-button>
                        </template>
                    </b-table>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import DatePicker from 'vue2-datepicker';

    export default {
        name: "Account_teacher",
        components: {DatePicker},
        data: () => ({
            fields: [
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
                    key: 'del',
                    label: '',
                    sortable: false
                },
            ],
            fields2: [
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
                    key: 'student',
                    label: 'Студент',
                    sortable: false
                },
                {
                    key: 'check',
                    label: '',
                    sortable: false
                },
            ],
            date: null,
            begin_time: new Date(),
            end_time: new Date(),
            dates: [],
            check_dates: []
        }),
        methods: {
            add() {
                if (this.begin_time < this.end_time) {
                    let tmp = {
                        date: this.date,
                        begin: this.begin_time,
                        end: this.end_time
                    };
                    this.$api.post("/time/teacher", {
                        date: {
                            date: this.date.getTime(),
                            begin: this.begin_time.getTime(),
                            end: this.end_time.getTime()
                        }, teacher: this.$store.state.username, action: 'create'
                    })
                        .then((data) => {
                            if (data.data.result === "success") {
                                this.dates.push(tmp);
                                this.$snotify.success(data.data.result)
                            } else {
                                this.$snotify.error(data.data.error)
                            }
                        })
                        .catch(e => {
                            this.$snotify.error(`Error status ${e.response.status}`);
                        });
                } else {
                    this.$snotify.warning(`Время окончения должно быть больше времени начала`);
                }
            },
            remove(item) {
                this.$api.post("/time/teacher", {
                    date: {
                        date: item.item.date.getTime(),
                        begin: item.item.begin.getTime(),
                        end: item.item.end.getTime(),
                    },
                    teacher: this.$store.state.username,
                    action: 'delete'
                })
                    .then((data) => {
                        if (data.data.result) {
                            this.dates = this.dates.filter(function (ele) {
                                return ele !== item.item;
                            });
                            this.$refs.dates_table_teacher.refresh();
                        } else {
                            this.$snotify.error(data.data.error)
                        }
                    })
                    .catch(e => {
                        this.$snotify.error(`Error status ${e.response.status}`);
                    });

            }
        },
        created: function () {
            let dates = [];
            let check_dates = [];
            this.$api.get('/time/teacher?teacher=' + this.$store.state.username)
                .then((data) => {
                    data.data.dates.forEach(function (item) {
                        if (item.student) {
                            check_dates.push({
                                date: new Date(item.date),
                                begin: new Date(item.begin),
                                end: new Date(item.end),
                                student: item.student
                            })
                        } else {
                            dates.push({
                                date: new Date(item.date),
                                begin: new Date(item.begin),
                                end: new Date(item.end)
                            })
                        }
                    });
                });
            this.check_dates = check_dates;
            this.dates = dates;
        }
    }
</script>

<style scoped>

</style>