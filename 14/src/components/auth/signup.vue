<template>
  <div id="signup">
    <div class="signup-form">
      <form novalidate @submit.prevent="onSubmit">
        <div 
          class="input"
          :class="{invalid: $v.email.$error}">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  @focus="$v.email.$reset()"
                  @blur="$v.email.$touch()"
                  v-model="email">
                <p>{{$v.email}}</p>
                  <p v-if="$v.email.$error">Please provide a valid email</p>
                  
        </div>
        <div 
          class="input">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  
                  v-model="emailConfirmation">
               <p>{{emailConfirmation}}</p>
                  
        </div>
        <div
                :class="{invalid: $v.age.$error}"
                class="input">
          <label for="age">Your Age</label>
          <input
                  type="number"
                  id="age"
                  @focus="$v.age.$reset()"
                  @blur="$v.age.$touch()"
                  v-model.number="age">
          <p v-if="$v.age.$error">Your have to be at least {{ $v.age.$params.minVal.min}}</p>
        </div>
        <div
            :class="{invalid: $v.password.$error}" 
            class="input">
        <label for="password">Password</label>
        <input
                  type="password"
                  id="password"
                  @focus="$v.password.$reset(); $v.confirmPassword.$reset()"
                  @blur="$v.password.$touch(); $v.confirmPassword.$touch()"
                  v-model="password">
        </div>
        <div
             :class="{invalid: $v.confirmPassword.$error}" 
            class="input">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  @focus="$v.confirmPassword.$reset(); $v.password.$reset()"
                  @blur="$v.confirmPassword.$touch(); $v.password.$touch() "
                  v-model="confirmPassword">
                  <p v-if="$v.confirmPassword.$error">Passwords should match</p>
        </div>
        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="usa">USA</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>
        <div class="hobbies">
          <h3>Add some Hobbies</h3>
          <button @click="onAddHobby" type="button">Add Hobby</button>
          <div class="hobby-list">
            <div
                    class="input"
                    v-for="(hobbyInput, index) in hobbyInputs"
                    :key="hobbyInput.id">
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                      type="text"
                      :id="hobbyInput.id"
                      v-model="hobbyInput.value">
              <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
            </div>
          </div>
        </div>
        <div
            :class="{invalid: $v.terms.$error}"
            class="input inline">
          <input
            @change="$v.terms.$touch()" 
            type="checkbox" 
            id="terms" v-model="terms">
            <p>{{$v.terms}}</p>
          <label for="terms">Accept Terms of Use</label>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { requiredUnless ,required, email, numeric, minValue, minLength, sameAs } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'usa',
        hobbyInputs: [],
        terms: false,
        emailConfirmation: ''
      }
    },
    validations: {
        email: {
            required,
            email,
            unique: function(value){
                //pulling server only when email match regex
                if (this.$v.email.email) {
                    return axios.get('/users.json?orderBy="email"&equalTo="' + value +'"')
                    .then(res => {
                        return Object.keys(res.data).length === 0
                    })
                } else {
                    return true
                }


               
                
            }
        },
        
        age: {
            required,
            numeric,
            minVal: minValue(18)

      },
        password: {
            required,
            minLen: minLength(6)
        },
        confirmPassword: {
            // sameAs: sameAs('password')
            sameAs: sameAs(vm => {
                return vm.password
            })
        },
        terms: {
            required
        },

        hobbyInputs: {
            minLen: minLength(1),
            $each: {
                value: {
                    required,
                    minLen: minLength(5)
                }
            }
        }
    },
        methods: {
      onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },
      onSubmit () {
        const formData = {
          
          email: this.email,
          age: this.age,
          password: this.password,
          confirmPassword: this.confirmPassword,
          country: this.country,
          hobbies: this.hobbyInputs.map(hobby => hobby.value),
          terms: this.terms
        }
        console.log(formData)
        this.$store.dispatch('signup', {email:formData.email, password: formData.password})
      },
      
    },
    created() {
        console.log(this.$v.email)
      }
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }
  .input.invalid label {
    color: red;
  }
</style>