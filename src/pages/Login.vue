<script>
import FormAuth from '../components/FormAuth.vue';

export  default {
    name: 'Login',
    components: {FormAuth},
    methods: {
        login(email, name, password) {
            console.log('Funciono!');
            console.log(email, name, password);
        }
    }
}
</script>
<template>
    <FormAuth :onSubmit="login" action="Iniciar sesión">Iniciar sesión</FormAuth>
</template>