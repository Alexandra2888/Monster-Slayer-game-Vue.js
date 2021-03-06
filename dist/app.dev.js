"use strict";

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var app = Vue.createApp({
  data: function data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null
    };
  },
  computed: {
    monsterBarStyles: function monsterBarStyles() {
      return {
        width: this.monsterHealth + '%'
      };
    },
    playerBarStyles: function playerBarStyles() {
      return {
        width: this.playerHealth + '%'
      };
    },
    mayUseSpecialAttack: function mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },
  watch: {
    playerHealth: function playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth: function monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) this.winner = 'player';
    }
  },
  methods: {
    attackMonster: function attackMonster() {
      this.currentRound++;
      var attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer: function attackPlayer() {
      var attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster: function specialAttackMonster() {
      this.currentRound++;
      var attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    healPlayer: function healPlayer() {
      this.currentRound++;
      var healValue = getRandomValue(8, 20);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }

      ;
      this.attackPlayer();
    }
  }
});
app.mount('#game');