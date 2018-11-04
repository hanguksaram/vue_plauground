<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Animations</h1>
                <p>{{alertAnimation}}</p>
                <hr>
                <select v-model="alertAnimation" class="form-control">
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                </select>
                <br>
                <button @click="show = !show" class="btn btn-primary">Show Alert</button>
                <br>
                <br>
                <!-- transition using only for single elements -->
                <transition :name="alertAnimation">
                    <div v-show="show" class="alert alert-info">This is some info</div>
                </transition>
                 <transition name="slide" type="animation">
                    <div v-if="show" class="alert alert-info">This is some info</div>
                </transition>
                <!-- 'appear' attr start animating on dom creation -->
                 <transition 
                    appear
                    enter-active-class="animated bounce"
                    leave-active-class="animated shake"
                    > 
                    <div v-if="show" class="alert alert-info">This is some info</div>
                </transition>
                <transition :name="alertAnimation" mode="out-in">
                    <div v-if="show" key="info" class="alert alert-info">This is some info</div>
                    <div v-else key="warning" class="alert alert-warning">This is some Warning</div>
                </transition>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: true,
                alertAnimation: 'fade'
            }
        }
    }
</script>

<style>
    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        transition: opacity 1s;
    }
    .fade-leave {
        /* opacity: 1; */
    }
    .fade-leave-active {
        transition: opacity 1s;
        opacity: 0;
    }

    .slide-enter {
        opacity: 0
    }

    .slide-enter-active {
        animation: slide-in 1s ease-out forwards; 
        transition: opacity 1s;
    }

    .slide-leave {

    }
    .slide-leave-active {
         animation: slide-out 1s ease-out forwards; 
         transition: opacity 1s;
         opacity: 0;
    }

    @keyframes slide-in {
        from {
            transform: translateY(20px)
        }
        to {
            transform: translateY(0)
        }
    }
    @keyframes slide-out {
        from {
            transform: translateY(0)
        }
        to {
            transform: translateY(20px)
        }
    }
</style>
