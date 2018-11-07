<template>
    <div>
        <h3>Edit the user</h3>
        <p>Locale: {{ $route.query.locale }}</p>
        <p>Analytics: {{ $route.query.q }}</p>
        <hr>
        <button  @click="confirmed = true" class="btn btn-primary">Confirm</button>
        <div style="height: 700px"></div>
        <p id="data">some extra data</p>
    </div>
</template>
<script>
export default {
    
    data() {
        return {
            confirmed: false
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.confirmed) {
            next()
        } else {
            if (confirm(' r u sure7')) {
                next()
            } else {
                next(false)
            }
        }
       
    }
}
</script>
