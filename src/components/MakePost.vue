<script>
import { createNewPost } from '../services/posts';

    export default {
        name: 'MakePost',
        data() {
           return {
                user: {
                    id: 1,
                    email: 'gamero.facundo@gmail.com',
                    name: 'Facundo'
                },
                newPost: {
                    email: '',
                    name: '',
                    content: '¿Que querés postear hoy?',
                    like: 0
                } 
           }
        },
        methods: {
            async handleSubmit() {
                try {
                    await createNewPost({
                        email: this.user.email,
                        name: this.user.name,
                        content: this.newPost.content,
                        like: this.newPost.like
                    });
                } catch (err) {
                    console.log('Hubo un error al intentar crear un nuevo posteo', err);
                }
            },
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