<script>
import FormAuth from '../components/FormAuth.vue';
import { register } from '../services/auth';

export  default {
    name: 'Register',
    components: {FormAuth},
    methods: {
        async createAccount(email, name, password) {
            try {
                await register(email, name, password);
            } catch (err) {
                console.log('Hubo un error al intentar registrar el usuario', err);
            }
        }
    }
}
</script>
<template>
    <div class="h-100">
        <FormAuth :onSubmit="createAccount" action="Registrarse">Crear cuenta</FormAuth>
    </div>
</template>