function start() { // Inicio da função start()

	$("#inicio").hide(); //Oculta.Só posso usar esses comandos por causa do jquery.Obs: use jquery.
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    //Esse código a cima cria as divs adicionando um "caminho"


//Principais variáveis do jogo
	
var jogo = {}
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

} // Fim da função loop()

//Função que movimenta o fundo do jogo
	
function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-1); //anda 1px para a esquerda
	
	} // fim da função movefundo()
 //parseInt convertendo string em número

} // Fim da função start
