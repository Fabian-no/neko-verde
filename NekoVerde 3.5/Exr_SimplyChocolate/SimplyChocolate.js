
document.addEventListener("DOMContentLoaded", function(){
  const TopHalf = document.getElementById("Top-half"),
        B_Prev = document.getElementById("B-Prev"),
        B_Next = document.getElementById("B-Next"),
        C_Botones = document.getElementById("C-botones");

  const Choco = document.getElementsByClassName("choco"), 
        Fondo = document.getElementsByClassName("fondo"),
        Text = document.getElementsByClassName("text");           


  var Capas = [
  {"bg_color": "linear-gradient(to right, #4b0a0a, #915959)"},
  {"bg_color": "linear-gradient(to right, #4b1550, #a21eae)"},
  {"bg_color": "linear-gradient(to right, #153161, #0948b5)"}
  ];


  /* BOTONES */   
  C_Botones.addEventListener("click", function (e){
    var Boton = e.target;
    if(Boton == B_Next) goNext()
    else if(Boton == B_Prev)goPrev()
    else return
  })


  /* WHEEL */
  var Trans = false;
  document.addEventListener("wheel", function(e){
    var wheel_var = parseInt(e.deltaY); 
    if(Trans) return
    if(wheel_var > 0){
      goNext();
      Trans = true;
    } 
    else{
      goPrev();
      Trans = true;
    }
    setTimeout(function(){Trans = false}, 500); 
  });



  /* GO NEXT y GO PREV*/
  var i = 0;
  goNext = () =>{
    if(i < 2){
      Choco[i].style.top = "calc(-20% - 9vw)";
      Fondo[i].style.top = "-100vh";
      Text[i].style.top = "-5vh";
      Text[i].style.opacity = "0";
    } 
    if(i >= 2) return;
    i++;
    TopHalf.style.background = Capas[i].bg_color;
    Choco[i].style.top = "calc(50% - 9vw)";
    Fondo[i].style.top = "0";
    Text[i].style.top = "10vh";
    Text[i].style.opacity = "1";
  }

  goPrev = () =>{
    if(i > 0){
      Choco[i].style.top = "calc(120% - 9vw)";
      Fondo[i].style.top = "100vh";
      Text[i].style.top = "25vh";
      Text[i].style.opacity = "0";
    } 
    if(i <= 0) return;
    i--;
    TopHalf.style.background = Capas[i].bg_color;
    Choco[i].style.top = "calc(50% - 9vw)";
    Fondo[i].style.top = "0";
    Text[i].style.top = "10vh";
    Text[i].style.opacity = "1";
  }

  /* MOVER FONDO */
  setInterval(function(){
    var posY = parseInt(Fondo[i].style.backgroundPositionY);
    Fondo[i].style.backgroundPositionY = posY-1+"px";
  }, 50);
 

  //final
});