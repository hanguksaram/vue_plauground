<template>
    <div class="col-xs-12 col-sm-6">
        <ul class="list-group">
            <li
                    class="list-group-item"
                    v-for="index in 5">
                Server #{{ index }}
            </li>
        </ul>
    </div>
</template>

<script>
</script>

// scoped keyword is the way to isolate styles directly in the component
<style scoped>
    div {
        border: 1px solid blue
    }
</style>
