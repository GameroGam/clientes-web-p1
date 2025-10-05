<script>
import FormAuth from '../components/FormAuth.vue';
import { login } from '../services/auth';

export  default {
    name: 'Login',
    components: {FormAuth},
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            loading: false
        }
    },
    methods: {
        async handleSubmit(formData) {
            try {
                this.loading = true;

                await login({ email: this.user.email, password: this.user.password });
           
                this.$router.push('/perfil');
            } catch (error) {
                console.log('Hubo un error al intentar iniciar sesión', error);
            }
            this.loading = false;
        },    
    }
}
</script>
<template>
    <FormAuth :onSubmit="handleSubmit" action="Iniciar sesión">Iniciar sesión</FormAuth>
</template>