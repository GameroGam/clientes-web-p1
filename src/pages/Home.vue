<script >
import AllPosts from '../components/AllPosts.vue';
import MakePost from '../components/MakePost.vue';
import SomeUsers from '../components/SomeUsers.vue';
import WhatsHappening from '../components/WhatsHappening.vue';

export default {
    name: 'Home',
    components: {MakePost, AllPosts, SomeUsers, WhatsHappening}
}
</script>

<template>
   <div class="flex flex-col items-center">
        <div class="flex">
            <div>
                <MakePost/>
                <AllPosts />
            </div>
            <div class="mt-6 border-s-1 ps-5">
                <h2 class="mb-5">Explorar usuarios</h2>
                <a href="#" class="hover:opacity-95"><SomeUsers/></a>

                <h2>Tendencias</h2>
                <WhatsHappening/>
            </div>
        </div> 
       
   </div>
</template>