<script>
import UserInfo from '../components/UserInfo.vue';
import UserPosts from '../components/UserPosts.vue';
import { suscribeToAuthStateChanges } from '../services/auth';


export default {
    name: 'Profile',
    components: {UserInfo, UserPosts},
    data (){
        return {
            user_id: null,
            isOwnProfile: false,
            visitedUser: null,
        }
    },
    mounted() {
    this.loadProfile();
    },
    watch: {
        '$route.params.id'() {
        this.loadProfile();
        },
    },
    methods: {
        loadProfile() {
            const routerId = this.$route.params.id;

            suscribeToAuthStateChanges((userState) => {
                if (routerId) {
                this.user_id = routerId;
                this.isOwnProfile = userState.id === routerId;
                } else {
                this.user_id = userState.id;
                this.isOwnProfile = true;
                }
            });
        },
    },
};

</script>

<template>
    <div class="w-200 mx-auto border-s-1 border-e-1">
        <!-- como siempre spera a que supabase cvargue el usuario actual antes de asignar 
     el user_id hay un desface de picosegundos en la carga que arreglé con un v-if... 
     no se si es lo mas profesional jeje-->
    <div v-if="user_id"> 
        <UserInfo :user_id="user_id" :isOwnProfile="isOwnProfile" @user-loaded="visitedUser = $event" />
        <UserPosts :user_id="user_id" />    
    </div>
    <div v-else class="text-gray-500">Cargando perfil...</div>
    </div>
</template>