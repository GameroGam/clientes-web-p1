import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Profile from '../pages/Profile.vue';
import Tendencies from '../pages/Tendencies.vue';
import {suscribeToAuthStateChanges} from '../services/auth';

const routes = [
    {path: '/',                  component: Home,},
    {path: '/crear-cuenta',      component: Register,},
    {path: '/iniciar-sesion',    component: Login,},
    {path: '/perfil',            component: Profile, meta: {requiresAuth: true }},
    {path: '/perfil/:id',      name: 'UserInfo',  component: Profile, meta: {requiresAuth: true }},
    {path: '/tendencias/:palabra', name: 'Tendencias', component: Tendencies, meta: {requiresAuth: true }}


];

const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active',
});


let user = {
    id: null,
    email: null
}

suscribeToAuthStateChanges(userState => user = userState);

router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && user.id === null) {
        return '/iniciar-sesion';
    }
})



export default router;