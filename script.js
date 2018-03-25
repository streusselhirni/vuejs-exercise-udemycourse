/**
 * Created by nicolas on 25.03.18.
 */

var app = new Vue({
    el: '#app',
    data: {
        started: false,
        playerHealth: 80,
        monsterHealth: 80,
        fightLog: []
    },
    methods: {
        startFight: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.fightLog = [];
            this.started = true;
        },
        attackPlayer: function(special) {
            var multiplier = 10;
            if (special) {
                multiplier = 20;
            }
            var dmgPlayer = Math.round((Math.random() * multiplier) + 1);
            this.fightLog.unshift({
                playerAttack: true,
                dmg: dmgPlayer,
                heal: false
            });
            this.monsterHealth -= dmgPlayer;
        },
        attackMonster: function() {
            var dmgMonster = Math.round((Math.random() * 10) + 1);
            this.fightLog.unshift({
                playerAttack: false,
                dmg: dmgMonster,
                heal: false
            });
            this.playerHealth -= dmgMonster;
        },
        attack: function(special) {
            this.attackPlayer(special);
            this.attackMonster();
        },
        heal: function() {
            var amount = Math.round((Math.random() * 15) + 1);
            this.playerHealth += amount;
            this.fightLog.unshift({
                playerAttack: true,
                dmg: amount,
                heal: true
            });
            this.attackMonster();
        },
        giveUp: function() {
            this.started = false;
        }
    },
    watch: {
        monsterHealth: function() {
            if (this.started) {
                if (this.monsterHealth <= 0 && this.playerHealth > 0) {
                    if (window.confirm('You have slayed the monster! New game?')) {
                        this.monsterHealth = 0;
                        this.startFight();
                    }
                    else {
                        this.monsterHealth = 0;
                        this.started = false;
                    }
                }
                else if (this.playerHealth <= 0 && this.monsterHealth > 0) {
                    if (window.confirm('You have been defeated. New game?')) {
                        this.playerHealth = 0;
                        this.startFight();
                    }
                    else {
                        this.playerHealth = 0;
                        this.started = false;
                    }
                }
                else if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
                    if (window.confirm('You died killing the monster. New game?')) {
                        this.playerHealth = 0;
                        this.monsterHealth = 0;
                        this.startFight();
                    }
                    else {
                        this.playerHealth = 0;
                        this.monsterHealth = 0;
                        this.started = false;
                    }
                }
            }
        }
    }
});