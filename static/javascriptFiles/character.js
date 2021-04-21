class Character extends Phaser.Physics.Arcade.Image {
    constructor(game, xPosition, yPosition, pictureName){
        super(game, xPosition, yPosition, pictureName);
        this.genTasks = [];
        this.genTasks.push(new Task("Make a Copy of A Copy.", 100));
        this.genTasks.push(new Task("Empty Trash.", 100));
        this.genTasks.push(new Task("Organize File Cabnet.", 100));
        this.genTasks.push(new Task("Water Fern.", 100));
        this.genTasks.push(new Task("Refill ink in the printer.", 100));
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
        this.sProgTasks.push(new Task("Implement feature.", 200));
        this.sProgTasks.push(new Task("Create an Algorithm.", 200));
        this.sProgTasks.push(new Task("Print your revisions of the code.", 200));
        this.sProgTasks.push(new Task("Create a class diagram.", 200));
        this.sProgTasks.push(new Task("Get permission from IT.", 200));
    }
}

class SoftwareDeveloper extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'green_circle');
        this.sDevTasks = [];
        this.sDevTasks.push(new Task("Research new software designs.", 200));
        this.sDevTasks.push(new Task("File your documentation.", 200));
        this.sDevTasks.push(new Task("Provide maintenence.", 200));
        this.sDevTasks.push(new Task("Make a sequence diagram.", 200));
        this.sDevTasks.push(new Task("Make some calls for research purposes.", 200));
    }
}

class QualityTester extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'yellow_circle');
        this.qaTasks = [];
        this.qaTasks.push(new Task("Test the newest build.", 200));
        this.qaTasks.push(new Task("Write down any bugs encountered.", 200));
        this.qaTasks.push(new Task("File bug reports.", 200));
        this.qaTasks.push(new Task("Print out screenshot.", 200));
        this.qaTasks.push(new Task("Find out the reason why this bug exists.", 200));
    }
}

class RequirementsEngineer extends Character{
    constructor(game, xPosition, yPosition){
        super(game, xPosition, yPosition, 'blue_circle');
        this.rEngTasks = [];
        this.rEngTasks.push(new Task("Make meeting with stakeholder.", 200));
        this.rEngTasks.push(new Task("Brainstorm ideas.", 200));
        this.rEngTasks.push(new Task("Make a diagram", 200));
        this.rEngTasks.push(new Task("Assemble a powerpoint.", 200));
        this.rEngTasks.push(new Task("Print out interview notes.", 200));
    }
}