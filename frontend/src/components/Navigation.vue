<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">HSE Exams</b-navbar-brand>
            <b-navbar-nav>
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
            }
        },
        computed: mapState([
            'username', 'user_role'
        ])
    }
</script>

<style scoped>

</style>