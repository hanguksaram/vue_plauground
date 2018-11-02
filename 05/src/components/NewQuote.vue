<template>
    <div class="row">
        <form action="">
            <div class="col-sm-8 col-sm-offet-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                <label for="">Quote</label>
                <textarea class="form-control" name="" id="" rows="3" v-model="quote"></textarea>
            </div>
            <div class="col-sm-8 col-sm-offet-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
               <button class="btn btn-primary" @click.prevent="createNew">Add Quote</button>
            </div>
        </form>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            quote: ''
        }
    },
    methods: {
        createNew() {
            this.$emit('newQuoteAdded', this.quote);
            this.quote = ''
        }
    }
}
</script>

<style>

</style>
