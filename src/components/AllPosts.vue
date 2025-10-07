<script>
import { getAllPosts, increaseLikesToPost, suscribeToPosts, updatedLikes } from '../services/posts';

    export default {
        name: 'AllPosts',
        data() {
            return {
                posts: [
                    // {
                    //     id: 1,
                    //     email: 'facundo.gamero@gmail.com',
                    //     name: 'Facundo',
                    //     content: 'Hoy me compré un culazo super. Está buenisimo. Super cómodo, lo recomiendo 100%.',
                    //     like: 0,
                    //     created_at: '19 de abril'
                    // }
                ]
            }
        },
        methods: {
            async uploadPosts() {
                try {
                    this.posts = await getAllPosts();
                } catch (err) {
                    console.log('Hubo un error al intentar obtener los posteos', err);
                }
            },
            async increaseLike(postId) {
                await increaseLikesToPost(postId);
               
            },
            async getNewPost() {
                suscribeToPosts(newPost => this.posts.push(newPost), postChanged => {
                    let pIndex = this.posts.findIndex(post => post.id === postChanged.id);
                    if(pIndex !== -1) {
                        this.posts.splice(pIndex, 1, postChanged);
                    }
                });
            },
            async getUpdatedLikes() {
                await  this.updatedLikes();
            },

            formatDate(datos){
                const date = new Date(datos);
                const anio = date.getFullYear();
                const mes = date.getMonth() + 1;
                const dia = date.getDate();
                const hra = date.getHours();
                const min = date.getMinutes();
                return `${dia}/${mes}/${anio} - ${hra}:${min}`;
            }

        },

        async mounted() {
            await this.uploadPosts();

            await this.getNewPost(); 
            
            // this.updatePosts();
        }
    }
</script>

<template>
    <section id="posts">
        <div v-for="post of posts" :key="post.id" class="border-b-1 border-b-gray-400 py-3">
            <div class="flex items-center gap-4 px-3">
                <router-link :to="{ name: 'UserInfo', params: { id: post.user_id}}">
                    <h3 class="hover:underline text-blue-400 text-xl">{{ post.name }}</h3>
                </router-link>
                <span class="text-gray-300 text-xs mt-1.5">{{ formatDate(post.created_at) }}</span>
            </div>
            <p class="py-3 px-3">{{ post.content }}</p>
            <button @click="increaseLike(post.id)" class="px-3"><i class="cursor-pointer fa-regular fa-heart hover:text-orange-600 "></i> {{ post.like }}</button>
        </div>
    </section>
</template>