<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>
                    <div class="form-group">
                        <label for="">Username</label>
                        <input 
                            v-model="user.username"
                            type="text" 
                            class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="">Mail</label>
                        <input 
                            v-model="user.email"
                            type="text" 
                            class="form-control">
                    </div>
                    <button @click="submit" class="btn btn-primary">Submit</button>
                    <hr>
                    <input type="text" class="form-control" v-model="node">
                    <br>
                    <br>
                    <button @click="fetchData" class="btn btn-primary">Get Data</button>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="u in users">{{u.username}} - {{u.email}}</li>
                    </ul>
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    username: '',
                    email: ''
                },
                users:[],
                resource: {},
                node: 'data'
            }
        },
        methods: {
            submit() {
                // this.resource.save({}, this.user);
                // this.$http.post('data.json', this.user)
                //     .then(response => {
                //         console.log(response)
                //     }, error => {
                //         console.log(error)
                //     })
                this.resource.saveAlt(this.user);
            },
            fetchData() {
                // this.$http.get('data.json')
                //     .then(response => {
                //         return response.json();
                //     }).then(data => console.log(data))
                this.resource.getData({node: this.node})
                    .then(response => {
                         return response.json();
                     }).then(data => console.log(data))
            }
        },
        
        created() {
            const customActions = {
                saveAlt: {method: 'POST', url: 'alternative.json'},
                getData: {method: 'GET'}
            }
            this.resource = this.$resource('{node}.json', {}, customActions);
        }
    }
</script>

<style>
</style>
