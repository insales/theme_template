// =======================================================================================
//                                        PRODUCT
// =======================================================================================

$(function(){
  /*
  // gallery
  var
    $large  = $( '.js-image--large img' ),
    $thumbs = $( '.js-image--preview' );

  // сразу заготавливаем данные и сохраняем в самом объекте,
  // чтобы не делать каждый раз медленный разбор атрибутов
  $thumbs.each(function(){
    this.params                = this.params || {};
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
  */



  // обновляем инфу, после смены модификации
  Events( 'onProductOption_Changed' ).subscribe( function( $data ){
    var
      variant           = $data.variant,
      $js_buy           = $( '.product-buy' ),
      $js_sku           = $( '.js-product-sku' ),
      $js_sku_text      = $( '.js-product-sku_field' ),
      $js_price_current = $( '.js-prices-current' ),
      $js_price_old     = $( '.js-prices-old' ),
      $js_presence      = $( '.js-product-presence' );

    if( variant ){
      if( variant.sku ){
        $js_sku.show();
        $js_sku_text.html( variant.sku );
      } else {
        $js_sku.hide();
      }
    }

    if( variant && variant.available === true ){
      // selected a valid variant
      $js_price_current
        .removeClass( 'product-presence_field--sell_off' )
        .html( InSales.formatMoney( variant.price ) );
      $js_price_old.html( InSales.formatMoney( variant.old_price ) );
      $js_presence.html( 'Есть в наличии' );

      if( Site.product.buy_button == 'block' ){
        $js_buy
          .html( '<i class="fa fa-shopping-cart" /> В корзину' )
          .removeClass( 'button--disabled' )
          .prop( 'disabled', false );
      }
      else if( Site.product.buy_button == 'buy' ){
        $js_buy
          .html( '<i class="fa fa-shopping-cart" /> В корзину' );
      }

    }else{
      // variant doesn't exist
      if( Site.product.buy_button == 'block' ){
        $js_buy
          .html( '<i class="fa fa-ban" /> Распродано' )
          .addClass( 'button--disabled' )
          .prop( 'disabled', true );
      }
      else if( Site.product.buy_button == 'buy' ){
        $js_buy
          .html( '<i class="fa fa-shopping-cart" /> Под заказ' );
      }

      if( variant ){
        $js_presence
          .addClass( 'product-presence_field--sell_off' )
          .html( 'Распродано' );
        $js_price_current
          .html( InSales.formatMoney( variant.price ) );
        $js_price_old
          .html( InSales.formatMoney( variant.old_price ) );
      }else{
        $js_presence
          .html( '' );
        $js_price_current
          .html( 'Модификация отсутсвует' );
        $js_price_old
          .html( '' );
      }
    }
  });

  $( '.quantity' )
    .quantity();

  Events( 'onBuyButton_Active' ).subscribe( function( $data ){
    //console.log( 'onBuyButton_Active: ', $data );
  });

  Events( 'onBuyButton_Inactive' ).subscribe( function( $data ){
    //console.log( 'onBuyButton_Inactive: ', $data );
  });
});

// ============================================================================================
//                                      PRODUCT GALLERY
// ============================================================================================

// MagicZoomPlus

var mzOptions = {
  //zoomMode: 'magnifier',
  rightClick: true,
  hint: 'always',
  textHoverZoomHint: 'Наведите для увеличения',
  textClickZoomHint: 'Нажмите для увеличения',
  textExpandHint: 'Полноэкранный просмотр',
  textBtnClose: 'Закрыть',
  textBtnPrev: 'Предыдущее',
  textBtnNext: 'Следующее',
};

var mzMobileOptions = {
  textHoverZoomHint: 'Нажмите для увеличения',
  textClickZoomHint: 'Дважды нажмите для увеличения',
  textExpandHint: ''
};

$(function(){
  $( '.js-product_gallery-preview_image' ).on( 'tap', function( e ){

    var
   	  $preview = $(this).parents( 'a:first' );

    MagicZoom.update( 'MagicZoom', $preview.data( image ), $preview.attr( 'href' ) );
    MagicZoom.expand( 'MagicZoom' );
  });
});
