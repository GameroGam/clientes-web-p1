import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Profile from '../pages/Profile.vue';
import Tendencies from '../pages/Tendencies.vue';

const routes = [
    {path: '/',                  component: Home,},
    {path: '/crear-cuenta',      component: Register,},
    {path: '/iniciar-sesión',    component: Login,},
    {path: '/perfil',            component: Profile,},
<<<<<<< HEAD
    {path: '/perfil/:email',     component: Profile, props: true,},
=======
    {path: '/tendencias/:palabra', name: 'Tendencias', component: Tendencies,}

>>>>>>> 6c8445ec09d9449d952ed3756a5b6263ab9af613

];

const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active',
});

export default router;