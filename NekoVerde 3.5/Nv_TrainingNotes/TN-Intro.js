document.addEventListener("DOMContentLoaded", function(){
  const BttInfo = document.getElementById("b-Info"),
        C_Info = document.getElementById("C-Info");

  BttInfo.addEventListener("click", () =>{
    C_Info.style.display = "flex";
  });
  
  C_Info.addEventListener("click", () =>{
    C_Info.style.display = "none";
  });


/* --- IDIOMS --- */
  var Textos = {
    en: {
      SubT: "TRAINING NOTES is a tool that will help you practice your reading and your scales and chords on a guitar, piano or any instrument.<br><span>(no sound available)</span>",
      Str: "Start",
      B_Info: "How to use",
      I_T: "How to use:",
      I_1: "Choose the group of notes you want to train.",
      I_2: "Change the order in which the notes will be displayed: regular, <i>random</i> or <i>by fifths</i>.",
      I_3: "Move through the scale <i>manually</i>.",
      I_4: 'Move through the scale <i>automatically</i> with the "auto-change" function.',
      I_5: '<i>Customize</i> the "auto-change" interval or pick one from list on the side.',
      I_6: "Choose the way the notes are displayed.",
      I_7: "Choose which notes will be displayed on the pentagram: <i>bottom half</i>, <i>top half</i> or the <i>whole pentagram</i>."
    },
    es: {
      SubT: "TRAINING NOTES es una herramienta que te ayudará a practicar la lectura musical, y las escalas y acordes en la guitarra, el piano o cualquier otro instrumento.<br><span>(sin sonido)</span>",
      Str: "Inicio",
      B_Info: "Guía práctica",
      I_T: "Guía práctica:",
      I_1: "Elige el grupo de notas que quieres entrenar.",
      I_2: "Cambia el orden en que se muestran las notas: normal, <i>al azar</i> o <i>por quintas</i>.",
      I_3: "Cambia de nota <i>manualmente</i>.",
      I_4: 'Cambia de nota <i>automáticamente</i> con la función "auto-change"',
      I_5: '<i>Personaliza</i> el intervalo de tiempo o elige uno de la lista .',
      I_6: "Elige cómo visualizar las notas.",
      I_7: "Elige en qué parte del pentagrama se mostrarán las notas: <i>parte inferior</i>, <i>parte superior</i> o <i>ambas</i>."
    }
  };

  /* setIdioma() */
  const ArrTXT = document.getElementsByClassName("TXT");
  const setIdioma = idioma =>{
    for(let k=0; k<ArrTXT.length; k++){
      let data_TXT = ArrTXT[k].getAttribute("data-TXT");
      ArrTXT[k].innerHTML = Textos[idioma][data_TXT];
    }
  }

  /* setLinks() */  
  const ArrLinks = document.getElementsByTagName("a");
  const setLinks = idioma =>{
    for(let k=0; k<ArrLinks.length; k++){
      let hRef = ArrLinks[k].getAttribute("href");
      if(hRef == "../index.html") ArrLinks[k].setAttribute("href", hRef+"?S2&"+idioma);
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