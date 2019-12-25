<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <b-container>
            <b-row>{{student_fio}}</b-row>
            <b-table ref="errors_table" striped hover :items="student_history" :fields="fields">
                <template v-slot:cell(del)="item">
                    <b-button variant="success" class="btn-sm" @click="remove_item(item)">Ошибка исправлена</b-button>
                </template>
            </b-table>
            <b-row>
                <b-col>
                    <b-row>
                        <b-form-select v-model="error_text" :options="options">
                        </b-form-select>
                        <b-form-input v-model="error_text" placeholder="Ошибка"></b-form-input>
                    </b-row>
                </b-col>
                <b-col>
                    <b-form-input v-model="comment_text" placeholder="Комментарий"></b-form-input>
                </b-col>
                <b-col>
                    <b-button class="btn-sm" @click="add_item(item)">Добавить ошибку</b-button>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col>
                    <b-button class="btn-lg" @click="end_check()">Отправить на повторный</b-button>
                </b-col>
                <b-col>
                    <b-button class="btn-lg" variant="success" @click="passed_control()">Успешно прошел нормоконтроль
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "Check_page",
        data: () => ({
            fields: [
                {
                    key: 'error',
                    label: 'Ошибка',
                    variant: 'danger'
                },
                {
                    key: 'comment',
                    label: 'Комментарий',
                },
                {
                    key: 'del',
                    label: '',
                },
            ],
            options: ['error one', 'error 2', 'error 3'],
            student_history: [],
            student_fio: null,
            error_text: '',
            comment_text: '',
            item: null
        }),
        methods: {
            get_history() {
                this.$api.get("/check?student=" + this.student_fio)
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
            remove_item(item) {
                this.$api.post("/check", {
                    action: 'remove',
                    student: this.student_fio,
                    data: {
                        'error': item.item.error,
                    }
                })
                    .then((data) => {
                        if (data.data.success === 'true') {
                            this.student_history = this.student_history.filter(function (ele) {
                                return ele !== item.item;
                            });
                            this.$refs.errors_table.refresh();
                        } else {
                            this.$snotify.error(data.data.error)
                        }
                    })
                    .catch(e => {
                        this.$snotify.error(`Error status ${e.response.status}`);
                    });
            },
            add_item() {
                if (this.error_text) {
                    this.$api.post("/check", {
                        action: 'add',
                        student: this.student_fio,
                        data: {
                            'error': this.error_text,
                            'comment': this.comment_text
                        }
                    })
                        .then((data) => {
                            if (data.data.success === 'true') {
                                this.student_history.push({'error': this.error_text, 'comment': this.comment_text});
                                this.$refs.errors_table.refresh();
                                this.error_text = '';
                                this.comment_text = ''
                            } else {
                                this.$snotify.error(data.data.error)
                            }
                        })
                        .catch(e => {
                            this.$snotify.error(`Error status ${e.response.status}`);
                        });
                }
            },
            end_check() {
                this.$api.post("/time/teacher", {
                    teacher: this.$store.state.username,
                    student: this.student_fio,
                    action: 'end'
                })
                    .then((data) => {
                        if (data.data.result) {
                            this.$router.push('/account')
                        } else {
                            this.$snotify.error(data.data.error)
                        }
                    })
                    .catch(e => {
                        this.$snotify.error(`Error status ${e.response.status}`);
                    });
            },
            passed_control() {
                if (this.student_history.length===0) {
                    this.$api.post("/student/passed", {
                        student: this.student_fio
                    })
                        .then((data) => {
                            this.end_check()
                        })
                        .catch(e => {
                            this.$snotify.error(`Error status ${e.response.status}`);
                        });
                }else{
                    this.$snotify.warning('В работе еще есть ошибки!')
                }
            }
        },
        created: function () {
            this.student_fio = this.$route.params.student_fio;
            this.get_history();
        }
    }
</script>

<style scoped>

</style>