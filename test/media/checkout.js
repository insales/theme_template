$(function(){
  // разметка для блоков
  var $steps = $( '.set > .set-title' );
  var is_step_checkout = false;

  if( $steps.length == 4 ){
    is_step_checkout = true;

    $steps
      .addClass( 'step-title row' );
  }

  var
    is_checkout = !Site.template || Site.template == 'account.orders' || Site.template == 'order' || Site.template == 'checkout';

  // если мы не в пошаговом офрмлении
  if( !is_step_checkout ){
    $( '.set:not(.wide_set) .set-block' )
      .addClass( 'lg-grid-8 sm-grid-12 padded-sides padded-bottom' );
  }else{
    $( '.set' )
      .addClass( 'lg-grid-8 sm-grid-12 padded-sides padded-bottom' );

      // перелопачиваем верстку для шагов оформления заказа
      $('.step-title').each(function(){
      var cN = this.childNodes;
      for (var i=0, l=cN&&cN.length||0; i<l; i++) {
        if (cN[i].nodeType == 3 && String(cN[i].nodeValue).split(/\s/).join('')) {
          str = cN[i].nodeValue;
          $( cN[i] ).remove();
        }
      }

      // оборачиваем название шага в свой класс
      $(this).prepend( '<span class="step-name">'+ str + '</span>' );
    });
  }

  $( '.body' )
    .addClass( 'checkout' );

  // если блок полноразмерный - ставим нужный класс
  $( '.wide_set .set-block' )
    .addClass( 'lg-grid-12' );

  // делаем обертку с нормальным margin
  $( '.wide_set' )
    .parent()
      .removeClass( 'grid-row' );

  // выставляем классы для сайдбара
  $( '.set-sidebar' )
    .addClass( 'lg-grid-4 sm-grid-12 padded-sides' );

  // форматируем блок "для новых пользовательй" в оформлении товара
  $( '#registered_client' )
    .addClass( 'lg-grid-6 xs-grid-12' )
    .addClass( 'lg-padded-right xs-padded-zero-right' );

  // определяем вид блока "для зарегистрированнх пользователей"
  // тут есть тонкость, что на разных шаблонах она имеет разную верстку
  // так же сделана защита от того, что мы можем быть на дргуой странице
  // типа "вход с паролем" и т.п.

  // если это одностраничник
  if( !is_step_checkout ){
    if( $( '#regular_client' ).parent().is( 'div' ) ){
      $( '#regular_client' )
        .parent()
          .addClass( 'lg-grid-6 md-grid-6 sm-grid-6 xs-grid-12' )
          .addClass( 'lg-padded-left xs-padded-zero-left' );
    }
  // если это пошаговая
  }else{
    if( $( '#regular_client' ).parent().is( 'form' ) ){
      $( '#regular_client' )
        .parent()
          .addClass( 'lg-grid-6 xs-grid-12' )
          .addClass( 'lg-padded-left xs-padded-zero-left' );
    }
  }

  // поля ввода
  var $input = $( '.field' );

  $input.addClass( 'input' );
  $input
    .find( '.field-label' )
      .addClass( 'input-label' )
      .removeAttr( 'style' );

  // перелопачиваем верстку для обязательных полей и вешаем свои классы
  var $required = $input.find( '.input-label > span.warning' );

  $required.each( function(){
    $(this)
      .parents( '.input:first' )
        .addClass( 'input--required' );
    $(this).remove();
  });

  // очищаем инлайновые стили
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

  // делаем клевые подсказки
  var $input_notice = $( '.field-content' ).find( '.small' );

  $input_notice.each( function(){
    if( $(this).text().trim() !== '' ){
      $(this)
        .addClass( 'notice notice--info' );
    }
  });

  // украшаем наш селект
  if( is_checkout ){
    styleSelect( 'select' );
  }

  // инитим то, что появляется позже
  window.setTimeout( function(){
    styleSelect( 'select#shipping_address_state' );
  }, 500 );

  // фикс для страны доставки.
  // есть странны, для которых корода выводятся в виде селекта
  // а для других - поле ввода
  $( '#shipping_address_country' )
    .on( 'change', function(){
      // нужен для того, чтобы отработать после плагина, который тянет данные и делает верстку
      window.setTimeout( function(){
        var $state = $( '#shipping_address_state' );

        if( $state.is( 'input' ) ){
          console.log( 'input' );
          $state
            .parent()
              .removeClass( 'styled_select-wrapper' );

          $state
            .addClass( 'input-field' );
        }
        else if( $state.is( 'select' ) ){
          console.log( 'select' );
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
  $( '.set-title:not( .step-title )' )
    .addClass( 'content-title' );
  $( '.step-title > span' )
    .addClass( 'step-name' );

  // оборачиваем кнопку "Оформить заказ"
  $( '#create_order' )
    .removeAttr( 'style' )
    .wrap( '<div class="center" />' );

  // вешаем стилизацию для всяких статусов, сообщений подсказок
  $( '.error, .red' )
    .addClass( 'notice notice--danger' );

  $( '.green' )
    .addClass( 'notice notice--success' );

  $( '.message .notice' )
    .addClass( 'notice notice--info' );

  // делаем "адаптивную" таблицу
  $( '#orders_history, .table' )
    .wrap( '<div class="table-responsive" />' );

  // кнопоки
  // вернутсья в магаз
  $( '.back_to_shop' )
    .addClass( 'button' );

  // общие кнопки
  $( 'input[type="submit"]' )
    .addClass( 'mc-grid-12' );

  // кнопки "действия"
  $( '#create_order, [name="commit"], .back_to_shop' )
    .addClass( 'button--action mc-grid-12' );

  // Кнопка "разлогиниться""
  $( 'a[data-method="delete"]' )
    .addClass( 'button' )
    .parent()
      .siblings('#regular_client')
        .css({
          'line-height': '35px',
          'margin-right': '0.5em'
        });

  var text = $( '.set-title.content-title:first' ).text();
  if( text.indexOf( 'Состав заказа' ) > -1 ){
    $( '.input' )
      .addClass( 'input--titled' );

    $( '.field-content' )
      .addClass( 'input-value' );
  }

  $( 'a[href="/address/new"], a[href="/delivery/new"]' )
    .addClass( 'button' );

  // вешаем плагин на телефон
  $( '#shipping_address_phone, #client_phone' )
    .mask('+7(999)999-99-99');
});
