<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p>Your email address {{ email }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: ''
    }
  },
  created() {
    axios.get('https://vuejshttp-2cd66.firebaseio.com/users.json')
    .then(res => {
      console.log(res.data)
      for (const key in res.data) {
        this.email = res.data[key].email;  
        }
      }
    , error => console.log(error))
  }  
}
</script>


<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>