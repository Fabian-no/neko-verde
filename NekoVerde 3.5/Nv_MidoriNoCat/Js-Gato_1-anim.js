
/*---- Animaciones - GATO ----*/

/*Anim MOSCA*/
  $('.Boton-mosca').on('click', function(){
    $('.Gato').css('z-index','10');
    $('#Item-2, #Item-5, #Item-9M, #Item-9B').css('z-index','10');
    $('.Menu-interact, .MI-info').css('display','none');
    $('.MI-stop').show(); 
    /*Ojos-Mosca*/
    $('.ojo').addClass('ojo-mosca');
    $('.pupila').addClass('pupila-mosca');
sTa=setTimeout(function(){
      $('.ojo').removeClass('ojo-mosca');
      $('.pupila').removeClass('pupila-mosca');
      /*Ojos-after-Mosca*/
      $('.ojo').addClass('ojo-mosca-after');
      $('.pupila').addClass('pupila-mosca-after');
  sTc=setTimeout(function(){
        $('.ojo').removeClass('ojo-mosca-after');
        $('.pupila').removeClass('pupila-mosca-after');
      }, 5000);
      $('.Gato').css('z-index','80');
      $('#Item-2, #Item-5, #Item-9M, #Item-9B').css('z-index','80');
      $('.Menu-interact, .MI-info').css('display','block');
      $('.MI-stop').hide(); 
    }, 15000);
    /*Mosca*/
    $('.Mosca-A').addClass('Mosca-A_anim');
    $('.Mosca-B').addClass('Mosca-B_anim');
    $('.Mosca-F').addClass('Mosca-F_anim');
sTb=setTimeout(function(){
      $('.Mosca-A').removeClass('Mosca-A_anim');
      $('.Mosca-B').removeClass('Mosca-B_anim');
      $('.Mosca-F').removeClass('Mosca-F_anim');
    }, 15000);
  });    


/*Anim SKATE*/
  $('.Boton-skate').on('click', function(){
    $('.Menu-interact, .MI-info').css('display','none');
    $('.MI-stop').show(); 
    /*Ojos-Skate*/
    $('.ojo').addClass('ojo-skt');
    $('.pupila').addClass('pupila-skt');
sTa=setTimeout(function(){
      $('.ojo').removeClass('ojo-skt');
      $('.pupila').removeClass('pupila-skt');
      $('.Menu-interact, .MI-info').css('display','block');
      $('.MI-stop').hide(); 
    }, 10000);
    /*Gato, Sombra y Skate*/
    if(cont !== 7){
      $('.Gato').addClass('Gato-skt');
      $('.Sombra-gato').addClass('Sombra-gato-skt');
      $('.Skate').addClass('Skate-skt');
      $('.Sombra-skate').addClass('Sombra-skate-skt');
      $('#Item-9M').addClass('item-9M-skt');
      $('#Item-9B').addClass('item-9B-skt');
    }else{
      $('.Gato').addClass('Gato-skt7');
      $('.Sombra-gato').addClass('Sombra-gato-skt7');
      $('.Skate').addClass('Skate-skt7');
      $('.Sombra-skate').addClass('Sombra-skate-skt7');
      $('#Item-9M').addClass('item-9M-skt7');
      $('#Item-9B').addClass('item-9B-skt7');
    }  
sTb=setTimeout(function(){
      $('.Gato').removeClass('Gato-skt Gato-skt7');
      $('.Sombra-gato').removeClass('Sombra-gato-skt Sombra-gato-skt7');
      $('.Skate').removeClass('Skate-skt Skate-skt7');
      $('.Sombra-skate').removeClass('Sombra-skate-skt Sombra-skate-skt7');
      $('#Item-9M').removeClass('item-9M-skt item-9M-skt7');
      $('#Item-9B').removeClass('item-9B-skt item-9B-skt7');
    }, 10000);
  });    


/*link BURBUJAS*/
  var linkBurb = document.createElement('link');
  linkBurb.rel = 'stylesheet';
  linkBurb.type = 'text/css';
  linkBurb.href = 'Gato_6-burbujas.css';
  linkBurb.media = 'all';
  // ... ó ...
  var linkB = '<link rel="stylesheet" type="text/css" href="Gato_6-burbujas.css" media="all">';

/*Anim BURBUJAS*/
  $('.Boton-burbujas').on('click', function(){
    $('.Gato').css('z-index','10');
    $('.Menu-interact, .MI-info').css('display','none');
    $('.MI-stop').show(); 
    /*Burbujas*/
    $('head').append(linkBurb);
sTa=setTimeout(function(){
      linkBurb.remove();
      $('.Gato').css('z-index','80');
      $('.Menu-interact, .MI-info').css('display','block');
      $('.MI-stop').hide(); 
    }, 15500);
    /*Ojo-Burbuja*/
    $('.ojo').addClass('ojo-burb');
    $('.pupila').addClass('pupila-burb');
sTb=setTimeout(function(){
      $('.ojo').removeClass('ojo-burb');
      $('.pupila').removeClass('pupila-burb');
      /*Ojos-after-Mosca*/
      $('.ojo').addClass('ojo-burb-after');
      $('.pupila').addClass('pupila-burb-after');
  sTd=setTimeout(function(){
        $('.ojo').removeClass('ojo-burb-after');
        $('.pupila').removeClass('pupila-burb-after');
      }, 10000);
    }, 6000);
    /*a los 6 seg...*/
sTc=setTimeout(function(){
      /*Burbuja-gato*/
      $('.bur-gt').addClass('bur-gt_anim');
      $('.b-gt').addClass('b-gt_anim');
  sTe=setTimeout(function(){
        $('.bur-gt').removeClass('bur-gt_anim');
        $('.b-gt').removeClass('b-gt_anim');
      }, 10000);
      /*Gato y Sombra*/
      $('.Gato').addClass('Gato-burb');
      $('.Sombra-gato').addClass('Sombra-gato-burb');
  sTf=setTimeout(function(){
        $('.Gato').removeClass('Gato-burb');
        $('.Sombra-gato').removeClass('Sombra-gato-burb');
      }, 10000);
    }, 6000);
  });


/*Anim POZO*/
  $('.Boton-pozo').on('click', function(){
    $('.Gato').css('z-index','10');
    $('.Menu-interact, .MI-info').css('display','none');
    $('.MI-stop').show(); 
    /*Ojos-Pozo */
    $('.ojo').addClass('ojo-pozo');
    $('.pupila').addClass('pupila-pozo');
sTa=setTimeout(function(){
      $('.ojo').removeClass('ojo-pozo');
      $('.pupila').removeClass('pupila-pozo');
      $('.Gato').css('z-index','80');
      $('.Menu-interact, .MI-info').css('display','block');
      $('.MI-stop').hide();
    }, 10000);  
    /*Gato y Sombra */
    if(cont !== 7){/* pozo */
      $('.Gato').addClass('Gato-pozo');
      $('#Item-2').addClass('item-2-pozo');
      $('#Item-5').addClass('item-5-pozo');
      $('#Item-9M').addClass('item-9M-pozo');
      $('#Item-9B').addClass('item-9B-pozo');
      $('.Sombra-gato').addClass('Sombra-gato-pozo');
      $('.Agujero').addClass('Agujero-pozo');
    }else{ /* salto */
      $('.Gato').addClass('Gato-salto');
      $('#Item-2').addClass('item-2-salto');
      $('#Item-5').addClass('item-5-salto');
      $('#Item-9M').addClass('item-9M-salto');
      $('#Item-9B').addClass('item-9B-salto');
      $('.Sombra-gato').addClass('Sombra-gato-salto');
    }
    sTb=setTimeout(function(){
        $('.Gato').removeClass('Gato-pozo Gato-salto');
        $('#Item-2').removeClass('item-2-pozo item-2-salto');
        $('#Item-5').removeClass('item-5-pozo item-5-salto');
        $('#Item-9M').removeClass('item-9M-pozo item-9M-salto');
        $('#Item-9B').removeClass('item-9B-pozo item-9B-salto');
        $('.Sombra-gato').removeClass('Sombra-gato-pozo Sombra-gato-salto');
        $('.Agujero').removeClass('Agujero-pozo');
      }, 10000);
  });      



/*Anim GLOBO*/
  $('.Boton-globo').on('click', function(){
    $('.Gato').css('z-index','10');
    $('.Menu-interact, .MI-info').css('display','none');
    $('.MI-stop').show();  
    /* Cabeza - globo */
    $('.cabeza').addClass('cabeza-globo');
    $('#Hat-7y8').addClass('hat-7y8-globo');
    $('#Hat-3y4y11').addClass('hat-3y4y11-globo');
    $('#Hat-12').addClass('hat-12-globo');
    $('.cont-bigotes').addClass('cont-bigotes-globo');
    $('.cont-ojos').addClass('cont-ojos-globo');
    $('.cont-orejas').addClass('cont-orejas-globo');
    $('.oreja1').addClass('oreja1-globo');
    $('.oreja2').addClass('oreja2-globo');
    /* Gato - globo */
    $('.Gato').addClass('Gato-globo');
    $('.Sombra-gato').addClass('Sombra-gato-globo');
sTa=setTimeout(function(){
      $('.cabeza').removeClass('cabeza-globo');
      $('#Hat-7y8').removeClass('hat-7y8-globo');
      $('#Hat-3y4y11').removeClass('hat-3y4y11-globo');
      $('#Hat-12').removeClass('hat-12-globo');
      $('.cont-bigotes').removeClass('cont-bigotes-globo');
      $('.cont-ojos').removeClass('cont-ojos-globo');
      $('.cont-orejas').removeClass('cont-orejas-globo');
      $('.oreja1').removeClass('oreja1-globo');
      $('.oreja2').removeClass('oreja2-globo');
      $('.Gato').removeClass('Gato-globo');
      $('.Sombra-gato').removeClass('Sombra-gato-globo');
      $('.Gato').css('z-index','80');
      $('.Menu-interact, .MI-info').css('display','block');
      $('.MI-stop').hide();
    }, 15000);  
  });      


/*Anim OVNI*/
  $('.Boton-ovni').on('click', function(){
    $('.Gato').css('z-index','10');
    $('.Menu-interact, .MI-info').css('display','none');
    $('.MI-stop').show();
sTa=setTimeout(function(){
      $('.Gato').css('z-index','80');
      $('.Menu-interact, .MI-info').css('display','block');
      $('.MI-stop').hide(); 
    }, 23000);
    /*Ovni_Pre 3s */
    $('.Ovni').addClass('Ovni-Pre-anim');
sTb=setTimeout(function(){
      $('.Ovni').removeClass('Ovni-Pre-anim');
    }, 3000);
    /*a los 3 seg...*/
sTc=setTimeout(function(){    
      $('.Ovni').addClass('Ovni-anim');
      $('.Rayo-ovni').addClass('Rayo-ovni-anim');
      $('.Gato').addClass('Gato-ovni');
      $('.Sombra-gato').addClass('Sombra-gato-ovni');
  sTd=setTimeout(function(){
        $('.Ovni').removeClass('Ovni-anim');
        $('.Rayo-ovni').removeClass('Rayo-ovni-anim');
        $('.Gato').removeClass('Gato-ovni');
        $('.Sombra-gato').removeClass('Sombra-gato-ovni');
      }, 20000);
      /*a los 4 seg + los 3 seg...*/
  sTe=setTimeout(function(){
        $('.o1').addClass('o1-ovni');
        $('.o2').addClass('o2-ovni');
        $('.pupila').addClass('pupila-ovni');
    sTf=setTimeout(function(){
          $('.o1').removeClass('o1-ovni');
          $('.o2').removeClass('o2-ovni');
          $('.pupila').removeClass('pupila-ovni');
        }, 16000);
      }, 4000);
    }, 3000);    
  });
  
  
  
  
