<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'Index',

    components: {
        HelloWorld
    }
};
</script>

<template>
    <div class="index-page">
        <img alt="Vue logo" src="@/assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<style>
.index-page {
    text-align: center;
}
</style>
