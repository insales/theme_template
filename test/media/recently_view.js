$(function(){
  Recently = new InSales.RecentlyView({
    maxItems: 3,
  });

  Events( 'onRecently_Update').subscribe( function( $data ){
    if( $data.products.length > 0 ){
      $( '.js-recently_view-wrapper' )
        .show();
      $( '.js-recently_view' )
        .html( InSales.Render( $data, 'product', 'list' ) );
    }
    else{
      $( '.js-recently_view-wrapper' )
        .hide();
    }
  });

  if( Site.template == 'product' ){
    Recently.addItem( Site.product.id );
  }
});
