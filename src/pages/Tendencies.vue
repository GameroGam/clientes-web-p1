<script>
    import getPostsByWord from '../components/TendenciesPosts.vue';
    export default {
        name: 'Tendencies',
        components: {getPostsByWord},
        data() {
            return {
                wordTend: this.$route.params.palabra,
            }
        },
        methods: {
            toUpperCase() {
                return this.wordTend.toUpperCase();
            },
        },
    }
</script>

<template>
    <section class="w-200 mx-auto border-s-1 border-e-1" id="tend">
        <h2 class="text-center py-10">{{ toUpperCase() }}</h2>
        <getPostsByWord :wordTend="wordTend"></getPostsByWord>

    </section>
</template>