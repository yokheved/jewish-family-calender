<template>
    <div>
        <TopNav/>
        <Calender jYear="5785" />
    </div>
</template>

<script>
import Calender from './Calender.vue'
import TopNav from './TopNav.vue';

export default {
    components: {
        Calender, 
        TopNav
    }
}
</script>

<style scoped>
div {
    width: 100%;
    height: 100vh;
}
</style>