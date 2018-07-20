//This javascript visualisation wasinspired from Dan Shiffman's script at:
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_021_Mandelbrot_p5.js
//I modified it to take advantage of the symmetry along the real axis and avoiding looping over the bottom half
//of the complex plane to improve performance. I also reassigned some sliders.
//Check out Dan's original code at the given link and drop him a star on his repo. He's an amazing mentor.

var h=500,w=500; //canvas dimension
var scl,dx; //slider variables
var fr; //framerate display

function setup() {
  createCanvas(w, h);
  pixelDensity(1);
  scl = createSlider(1,100,1);
  dx = createSlider(-500,500,0);
  fr = createDiv('');
}

function draw() {
  var m = 90;

  loadPixels();
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h/2; y++) {

      var a = map(x, 0, w, ((0.5-2.2)+0.1*dx.value())/scl.value(), (0.5+0.1*dx.value())/scl.value());
      var b = map(y, 0, h, -1.1/scl.value(), 1.1/scl.value());
      var z = [a,b];

      var c = [a,b];

      var n = 0;

      while (n < m) {
        var z = [z[0]*z[0] - z[1]*z[1] + c[0], 2*z[0]*z[1] + c[1]];
        if (z[0]*z[0] + z[1]*z[1] > 16) {
          break;
        }
        n++;
      }

      var v = map(n, 0, m, 0, 1);
      v = map(sqrt(v), 0, 1, 0, 255);
      var b = 255;

      if (n == m) {
        v = 0;
        b = 0;
      }

      var idx = (x + y*w) * 4;
      pixels[idx + 0] = v;
      pixels[idx + 1] = v;
      pixels[idx + 2] = v;
      pixels[idx + 3] = 255;
      var idx = (x + (h-y-1) * w) * 4;
      pixels[idx + 0] = v;
      pixels[idx + 1] = v;
      pixels[idx + 2] = v;
      pixels[idx + 3] = 255;
    }
  }
  updatePixels();

  fr.html("FPS: "+floor(frameRate()));
}

