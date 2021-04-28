class GameOver extends Phaser.Scene {
    constructor(){
        super('GameOver')
    }
    init(data){
        this.totalTime = data.totalTime;
        this.bugKills = data.bugKills;
        this.monkeyKills = data.monkeyKills;
        this.featureCreapKills = data.featureCreapKills;
        this.spaghettiCodeKills = data.spaghettiCodeKills;
    }
    preload ()
    {
        preloadGameImages(this)
    }
    create ()
    {
        makeCarpet(this);
        var XCoordinateEights = this.cameras.main.width/8;
        var YCoordinateFourths = this.cameras.main.height/4;

        this.timeDisplay = this.add.text(XCoordinateEights*3, YCoordinateFourths, '');
        this.timeDisplay.setText('Total Time to complete level'+
                                '\nMinutes: ' + Math.floor(this.totalTime / 60) +
                                '\nSeconds: ' + (this.totalTime % 60) +
                                '\n'+
                                '\nTotal Enemies Killed In Level'+
                                '\nBug Kills:\t'+this.bugKills+
                                '\nMonkey Kills:\t'+this.monkeyKills+
                                '\nFeature Creap Kills:\t'+this.featureCreapKills+
                                '\nSpaghetti Code Kills:\t'+this.spaghettiCodeKills);

        this.countDown = this.add.text(XCoordinateEights*3, YCoordinateFourths*2)

        this.timeCounter = 0;
        var timerConfig = {loop: true,
            delay: 1000,
            callback: returnCountDown,
            args: [this, 10]
        }
        this.time.addEvent(timerConfig);
    }
    update(){

    }
}

function returnCountDown(game, returnTime){
    game.timeCounter++;

    game.countDown.setText(returnTime - game.timeCounter + ' seconds left until return to Level Select');

    if(game.timeCounter >= returnTime){
        game.scene.start('LevelSelect');
    }
}