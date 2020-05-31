// let es$ = document.querySelector.bind(document);
// let inputValue = document.getElementById("quantidade");

// var x = document.getElementById("myForm").elements.length;
// const { ipcRenderer } = require('electron');

var dataresult = [];
window.onload = function(){}

let linkSobre = document.getElementById("l50");
linkSobre.addEventListener('click', function() {});

// tratamento de click
let linkTwitter = document.querySelector("#link-twitter");

// linkTwitter.addEventListener('click', function () { });
let city , beer, brewery, materialBarril, beerType, payment, quantBarril;

function myDataForm() {
    var exec = document.getElementById("data-form").elements.length;
    
    const saida = "Found " + exec + " elements in "  + " the form.";
    //document.getElementById("demo").innerHTML = saida;
    var nameValue = document.getElementById("nameUser").value;
    var cidadeValue = document.getElementById("cidade").value;
    
    console.log(saida + " teste " + nameValue + " cidade " + cidadeValue);

    // campo payment : cartao : boleto
    // var radioValue = document.getElementsByName("payment");
    this.displayChecked('payment', 'pagamento');

    var txt = "";
    var i;
    for (i = 0; i < exec.length; i++) {
        txt = txt + exec.elements[i].value + "<br>";
    }

    var divs = document.getElementsByClassName("lili");
    // console.info(" divs 01 ", divs);
    // divs = divs.getElementsByTagName("li");
    console.info(" divs 021 ", divs);
    for (i = 0; i < divs.length; i++) {
        if(divs[i].className=="active"){
        var rel = divs[i].attributes.rel.value;
            // alert(rel);            
        }
        if(divs[i].classList[1]=="active"){
            var rel = divs[i].attributes;
            // var rel = divs[i].attributes.rel.value;
                // alert(rel); 
            console.info(" rel 00 ", divs[i].className, " rel ",rel);           
        }
        
    }
    alert("Seu email foi enviado com sucesso, em breve lhe retornaremos.")
}

// Passo Um
function myDataFormOne() {
    var exec = document.getElementById("data-form").elements;
      
    // var divsbeer = document.getElementsByClassName("beertype")[0];
    // divsbeer = divsbeer.getElementsByTagName("li");

    // var divs = document.getElementsByClassName("listado")[0];
    // divs = divs.getElementsByTagName("li");
    // console.info(" divs 023 ", divs[0].innerText, " e o divsbeer", divsbeer[0].innerText);
    // for (i = 0; i < divs.length; i++) {
    //     console.info("campo select: ", divs[i].className);
    //     if(divs[i].className=="active"){
    //     var rel = divs[i].attributes.rel.value;
    //         console.info(" rel 00 ", rel);
    //     }
    // }
    
    // for (i = 0; i < divsbeer.length; i++) {
    //     if(divsbeer[i].className=="active"){
    //     var rel = divsbeer[i].attributes.rel.value;
    //     var rio = divsbeer[i].innerText;
    //         console.info(" rel 00 ", rel, " rio ", rio);
    //     }
    // }

    // campo outra cidade
    var cidadeValue = document.getElementById("cidade").value;

    // this.GetSelectedText();
    // tipo da cerveja
    this.GetSelectedBeer("tipobeer", "tipocerveja");
    // this.GetSelectedBeer("choosetype", "choosetype");

    // localidade da entrega
    this.GetSelectedBeer("listacidades", "local");
    
    // this.GetSelectedValue("cervejatipo", "choosen");
    this.displayChecked('genderS', 'genero');
    
    
    console.log(" execucao ", exec.length, exec.selectedIndex, exec.value, exec.innerHTML);
    var resultForm =  " cidade " + cidadeValue;  
    
    dataresult.push(resultForm);
    console.log("result" , resultForm, " dataresult ", dataresult);
}

// Passo Dois
function myDataFormTwo() {

    // dados pessoais
    var nameValue = document.getElementById("nameUser").value;

    var lastnameValue = document.getElementById("lastnameUser").value;
    
    // campo bairro
    var bairroValue = document.getElementById("bairro").value; 

    // campo cep
    var cepValue = document.getElementById("cep").value;

    // campo rua
    var ruaValue = document.getElementById("rua").value;

    // campo observacoes
    var obsValue = document.getElementById("observacoes").value;
    
    // termos e condicoes
    var termosCondicoes = document.getElementById("termos").checked;
    
    if (!termosCondicoes) {
        alert( " Leia os Termos antes de beber. ");
    }

    var formvalues = [" nome usuario " + nameValue , " last name " + lastnameValue ,
    " bairroValue " + bairroValue , " cepValue " + cepValue ,
    " ruaValue " + ruaValue , " obsValue " + obsValue];
    formvalues.push(this.beer, this.city, this.materialBarril, this.brewery);
    formvalues.push(this.quantBarril, this.payment, this.beerType);
    console.log(formvalues);
    dataresult.push(formvalues);
}

// dataFormBeerType
function dataFormBeerType() {

    // data de entrega requerida
    const dataDe = document.getElementById("dp1");
    const dataAte = document.getElementById("dp2");
    //
    console.info(" dataDe ", dataDe, " dataAte ", dataAte);

    const litro30 = document.getElementById("l30").checked;
    const litro50 = document.getElementById("l50").checked;
    let litroSelect = "";
    litro30 ? litroSelect = "litro30" : litro50 ? litroSelect = "litro50" : '';
    
    // quantidade
    const quant = document.querySelector('#quantidade');
    const quantidade = document.getElementById("quantidade");
    this.quantBarril = quantidade.value;
    // elements.length

    // tipo barriL
    this.displayChecked('kegS', 'theKeg');

    // nome cervejaria
    this.GetSelectedBeer("listabeer", "cervejaria");

    var typevalues = ["quant" + quant, "quantidade" + quantidade, linkSobre, {Barril: litroSelect}];
    dataresult.push(typevalues);
}

// myDataFormBrand
function myDataFormBrand(){

}

function GetSelectedText(){
    var elmnt = document.getElementById("country");
    var result = elmnt.options[elmnt.selectedIndex].text;    
    document.getElementById("result").innerHTML = result;
    console.info(" result : ", result);
}

function GetSelectedValue(id, res){
    var elm = document.getElementById(id);
    // var result = e.options[e.selectedIndex].text;    
    // document.getElementById(res).innerHTML = result;
    this.city = elm.innerText;
    console.info(" cidade : ", this.city, " ref : ", res);
    return elm.innerText;   
}


// Combo Box
function GetSelectedBeer(id, res){
    var elmnt = document.getElementById(id);
    var result = elmnt.options[elmnt.selectedIndex].text;
    dataresult.push(result);
    // document.getElementById(res).innerHTML = result;
    if (res === "tipocerveja"){
        this.beer = result;
    }
    if (res === "local"){
        this.city = result;
    }
    if (res === "cervejaria"){
        this.brewery = result;
    }
    
    console.info(" cerveja : ", result, " res : ", res);
}

// Checkbox
function displayChecked(id, res) {
    var radios = document.getElementsByName(id);

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            // alert(radios[i].value);
            if (res === "theKeg"){
                this.materialBarril = radios[i].value;
            }
            if (res === "genero"){
                this.beerType = radios[i].value;
            }
            if (res === "pagamento"){
                this.payment = radios[i].value;
            }                        
            console.info(" valor checkbox ", radios[i].value, "retorno", res);
            // only one radio can be logically checked, don't check the rest
            dataresult.push(radios[i].value);
            break;
        }
    }
}


// botao de aceite
var windowObjectReference;
var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

function openRequestedPopup() {
  windowObjectReference = window.open("http://www.cnn.com/", "CNN_WindowName", strWindowFeatures);
}