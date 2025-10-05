<script>
import { suscribeToAuthStateChanges } from '../services/auth';
import { createNewPost } from '../services/posts';

    export default {
        name: 'MakePost',
        data() {
           return {
                user: {
                    id: null,
                    email: null,
                },
                newPost: {
                    email: '',
                    name: '',
                    content: '¿Que querés postear hoy?',
                    like: 0,
                    user_id: '6f7e82ba-a5dd-4dbf-b84d-ab4cdb58b8f0'
                } 
           }
        },
        methods: {
            async handleSubmit() {
                this.newPost.content = this.newPost.content.trim();
                try {
                    await createNewPost({
                        email: this.user.email,
                        name: this.user.name,
                        content: this.newPost.content,
                        like: this.newPost.like,
                        user_id: this.newPost.user_id
                    });
                } catch (err) {
                    console.log('Hubo un error al intentar crear un nuevo posteo', err);
                }
            },
        },
        mounted() {
            suscribeToAuthStateChanges(userState => this.user = userState);
        }
    }
</script>

<template>
    <section class=" w-3xl mt-6 flex flex-col items-center">
        <h2 class="text-lg">{{ user.name }}</h2>
        <form action="#" @submit.prevent="handleSubmit()">
            <div>
                <label for="content"></label>
                <textarea name="content" id="content" v-model="newPost.content" class=" w-100 border-b-1 border-b-gray-400 p-2"></textarea>
                
            </div>
            <div>
                <input type="submit" value="Postear" class=" bg-blue-900 py-2 px-4 rounded-xl hover:cursor-pointer hover:opacity-95 mt-3">
            </div>
        </form>
    </section>
</template>

<style scoped>

</style>