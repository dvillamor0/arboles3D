function preload() {
  rama = loadModel('assets/uploads_files_3299346_stick.stl');
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight * 0.75,WEBGL);
  canvas.parent("canvas");

  lSystems = [
    new LSystem(
      //axioma
      ["A"],

      //reglas
      {
        "A": "CB",
        "B": "CA",
        "C": "BA",
      },

      //render
      {
        "A": A,
        "B": B,
        "C": C
      }
    ),
    new LSystem(
      //axioma
      ["A"],

      //reglas
      {
        "A": "CB",
        "B": "CA",
        "C": "BA",
      },

      //render
      {
        "A": A,
        "B": B,
        "C": C
      }
    ),
    new LSystem(
      //axioma
      ["D"],

      //reglas
      {
        "A": "CB",
        "B": "CA",
        "C": "BA",
        "D": "ABD"
      },

      //render
      {
        "A": ramaA,
        "B": ramaB,
        "C": ramaC,
      }
    )
  ];

  //console.log(lSystem1.sentence);

  windowResized();
}

function draw() {
  background(100);
  orbitControl();

/*  stroke(255,0,0);
  line(0,0,0,1000,0,0);

  stroke(0,255,0);
  line(0,0,0,0,1000,0);

  stroke(0,0,255);
  line(0,0,0,0,0,1000);
*/
  cambiar(0);
  cambiar(1);
  cambiar(2);

  push();
  translate(-400,0,0);
  lSystems[0].dibujar();
  pop();

  push();
  translate(0,0,0);
  lSystems[1].dibujar();
  pop();

  push();
  translate(400,0,0);
  lSystems[2].dibujar();
  pop();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.75);
}

function A() {
  const puntoFinal = createVector(0, -50, 0);
  line(0,0,0,puntoFinal.x, puntoFinal.y, puntoFinal.z);
  return puntoFinal
}

function B() {
  const puntoFinal = createVector(50, -50, -50);
  line(0,0,0,puntoFinal.x, puntoFinal.y, puntoFinal.z);
  return puntoFinal
}

function C() {
  const puntoFinal = createVector(-50, -50, 50);
  line(0,0,0,puntoFinal.x, puntoFinal.y, puntoFinal.z);
  return puntoFinal
}

function ramaA() {
  push();
  scale(50);
  rotate(1.7,[1,0,0]);
  model(rama);
  pop();
  return createVector(0, -50, 0);
}

function ramaB() {
  push();
  scale(87);
  rotate(1.7,[1,0,0]);
  rotate(1,[1,1,0]);
  model(rama);
  pop();
  return createVector(50, -50, -50);
}

function ramaC() {
  push();
  scale(87);
  rotate(1.7,[1,0,0]);
  rotate(-0.97,[1,1,0]);
  model(rama);
  pop();
  return createVector(-50, -50, 50);
}

function cambiar(i) {
  const escala = document.getElementById(`escala${i+1}`).value;
  const angulo = document.getElementById(`angulo${i+1}`).value;
  const axioma = document.getElementById(`axioma${i+1}`).value;
  const reglas = JSON.parse("{"+document.getElementById(`reglas${i+1}`).value+"}");

  lSystems[i].escala = escala * 0.001;
  lSystems[i].angulo = angulo * 0.01;
  lSystems[i].rules = reglas;
  lSystems[i].sentence = [axioma];
  lSystems[i].generar(6);
}