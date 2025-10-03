<script >
import AllPosts from '../components/AllPosts.vue';
import MakePost from '../components/MakePost.vue';


export default {
    name: 'Home',
    components: {MakePost, AllPosts}
}
</script>

<template>
   <MakePost/>
   <AllPosts />
</template>