<script>
import FormAuth from '../components/FormAuth.vue';

export  default {
    name: 'Register',
    components: {FormAuth},
    methods: {
        createAccount(email, name, password) {
            console.log('Funciono!');
            console.log(email, name, password);
        }
    }
}
</script>
<template>
    <div class="h-100">
        <FormAuth :onSubmit="createAccount" action="Registrarse">Crear cuenta</FormAuth>
    </div>
</template>