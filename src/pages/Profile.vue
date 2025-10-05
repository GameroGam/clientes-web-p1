<script>
import UserInfo from '../components/UserInfo.vue';
import UserPosts from '../components/UserPosts.vue';


export default {
    name: 'Profile',
    components: {UserInfo, UserPosts},
    data (){
        return {
            user_id: this.$route.params.id,
        }
    }
}

</script>

<template>
    <div>
        <h1>Perfil de nadie</h1>
        <UserInfo :user_id="user_id" />
        <UserPosts :user_id="user_id" />    
    </div>
</template>