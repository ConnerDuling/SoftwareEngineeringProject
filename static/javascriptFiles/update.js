function update(){
        
    var speed = 3;
    
    //Calculates the real speed if moving diagonally.
    if((this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) &&
    (this.cursorKeys.down.isDown || this.cursorKeys.up.isDown)){
        speed = Math.sqrt((speed * speed) / 2)
    }

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