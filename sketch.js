//variaveis da bolinha
let xBolinha =400;
let yBolinha=300;
let diametro=20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXbolinha =9;
let velocidadeYbolinha =9;

//raquete 1
let xRaquete =5;
let yRaquete =250;
let raqueteComprimento=10;
let raqueteAltura=90

//Raquete 2
let xRaquete2 =785;
let yRaquete2 =250;
let velocidadeYoponente;
let chanceDeErrar= 0;

let colidiu =false;

//Placar do jogo
let meusPontos =0;
let pontosOponente=0;

//Sons do jogo
let raquetada;
let trilha;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
                    
}


function setup() {
  createCanvas(800, 600);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaRaquete();
  //colisaoRaquete();
  colisaoBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaquete2, yRaquete2);
  movimentaRaqueteOponente();
  colisaoBiblioteca(xRaquete2, yRaquete2);
  placar();
  marcaPonto();
}

function mostraBolinha (){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function colisaoBorda() {
  if (xBolinha + raio> width ||
     xBolinha - raio <0){
    velocidadeXbolinha *=-1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio <0) {
    velocidadeYbolinha *=-1;
  }
}

function mostraRaquete(x, y){
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -=10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete +=10;
  }
    
}

function colisaoRaquete(){
  if(xBolinha -raio < xRaquete +raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXbolinha *=-1
  }
}

function colisaoBiblioteca(x, y){
 colidiu= collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXbolinha *=-1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYoponente = yBolinha-yRaquete2-raqueteComprimento/2-30;
  yRaquete2 +=velocidadeYoponente +chanceDeErrar;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0))
  rect(200, 8, 40, 20);
  fill(255);
  text(meusPontos, 220, 26);
  fill(color(255,140,0))
  rect( 600, 8, 40, 20);
  fill(255);
  text(pontosOponente,620, 26);
}
function marcaPonto(){
  if (xBolinha >790){
    meusPontos +=1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente +=1;
    ponto.play();
  }
}
