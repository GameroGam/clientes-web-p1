<script>
    import { useRoute } from 'vue-router';

    export default {
        name: 'FormAccount',
        data() {
            return {
                email: '',
                password: '',
                

            }
        },
        setup() {
            const route = useRoute();
            return { route };
        },
        props: ['onSubmit', 'action'],
        methods: {
            async handleSubmit() {
                this.onSubmit({
                    email: this.email,
                    password: this.password
                });
            }
        }
    }
</script>

<template>
    <section class="h-100 w-100 flex flex-col items-center gap-10 border">
        <h2 class="pt-10"><slot></slot></h2>
        <form action="#" @submit.prevent="handleSubmit()">
            <div class="mb-3">
                <label for="email" class="block">Email</label>
                <input type="email" id="email" name="email" v-model="this.email" class="border-b-1 ">
            </div>
            <div class="mb-3">
                <label for="password" class="block">Contraseña</label>
                <input type="password" id="password" name="password" autocomplete="on" v-model="password" class="border-b-1 ">
            </div>
            <div class="mt-10">
                <input type="submit" :value="action" class=" bg-blue-900 py-2 px-4 rounded-xl hover:cursor-pointer hover:opacity-95 ">
            </div>
        </form>
    </section>

</template>