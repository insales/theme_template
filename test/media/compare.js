$(function(){
  Compare = new InSales.Compare();

  // слушаем обновление сравнения
  Events( 'onCompare_Update' ).subscribe( function( $data ){
    //console.log( 'onCompare_Update: ', $data );
  });

  // слушаем добавление
  Events( 'onCompare_Add' ).subscribe( function( $data ){
    //console.log( 'onCompare_Add: ', $data );

    showMessage( $data.text.addItem, 3000 );
  });

  // товар уже в списке?
  Events( 'onCompare_inList' ).subscribe( function( $data ){
    //console.log( 'onCompare_inList: ', $data );

    showMessage( $data.text.repeatItem, 3000 );
  });

  if( Site.template == 'compare' ){
  // удаляем товар в сравнении
    Events( 'onCompare_Remove' ).subscribe( function( $data ){
      //console.log( 'onCompare_Remove: ', $data );

      if( $data.products.length == 0 ){
        $( '.compare-notice' ).show();
        $( '.compare-wrapper' ).hide();
      }

      var
        $item = $( '.js-compare_item-'+ $data.removed );

      $item
        .remove();
    });
  }

  // выводим сообщение, когда удалили товар из сравнения
  Events( 'onCompare_Remove' ).subscribe( function( $data ){
    showMessage( $data.text.removeItem, 2000 );
  });

  // мы достигли максимума товаров в списке
  Events( 'onCompare_maxItem' ).subscribe( function( $data ){
    showMessage( $data.text.maxItem, 2000 );
  });

  // переключение стилей
  $( '.js-compare-toggle_same' ).on( 'click', function( e ){
  });
});