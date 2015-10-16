// =====================================================================================
//                                  AJAX ADD TO CART
// =====================================================================================

// логика кнопки "Купить/в корзину"
// событие возаращает jQuery-объект кнопки

ajaxBuyButton = function( buttonSelector ){
  $( document ).on( 'click', buttonSelector, function( e ){
    e.preventDefault();

    var
      $data = {
        jqObj: $(this),
      };

    if( !$(this).hasClass( 'button--disabled' ) || $(this).attr( 'disabled' ) != 'disabled' ){
      Events( 'onBuyButton_Active' ).publish( $data );

      Cart.addItem( $(this).parents( 'form:first') );
    }else{
      Events( 'onBuyButton_Inactive' ).publish( $data );
    }
  });
};
