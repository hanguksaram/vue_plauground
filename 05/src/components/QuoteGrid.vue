<template>
    <div class="row">
        <app-quote v-for="quote in quotes" :removeQuote="removefn(quote.id)">{{quote.text}} </app-quote>
    </div>
</template>

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
        }
    }
</script>

<style>

</style>
