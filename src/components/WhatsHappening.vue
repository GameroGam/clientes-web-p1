<script>
import { getMostUsedWords, getPostTrendencies } from '../services/posts';

    export default {
        name: 'WhatsHappening',
        data() {
            return {
                trendencies: []
            }
        },
        methods: {
            async getTendendices() {
                try {
                    console.log('obteniendo tendencias...');
                    const wordsTrendencies = await getMostUsedWords();
                    await getPostTrendencies(wordsTrendencies);

                } catch(err) {
                    console.log('Hubo un error al intentar traer las tendencias', err);
                }
            }
        },
        mounted() {
            this.getTendendices();
        }
    }

</script>


<template>
    <ul>
        <li v-for="trend of trendencies" :key="trend.id">
            <h3>{{ trend.name }}</h3>
            <span>{{ trend.quantity }} posts</span>
        </li>
    </ul>
</template>