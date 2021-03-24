function update(){

    movement(this);

}

function movement(gameObject){
    
    var cursorKeys = gameObject.input.keyboard.createCursorKeys();

    var speed = 5;
    
    //Calculates the real speed if moving diagonally
    //and updates speed to the derived number for that frame.
    if((cursorKeys.right.isDown || cursorKeys.left.isDown) &&
    (cursorKeys.down.isDown || cursorKeys.up.isDown)){
        speed = Math.sqrt((speed * speed) / 2.0)
    }
    //Checks if user input of direction
    //keys are pressed for that frame
    if(cursorKeys.right.isDown){
        circle.x += speed;
    }
    if(cursorKeys.left.isDown){
        circle.x -= speed;
    }
    if(cursorKeys.up.isDown){
        circle.y -= speed;
    }
    if(cursorKeys.down.isDown){
        circle.y += speed;
    }
}