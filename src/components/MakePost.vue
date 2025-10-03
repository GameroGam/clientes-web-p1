<script>
    export default {
        name: 'MakePost',
        data() {
           return {
                user: {
                    id: 1,
                    name: 'Facundo'
                },
                newPost: {
                    name: '',
                    content: '¿Que querés postear hoy?'
                } 
           }
        },
        methods: {
            crateNewPost() {
                
            }
        }
    }
</script>

<template>
    <section>
        <h2>{{ user.name }}</h2>
        <form action="#" @submit.prevent="submit()">
            <div>
                <label for="content">
                    <textarea name="content" id="content" v-model="newPost.content"></textarea>
                </label>
            </div>
            <div>
                <input type="submit" value="Postear">
            </div>
        </form>
    </section>
</template>

<style scoped>

</style>