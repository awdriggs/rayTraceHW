class Ray {
  //write a constructor for the Ray class
  //take in two vectors, one for the eye location and one for the pixel location
  constructor(eye, ploc) {
    
  }
  
  //write a cast function, this should return a 3d vector representing a location along the ray dist units away 
  cast(dist){ //take in a distance value i.e. 20

  }

  intersect(objs){ //take in a list of objects, checks for ray itersection for each object
    //loop through each object, check for an intersection between the ray and the ojbect
    //hint: use the cast for every point from 0 to 1000 along this ray
  }

  //giving you this, it will draw a line from the origin of this ray to a point 1000 units away. 
  show(){
    let p = this.cast(1000);
    stroke(0); //black
    line(this.origin.x, this.origin.y, this.origin.z, p.x, p.y, p.z) //draw a line for this vector
  }
}
   
