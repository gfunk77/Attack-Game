function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      alienHealth: 100,
      playerHealth: 100,
      attackCounter: 0,
      winner: null,
      gameStats: [],
    };
  },
  watch: {
    alienHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
    playerHealth(value) {
      if (value <= 0 && this.alienHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "alien";
      }
    },
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
    startNewGame() {
      this.alienHealth = 100;
      this.playerHealth = 100;
      this.attackCounter = 0;
      this.winner = null;
      this.gameStats = [];
    },
    attackAlien() {
      this.attackCounter++;
      const attackValue = getRandomNumber(5, 10);
      this.alienHealth -= attackValue;
      this.gameLog("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomNumber(8, 13);
      this.playerHealth -= attackValue;
      this.gameLog("alien", "attack", attackValue);
    },
    specialAttack() {
      this.attackCounter++;
      const attackValue = getRandomNumber(8, 20);
      this.alienHealth -= attackValue;
      this.gameLog("player", "special attack", attackValue);
      this.attackPlayer();
    },
    recover() {
      this.attackCounter++;
      const recoverValue = getRandomNumber(12, 22);
      if (this.playerHealth + recoverValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += recoverValue;
      }
      this.gameLog("player", "recover", recoverValue);
      this.attackPlayer();
    },
    abduction() {
      this.winner = "alien";
    },
    gameLog(who, what, type) {
      this.gameStats.unshift({
        who: who,
        action: what,
        type: type,
      });
    },
  },
});
app.mount("#app");
