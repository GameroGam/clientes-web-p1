<script>
    export default {
        name: 'AppNav',
    }
</script>

<template>
    <header>
        <nav class=" bg-cyan-950 text-neutral-50 flex justify-around p-4">
            <RouterLink to="/"><h1>Press Start</h1></RouterLink>
            <ul class="flex justify-around gap-3">
                <li>
                    <RouterLink to="/perfil">Mi perfil</RouterLink>
                </li>
                <li>
                    <RouterLink to="/crear-cuenta">Registrarse</RouterLink>
                </li>
                <li>
                    <RouterLink to="/iniciar-sesión">Ingresar</RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>

</style>