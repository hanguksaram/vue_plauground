<template>
    <div>
        <div class="title">
            <slot name="title"></slot>
            <span style="color: #ccc"><slot name="subtitle">The subtitle</slot></span>
        </div>
        <hr>
        <div>
            <slot></slot>
        </div>
     <!-- named and unnamed slots works together perfectly -->
    </div>
</template>
<script>
export default {
   
}
</script>
<style scoped>
    div {
        border: 1px solid #ccc;
        box-shadow: 1px 1px 2px black;
        padding: 30px;
        margin: 30px auto;
        text-align: center;
    }
    /*child component styling apply to data passed from parent via <slot></slot>*/
    h2 {
        color: red;
    }
    .title {
        font-style: italic;
    }
</style>
