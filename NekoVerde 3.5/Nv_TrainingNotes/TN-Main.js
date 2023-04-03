

const Full = document.getElementById("Full"),
      C_Menu = document.getElementById("C-Menu"),
      C_ul = document.getElementById("C-ul"),
      BttMenu = document.getElementById("B-Menu"),
      Li = document.getElementsByClassName("li"),
      
      BttRndm = document.getElementById("B-Rndm"),
      BttFifth = document.getElementById("B-Fifth"),
      
      BttCstm = document.getElementById("B-Cstm"),
      CPrompt = document.getElementById("C-Prompt"),
      TextCstm = document.getElementById("Text-Cstm"),
      BttAcpt = document.getElementById("B-Acpt"),
      BttCncl = document.getElementById("B-Cncl"),

      Timer = document.getElementById("Timer"),
      BttPlayFwd = document.getElementById("B-PlayF"),
      BttPlayBwd = document.getElementById("B-PlayB"),
      
      BttPrev = document.getElementById("B-Prev"),
      BttNext = document.getElementById("B-Next"),

      Title = document.getElementById("Title"),
      Name = document.getElementById("Name"),
      Grado = document.getElementById("Grado"),
      Bar = document.getElementById("Bar");

      
      


const Grado_scale =["1º","2º","3º","4º","5º","6º","7º"];
      
const NGroup = { 
  "Gb_scale" : ["Gb","Ab","Bb","Cb","Db","Eb","F"],
  "Db_scale" : ["Db","Eb","F","Gb","Ab","Bb","C"],
  "Ab_scale" : ["Ab","Bb","C","Db","Eb","F","G"],
  "Eb_scale" : ["Eb","F","G","Ab","Bb","C","D"],
  "Bb_scale" : ["Bb","C","D","Eb","F","G","A"],
  "F_scale" : ["F","G","A","Bb","C","D","E"],
  "C_scale" : ["C","D","E","F","G","A","B"],
  "G_scale" : ["G","A","B","C","D","E","F#"],
  "D_scale" : ["D","E","F#","G","A","B","C#"],
  "A_scale" : ["A","B","C#","D","E","F#","G#"],
  "E_scale" : ["E","F#","G#","A","B","C#","D#"],
  "B_scale" : ["B","C#","D#","E","F#","G#","A#"],
  "Fs_scale" : ["F#","G#","A#","B","C#","D#","E#"],
  "Cs_scale" : ["C#","D#","E#","F#","G#","A#","B#"],
  "Cb_scale" : ["Cb","Db","Eb","Fb","Gb","Ab","Bb"],
  "_Allsyb" : ["F#","C#","G#","D#","A#","E#","B#","Bb","Eb","Ab","Db","Gb","Cb","Fb"],
  "_Croms" : ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],
  "_Cromb" : ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],
  "_AllNotes" : ["Fb","Cb","Gb","Db","Ab","Eb","Bb","F","C","G","D","A","E","B","F#","C#","G#","D#","A#","E#","B#"]
  };



/* -- EVENTOS -- */

/*-- BOTON MENU --*/
C_Menu.style.left = "100%";
BttMenu.addEventListener("click", () => {
  C_Menu.style.left == "100%"
  ? C_Menu.style.left = "calc(100% - 180px)"
  : C_Menu.style.left = "100%";
});
Full.addEventListener("click", () => {
  C_Menu.style.left = "100%";
});

/*-- MENU-NoteGroup --*/
C_ul.addEventListener("click", e => {
  j = e.target.id;
  if(j == "C-Menu" || j == "") return
/* C-Menu (slide) */
  C_Menu.style.left = "100%";

/* set NoteGroup */
  NoteGroup = NGroup[j];
  if(j.charAt(0) === "_") Grado_On = false;
  else Grado_On = true;

/* Title */
  Title.innerHTML = e.target.innerHTML;

/* Li selected */
  for(var i=0; i<Li.length; i++){
    Li[i].classList.remove("li-selected");}
  e.target.classList.add("li-selected"); 

/* BttFifth deactivated style */
  if(j === "_Allsyb"||j === "_AllNotes"){
    BttFifth.classList.add("b-FifthYPrev_OFF");
    if(StyleActive == "Style2") BttFifth.classList.add("b-FifthYPrev_OFF2");
    if(StyleActive == "Style3") BttFifth.classList.add("b-FifthYPrev_OFF3");
  } else {
    BttFifth.classList.remove("b-FifthYPrev_OFF");
    if(StyleActive == "Style2") BttFifth.classList.remove("b-FifthYPrev_OFF2");
    if(StyleActive == "Style3") BttFifth.classList.remove("b-FifthYPrev_OFF3");
  }
/*change note*/
  NextOrPrev = "none"; 
  changeNote();
  if(Fwd_ON === true || Bwd_ON === true){
    clearInterval(NoteInterval);
    fillingBar();
    noteDuration();
  }
  return j;
});


/*-- BOTON RANDOM Y FIFTH --*/
var Rndm_ON = false,
    Fifth_ON = false;
BttRndm.addEventListener("click", () => {
  if(Rndm_ON === false){
    Rndm_ON = true;
    Fifth_ON = false;}
  else if(Rndm_ON === true) Rndm_ON = false;
  bttRyF_styles();
});

BttFifth.addEventListener("click", () => {
  if(j === "_Allsyb"||j === "_AllNotes") return
  if(Fifth_ON === false){
    Fifth_ON = true;
    Rndm_ON = false;}
  else if(Fifth_ON === true) Fifth_ON = false;
  bttRyF_styles();
});


/*-- BUTTON CUSTOMIZE --*/
BttCstm.addEventListener("click", () => {
  CPrompt.style.display = "flex";
  TextCstm.value = "";
  TextCstm.placeholder = "";
  TextCstm.focus();
});  

BttCncl.addEventListener("click", () => {
  CPrompt.style.display = "none";
}); 

BttAcpt.addEventListener("click", () => {
  getCustomTime();
}); 


/*-- AUTO-CHANGE --*/
var DurInt = 2000;
Timer.addEventListener("change", function(){
  DurInt = this.value;
  if(Fwd_ON === true || Bwd_ON === true){
    clearInterval(NoteInterval);
    fillingBar();
    noteDuration();
  }
});


/*-- BUTTONS PLAY --*/ 
var Fwd_ON = false,
    Bwd_ON = false;
BttPlayFwd.addEventListener("click", () => {
  if(Fwd_ON === false){
    Fwd_ON = true;
    Bwd_ON = false;}
  else if(Fwd_ON === true) Fwd_ON = false;
  bttPlay_styles();
});

BttPlayBwd.addEventListener("click", () => {
  if(Bwd_ON === false){
    Bwd_ON = true;
    Fwd_ON = false;}
  else if(Bwd_ON === true) Bwd_ON = false;
  bttPlay_styles();
});


/*-- BUTTONS NEXT Y PREV --*/
BttNext.addEventListener("click", () => {
  NextOrPrev = "next";
  changeNote();
  if(Fwd_ON === true|| Bwd_ON === true){
    clearInterval(NoteInterval);
    fillingBar();
    noteDuration();
  }
});

BttPrev.addEventListener("click", () => {
  if(Rndm_ON === false){
    NextOrPrev = "prev";
    changeNote();
    if(Fwd_ON === true || Bwd_ON === true){
    clearInterval(NoteInterval);
    fillingBar();
    noteDuration();
    }
  } 
});



/*--- FUNCIONES ---*/
var iNote = 0,
    j = "C_scale",
    NoteGroup = NGroup["C_scale"], 
    Grado_On = true,
    NextOrPrev = "none"; 

/*changeNote()*/
const changeNote = () =>{
  var NGLng = NoteGroup.length;
  /* Random_ON */  
  if(Rndm_ON === true){
    generateNum();
    if(RndmNum === iNote) generateNum();
    iNote = RndmNum;}
  /* Next */  
  else if(NextOrPrev === "next"){
    if(Fifth_ON === true){/*fifth_ON*/
      if(j === "_Croms"||j === "_Cromb") iNote += 7;
      else iNote += 4;
    }else iNote++;/*normal*/
    if(iNote >= NGLng) iNote = iNote - NGLng;
  }/* Prev */  
  else if(NextOrPrev === "prev"){
    if(Fifth_ON === true){/*fifth_ON*/
      if(j === "_Croms"||j === "_Cromb") iNote -= 7;
      else iNote -= 4;
    }else iNote--;  
    if(iNote < 0) iNote = NGLng + iNote;
  }
  else iNote = 0;

  /*Name*/
  Name.innerHTML = NoteGroup[iNote];
  if(Grado_On === true) Grado.innerHTML = Grado_scale[iNote];
  else Grado.innerHTML = "";
  /*Pentagram*/
  changeGKeyPent();
  changeFKeyPent();
}

/*generateNum()*/  
var RndmNum;
const generateNum = () =>{
  if(RndmNum != undefined) var prevNum = RndmNum;
  RndmNum = Math.floor(Math.random() * NoteGroup.length);
  if(RndmNum === prevNum) generateNum();
}

/*bttRyF_styles()*/ 
const bttRyF_styles = () => {
  if(Rndm_ON === true){
    BttRndm.classList.add("b-RyF_ON");
    BttPrev.classList.add("b-FifthYPrev_OFF");
    if(StyleActive == "Style2")  BttPrev.classList.add("b-FifthYPrev_OFF2");
    if(StyleActive == "Style3")  BttPrev.classList.add("b-FifthYPrev_OFF3");
    BttFifth.classList.remove("b-RyF_ON");
  }else if(Fifth_ON === true){ 
    BttFifth.classList.add("b-RyF_ON");
    BttRndm.classList.remove("b-RyF_ON");
    BttPrev.classList.remove("b-FifthYPrev_OFF");
    if(StyleActive == "Style2")  BttPrev.classList.remove("b-FifthYPrev_OFF2");
    if(StyleActive == "Style3")  BttPrev.classList.remove("b-FifthYPrev_OFF3");
  }else{
    BttFifth.classList.remove("b-RyF_ON");
    BttRndm.classList.remove("b-RyF_ON");
    BttPrev.classList.remove("b-FifthYPrev_OFF");
    if(StyleActive == "Style2")  BttPrev.classList.remove("b-FifthYPrev_OFF2");
    if(StyleActive == "Style3")  BttPrev.classList.remove("b-FifthYPrev_OFF3");
  }
}

/*bttPlay_styles()*/ 
const bttPlay_styles = () => {
  if(Fwd_ON === true){
    BttPlayFwd.classList.add("b-Play_ON");
    BttPlayFwd.classList.add("icon-pause");
    BttPlayBwd.classList.remove("b-Play_ON");     
    BttPlayBwd.classList.remove("icon-pause");
    BttPlayBwd.classList.remove("b-BwdRotate");
  }else if(Bwd_ON === true){ 
    BttPlayFwd.classList.remove("b-Play_ON");
    BttPlayFwd.classList.remove("icon-pause");
    BttPlayBwd.classList.add("b-Play_ON");
    BttPlayBwd.classList.add("icon-pause");
    BttPlayBwd.classList.add("b-BwdRotate");
  }else{
    BttPlayFwd.classList.remove("b-Play_ON");
    BttPlayFwd.classList.remove("icon-pause");
    BttPlayBwd.classList.remove("b-Play_ON");
    BttPlayBwd.classList.remove("icon-pause");
    BttPlayBwd.classList.remove("b-BwdRotate");
    clearInterval(NoteInterval);
    Fillment.cancel();
    return
  }
  clearInterval(NoteInterval);
  fillingBar();
  noteDuration();
}

/*getCustomTime()*/
const getCustomTime = () =>{
  var cstmT = TextCstm.value
  if(cstmT >= 1 && cstmT < 2000){
    var newOpt = document.createElement("option");
    newOpt.setAttribute("value", Number(cstmT)*1000);
    newOpt.setAttribute("selected", true);
    newOpt.innerHTML = "*"+cstmT+" sec";
    Timer.append(newOpt);
    CPrompt.style.display = "none";
  } 
  else{
    TextCstm.value = "";
    TextCstm.placeholder = "*invalid entry";
    TextCstm.focus();
    return
  } 
  DurInt = parseInt(cstmT)*1000;
  if(Fwd_ON === true || Bwd_ON === true){
    clearInterval(NoteInterval);
    fillingBar();
    noteDuration();
  }
}


/*noteDuration()*/
var NoteInterval;
const noteDuration = () => {
  NoteInterval = setInterval(function(){
    if(Fwd_ON === true) NextOrPrev = "next";
    if(Bwd_ON === true) NextOrPrev = "prev";
    changeNote();
    fillingBar();
  }, DurInt); 
}

/*filling()*/
var Fillment;
const fillingBar = () =>{
  if(Fillment != undefined) Fillment.cancel();
  Fillment = Bar.animate([
    {width: "0%"},
    {width: "100%"}
  ], DurInt);
}


changeNote();

