// ====================================================================================
//                                    CART
// ====================================================================================

// сборка позиций корзины
InSales.OrderLine = function( options ) {
  var
    self = this,
    line = {};

  $.each( options, function( key, value ) {
    line[ key ] = value;
  });

  if( options.title ){
    line.title = options.title.replace( /\+/g, ' ' );
  }

  if( options.sku ){
    line.sku = options.sku.replace( /\+/g, ' ' );
  }

  line.url = '/product_by_id/' + options.product_id;

  // добавляем язык, если не дефолт
  if( Site.language.not_default ){
    line.url += '?lang='+ Site.language.locale;
  }

  // разворачиваем изображения товара для шаблонизатора
  line.image = {};
  line.image.small  = line.image_url.replace( 'thumb', 'micro' );
  line.image.thumb  = line.image_url;
  line.image.medium = line.image_url.replace( 'thumb', 'medium' );

  return line;
};

// основной объект корзины
// занимется всеми взаимодействиями с корзиной
// на входе - объект с настройками:
// removeSelector - селектор, кнопки "удаления" товара из корзины,
// например, '.js-cart_item-delete'.
//
// self
// cart - объект списка корзины
InSales.Cart = function( options ){
  var
    self = this;
    //cart = {};

  // обновление списка корзины
  this.setCart = function( order ){
    var
      items_count = 0,
      order_lines = [];

    if ( !order ) {
      self.items_count = 0;
      self.total_price = 0;
      self.items_price = 0;
      self.order_lines = [];
      self.discounts   = [];
      return;
    }

    self.items_price = order.items_price;
    self.total_price = order.total_price;

    $( order.order_lines ).each( function( index, order_line ) {
      items_count += order_line.quantity;
      order_lines[ index ] = new InSales.OrderLine( order_line );
    });

    self.items_count   = items_count;
    self.order_lines   = order_lines;
    self.discounts     = order.discounts;
    self.discount_code = order.discount_code;

    // грязный хак, вычищаем из описания скидки '+',
    // который появляется в ответе вместо " ".
    // потом надо из разрабов выбить у проверить, зачем такой ответ приходит
    $.each( self.discounts, function( key, discount ){
      if( discount.description !== null ){
        discount.description = discount.description.replace( /\+/g, ' ' );
      }
    });

    return self;
  };

  // обновляем корзину
  this.reloadCart = function( callback ) {
    var
      $data = {};

    // тут мы убрали лишнее, и так он попробует сделать все последовательно
    // так что в переменную мы загоняем json либо с сервака, либо из куки
    // после проверки работы мусор будет удален
    if ( $.cookie('cart') != 'json' ) {
      var order;
      try {
        order = $.parseJSON( $.cookie('cart') );
      } catch( e ) {
        order = null;
      }

      self.setCart( order );
      $data = makeData( self );

      Events( 'onCart_Update' ).publish( $data );

      if( callback ){
        callback( $data );
      }
    } else {
      $.getJSON( '/cart_items.json', function( order ){
        self.setCart( order );
        $data = makeData( self );

        Events( 'onCart_Update' ).publish( $data );

        if( callback ){
          callback( $data );
        }
      });
    }
  };

  // триггер удаления товара из корзины
  removeItemTrigger = function(){
    $( document ).on( 'click', self.removeSelector, function( e ){
      e.preventDefault();

      // предовращает повторный клик
      if( $(this).data( 'processed' ) ){
        return;
      }

      $(this).data( 'processed', true );

      self.removeItem( $(this).data( 'item-id' ), $(this) );
    });
  };

  // удаление товара
  this.removeItem = function( variant_id, $link ){
    var
      fields = {},
      path   = '/cart_items/' + variant_id + '.json',
      $data  = makeData( self );

    $data.removed = variant_id;
    $data.jqObj   = $link;

    fields._method = 'delete';
    showPreloader();

    $.post( path, fields )
      .done( function() {
        // дергаем событие ДО обновления корзины
        Events( 'onCart_BeforeDelete' ).publish( $data );

        // дергаем событие ПОСЛЕ полного удаления товара из списка
        self.reloadCart( function( $data ){
          // добавляем нужные данные
          $data.removed = variant_id;
          $data.jqObj   = $link;

          Events( 'onCart_Delete' ).publish( $data );
        });
      })
      .fail( function( response ){
        // снимаем флаг, что мы обрабатывали эту ссылку и лочили
        $link.data( 'processed', false );

        console.log( 'Произошла ошибка при удалении!! Ответ платформы: ', response );
      })
      .always( function(){
        hidePreloader();
      });
  };

  // добавляем товар(ы)
  //
  // NOTE!!
  // учесть, что в обратку может придти jQuery-объект формы
  // тогда придется разбирать ее в слушателе

  this.addItem = function( $obj ){
    var
      fields = {},
      path   = { path: '/cart_items.json' },
      $data  = {};

    switch( type_of( $obj ) ){
      case( 'Object' ):
        $.each( $obj, function( variant_id, quantity ){
          fields[ 'variant_ids['+ variant_id +']' ] = quantity;
        });

        $data.added = $obj;
        break;
      case( 'jQuery' ):
        fields = $obj.serialize();
        path   = self.getFormAction( $obj );

        $data.jqObj = $obj;
        break;
    }

    showPreloader();
    $.post( path.path , fields )
      .done( function(){
        // обновляем состав корзины
        // и дергаем события
        $data = makeData( self );

        Events( 'onCart_Add' ).publish( $data );

        // обновляем состав корзины, и дергаем событие
        // куда передаем состав корзины ПОСЛЕ добавления и обновления состава
        self.reloadCart( function( $data ){
          Events( 'onCart_AfterAdd' ).publish( $data );
        });
      })
      .fail( function( response ){
        console.log( 'Произошла ошибка при удалении!! Ответ платформы: ', response );
      })
      .always( function(){
        hidePreloader();
      });
  };

  // пересчет корзины
  // form - селектор формы
  this.recalculateOrder = function( form ){
    var
      $inputs     = $( form ).find( self.quantitySelector );
      path        = '/cart_items/update_all.json',
      fields      = $( form ).serialize(),
      items_count = 0;

    $inputs.each( function( index ){
      items_count += parseInt( $(this).val() );
    });

    if( items_count == self.items_count ){
      return false;
    }

    showPreloader();

    $.post( path, fields )
      .done( function( response ){
        self.reloadCart();
      })
      .fail( function( response ){
        console.log('Произошла ошибка при обновлении!! Ответ платформы: ', response);
      })
      .always( function(){
        hidePreloader();
      });
  };

  // делаем нормальный путь у формы
  self.getFormAction = function( $form ){
    var
      temp   = $form.attr( 'action' ).split( '?' ),
      action = {};

    action.url    = temp[ 0 ] + '.json';
    action.params = temp[ 1 ] ? '?'+ temp[ 1 ] : '';
    action.path   = action.url + action.params;

    return action;
  };

  // инициируемся
  init = function( options ){
    // выставляем настройки на дефолт
    var
      options = options || {};

    self.removeSelector   = options.removeSelector   || '.js-cart_item-delete';
    self.quantitySelector = options.quantitySelector || '.js-quantity-input';

    removeItemTrigger();
    self.reloadCart();
  };

  // init
  init( options );
};
