<script>
import UserInfo from '../components/UserInfo.vue';
import { suscribeToAuthStateChanges } from '../services/auth';
import { updateUserProfile } from '../services/ourUsers';
import { setUser } from '../services/auth';
import { getUserById } from '../services/ourUsers';


export default {
    name: 'ProfileEdit',
    components: {UserInfo},
    data (){
        return {
            user:{
                id: null,
                email: null,
                name: null,
                bio: null,
                created_at: null,
            },
            FormData: {
                name: null,
                bio: null,
            },
            loading: false,
        }
    },
    mounted() {
        suscribeToAuthStateChanges((userState) => {
            this.user = userState;
            this.FormData.name = userState.name;
            this.FormData.bio = userState.bio;
        });
    },
    methods:{
        async handlesubmit(){
            if (!this.user.id) {
                console.error('No hay un usuario autenticado.')
                return
            }
            try{
                this.loading=true

                await updateUserProfile(this.user.id, this.FormData);
                const updateUser = await getUserById(this.user.id);
                setUser(updateUser);
                console.log('Perfil actualizado papaaaaa');
                this.$router.push('/perfil')
            }catch(error){
                console.log('Hubo un error al intentar guardar los cambios', error);
                throw new Error(error);
            }
            this.loading=false
        },
    }
}
</script>

<template>
    <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Editar perfil</h2>
        <form @submit.prevent="handlesubmit(FormData)" class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input v-model="FormData.name" type="text" id="name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
            </div>
            <div>
                <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
                <textarea v-model="FormData.bio" id="bio" rows="4" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>
            <button type="submit" :disabled="loading" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                {{ loading ? 'Guardando...' : 'Guardar cambios' }}
            </button>
        </form>
    </div>
</template>