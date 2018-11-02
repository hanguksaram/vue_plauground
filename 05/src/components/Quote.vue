<template>
    <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="panel panel-default">
            <div @click="removeQ" class="panel-body quote">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        quotes: Array,
        removeQuote: Function
    },
    methods: {
        removeQ() {
            if (confirm('Are u sure to delete quote?'))
                this.removeQuote()
            return
        }
    }

}
</script>

<style>
    .panel-body {
        font-family: 'Arizonia', cursive;
        font-size: 24px;
        color: #6e6e6e;
    }

    .quote {
        cursor: pointer;
    }
    .quote:hover{
        background-color: #ffe2e2;
    }
</style>
