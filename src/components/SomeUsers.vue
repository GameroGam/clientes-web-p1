<script>
import { getSomeUsers } from '../services/ourUsers';


export default {
    name: 'SomeUsers',
    data() {
        return {
            someUsers: [],
            loading: true,
        }
    },
    async mounted() {
        await this.loadUsers();
    },
    methods: {
        async loadUsers() {
            try {
                this.loading = true;
                this.error = null;
                const data = await getSomeUsers();
                this.someUsers = data;
            } catch (error) {
                console.error('Error al cargar los usuarios:', error);
                this.error = 'No se pudieron cargar los usuarios.';
            }
                this.loading = false;
        }
    },
    
}
</script>


<template>
     <section>
        <h3 class="font-bold text-lg mb-3">Usuarios destacados</h3>

        <div v-if="loading" class="text-gray-400 text-sm">Cargando...</div>
        <div v-else-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <ul v-else>
            <li
                v-for="user in someUsers"
                :key="user.id"
                class="my-3 p-2 border-b border-gray-300 hover:bg-blue-950 transition rounded">
                <RouterLink
                :to="`/perfil/${user.id}`"
                class="block"
                >
                <h3 class="font-bold text-[1.1rem]  underline-offset-2 text-blue-400 hover:underline">
                    {{ user.name || user.email }}
                </h3>
                <p class="text-white-500 text-sm">
                    {{ user.bio || 'Sin descripción.' }}
                </p>
                </RouterLink>
            </li>
        </ul>
    </section>
</template>