<template>

    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>CSS Animations</h1>
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
                <hr>
                <h2>JS Animation</h2>
                <button @click="load = !load" class="btn btn-primary">Load / Remove Element</button>
                <br>
                <br>
                <!-- animation hooks -->
                <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @enter-cancelled="enterCancelled"
                    
                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    @leave-cancelled="leaveCancelled"
                    :css="false">
                    <div style="width: 300px; height: 100px; 
                    background-color: lightgreen" v-if="load"></div>
                </transition>
                <hr>
                <button 
                    @click="selectedComponent == 'app-success-alert' ? selectedComponent = 'app-danger-alert': 
                    selectedComponent = 'app-success-alert'"
                    class="btn btn-primary">Change alert</button>
                <br>
                <transition mode="out-in" name="fade">
                     <component :is="selectedComponent"></component>
                </transition>
                <hr>
                <button @click="addItem" class="btn btn-primary">Add Item</button>
                
                <ul class="list-group">
                    <transition-group name="slide">
                        <li 
                            @click="removeItem(index)" 
                            :key="number"
                            v-for="(number, index) in numbers" 
                            class="list-group-item"
                            style="cursor:pointer;">
                            {{ number }}
                        </li>
                    </transition-group>
                </ul>
               
            </div>
        </div>
    </div>
</template>

<script>
    import SuccessAlert from './SuccessAlert.vue'
    import DangerAlert from './DangerAlert.vue'
    export default {
        data() {
            return {
                load: true,
                show: true,
                alertAnimation: 'fade',
                elementWidth: 100,
                selectedComponent: 'app-success-alert',
                numbers: [1, 2, 3, 4, 5]
            }
        },
        components: {
            appDangerAlert: DangerAlert,
            appSuccessAlert: SuccessAlert
        },
        methods: {
            beforeEnter(el) {
                this.elementWidth = 100;
                el.style.width = this.elementWidth + 'px';
            },
            enter(el, done) {
                console.log('enter')
                let round = 1;
                const interval = setInterval(() => {
                    el.style.width = (this.elementWidth + round * 10) + 'px';
                    round++;
                    if (round > 20) {
                        clearInterval(interval);
                        done();
                    }
                }, 20)
            },
            afterEnter(el) {
                console.log('afterEnter')
            },
            enterCancelled(el) {
                console.log('enterCancelled')
            },
            beforeLeave(el) {
                console.log('beforeLeave')
                this.elementWidth = 300;
                el.style.width = this.elementWidth + 'px';
            },
            leave(el, done) {
                let round = 1;
                const interval = setInterval(() => {
                    el.style.width = (this.elementWidth - round * 10) + 'px';
                    round++;
                    if (round > 20) {
                        clearInterval(interval);
                        done();
                    }
                }, 20)
            },
            afterLeave(el) {
                console.log('afterLeave')
            },
            leaveCancelled(el) {
                console.log('leaveCancelled')
            },
            addItem() {
                const pos = Math.floor(Math.random() * this.numbers.length);
                this.numbers.splice(pos, 0, this.numbers.length + 1)
            },
            removeItem(indx) {
                this.numbers = this.numbers.filter((el, index) =>  indx != index)
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
    /* for transiiton-group animation */
    .slide-move {
        transition: transform 1s;
    }
    .slide-leave-active {
         animation: slide-out 1s ease-out forwards; 
         transition: opacity 1s;
         opacity: 0;
         position: absolute;
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
