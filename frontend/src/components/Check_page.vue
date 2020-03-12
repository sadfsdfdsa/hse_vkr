<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <b-container>
            <b-row class="mt-2">
                <b-col><h4>Student:
                    {{student_fio}}</h4>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h4>
                        <b-button pill variant="outline-primary"
                                  v-b-popover.hover.top="'Если файл не открывается - значит он не  загружен на сервер.'">
                            !
                        </b-button>
                        Скачать файл:
                        <a :href="'/api/v1/file/'+student_fio+'_project.docx'" download>Download</a>
                    </h4>
                </b-col>
            </b-row>
            <b-row v-if="student_history.length>0 || student_history_length_old!==0">
                <b-col>
                    <b-row>
                        <b-col>
                            <h5 style="color: red">
                                <b-button pill variant="outline-danger"
                                          v-b-popover.hover.top="'Проверка начнется как-будто заново, но в последствии у студента второй возможности не будет!'">
                                    !
                                </b-button>
                                Не перезагружайте страницу до завершения проверки!
                            </h5>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-table ref="errors_table" striped hover :items="student_history" :fields="fields">
                                <template v-slot:cell(del)="item">
                                    <b-button variant="success" class="btn-sm" @click="remove_item(item)">Ошибка
                                        исправлена
                                    </b-button>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-button class="btn-lg" variant="warning" @click="failed_control()">Нормоконтроль не
                                пройден
                            </b-button>
                        </b-col>
                        <b-col>
                            <b-button class="btn-lg" variant="success" @click="passed_control()">Успешно прошел
                                нормоконтроль
                            </b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <div v-else>
                <b-row class="mt-2">
                    <b-col>
                        <b-table ref="dates_table_teacher" striped hover :items="default_errors" :fields="fields2">
                            <template v-slot:cell(button)="item">
                                <b-form-checkbox
                                        v-model="status"
                                        :value="item.item.text"
                                        size="lg" stacked>
                                </b-form-checkbox>
                            </template>
                            <template v-slot:cell(error)="item">
                                {{item.item.text}}
                            </template>
                            <template v-slot:cell(comment)="item">
                                <b-form-input :v-model="default_errors[default_errors.indexOf(item.item)].comment"
                                              placeholder="Комментарий"></b-form-input>
                            </template>
                        </b-table>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-input v-model="error_text" placeholder="Ошибка"></b-form-input>

                    </b-col>
                    <b-col>
                        <b-form-input v-model="comment_text" placeholder="Комментарий"></b-form-input>
                    </b-col>
                    <b-col>
                        <b-button class="btn-md" @click="add_item(item)">Добавить ошибку</b-button>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col v-if="student_history_length_old===0">
                        <b-button class="btn-lg" @click="end_check()">Отправить на повторный</b-button>
                    </b-col>
                    <b-col v-else>
                        <b-button class="btn-lg" variant="warning" @click="failed_control()">Нормоконтроль не пройден
                        </b-button>
                    </b-col>
                    <b-col>
                        <b-button class="btn-lg" variant="success" @click="passed_control()">Успешно прошел
                            нормоконтроль
                        </b-button>
                    </b-col>
                </b-row>
            </div>
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
            fields2: [
                {
                    key: 'button',
                    label: 'Ошибка',
                },
                {
                    key: 'error',
                    label: 'Текст ошибки',
                },
                {
                    key: 'comment',
                    label: 'Комментарий',
                },

            ],
            status: [],
            default_errors: [
                {
                    text: '4.0 Ошибка оформления страниц (отступы и тд)',
                    comment: ''
                },
                {
                    text: '4.0 Ошибка нумерации страниц',
                    comment: ''
                },
                {
                    text: '4.0 Ошибка в использовании шрифтов',
                    comment: ''
                },
                {
                    text: '4.0 Ошибка абзацного членения',
                    comment: ''
                },
                {
                    text: '4.0 Отсутствует список терминов',
                    comment: ''
                },
                {
                    text: '4.0 Присутствуют неприменимые обороты',
                    comment: ''
                },
                {
                    text: '4.0 Ошибка наименивания команд и тд',
                    comment: ''
                }, {
                    text: '4.1 Смысловая ошибка в заголовках',
                    comment: ''
                },
                {
                    text: '4.1 Ошибка структуры разделов',
                    comment: ''
                }, {
                    text: '4.2 Ошибка оформления списков',
                    comment: ''
                }, {
                    text: '4.3 Ошибка оформления таблиц',
                    comment: ''
                }, {
                    text: '4.4 Ошибка оформления формул',
                    comment: ''
                }, {
                    text: '4.5 Ошибка оформления иллюстраций',
                    comment: ''
                }, {
                    text: '4.6 Ошибка оформления библиографического списка',
                    comment: ''
                }, {
                    text: '4.7 Ошибка оформления приложений',
                    comment: ''
                },
            ],
            student_history: [],
            student_history_length_old: 0,
            student_fio: null,
            error_text: '',
            comment_text: '',
            item: null,
            second_check_flag: null
        }),
        methods: {
            get_history() {
                this.$api.get("/check/?student=" + this.student_fio)
                    .then((data) => {
                        if (data.data) {
                            this.student_history = data.data;
                            this.student_history_length_old = this.student_history.length;
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
                    this.default_errors.push({
                        text: this.error_text,
                        comment: this.comment_text
                    });
                    this.status.push(this.error_text);
                    this.error_text = '';
                    this.comment_text = ''
                }
            },
            end_check() {
                if (this.student_history.length !== 0 || this.student_history_length_old === 0) {
                    this.status.forEach(item => {
                        let tmp = '';
                        for (let sub_item in this.default_errors.values()) {
                            if (sub_item.text === item) {
                                tmp = sub_item.comment;
                                break;
                            }
                        }
                        this.$api.post("/check", {
                            action: 'add',
                            student: this.student_fio,
                            data: {
                                'error': item,
                                'comment': tmp
                            }
                        })
                    });
                    this.$api.post("/time/teacher", {
                        teacher: localStorage.getItem('name'),
                        student: this.student_fio,
                        action: 'end'
                    })
                        .then((data) => {
                            if (data.data.result) {
                                this.$router.push('/account');
                                this.$snotify.info('Success!')

                            } else {
                                this.$snotify.error(data.data.error)
                            }
                        })
                        .catch(e => {
                            this.$snotify.error(`Error status ${e.response.status}`);
                        });
                } else {
                    this.$snotify.warning('Ошибок нет!')
                }
            },
            passed_control() {
                if (this.student_history.length === 0 && this.status.length === 0) {
                    this.$api.post("/student/passed", {
                        student: this.student_fio
                    })
                        .then(() => {
                            this.$api.post("/time/teacher", {
                                teacher: localStorage.getItem('name'),
                                student: this.student_fio,
                                action: 'end'
                            })
                                .then((data) => {
                                    if (data.data.result) {
                                        this.$router.push('/account');
                                        this.$snotify.info('Success!')
                                    } else {
                                        this.$snotify.error(data.data.error)
                                    }
                                })
                                .catch(e => {
                                    this.$snotify.error(`Error status ${e.response.status}`);
                                });
                        })
                        .catch(e => {
                            this.$snotify.error(`Error status ${e.response.status}`);
                        });
                } else {
                    this.$snotify.warning('В работе еще есть ошибки!')
                }
            },
            failed_control() {
                this.$api.post("/student/failed", {
                    student: this.student_fio
                })
                    .then(() => {
                        //todo
                        this.end_check()
                    })
                    .catch(e => {
                        this.$snotify.error(`Error status ${e.response.status}`);
                    });
            }
        },
        created: function () {
            this.student_fio = this.$route.params.student_fio;
            this.get_history();
        },
    }
</script>

<style scoped>

</style>