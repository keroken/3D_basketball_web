// ----------------- main function ----------------------
const main = function () {
  const scene = new THREE.Scene();

  // ----------------- variables ----------------------
  let mouseX, mouseY;
  const width  = window.innerWidth;
  const height = window.innerHeight;


  // ----------------- sound ----------------------
  const clickSound = new Audio();
  clickSound.src = '../sounds/digital_beep_003.mp3';
  clickSound.volume = 0.10;
  clickSound.autoplay = false;
  clickSound.preload = true;
  

  // ----------------- camera settings ----------------------
  const fov    = 60;
  const aspect = width / height;
  const near   = 1;
  const far    = 100000;
  const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set( 0, -100, 1500 );
  camera.lookAt(new THREE.Vector3(0,0,0));

  const positions = [
    [0, -100, 1500],
    [-100, 500, 0],
    [2000, 20000, 0],
    [0, 1000, -3000],
    [0, 2000, 3000],
    [-3000, 0, 0]
  ];
  let currPosition = 0;


  // ----------------- renderer instanciation ----------------------
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#wc-canvas")
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);


  // ----------------- light settings ----------------------
  const directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.intensity = 0.5;
  directionalLight.position.set( 200, 200, 200 );
  scene.add( directionalLight );

  const ambientLight = new THREE.AmbientLight(0xFFFFFF);
  scene.add( ambientLight );


  // ----------------- basketball court ----------------------
  const plane = new THREE.PlaneGeometry( 15000, 28000, 150, 280 );
  const textureLoader = new THREE.TextureLoader();
  const texture1 = textureLoader.load( "textures/basketball-court.jpg" );
  const material1 = new THREE.MeshPhongMaterial( { map: texture1, wireframe: true } );
  const floor = new THREE.Mesh( plane, material1 );
  floor.rotation.x = -Math.PI/2;
  floor.position.y = -550;
  // floor.__dirtyRotation = true;
  scene.add( floor );



  // ----------------- load 3D models ----------------------
  let objmodel;

  // instantiate a loader
  const loader = new THREE.OBJLoader();
  // load a resource
  loader.load(
    // resource URL
    'models/Sport_Wheelchair_01a.obj',
    // called when resource is loaded
    function ( object ) {
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.wireframe = true;
          child.material.color.set(0x0004FF);
        }
      });
      //object.scale.set(1.5,1.5,1.5);
      objmodel = object.clone();
      // obj = new THREE.Object3D();
      obj.add(objmodel);

      scene.add( obj );
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      console.log( 'An error happened' );
    }
  );

  const obj = new THREE.Object3D;



  // ----------------- camera controls ----------------------
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.enableZoom = true;
  // controls.autoRotate = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  


  // ----------------- animate loop ----------------------
  animate();

  function animate() {
    requestAnimationFrame( animate );
    obj.rotation.set(
      0,
      obj.rotation.y + .01,
      0
    );

    TWEEN.update();
    controls.update();
    console.log('x:' + camera.position.x + ', y:' + camera.position.y + ', z:' + camera.position.z);

    renderer.render( scene, camera );
  };

  

  // ----------------- title ----------------------
  const title = document.getElementById('title');
  title.classList.add('top');



    // ----------------- iframe ----------------------
  const frame = document.getElementById('frame');
  setTimeout(function() {
    frame.src = 'home.html';
    frame.classList.add('fade-in');
  }, 2000);
  


  // ----------------- global menu ----------------------
  const link_home = document.getElementById('home');
  link_home.classList.add('active');
  const link_history = document.getElementById('history');
  const link_rules = document.getElementById('rules');
  const link_players = document.getElementById('players');
  const link_wheelchair = document.getElementById('wheelchair');
  const link_links = document.getElementById('links');
  const gnav = [link_home, link_history, link_rules, link_players, link_wheelchair, link_links];
  
  link_home.addEventListener('click', function() {
    clickSound.play();
    frame.classList.remove('fade-in');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_home.classList.add('active');
    currPosition = 0;
    tweenCamera(camera, positions[currPosition], 3000);
    title.classList.remove('bottom');
    title.classList.add('top');
    
    setTimeout(function() {
      frame.src = 'home.html';
      frame.classList.add('fade-in');
    }, 3000);
  });

  link_history.addEventListener('click', function() {
    clickSound.play();
    frame.classList.remove('fade-in');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_history.classList.add('active');
    currPosition = 1;
    tweenCamera(camera, positions[currPosition], 3000);
    title.classList.remove('top');
    title.classList.add('bottom');
    
    setTimeout(function() {
      frame.src = 'history.html';
      frame.classList.add('fade-in');
    }, 3000);
  });

  link_rules.addEventListener('click', function() {
    clickSound.play();
    frame.classList.remove('fade-in');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_rules.classList.add('active');
    currPosition = 2;
    tweenCamera(camera, positions[currPosition], 3000);
    title.classList.remove('top');
    title.classList.add('bottom');

    setTimeout(function() {
      frame.src = 'rules.html';
      frame.classList.add('fade-in');
    }, 3000);
  });
  
  link_players.addEventListener('click', function() {
    clickSound.play();
    frame.classList.remove('fade-in');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_players.classList.add('active');
    currPosition = 3;
    tweenCamera(camera, positions[currPosition], 3000);
    title.classList.remove('top');
    title.classList.add('bottom');
    setTimeout(function() {
      frame.src = 'players.html';
      frame.classList.add('fade-in');
    }, 3000);
  });
  
  link_wheelchair.addEventListener('click', function() {
    clickSound.play();
    frame.classList.remove('fade-in');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_wheelchair.classList.add('active');
    currPosition = 4;
    tweenCamera(camera, positions[currPosition], 3000);
    title.classList.remove('top');
    title.classList.add('bottom');
    setTimeout(function() {
      frame.src = 'wheelchair.html';
      frame.classList.add('fade-in');
    }, 3000);
  });

  link_links.addEventListener('click', function() {
    clickSound.play();
    frame.classList.remove('fade-in');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_links.classList.add('active');
    currPosition = 5;
    tweenCamera(camera, positions[currPosition], 3000);
    title.classList.remove('top');
    title.classList.add('bottom');
    setTimeout(function() {
      frame.src = 'links.html';
      frame.classList.add('fade-in');
    }, 3000);
  });


  // ----------------- resize function ----------------------
  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.render( scene, camera );
  }
  onResize();
  window.addEventListener( 'resize', onResize );

  // ----------------- tween function ----------------------
  function tweenCamera(camera, position, duration) {        
    new TWEEN.Tween(camera.position).to({
      x: position[0],
      y: position[1],
      z: position[2],
    }, duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
  }

  // マウスイベント
  // document.addEventListener('mousemove', function(event) {
  //   mouseX = (event.clientX-(width/2))*2;
  //   mouseY = (event.clientY-(height/2))*2;   
  // }, false);


};
 
window.addEventListener( 'DOMContentLoaded', main, false );




