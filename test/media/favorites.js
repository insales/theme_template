// =============================================================
//                      FAVORITE
// =============================================================

var
  Favorite = new InSales.Favorites();

$(function(){
  Events( 'onFavorite_Update' ).subscribe( function( $data ){
    //console.log( 'onFavorite_Update: ', $data );

    if( $data.products.length === 0 ){
      $( '.js-favorite-notice' ).show();
    }else{
      $( '.js-favorite-notice' ).hide();

      $( '.js-favorite-product_list' )
        .html( InSales.Render( $data, 'product', 'list' ) );
    }
  });

  Events( 'onFavorite_Add' ).subscribe( function( $data ){
    //console.log( 'onFavorite_Add: ', $data );


  });

  Events( 'onFavorite_Remove' ).subscribe( function( $data ){
    //console.log( 'onFavorite_Remove: ', $data );
  });
});
