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

        },
        mounted() {
            this.uploadPosts();

            this.getNewPost(); 
            
            // this.updatePosts();
        },
        updated() {
        }
    }
</script>

<template>
    <section id="posts">
        <div v-for="post of posts" :key="post.id" class="border-b-1 border-b-gray-400 py-3">
            <div class="flex items-center gap-4">
                <router-link :to="`/perfil/${post.email}`">
                    <h3 class="hover:underline">{{ post.name }}</h3>
                </router-link>
                <span class="text-gray-300">{{ post.created_at }}</span>
            </div>
            <p class="py-3">{{ post.content }}</p>
            <button @click="increaseLike(post.id)"><i class="cursor-pointer fa-light fa-heart"></i>{{ post.like }}</button>
        </div>
    </section>
</template>