// =============================================================================
//                                PRICE TYPE
// =============================================================================

// мини-плагин для быстрого обновления данных
(function ($){
  $.fn.update = function( options ){
    if( this.data( 'priceType') ){
      return this.data( 'priceType' ).update( options );
    }
  };
}( jQuery ));

(function ( $, window, document ){

  // объявляем логику
  var priceType = {
    // инициализация
    init: function( options, el ){

      var
        self        = this,
        $product    = options.product,
        $variants   = {},
        price_kinds = [];

      // привязываем все статичные элементы
      self.elem      = $( el );
      self.variant_id = options.variant_id || $product.variants[ 0 ].id;
      self.prices     = [];

      self.group = false;
      if( options.group || Site.client_group.id ){
        self.group = options.group || Site.client_group.id;
      }

      // пересобираем варианты для быстрой работы
      $.each( $product.variants, function( index, $variant ) {
        $variants[ $variant.id ] = $variant;
      });
      self.variants = $variants;

      // вытаскиваем правила для типов цен
      $.each( $product.price_kinds, function( index, $price_kind ) {
        price_kinds[ $price_kind.price_index ] = $price_kind.value;
      });
      self.price_kinds = price_kinds;

      self.setPrices( self.variant_id );

      // привязываем опции
      self.options = $.extend( {}, self.elem.data(), options );

      this.update( options );
    },

    // вытаскиваем типы цен
    setPrices: function( variant_id ){
      var
        self     = this,
        $variant = self.variants[ parseInt( variant_id ) ],
        prices   = [];

      prices[ 0 ] = {
        price: parseFloat( $variant.price ),
        value: 0,
      };

      $.each( $variant.prices, function( index, price ){
        prices[ index +1 ] = {
          price: price,
          value: self.price_kinds[ index +1 ],
        };
      });

      self.prices = prices;
    },

    // получение конкретной цены, в зависимости от кол-ва
    getPrice: function( items_count ){
      var
        self  = this,
        price = 0;

      self.items_count = items_count || self.items_count;

      $.each( self.prices, function( index, price_variant ){
        if( price_variant.price && self.items_count >= price_variant.value ){
          price = price_variant.price;
        }
      });

      return price;
    },

    // обновляем данные
    // variant_id - выставляем вариант модификации
    // quantity   - выставляем кол-во
    //
    // генерит событие "onPriceType_Change"
    //возвращает jQuery-объект и цену за одну единицу товара
    update: function( $options ){
      var
        self  = this,
        price = 0,
        $data = {
          jqObj: this.elem,
        };

      /*
      if( !self.group.disabled ){
        return false;
      };
      */

      if( $options.variant_id ){
        self.setPrices( $options.variant_id );
      }

      if( $options.quantity ){
        price = self.getPrice( $options.quantity );
      }

      $data.price    = price;
      $data.quantity = self.items_count;

      Events( 'onPriceType_Change' ).publish( $data );
    },
  };

  // навешиваем все это на каждый объект
  $.fn.priceType = function( options ){
    this.each( function(){
      var
        prices = Object.create( priceType );

      prices.init( options, this );
      $.data( this, "priceType", prices );
    });

    return this;
  };

}( jQuery, window, document ));
