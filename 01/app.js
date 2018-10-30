//again all functions are dirty, bad programming habbits cant resist after meeting with elm and elixir D
new Vue({
    el: '#app',
    data: {
        
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        attackDisabled: false,
        timerAttack: 0,
        timerHeal: 0,
        specialAttackEnabled: false,
        turns: [],
        healTimerId: 0,
        specialAttackTimerId: 0,
        monsterAttackTimeoutId: 0,
        logClearerId: 0,
    
    },
    methods: {
        startGame: function() {
            this.turns = [];
            this.gameIsRunning = true;
            this.attackDisabled = false;
            this.specialAttackEnabled = false;
            this.healingEnabled = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.specialAttackTimer(10)
            this.healingTimer(15)
            this.initLog()
        },
        attack: function() {
            var damage = this.calculateRandomValue(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });
            if (this.checkWin())
                return;
            this.monsterAttack();
            
        },
        healingTimer: function(limitation) {
            var self = this
            this.healTimerId = setInterval(function(){
                ++self.timerHeal;
                console.log(self.timerHeal, "heal")
                if (self.timerHeal === limitation) {
                    self.healingEnabled = true;
                    console.log(self.healingEnabled)
                    self.timerHeal = 0
                } 
            }, 1000)
        },
        specialAttackTimer: function(limitation) {
            var self = this
            this.specialAttackTimerId = setInterval(function(){
                ++self.timerAttack;
                console.log(self.timerAttack, "attack")
                if (self.timerAttack === limitation) {
                    self.specialAttackEnabled = true;
                    self.timerAttack = 0
                } 
            }, 1000)
        },
        specialAttack: function() {
            var damage = this.calculateRandomValue(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player POWERFULLY!!! hits  monster for ' + damage
            });
            this.specialAttackEnabled = false;
            if (this.checkWin())
                return;
            this.monsterAttack();
        },
        heal: function() {
            var healthValue = this.calculateRandomValue(10, 20)
            this.playerHealth += healthValue;
            if (this.playerHealth > 100) this.playerHealth = 100;
            this.turns.unshift({
                isPlayer: true,
                isHeal: true,
                text: 'Player heals himself for ' + healthValue
            });
            this.healingEnabled = false;
            this.monsterAttack()
        },
        endGame: function() {
            this.gameIsRunning = false;
            clearTimeout(this.monsterAttackTimeoutId)
            clearInterval(this.healTimerId)
            clearInterval(this.specialAttackTimerId)
            clearInterval(this.logClearerId)
        },
        monsterAttack:function() {
            var self = this;
            this.attackDisabled = true;
            this.monsterAttackTimeoutId = setTimeout(function() {
                self.attackDisabled = false
                var damage = self.calculateRandomValue(5, 12);
                self.playerHealth -= damage;
                self.turns.unshift({
                    isPlayer: false,
                    text: 'Monster hits player for ' + damage
                });
                self.checkWin()
                }
            , 1500);
        },
        calculateRandomValue: function(min, max) {
            return Math.max(Math.ceil(Math.random() * max), min)
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if(confirm('You won!, new game?')) {
                    this.endGame();
                    this.startGame();
                } else {
                    this.endGame();
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm('You lost!, new game?')) {
                    this.endGame();
                    this.startGame();
                } else {
                    this.endGame();
                }
                return true;
            }
            return false;
            
        },
        //что-то стал злоупотреблять колбеками в очередь, пытаюсь имитировать параллельные воркеры))
        initLog: function() {
            var self = this
            this.logClearerId = setInterval(function() {
                if (self.turns.length >= 4) self.turns.pop()//не иммутабельно, что поделать) ну можно заслайсить
            }, 1000)
        }

        
    }
})