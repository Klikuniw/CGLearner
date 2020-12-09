var container;
var camera, scene, renderer;
var uniforms;
var size = [window.width,window.height];
$(window).resize(function(){
  window.resizeTo(size[0],size[1]);
});

init();
animate();

$("#draw").click(function(){
  animate();
});

$(".type").click(function(){
  var text = $(this).textContent;
  $("#dropdownMenuButton1").attr("textContent",text);
  var selected = text == 'Mandelbrot Set'? true : false
  alert(selected);
  uniforms.u_fractal_type.value = selected;
});

$(".color").click(function(){
  alert("$(this).val()");
  var strColor = [...$(this).attr("data-rgb").split(' ')];
  var array = strColor.map(function(a){return (parseInt(a,10)/255.0).toFixed(2);})
  uniforms.u_color_scheme.value = array;
});

$("#c-input").change(function(){

  var string = String($(this).val());

  const re = math.complex(string).re;
  const im = math.complex(string).im;

  uniforms.u_julia_c.value = [re, im];
});

$("#iterations-input").change(function(){
  const parsed = parseInt($(this).val(), 10);
  uniforms.u_max_iterations.value = isNaN(parsed) ? 500 : parsed;
});

$("#smooth-check").change(function(){
  alert("$(this).checked");
  uniforms.u_smooth.value = $(this).is(':checked');
});

$("#dynamic-check").change(function(){
  uniforms.u_dynamic.value = $(this).is(':checked');
});

function init() {
  container = document.getElementById('container');

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    u_time: {
      type: "f",
      value: 1.0
    },
    u_smooth: {
      type: "bool",
      value: false
    },
    u_dynamic: {
      type: "bool",
      value: false
    },
    u_zoom_speed: {
      type: "f",
      value: 1.0
    },
    u_max_iterations: {
      type: "int",
      value: 1000
    },
    u_zoom_center: {
      type: "v2",
      value: new THREE.Vector2()
    },
    u_resolution: {
      type: "v2",
      value: new THREE.Vector2()
    },
    u_mouse: {
      type: "v2",
      value: new THREE.Vector2()
    },
    u_color_scheme: {
      type: "v3",
      value: new THREE.Vector3(0.0, 0.6, 1.0)
    },
    u_julia_c: {
      type: "v2",
      value: new THREE.Vector2()
    }
  };

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  onWindowResize();
  container.addEventListener('resize', onWindowResize, false);

  container.addEventListener('wheel', onmouseweel, false);

}

function onWindowResize(e) {


  renderer.setSize(document.getElementById("container").clientWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

document.onmousemove = function(e) {
  uniforms.u_mouse.value.x = e.pageX / window.innerWidth;
  uniforms.u_mouse.value.y = e.pageY / window.innerHeight;

  if (e.buttons === 1) {


    var iDelta = (e.movementY / renderer.domElement.height) * uniforms.u_resolution.value.y;
    var rDelta = (e.movementX / renderer.domElement.width ) * uniforms.u_resolution.value.x;

    uniforms.u_zoom_center.value.y += iDelta;
    uniforms.u_zoom_center.value.x -= rDelta;

  }
}

function onmouseweel(e){
  var zoom_scale = 0.1;
   if (e.deltaY > 0) {
     uniforms.u_zoom_speed.value += zoom_scale;

   } else {
     if (uniforms.u_zoom_speed.value -zoom_scale > 0.0 ) {

       uniforms.u_zoom_speed.value -= zoom_scale;
     }
   }
}

function render() {
  uniforms.u_time.value += 0.05;
  renderer.render(scene, camera);
}

$(".dropdown-menu li button").click(function(){
  var b = document.getElementById("dropdownMenuButton2");
  var selText = $(this).text();
  b.innerHTML = selText;

});
