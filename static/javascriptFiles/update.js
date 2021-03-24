function update(){

    movement;

}

function movement(){
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    var speed = 5;
    
    //Calculates the real speed if moving diagonally
    //and updates speed to the derived number for that frame.
    if((this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) &&
    (this.cursorKeys.down.isDown || this.cursorKeys.up.isDown)){
        speed = Math.sqrt((speed * speed) / 2.0)
    }
    //Checks if user input of direction
    //keys are pressed for that frame
    if(this.cursorKeys.right.isDown){
        circle.x += speed;
    }
    if(this.cursorKeys.left.isDown){
        circle.x -= speed;
    }
    if(this.cursorKeys.up.isDown){
        circle.y -= speed;
    }
    if(this.cursorKeys.down.isDown){
        circle.y += speed;
    }
}