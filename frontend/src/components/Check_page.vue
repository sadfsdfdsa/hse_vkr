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
            <div>
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
                <b-row class="mt-2">
                    <b-col>
                        <b-table ref="dates_table_teacher" striped hover :items="default_errors" :fields="fields2">
                            <template v-slot:cell(button)="item">
                                <b-form-checkbox
                                        v-model="item.item.isActive"
                                        size="lg" stacked @change="edit_number(!item.item.isActive)">
                                </b-form-checkbox>
                            </template>
                            <template v-slot:cell(error)="item">
                                {{item.item.error}}
                            </template>
                            <template v-slot:cell(comment)="item">
                                <b-form-input v-model="item.item.comment"
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
                    <b-col>
                        <b-button class="btn-lg" @click="end_check()">Отправить на повторный</b-button>
                    </b-col>
                    <b-col>
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

            fields2: [
                {
                    key: 'button',
                    label: 'Ошибка',
                    sortable: true
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
            default_errors: [
                {
                    error: '4.0 Ошибка оформления страниц (отступы и тд)',
                    comment: '',
                    isActive: false,
                },
                {
                    error: '4.0 Ошибка нумерации страниц',
                    comment: '',
                    isActive: false,

                },
                {
                    error: '4.0 Ошибка в использовании шрифтов',
                    comment: '',
                    isActive: false,
                },
                {
                    error: '4.0 Ошибка абзацного членения',
                    comment: '',
                    isActive: false,
                },
                {
                    error: '4.0 Отсутствует список терминов',
                    comment: '',
                    isActive: false,
                },
                {
                    error: '4.0 Присутствуют неприменимые обороты',
                    comment: '',
                    isActive: false,
                },
                {
                    error: '4.0 Ошибка наименивания команд и тд',
                    comment: '',
                    isActive: false,
                }, {
                    error: '4.1 Смысловая ошибка в заголовках',
                    comment: '',
                    isActive: false,
                },
                {
                    error: '4.1 Ошибка структуры разделов',
                    comment: '',
                    isActive: false,
                }, {
                    error: '4.2 Ошибка оформления списков',
                    comment: '',
                    isActive: false,
                }, {
                    error: '4.3 Ошибка оформления таблиц',
                    comment: '',
                    isActive: false,
                }, {
                    error: '4.4 Ошибка оформления формул',
                    comment: '',
                    isActive: false,
                }, {
                    error: '4.5 Ошибка оформления иллюстраций',
                    comment: '',
                    isActive: false,
                }, {
                    error: '4.6 Ошибка оформления библиографического списка',
                    comment: '',
                    isActive: false,
                }, {
                    error: '4.7 Ошибка оформления приложений',
                    comment: '',
                    isActive: false,
                },
            ],
            student_history: [],
            student_fio: null,
            error_text: '',
            comment_text: '',
            errors_number: 0,
            item: null
        }),
        methods: {
            log_text(item){
              console.log(item.item.comment)
            },
            edit_number(flag) {
                if (flag) {
                    this.errors_number += 1
                } else {
                    this.errors_number -= 1;
                }
            },

            get_history() {
                this.$api.get("/check/?student=" + this.student_fio)
                    .then((data) => {
                        if (data.data) {
                            this.student_history = data.data;
                            this.errors_number = this.student_history.length;
                            this.default_errors = this.default_errors.concat(this.student_history);
                        } else {
                            this.$snotify.warning("Неизвестная ошибка...")
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
                        error: this.error_text,
                        comment: this.comment_text,
                        isActive: true
                    });
                    this.error_text = '';
                    this.comment_text = ''
                }
            },
            end_check() {
                if (this.errors_number > 0) {
                    let tmp = [];
                    for (let i = 0; i < this.default_errors.length; i++) {
                        if (this.default_errors[i].isActive === true) {
                            tmp.push(this.default_errors[i])
                        }
                    }
                    this.$api.post("/check", {
                        student: this.student_fio,
                        data: tmp
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
                    this.$snotify.warning('В работе нет ошибок')
                }
            },
            passed_control() {
                if (this.errors_number <= 0 && confirm("Подтвердите успешное прохождение")) {
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
                    this.$snotify.warning('Еще есть ошибки в работе')
                }
            },
            failed_control() {
                if (this.errors_number <= 0 && confirm("Подтвердите НЕУД")) {
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
                } else {
                    this.$snotify.warning('В работе нет ошибок')
                }
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