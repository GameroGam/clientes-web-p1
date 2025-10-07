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
            }
        }
    },
    mounted() {
        suscribeToAuthStateChanges(userState => this.user = userState);
    }
}
</script>

<template>
   <div class="flex flex-col items-center">
        <div class="flex flex-col-reverse lg:flex-row">
            <div class="border-s-1 border-e-1">
                <template v-if="user.id !== null">
                    <MakePost/>
                </template>
                <template v-else>
                    <div class="h-40 flex items-center justify-center home-no-user">
                        <p><span class="font-black">Iniciá sesión</span> para comenzar a postear!</p>
                    </div>
                </template>
                <AllPosts />
            </div>
            <div class="mt-6 ps-5 md:ps-0 md:ps-5 right-40 ">
                <div class="mt-15 md:mt-2 border p-3">
                    <h2 class="pb-2 border-b-1">Explorar usuarios</h2>
                    <template v-if="user.id !== null">
                        <a href="#" class="hover:opacity-95"><SomeUsers/></a>
                    </template>
                    <template v-else>
                        <p>Inicia sesión para explorar usuarios</p>
                    </template>
                </div>

                <div class="mt-15 md:mt-2 border p-3">
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