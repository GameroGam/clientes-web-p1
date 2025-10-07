<script>
import { logout, suscribeToAuthStateChanges } from '../services/auth';

    export default {
        name: 'AppNav',
        data() {
            return {
                user: {
                    id: null,
                    email: null,
                },
                unsubscribe: null,
            }
        },
        methods: {
            handleSubmit() {
                logout();
            }
        },
        mounted() {
            this.unsubscribe = suscribeToAuthStateChanges(userState => {
                this.user = userState;
            });
        },
        unmounted() {
            console.log('[>>>UNMOUNTED_DEBUG<<<] Profile desmontado');
            if (this.unsubscribe) {
                this.unsubscribe();
                console.log('[>>>UNMOUNTED_DEBUG<<<] Observer eliminado desde Profile');
            }
        }
    }

</script>

<template>
    <header>
        <nav class=" bg-cyan-950 text-neutral-50 flex justify-around p-4">
            <RouterLink to="/"><h1>Press Start</h1></RouterLink>
            <ul class="flex justify-around gap-3">
                <li v-if="user.id !== null">
                    <RouterLink to="/perfil">Mi perfil</RouterLink>
                </li>
                <template  v-if="user.id === null">
                    <li>
                        <RouterLink to="/crear-cuenta">Registrarse</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/iniciar-sesion">Ingresar</RouterLink>
                    </li>
                </template>
                <li v-if="user.id !== null">
                    <form action="#" @submit.preventDefault="handleSubmit()">
                        <button type="submit">Cerrar sesión</button>
                    </form>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>

</style>