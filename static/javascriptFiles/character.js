class Character extends Phaser.Physics.Arcade.Image {
    constructor(game, xPosition, yPosition, pictureName){
        super(game, xPosition, yPosition, pictureName);
        this.genTasks = [];
        this.genTasks.push(new task("Make a Copy of A Copy.", 100));
        this.genTasks.push(new task("Empty Trash.", 100));
        this.genTasks.push(new task("Organize File Cabnet.", 100));
        this.genTasks.push(new task("Water Fern.", 100));
        this.genTasks.push(new task("Refill ink in the printer.", 100));
        this.invuln = 0;
        this.fearFlag = 0;
        this.speed = 200;
        //True speed of the character that should remain constant
        //to act as a reset if an effect would change this.
        this.storeSpeed = 200;

        /*Adds this Character to the game's physics.
        *Vital for intearacting with collisions and overlaps.
        */
        game.add.existing(this);
        game.physics.add.existing(this);

        //This makes the circular models have very nice collision along smooth edges
        this.setCircle(54);

        //Collide with outer bounds
        this.setCollideWorldBounds(true);

        //Colide with inner walls
        game.physics.add.collider(game.walls, this);

        //Overlap with workstation
        game.physics.add.overlap(game.workzones, this, function workzoneOverlap(){
            var eKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            if(Phaser.Input.Keyboard.JustDown(eKey)){
                    game.taskPts += 1;
            }
        });
    }
}

class SoftwareProgrammer extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'red_circle');
        this.sProgTasks = [];
        this.sProgTasks.push(new task("Implement feature.", 200));
        this.sProgTasks.push(new task("Create an Algorithm.", 200));
        this.sProgTasks.push(new task("Print your revisions of the code.", 200));
        this.sProgTasks.push(new task("Create a class diagram.", 200));
        this.sProgTasks.push(new task("Get permission from IT.", 200));
    }
}

class SoftwareDeveloper extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'green_circle');
        this.sDevTasks = [];
        this.sDevTasks.push(new task("Research new software designs.", 200));
        this.sDevTasks.push(new task("File your documentation.", 200));
        this.sDevTasks.push(new task("Provide maintenence.", 200));
        this.sDevTasks.push(new task("Make a sequence diagram.", 200));
        this.sDevTasks.push(new task("Make some calls for research purposes.", 200));
    }
}

class QualityTester extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'yellow_circle');
        this.qaTasks = [];
        this.qaTasks.push(new task("Test the newest build.", 200));
        this.qaTasks.push(new task("Write down any bugs encountered.", 200));
        this.qaTasks.push(new task("File bug reports.", 200));
        this.qaTasks.push(new task("Print out screenshot.", 200));
        this.qaTasks.push(new task("Find out the reason why this bug exists.", 200));
    }
}

class RequirementsEngineer extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'blue_circle');
        this.rEngTasks = [];
        this.rEngTasks.push(new task("Make meeting with stakeholder.", 200));
        this.rEngTasks.push(new task("Brainstorm ideas.", 200));
        this.rEngTasks.push(new task("Make a diagram", 200));
        this.rEngTasks.push(new task("Assemble a powerpoint.", 200));
        this.rEngTasks.push(new task("Print out interview notes.", 200));
    }
}