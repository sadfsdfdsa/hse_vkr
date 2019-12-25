<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <b-container>
            <b-row>{{student_fio}}</b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "History_page",
        data: () => ({
            item: null
        }),
        methods: {},
        created: function () {
            this.student_fio = this.$route.params.student_fio
        }
    }
</script>

<style scoped>

</style>