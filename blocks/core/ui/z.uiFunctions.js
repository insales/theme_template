// =======================================================================
//                       COMMON TOGGLERS FUNCTION
// =======================================================================

triggerClass = function( obj, from_class, to_class, target_tag ){
  target_tag = target_tag || 'i';

  obj
    .find( target_tag )
      .toggleClass( from_class )
      .toggleClass( to_class );
};

// =======================================================================
//                              STYLE SELECT
// =======================================================================

styleSelect = function( selector ){
  $( selector ).each( function(){
    var
      parent = $(this).parent();

    if( !parent.hasClass( 'styled_select-wrapper' ) ){
      $(this).wrap( '<div class="styled_select-wrapper" />' );
    }
  });
};