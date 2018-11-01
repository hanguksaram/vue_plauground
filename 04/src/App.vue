<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <button @click="selectedComponent = 'appQuote'">Quote</button>
                <button @click="selectedComponent = 'appAuthor'">Author</button>
                <button @click="selectedComponent = 'appNew'">New</button>
                <hr>
                <p>{{ selectedComponent }}</p>
                <!-- way to pass components dinamically -->
                <keep-alive>
                    <component :is="selectedComponent">
                    default content
                    </component>
                </keep-alive>
                              <!-- <app-quote>
                    <h2 slot="title">{{quoteTitle}}</h2>
                    <p>A wonedrfull quote</p>
               </app-quote> -->
               </div>
        </div>
    </div>
</template>

<script>
    import Author from './components/Author.vue'
    import New from './components/New.vue'
    import Quote from './components/Quote.vue'
    export default {
        data() {
            return {
                quoteTitle: 'The quote',
                selectedComponent: 'appQuote'
            }
        },
        components: {
            appQuote: Quote,
            appAuthor: Author,
            appNew: New
        }
    }
</script>

<style>
</style>
