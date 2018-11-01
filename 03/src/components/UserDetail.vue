<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ switchName() }}</p>
        <p>User age: {{userAge}}</p>
        <button @click="resetName">Reset Name</button>
        <button @click="resetfn()">reset by callback</button>
    </div>
</template>

<script>
    import { eventBus } from '../main';

    export default {
        props: {
            childname: {
                type: String,
                default: 'Anonymous'
            },//simple way to validate props
            resetfn: Function,
            userAge: Number
        },
        methods: {
            switchName() {
                return this.childname.split("").reverse().join("");
            },
            resetName() {
                this.childname = "lol"
                this.$emit('nameWasReset', this.childname);
            }
        },
        created() {
            eventBus.$on('ageWasChanged', (age) => {
                this.userAge = age;
            });
        }
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
