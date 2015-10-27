// =====================================================================================
//                                PRELOADER
// =====================================================================================


// TODO: причесать

// Вывести индикатор работы (колесико)
showPreloader = function() {
  var
    preloader = $('#own_preloader');

  if ( !preloader.attr( "id" ) ) {
    $('body').append( '<div id="own_preloader"><img src="/served_assets/loading.gif"/></div>' );
    preloader = $('#own_preloader');
  }

  preloader.show();
  changeCss( preloader );

  $( window ).on( 'resize scroll', resizePreloader );
};

// Скрыть индикатор
hidePreloader = function() {
  var
    preloader = $( '#own_preloader' );

  if ( !preloader.attr( 'id' ) ) return;

  $(window).off( 'resize scroll', resizePreloader );
  preloader.remove();
};

resizePreloader = function(){
  changeCss( $( '#own_preloader' ) );
};

// показываем сообщение
showMessage = function( message, time ){
  showPreloader();

  var
    preloader = $( '#own_preloader' );

  time = time || 2000;

  if ( !preloader.attr( 'id' ) ) return;

  message =
    '<div class="system_message">'+
      message +
    '<div>';

  preloader.html( message );
  changeCss( preloader );

  window.setTimeout( hidePreloader, time );
};
