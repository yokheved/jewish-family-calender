<template>
    <div class="topNav">
        <h1>משפחה</h1>
        <p>{{ today }}</p>
    </div>
</template>

<script>
import { jDate } from 'jcal-zmanim';
export default {
    data() {
        return {
            today: jDate.now().toStringHeb()
        }
    }
}
</script>

<style scoped>
div.topNav {
    top: 0;
    height: fit-content;
    width:100%;
    margin: 0.1rem 0;	
    position: sticky;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #ddf8f8;
    border-bottom: 1px solid #e9ecef;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
h1{
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
    padding: 0;
}
</style>