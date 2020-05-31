function executa(event) {

	event.preventDefault();

	limparResultados();
	var valores 	 = pegaValoresDoForm();

    var resultados 	 = executaRegex(valores);
    
    imprimeResultadoNoInput(resultados);
    highlightResultados(resultados, valores.target);
}


function executaRegex(valores) {

	var textoPattern = valores.pattern; //montaPatternDeDataMaisLegivel();
	var textoTarget  = valores.target;
	var mostraIndex  = valores.mostraIndex;
	var mostraGrupos = valores.mostraGrupos;

	var resultados	 = [];
    var resultado 	 = null;


	var objetoRegex  = new RegExp(textoPattern, 'g');

	while (resultado = objetoRegex.exec(textoTarget)) {

		if(resultado[0] === "") {
			throw Error("Regex retornou valor vazio.");
		}

		console.log("Resultado: " + resultado[0]);

		resultados.push(geraResultado(mostraGrupos ? resultado.join(' ||| ') : resultado[0], resultado.index, objetoRegex.lastIndex, mostraIndex));
	}


	logaTempoDeExecucao(textoPattern, textoTarget);

	return resultados;
}


function geraResultado(resultado, index, lastIndex, mostraIndex) {

	var textoIndex = mostraIndex ? " [" + index + "-" + lastIndex+ "]" : ""

	return {
		'resultado': resultado + textoIndex,
		'index': index,
		'lastIndex': lastIndex
	};
}


function logaTempoDeExecucao(textoPattern, textoTarget) {
	var pObjetoRegex  = new RegExp(textoPattern, 'g');
    var ini = performance.now();
    pObjetoRegex.test(textoTarget)
	var fim =  performance.now();
	console.log("Tempo de execução (ms) " + (fim-ini));
}

function imprimeResultadoNoInput(resultados) {
	var inputResultado 	= document.querySelector('#resultado');
	var labelResultado 	= document.querySelector('#labelResultados');

    labelResultado.innerHTML = (resultados.length) + " Matches (resultados)";

	var resultadosComoArray = resultados.map(function(item){ 
		return item.resultado;
	});
	
	labelResultado.innerHTML = (resultadosComoArray.length) + " Matches (resultados)";

    if(resultadosComoArray.length > 0) {
    	inputResultado.value = resultadosComoArray.join(' | ');
    	inputResultado.style.borderStyle = 'solid';
    	inputResultado.style.borderColor = 'lime';//verde
    } else {
    	inputResultado.placeholder = 'Sem matches (resultados)';
    	inputResultado.value = '';
    	inputResultado.style.borderStyle = 'solid';
    	inputResultado.style.borderColor = 'red';
    }
}


function highlightResultados(resultados, texto) {	
	var item = null;
	var indexBegin = 0;
	var conteudo = "";

	while((item = resultados.shift()) != null) {
		conteudo += semHighlight(escapeHtml(texto.substring(indexBegin, item.index)));
		conteudo += comHighlight(escapeHtml(texto.substring(item.index, item.lastIndex)));
		indexBegin = item.lastIndex;
	}

	//sobrou algum texto?
	if((texto.length - indexBegin) > 0) {
		conteudo += semHighlight(escapeHtml(texto.substring(indexBegin, texto.length)));
	}
	
	document.querySelector("#highlightText").innerHTML = conteudo;
}

function semHighlight(texto) {
	return texto;
	//return "<s>" + texto + "</s>";
}

function comHighlight(texto) {
	return "<span class='bg-primary'>" + texto + "</span>";
}

function escapeHtml( string ) {
     return string.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}	


function pegaValoresDoForm() {

	var inputTarget 	= document.querySelector('#target');
	var inputPattern 	= document.querySelector('#pattern')
	inputPattern.focus();

	var checkboxIndex 	= document.querySelector('#mostraIndex');
	var checkboxGroups 	= document.querySelector('#mostraGrupos');

  	_verifiqueInputs(inputTarget, inputPattern);

  	console.log('Target:  ' + inputTarget.value);
  	console.log('Pattern: ' + inputPattern.value.trim());

  	return {'target': inputTarget.value.trim(), 
  			'pattern': inputPattern.value, 
  			'mostraIndex': checkboxIndex.checked, 
  			'mostraGrupos' : checkboxGroups.checked};
}

function _verifiqueInputs(inputTarget, inputPattern) {
	if(!inputTarget.value) {
		inputTarget.placeholder = 'Digite um target';
	}

	if(!inputPattern.value) {
		inputPattern.placeholder = 'Digite um pattern';
	}

	if(!inputTarget.value || !inputPattern.value) {
		throw Error('Valores invalidos');
	}
}

function limparResultados() {
	console.clear();
	document.querySelector('#labelResultados').innerHTML = '0 Matches (resultados)';
	document.querySelector('#resultado').value = '';
	document.querySelector('#resultado').placeholder = 'sem resultado';
	document.querySelector("#highlightText").innerHTML = '<em>sem resultado</em>';

}

function montaPatternDeDataMaisLegivel() {

	var DIA  = "[0123]?\\d";
	var _DE_ = "\\s+(de )?\\s*";
	var MES  = "[A-Za-z][a-zç]{3,8}";
	var ANO  = "[12]\\d{3}";
	return DIA + _DE_ +  MES + _DE_ + ANO;  

}


/// exemplos de regex
/**
 *
 * CPF COM GRUPO DIGITO VERIFICADOR:
	111.222.333-96
	Expressão Regular:
		\d{3}[-.]?\d{3}[.-]?\d{3}[.-]?(\d{2})

MENSSAGEM CRIPTOGRAFADA
	Z171PZ7AZ23PZ7819AZ78GZ1AZ99IZ34O
	Expressão Regular:
		Z\d+(\w)

EXCEPTION:
	Caused by: com.mysql.jdbc.exceptions.jdbc4.CommunicationsException: Communications link failure
	Expressão Regular:
		(Caused[\s\w:.-]+):([\w\s]+)

EMAIL ALURA:
	super.mario@caelum.com.br
	Expressão Regular:
		([a-z.]{4,14}[a-z\d])@(?:caelum.com.br|alura.com.br)
		([a-z.]{4,14}[a-z\d])@(?:com.br)

QUALQUER EMAIL:
	TEAM.donkey-kong@MARIO.kart1.nintendo.com	
	Expressão Regular:
		^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$

CORREIOS:
	Nico Steppat|14/05/1977|Rua Buarque de Macedo|50|22222-222|Rio de Janeiro
	Expressão Regular:
		([\w\s]+)\|(?:\d\d\/\d\d\/\d\d\d\d)\|([\w\s]+)\|(\d{1,4})\|(\d{5}-\d{3})\|(?:[\w\s]{10,})
CEP - ^\d{5}(?:[-\s]\d{3})?$
// https://regexr.com/
// pattern="[A-Za-z0-9]+"
// pattern="[A-Za-z]{3}"
		**
		*/