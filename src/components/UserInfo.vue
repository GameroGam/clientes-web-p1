<script>
import { supabase } from '../services/supabase';

export default {
    name: 'UserInfo',
    data() {
        return {
            user: 'a',
        }
    },
    props: ['user_id'],
    async mounted() {
        try {
            const { data, error } = await supabase
                .from('users_profile')
                .select('*')
                .eq('email', this.user_id)
                .limit(1);

            if (error) {
                throw new Error(error.message);
            }
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
        <p class="text-gray-400 text-sm">bio{{ user.bio }}</p>
        <p class="text-gray-400 text-sm">Unido desde: </p>
        <p class="text-gray-400">{{ user.bio }}</p>

    </div>
    <div v-else>Problema con el usuario</div>
    </section>

</template>

<style scoped>

</style>