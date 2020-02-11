import Vue from 'vue';
import VueRouter from 'vue-router';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/index.vue')
        }
    ]
});

Vue.use(VueRouter);

export default router;
