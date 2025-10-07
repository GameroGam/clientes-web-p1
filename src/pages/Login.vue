<script>
import FormAuth from '../components/FormAuth.vue';
import { login } from '../services/auth';

export  default {
    name: 'Login',
    components: {FormAuth},
    methods: {//borrado el segundo method
        async handleSubmit(formData) {
            try {
                this.loading = true;

                await login({ 
                    email: formData.email, 
                    password: formData.password 
                });
           
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
    <div class="flex items-center justify-center min-h-screen">
        <FormAuth :onSubmit="handleSubmit" action="Iniciar sesión">Iniciar sesión</FormAuth>
    </div>
</template>