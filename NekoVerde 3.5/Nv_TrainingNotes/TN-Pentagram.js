
/* -- PENTAGRAMA -- */
const GKey_Nota = document.getElementById("Gkey-Nota"),
      GkN_StickUp = document.getElementById("GkN-StickUp"),
      GkN_StickDw = document.getElementById("GkN-StickDw"),
      GkN_Hz = document.getElementById("GkN-Hz"),
      GkP_Dw1 = document.getElementById("GkP-Dw1"),
      GkP_Dw2 = document.getElementById("GkP-Dw2"),
      GkP_Up1 = document.getElementById("GkP-Up1"),
      GkP_Up2 = document.getElementById("GkP-Up2"),
      GAlt_b = document.getElementById("G-Alt_b"),
      GAlt_s = document.getElementById("G-Alt_s"),
      BttGk_Oct = document.getElementById("B-GkOct");

const FKey_Nota = document.getElementById("Fkey-Nota"),  
      FkN_StickUp = document.getElementById("FkN-StickUp"),
      FkN_StickDw = document.getElementById("FkN-StickDw"),
      FkN_Hz = document.getElementById("FkN-Hz"),    
      FkP_Dw1 = document.getElementById("FkP-Dw1"),
      FkP_Dw2 = document.getElementById("FkP-Dw2"),
      FkP_Up1 = document.getElementById("FkP-Up1"),
      FkP_Up2 = document.getElementById("FkP-Up2"),
      FAlt_b = document.getElementById("F-Alt_b"),
      FAlt_s = document.getElementById("F-Alt_s"),
      BttFk_Oct = document.getElementById("B-FkOct");

const G_KeyPos = [
    {NOTE: "A3", TOP: "64px"}, {NOTE: "B3", TOP: "56px"}, 
    {NOTE: "C4", TOP: "48px"}, {NOTE: "D4", TOP: "42px"}, 
    {NOTE: "E4", TOP: "34px"}, {NOTE: "F4", TOP: "26px"}, 
    {NOTE: "G4", TOP: "18px"}, {NOTE: "A4", TOP: "10px"}, 
    {NOTE: "B4", TOP: "2px"}, {NOTE: "C5", TOP: "-6px"}, 
    {NOTE: "D5", TOP: "-14px"}, {NOTE: "E5", TOP: "-22px"},
    {NOTE: "F5", TOP: "-30px"}, {NOTE: "G5", TOP: "-38px"}, 
    {NOTE: "A5", TOP: "-45px"}, {NOTE: "B5", TOP: "-53px"}, 
    {NOTE: "C6", TOP: "-60px"}
    ],

      F_KeyPos = [
    {NOTE: "C2", TOP: "64px"}, {NOTE: "D2", TOP: "56px"}, 
    {NOTE: "E2", TOP: "48px"}, {NOTE: "F2", TOP: "42px"}, 
    {NOTE: "G2", TOP: "34px"}, {NOTE: "A2", TOP: "26px"}, 
    {NOTE: "B2", TOP: "18px"}, {NOTE: "C3", TOP: "10px"}, 
    {NOTE: "D3", TOP: "2px"}, {NOTE: "E3", TOP: "-6px"}, 
    {NOTE: "F3", TOP: "-14px"}, {NOTE: "G3", TOP: "-22px"}, 
    {NOTE: "A3", TOP: "-30px"}, {NOTE: "B3", TOP: "-38px"}, 
    {NOTE: "C4", TOP: "-45px"}, {NOTE: "D4", TOP: "-53px"}, 
    {NOTE: "E4", TOP: "-60px"}
    ];


/*-- BUTTON GkOCT --*/ 
var GK_Oct = "Oct-All";
BttGk_Oct.addEventListener("click", () => {
  if(GK_Oct == "Oct-All"){
    GK_Oct = "Oct-Inf";
    BttGk_Oct.firstElementChild.classList.remove("icon-up");
    changeGKeyPent();
  } 
  else if(GK_Oct == "Oct-Inf"){
    GK_Oct = "Oct-Sup";
    BttGk_Oct.lastElementChild.classList.remove("icon-down");
    BttGk_Oct.firstElementChild.classList.add("icon-up");
    changeGKeyPent();
  } 
  else if(GK_Oct == "Oct-Sup"){
    GK_Oct = "Oct-All";
    BttGk_Oct.lastElementChild.classList.add("icon-down");
    changeGKeyPent();
  } 
});


var FK_Oct = "Oct-All";
BttFk_Oct.addEventListener("click", () => {
  if(FK_Oct == "Oct-All"){
    FK_Oct = "Oct-Inf";
    BttFk_Oct.firstElementChild.classList.remove("icon-up");
    changeFKeyPent();
  } 
  else if(FK_Oct == "Oct-Inf"){
    FK_Oct = "Oct-Sup";
    BttFk_Oct.lastElementChild.classList.remove("icon-down");
    BttFk_Oct.firstElementChild.classList.add("icon-up");
    changeFKeyPent();
  } 
  else if(FK_Oct == "Oct-Sup"){
    FK_Oct = "Oct-All";
    BttFk_Oct.lastElementChild.classList.add("icon-down");
    changeFKeyPent();
  } 
});

/*changeGKeyPent()*/
const changeGKeyPent = () =>{
/* Nota (position) */
  let TextNota = NoteGroup[iNote].charAt(0),
      N;
  const getNote = ({NOTE}) => {
          return NOTE.charAt(0) === TextNota.charAt(0);
        }
  /* Oct-ALL */
  if(GK_Oct == "Oct-All"){
    N = generRnmPos(G_KeyPos.filter(getNote));
  }
  /* Oct-INF */
  else if(GK_Oct == "Oct-Inf"){
    let G_KeyPosInf = G_KeyPos.slice(0,10);
    N = generRnmPos(G_KeyPosInf.filter(getNote));
  }
  /* Oct-SUP */
  else if(GK_Oct == "Oct-Sup"){
    let G_KeyPosSup = G_KeyPos.slice(9,17);
    N = generRnmPos(G_KeyPosSup.filter(getNote));
  }

/* PRINT NOTE */
  GKey_Nota.style.top = N.TOP;
  let iN = G_KeyPos.indexOf(N);

/*stick*/
  if(iN <= 8){
    GkN_StickUp.style.display = "block";
    GkN_StickDw.style.display = "none";
  }else{
    GkN_StickUp.style.display = "none";
    GkN_StickDw.style.display = "block";
  }
/*alteration*/
  let AltNota = NoteGroup[iNote].charAt(1);
  if(AltNota == "#"){
    GAlt_s.style.display = "inline-block";
    GAlt_b.style.display = "none";
  }else if(AltNota == "b"){
    GAlt_b.style.display = "inline-block";
    GAlt_s.style.display = "none";
  }else{
    GAlt_s.style.display = "none";
    GAlt_b.style.display = "none";
  } 
/*lines*/
  if(iN == 0||iN == 2||iN == 14||iN == 16) GkN_Hz.style.display = "block";
  else GkN_Hz.style.display = "none";
  if(iN == 0) GkP_Up2.style.display = "block";
  else GkP_Up2.style.display = "none";
  if(iN == 1) GkP_Up1.style.display = "block";
  else GkP_Up1.style.display = "none";
  if(iN == 15) GkP_Dw1.style.display = "block";
  else GkP_Dw1.style.display = "none";
  if(iN == 16) GkP_Dw2.style.display = "block";
  else GkP_Dw2.style.display = "none";
}


/*changeFKeyPent()*/
const changeFKeyPent = () =>{
/* Nota (position) */
  let TextNota = NoteGroup[iNote].charAt(0),
      N;
  const getNote = ({NOTE}) => {
          return NOTE.charAt(0) === TextNota.charAt(0);
        }
  /* Oct-ALL */
  if(FK_Oct == "Oct-All"){
    N = generRnmPos(F_KeyPos.filter(getNote));
  }
  /* Oct-INF */
  else if(FK_Oct == "Oct-Inf"){
    let F_KeyPosInf = F_KeyPos.slice(0,8);
    N = generRnmPos(F_KeyPosInf.filter(getNote));
  }
  /* Oct-SUP */
  else if(FK_Oct == "Oct-Sup"){
    let F_KeyPosSup = F_KeyPos.slice(7,17);
    N = generRnmPos(F_KeyPosSup.filter(getNote));
  }

/* PRINT NOTE */
  FKey_Nota.style.top = N.TOP;
  let iN = F_KeyPos.indexOf(N);

/*stick*/
  if(iN <= 8){
    FkN_StickUp.style.display = "block";
    FkN_StickDw.style.display = "none";
  }else{
    FkN_StickUp.style.display = "none";
    FkN_StickDw.style.display = "block";
  }
/*alteration*/
  let AltNota = NoteGroup[iNote].charAt(1);
  if(AltNota == "#"){
    FAlt_s.style.display = "inline-block";
    FAlt_b.style.display = "none";
  }else if(AltNota == "b"){
    FAlt_b.style.display = "inline-block";
    FAlt_s.style.display = "none";
  }else{
    FAlt_s.style.display = "none";
    FAlt_b.style.display = "none";
  }  
/*lines*/
  if(iN == 0||iN == 2||iN == 14||iN == 16) FkN_Hz.style.display = "block";
  else FkN_Hz.style.display = "none";
  if(iN == 0) FkP_Up2.style.display = "block";
  else FkP_Up2.style.display = "none";
  if(iN == 1) FkP_Up1.style.display = "block";
  else FkP_Up1.style.display = "none";
  if(iN == 15) FkP_Dw1.style.display = "block";
  else FkP_Dw1.style.display = "none";
  if(iN == 16) FkP_Dw2.style.display = "block";
  else FkP_Dw2.style.display = "none";
}
  

/*generRndmPos()*/
const generRnmPos = arr => {
  let i;
  arr.length>0
  ? i = Math.floor(Math.random() * arr.length)
  : i = 0;
  return arr[i];
}


