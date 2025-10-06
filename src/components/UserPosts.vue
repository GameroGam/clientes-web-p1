<script>
import { getPostsByUser, increaseLikesToPost, suscribeToPosts } from '../services/posts';

export default {
    name: 'UserPosts',
    data() {
        return {
            posts: [],
        }
    },
    props: ['user_id'],
    methods: {
        async uploadUserPosts() {
            try {
                this.posts = await getPostsByUser(this.user_id);
                console.log(this.posts);
            } catch (error) {
                console.error('Error al obtener los posteos del usuario', error);
            }
        },
        async increaseLike(postId) {
            try {
                await increaseLikesToPost(postId);
            } catch (error) {
                console.error('Error al dar like:', error);
            }
        },
        async suscribeToPostsOfUser() {
            try {
                await suscribeToPosts(
                    newPost => {
                        if (newPost.user_id === this.user_id) {
                            this.posts.push(newPost);
                        }
                    },
                    postChanged => {
                        let pIndex = this.posts.findIndex(post => post.id === postChanged.id);
                        if (pIndex !== -1) {
                            this.posts.splice(pIndex, 1, postChanged);
                        }
                    }
                );
            } catch (error) {
                console.error('Error al suscribirse a los posteos:', error);
            }
        }
    },
    watch: { // cambio
        user_id: {
            immediate: true,
            async handler(newVal) {
            if (!newVal) return;
            await this.uploadUserPosts();
            await this.suscribeToPostsOfUser();
            }
        }
    }
}
</script>

<template>
    <section id="user-posts">
        <h2 class="text-lg font-bold mb-4">Publicaciones de nadie</h2>
        <div v-if="posts.length === 0" class="text-gray-400">Este usuario no tiene publicaciones.</div>

        <div v-for="post of posts" :key="post.id" class="border-b-1 border-b-gray-400 py-3">
            <div class="flex items-center gap-4">
                <h3>{{ post.name }}</h3> 
                <span class="text-gray-300">{{ new Date(post.created_at).toLocaleString() }}</span>
            </div>
            <p class="py-3">{{ post.content }}</p>
            <button @click="increaseLike(post.id)">
                <i class="cursor-pointer fa-light fa-heart"></i> {{ post.like }}
            </button>
        </div>
    </section>
</template>

<style scoped>

</style>