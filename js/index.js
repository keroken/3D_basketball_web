// ----------------- main function ----------------------
const main = function () {
  const scene = new THREE.Scene();

  // ----------------- variables ----------------------
  let mouseX, mouseY;
  const width  = window.innerWidth;
  const height = window.innerHeight;


  // ----------------- sound ----------------------
  const clickSound = new Audio();
  clickSound.src = 'https://keroken.com/3d_basketball/sounds/digital_beep_003.mp3';
  clickSound.volume = 0.6;
  clickSound.autoplay = false;
  clickSound.preload = true;
  

  // ----------------- camera settings ----------------------
  const fov    = 60;
  const aspect = width / height;
  const near   = 1;
  const far    = 100000;
  const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set( 680, 500, 2500 );
  camera.lookAt(0,1200,0);

  const cam_positions = [
    [680, 500, 2500],
    [-5100, 850, -4400],
    [2000, 20000, 0],
    [0, 1800, 3000],
    [820, 950, -1000],
    [-300, -500, 50]
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
  const plane = new THREE.PlaneGeometry( 16000, 28000, 150, 280 );
  const textureLoader = new THREE.TextureLoader();
  const texture1 = textureLoader.load( "textures/color_floor_01.png" );
  const material1 = new THREE.MeshPhongMaterial( { map: texture1, wireframe: true } );
  const floor = new THREE.Mesh( plane, material1 );
  floor.rotation.x = -Math.PI/2;
  floor.position.y = 0;
  // floor.__dirtyRotation = true;
  scene.add( floor );

  

  // ----------------- load wheelchairs ----------------------
  const NUM = 5;
  
  let objmodel = [];
  let obj = [];

  for (let i=0; i<NUM; i++) {
    obj[i] = new THREE.Object3D;
  }
  
  // instantiate a loader
  const loader = new THREE.OBJLoader();
  // load a resource
  loader.load(
    // resource URL
    'models/wheelchair_01.obj',
    // called when resource is loaded
    function ( object ) {
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.wireframe = true;
          child.material.color.set(0x6565bf);
        }
      });
      object.scale.set(1000,1000,1000);

      for (let i=0; i<NUM; i++) {
        objmodel[i] = object.clone();
        obj[i].add(objmodel[i]);
        scene.add(obj[i]);

      }
    }
  );

  // ---------------- load wheelchair2 --------------------
  // let objmodel_wheelchair;
  // let obj_wheelchair;

  // const fbx_loader = new THREE.FBXLoader();
  // fbx_loader.load( 'models/sport_wheelchair_02b.FBX', function ( object ) {

  //   // mixer = new THREE.AnimationMixer( object );

  //   // var action = mixer.clipAction( object.animations[ 0 ] );
  //   // action.play();

  //   object.traverse( function ( child ) {
  //     if ( child.isMesh ) {
  //       child.castShadow = true;
  //       child.receiveShadow = true;
  //     }
  //   });

  //   object.scale.set(1000,1000,1000);


  //   objmodel_wheelchair = object.clone();
  //   obj_wheelchair.add(objmodel_wheelchair);
  //   scene.add(obj_wheelchair);

  //   obj_wheelchair.position.set(0,0,0);

  // });


  const wc_position = [
    [0,0,0],
    [2000,0,-2000],
    [-2000,0,-2000],
    [4000,0,-4000],
    [-4000,0,-4000]
  ];

  for (let i=0; i<NUM; i++) {
    obj[i].position.x = wc_position[i][0];
    obj[i].position.y = wc_position[i][1];
    obj[i].position.z = wc_position[i][2];
  }

  // ----------------- load player ----------------------
  let objmodel_player = [];
  let obj_player = [];

  for (let i=0; i<NUM; i++) {
    obj_player[i] = new THREE.Object3D;
  }
  
  // load a resource
  loader.load(
    // resource URL
    'models/player_01.obj',
    // called when resource is loaded
    function ( object ) {
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.wireframe = true;
          child.material.color.set(0x6565bf);
        }
      });
      object.scale.set(1000,1000,1000);

      for (let i=0; i<NUM; i++) {
        objmodel_player[i] = object.clone();
        obj_player[i].add(objmodel_player[i]);
        scene.add(obj_player[i]);

      }
    }
  );

  for (let i=0; i<NUM; i++) {
    obj_player[i].position.x = wc_position[i][0];
    obj_player[i].position.y = wc_position[i][1];
    obj_player[i].position.z = wc_position[i][2];
  }
  

  // ----------------- load goalpost ----------------------
  let objmodel_post;
  let objmodel_post2;
  let obj_post;
  let obj_post2;

  obj_post = new THREE.Object3D;
  obj_post2 = new THREE.Object3D;

  loader.load(
    // resource URL
    'models/basketball_goalpost.obj',
    // called when resource is loaded
    function ( object ) {
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.wireframe = true;
          child.material.color.set(0x6565bf);
        }
      });
      object.scale.set(1000,1000,1000);

      objmodel_post = object.clone();
      objmodel_post2 = object.clone();
      obj_post.add(objmodel_post);
      obj_post2.add(objmodel_post2);
      scene.add(obj_post, obj_post2);

    }
  );

  obj_post.rotation.y = -Math.PI/2;
  obj_post.position.set(0,0,-15000);

  obj_post2.rotation.y = Math.PI/2;
  obj_post2.position.set(0,0,15000);


  // ----------------- load court ----------------------
  let objmodel_court;
  let obj_court;

  obj_court = new THREE.Object3D;

  loader.load(
    // resource URL
    'models/court_floor_01.obj',
    // called when resource is loaded
    function ( object ) {
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.wireframe = true;
          child.material.color.set(0xffffff);
        }
      });
      object.scale.set(1000,1000,1000);

      objmodel_court = object.clone();
      obj_court.add(objmodel_court);
      scene.add(obj_court);

    }
  );

  obj_court.rotation.y = -Math.PI/2;
  // obj_court.position.set(0,0,-14000);

  // ----------------- load ball ----------------------
  let objmodel_ball;
  let obj_ball;

  obj_ball = new THREE.Object3D;

  loader.load(
    // resource URL
    'models/basketball.obj',
    // called when resource is loaded
    function ( object ) {
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshPhongMaterial;
          child.material.wireframe = true;
          child.material.color.set(0x6565bf);
        }
      });
      object.scale.set(1000,1000,1000);

      objmodel_ball = object.clone();
      obj_ball.add(objmodel_ball);
      scene.add(obj_ball);

    }
  );

  // obj_ball.rotation.y = Math.PI/2;
  obj_ball.position.set(0,0,0);



  // ----------------- camera controls ----------------------
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.enableZoom = true;
  // controls.autoRotate = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.target.set(0, 800, 0);
  


  // ----------------- animate loop ----------------------
  let stop_motion = false;
  let moveDeg = .01;

  animate();

  function animate() {
    requestAnimationFrame( animate );

    if (stop_motion) {
      moveDeg = 0;
    } else {
      moveDeg = .01;
    }

    obj[0].rotation.set(0, obj[0].rotation.y + moveDeg, 0);
    obj[1].rotation.set(0, obj[0].rotation.y + moveDeg, 0);
    obj[2].rotation.set(0, obj[0].rotation.y + moveDeg, 0);
    obj[3].rotation.set(0, obj[0].rotation.y + moveDeg, 0);
    obj[4].rotation.set(0, obj[0].rotation.y + moveDeg, 0);

    obj_player[0].rotation.set(0, obj[0].rotation.y + moveDeg, 0);
    obj_player[1].rotation.set(0, obj[0].rotation.y + moveDeg, 0);
    obj_player[2].rotation.set(0, obj[0].rotation.y + moveDeg, 0);
    obj_player[3].rotation.set(0, obj[0].rotation.y + moveDeg, 0);
    obj_player[4].rotation.set(0, obj[0].rotation.y + moveDeg, 0);

    obj_ball.rotation.set(0, obj[0].rotation.y + moveDeg, 0);

    
    TWEEN.update();

    controls.update();
    console.log('x:' + camera.position.x + ', y:' + camera.position.y + ', z:' + camera.position.z);

    renderer.render( scene, camera );
  };

  

  // ----------------- title ----------------------
  const title = document.getElementById('title');
  title.classList.add('top');



  // ----------------- iframe ----------------------
  const frame_container = document.getElementById('frame-container');
  const frame = document.getElementById('frame');
  setTimeout(function() {
    frame.src = 'home.html';
    frame_container.classList.add('fade-in');
  }, 2000);

  // ------------------ close btn ----------------------
  const close_btn = document.getElementById('close');
  close_btn.classList.add('no_show');

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
    stop_motion = false;
    close_btn.classList.add('no_show');
    frame_container.classList.remove('fade-in');
    hamburger_btn.classList.remove('is_active');
    global_nav.classList.remove('is_active');
    

    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_home.classList.add('active');
    controls.target.set(0, 800, 0);
    currPosition = 0;
    tweenCamera(camera, cam_positions[currPosition], 3000);
    title.classList.remove('bottom');
    title.classList.add('top');
    
    setTimeout(function() {
      frame.src = 'home.html';
      frame_container.classList.add('fade-in');
    }, 3000);
  });

  link_history.addEventListener('click', function() {
    clickSound.play();
    stop_motion = false;
    close_btn.classList.remove('no_show');
    frame_container.classList.remove('fade-in');
    hamburger_btn.classList.remove('is_active');
    global_nav.classList.remove('is_active');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_history.classList.add('active');
    controls.target.set(0, 800, 0);
    currPosition = 1;
    tweenCamera(camera, cam_positions[currPosition], 3000);
    title.classList.remove('top');
    title.classList.add('bottom');
    
    setTimeout(function() {
      frame.src = 'history.html';
      frame_container.classList.add('fade-in');
    }, 3000);

  });

  link_rules.addEventListener('click', function() {
    clickSound.play();
    stop_motion = false;
    close_btn.classList.remove('no_show');
    frame_container.classList.remove('fade-in');
    hamburger_btn.classList.remove('is_active');
    global_nav.classList.remove('is_active');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_rules.classList.add('active');
    controls.target.set(0, 800, 0);
    currPosition = 2;
    tweenCamera(camera, cam_positions[currPosition], 3000);
    title.classList.remove('top');
    title.classList.add('bottom');

    setTimeout(function() {
      frame.src = 'rules.html';
      frame_container.classList.add('fade-in');
    }, 3000);
  });
  
  link_players.addEventListener('click', function() {
    clickSound.play();
    stop_motion = false;
    close_btn.classList.remove('no_show');
    frame_container.classList.remove('fade-in');
    hamburger_btn.classList.remove('is_active');
    global_nav.classList.remove('is_active');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_players.classList.add('active');
    controls.target.set(0, 800, 0);
    currPosition = 3;
    tweenCamera(camera, cam_positions[currPosition], 3000);
    title.classList.remove('top');
    title.classList.add('bottom');
    setTimeout(function() {
      frame.src = 'players.html';
      frame_container.classList.add('fade-in');
    }, 3000);
  });
  
  link_wheelchair.addEventListener('click', function() {
    clickSound.play();
    stop_motion = true;
    obj_player[0].visible = false;
    obj_ball.visible = false;
    obj[0].rotation.y = -Math.PI/2;
    close_btn.classList.remove('no_show');
    frame_container.classList.remove('fade-in');
    hamburger_btn.classList.remove('is_active');
    global_nav.classList.remove('is_active');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_wheelchair.classList.add('active');
    controls.target.set(0, 400, 0);
    currPosition = 4;
    tweenCamera(camera, cam_positions[currPosition], 3000);
    title.classList.remove('top');
    title.classList.add('bottom');
    setTimeout(function() {
      frame.src = 'wheelchair.html';
      frame_container.classList.add('fade-in');
    }, 3000);
  });

  link_links.addEventListener('click', function() {
    clickSound.play();
    stop_motion = false;
    close_btn.classList.remove('no_show');
    frame_container.classList.remove('fade-in');
    hamburger_btn.classList.remove('is_active');
    global_nav.classList.remove('is_active');
    for (i = 0; i < gnav.length; i++) {
      gnav[i].classList.remove('active');
    }
    link_links.classList.add('active');
    controls.target.set(0, 800, 0);
    currPosition = 5;
    tweenCamera(camera, cam_positions[currPosition], 3000);
    title.classList.remove('top');
    title.classList.add('bottom');
    setTimeout(function() {
      frame.src = 'links.html';
      frame_container.classList.add('fade-in');
    }, 3000);
  });

  // ----------------- hamburger menu -----------------------
  const hamburger_btn = document.getElementById('btn');
  const global_nav = document.getElementById('global-nav');
  if (width < 768) {
    hamburger_btn.classList.remove('is_active');
  }
  hamburger_btn.addEventListener('click', function() {
    if (this.classList.contains('is_active')) {
      this.classList.remove('is_active');
      global_nav.classList.remove('is_active');
    } else {
      this.classList.add('is_active');
      global_nav.classList.add('is_active');
    }
  });


  // ----------------- resize function ----------------------
  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width < 768) {
      hamburger_btn.classList.remove('is_active');
      global_nav.classList.remove('is_active');
    }

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




