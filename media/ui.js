// ===========================================================
//                            UI
// ===========================================================

$(function(){
  // search_widget
  $( '.js-search_widget-wrapper' ).hide();

  $( document ).on( 'click', '.js-search_widget-toggler', function( e ){
    e.preventDefault();

    $( '.js-search_widget-wrapper' )
      .toggle();
  })

  // ui для панели
  $( '.js-panel-link' ).on( 'click', function(){
    var
      params = getParams( $(this) ),
      $unit  = $(this)

    // flag;
    params.panel = true;

    $( 'body' )
      //.css( 'overflow', 'hidden' )
      .addClass( 'lock_scroll' )
      .append( '<div class="overlay" />');

    $( params.target ).show();

    setParams( $( '.overlay' ), params );

    window.setTimeout( function(){
      $unit
        .toggleClass( 'js-panel-close' )
    }, 200 );
  });

  $( document ).on( 'click touchstart', '.js-panel-close, .overlay', function( e ){
    e.preventDefault();
    var
      params = getParams( $( '.overlay' ) );

    if( params.panel ){
      $( params.target ).hide();
      $( '.overlay' ).remove();
      $( 'body' )
        .removeClass( 'lock_scroll' )
        //.css( 'overflow', 'initial' );

      $( '.js-panel-link' )
        .removeClass( 'js-panel-close' );
    }
  });

  // стилизация селектов
  styleSelect( 'select.js-styled' );

  // прокуртка в начало
  $( '.js-scroll_to_top' ).on( 'click', function(){
    $( 'body' ).animate({
      scrollTop: 0
    }, 400 );
  });

  var ajaxSearch = new InSales.Search();
  Events( 'onAjaxSearch' ).subscribe( function( $data ){
    console.log( $data );

    console.log( InSales.Render( $data, 'search', 'ajax' ) );
  });

  // улучшайзинг стандартной обратной связи
  if( Site.template == 'page' ){
    var
      $form = $( '#feedback_form');

    if( $form.is( 'form' ) ){
      var
        table     = $form.find( 'table' ),
        notice    = table.find( 'small' ),
        button    = table.find( '#feedback_commit' ),
        textarea  = table.find( 'textarea' ),
        email     = table.find( 'input[name="feedback[from]"]' );

      $form
        .removeAttr( 'style' );

      table
        .find( 'td' )
          .removeAttr( 'style' );

      textarea
        .removeAttr( 'style' )
        .addClass('input-field')
        
        .parents( 'p:first' )
          .addClass( 'input input--required' )
          .append('<div class="input-notice notice notice--danger">Заполните поле</div>')
            .find( 'label' )
              .addClass( 'input-label' );

      email
        .removeAttr( 'size' )
        .attr( 'type', 'email' )
        
        .addClass('input-field')
        .parents( 'p:first' )
          .addClass( 'input input--required' )
          .append('<div class="input-notice notice notice--danger">E-mail неправильно заполнен</div>')
            .find( 'label' )
              .addClass( 'input-label' );

      table
        .removeAttr( 'style' )
        .find( 'br')
          .remove();

      notice
        .parent()
          .html( notice.html() )
          .addClass( 'notice notice--info' );

      button
        .addClass('button button--action mc-grid-12')
        .on( 'click', function( e ){
          e.preventDefault();
          var
            $message = {},
            errors;

          errors = checkForm( $form );

          if( errors.length > 0 ){
            return;
          };

          $message[ 'feedback[content]' ] = textarea.val();
          $message[ 'feedback[from]' ] = email.val();

          // отправка и красивости
          InSales.sendMessage( $message )
            .done( function( response ){
              console.log( response );
              if( response.status == 'ok' ){
                showMessage( response.notice, 5000 );
              };
            });
        });
    };
  };
})