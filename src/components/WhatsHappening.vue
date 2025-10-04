<script>
import { getMostUsedWords, getPostTendencies } from '../services/posts';

    export default {
        name: 'WhatsHappening',
        data() {
            return {
                trendencies: [],
                wordsTrendencies: []
            }
        },
        methods: {
            async getWordsTrendencies() {
                this.wordsTrendencies = await getMostUsedWords();
            }
        },
        mounted() {
            this.getWordsTrendencies();
        }
    }
</script>


<template>
    <ul>
        <li v-for="wordTrend of wordsTrendencies" :key="wordTrend.id" class="my-2">
            <RouterLink :to="{ name: 'Tendencias', params: { palabra: wordTrend.word}}">
                <h3 class="font-bold text-[1.2rem]">{{ wordTrend.word }}</h3>
                <span class="text-[.8rem]">Ver tendencia</span>
            </RouterLink>
        </li>
    </ul>
</template>