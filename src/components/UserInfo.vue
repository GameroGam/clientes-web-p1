<script>
import { supabase } from '../services/supabase';

export default {
    name: 'UserInfo',
    props: {
        email: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            user: null
        }
    },
    async mounted() {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', this.email)
                .single();

            if (error) {
                throw error;
            }

            this.user = data;
        } catch (error) {
            console.error('Error al obtener la información del usuario:', error);
        }
    }
}
</script>

<template>
    <section>
    <div v-if="user" class="p-4 border-b border-gray-300">
        <h2 class="text-xl font-bold">{{ user.name }}</h2>
        <p class="text-gray-400 text-sm">E-mail: {{ user.email }}</p>
        <p class="text-gray-400 text-sm">Unido desde: </p>
        <p class="text-gray-400">{{ user.bio }}</p>

    </div>
    <div v-else>Problema con el usuario</div>
    </section>

</template>

<style scoped>

</style>