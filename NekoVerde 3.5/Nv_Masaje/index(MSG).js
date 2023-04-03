document.addEventListener("DOMContentLoaded", function(){
  
/* -- MENU -- */  
  $(window).on("resize", () => {
    if(window.innerWidth < 900){
      $(".C-ul").css("display", "none");
    }else{
      $(".C-ul").css("display", "block");
    } 
  });
  /* b-Menu */
  $(".b-Menu").on("click", (e) =>{
    e.preventDefault();
    $(".C-ul").slideToggle();
  });

  
  $(window).on("scroll", () => {
    let WinScroll = $(window).scrollTop();
    if(window.innerWidth < 768){
      if(WinScroll < 50) $("nav").removeClass("navTransp");
      else $("nav").addClass("navTransp");
    }else{
      if(WinScroll < 60) $("nav").removeClass("navTransp");
      else $("nav").addClass("navTransp");
    }
  });



/* -- Yin & Yang -- */
  /* 5 elementos */
  let element = 1;
  $(".elem1").click(function(){
    if(window.innerWidth < 1024){
      $(".C-elem").css("transform", "rotate(360deg)");
      $(".elem").css("transform", "rotate(-360deg)");
    }else{
      $(".C-elem").css("transform", "rotate(90deg)");
      $(".elem").css("transform", "rotate(-90deg)");
    }  
    $(".C-elem-Text").css("background-color", "#e0c8c8");
    element = 1;
    $(".elem-txt").fadeOut();
    setTimeout(() => {
      $(".elem1-txt").fadeIn();
    }, 400);
  });

  $(".elem5").click(function(){
    if(window.innerWidth < 1024){
      $(".C-elem").css("transform", "rotate(72deg)");
      $(".elem").css("transform", "rotate(-72deg)");
    }else{
      $(".C-elem").css("transform", "rotate(162deg)");
      $(".elem").css("transform", "rotate(-162deg)");
    }  
    $(".C-elem-Text").css("background-color", "#cae0c8");
    element = 5;
    $(".elem-txt").fadeOut();
    setTimeout(() => {
      $(".elem5-txt").fadeIn();
    }, 400);
  });

  $(".elem4").click(function(){
    if(window.innerWidth < 1024){
      $(".C-elem").css("transform", "rotate(144deg)");
      $(".elem").css("transform", "rotate(-144deg)");
    }else{
      $(".C-elem").css("transform", "rotate(234deg)");
      $(".elem").css("transform", "rotate(-234deg)");
    }
    $(".C-elem-Text").css("background-color", "#ccd9e7");
    element = 4;
    $(".elem-txt").fadeOut();
    setTimeout(() => {
      $(".elem4-txt").fadeIn();
    }, 400);
  });
  

  $(".elem3").click(function(){
    if(window.innerWidth < 1024){
      $(".C-elem").css("transform", "rotate(216deg)");
      $(".elem").css("transform", "rotate(-216deg)");
    }else{
      $(".C-elem").css("transform", "rotate(306deg)");
      $(".elem").css("transform", "rotate(-306deg)");
    }
    $(".C-elem-Text").css("background-color", "#e9e9e9");
    element = 3;
    $(".elem-txt").fadeOut();
    setTimeout(() => {
      $(".elem3-txt").fadeIn();
    }, 400);
  });

  $(".elem2").click(function(){
    if(window.innerWidth < 1024){
      $(".C-elem").css("transform", "rotate(288deg)");
      $(".elem").css("transform", "rotate(-288deg)");
    }else{
      $(".C-elem").css("transform", "rotate(378deg)");
      $(".elem").css("transform", "rotate(-378deg)");
    }
    $(".C-elem-Text").css("background-color", "#f0ebc8");
    element = 2;
    $(".elem-txt").fadeOut();
    setTimeout(() => {
      $(".elem2-txt").fadeIn();
    }, 400);
  });



    
  if(window.innerWidth < 1024){
    $(".C-elem").css("transform", "rotate(360deg)");
    $(".elem").css("transform", "rotate(-360deg)");
  }else{
    $(".C-elem").css("transform", "rotate(450deg)");
    $(".elem").css("transform", "rotate(-450deg)");
  }

  $(window).on("resize", () => {
    if(window.innerWidth < 1024){
      if(element == 1){
        $(".C-elem").css("transform", "rotate(360deg)");
        $(".elem").css("transform", "rotate(-360deg)");
      }else if(element == 5){
        $(".C-elem").css("transform", "rotate(72deg)");
        $(".elem").css("transform", "rotate(-72deg)");
      }else if(element == 4){
        $(".C-elem").css("transform", "rotate(144deg)");
        $(".elem").css("transform", "rotate(-144deg)");
      }else if(element == 3){
        $(".C-elem").css("transform", "rotate(216deg)");
        $(".elem").css("transform", "rotate(-216deg)");
      }else if(element == 2){
        $(".C-elem").css("transform", "rotate(288deg)");
        $(".elem").css("transform", "rotate(-288deg)");
      }
    }else{
      if(element == 1){
        $(".C-elem").css("transform", "rotate(450deg)");
        $(".elem").css("transform", "rotate(-450deg)");
      }else if(element == 5){
        $(".C-elem").css("transform", "rotate(162deg)");
        $(".elem").css("transform", "rotate(-162deg)");
      }else if(element == 4){
        $(".C-elem").css("transform", "rotate(234deg)");
        $(".elem").css("transform", "rotate(-234deg)");
      }else if(element == 3){
        $(".C-elem").css("transform", "rotate(306deg)");
        $(".elem").css("transform", "rotate(-306deg)");
      }else if(element == 2){
        $(".C-elem").css("transform", "rotate(378deg)");
        $(".elem").css("transform", "rotate(-378deg)");
      }
    }  
  });



/* -- Tratamientos -- */
  $(".SecName").on("click", function(e){
    e.preventDefault();
    if(window.innerWidth < 768){
      $([document.documentElement, document.body]).animate({
          scrollTop: $($(this).attr("href").slice(0,5)).offset().top-30
      }, 1500);
    }else{
      $([document.documentElement, document.body]).animate({
          scrollTop: $($(this).attr("href").slice(0,5)).offset().top-50
      }, 1500);
    }
  });
  $("h2 .icon-up").on("click", function(e){
    e.preventDefault();
    if(window.innerWidth < 768){
      $([document.documentElement, document.body]).animate({
          scrollTop: $(".SecNav").offset().top-50
      }, 1500);
    }else{
      $([document.documentElement, document.body]).animate({
          scrollTop: $(".SecNav").offset().top-60
      }, 1500);
    }
  });



  /* getUrl() */
  const getUrl = () => {
    return window.location.search.substring(1);
  }

  const ArrLinks = document.getElementsByTagName("a");
  const setLinks = idioma =>{
    for(let k=0; k<ArrLinks.length; k++){
      let hRef = ArrLinks[k].getAttribute("href");
      if(hRef == "../index.html") ArrLinks[k].setAttribute("href", hRef+"?S3&"+idioma);
      else ArrLinks[k].setAttribute("href", hRef+"?"+idioma);
    }
  }
  setLinks(getUrl());
  
 
  //final
})

