<script>
import { getMostUsedWords } from '../services/posts';

    export default {
        name: 'WhatsHappening',
        data() {
            return {
                wordsTrendencies: []
            }
        },
        methods: {
            async getWordsTrendencies() {
                this.wordsTrendencies = await getMostUsedWords();
                console.log(this.wordsTrendencies);
            }
        },
        mounted() {
            this.getWordsTrendencies();
        }
    }
</script>


<template>
    <ul>
        <template v-if="wordsTrendencies.length !== 0">
            <li v-for="wordTrend of wordsTrendencies" :key="wordTrend.id" class="my-2">
                <RouterLink :to="{ name: 'Tendencias', params: { palabra: wordTrend.word}}">
                    <h3 class="font-bold text-[1.2rem]">{{ wordTrend.word }}</h3>
                    <span class="text-[.8rem]">Ver tendencia</span>
                </RouterLink>
            </li>
        </template>
        <template v-else>
            <h3>No hay tendencias por el momento...</h3>
        </template>
    </ul>
</template>