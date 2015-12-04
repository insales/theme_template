// ===================================================================================
//                                   CART
// ===================================================================================

$(function(){
  // создаем объект корзины
  Cart = new InSales.Cart();

  // привязываем обработку кнопки "купить" к нужному классу
  ajaxBuyButton( '.js-buy' );

  // идея разделения на несколько функций, которые слушают события, в том,
  // чтобы не сломать весь сайт своими малыми или большиими изменениями.
  // это позволяет легче сопровождать и модифицировать скрипты

  // обновляем корзину и виджет
  Events( 'onCart_Update' ).subscribe( function( $data ){
    //console.log( 'onCart_Update',$data );

    // генерим виджет корзины ( из шаблона )
    $( '.basket_list' )
      .html( InSales.Render( $data, 'cart', 'dropdown' ) );

    // пересчет кол-ва товаров в $data
    $('.js-cart_widget-items_count')
      .html( $data.items_count );
    $('.js-cart_widget-total_price')
      .html( InSales.formatMoney( $data.total_price ) );
  });

  // обновляем общую стоимость заказа на странице корзины
  // выводим скидки при обновлении корзины ( из шаблона )
  if( Site.template == 'cart' ){
    Events( 'onCart_Update' ).subscribe( function( $data ){
      //console.log( 'onCart_Update',$data );

      // вставляем в целевой блок шаблон со скидками
      $( '.js-discounts-list' )
        .html( InSales.Render( $data, 'cart', 'discounts' ) );

      $( '.js-cart-total' )
        .html( InSales.formatMoney( $data.total_price ) );
    });
  }

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
  if( Site.template == 'cart' ){
    Events( 'onCart_Delete' ).subscribe( function( $data ){
      //console.log( 'onCart_Delete', $data );
      // ограничиваем действие этого скрипта
      // он должен отрабатывать только на странице корзины
      if( $data.total_price === 0 ){
        $('.cart-table_container').hide();
        $('.js-cart-notice').show();

        return;
      }

      var
        $item_row = $( '.cart_item[data-item-id="'+ $data.removed +'"]' );

      $item_row
        .slideUp( 400, function(){
          $item_row.remove();
        });
    });
  }

  // пересчитываем список товаров в корзине
  if( Site.template == 'cart' ){
    Events( 'onQuantity_Change' ).subscribe( function( $data ){
      //console.log( 'onQuantity_Change', $data );
      // обновляем цены с учетом типа цены и прочего
      $data.inputElement
        .parents('.cart_item:first')
          .find('[class*="js-price_type"]')
            .update({
              quantity: $data.current
            });

      Cart.recalculateOrder( '#cartform' );
    });
  }

  // в форме нажали enter, хотя вопрос - зачем это
  $( '#cartform' ).on( 'keypress', function(e) {
    if( e.keyCode == 13 ){
      e.preventDefault();

      Cart.recalculateOrder( '#cartform' );
      return false;
    }
  });

  // принудительно отрабатываем нажатие на
  // кнопку "применить купон"
  $( '.js-discounts-submit' ).on( 'click', function( e ){
    e.preventDefault();

    // блочим маркер "делаем оформление заказа"
    $( '[name="make_order"]' )
      .attr( 'disabled', true );

    $(this)
      .parents( 'form:first' )
        .submit();
  });

  // обновление цены с учетом типа цен
  if( Site.template == 'cart' ){
    Events( 'onPriceType_Change' ).subscribe( function( $data ){
      //console.log( 'onPriceType_Change: ', $data );
      var
        $item_row    = $data.jqObj.parents('.cart_item:first'),
        $total_price = $item_row.find('.js-cart_item-total'),
        price        = $data.quantity * $data.price;

      $data.jqObj.html( InSales.formatMoney( $data.price ) );
      $total_price.html( InSales.formatMoney( price ) );
    });
  }
});
