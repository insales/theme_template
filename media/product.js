// =======================================================================================
//                                        PRODUCT
// =======================================================================================

$(function(){
  // gallery
  var 
    $large  = $( '.js-image--large img' ),
    $thumbs = $( '.js-image--preview' );

  // сразу заготавливаем данные и сохраняем в самом объекте,
  // чтобы не делать каждый раз медленный разбор атрибутов
  $thumbs.each(function(){
    this.params                = this.params || {}
    this.params.large_image    = $(this).data( 'large-image' );
    this.params.original_image = $(this).attr( 'href' );
  });

  $thumbs.on( 'click', function(e){
    e.preventDefault();

    var
      large_image    = this.params.large_image,
      original_image = this.params.original_image;

    $thumbs
      .removeClass( 'gallery-image--current' );
    $(this)
      .addClass( 'gallery-image--current' );

    $large
      .attr( 'src', large_image )
      .parent()
        .attr( 'href', original_image );

    MagicZoomPlus.update( 'MagicZoom', original_image, large_image );
  });

  $( '.js-slider--gallery' ).owlCarousel({
    itemsCustom: [
      [0, 4],
      [400, 3],
      [800, 3],
    ],
  });

  // обновляем инфу, после смены модификации
  Events( 'onProductOption_Changed' ).subscribe( function( $data ){
    console.log( 'onProductOption_Changed', $data );
    var
      variant           = $data.variant,
      $js_buy           = $( '.product-buy' ),
      $js_sku           = $( '.js-product-sku' ),
      $js_sku_text      = $( '.js-product-sku_field' ),
      $js_price_current = $( '.js-price-current' ),
      $js_price_old     = $( '.js-price-old' ),
      $js_presence      = $( '.js-product-presence' );

    if( variant ){
      if( variant.sku ){
        $js_sku.show();
        $js_sku_text.html( variant.sku );
      } else {
        $js_sku.hide();
      };
    };

    if( variant && variant.available == true ){
      // selected a valid variant

      $js_buy.val( 'Купить' ).removeClass( 'button--disabled' );
      $js_price_current.html( InSales.formatMoney( variant.price ) );
      $js_price_old.html( InSales.formatMoney( variant.old_price ) );
      $js_presence.html( 'Есть в наличии' );

    }else{
      // variant doesn't exist

      $js_buy.val( 'Под заказ' ).addClass( 'button--disabled' );

      if( variant ){
        $js_presence.html( 'Распродано' );
        $js_price_current.html( InSales.formatMoney( variant.price ) );
        $js_price_old.html( InSales.formatMoney( variant.old_price ) );
      }else{
        $js_presence.html( '' );
        $js_price_current.html( 'Модификация отсутсвует' );
        $js_price_old.html( '' );
      };

    };
  });

  $( '.quantity' ).quantity();
});