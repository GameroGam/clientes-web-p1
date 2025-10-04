<script>
import UserInfo from '../components/UserInfo.vue';
import UserPosts from '../components/UserPosts.vue';


export default {
    name: 'Profile',
    components: {UserInfo, UserPosts},
    props: {
        email: {
            type: String,
            required: true
        }
    },
}

</script>

<template>
    <div>
        <h1>Perfil de {{ email }}</h1>
        <UserInfo :email="email" />
        <UserPosts :email="email" />    
    </div>
</template>