// ============================================================================
//                            RECENTLY VIEW
// ============================================================================

InSales.RecentlyView = function( options ){
  var
    self = this;

  init = function( options ){
    options = options || {};

    // выставляем опции
    self.maxItems = options.maxItems || 4;

    // объявляем списки
    self.products = [];
    self.recently = [];

    self.update();
  };

  // обновляем
  self.update = function(){
    var
      $data = {};

    // забираем данные из куки
    try{
      self.recently = $.parseJSON( $.cookie( 'recently' ) );
    }catch( e ){
      self.recently = null;
    };

    // проверяем на пустоту
    if( !self.recently ){
      self.products = [];
      self.recently = [];
    };

    InSales.getProductList( self.recently )
      .then( function( response ){
        self.setList( response );

        $data = {
          obj: self,
        };

        Events( 'onRecently_Update' ).publish( $data );
      });
  };

  // добавляем товар
  self.addItem = function( product_id ){
    // есть ли такой товар в списке?
    if( self.isRepeated( product_id ) ){
      return;
    }else{
      // не превысили мы лимит?
      if( self.recently.length = self.maxItems ){
        self.recently.shift();
      };

      // пинаем товар в список
      self.recently.push( parseInt( product_id ) );

      // сохраняем куку
      $.cookie( 'recently', JSON.stringify( self.recently ), {
        path: '/'
      });
    };
  };

  // проверка, есть ли такой в списке
  self.isRepeated = function( product_id ) {
    var
      result = false;

    if( self.recently ){
      $.each( self.recently, function( index, id ) {
        if( id == product_id ) {
          result = true;
          return false;
        };
      });
    };

    return result;
  };

  // формируем правильный список с данными по товарам
  self.setList = function( product_list ){
    var
      products = convertProducts( product_list );

    $.each( self.recently, function( index, id ){
      if( id ){
        self.products.push( products[ id ] );
      };
    });

    $.each( self.products, function( index, product ){
      if( product ){
        product.price = product.variants[ 0 ].price;
        product.old_price = product.variants[ 0 ].old_priceprice;
      };
    });
  };

  //
  init( options );
};