<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Directives</h1>
                <p v-text="'Some text'"></p>

            </div>
        </div>
        <hr>
            <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Custom directives</h1>
                <p v-highlight.delayed="'red'">Color this</p>
                <p v-local-highlight.blink="{color: 'red', delay: 500}">Color this</p>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
  directives: {
    "local-highlight": {
      bind(el, binding, vnode) {
        const changeColor = color => {
          if (binding.arg == "background") {
            el.style.backgroundColor = color;
          } else {
            el.style.color = color;
          }
        };
        var delay = 0;
        if (binding.modifiers["delayed"]) {
          delay = 3000;
        }
        setTimeout(() => {
          changeColor(binding.value.color);
        }, binding.value.delay);

        if (binding.modifiers["blink"]) {
          let i = 0;
          setInterval(() => {
            i++;
            if (i % 2 === 0) {
                changeColor(binding.value.color)
            } else {
                changeColor('inherit')
            }
            if (i === 100) {
                i = 0
            }
          }, binding.value.delay); 
        }
      }
    }
  }
};
</script>

<style>
</style>
