<template>
    <form @submit="addQuote">
        <input ref="newQuote" type="text" placeholder="input new quote's text">
        <button type="submit">Add New Quote</button>
    </form>
</template>

<script>
import { eventBus } from '../main'
export default {
    props: {
        addQuoteFn: Function
    },
    methods: {
        
        addQuote(e) {
            e.preventDefault();
            const { newQuote } = this.$refs
            this.addQuoteFn(newQuote.value)
            eventBus.quoteAdded()
        }
    }
}
</script>

<style>

</style>
