document.addEventListener("DOMContentLoaded", function(){
 

/* --- LOGO 1 --- */
  $(window).on("resize", () => {
    Logo1();
  });

  let LogoSize;
  const Logo1 = () =>{
    if(LogoSize == undefined){
      if($(window).width() >= 768){
        $("#Logo1").html("Neko{<span>verde</span>}"); LogoSize = 2;}
      else{$("#Logo1").html("N{<span>v</span>}"); LogoSize = 1;}  
    }else{
      if($(window).width() >= 768) $("#Logo1").html('Neko{<span style="width: 228px; opacity: 1">verde</span>}');
      else $("#Logo1").html('N{<span style="width: 45px; opacity: 1">v</span>}');} 
  }
  Logo1();

  /*Intro*/
  $("#Logo1").animate(
    {opacity: "1", left: "0"}
  , 2000, () =>{
    LogoSize === 1
    ? $("#Logo1 span").animate({width: "45px", opacity: "1"}, 800)
    : $("#Logo1 span").animate({width: "228px", opacity: "1"}, 1500);
  });
  


/* --- MOVING THROUGH SECTIONS --- */
  const Section = document.getElementsByTagName("section");    
  /* b-UP y b-DW */
  $(".b-UP").on("click", () => {
    goPrev();
  });
  $(".b-DW").on("click", () => {
    goNext();
  });


  /* SCROLL */
  var i = 0;
  let ReachBot = false,
      ReachTop = true;
      goNextOn = false;
  for(let i=0; i<Section.length; i++){
    Section[i].addEventListener("scroll", () => {
      let Sec_Hgt = Section[i].scrollHeight,
          Sec_ScrT = Section[i].scrollTop,
          Wnd_Hgt = window.innerHeight; 
  /* Scroll DOWN */  
      /*Section1*/
      if(Section[i].id == "S1" &&  Sec_ScrT >2 && goNextOn === false){
          goNext();
          ReachTop = false;
        }
      /*rest of Sections*/
      else if(Section[i].id != "S1" && Wnd_Hgt + Sec_ScrT <= Sec_Hgt-7) ReachBot = false;
      else if(Section[i].id != "S1" && Wnd_Hgt + Sec_ScrT >= Sec_Hgt-5 && ReachBot === false){
        Section[i].scrollTo(0, Sec_Hgt - Wnd_Hgt -5);
        setTimeout(()=>{ReachBot = true;}, 600);
      }
      else if(Section[i].id != "S1" && Wnd_Hgt + Sec_ScrT >= Sec_Hgt-2 && ReachBot === true && goNextOn === false){
        goNext();
        ReachTop = true;
      }  
      
  /* Scroll UP */      
      if(Sec_ScrT >= 7) ReachTop = false;
      else if(Sec_ScrT === 0 && ReachTop === false){
         if(Section[i].id == "S1"){
          Section[i].scrollTo(0, 2);
          ReachTop = true;
        }else{
          Section[i].scrollTo(0, 5);
          setTimeout(()=>{ReachTop = true;}, 300);
        }  
      }
      else if(Sec_ScrT === 0 && ReachTop === true){
        goPrev();
        ReachTop = true;
        if(Section[i].id == "S1" ) ReachBot = true;
      } 
    });
  }

/* -- goNext() -- */
  const goNext = steps =>{
    $(Section[i]).animate({top: "-100vh"}, 700);
    if(steps === 2) fastNext(i, Section);
    if(steps === 3) {fastNext(i, Section); fastNext(i, Section);}
    sendFirstToBottom(i, Section);
    i++;
    if(i >= Section.length) i = 0;
    $(Section[i]).animate({top: "0vh"}, 700);
    Section[i].scrollTo(0, 2);
    /* goNextON */
    ReachBot = false;
    goNextOn = true;
    setTimeout(()=>{goNextOn = false;}, 1000);

    /* anim parts */
    let SecParts = Section[i].firstElementChild.children;
    for(let j=0, t=800; j<SecParts.length; j++, t+=100){
      SecParts[j].animate([
        {top: "20vh", opacity: '0'}, 
        {top: "0px", opacity: '1'}
      ], t);
    }
    /* URL */
    let newUrl = getUrl().replace(/\d/, i+1);
    history.replaceState(stateObj, "", "index.html?"+newUrl);
    /* menu */
    setMenuFocus(getUrl());
    menuColor(i);
  }
/*fastNext()*/
  const fastNext = (index, arr) =>{
    sendFirstToBottom(index, arr);
    i++;
    if(i >= arr.length) i = 0;
    arr[i].style.top = "-100vh";
    return i; 
  }  
/*sendFirstToBottom()*/
  const sendFirstToBottom = (index, arr) =>{
    let iPrev = index-1;
    if(index == 0) iPrev = arr.length-1;
    arr[iPrev].style.top = "100vh";
  }


/* -- goPrev() -- */  
  const goPrev = steps =>{
    $(Section[i]).animate({top: "100vh"}, 700);
    if(steps === 2) fastPrev(i, Section);
    if(steps === 3) {fastPrev(i, Section); fastPrev(i, Section);}
    i--;
    if(i < 0) i = Section.length-1;
    sendLastToTop(i, Section);
    $(Section[i]).animate({top: "0vh"}, 700);
    Section[i].scrollTo(0, 2);
    /* anim parts */
    let SecParts = Section[i].firstElementChild.children;
    for(let j=5, t=600; j>=0; j--, t+=100){
      SecParts[j].animate([
        {top: "20vh", opacity: '0'}, 
        {top: "0px", opacity: '1'}
      ], t);
    }
    /* URL */
    let newUrl = getUrl().replace(/\d/, i+1);
    history.replaceState(stateObj, "", "index.html?"+newUrl);
    /* menu */
    setMenuFocus(getUrl());
    menuColor(i);
  }
/*fastPrev()*/
  const fastPrev = (index, arr) =>{
    i--;
    if(i < 0) i = arr.length-1;
    sendLastToTop(index, arr);
    arr[i].style.top = "100vh";
    return i;
  }
/*sendLastToTop()*/  
  const sendLastToTop = (index, arr) =>{
    let iPrev = index-1;
    if(index == 0) iPrev = arr.length-1;
    arr[iPrev].style.top = "-100vh";
  }





/* --- HORIZONTAL MOVEMENT (PARTS) --- */
  let Movibles = $(".MOVE");
      ArrDir = [],
      ArrDirON = [],
      ArrPos = [];
      contBoxSm = 1;
  
  /* setArrDir() */
  const setArrDir = (arr) =>{
    for(let j=0; j<arr.length; j++){
      ArrDirON.push(false);

      if(j%2 != 0 && !$(arr[j]).attr("class").includes("BoxSm")) ArrDir.push("right");
      else if (j%2 == 0 && !$(arr[j]).attr("class").includes("BoxSm")) ArrDir.push("left");
      
      if($(arr[j]).attr("class").includes("BoxSm")){
        if(contBoxSm == 3||contBoxSm == 4) ArrDir.push("right");
        else ArrDir.push("left");
        contBoxSm++;
      }
    }
  }  
  /* moveParts() */
  const moveParts = (arr) =>{
    for(let j=0; j<arr.length; j++){
      let posX = parseFloat(arr[j].style.transform.replace(/[^\d-.]/g, ''));
      ArrPos[j] = posX;
      
    /* going RIGHT */
      if(ArrPos[j] >= 2 && ArrDirON[j] === false){
        let RndmDir = getRndmDir();
        if(RndmDir === 0){ArrDir[j] = "left"; ArrDirON[j] = true;}
      }
    /* going LEFT */
      if(ArrPos[j] <= -2 && ArrDirON[j] === false){
        let RndmDir = getRndmDir();
        if(RndmDir === 0){ArrDir[j] = "right"; ArrDirON[j] = true;}
      }
      if(ArrPos[j] < 1 || ArrPos[j] > -1) ArrDirON[j] = false;
      if(ArrPos[j] >= 3) {ArrDir[j] = "left"; ArrDirON[j] = true; }
      if(ArrPos[j] <= -3) {ArrDir[j] = "right"; ArrDirON[j] = true;}
    /* set new Pos */
      if(ArrDir[j] == "right") arr[j].style.transform = "translateX("+(ArrPos[j]+0.02)+"%)";
      if(ArrDir[j] == "left") arr[j].style.transform = "translateX("+(ArrPos[j]-0.02)+"%)";
    }
  }
  
  /* getRndmDir() */
  const getRndmDir = () => {
    return Math.floor(Math.random() * 50);
  } 

/* Set Movement */
  setArrDir(Movibles);
  setInterval( () => {moveParts(Movibles)}, 80);
 


/* --- MENU --- */
  const ArrLi = $(".Menu li");
  /* b-Menu */
  $(".b-Menu").on("click", () => {
     $(".C-Menu").fadeIn();
    for(let j=0; j<ArrDir.length; j++){
      setTimeout(() => {
        $(ArrLi[j]).animate(
          {opacity: "1", left: "0"}
        , 500);
      }, j*200);
    }
  });

  /* b-MenuX */
  $(".b-MenuX").on("click", () =>{
    $(".C-Menu").fadeOut();
    $(".Menu li").css({"opacity": "0", "left": "-10%"});
  });



  /* setMenuFocus() - at goNext() y goPrev() */
  const setMenuFocus = (Section) =>{
    let x = Section.charAt(1);
    $(".Menu li span").css("transform"," scale(1)");
    $(".Menu li:nth-child("+x+") span").css("transform"," scale(1.2)");
  }
  
  /* links Menu */
  $(".Menu>li>span").on("click", (e) =>{
    let dataSec = $(e.target).attr("data-Sec"),
        currSec = getUrl().charAt(1),
        goToSec = dataSec - currSec;
    if(goToSec === -3) goPrev(3);
    else if(goToSec === -2) goPrev(2); 
    else if(goToSec === -1) goPrev();
    else if(goToSec === 1) goNext();
    else if(goToSec === 2) goNext(2);  
    else if(goToSec === 3) goNext(3);
    if(window.innerWidth < 1200){
      $(".C-Menu").fadeOut();
      $(".Menu li").css({"opacity": "0", "left": "-10%"});
    }
  });

  /* menuColor() */
  const menuColor = i =>{
    if(i == 0) $(".C-Menu").css("backgroundColor", "#dddcdc");
    else if(i == 1) $(".C-Menu").css("backgroundColor", "#ebc8a1");
    else if(i == 2) $(".C-Menu").css("backgroundColor", "#9bb2cc");
    else if(i == 3) $(".C-Menu").css("backgroundColor", "#a2c996");
  }



/* --- LINK URL (SECTION y LANGUAGE) --- */
  var Textos = {
    en: {
      Mn_1: "HOME",
      Mn_2: "GAMES & APPs",
      Mn_3: "WEB PAGES",
      Mn_4: "ABOUT ME",

      S2_Tit: "GAMES & APPs", 
      S2_Sub_NnS: "Shooting Game<br>(keyboard needed to play)",
      S2_Sub_MnC: "Casual Game<br>Interactive Animations",
      S2_Sub_TN: "Music Training App",
      S2_Sub_Pzz: "Jigsaw Puzzle Game",

      S3_Tit: "WEB PAGES",
      S3_SubTit1: "Original Work",
      S3_Sub_MSG: "Full Web Page",
      S3_Sub_GRD: "Full Web Page",

      S3_SubTit2: "Some Exercising",
      S3_SubTit2_Sub: "Some of the samples I made while learning different languages. Content and style have been taken from other webs.",

      S4_Tit: "ABOUT ME",
      S4_About1: 'My name is Fabián. I was born and raised in Montevideo, Uruguay, and have been living in Madrid for more than ten years. In october 2018 I decided to turn my professional life around and dive into the world of Web Development.',
      S4_About2: 'Neko Verde ("cat" in japanese, "green" in spanish) is a proyect driven by the need to carry out my ideas and give shape to my passions, merge creativity, style and functionality, drawing all of it with code.',

     
      S4_Tit2: "Contact",
      S4_Contact: "Contact with me through the following form.",
      S4_Confirm: "Message sent. Thanks for contacting with me!",

      S4_Frm1: "Name",
      S4_Frm3: "Subject",
      S4_Frm4: "Your message",
      S4_Frm5: "SEND",
    },
    es: {
      Mn_1: "INICIO",
      Mn_2: "JUEGOS & APPs",
      Mn_3: "PÁGINAS WEB",
      Mn_4: "SOBRE MÍ",

      S2_Tit: "JUEGOS & APPs", 
      S2_Sub_NnS: "Juego de Disparar<br>(necesitas teclado para poder jugar)",
      S2_Sub_MnC: "Juego Casual<br>Animaciones Interactivas",
      S2_Sub_TN: "App de Entrenamiento Musical",
      S2_Sub_Pzz: "Juego de Rompecabezas",

      S3_Tit: "PÁGINAS WEB",
      S3_SubTit1: "Trabajos Originales",
      S3_Sub_MSG: "Web Completa",
      S3_Sub_GRD: "Web Completa",

      S3_SubTit2: "Un Poco De Prácticas",
      S3_SubTit2_Sub: "Algunos de los ejercicios que realicé para aprender los diferentes lenguajes. El contenido y los estilos son sacados de otras web.",

      S4_Tit: "SOBRE MÍ",
      S4_About1: 'Mi nombre es Fabián, nací y crecí en Montevideo, Uruguay, y llevo más de quince años pisando suelo madrileño. En 2018 decidí dar un giro profesional a mi vida y adentrarme en el mundo de la Programación (Front y Back).',
      S4_About2: 'Neko ("gato" en japonés) Verde es un proyecto que nace de la necesidad de desarrollar mis ideas y plasmar mis pasiones, fusionando creatividad, estilo y funcionalidad, y expresarlas en píxeles a través de los conocimientos adquiridos.',

      S4_Tit2: "Contacto",
      S4_Contact: "Contacta conmigo a través del siguiente formulario.",
      S4_Confirm: "Mensaje enviado. ¡Gracias por contactar conmigo!",

      S4_Frm1: "Nombre",
      S4_Frm3: "Asunto",
      S4_Frm4: "Mensaje",
      S4_Frm5: "ENVIAR",
    }
  }

  /* b-IDIOM */
  $(".EN").on("click",function(){
    setIdioma("en");
    setLinks("en");
    let newUrl = getUrl().replace(/es/, "en");
    history.replaceState(stateObj, "", "index.html?"+newUrl);
  });
  $(".ES").on("click",function(){
    setIdioma("es");
    setLinks("es");
    let newUrl = getUrl().replace(/en/i, "es");
    history.replaceState(stateObj, "", "index.html?"+newUrl);
  });


  /* setIdioma() */
  const ArrTXT = document.getElementsByClassName("TXT");
  const ArrTXT_Val = document.getElementsByClassName("TXT-Val");
  const setIdioma = idioma =>{
    for(let k=0; k<ArrTXT.length; k++){
      let data_TXT = ArrTXT[k].getAttribute("data-TXT");
      $(ArrTXT[k]).html(Textos[idioma][data_TXT]);
    }
    for(let k=0; k<ArrTXT_Val.length; k++){
      let data_TXT = ArrTXT_Val[k].getAttribute("data-TXT");
      if($(ArrTXT_Val[k]).attr("placeholder") != undefined){
        $(ArrTXT_Val[k]).attr("placeholder", Textos[idioma][data_TXT]);
      }else $(ArrTXT_Val[k]).attr("value", Textos[idioma][data_TXT]);
      
    }

    if(idioma == "en"){
      $(".ES").css("transform"," scale(1)");
      $(".EN").css("transform"," scale(1.2)");
    }else{
      $(".EN").css("transform"," scale(1)");
      $(".ES").css("transform"," scale(1.2)");
    }
  }
  
  /* setLinks() */  
  const ArrLinks = document.getElementsByTagName("a");
  const setLinks = idioma =>{
    /* links hasta beModel */
    for(let k=0; k<= 5; k++){
      let hRef = ArrLinks[k].getAttribute("href");
      let hRefSplit = hRef.split("?")
      hRef = hRefSplit[0]+"?";
      if(hRefSplit[1] != undefined && hRefSplit[1].includes("&")){
        let num = hRefSplit[1].match(/\d+/)[0]
        ArrLinks[k].setAttribute("href", hRef+idioma+"&"+num);
      } 
      else ArrLinks[k].setAttribute("href", hRef+idioma);
    }
  }
  

/* --- GET URL  --- */
  var stateObj = { foo: "bar" };

  /*getUrl()*/
  const getUrl = () => {
    return window.location.search.substring(1);
  }

  /* display inicial */
  const initialDisplay = (url) => {
    if(url == ""){
      if(window.navigator.language.includes("es")){
        history.replaceState(stateObj, "", "index.html?S1&es");
      }else{
        history.replaceState(stateObj, "", "index.html?S1&en"); 
      }
    }
    Section[i].scrollTo(0, 1);
  }
  initialDisplay(getUrl());
  
  /*setDisplay() - for the reload and button back*/
  function setDisplay(url){
    if(url.includes("S2")) goNext();
    else if(url.includes("S3")) goNext(2);
    else if(url.includes("S4")) goNext(3);
    if(url.includes("en")){
      setLinks("en");
      setIdioma("en");
    }else if(url.includes("es")){
      setLinks("es");
      setIdioma("es");
    }
  }
  
  /*for the reload and button back*/
  setDisplay(getUrl());
  setMenuFocus(getUrl());
  
  

/* Formulario - on submit */
  $("form").submit(() =>{
    return validarForm();
  });

  /*validarForm()*/
  const validarForm = () =>{
  /*Validar nombre*/
    let nombreVal = $('#nombre').val();
    if(nombreVal == ''){
      $('#nombre').css('borderColor','#d47d7d');
      return false;
    }else{
      $('#nombre').css('borderColor','transparent');
    }

  /*Validar mail*/
    let emailVal = $('#email').val();
    let patMail = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/;
    let result = patMail.test(emailVal);
    if(!result){
      $('#email').css('borderColor','#d47d7d');
      return false;
    }else{
      $('#email').css('borderColor','transparent');
    }
    
    /*Validar asunto*/
    let asuntoVal = $('#asunto').val();
    if(asuntoVal == ''){
      $('#asunto').css('borderColor','#d47d7d');
      return false;
    }else{
      $('#asunto').css('borderColor','transparent');
    }

    /*Validar mensaje*/
    let mensajeVal = $('#mensaje').val();
    if(mensajeVal == ''){
      $('#mensaje').css('borderColor','#d47d7d');
      return false;
    }else{
      $('#mensaje').css('borderColor','transparent');
    }

    /* Confirmación de envío */
    $(".Confirm").slideDown(500);
    setTimeout(() => {
      $("#nombre, #email, #asunto, #mensaje").val("");
      $(".Confirm").slideUp(500);
    }, 10000);

    return true;
  };
  
  



/* --- PHOTO SLIDERS --- */  
/* load initial image of slider */
  const loadInitial = (arrSrc, box, cont) =>{
    if(cont >= arrSrc.length) return;
		let Img = $("<div></div>")
    $(Img).attr("class","Img");
    $(Img).css("background-image","url("+arrSrc[cont]+")");
    $(box+" .Slider").append(Img);
  }

/* load rest of the images */  
  const loadImg = (arrSrc, box, cont) =>{
    if(cont >= arrSrc.length) return;
		let Img = $("<div></div>")
    $(Img).attr("class","Img");
    $(Img).css("background-image","url("+arrSrc[cont]+")");
    $(box+" .Slider").children().last().before(Img);;
  }
/* change image */
  const slider = (arrSrc, box, cont) =>{
    $(box+" .Slider").children().last().fadeOut(2000, () =>{
      $(box+" .Slider").children().first().before($(box+" .Slider").children().last()).show();
      loadImg(arrSrc, box, cont);
      if(arrSrc == SrcMidori) setMidori();
    });
  }

/* set link Midori No Cat */
  const setMidori = () => {
    let imgUrl = $("#Midori .Slider").children().last().css("backgroundImage").split("img");
    let imgNum = parseInt(imgUrl[1].match(/\d+/)[0]);
    let hRefMidori = $(".b-Midori").attr("href").split("&");
    $(".b-Midori").attr("href", hRefMidori[0]+"&"+imgNum)
  }

/* random number (arr.lenght)*/
  const getRandomNum = arr => {
    return Math.floor(Math.random() * arr.length);
  }

/* Sliders */
  /* MidoriNoCat */
  const SrcMidori = [
    "Nv_MidoriNoCat/img/pic01.jpeg",
    "Nv_MidoriNoCat/img/pic02.jpeg",
    "Nv_MidoriNoCat/img/pic04.jpeg",
    "Nv_MidoriNoCat/img/pic07.jpeg",
    "Nv_MidoriNoCat/img/pic10.jpeg",
    "Nv_MidoriNoCat/img/pic11.jpeg"];
  let contMidori = 0;

  let firstPicMnC = getRandomNum(SrcMidori);
  let arr1MnC = SrcMidori.slice(0,firstPicMnC)
  let arr2MnC = SrcMidori.slice(firstPicMnC,6)
  const SrcMidoriRndm = arr2MnC.concat(arr1MnC);


  const MidoriNoCat = () =>{
    loadInitial(SrcMidoriRndm, "#Midori", contMidori);
    contMidori++;
    loadImg(SrcMidoriRndm, "#Midori", contMidori);
    contMidori++;
    setMidori();
    setTimeout(() => {
      setInterval( () =>{
        slider(SrcMidoriRndm, "#Midori", contMidori);
        contMidori++;}, 7000)
    }, 2000);
  }
  MidoriNoCat();
  
  /* Puzzles */
  const SrcPuzzle = [
    "img/Nv-Puzzles1.jpg",
    "img/Nv-Puzzles2.jpg",
    "img/Nv-Puzzles3.jpg",
    "img/Nv-Puzzles4.jpg"];
  let contPuzzle = 0;

  let firstPicPzz = getRandomNum(SrcPuzzle);
  let arr1Pzz = SrcPuzzle.slice(0,firstPicPzz)
  let arr2Pzz = SrcPuzzle.slice(firstPicPzz,6)
  const SrcPuzzleRndm = arr2Pzz.concat(arr1Pzz);

  const Puzzles = () =>{
    loadInitial(SrcPuzzleRndm, "#Puzzles", contPuzzle);
    contPuzzle++;
    loadImg(SrcPuzzleRndm, "#Puzzles", contPuzzle);
    contPuzzle++;
    setInterval( () =>{
      slider(SrcPuzzleRndm, "#Puzzles", contPuzzle);
      contPuzzle++;
    }, 7000);
  }
  Puzzles();

  
  
 
 
  //final
})

