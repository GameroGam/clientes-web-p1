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
    <section>
        <h2 class="text-center mt-10">{{ toUpperCase() }}</h2>
        <getPostsByWord :wordTend="wordTend"></getPostsByWord>

    </section>
</template>