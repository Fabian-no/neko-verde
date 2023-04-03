
  
const Screen = document.getElementById("Screen"),

      BttStyle1 = document.getElementById("B-Style1"),
      BttStyle2 = document.getElementById("B-Style2"),
      BttStyle3 = document.getElementById("B-Style3"),

      BPlay = document.getElementById("B-Play"),
      TimerLbl = document.getElementById("Timer-label"),
      Menu = document.getElementById("Menu"); 

  var ElemDply_ON = document.getElementsByClassName("Display_ON"),
      ElemFyP_OFF = document.getElementsByClassName("b-FifthYPrev_OFF");


var StyleActive = "Style1";
/*-- B - STYLE 1 --*/
BttStyle1.addEventListener("click", () => {
  removeStyle2();
  removeStyle3();
  StyleActive = "Style1";
});  

/*-- B - STYLE 2 --*/
BttStyle2.addEventListener("click", () => {
  removeStyle3();
  addStyle2();
  StyleActive = "Style2";
});  

/*-- B - STYLE 3 --*/
BttStyle3.addEventListener("click", () => {
  removeStyle2();
  addStyle3();
  StyleActive = "Style3";
});  


/*addStyle2()*/
const addStyle2 = () =>{
/*principal*/
  document.body.classList.add("body2");
  Full.classList.add("Full2");
  Screen.classList.add("Screen2");
/*C-Top*/
  aBack.classList.add("icon-left2");
  BttStyle1.classList.remove("b-Style_ON");
  BttStyle2.classList.add("b-Style_ON");
  BttGkey.classList.add("b-Display2");
  BttFkey.classList.add("b-Display2");
  BttName.classList.add("b-Display2");
  for(var i=0; i<ElemDply_ON.length; i++){
    ElemDply_ON[i].classList.add("Display_ON2");
  }
/*screen*/
  Title.classList.add("title2");
  Grado.classList.add("Grado2");
  CDisplay.classList.add("C-Display2");
  Bar.classList.add("bar2");
/*controls*/
  BttRndm.classList.add("b-Rndm2");
  BttFifth.classList.add("b-Fifth2");
  TimerLbl.classList.add("timer-label2");
  BttCstm.classList.add("b-Cstm2");
  Timer.classList.add("timer2");
  BPlay.classList.add("b-Play2");
  BttPlayFwd.classList.add("b-PlayF2");
  BttPlayBwd.classList.add("b-PlayB2");
  BttPrev.classList.add("b-Prev2");
  BttNext.classList.add("b-Next2");
  for(var i=0; i<ElemFyP_OFF.length; i++){
    ElemFyP_OFF[i].classList.add("b-FifthYPrev_OFF2");
  }
/*menu*/
  BttMenu.classList.add("b-Menu2");
  Menu.classList.add("Menu2");
  Menu.firstElementChild.classList.add("h6_2");
  C_ul.classList.add("C-ul2");
/*prompt*/
  CPrompt.classList.add("C-Prompt2");
  CPrompt.firstElementChild.classList.add("Prompt2");
}


/*removeStyle2()*/
const removeStyle2 = () =>{
/*principal*/
  document.body.classList.remove("body2");
  Full.classList.remove("Full2");
  Screen.classList.remove("Screen2");
/*C-Top*/
  aBack.classList.remove("icon-left2");
  BttStyle2.classList.remove("b-Style_ON");
  BttStyle1.classList.add("b-Style_ON");
  BttGkey.classList.remove("b-Display2");
  BttFkey.classList.remove("b-Display2");
  BttName.classList.remove("b-Display2");
  for(var i=0; i<ElemDply_ON.length; i++){
    ElemDply_ON[i].classList.remove("Display_ON2");
  }
/*screen*/
  Title.classList.remove("title2");
  Grado.classList.remove("Grado2");
  CDisplay.classList.remove("C-Display2");
  Bar.classList.remove("bar2");
/*controls*/
  BttRndm.classList.remove("b-Rndm2");
  BttFifth.classList.remove("b-Fifth2");
  TimerLbl.classList.remove("timer-label2");
  BttCstm.classList.remove("b-Cstm2");
  Timer.classList.remove("timer2");
  BPlay.classList.remove("b-Play2");
  BttPlayFwd.classList.remove("b-PlayF2");
  BttPlayBwd.classList.remove("b-PlayB2");
  BttPrev.classList.remove("b-Prev2");
  BttNext.classList.remove("b-Next2");
  for(var i=0; i<ElemFyP_OFF.length; i++){
    ElemFyP_OFF[i].classList.remove("b-FifthYPrev_OFF2");
  }
/*menu*/
  BttMenu.classList.remove("b-Menu2");
  Menu.classList.remove("Menu2");
  Menu.firstElementChild.classList.remove("h6_2");
  C_ul.classList.remove("C-ul2");
/*prompt*/
  CPrompt.classList.remove("C-Prompt2");
  CPrompt.firstElementChild.classList.remove("Prompt2");
}



/*addStyle3()*/
const addStyle3 = () =>{
/*principal*/
  document.body.classList.add("body3");
  Full.classList.add("Full3");
  Screen.classList.add("Screen3");
/*C-Top*/
  aBack.classList.add("icon-left3");
  BttStyle1.classList.remove("b-Style_ON");
  BttStyle3.classList.add("b-Style_ON");
  BttGkey.classList.add("b-Display3");
  BttFkey.classList.add("b-Display3");
  BttName.classList.add("b-Display3");
  for(var i=0; i<ElemDply_ON.length; i++){
    ElemDply_ON[i].classList.add("Display_ON3");
  }
/*screen*/
  Title.classList.add("title3");
  Grado.classList.add("Grado3");
  CDisplay.classList.add("C-Display3");
  Bar.classList.add("bar3");
/*controls*/
  BttRndm.classList.add("b-Rndm3");
  BttFifth.classList.add("b-Fifth3");
  TimerLbl.classList.add("timer-label3");
  BttCstm.classList.add("b-Cstm3");
  Timer.classList.add("timer3");
  BPlay.classList.add("b-Play3");
  BttPlayFwd.classList.add("b-PlayF3");
  BttPlayBwd.classList.add("b-PlayB3");
  BttPrev.classList.add("b-Prev3");
  BttNext.classList.add("b-Next3");
  for(var i=0; i<ElemFyP_OFF.length; i++){
    ElemFyP_OFF[i].classList.add("b-FifthYPrev_OFF3");
  }
/*menu*/
  BttMenu.classList.add("b-Menu3");
  Menu.classList.add("Menu3");
  Menu.firstElementChild.classList.add("h6_3");
  C_ul.classList.add("C-ul3");
/*prompt*/
  CPrompt.firstElementChild.classList.add("Prompt3");
}


/*removeStyle3()*/
const removeStyle3 = () =>{
/*principal*/
  document.body.classList.remove("body3");
  Full.classList.remove("Full3");
  Screen.classList.remove("Screen3");
/*C-Top*/
  aBack.classList.remove("icon-left3");
  BttStyle3.classList.remove("b-Style_ON");
  BttStyle1.classList.add("b-Style_ON");
  BttGkey.classList.remove("b-Display3");
  BttFkey.classList.remove("b-Display3");
  BttName.classList.remove("b-Display3");
  for(var i=0; i<ElemDply_ON.length; i++){
    ElemDply_ON[i].classList.remove("Display_ON3");
  }
/*screen*/
  Title.classList.remove("title3");
  Grado.classList.remove("Grado3");
  CDisplay.classList.remove("C-Display3");
  Bar.classList.remove("bar3");
/*controls*/
  BttRndm.classList.remove("b-Rndm3");
  BttFifth.classList.remove("b-Fifth3");
  TimerLbl.classList.remove("timer-label3");
  BttCstm.classList.remove("b-Cstm3");
  Timer.classList.remove("timer3");
  BPlay.classList.remove("b-Play3");
  BttPlayFwd.classList.remove("b-PlayF3");
  BttPlayBwd.classList.remove("b-PlayB3");
  BttPrev.classList.remove("b-Prev3");
  BttNext.classList.remove("b-Next3");
  for(var i=0; i<ElemFyP_OFF.length; i++){
    ElemFyP_OFF[i].classList.remove("b-FifthYPrev_OFF3");
  }
/*menu*/
  BttMenu.classList.remove("b-Menu3");
  Menu.classList.remove("Menu3");
  Menu.firstElementChild.classList.remove("h6_3");
  C_ul.classList.remove("C-ul3");
/*prompt*/
  CPrompt.firstElementChild.classList.remove("Prompt3");
}

// addStyle3();



/* PRECARGAR IMÁGEN */ 
  Img = new Image();
  Img.src = "img/vintage_paper.jpg";

