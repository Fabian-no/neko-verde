
/* ----- puzzle - 16 piezas ----- */

/* --- IDIOMS --- */
var Textos = {
  en: {
    CF_nR: "<h2>Floting Thing </h2><span>4x4 - no rotation</span>",
    CF_R: "<h2>Floting Thing </h2><span>4x4 - rotate 180º</span>",

    FS_nR: "<h2>Frog on the Street </h2><span>4x4 - no rotation</span>",
    FS_R: "<h2>Frog on the Street </h2><span>4x4 - rotate 180º</span>",

    BI_nR: "<h2>Inflatable Whale </h2><span>4x4 - no rotation</span>",
    BI_R: "<h2>Inflatable Whale </h2><span>4x4 - rotate 180º</span>",

    TS_nR: "<h2>Rag in the Sun </h2><span>4x4 - no rotation</span>",
    TS_R: "<h2>Rag in the Sun </h2><span>4x4 - rotate 180º</span>",
  },
  es: {
    CF_nR: "<h2>Coso Flotante </h2><span>4x4 - sin rotación</span>",
    CF_R: "<h2>Coso Flotante </h2><span>4x4 - rotación 180º</span>",

    FS_nR: "<h2>Rana en la Calle </h2><span>4x4 - sin rotación</span>",
    FS_R: "<h2>Rana en la Calle </h2><span>4x4 - rotación 180º</span>",

    BI_nR: "<h2>Ballena Inflable </h2><span>4x4 - sin rotación</span>",
    BI_R: "<h2>Ballena Inflable </h2><span>4x4 - rotación 180º</span>",

    TS_nR: "<h2>Trapo al Sol </h2><span>4x4 - sin rotación</span>",
    TS_R: "<h2>Trapo al Sol </h2><span>4x4 - rotación 180º</span>",
  }
}
    
/* setIdioma() */
const ArrTXT = document.getElementsByClassName("TXT");
const setIdioma = idioma =>{
  for(let k=0; k<ArrTXT.length; k++){
    let data_TXT = ArrTXT[k].getAttribute("data-TXT");
    $(ArrTXT[k]).html(Textos[idioma][data_TXT]);
  }
}
/* setLinks() */  
const ArrLinks = document.getElementsByTagName("a");
const setLinks = idioma =>{
  for(let k=0; k<ArrLinks.length; k++){
    let hRef = ArrLinks[k].getAttribute("href");
    ArrLinks[k].setAttribute("href", hRef+"?"+idioma);
  }
}
/* getUrl() */
const getUrl = () => {
  return window.location.search.substring(1);
}
setIdioma(getUrl());
setLinks(getUrl());




/*ContP - height*/
  var ContH_Hght= parseInt($('#ContH').css('height'));
  if($(window).width() >= 959){
    $('#ContP').css('height', ContH_Hght+40+"px");
  }else{
    $('#ContP').css('height', "initial");
  }
  $(window).on('resize', function(){
    if($(window).width() >=959){
      ContH_Hght= parseInt($('#ContH').css('height'));
      $('#ContP').css('height', ContH_Hght+40+"px");
    }else{
      $('#ContP').css('height', "initial");
    }
  });

/* Agrandar Piezas */
  $('.lupa').on('click', function(){
    if(Completado != true){
      $('#ContP').toggleClass('ContP-BIG');
      $('.pieza').toggleClass('pieza-BIG');
      $('#ContH').toggleClass('ContH-BIG');
      $('#Caja-P').toggleClass('Caja-P-BIG');
      $('.lupa').toggleClass('lupa_ON');
    }
  });




/* -- Variables -- */
  var ContPuzzle = document.getElementById("ContPuzzle");
  var ContH = document.getElementById("ContH");
  var CajaP = document.getElementById("Caja-P");
  var ContP = document.getElementById("ContP"); 
  /* Arrays... */
  var Piezas = document.getElementsByClassName("pieza");
  var Huecos = document.getElementsByClassName("hueco");
  var HuecoSel;
  var h2 = document.getElementById("h2");
  var h2SpanText = h2.children[1].innerText;

/* Piezas - random order */
  min = 0;
  max = 100;
  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }
  for(var j = 0; j< Piezas.length;j++){
    getRandomInt();
    var numRandom = Math.floor(Math.random() * (max - min)) + min;
  /*orden*/
    Piezas[j].style.order = numRandom;
  /*rotacion*/
    if(h2SpanText.includes("180")){
      if(numRandom%2 == 0){
        Piezas[j].firstElementChild.style.transform = "rotate(180deg)";
      }else{
        Piezas[j].firstElementChild.style.transform = "rotate(0deg)";
      }
    }
  }


/* COMO COMPLETAR EL PUZZLE */

var CLICK_ON;

// if(window.innerWidth < 959){
//   CLICK_ON = true;
// }else{
//   CLICK_ON = false;
// }

if(Modernizr.touchevents){
  CLICK_ON = true;
  // console.log("supported");
  // supported
}else{
  CLICK_ON = false;
  // console.log("not-supported");
  // not-supported
}

/* --- CLICK_ON --- */
var PSelect;
if(CLICK_ON == true){
  /*Pillar Pieza*/
  for(var k=0; k<Piezas.length; k++){
    Piezas[k].addEventListener("click", function(){
      if(Completado != true){
        if(PSelect == undefined){/*Pieza no seleccionada */
          PSelect = this;
          $(PSelect).addClass("Pselect");
          $(PSelect).children(".botRotate").fadeIn(100);
        }

        else if(PSelect == this){/*Click misma pieza */
          $(PSelect).removeClass("Pselect");
          $(PSelect).children(".botRotate").fadeOut(100);
          PSelect = undefined;
        }
        
        else{/*Click OTRA pieza */
          if(this.parentNode.classList != "hueco"){/*la otra en ContP*/
            $(PSelect).removeClass("Pselect");
            $(PSelect).children(".botRotate").fadeOut(100);
            PSelect = this;
            $(PSelect).addClass("Pselect");
            $(PSelect).children(".botRotate").fadeIn(100);
          }
          else{/*la otra en hueco*/
            if(this.parentNode.length != 0){
              ContP.appendChild(this);
              $(PSelect).removeClass("Pselect");
              $(PSelect).children(".botRotate").fadeOut(100);
              this.appendChild(PSelect); 
            }
          }
        }
      }  
    });
  }
  /* Dejar Pieza */  
  for(i=0; i<Huecos.length; i++){
    Huecos[i].addEventListener("click", function(){
      if(this.children.length == 0){/*hueco vacío*/
        if(PSelect != undefined){
          $(PSelect).removeClass("Pselect");
          $(PSelect).children(".botRotate").fadeOut(100);
          this.appendChild(PSelect);
          PSelect = undefined;
        }  
      }else{/*hueco lleno*/}

      if(h2SpanText == "4x4 - rotación 180º"){
        comprobar180();
      }else{
        comprobar();
      }  
    });
  }
  /*Soltar en Contenedor Piezas*/
  ContP.addEventListener("click", function(){
    if(PSelect != undefined && PSelect.parentNode.classList == "hueco"){
      this.appendChild(PSelect);
      $(PSelect).removeClass("Pselect");
      $(PSelect).children(".botRotate").fadeOut(100);
      PSelect = undefined;
    }
  });
}




/* --- DRAG N` DROP --- */
else if(CLICK_ON == false){
  /*funciones*/ 
  function arrastrar(ev){
    ev.dataTransfer.setData("text", ev.target.id);
  }
  function permitirSoltar(ev){
    ev.preventDefault();
  }
  function soltar(ev){
    var idSoltado = ev.dataTransfer.getData("text");
    var elemSoltado = document.getElementById(idSoltado);
    HuecoSel.appendChild(elemSoltado);
    if(h2SpanText == "4x4 - rotación 180º"){
      comprobar180();
    }else{
      comprobar();
    }  
    ev.preventDefault();
  }
  function soltarEnContP(ev){
    var idSoltado = ev.dataTransfer.getData("text");
    var elemSoltado = document.getElementById(idSoltado);
    ContP.appendChild(elemSoltado);
    ev.preventDefault();
  }
/*eventos*/
/*Arrastrar Pieza*/
  for(var k=0; k<Piezas.length; k++){
    Piezas[k].addEventListener("dragstart", function(ev){
      if(Completado != true) arrastrar(ev);
    });
  }
/*Soltar en Hueco*/
  for(var i=0; i<Huecos.length; i++){
    Huecos[i].addEventListener("dragover", function(ev){
      if(Completado != true){
        permitirSoltar(ev);
        HuecoSel = this;
      }
    });
  }
  for(i=0; i<Huecos.length; i++){
    Huecos[i].addEventListener("drop", function(ev){
      if(Completado != true){
        if(this.children.length !== 0){
          ContP.appendChild(this.firstElementChild);
        }
        soltar(ev); 
      }
    });
  }
/*Soltar en Contenedor letras*/
  CajaP.addEventListener("dragover", function(ev){
    permitirSoltar(ev); 
  });
  CajaP.addEventListener("drop", function(ev){
    soltarEnContP(ev);   
  });
}



/* COMPROBACIÓN */

/*comprobar pre*/
  var cad_H = "";
  for(var i=0; i < Huecos.length; i++){
    cad_H += Huecos[i].getAttribute("data-pzz");
  }
/* comprobar()*/  
  function comprobar(){
    var cad_PinH = "";
    for(var i=0; i < Huecos.length; i++){
      if(Huecos[i].firstElementChild !== null){
      cad_PinH += Huecos[i].firstElementChild.getAttribute("data-pzz");
      }
      if(cad_PinH == cad_H ){
        completado();
      }
    }
  };

/* comprobar180() */  
  function comprobar180(){
    var cad_PinH = "";
    var cad_Rot = "";
    var Rot_OK = false;
    for(var i=0; i < Huecos.length; i++){
    /* rotación correcta */  
      if(Piezas[i].firstElementChild.style.transform == "rotate(0deg)"){
        cad_Rot += 0;
        if(cad_Rot == "0000000000000000"){
          Rot_OK = true;}
      }
    /*pieza correcta en hueco */
      if(Huecos[i].firstElementChild !== null){
      cad_PinH += Huecos[i].firstElementChild.getAttribute("data-pzz");
      }
    /* comprobación */
      if(cad_PinH == cad_H && Rot_OK == true){
        completado();
      } 
    }
  };

/* completado() */  
  var Completado;
  function completado(){
    Completado = true;
    CajaP.style.display = "none";
    ContPuzzle.style.padding = "20px 0px";
    ContH.style.margin = "auto";
    ContH.classList.remove('ContH-BIG');
    $('.lupa').removeClass('lupa_ON');
    ContH.firstElementChild.appendChild(fotoGrande);
    setTimeout(() => {
      fotoGrande.style.filter = "grayscale(20%)";
    }, 100);
  }
   
  /* precargar imagen final */ 
  var fotoGrande = document.createElement("img");
  fotoGrande.setAttribute("class","fotoGrande");
  if(window.location.pathname.includes("CosoFlotante")){
    fotoGrande.setAttribute("src","img/pzz1-coso_flotante_original.jpg");
  }
  else if(window.location.pathname.includes("Rana")){
    fotoGrande.setAttribute("src","img/pzz2-rana.jpg");
  }
  else if(window.location.pathname.includes("Ballena")){
    fotoGrande.setAttribute("src","img/pzz3-ballena.jpg");
  }
  else if(window.location.pathname.includes("Trapo")){
    fotoGrande.setAttribute("src","img/pzz4-trapo_al_sol.jpg");
  } 
  



/* completarlo */
// for(var k=0; k<Piezas.length-1; k++){
//   Huecos[k].append(Piezas[k]);
//   Piezas[k].children[0].style.transform = "rotate(0deg)";
// }




/* --- ROTATE 180º --- */
if(h2SpanText.includes("180")){
/*crear botones*/
  var jR = 1;
  while(jR <= 16){
    var divCreado = document.createElement("div");
    divCreado.setAttribute("class","botRotate icon-rotate");
    Piezas[jR-1].appendChild(divCreado);
    jR++
  }  
  var BotRotate = document.getElementsByClassName("botRotate");


/* -- BOTON ROTATE SHOW -- */
/* DRAG N` DROP */
  if(CLICK_ON == false){
    for(var k=0; k<Piezas.length; k++){
      Piezas[k].addEventListener("mouseover", function(){
        if(Completado != true){
          $(this).children(".botRotate").fadeIn(300);
        }
      });
    }
    for(var k=0; k<Piezas.length; k++){
      Piezas[k].addEventListener("mouseleave", function(){
        if(Completado != true){
          $(this).children(".botRotate").fadeOut(300);
        }  
      });
    }
  }
/* funcion rotate */
  function rotate180(e){
    var ImgRot = e.target.previousElementSibling;
    if(ImgRot.style.transform == "rotate(180deg)"){
      ImgRot.style.transform = "rotate(0deg)";
    }else{
      ImgRot.style.transform = "rotate(180deg)";
    }
  }
/* click boton rotate */
  for(var i=0; i<Huecos.length; i++){
    BotRotate[i].addEventListener("click", function(e){
      rotate180(e);
      comprobar180();
      if(CLICK_ON == true){
        PSelect = undefined;
      }  
    });
  }
} 


