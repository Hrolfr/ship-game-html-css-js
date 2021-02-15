function start() { // Inicio da função start()

	$("#inicio").hide(); //Oculta.Só posso usar esses comandos por causa do jquery.Obs: use jquery.
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    //Esse código a cima cria as divs adicionando um "caminho"


//Principais variáveis do jogo
	
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

} // Fim da função loop()

//Função que movimenta o fundo do jogo
	
function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-1); //anda 1px para a esquerda
	
	} // fim da função movefundo()
 //parseInt convertendo string em número

} // Fim da função start
