<script>

    export default {
        name: 'SomeUsers',
        data() {
            return {
                someUsers: [
                    {
                        id: 1,
                        email: 'facu@gmail.com',
                        name: 'Facundo',
                        description: 'PAMCHO TE EXTARÑO!'
                    },
                    {
                        id: 1,
                        email: 'gus@gmail.com',
                        name: 'Vanread',
                        description: 'Dermaglós tocame un huevo',
                    }
                ]   
            }
        },
        methods: {
            getSomeUsers() {

            }
        }
    }
</script>


<template>
    <section>
        <ul>
            <li v-for="user of someUsers" :key="user.id" >
                <h3>{{ user.name }}</h3>
                <p>{{ user.description }}</p>
            </li>
        </ul>
    </section>
</template>