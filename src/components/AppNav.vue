<script>
import { subAuthState } from '../services/auth';


export default {
    name: 'AppNav',
    data() {
        return {
            user: {
                id: null,
                email: null
            }
        }
    },
    mounted(){
        subAuthState(userState => this.user = userState);
    }
}
</script>

<template>
    <header>
        <nav class=" bg-cyan-950 text-neutral-50 flex justify-around p-4">
            <RouterLink to="/"><h1>Press Start</h1></RouterLink>
            <ul class="flex justify-around gap-3">
                <template v-if="user.id !== null">
                    <li>
                        <RouterLink to="/perfil">{{ user.email }}</RouterLink>
                    </li>
                    <li>
                        <form action="#">
                            <button type="submit">Cerrar sesión</button>
                        </form>
                    </li>
                    
                </template>
                <template v-if="user.id === null">
                    <li>
                        <RouterLink to="/crear-cuenta">Registrarse</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/iniciar-sesión">Ingresar</RouterLink>
                    </li>
                </template>
            </ul>
        </nav>
    </header>
</template>

<style scoped>

</style>