<script>
import { getAllPosts, increaseLikesToPost, suscribeToPosts } from '../services/posts';

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
                suscribeToPosts(newPost => this.posts.push(newPost));
            }
        },
        mounted() {
            this.uploadPosts();

            this.getNewPost();
        }
    }
</script>

<template>
    <section id="posts">
        <div v-for="post of posts" :key="post.id" class="border-b-1 border-b-gray-400 py-3">
            <div class="flex items-center gap-4">
                <h3>{{ post.name }}</h3> 
                <span class="text-gray-300">{{ post.created_at }}</span>
            </div>
            <p class="py-3">{{ post.content }}</p>
            <button @click="increaseLike(post.id)"><i class="fa-light fa-heart"></i>{{ post.like }}</button>
        </div>
    </section>
</template>