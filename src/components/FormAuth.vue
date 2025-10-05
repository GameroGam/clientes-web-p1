<script>
    export default {
        name: 'FormAccount',
        data() {
            return {
                email: '',
                password: '',
                

            }
        },
        props: ['onSubmit', 'action'],
        methods: {
            handleSubmit() {
                this.onSubmit({
                    email: this.email,
                    password: this.password
                });
            }
        }
    }
</script>

<template>
    <h2><slot></slot></h2>
    <form action="#" @submit.prevent="handleSubmit()">
        <div class="mb-3">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="this.email">
        </div>
        <div class="mb-3">
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" autocomplete="on" v-model="this.password">
        </div>
        <div>
            <input type="submit" :value="action">
        </div>
    </form>

</template>