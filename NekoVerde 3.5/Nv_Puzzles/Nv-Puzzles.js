document.addEventListener("DOMContentLoaded", function(){


  /* COMO COMPLETAR EL PUZZLE */

  var CLICK_ON;

  if(Modernizr.touchevents) CLICK_ON = true;
  else CLICK_ON = false;


/* -- BOTON INFO -- */
  $(".BotInfo").on("click", function(){
    $(".BotInfo").toggleClass("BotInfo_ON");
    if(CLICK_ON == true){
      $(".TextoSelect").slideToggle();
    }
    else if(CLICK_ON == false){
      $(".TextoDrag").slideToggle();
    }
  });
  $(".Texto-Info").on("click", function(){
    $(".BotInfo").removeClass("BotInfo_ON");
    if(CLICK_ON == true){
      $(".TextoSelect").slideUp();
    }
    else if(CLICK_ON == false){
      $(".TextoDrag").slideUp();
    }
  });

/* Cont-Info WIDTH */
  if(CLICK_ON == true){
    $(".Cont-Info").addClass("Cont_WhenSelect");
  }
  else if(CLICK_ON == false){
    $(".Cont-Info").addClass("Cont_WhenDrag");
  }




/* --- Tapa-Img --- */
  var PzzSel;
  /*CLICK_ON*/  
  if(CLICK_ON == true){
    $(".Img-Puzzle").on("click", function(){
      if(PzzSel == undefined){/*Puzzle no seleccionada */
        PzzSel = this;
        $(PzzSel).children().eq(1).fadeIn();
      }else if(PzzSel == this){/*Click mismo Puzzle */
        $(PzzSel).children().eq(1).fadeOut();
        PzzSel = undefined;
      }else{/*Click OTRO Puzzle */
        $(PzzSel).children().eq(1).fadeOut();
        PzzSel = this;
        $(PzzSel).children().eq(1).fadeIn();
      }
      $(".Img-Puzzle").on("mouseover", function(){});
      $(".Img-Puzzle").on("mouseleave", function(){});
    });
  }
/*DRAG N` DROP*/  
  else if(CLICK_ON == false){
    $(".Img-Puzzle").on("mouseover", function(){
      $(this).children().eq(1).fadeIn();  
    });
    $(".Img-Puzzle").on("mouseleave", function(){   
        $(this).children().eq(1).fadeOut();
    });
    $(".Img-Puzzle").on("click", function(){});
  }


/* --- IDIOMS --- */
  var Textos = {
    en: {
      I_T: "To complete the puzzles:",
      I_S1: "Select a piece, then select the spot where you want to drop it.",
      I_S2: "&bull; When replacing a piece, the replaced one will return to the container.",
      I_S3: "&bull; To remove a piece, select it and press the grey section of the container.",
      I_S4: "&bull; Use the loupe to enlarge the pieces.",
      I_S5: '(Tip: <i>To complete the 64-piece\'s puzzles on a small screen device, activate the "desktop site" on your browser and switch to horizontal position. </i>)',
      I_D1: "Drag the piece and drop it on the spot you want to.",
      I_D3: "&bull; To remove a piece, drop it in the container.",

      Dif: "Difficulty",
      MF: "Very easy <span>(4x4 - no rotation)</span>",
      F: "Easy <span>(4x4 - rotate 180º)</span>",
      D: "Hard <span>(8x8 - no rotation)</span>",
      MD: "Li'l harder <span>(8x8 - rotate 180º)</span>",

      CF: "Floting Thing <span>- 16 pieces</span>",
      FS: "Frog on the Street <span>- 16 pieces</span>",
      BI: "Inflatable Whale <span>- 16 / 64 pieces</span>",
      TS: "Rag in the Sun <span>- 16 / 64 pieces</span>",
      Ilustr: "Illustration: Diego Cristófano"
    },
    es: {
      I_T: "Para completar los puzzles:",
      I_S1: "Selecciona la pieza, luego selecciona el espacio en el que quieras dejarla.",
      I_S2: "&bull; Al sustituir una pieza en el puzzle, la anterior volverá automáticamente al contenedor.",
      I_S3: "&bull; Puedes quitar una pieza del puzzle seleccionándola y luego presionando en la parte gris del contenedor.",
      I_S4: "&bull; Utiliza la lupa si quieres agrandar las piezas.",
      I_S5: '(Recomendación: <i>Para los de 64 piezas desde un dispositivo de pantalla pequeña, activa la "versión para ordenador" de tu navegador y ponlo en posición horizontal. </i>)',
      I_D1: "Arrastra la pieza y suéltala en el espacio en el que quieras dejarla.",
      I_D3: "&bull; Puedes quitar una pieza del puzzle soltándola en el contenedor.",

      Dif: "Dificultad",
      MF: "Muy fácil <span>(4x4 - sin rotación)</span>",
      F: "Fácil <span>(4x4 - rotación 180º)</span>",
      D: "Difícil <span>(8x8 - sin rotación)</span>",
      MD: "Más difícil <span>(8x8 - rotación 180º)</span>",

      CF: "Coso Flotante <span>- 16 piezas</span>",
      FS: "Rana en la Calle <span>- 16 piezas</span>",
      BI: "Ballena Inflable <span>- 16 / 64 piezas</span>",
      TS: "Trapo al Sol <span>- 16 / 64 piezas</span>",
      Ilustr: "Ilustración: Diego Cristófano"
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
      if(hRef == "http://www.diegocristofano.com") continue;
      else if(hRef == "../index.html") ArrLinks[k].setAttribute("href", hRef+"?S2&"+idioma);
      else ArrLinks[k].setAttribute("href", hRef+"?"+idioma);
    }
  }

  /* getUrl() */
  const getUrl = () => {
    return window.location.search.substring(1);
  }
  setIdioma(getUrl());
  setLinks(getUrl());

});
