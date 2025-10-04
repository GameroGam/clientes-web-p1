<script>
import UserInfo from '../components/UserInfo.vue';
import UserPosts from '../components/UserPosts.vue';


export default {
    name: 'Profile',
    components: {UserInfo, UserPosts},
    data() {
        return {
            user: {
                name: null,
                email: null,
                bio: null,


            },
        }
    },
}

</script>

<template>
    <div>
        <h1>Perfil de usuario</h1>
        <UserInfo />
        <UserPosts />    
    </div>
</template>