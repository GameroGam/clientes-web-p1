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
<<<<<<< HEAD
    <FormAuth :onSubmit="userLogin" action="Iniciar sesión">Iniciar sesión</FormAuth>
=======
    <FormAuth :onSubmit="handleSubmit" action="Iniciar sesión">Iniciar sesión</FormAuth>
>>>>>>> 75b9174b97f5118c9a62efdfbf9b2c97c96c64cb
</template>