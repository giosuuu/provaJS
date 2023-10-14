"use strict"

let ripetizioni=0;
let _refInterval;
let colors = ["bg-warning", "bg-success", "bg-primary", "bg-danger"];
let marche =["Fiat", "Renault", "Ford", "Peugeot"];

window.onload = function (){
    //region Generazione wrapper superiore
    let wrapperVal=document.createElement("div");
    wrapperVal.id="wrapperVal";
    wrapperVal.classList.add("mx-auto", "bg-light");
    document.getElementsByTagName("body")[0].append(wrapperVal);

    let wrapper=document.createElement("div");
    wrapper.id="wrapper";
    wrapper.classList.add("mx-auto");
    document.getElementsByTagName("body")[0].append(wrapper);

    let rowVal=document.createElement("div");
    rowVal.classList.add("row")
    wrapperVal.append(rowVal);

    let numMarca = document.createElement("div");
    numMarca.classList.add("col-sm-6");
    rowVal.append(numMarca);

    let numVal = document.createElement("div");
    numVal.classList.add("col-sm-6");
    rowVal.append(numVal);

    let labelMarca=document.createElement("h3");
    labelMarca.innerText="Marca automobili:";
    numMarca.append(labelMarca);

    let labelVal=document.createElement("h3");
    labelVal.innerText="Auto vendute:";
    numVal.append(labelVal);

    let simboloMarca = document.createElement("div");
    simboloMarca.id="divMarca";
    simboloMarca.classList.add("simboli");
    numMarca.append(simboloMarca);

    let simboloVal = document.createElement("div");
    simboloVal.id="divValue";
    simboloVal.classList.add("simboli");
    numVal.append(simboloVal);
    //endregion

    //region Generazione grafico
    let rowGrafico=document.createElement("div");
    for(let i=0; i<4; i++){
        let divG = document.createElement("div");
        divG.id=marche[i];
        divG.innerText=marche[i];
        divG.style.border="1px solid black";
        divG.style.width="248px";
        divG.style.height="30px";

        divG.style.textAlign="center";
        divG.style.lineHeight="30px";
        divG.style.fontSize="20pt";
        divG.style.fontWeight="bold";

        divG.style.bottom="0px";
        divG.style.display="inline-block";
        divG.style.position="absolute";
        divG.style.left=250*i + "px";

        divG.classList.add(colors[i]);
        divG.addEventListener("mouseover", function (){
            showValue(this);
        })
        divG.addEventListener("mouseout", function (){
            hideValue();
        })
        wrapper.append(divG);
    }
    //endregion

    //region Generazione Button e Alert
    let btnGioca = document.createElement("button");
    btnGioca.classList.add("btn" , "btn-success");
    btnGioca.id="btnGioca";
    btnGioca.innerText="START - ANALISI VENDITE";
    btnGioca.addEventListener("click", gioca);
    document.getElementsByTagName("body")[0].append(btnGioca);

    let divRis=document.createElement("div");
    divRis.id="divRis";
    divRis.classList.add("mx-auto");
    divRis.style.visibility="hidden";
    document.getElementsByTagName("body")[0].append(divRis);
    //endregion
}

function showValue(div){
    document.getElementById("divRis").innerText=div.innerText;
    document.getElementById("divRis").style.visibility="visible";
}

function hideValue(){
    document.getElementById("divRis").innerText="";
    document.getElementById("divRis").style.visibility="hidden";
}

function gioca(){
    ripetizioni=0;
    _refInterval=setInterval(genera, 100);
}

function genera(){
    if(ripetizioni<10)
    {
        document.getElementById("divMarca").innerText=marche[Math.floor(4*Math.random())];
        document.getElementById("divValue").innerText=Math.floor(Math.random()*50+1);
        ripetizioni++;
    }
    else
    {
        clearInterval(_refInterval);
        document.getElementById(document.getElementById("divMarca").innerText).style.height=parseInt(document.getElementById(document.getElementById("divMarca").innerText).style.height) + parseInt(document.getElementById("divValue").innerText) + "px";
        document.getElementById(document.getElementById("divMarca").innerText).innerText=document.getElementById("divMarca").innerText + " - " + document.getElementById(document.getElementById("divMarca").innerText).style.height.split("px")[0];

        let marcaVincente=controllaVendite();
        if(marcaVincente!="")
        {
            document.getElementById("divRis").innerHTML = "La migliore casa automobilistica è: " + marcaVincente;
            document.getElementById("divRis").style.visibility = "visible";
        }
        else
            setTimeout(gioca,100);
    }
}

function controllaVendite(){
    let marca="";
    let max=0;
    for(let i=0;i<4;i++)
    {
        console.log(parseInt(document.getElementById(marche[i]).style.height.split("px")[0]))
        console.log(marche[i]);
        if(parseInt(document.getElementById(marche[i]).style.height.split("px")[0])>300 && parseInt(document.getElementById(marche[i]).style.height.split("px")[0])>max)
        {
            max=parseInt(document.getElementById(marche[i]).style.height.split("px")[0]);
            marca = marche[i];
        }
    }
    return marca;
}