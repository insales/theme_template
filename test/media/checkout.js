$(function(){
  var
    is_checkout = !Site.template || Site.template == 'account.orders' || Site.template == 'order';

  if( is_checkout ){
    // разметка для блоков
    $( '.set:not(.wide_set) .set-block' )
      .addClass( 'lg-grid-8 md-grid-8 sm-grid-12 xs-grid-12 padded-inner-sides padded-inner-bottom' );

    $( '.wide_set .set-block' )
      .addClass( 'grid-12' );
    $( '.wide_set' )
      .parent()
        .removeClass( 'grid-row-inner' );

    $( '.set-sidebar' )
      .addClass( 'lg-grid-4 md-grid-4 sm-grid-12 xs-grid-12 padded-inner-sides' );

    $( '#registered_client' )
      .addClass( 'lg-grid-6 md-grid-6 sm-grid-6 xs-grid-12' )
      .addClass( 'lg-padded-inner-left md-padded-inner-left sm-padded-inner-left' )
      .css( 'float', 'right' );

    if( $( '#regular_client' ).parent().is( 'div' ) ){
      $( '#regular_client' )
        .parent()
          .attr( 'id', 'regular_client_wrapper' )
          .addClass( 'lg-grid-6 md-grid-6 sm-grid-6 xs-grid-12' )
          .addClass( 'lg-padded-inner-right md-padded-inner-right sm-padded-inner-right' );
    }

    // поля ввода
    var
      $input = $( '.field' );

    $input.addClass( 'input' );
    $input
      .find( '.field-label' )
        .addClass( 'input-label' )
        .removeAttr( 'style' );

    var
      $required = $input.find( '.input-label > span.warning' );

    $required.each( function(){
      $(this)
        .parents( '.input:first' )
          .addClass( 'input--required' );
      $(this).remove();
    });

    $input
      .find( '.field-content input:not(.button, [type="checkbox"])' )
        .addClass( 'input-field' )
        .removeAttr( 'style' );
    $input
      .find( '.field-content textarea' )
        .addClass( 'input-field' )
        .removeAttr('style');

    $input
      .find( '.field-content' )
        .removeAttr( 'style' );

    $( '#captcha_challenge' )
      .addClass( 'input-captcha' )
      .parents( '.input:first' )
        .addClass( 'input--captcha' );

    // select
    styleSelect( 'select' );

    window.setTimeout( function(){
      styleSelect( 'select#shipping_address_state' );
    }, 500 );

    $( '#shipping_address_country' )
      .on( 'change', function(){
        window.setTimeout( function(){
          var
            $state = $( '#shipping_address_state' );

          if( $state.is( 'input' ) ){
            $state
              .parent()
                .removeClass( 'styled_select-wrapper' );

            $state
              .addClass( 'input-field' )
          }
          else if( $state.is( 'select' ) ){
            styleSelect( 'select#shipping_address_state' );
          }
        }, 100 );
      });

    // цены
    $( 'td.price' )
      .addClass( 'prices' )
      .find( 'span' )
        .addClass( 'prices-current' );

    $( 'p.price' )
      .addClass( 'prices-current' );

    // заголовки
    $( '.set-title' )
      .addClass( 'content-title' );

    $( '#create_order' )
      .removeAttr( 'style' )
      .wrap( '<div class="center" />' );

    // messages
    $( '.error, .red' )
      .addClass( 'notice notice--danger' );

    $( '.green' )
      .addClass( 'notice notice--success' );

    $( '.message .notice' )
      .addClass( 'notice notice--info' );

    // table
    $( '#orders_history, .table' )
      .wrap( '<div class="table-responsive" />' );

    // buttons
    $( '.back_to_shop' )
      .addClass( 'button' );

    $( '#shipping_address_phone, #client_phone' )
      .mask('+7(999)999-99-99');

    // общие кнопки
    $( 'input[type="submit"]' )
      .addClass( 'mc-grid-12' );

    // кнопки "действия"
    $( '#create_order, [name="commit"], .back_to_shop' )
      .addClass( 'button--action mc-grid-12' );

    // разлогиниться
    $( 'a[data-method="delete"]' )
      .addClass( 'button' )
      .parent()
        .siblings('#regular_client')
        .css({
            'line-height': '30px',
            'margin-right': '0.5em'
          });

    // бонусы
    $( '#use_max_bonus_points' )
      .addClass( 'button' )
      .parent()
        .css( 'line-height', '30px' );

    $( '#order_client_bonus_points' )
      .addClass( 'input-field input-field--bonuses' );

    var
      text = $( '.set-title.content-title:first' ).text();

    if( text.indexOf( 'Состав заказа' ) > -1 ){
      $( '.input' )
        .addClass( 'input--titled' );

      $( '.field-content' )
        .addClass( 'input-value' );
    }
  }
});