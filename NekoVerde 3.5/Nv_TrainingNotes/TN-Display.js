
const BttGkey = document.getElementById("B-Gkey"),
      BttFkey = document.getElementById("B-Fkey"),
      BttName = document.getElementById("B-Name"),

      GPent = document.getElementById("G-Pent"),
      FPent = document.getElementById("F-Pent"),
      CName = document.getElementById("C-Name"),
      CDisplay = document.getElementById("C-Display");



/*-- G - KEY --*/
BttGkey.addEventListener("click", () => {
  if(GPent.style.display === "block"){
    GPent.style.display = "none";
    BttGkey.classList.remove("Display_ON");
    if(StyleActive == "Style2") BttGkey.classList.remove("Display_ON2");
    if(StyleActive == "Style3") BttGkey.classList.remove("Display_ON3");
    BttGkey.firstElementChild.src = "img/G-Key_small-lightgray.png";
  }else{
    GPent.style.display = "block";
    BttGkey.classList.add("Display_ON");
    if(StyleActive == "Style2") BttGkey.classList.add("Display_ON2");
    if(StyleActive == "Style3") BttGkey.classList.add("Display_ON3");
    BttGkey.firstElementChild.src = "img/G-Key_small-antiquewhite.png";
  }
  changeDisplays();
});


/*-- F - KEY --*/
BttFkey.addEventListener("click", () => {
  if(FPent.style.display === "block"){
    FPent.style.display = "none";
    BttFkey.classList.remove("Display_ON");
    if(StyleActive == "Style2") BttFkey.classList.remove("Display_ON2");
    if(StyleActive == "Style3") BttFkey.classList.remove("Display_ON3");
    BttFkey.firstElementChild.src = "img/F-Key_small-lightgray.png";
  }else{
    FPent.style.display = "block";
    BttFkey.classList.add("Display_ON");
    if(StyleActive == "Style2") BttFkey.classList.add("Display_ON2");
    if(StyleActive == "Style3") BttFkey.classList.add("Display_ON3");
    BttFkey.firstElementChild.src = "img/F-Key_small-antiquewhite.png";
  }
  changeDisplays();
});


/*-- NAME --*/
BttName.addEventListener("click", () => {
  if(CName.style.display === "flex"){
    CName.style.display = "none";
    BttName.classList.remove("Display_ON");
    if(StyleActive == "Style2") BttName.classList.remove("Display_ON2");
    if(StyleActive == "Style3") BttName.classList.remove("Display_ON3");
  }else{
    CName.style.display = "flex";
    BttName.classList.add("Display_ON");
    if(StyleActive == "Style2") BttName.classList.add("Display_ON2");
    if(StyleActive == "Style3") BttName.classList.add("Display_ON3");
  }
  changeDisplays();
});


/*changeDisplays()*/
const changeDisplays = () =>{
  var Gdisp = window.getComputedStyle(GPent).getPropertyValue('display'),
      Fdisp = window.getComputedStyle(FPent).getPropertyValue('display'),
      Ndisp = window.getComputedStyle(CName).getPropertyValue('display'),
      DCont = 0;
  if(Gdisp === "block") DCont++
  if(Fdisp === "block") DCont++
  if(Ndisp === "flex") DCont++
  
  if(DCont === 1){
    GPent.classList.remove("Pent-Small");
    FPent.classList.remove("Pent-Small");
    CName.classList.remove("Name-Small");
  }  
  if(DCont === 2){
    GPent.classList.add("Pent-Small");
    FPent.classList.add("Pent-Small");
    CName.classList.add("Name-Small");
    CDisplay.classList.add("Display-2");
    GPent.classList.remove("Pent-Special");
    FPent.classList.remove("Pent-Special");
    CName.classList.remove("Name-Special");
    CDisplay.classList.remove("Display-Special");
  }  
  if(DCont === 3){
    GPent.classList.remove("Pent-Small");
    FPent.classList.remove("Pent-Small");
    CName.classList.remove("Name-Small");
    CDisplay.classList.remove("Display-2");
    GPent.classList.add("Pent-Special");
    FPent.classList.add("Pent-Special");
    CName.classList.add("Name-Special");
    CDisplay.classList.add("Display-Special");
  }  
}

/* Initial Display */
GPent.style.display = "block";
FPent.style.display = "block";
CName.style.display = "flex";
BttGkey.classList.add("Display_ON");
BttFkey.classList.add("Display_ON");
BttName.classList.add("Display_ON");


changeDisplays();




/* --- IDIOMS --- */
var Textos = {
  en: {
    M_T: "Which notes do you want to practice?",
    M_1: "All notes (5ths)",
    M_2: "Cromatic (#)",
    M_3: "Cromatic (b)",
    M_4: "Gb scale *",
    M_5: "Db scale",
    M_6: "Ab scale",
    M_7: "Eb scale",
    M_8: "Bb scale",
    M_9: "F scale",
    M_10: "C scale",
    M_11: "G scale",
    M_12: "D scale",
    M_13: "A scale",
    M_14: "E scale",
    M_15: "B scale",
    M_16: "F# scale *",
    M_17: "All # (C# scale)",
    M_18: "All b (Cb scale)",
    M_19: "All # and b (5ths)", 
    P_T: "Write the NUMBER OF SECONDS you want the interval to be.",
    P_1: "&bull; max. 180",
    P_2: "&bull; You can use decimals (e.g., 1.5)",
    P_A: "Cancel",
    P_C: "Accept",
  },
  es: {
    M_T: "¿Qué notas quieres practicar?",
    M_1: "Todas las notas (5ths)",
    M_2: "Cromática (#)",
    M_3: "Cromática (b)",
    M_4: "Escala de Gb *",
    M_5: "Escala de Db",
    M_6: "Escala de Ab",
    M_7: "Escala de Eb",
    M_8: "Escala de Bb",
    M_9: "Escala de F",
    M_10: "Escala de C",
    M_11: "Escala de G",
    M_12: "Escala de D",
    M_13: "Escala de A",
    M_14: "Escala de E",
    M_15: "Escala de B",
    M_16: "Escala de F# *",
    M_17: "Todos los # (Escala de C#)",
    M_18: "Todos los b (Escala de Cb)",
    M_19: "Todos los # y b (5ths)", 
    P_T: "Escribe el NÚMERO DE SEGUNDOS que quieres que dure el intervalo.",
    P_1: "&bull; máx. 180",
    P_2: "&bull; Puedes usar decimales (ej. 1.5)",
    P_C: "Cancelar",
    P_A: "Aceptar",
  }
}

/* setIdioma() */
const ArrTXT = document.getElementsByClassName("TXT");
const setIdioma = idioma =>{
  for(let k=0; k<ArrTXT.length; k++){
    let data_TXT = ArrTXT[k].getAttribute("data-TXT");
    ArrTXT[k].innerHTML = Textos[idioma][data_TXT];
  }
}

/* setLinks() */  
const aBack = document.getElementById("a-Back");
const setLinks = idioma =>{
    let hRef = aBack.getAttribute("href");
    if(idioma === "en"){
      hRef += "?en";
      aBack.setAttribute("href", hRef);
    }else{
      hRef += "?es";
      aBack.setAttribute("href", hRef);
    }
  }
  /* getUrl() */
const getUrl = () => {
  return window.location.search.substring(1);
}

setIdioma(getUrl());
setLinks(getUrl());
