<script>
import AppFooter from '../components/AppFooter.vue';
import FormAuth from '../components/FormAuth.vue';
import { register } from '../services/auth';


export  default {
    name: 'Register',
    components: {FormAuth, AppFooter},
    methods: {
        async createAccount(email, password) {
            try {
                await register(email, password);
            } catch (err) {
                console.log('Hubo un error al intentar registrar el usuario', err);
            }
        }
    }
}
</script>
<template>
    <div class="flex items-center justify-center min-h-screen">
        <FormAuth :onSubmit="createAccount" action="Registrarse">Crear cuenta</FormAuth>
    </div>

    
</template>