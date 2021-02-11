class Fruit{
    constructor(){
        this.x = random(100, 1000);
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.velcoityY = 6;
        this.angle = Math.round(random(0, 360));
        this.rand = Math.round(random(1,5));
        this.catched = false;
        this.visible = 255;
    };

    touch(object){
        if(this.catched === false){
            if(this.x > object.x-object.width/2 && this.x < object.x+object.width/2 && this.y > object.y-object.height/2 && this.y < object.y+object.height/2){
                this.catched = true;
                player.score++;
                player.update();
            }
        }
    }

    update(){
        if(this.catched === false){
            this.y = this.y + 6;
        }else if(this.catched === true){
            this.visible = 0;
        }
    };

    show(){
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        tint(255, this.visible);
        switch(this.rand){
            case 1: image(fruit1_img, 0, 0, this.width, this.height);
                break;
            case 2: image(fruit2_img, 0, 0, this.width, this.height);
                break;
            case 3: image(fruit3_img, 0, 0, this.width, this.height);
                break;
            case 4: image(fruit4_img, 0, 0, this.width, this.height);
                break;
            case 5: image(fruit5_img, 0, 0, this.width, this.height);
                break;
        }
        pop();
    };
}