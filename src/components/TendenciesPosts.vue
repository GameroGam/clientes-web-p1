<script>
    import { getPostTendencies } from '../services/posts';

    export default {
        name: 'TendenciesPosts',
        data() {
            return {
                posts: []
            }
        },
        props: ['wordTend'],
        methods: {
            async getPostByWord() {
                try {
                    this.posts = await getPostTendencies(this.wordTend);
                } catch(err) {  
                    console.log('Hubo un error al intentar obtener los posteos de una tendencia', err);
                } 
            }
        },
        mounted() {
            this.getPostByWord();
        }
    }
</script>

<template>
    <section>
        <div v-for="post of posts" :key="post.id" class="border-b-1 border-b-gray-400 py-3">
            <div class="flex items-center gap-4">
                <h3 class="font-bold text-[1.2rem]">{{ post.name }}</h3> 
                <span class="text-gray-300">{{ post.created_at }}</span>
            </div>
            <p class="py-3">{{ post.content }}</p>
            <!-- <button @click="increaseLike(post.id)"><i class="fa-light fa-heart"></i>{{ post.like }}</button> -->
        </div>
    </section>
</template>