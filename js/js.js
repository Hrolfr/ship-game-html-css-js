function start() { // Inicio da função start()

	$("#inicio").hide(); //Oculta.Só posso usar esses comandos por causa do jquery.Obs: use jquery.
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>"); 
	//Esse código a cima cria as divs adicionando um "caminho"


//Principais variáveis do jogo
var podeAtirar=true;
var fimdejogo=false; // vai identificar se o jogo finalizou ou não,evitando que objetos sejam recriados quando o jogo estiver finalizado.
var pontos=0;
var salvos=0;
var perdidos=0;
var jogo = {}
var velocidade=5;
var posicaoY = parseInt(Math.random() * 334);
var TECLA = {
	W: 87,
	S: 83,
	D: 68
	}

	jogo.pressionou = []; //valor decimal das teclas	


	//Verifica se o usuário pressionou alguma tecla	
	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
		});
	
	
		$(document).keyup(function(e){
		   jogo.pressionou[e.which] = false;
		});
		//keydown identifica que o user pressionou uma tecla keyup se não pressionou

//Game Loop

jogo.timer = setInterval(loop,30); //30s setInterval é temporizador

function loop() {

movefundo();
movejogador();
moveinimigo1();
moveinimigo2();
moveamigo();
colisao();
placar();

function movejogador() {
	
	if (jogo.pressionou[TECLA.W]) {
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo-10); //topo-10 a nave irá 10 unidades pra cima
	
		if (topo<=0) { //menor igual a 0,ele soma
		
			$("#jogador").css("top",topo+10);
		}

	}
	
	if (jogo.pressionou[TECLA.S]) {
		
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+10);//topo+10 a nave irá 10 unidades pra baixo
	
		if (topo>=434) {	//se tiver o valor maior igual a 434 ele subtrai
			$("#jogador").css("top",topo-10);
				
		}
		

	}
	
	if (jogo.pressionou[TECLA.D]) {
		
		//Chama função Disparo	
		disparo();
	}

	} // fim da função movejogador()

	function moveinimigo1() {

		posicaoX = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left",posicaoX-velocidade);
		$("#inimigo1").css("top",posicaoY);
			
			if (posicaoX<=0) { //menor igual a 0
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
				
			}
	} //Fim da função moveinimigo1()
	
	function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	$("#inimigo2").css("left",posicaoX-3);
				
		if (posicaoX<=0) {
			
		$("#inimigo2").css("left",775);
					
		}
} // Fim da função moveinimigo2()

function moveamigo() {
	
	posicaoX = parseInt($("#amigo").css("left"));
	$("#amigo").css("left",posicaoX+1);
				
		if (posicaoX>906) {
			
		$("#amigo").css("left",0);
					
		}

} // fim da função moveamigo()

function disparo() {
	
	if (podeAtirar==true) {
		
	podeAtirar=false;
	
	topo = parseInt($("#jogador").css("top"))
	posicaoX= parseInt($("#jogador").css("left"))
	tiroX = posicaoX + 190;
	topoTiro=topo+37;
	$("#fundoGame").append("<div id='disparo'></div");
	$("#disparo").css("top",topoTiro);
	$("#disparo").css("left",tiroX);
	
	var tempoDisparo=window.setInterval(executaDisparo, 30);
	
	} //Fecha podeAtirar
 
   	    function executaDisparo() {
	    posicaoX = parseInt($("#disparo").css("left"));
	    $("#disparo").css("left",posicaoX+15); 

        		if (posicaoX>900) {
						
			window.clearInterval(tempoDisparo);
			tempoDisparo=null;
			$("#disparo").remove();
			podeAtirar=true;
					
                   }
	} // Fecha executaDisparo()
} // Fecha disparo()

function colisao() {
	var colisao1 = ($("#jogador").collision($("#inimigo1")));
	var colisao2 = ($("#jogador").collision($("#inimigo2")));
    var colisao3 = ($("#disparo").collision($("#inimigo1")));
    var colisao4 = ($("#disparo").collision($("#inimigo2")));
    var colisao5 = ($("#jogador").collision($("#amigo")));
    var colisao6 = ($("#inimigo2").collision($("#amigo")));
	// jogador com o inimigo1
		
		if (colisao1.length>0) {
			
		inimigo1X = parseInt($("#inimigo1").css("left"));
		inimigo1Y = parseInt($("#inimigo1").css("top"));
		explosao1(inimigo1X,inimigo1Y);
	
		posicaoY = parseInt(Math.random() * 334);
		$("#inimigo1").css("left",694);
		$("#inimigo1").css("top",posicaoY);
		} //Fim da função colisao()
	
// jogador com o inimigo2 
if (colisao2.length>0) {
	
	inimigo2X = parseInt($("#inimigo2").css("left"));
	inimigo2Y = parseInt($("#inimigo2").css("top"));
	explosao2(inimigo2X,inimigo2Y);
			
	$("#inimigo2").remove();
		
	reposicionaInimigo2();
		
	}	

	//Inimigo2 com o amigo
	if (colisao6.length>0) {
	    
		perdidos++;
		amigoX = parseInt($("#amigo").css("left"));
		amigoY = parseInt($("#amigo").css("top"));
		explosao3(amigoX,amigoY);
		$("#amigo").remove();
				
		reposicionaAmigo();
				
		}

// Disparo com o inimigo1
		
if (colisao3.length>0) {
	
	pontos=pontos+100;
	inimigo1X = parseInt($("#inimigo1").css("left"));
	inimigo1Y = parseInt($("#inimigo1").css("top"));
		
	explosao1(inimigo1X,inimigo1Y);
	$("#disparo").css("left",950); //reposicionando o disparo pra ele não caminhar na tela;
		
	posicaoY = parseInt(Math.random() * 334);
	$("#inimigo1").css("left",694);
	$("#inimigo1").css("top",posicaoY);
		
	}
	} 
	
	// Disparo com o inimigo2
		
	if (colisao4.length>0) {
		
		pontos=pontos+50;
		inimigo2X = parseInt($("#inimigo2").css("left"));
		inimigo2Y = parseInt($("#inimigo2").css("top"));
		$("#inimigo2").remove();
	
		explosao2(inimigo2X,inimigo2Y);
		$("#disparo").css("left",950);
		
		reposicionaInimigo2();
			
		}
     // pegando as posições do inimigo 2 e removendo da tela,chamando a explosão 2 e chamando a função reposiciona o inimigo 2.
	 //reposicionando o disparo fora da tela para que ele seja exclu´ddo

  // jogador com o amigo
		
	if (colisao5.length>0) {
		
		salvos++;
		reposicionaAmigo();
		$("#amigo").remove();
		}
     // chama a função e remove o amigo da tela;

	//Fim da função colisao()

//Explosão 1
function explosao1(inimigo1X,inimigo1Y) {
	$("#fundoGame").append("<div id='explosao1'></div");
	$("#explosao1").css("background-image", "url(imgs/explosao.png)");
	var div=$("#explosao1");
	div.css("top", inimigo1Y);
	div.css("left", inimigo1X);
	div.animate({width:200, opacity:0}, "slow");
	
	var tempoExplosao=window.setInterval(removeExplosao, 1000);
	
		function removeExplosao() {
			
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;
			
		}
		
	} // Fim da função explosao1()

	//Reposiciona Inimigo2
	
	function reposicionaInimigo2() {
	
	var tempoColisao4=window.setInterval(reposiciona4, 5000);
		
		function reposiciona4() {
		window.clearInterval(tempoColisao4);
		tempoColisao4=null;
			
			if (fimdejogo==false) {
			
			$("#fundoGame").append("<div id=inimigo2></div");
			
			}
			
		}	//porém so acontece se o fim de jogo for false pq se o jogo acabou,ele não vai recriar o inimigo 2.
	}	
// faz com que o inimigo 2 seja reposicionado  e a animação recomeçada após 5s 
//setInterval função de tempo

//Explosão2
	
function explosao2(inimigo2X,inimigo2Y) {
	
	$("#fundoGame").append("<div id='explosao2'></div");
	$("#explosao2").css("background-image", "url(imgs/explosao.png)");
	var div2=$("#explosao2");
	div2.css("top", inimigo2Y);
	div2.css("left", inimigo2X);
	div2.animate({width:200, opacity:0}, "slow");
	
	var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
	
		function removeExplosao2() {
			
			div2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2=null;
			
		}
		
		
	} // Fim da função explosao2()

//Reposiciona Amigo
	
function reposicionaAmigo() {
	
	var tempoAmigo=window.setInterval(reposiciona6, 6000);
	
		function reposiciona6() {
		window.clearInterval(tempoAmigo);
		tempoAmigo=null;
		
		if (fimdejogo==false) {
		
		$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
		
		}
		
	}
	
//Explosão3
	
function explosao3(amigoX,amigoY) {
	$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
	$("#explosao3").css("top",amigoY);
	$("#explosao3").css("left",amigoX);
	var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
	function resetaExplosao3() {
	$("#explosao3").remove();
	window.clearInterval(tempoExplosao3);
	tempoExplosao3=null;
			
	}
	
	} // Fim da função explosao3
	

   //vai recriar o amigo na tela se o jogo não chegou ao final e na colisão do jogador com o amigo,ele aparecerá depois de 6s.

   function placar() {
	
	$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
	
} //fim da função placar()




} // Fim da função reposicionaAmigo()

} // Fim da função loop()

//Função que movimenta o fundo do jogo
	
function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-1); //anda 1px para a esquerda
	
	} // fim da função movefundo()
 //parseInt convertendo string em número

} // Fim da função start
