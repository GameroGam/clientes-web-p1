<script>
    export default {
        name: 'AppNav',
    }
</script>

<template>
    <header>
        <nav class=" bg-cyan-950 text-neutral-50 flex justify-around">
            <RouterLink to="/"><h1>Twitter</h1></RouterLink>
            <ul class="flex justify-around">
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