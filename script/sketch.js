let vertexShaderSource, mandelbrotFragShaderSource, juliaFragShaderSource;




var initWebGL = function() {
    loadShader('/shaders/vertex.glsl').then((result) => {
      vertexShaderSource = result;
      return loadShader('/shaders/mandelbrotFrag.glsl');
    })
    .then((result) => {
      mandelbrotFragShaderSource = result;
      return loadShader('/shaders/juliaFrag.glsl');
    })
    .then((result) => {
      juliaFragShaderSource = result;
      return runWebGL();
    })
    .catch((err) =>{
      alert('Error with loading shaders. Details in console');
      console.log(err);
    })
 
}

var runWebGL = function() {
    var canvas = document.getElementById('renderer');
    var gl = canvas.getContext('webgl');
    if(!gl) {
      alert('WebGL not supported in this browser');
      return;
    }
  canvas.height = gl.canvas.clientHeight;
  canvas.width = gl.canvas.clientWidth;
  gl.viewport(0, 0, canvas.width, canvas.height);
 
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    alert('Error compiling shader');
    console.error('Error compiling shader', gl.getShaderInfoLog(vertexShader)); 
  }
  
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, mandelbrotFragShaderSource);
  gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert('Error compiling shader');
      console.error('Error compiling shader', gl.getShaderInfoLog(fragmentShader)); 
    }

}

document.addEventListener('DOMContentLoaded', function() {
  initWebGL();
})

// function draw() {
//   if (mouseIsPressed) {
//     fill(0);
//   } else {
//     fill(255);
//   }
//   ellipse(mouseX, mouseY, 80, 80);
// }

function download(){
  
  var download = document.getElementById("download");
  var image = document.getElementsByTagName("canvas")[0].toDataURL("image/png")
              .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
}
