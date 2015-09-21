$(function(){
  Recently = new InSales.RecentlyView({
    maxItems: 3,
  });

  Events( 'onRecently_Update').subscribe( function( $data ){
    $( '.js-recently_view' )
      .html( InSales.Render( $data.obj, 'product', 'list' ) );
  });

  if( Site.template == 'product' ){
    Recently.addItem( Site.product.id );
  };
});