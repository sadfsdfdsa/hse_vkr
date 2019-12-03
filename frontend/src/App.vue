<template>
    <div>
        <Navigation></Navigation>
        <router-view></router-view>
        <vue-snotify></vue-snotify>
    </div>
</template>

<script>
    import Navigation from "./components/Navigation";

    export default {
        components: {Navigation}
    }
</script>

<style lang="scss">
    @import "~vue-snotify/styles/material.css";
</style>
