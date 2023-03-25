let ec; //var for easycam
let eye;
let screen = []; //an empty array for the screen
let pixelSize;
let numCols, numRows;

let rays = []; //empty array to hold the rays
let showRays = false; //toggles with the v key
let sphereLoc; //location of the sphere

let objs = []; //empty array to hold the sphere objects

// camera state, will reset to this when the window doubled clicked.
let state = {
  distance : 100,                 // scalar
  center   : [0, 0, -100],         // vector
  rotation : [1, 0, 0, 0],  // quaternion
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); //create a 3d drawing context, full width and height
  ec=createEasyCam(); //easycam object
  document.oncontextmenu = ()=>false; //disable right click

  ec.setState(state, 1000); // animate to state in 1 second
  ec.state_reset = state;   // state to use on reset

  eye = new createVector(0, 0, 0); //new vector at origin for the eye

  //make the screen
  //changing the screen size will increase the render time 
  let screenWidth = 160; //screen size in webgl units, keeping it 16:9 ratio like all the hd screens
  let screenHeight = 90;  
  pixelSize = 5; //you can change this, it will create more pixels, thus more rays, and slow it down!
  numCols = screenWidth / pixelSize; //number of "pixels" in the width 
  numRows = screenHeight / pixelSize; //number of "pixels" for the height
  print("cols", numCols);
  print("rows", numRows);
  let hOff = screenWidth/2; //horiziontal offset, centering the screen in the middle of the p5 window
  let vOff = screenHeight/2; //vertical offset

  for(let i = 0; i < numCols; i++){  //how many columns to put in each row
    // print("col", i);
    screen[i] = []; //each row is also an array
    rays[i] = []; //we will use the same loop to create the rays array
    // debugger;
    let x = i * pixelSize - hOff + pixelSize/2;

    for(let j = 0; j < numRows; j++){ //how many rows to make
      let y = j * pixelSize - vOff + pixelSize/2;
      let z = -100; //hard coded for now

      let pixelVect = new createVector(x,y,z); //vector for the pixel
      let pixel = new Pixel(pixelVect, pixelSize); //create a new pixel
      screen[i].push(pixel); //add the pixel to the array

      //why we are here, why not make a ray too?
      //this won't work until you write the ray class
      rays[i].push(new Ray(eye, pixel.loc));  
    }
  }

  //creates a single sphere, feel free to test with more sphere
  objs.push(new Sphere(createVector(0, 0, -200), 50, color(255,0,0)));
}

function draw() {
  background(255);
  lights(); //webgl shading
  noStroke(); //takes the wireframes away

  //for the eye, just represent it as a small black sphere at 0,0,0
  fill(0);
  sphere(10);

  //draw the screen 
  for(let row of screen){ //loop through the screen array 
    for(let p of row){ //p is the center of a screen pixel
      p.display();
    }
  }

  //draw objs
  for(let o of objs){
    o.draw();
  }

  //show the rays?
  //won't work until you write some of the ray class
  if(showRays){
    for(let row of rays){
      for(let r of row){
        r.show();
      }
    }
  }
}

//write a render function 
function render(){
  //for each ray,
  //check for an intersection with the objects list
  //at the end, update the pixel that matches this ray
}

function keyPressed(){
  print(key);
  if(key == "v"){
    showRays ? showRays=false : showRays=true; //toggle rays, using a ternary here
  } else if(key == "r"){
    render();
  } else if(key == "s"){
    saveOutput();
  }
}

//giving you this to save time, it was a pain to write 
function saveOutput(){
  let img = createImage(numCols, numRows); //create a new p5 image object
  img.loadPixels(); //loadpixels, just puts a 0 for each pixel

  //loop over the image objects width and height
  for (let i = 0; i < img.width; i++) { 
    for (let j = 0; j < img.height; j++) {
      //set this pixel to the color at coresponding virtual screen
      img.set(i, j, screen[i][j].color);
    }
  }
  img.updatePixels(); //update the pixels data we just set
   
  img.save('render', 'png'); //saves the image as a png with the name render
}
