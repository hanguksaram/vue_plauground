<template>
    <div class="container">
        <app-header :maxQuotes="maxQuotes" :quoteCount="gridQuotes.length"></app-header>
        <app-new-quote @newQuoteAdded="addQuote($event)"></app-new-quote>
        <app-quote-form v-if="false" :addQuoteFn="addQuote"></app-quote-form>
        <app-quote-grid @quoteDeleted="deleteQuote($event)" :removefn="removeQuote" :quotes="gridQuotes"></app-quote-grid>
        <div class="row">
            <div class="col-sm-12 text-center">
                <div class="alert alert-info">Info: Click on a Quote to Delete it!</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
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
            appNewQuote: NewQuote,
            appHeader: Header

        
        },
        methods: {
            addQuote(newQuote) {
                if (this.gridQuotes.length >= 10) {
                    alert('Remove quote before adding new one')       
                } else {
                    newQuote = {text: newQuote, id: this.gridQuotes.length + 1}
                    this.gridQuotes = [...this.gridQuotes, newQuote]
                    console.log(this.gridQuotes)
                }
                    
             
            },
            removeQuote(id) {
                return () => {
                    this.gridQuotes = this.gridQuotes.filter(q => q.id !== id)
                }
            },
            //event based deleting way with modifing existing array
            deleteQuote(index) {
                this.gridQuotes.splice(index, 1)
            }
        }
        
    }
</script>

<style>
</style>
