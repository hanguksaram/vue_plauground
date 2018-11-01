<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change my name</button>
        <hr>
        <p>{{age}}</p>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail 
                :userAge="age"
                :resetfn="resetName"
                :childname="name" 
                @nameWasReset="name = $event"></app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit 
                 @ageWasChanged="changeOwnAge($event)"
                :userAge="age"></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../main';
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
        data() {
            return {
                name: 'Host',
                age: 27
            }
        },
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        },
        methods: {
            changeName() {
                this.name = 'Random'
            },
            resetName() {
                this.name = 'Was reset'
            },
            changeOwnAge(age) {
                this.age = age
            }
        },
        created() {
            eventBus.$on('randomEvent', (eventdata) => {
                alert(eventdata)
            })
        }
    }
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>
