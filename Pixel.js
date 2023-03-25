class Pixel {
  constructor(vect,s) {
    // this.loc = vect.copy(); //not sure if this is necessary, js is pass by value so thinking here that we are creating a copy.
    this.loc = vect;
    this.loc = vect.copy(); //not sure if this is necessary, js is pass by value so thinking here that we are creating a copy.
    this.color = null;
    this.size = s;
  }

  display() {
    let s = this.size/2; //half size of the pixel
    push(); //new drawing context
    //move the drawing context to center on this pixel
    translate(this.loc.x, this.loc.y, this.loc.z);
   
    //sphere(1); //used to make sure the rays passed through the center of the pixel

    //if pixel color is undefined, then nofill, else fill color
    if(this.color){
      fill(this.color);
    } else {
      noFill();
    }

    //draws a square to visual the pixel 
    stroke(0);
    beginShape();
    vertex(-s, -s, 0);
    vertex(s, -s, 0);
    vertex(s, s, 0);
    vertex(-s, s, 0);
    endShape(CLOSE);
    pop(); //reset to original drawing context

  }
}


