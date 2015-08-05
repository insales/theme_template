// ===================================================================================
//                                   CART
// ===================================================================================

// создаем объект корзины
Cart = new InSales.Cart();

// привязываем обработку кнопки "купить"
ajaxBuyButton( '.js-buy' );

// философия разделения на несколько функций, которые слушают события, в том,
// чтобы не сломать весь сайт своими малыми или большиими изменениями.
// это позволяет легче сопровождать и модифицировать скрипты

$(function(){
  // обновляем корзину и виджет
  Events( 'onCart_Update' ).subscribe( function( $data ){
    //console.log( 'onCart_Update',$data );
    var
      basket = $data

    // генерим виджет корзины ( из шаблона )
    $( '.basket_list' )
      .html( InSales.Render( basket, 'cart', 'dropdown' ) );

    // пересчет кол-ва товаров в basket
    $('.js-basket-items_count')
      .html( basket.items_count );
    $('.js-basket-total_price')
      .html( InSales.formatMoney( basket.total_price ) );
  });

  // обновляем общую стоимость заказа на странице корзины
  // выводим скидки при обновлении корзины ( из шаблона )
  Events( 'onCart_Update' ).subscribe( function( $data ){
    //console.log( 'onCart_Update',$data );
    var
      basket = $data;

    if( Site.template == 'cart' ){
      // вставляем в целевой блок шаблон со скидками
      $( '.js-discounts-list' )
        .html( InSales.Render( basket, 'cart', 'discounts' ) );

      $( '.js-cart-total' )
        .html( InSales.formatMoney( basket.total_price ) );
    };
  });

  // сообщаем о добавлении товара в корзину
  Events( 'onCart_Add' ).subscribe( function( $data ){
    //console.log( 'onCart_Add', $data );
    // да, просто показываем нужную нам модалку
    modal.show({
      template: 'product_added',
      overlay: true,
    });
  });

  // удаляем элемент из списка товаров
  Events( 'onCart_Delete' ).subscribe( function( $data ){
    //console.log( 'onCart_Delete', $data );
    // ограничиваем действие этого скрипта
    // он должен отрабатывать только на странице корзины
    if( Site.template == 'cart' ){
      if ( $data.total_price == 0 ){
        $('.cart-table_container').hide();
        $('.notice--empty').show();

        return;
      };

      var
        $item_row = $( '.cart_item[data-item-id="'+ $data.removed +'"]' );

      $item_row
        .slideUp( 400, function(){
          $item_row.remove();
        });
    };
  });

  // пересчитываем список товаров в корзине
  Events( 'onQuantity_Change' ).subscribe( function( $data ){
    //console.log( 'onQuantity_Change', $data );
    if( Site.template == 'cart' ){
      // обновляем цены с учетом типа цены и прочего
      $data.inputElement
        .parents('.cart_item:first')
          .find('[class*="js-price_type"]')
            .update({
              quantity: $data.current
            });

      Cart.recalculateOrder( '#cartform' );
    };
  });

  // в форме нажали enter, хотя вопрос - зачем это
  $( '#cartform' ).on( 'keypress', function(e) {
    if( e.keyCode == 13 ){
      e.preventDefault();

      Cart.recalculateOrder( '#cartform' );
      return false;
    };
  });

  // принудительно отрабатываем нажатие на
  // кнопку "применить купон"
  $( '.js-discounts-submit' ).on( 'click', function( e ){
    $(this).parents( 'form:first' ).submit();
  });

  // обновление цен с учетом типа цен
  Events( 'onPriceType_Change' ).subscribe( function( $data ){
    //console.log( 'onPriceType_Change: ', $data );
    if( Site.template == 'cart' ){
      var
        $item_row    = $data.jqObj.parents('.cart_item:first'),
        $total_price = $item_row.find('.js-cart_item-total'),
        price        = $data.quantity * $data.price;

      $data.jqObj.html( InSales.formatMoney( $data.price ) );
      $total_price.html( InSales.formatMoney( price ) );
    }
  });
});