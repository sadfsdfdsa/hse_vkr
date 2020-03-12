<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">HSE Exams</b-navbar-brand>
            <b-navbar-nav class="ml-auto text-center">
                <div>
                    <b-button @click="login_teacher(0)" variant="success">
                        Teacher1
                    </b-button>
                </div>
                <div class="ml-1">
                    <b-button @click="login_teacher(1)" variant="success">
                        Teacher2
                    </b-button>
                </div>
                <div class="ml-1">
                    <b-button @click="login_student(0)" variant="info">
                        Student1
                    </b-button>
                </div>
                <div class="ml-1">
                    <b-button @click="login_student(1)" variant="info">
                        Student2
                    </b-button>
                </div>
                <div class="ml-4">
                    <b-button @click="reset_control" variant="warning">
                        Reset
                    </b-button>
                </div>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <div v-if="this.username">
                    <div class="ml-5 text-light"><strong>Username:</strong> {{this.username}}
                    </div>
                    <div class="ml-5 text-light"><strong>Role:</strong>
                        {{this.roles_dict[this.user_role]}}
                        <b-button @click="exit()">Sign out</b-button>
                    </div>
                </div>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>


<script>
    import {mapState} from 'vuex';

    export default {
        name: "Navigation",
        data: () => ({
            roles_dict: [
                'student', 'teacher'
            ]
        }),
        methods: {
            exit() {
                this.$store.commit("set_user", {
                    name: null,
                    role: 0,
                    control: null
                });
                localStorage.removeItem('login');
                localStorage.removeItem('password');
                this.$router.push({path: '/'});
            },


            login_teacher(second = 0) {
                if (second === 0) {
                    localStorage.login = 'sh@mail.ru';
                    localStorage.password = '123';
                    localStorage.name = 'A K Shuvaev';
                } else {
                    localStorage.login = 'va@mail.ru';
                    localStorage.password = '123';
                    localStorage.name = 'V A Kushev';
                }

                if (this.$route.path === '/') {
                    this.$router.push({path: '/account'});

                } else {
                    this.$router.push({path: '/'});
                }
            },
            login_student(second = 0) {
                if (second === 0) {
                    localStorage.login = 'nv@mail.ru';
                    localStorage.password = '123';
                    localStorage.name = 'V I Novikov';
                } else {
                    localStorage.login = 'kv@mail.ru';
                    localStorage.password = '123';
                    localStorage.name = 'K V Khlebalov';
                }

                if (this.$route.path === '/') {
                    this.$router.push({path: '/account'});

                } else {
                    this.$router.push({path: '/'});
                }
            },
            reset_control() {
                this.$api.get("/dev/unset_control")
                    .then((data) => {
                        this.$snotify.info('Success reset control');
                        this.$router.push({path: '/'});

                    })
                    .catch(e => {
                        this.$snotify.error(`Error status ${e.response.status}`);
                    });
            }
        },
        computed: mapState([
            'username', 'user_role'
        ])
    }
</script>

<style scoped>

</style>