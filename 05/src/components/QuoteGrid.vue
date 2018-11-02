<template>
    <div class="row">
        <app-quote @click.native="deleteQuote(index)" v-for="(quote, index) in quotes">{{quote.text}} </app-quote>
    </div>
</template>
// :removeQuote="removefn(quote.id)"

<script>
    import Quote from './Quote.vue'
    export default {
        props: {
            quotes: Array,  
            removefn: Function
        },
        components: {
            appQuote: Quote
    
        },
        created() {
            console.log(this.quotes)
        },
        methods: {
            deleteQuote(index) {
                this.$emit('quoteDeleted', index)
            }
        }
    }
</script>

<style>

</style>
