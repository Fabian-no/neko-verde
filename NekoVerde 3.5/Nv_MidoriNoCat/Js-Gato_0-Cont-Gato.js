

/* --- G A T O --- */
  /*-----  ON.('READY') -----*/

/* --- IDIOMS --- */
var Textos = {
  en: {
    M_1: "FLY",
    M_2: "SKATE<br>BOARD",
    M_3: "BUBBLES",
    M_4A: "HOLE",
    M_4B: "JUMP",
    M_5: "BALLOON",
    M_6: "UFO",

    pin_Text: "Item locked. It will remain<br> visible while changing backgrounds",

    I_1: '<b>How to use:</b>',
    I_2: '<span class="icon-up"></span><span class="icon-down"></span>Show/Hide the menu',
    I_3: '<span class="icon-anim">MOSCA</span> Play the animation',
    I_4: '<span class="icon-stop"></span> Stop the animation',
    I_5: '<span class="icon-left"></span><span class="icon-right"></span> Change the background',
    I_6: '<span class="icon-pin-outline"></span> Lock the current item. It will remain visible while changing backgrounds',
    I_7: '&bull; Backgrounds can be changed while animations are on',
    I_8: '&bull; Some of the animations interact with some items... Can you find them?!'
  },
  es: {
    M_1: "MOSCA",
    M_2: "SKATE<br>BOARD",
    M_3: "BURBUJAS",
    M_4A: "POZO",
    M_4B: "SALTO",
    M_5: "GLOBO",
    M_6: "OVNI",

    pin_Text: "Se ha fijado este accesorio<br> y seguirá visible al cambiar de fondo",

    I_1: '<b>Guía práctica:</b>',
    I_2: '<span class="icon-up"></span><span class="icon-down"></span> Despliega y oculta el menú',
    I_3: '<span class="icon-anim">MOSCA</span> Activa la animación',
    I_4: '<span class="icon-stop"></span>Detiene la animación',
    I_5: '<span class="icon-left"></span><span class="icon-right"></span>Cambia de fondo',
    I_6: '<span class="icon-pin-outline"></span> Fija el accesorio correspondiente al fondo actual para que este siga visible al cambiar de fondo',
    I_7: '&bull; Se puede cambiar de fondo mientras las animaciones estén activadas',
    I_8: '&bull; Algunas animaciones interactúan con algunos accesorios... ¡descúbrelas!'
  }
};

/* getUrl() */
const getUrl = () => {
  return window.location.search.substring(1);
}

/* setIdioma() */
const ArrTXT = document.getElementsByClassName("TXT");
const setIdioma = idioma =>{
  idioma = idioma.substring(0,2);
  for(let k=0; k<ArrTXT.length; k++){
    let data_TXT = ArrTXT[k].getAttribute("data-TXT");
    ArrTXT[k].innerHTML = Textos[idioma][data_TXT];
  }
  return idioma
}

let idioma = setIdioma(getUrl());

/* setCont */
function setCont(pic){
  pic = pic.match(/\d+/)[0]
  return pic
}
var cont = setCont(getUrl());
cont = 0


  /*--- FONDO CONT-GATO ---*/
/* Fondo Cont-gato */
  var Fondo = [];
  Fondo[0] = "linear-gradient(#ffffff, #fffce2)";
  Fondo[1] = "url(img/pic01.jpeg)";
  Fondo[2] = "url(img/pic02.jpeg)";
  Fondo[3] = "url(img/pic03.jpeg)";
  Fondo[4] = "url(img/pic04.jpeg)";
  Fondo[5] = "url(img/pic05.jpeg)";
  Fondo[6] = "url(img/pic06.jpeg)";
  Fondo[7] = "url(img/pic07.jpeg)";
  Fondo[8] = "url(img/pic08.jpeg)";
  Fondo[9] = "url(img/pic09.jpeg)";
  Fondo[10] = "url(img/pic10.jpeg)";
  Fondo[11] = "url(img/pic11.jpeg)";
  Fondo[12] = "url(img/pic12.jpeg)";

  var FndLenght = Fondo.length;
  
// /* random number */
  // function getRandomInt() {
  //   return Math.floor(Math.random() * FndLenght);
  // }
  // cont = getRandomInt();


/*--- SET FONDO ---*/
function setFondo(){
  /* fondo y menu*/
    $('.Cont-gato').css('backgroundImage', Fondo[cont]);
    $('.Bot-MenuInt, .MI-show, .MI-info, .flex-info').addClass("colores-"+cont);
  /* blanco y negro */  
    if(cont == 10){
      $('.flex-marco').css('filter', 'grayscale(90%)');
    }else if(cont == 8){
      $('.flex-marco').css('filter', 'brightness(90%) grayscale(50%)');
    }else{$('.flex-marco').css('filter', 'none');}
  /*-- boton - pozo/salto -- */
    if(cont == 7){
      $('.Boton-pozo>p').text(Textos[idioma].M_4B);
    }else{$('.Boton-pozo>p').text(Textos[idioma].M_4A);}
  };

/*--- SET COMPLEMENTOS ---*/
function setComplementos(){
  if(cont == 1){
    $('#Dress').addClass('dress-1');
  }else{$('#Dress').removeClass('dress-1');}
  if(cont == 2){
    $('#Item-2').addClass('item-2');
  }else{$('#Item-2').removeClass('item-2');}
  if(cont == 3){
    $('#Hat-3y4y11').addClass('hat-3');
  }else{$('#Hat-3y4y11').removeClass('hat-3 hat-3S');}
  if(cont == 4){
    $('#Hat-3y4y11').addClass('hat-4');
  }else{$('#Hat-3y4y11').removeClass('hat-4 hat-4S');}
  if(cont == 5){
    $('#Item-5').addClass('item-5');
  }else{$('#Item-5').removeClass('item-5');}
  if(cont == 6){
    $('#Dress').addClass('dress-6');
  }else{$('#Dress').removeClass('dress-6');}
  if(cont == 7){
    $('#Hat-7y8').addClass('hat-7');
  }else{$('#Hat-7y8').removeClass('hat-7 hat-7S');}
  if(cont == 8){
    $('#Hat-7y8').addClass('hat-8');
  }else{$('#Hat-7y8').removeClass('hat-8 hat-8S');}
  if(cont == 9){
    $('#Item-9M').addClass('item-9M');
    $('#Item-9B').addClass('item-9B');
  }else{$('#Item-9M').removeClass('item-9M');
    $('#Item-9B').removeClass('item-9B');}
  if(cont == 10){
    $('#Dress').addClass('dress-10');
  }else{$('#Dress').removeClass('dress-10');}
  if(cont == 11){
    $('#Hat-3y4y11').addClass('hat-11');
  }else{$('#Hat-3y4y11').removeClass('hat-11 hat-11S');}
  if(cont == 12){
    $('#Hat-12').addClass('hat-12');
    $('#Dress-12').addClass('dress-12');
  }else{$('#Hat-12').removeClass('hat-12');
    $('#Dress-12').removeClass('dress-12');}
};


/* ***SET INICIAL (on ready)*** */
  setFondo(); 
  setComplementos();


/*--- COMBINE iTEMS ---*/
function combinarItems(){
  /*color boton pin y text lock*/
  $('.Boton-lock, .lock-Text').addClass("colores-"+cont);
  $('.Boton-pin, .pin-Text').addClass("colores-"+cont);
/* ITEM locked*/
  if(ActivClassType == "item"){
    if(cont == 1){
      $('#Dress').addClass('dress-1');
    }else{$('#Dress').removeClass('dress-1');}
    if(cont == 3){
      $('#Hat-3y4y11').addClass('hat-3');
    }else{$('#Hat-3y4y11').removeClass('hat-3');}
    if(cont == 4){
      $('#Hat-3y4y11').addClass('hat-4');
    }else{$('#Hat-3y4y11').removeClass('hat-4');}
    if(cont == 6){
      $('#Dress').addClass('dress-6');
    }else{$('#Dress').removeClass('dress-6');}
    if(cont == 7){
      $('#Hat-7y8').addClass('hat-7');
    }else{$('#Hat-7y8').removeClass('hat-7');}
    if(cont == 8){
      $('#Hat-7y8').addClass('hat-8');
    }else{$('#Hat-7y8').removeClass('hat-8');}
    if(cont == 10){
      $('#Dress').addClass('dress-10');
    }else{$('#Dress').removeClass('dress-10');}
    if(cont == 11){
      $('#Hat-3y4y11').addClass('hat-11');
    }else{$('#Hat-3y4y11').removeClass('hat-11');}
    if(cont == 12){
      $('#Hat-12').addClass('hat-12');
      $('#Dress-12').addClass('dress-12');
    }else{$('#Hat-12').removeClass('hat-12');
      $('#Dress-12').removeClass('dress-12');}
  }
/* HAT locked*/
  else if(ActivClassType == "hat"){
    if(cont == 1){
      $('#Dress').addClass('dress-1');
    }else{$('#Dress').removeClass('dress-1');}
    if(cont == 2){
      $('#Item-2').addClass('item-2');
    }else{$('#Item-2').removeClass('item-2');}
    if(cont == 5){
      $('#Item-5').addClass('item-5');
    }else{$('#Item-5').removeClass('item-5');}
    if(cont == 6){
      $('#Dress').addClass('dress-6');
    }else{$('#Dress').removeClass('dress-6');}
    if(cont == 9){
      $('#Item-9M').addClass('item-9M');
      $('#Item-9B').addClass('item-9B');
    }else{$('#Item-9M').removeClass('item-9M');
      $('#Item-9B').removeClass('item-9B');}
    if(cont == 10){
      $('#Dress').addClass('dress-10');
    }else{$('#Dress').removeClass('dress-10');}
    if(cont == 12){
      $('#Hat-12').addClass('hat-12');
      $('#Dress-12').addClass('dress-12');
      if($('#Hat-3y4y11').attr("class") == "hat-3" || 
      $('#Hat-3y4y11').attr("class") == "hat-3 hat-3y4y11-globo"){
        $('#Hat-3y4y11').addClass('hat-3S');}
      if($('#Hat-3y4y11').attr("class") == "hat-4" ||
      $('#Hat-3y4y11').attr("class") == "hat-4 hat-3y4y11-globo"){
        $('#Hat-3y4y11').addClass('hat-4S');}
      if($('#Hat-7y8').attr("class") == "hat-7" ||
      $('#Hat-7y8').attr("class") == "hat-7 hat-7y8-globo"){
        $('#Hat-7y8').addClass('hat-7S');}
      if($('#Hat-7y8').attr("class") == "hat-8" ||
      $('#Hat-7y8').attr("class") == "hat-8 hat-7y8-globo"){
        $('#Hat-7y8').addClass('hat-8S');}
      if($('#Hat-3y4y11').attr("class") == "hat-11" ||
      $('#Hat-3y4y11').attr("class") == "hat-11 hat-3y4y11-globo"){
        $('#Hat-3y4y11').addClass('hat-11S');}
    }else{
      $('#Hat-12').removeClass('hat-12');
      $('#Dress-12').removeClass('dress-12');
      $('#Hat-3y4y11').removeClass('hat-3S');
      $('#Hat-3y4y11').removeClass('hat-4S');
      $('#Hat-7y8').removeClass('hat-7S');
      $('#Hat-7y8').removeClass('hat-8S');
      $('#Hat-3y4y11').removeClass('hat-11S');
    }
  }
/* DRESS locked*/
  else if(ActivClassType == "dress"){
    if(cont == 2){
      $('#Item-2').addClass('item-2');
    }else{$('#Item-2').removeClass('item-2');}
    if(cont == 3){
      $('#Hat-3y4y11').addClass('hat-3');
    }else{$('#Hat-3y4y11').removeClass('hat-3');}
    if(cont == 4){
      $('#Hat-3y4y11').addClass('hat-4');
    }else{$('#Hat-3y4y11').removeClass('hat-4');}
    if(cont == 5){
      $('#Item-5').addClass('item-5');
    }else{$('#Item-5').removeClass('item-5');}
    if(cont == 7){
      $('#Hat-7y8').addClass('hat-7');
    }else{$('#Hat-7y8').removeClass('hat-7');}
    if(cont == 8){
      $('#Hat-7y8').addClass('hat-8');
    }else{$('#Hat-7y8').removeClass('hat-8');}
    if(cont == 9){
      $('#Item-9M').addClass('item-9M');
      $('#Item-9B').addClass('item-9B');
    }else{$('#Item-9M').removeClass('item-9M');
      $('#Item-9B').removeClass('item-9B');}
    if(cont == 11){
      $('#Hat-3y4y11').addClass('hat-11');
    }else{$('#Hat-3y4y11').removeClass('hat-11');}
    if(cont == 12){
      $('#Hat-12').addClass('hat-12');
      $('#Dress-12').addClass('dress-12');
    }else{$('#Hat-12').removeClass('hat-12');
      $('#Dress-12').removeClass('dress-12');}
  }
  /* SNOW locked*/
  else if(ActivClassType == "snow"){
    if(cont == 1){
      $('#Dress').addClass('dress-1');
    }else{$('#Dress').removeClass('dress-1');}
    if(cont == 2){
      $('#Item-2').addClass('item-2');
    }else{$('#Item-2').removeClass('item-2');}
    if(cont == 3){
      $('#Hat-3y4y11').addClass('hat-3 hat-3S');
    }else{$('#Hat-3y4y11').removeClass('hat-3 hat-3S');}
    if(cont == 4){
      $('#Hat-3y4y11').addClass('hat-4 hat-4S');
    }else{$('#Hat-3y4y11').removeClass('hat-4 hat-4S');}
    if(cont == 5){
      $('#Item-5').addClass('item-5');
    }else{$('#Item-5').removeClass('item-5');}
    if(cont == 6){
      $('#Dress').addClass('dress-6');
    }else{$('#Dress').removeClass('dress-6');}
    if(cont == 7){
      $('#Hat-7y8').addClass('hat-7 hat-7S');
    }else{$('#Hat-7y8').removeClass('hat-7 hat-7S');}
    if(cont == 8){
      $('#Hat-7y8').addClass('hat-8 hat-8S');
    }else{$('#Hat-7y8').removeClass('hat-8 hat-8S');}
    if(cont == 9){
      $('#Item-9M').addClass('item-9M');
      $('#Item-9B').addClass('item-9B');
    }else{$('#Item-9M').removeClass('item-9M');
      $('#Item-9B').removeClass('item-9B');}
    if(cont == 10){
      $('#Dress').addClass('dress-10');
    }else{$('#Dress').removeClass('dress-10');}
    if(cont == 11){
      $('#Hat-3y4y11').addClass('hat-11 hat-11S');
    }else{$('#Hat-3y4y11').removeClass('hat-11 hat-11S');}
  }
}


/*-- MENU INTERACT --*/
  $(window).on('resize', function(){
    if($(window).width() >= 1010){
      $('.MI-show').css('display','none');
      $('.Bot-MenuInt').css('display','block');
    }else{
      $('.MI-show').css('display','block');
      if(botMICount%2 == 0){
        $('.Bot-MenuInt').css('display','block');
      }else{
        $('.Bot-MenuInt').css('display','none');
      }
      
    }
  });
  
/*-- MI-Show --*/
  var botMICount = 1;
  $('.MI-show').on('click', function(){
    botMICount++;
    if(botMICount%2 == 0){
      $('.MI-show_flex>p').removeClass("icon-down");
      $('.MI-show_flex>p').addClass("icon-up");
      $('.Bot-MenuInt').slideDown();
    }else{
      $('.MI-show_flex>p').removeClass("icon-up");
      $('.MI-show_flex>p').addClass("icon-down");
      $('.Bot-MenuInt').slideUp();
    }
  });  


/*--- BOTON - PIN ---*/
  var pinCount = 1;
  var ActivClassType;

  $('.Boton-pin').on('click', function(){
    pinCount++;
  /* cambio apariencia del boton */
    if(pinCount%2 == 0){
      $('.Boton-pin, .pin-Text').addClass("colores-"+cont);
      $('.Boton-pin>p').removeClass("icon-pin-outline");
      $('.Boton-pin>p').addClass("icon-pin");
      $('.Boton-pin').addClass("Pin_ON");
    }else{
      $('.Boton-pin, .pin-Text').removeClass("colores-"+cont);
      $('.Boton-pin>p').removeClass("icon-pin");
      $('.Boton-pin>p').addClass("icon-pin-outline");
      $('.Boton-pin').removeClass("Pin_ON");
      $('.pin-Text').animate({opacity: 0}, 150);
    }
  /*pin-text */
    if(pinCount == 2){
      $('.pin-Text').animate({opacity: .9}, 400);
      setTimeout(function(){
        $('.pin-Text').animate({opacity: 0}, 500);
      }, 3500);
    }  
  /*Obtener Class activa */  
    if(pinCount%2 == 0){
      if(cont == 2 || cont == 5 || cont == 9){
        ActivClassType = "item";}  
      else if(cont == 3 || cont == 4 ||cont == 7 || cont == 8 || cont == 11){
        ActivClassType = "hat";}
      else if(cont == 1 || cont == 6 || cont == 10){
        ActivClassType = "dress";}  
      else if(cont == 12){
        ActivClassType = "snow";}  
      else{
        ActivClassType = "none";}
    }
  });



/*--- BOTONES - TRAVEL ---*/
/*BotTrav-F*/
  $('.BotTrav-F').on('click', function(){
    $('.Bot-MenuInt, .MI-show, .MI-info, .flex-info').removeClass("colores-"+cont);/*quitar color previo*/
    $('.Boton-pin, .pin-Text').removeClass("colores-"+cont);
    cont++;
    if(cont >= FndLenght ){cont = 0}
    setFondo();
  /* unpined */
    if(pinCount%2 !== 0){
      setComplementos();}
  /* pined */    
    else{
      combinarItems();
    }
  });
/*BotTrav-B*/
  $('.BotTrav-B').on('click', function(){
    $('.Bot-MenuInt, .MI-show, .MI-info, .flex-info').removeClass("colores-"+cont);/*quitar color previo*/
    $('.Boton-pin, .pin-Text').removeClass("colores-"+cont);
    cont--;
    if(cont <= -1){cont = FndLenght-1}
    setFondo();
  /* unpined */
    if(pinCount%2 !== 0){
      setComplementos();}
  /* pined */    
    else{
      combinarItems();
    }
  });


/*--- BOTONES - INFO ---*/
  $('.MI-info').on('click', function(){
    $('.Cont-Info').fadeIn();
  });
  $('.Cont-Info').on('click', function(){
    $('.Cont-Info').fadeOut();
  });  

  
/* -- BOTON-STOP -- */
  var sTa;
  var sTb;
  var sTc;
  var sTd;
  var sTe;
  var sTf;

$('.MI-stop').on('click', function(){
  /* generales y botones */
    $('.Gato').css('z-index','80');
    $('.Menu-interact, .MI-info').css('display','block');
    $('.MI-stop').hide();
  /* mosca */
    $('#Item-2, #Item-5, #Item-9M, #Item-9B').css('z-index','80');
    $('.ojo').removeClass('ojo-mosca ojo-mosca-after');
    $('.pupila').removeClass('pupila-mosca pupila-mosca-after');
    $('.Mosca-A').removeClass('Mosca-A_anim');
    $('.Mosca-B').removeClass('Mosca-B_anim');
    $('.Mosca-F').removeClass('Mosca-F_anim');
  /* skate */
    $('.ojo').removeClass('ojo-skt');
    $('.pupila').removeClass('pupila-skt');
    $('.Gato').removeClass('Gato-skt Gato-skt7');
    $('.Sombra-gato').removeClass('Sombra-gato-skt Sombra-gato-skt7');
    $('.Skate').removeClass('Skate-skt Skate-skt7');
    $('.Sombra-skate').removeClass('Sombra-skate-skt Sombra-skate-skt7');
    $('#Item-9M').removeClass('item-9M-skt item-9M-skt7');
    $('#Item-9B').removeClass('item-9B-skt item-9B-skt7');
  /* burbuja */
    linkBurb.remove();
    $('.ojo').removeClass('ojo-burb ojo-burb-after');
    $('.pupila').removeClass('pupila-burb pupila-burb-after');
    $('.bur-gt').removeClass('bur-gt_anim');
    $('.b-gt').removeClass('b-gt_anim');
    $('.Gato').removeClass('Gato-burb');
    $('.Sombra-gato').removeClass('Sombra-gato-burb');
  /* pozo */
    $('.ojo').removeClass('ojo-pozo');
    $('.pupila').removeClass('pupila-pozo');
    $('.Agujero').removeClass('Agujero-pozo');
    $('.Gato').removeClass('Gato-pozo Gato-salto');
    $('#Item-2').removeClass('item-2-pozo item-2-salto');
    $('#Item-5').removeClass('item-5-pozo item-5-salto');
    $('#Item-9M').removeClass('item-9M-pozo item-9M-salto');
    $('#Item-9B').removeClass('item-9B-pozo item-9B-salto');
    $('.Sombra-gato').removeClass('Sombra-gato-pozo Sombra-gato-salto');
  /* globo */
    $('.cabeza').removeClass('cabeza-globo');
    $('#Hat-7y8').removeClass('hat-7y8-globo');
    $('#Hat-3y4y11').removeClass('hat-3y4y11-globo');
    $('#Hat-12').removeClass('hat-12-globo');
    $('.cont-bigotes').removeClass('cont-bigotes-globo');
    $('.cont-ojos').removeClass('cont-ojos-globo');
    $('.cont-orejas').removeClass('cont-orejas-globo');
    $('.oreja1').removeClass('oreja1-globo');
    $('.oreja2').removeClass('oreja2-globo');
    $('.Gato').removeClass('Gato-globo');
    $('.Sombra-gato').removeClass('Sombra-gato-globo');
  /* ovni */
    $('.Ovni').removeClass('Ovni-Pre-anim Ovni-anim');
    $('.Rayo-ovni').removeClass('Rayo-ovni-anim');
    $('.o1').removeClass('o1-ovni');
    $('.o2').removeClass('o2-ovni');
    $('.pupila').removeClass('pupila-ovni');
    $('.Gato').removeClass('Gato-ovni');
    $('.Sombra-gato').removeClass('Sombra-gato-ovni');
  /* setTimeout */
    if(sTa > 0){clearTimeout(sTa)};
    if(sTb > 0){clearTimeout(sTb)};
    if(sTc > 0){clearTimeout(sTc)};
    if(sTd > 0){clearTimeout(sTd)};
    if(sTe > 0){clearTimeout(sTe)};
    if(sTf > 0){clearTimeout(sTf)};
  });

  
  
/* PRECARGAR IMÁGENES */
  const ImgNames = ["pic01.jpeg","pic02.jpeg","pic03.jpeg","pic04.jpeg","pic05.jpeg","pic06.jpeg","pic07.jpeg","pic08.jpeg","pic09.jpeg","pic10.jpeg","pic11.jpeg","pic12.jpeg", "01-dress.png","06-dress.png","10-dress.png","12-dress.png","02-item.png","05-item.png","09B-item.png","09M-item.png","03-hat.png","03S-hat.png","04-hat.png","04S-hat.png","07-hat.png","07S-hat.png","08-hat.png","08S-hat.png","11-hat.png","11S-hat.png","12-hat.png"];
  var DivImg = new Array();  
    
  precargarImg = () => {
    var k = 0;
    while(k < ImgNames.length){
      DivImg[k] = new Image();
      DivImg[k].src = "img/"+ImgNames[k];
      k++;
    };
  }
  precargarImg();



