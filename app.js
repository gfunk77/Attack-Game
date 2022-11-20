function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      alienHealth: 100,
      playerHealth: 100,
      attackCounter: 0,
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
    enableSpecial() {
      return this.attackCounter % 3 !== 0;
    },
    enableRecover() {
      return this.attackCounter % 2 !== 0;
    },
  },
  methods: {
    attackAlien() {
      this.attackCounter++;
      const attackValue = getRandomNumber(5, 10);
      this.alienHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomNumber(8, 13);
      this.playerHealth -= attackValue;
    },
    specialAttack() {
      this.attackCounter++;
      const attackValue = getRandomNumber(8, 20);
      this.alienHealth -= attackValue;
      this.attackPlayer();
    },
    recover() {
      this.attackCounter++;
      const recoverValue = getRandomNumber(12, 22);
      this.playerHealth += recoverValue;
      this.attackPlayer();
    },
  },
});
app.mount("#app");
