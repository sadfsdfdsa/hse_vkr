<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="primary">
            <b-navbar-brand href="#">HSE Exams</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <div v-if="this.$store.state.username!==''">
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item :to="{name: 'indexPage'}">Home</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav>
                        <b-nav-item :to="{name: 'indexPage'}">Exit</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </div>
</template>


<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>

</style>