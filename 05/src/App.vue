<template>
    <div class="container">
        <app-new-quote @newQuoteAdded="addQuote($event)"></app-new-quote>
        <app-quote-form v-if="false" :addQuoteFn="addQuote"></app-quote-form>
        <app-quote-grid :removefn="removeQuote" :quotes="gridQuotes"></app-quote-grid>
        <div class="row">
            <div class="col-sm-12 text-center">
                <div class="alert alert-info">Info: Click on a Quote to Delete it!</div>
            </div>
        </div>
    </div>
</template>

<script>
    import NewQuote from './components/NewQuote.vue'
    import QuoteGrid from './components/QuoteGrid.vue'
    import QuoteForm from './components/QuoteForm.vue'

    export default {
        data() {
            return {
                maxQuotes: 10,
                gridQuotes: [
                    {   
                        id: 1, 
                        text: 'Just a Quote to see something'
                    }
                ]
            }
        },
        components: {
            appQuoteGrid: QuoteGrid,
            appQuoteForm: QuoteForm,
            appNewQuote: NewQuote
        
        },
        methods: {
            addQuote(newQuote) {
                newQuote = {text: newQuote, id: this.gridQuotes.length + 1}
                this.gridQuotes = [...this.gridQuotes, newQuote]
                console.log(this.gridQuotes)
            },
            removeQuote(id) {
                return () => {
                    this.gridQuotes = this.gridQuotes.filter(q => q.id !== id)
                }
            }
        }
        
    }
</script>

<style>
</style>
