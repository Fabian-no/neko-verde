$(document).on('ready', function(){  
/*scroll*/
  $(window).on('scroll', function(){
    var altoScroll = $(window).scrollTop();
  /*scroll - Nav-T*/
    if(altoScroll>80){
      $('.Nav-T').addClass('nav-scroll');
      $('.CF-Resp, .PrS1-Wrap').css('marginTop','80px');
      $('.Boton-T, .Boton-R').addClass('botones-scroll');
      $('.Logo').addClass('logo-scroll');
      $('.Menu-R').css('paddingTop','60px');
    }else{
      $('.Nav-T').removeClass('nav-scroll');
      $('.CF-Resp, .PrS1-Wrap').css('marginTop','0px');
      $('.Boton-T, .Boton-R').removeClass('botones-scroll');
      $('.Logo').removeClass('logo-scroll');
      if($(window).width() >= 767){
        $('.Menu-R').css('paddingTop','80px');
      }else{
        $('.Menu-R').css('paddingTop','60px');
      }  
    }


  /*2-Proyects - scroll*/
    if($(".Pr-F1").length != 0){
      var PrF1 = $(".Pr-F1").offset().top;
      var PrF2 = $(".Pr-F2").offset().top;
      var PrF3 = $(".Pr-F3").offset().top;
      var PrF4 = $(".Pr-F4").offset().top;

      var PrF1Rel;
      var PrF2Rel;
      var PrF3Rel;
      var PrF4Rel;
      
      if($(window).height() <= 480){
        PrF1Rel = PrF1 - 200;
        PrF2Rel = PrF2 - 200;
        PrF3Rel = PrF3 - 200;
        PrF4Rel = PrF4 - 200;
      }else{
        PrF1Rel = PrF1 - 400;
        PrF2Rel = PrF2 - 400;
        PrF3Rel = PrF3 - 400;
        PrF4Rel = PrF4 - 400;
      }  
      

      if(altoScroll >= PrF1Rel){
        $('.Pr-F1>a>.Tapa').addClass('tapaOn');
        $('.Pr-F1>a>.Name').addClass('nameOn');
        $('.Pr-F1>a>.Name>hr').addClass('rayaOn');
      }
      if(altoScroll >= PrF2Rel){
        $('.Pr-F1>a>.Tapa').removeClass('tapaOn');
        $('.Pr-F1>a>.Name').removeClass('nameOn');
        $('.Pr-F1>a>.Name>hr').removeClass('rayaOn');
        $('.Pr-F2>a>.Tapa').addClass('tapaOn');
        $('.Pr-F2>a>.Name').addClass('nameOn');
        $('.Pr-F2>a>.Name>hr').addClass('rayaOn');
      }
      else{
        $('.Pr-F2>a>.Tapa').removeClass('tapaOn');
        $('.Pr-F2>a>.Name').removeClass('nameOn');
        $('.Pr-F2>a>.Name>hr').removeClass('rayaOn');
      }
      if(altoScroll >= PrF3Rel){
        $('.Pr-F2>a>.Tapa').removeClass('tapaOn')
        $('.Pr-F2>a>.Name').removeClass('nameOn');
        $('.Pr-F2>a>.Name>hr').removeClass('rayaOn');
        $('.Pr-F3>a>.Tapa').addClass('tapaOn');
        $('.Pr-F3>a>.Name').addClass('nameOn');
        $('.Pr-F3>a>.Name>hr').addClass('rayaOn');
      }else{
        $('.Pr-F3>a>.Tapa').removeClass('tapaOn');
        $('.Pr-F3>a>.Name').removeClass('nameOn');
        $('.Pr-F3>a>.Name>hr').removeClass('rayaOn');
      }
      if(altoScroll >= PrF4Rel){
        $('.Pr-F3>a>.Tapa').removeClass('tapaOn');
        $('.Pr-F3>a>.Name').removeClass('nameOn');
        $('.Pr-F3>a>.Name>hr').removeClass('rayaOn');
        $('.Pr-F4>a>.Tapa').addClass('tapaOn');
        $('.Pr-F4>a>.Name').addClass('nameOn');
        $('.Pr-F4>a>.Name>hr').addClass('rayaOn');
      }else{
        $('.Pr-F4>a>.Tapa').removeClass('tapaOn');
        $('.Pr-F4>a>.Name').removeClass('nameOn');
        $('.Pr-F4>a>.Name>hr').removeClass('rayaOn');
      }
    }  
  });



/*menu-T y menu-R - color elemento menu elegido*/ 
  if($(".Menu-T a[href='#'], .Menu-R a[href='#']")){
    $(".Menu-T a[href='#'], .Menu-R a[href='#']").css('color','#eee3bb');
  }
  if($(".Menu-T>li:last-child>a[href='#'], .Menu-R>li:last-child>a[href='#']")){
    $(".Menu-T>li:last-child>a[href='#'], .Menu-R>li:last-child>a[href='#']").css('color','#a1ee97');
  }

/* menu-R */
  $('.Boton-T').on('click', function(){
    $('.Menu-R').animate({right: 0}, 400);
    $('.Sombra-nav-R').fadeIn();
    $('section, .Wrap-Hdr, .Wrap-foot, .C-foto').animate(
      {left: -125}, 400);
  });
  $('.Boton-R, .Sombra-nav-R').on('click', function(){
    $('.Menu-R').animate({right: -250}, 400);
    $('.Sombra-nav-R').fadeOut();
    $('section, .Wrap-Hdr, .Wrap-foot, .C-foto').animate(
      {left: 0}, 400);  
  });


/* esconder menu-R al agrandar */
  $(window).on('resize', function(){
    if($(window).width() >= 1239){
      $('.Menu-R').animate({right: -250}, 400,function(){
        $('.Menu-R').removeAttr('style','right');
      });
      $('.Sombra-nav-R').removeAttr('style','display');
      $('section, .Wrap-Hdr, .Wrap-foot, .C-foto').animate(
        {left: 0}, 400);
    }
  });


/*4-Designs - agrandar foto*/
  $(".Plano>.Foto>img").on('click', function(){
    srcPlano = $(this).attr('src');
    $('.Sombra-Planos>img').attr('src', srcPlano);
    $('.Cont-Sombra-P').fadeIn(200);
  });
  $('.Sombra-Planos').on('click', function(){
    $('.Cont-Sombra-P').fadeOut(400);
  });

  
/*5-OurTeam - acordeón*/
  $('.Acord>.Caja>.Titulo').on('click', function(){
    $('.Acord>.Caja>.Texto').not($(this).next()).slideUp();
    $(this).next().slideToggle();
  });




  /*HOME - Galeria*/

/*
  FG1.css('left','-85%');
  FG2.css('left','-30%');
  FG3.css('left','25%');
  FG4.css('left','80%');
  FG5.css('left','135%'); 
  */

  var FG = $('.HmS2>.Gal>.Foto');
  var FG1 = $('.HmS2>.Gal>.G1');
  var FG5 = $('.HmS2>.Gal>.G5');
  var FGwidth = FG.width();

/*b-back*/
  $(".b-back").on('click', function(){
    FG.animate({left: '-=55%'}, 400);
    var FG5left = FG5.position().left;
    $(".b-fwrd").fadeIn();
    if((FG5left) <= (FGwidth * 2)){
      $(".b-back").fadeOut();
    } 
  });
 
/*b-fwrd*/
  $(".b-fwrd").on('click', function(){
    FG.animate({left: '+=55%'}, 400);
    var FG1left = FG1.position().left;
    $(".b-back").fadeIn();
    if((FGwidth + FG1left) >= 0){
      $(".b-fwrd").fadeOut(); 
    }
  });

/*b-up */
  $(".Boton-Up a").on('click', function(e){
    e.preventDefault();
    window.scrollTo(0, 0);
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

//  fin
});