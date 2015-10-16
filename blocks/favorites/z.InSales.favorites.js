// ============================================================================
//                              FAVORITEAS
// ============================================================================

InSales.Favorites = function( options ){
  var
    self = this;

  init = function( options ){
    options = options || {};

    // тянем классы элементов
    self.addSelector    = options.addSelector    || '.js-favorite-add';
    self.removeSelector = options.removeSelector || '.js-favorite-remove';
    self.triggerClass   = options.triggerClass   || 'favorite-trigger--added';

    // объявляем списки
    self.products  = [];
    self.favorites = [];

    self.update();
    addItemTrigger();
    removeItemTrigger();

    self.checkStatus();
  };

  // обновляем
  self.update = function(){
    var
      $data = {};

    // забираем данные из куки
    try{
      self.favorites = $.parseJSON( $.cookie( 'favorites' ) );
    }catch( e ){
      self.favorites = null;
    }

    // проверяем на пустоту
    if( !self.favorites ){
      self.products  = [];
      self.favorites = [];

      return;
    }

    // забираем данные по товарам
    InSales.getProductList( self.favorites )
      .then( function( response ){
        self.setList( response );

        $data = makeData( self );

        Events( 'onFavorite_Update' ).publish( $data );
      });
  };

  // добавляем товар
  self.addItem = function( product_id, $link ){
    // есть ли такой товар в списке?
    if( self.isRepeated( product_id ) ){
      console.log( 'inList' );
    }else{
      var
        $data = makeData( self );

      if( $link ){
        $link
          .parent()
            .addClass( self.triggerClass );
      }

      $data.added = product_id;
      $data.jqObj = $link;

      // пинаем товар в список
      self.favorites.push( parseInt( product_id ) );

      // сохраняем куку
      $.cookie( 'favorites', JSON.stringify( self.favorites ), {
        path: '/'
      });

      Events( 'onFavorite_Add' ).publish( $data );

      self.update();
    }
  };

  addItemTrigger = function(){
    $( document ).on( 'click', self.addSelector, function( e ){
      e.preventDefault();

      var
        product_id = $(this).data( 'product_id' );

      self.addItem( product_id, $(this) );
    });
  };

  self.removeItem = function( product_id, $link ){
    var
      $data = makeData( self ),
      position;

    $data.removed = product_id,
    $data.jqObj   = $link,

    // удаляем элемент из списка
    $.each( self.favorites, function( index, id ){
      if( id == product_id ){
        position = index;
      }
    });

    if( typeof( position ) == 'number' ){
      self.favorites.splice( position, 1 );
    }

    // сохраняем куку
    $.cookie( 'favorites', JSON.stringify( self.favorites ), {
      path: '/'
    });

    // сбрасываем блокировку
    if( $link ){
      $link.data( 'processed', false );

      $link
        .parent()
          .removeClass( self.triggerClass );

      $data.jqObj = $link;
    }

    Events( 'onFavorite_Remove' ).publish( $data );

    self.update();
  };

  removeItemTrigger = function(){
    $( document ).on( 'click', self.removeSelector, function( e ){
      e.preventDefault();

      // блокируем повторный клик
      if( $(this).data( 'processed') ){
        return;
      }

      $(this).data( 'processed', true );

      var
        product_id = $(this).data( 'product_id' );

      self.removeItem( product_id, $(this) );
    });
  };

  // получаем список товаров в избранном
  self.getProducts = function(){
    return self.products;
  };

  // проверка, есть ли такой в списке
  self.isRepeated = function( product_id ) {
    var
      result = false;

    if( self.favorites ){
      $.each( self.favorites, function( index, id ) {
        if( id == product_id ) {
          result = true;
          return false;
        }
      });
    }

    return result;
  };

  // формируем правильный список с данными по товарам
  self.setList = function( product_list ){
    var
      products = convertProducts( product_list );

    self.products = [];
    $.each( self.favorites, function( index, id ){
      if( id ){
        self.products.push( products[ id ] );
      }
    });

    $.each( self.products, function( index, product ){
      product.price = product.variants[ 0 ].price;
      product.old_price = product.variants[ 0 ].old_priceprice;
    });
  };

  // првоеряем, добавлен ли товар в избранное или нет?
  // если да, то добавим класс контейнеру кнопки
  self.checkStatus = function(){
    $( self.addSelector ).each( function(){
      var
        product_id = $(this).data( 'product_id' );

      if( self.isRepeated( product_id ) ){
        $(this)
          .parent()
            .addClass( self.triggerClass );
      }
    });
  };

  //
  init( options );
};
