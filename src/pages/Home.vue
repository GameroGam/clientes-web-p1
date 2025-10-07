<script >
import AllPosts from '../components/AllPosts.vue';
import MakePost from '../components/MakePost.vue';
import SomeUsers from '../components/SomeUsers.vue';
import WhatsHappening from '../components/WhatsHappening.vue';
import { suscribeToAuthStateChanges } from '../services/auth';

export default {
    name: 'Home',
    components: {MakePost, AllPosts, SomeUsers, WhatsHappening},
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            unsubscribe: null,
        }
    },
    mounted() {
        this.unsubscribe = suscribeToAuthStateChanges(userState => {
            this.user = userState;
        });
    },
    unmounted() {
        console.log('[>>>UNMOUNTED_DEBUG<<<] Entró al unmounted de Home');
        if (this.unsubscribe) {
            this.unsubscribe();
            console.log('[>>>UNMOUNTED_DEBUG<<<] Observer eliminado desde Profile');
        }
    }
}
</script>

<template>
   <div class="flex flex-col items-center">
        <div class="flex">
            <div>
                <template v-if="user.id !== null">
                    <MakePost/>
                </template>
                <AllPosts />
            </div>
            <div class="mt-6 border-s-1 ps-5">
                <div class="mt-15 border p-3">
                    <h2 class="pb-2 border-b-1">Explorar usuarios</h2>
                    <template v-if="user.id !== null">
                        <a href="#" class="hover:opacity-95"><SomeUsers/></a>
                    </template>
                    <template v-else>
                        <p>Inicia sesión para explorar usuarios</p>
                    </template>
                </div>

                <div class="mt-15 border p-3">
                    <h2 class="pb-2 border-b-1">Tendencias</h2>
                    <template v-if="user.id !== null">
                        <WhatsHappening/>
                    </template>
                    <template v-else>
                        <p>Inicia sesión para ver las tendencias</p>
                    </template>
                </div>
            </div>
        </div> 
       
   </div>
</template>