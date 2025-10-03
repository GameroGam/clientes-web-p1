import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Profile from '../pages/Profile.vue';

const routes = [
    {path: '/',                  component: Home,},
    {path: '/crear-cuenta',      component: Register,},
    {path: '/iniciar-sesión',    component: Login,},
    {path: '/perfil',            component: Profile,},

];

const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active',
});

export default router;