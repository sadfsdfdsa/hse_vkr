<template>
    <div>
        <b-container>
            <b-row>
                <b-col>Username:</b-col>
                <b-col>{{this.username}}</b-col>
                <b-col>{{this.role[this.user_role]}}</b-col>
            </b-row>
            <div v-if="this.user_role===1">
                <teacher_template></teacher_template>
            </div>
            <div v-else>
                <student_template></student_template>
            </div>
        </b-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import student_template from './Account_student';
    import teacher_template from './Account_teacher';

    export default {
        components: {student_template, teacher_template},
        data: () => ({
            role: ["student", "teacher"],
        }),
        // methods: {
        //     submit() {
        //
        //     }
        // },
        computed: mapState([
            'username', 'user_role'
        ]),
        beforeCreate() {
            if (!this.$store.state.username) {
                this.$router.push('/')
            }
        },
    }
</script>

<style scoped>

</style>