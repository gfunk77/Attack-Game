function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      alienHealth: 100,
      playerHealth: 100,
    };
  },
  computed: {
    healthMeterAlien() {
      if (this.alienHealth <= 0) {
        return { width: 0 };
      }
      return { width: this.alienHealth + "%" };
    },
    healthMeterPlayer() {
      if (this.playerHealth <= 0) {
        return { width: 0 };
      }
      return { width: this.playerHealth + "%" };
    },
  },
  methods: {
    attackAlien() {
      const attackValue = getRandomNumber(5, 10);
      this.alienHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomNumber(8, 13);
      this.playerHealth -= attackValue;
    },
  },
});
app.mount("#app");
