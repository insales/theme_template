// ===================================================
//                      MENU
// ===================================================

$(function(){
  // прикручиваем переключение маркеров
  $(document).on( 'click touchstart', '.js-menu-toggler', function( e ){
    e.preventDefault();

    triggerClass( $(this), 'fa-plus', 'fa-minus' );
  });

  // прикручиваем плагин, которые переключает вид меню с брейкпоинта
  $('.footer_block-title').collapseMenu({
    wrapper: '.footer_block',
  });
});

// ===================================================================================
//                                  COLLECTION
// ===================================================================================
$(function(){
  // переключалка блока
  $('.js-filter_section-toggler').click(function(){
    triggerClass( $(this), 'fa-plus', 'fa-minus' );
  });

  // запускаем диапазон. все диапазоны ;)
  $( '.js-section-range' )
    .rangeFilter();
});

$(function(){
  var ajaxSearch = new InSales.Search();

  Events( 'onAjaxSearch' ).subscribe( function( $data ){
    console.log( $data );

    console.log( InSales.Render( $data, 'search', 'ajax' ) );
  });

  // search_widget
  $( '.js-search_widget-wrapper' ).hide();

  $( document ).on( 'click', '.js-search_widget-toggler', function( e ){
    e.preventDefault();

    $( '.js-search_widget-wrapper' )
      .toggle();
  });
});