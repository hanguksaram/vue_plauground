export default {
    data() {
      return {
        fruits: ["Apple", "Banana", "Mango", "Melon"],
        filterText: ""
      };
    },
    computed: {
      filterFruits() {
        return this.fruits.filter(el => {
          return el.match(this.filterText);
        });
      }
    }
  };