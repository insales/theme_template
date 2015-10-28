// =======================================================================
//                              TABS
// =======================================================================

$( '.tubs-node' ).on( 'click touchstart', function(){
  var
    $unit    = $(this),
    $content = $unit.parents( '.tubs:first' ).find( '.tubs-content' ),
    params   = getParams( $unit );

  $unit
    .siblings( '.tubs-node--active' )
      .removeClass( 'tubs-node--active' );

  $unit
    .addClass( 'tubs-node--active' );

  $content
    .removeClass( 'tubs-content--active' )
    .siblings( params.target )
      .addClass( 'tubs-content--active' );
});

// переключаемся на первую доступную вкладку
$( function(){
  $( '.tubs-node:first' )
    .trigger( 'click' );
});
