function start() { // Inicio da função start()

	$("#inicio").hide(); //Oculta.Só posso usar esses comandos por causa do jquery.Obs: use jquery.
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    //Esse código a cima cria as divs adicionando um "caminho"
} // Fim da função start

//Principais variáveis do jogo
	
var jogo = {}
	
//Game Loop

jogo.timer = setInterval(loop,30); //30s setInterval é temporizador

function loop() {

movefundo();

} // Fim da função loop()



