<script>
    export default {
        name: 'AllPosts',
        data() {
            return {
                posts: [
                    {
                        id: 1,
                        name: 'Facundo',
                        created_at: '24-452'
                    }
                ]
            }
        },
        methods: {
            uploadPosts() {
                console.log('¿a')
            }
        },
        mounted() {
            this.uploadPosts()
        }
    }
</script>

<template>
    <section id="posts">
        <div v-for="post of posts" :key="post.id">
            <h3>{{ post.name }}</h3>
            <p>{{ post.content }}</p>
            <span>{{ post.created_at }}</span>
        </div>
    </section>
</template>