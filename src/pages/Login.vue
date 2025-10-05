<script>
import FormAuth from '../components/FormAuth.vue';
import { login } from '../services/auth';

export  default {
    name: 'Login',
    components: {FormAuth},
    methods: {
        async userLogin(email, password) {
            try {
                await login(email, password);

                this.$router.push('/');
            } catch(err) {
                console.log('Hubo un error al intentar iniciar sesión', err);
            }
        }
    }
}
</script>
<template>
    <FormAuth :onSubmit="userLogin" action="Iniciar sesión">Iniciar sesión</FormAuth>
</template>