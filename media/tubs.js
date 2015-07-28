// ===============================================================================================
//                                          TUBS
// ===============================================================================================

$( '.tubs-node' ).on( 'click', function(){
  var
    $unit    = $(this),
    $content = $unit.parents( '.tubs:first' ).find( '.tubs-content' ),
    tub_id   = $unit.data( 'target' );

  $unit
    .siblings( '.tubs-node--active' )
      .removeClass( 'tubs-node--active' )
      .end()
    .addClass( 'tubs-node--active' );

  $content
    .removeClass( 'tubs-content--active' )
    .siblings( tub_id )
      .addClass( 'tubs-content--active' );
});