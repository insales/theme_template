// ============================================================================================
//                                      PRODUCT GALLERY
// ============================================================================================

// MagicZoomPlus

var mzOptions = {
  //zoomMode: 'magnifier',
  rightClick: true,
  hint: 'always',
  textHoverZoomHint: 'Наведите для увеличения',
  textClickZoomHint: 'Нажмите для увеличения',
  textExpandHint: 'Полноэкранный просмотр',
  textBtnClose: 'Закрыть',
  textBtnPrev: 'Предыдущее',
  textBtnNext: 'Следующее',
};

var mzMobileOptions = {
  textHoverZoomHint: 'Нажмите для увеличения',
  textClickZoomHint: 'Дважды нажмите для увеличения',
  textExpandHint: ''
};

$(function(){
  $( '.js-product_gallery-preview_image' ).on( 'click touchstart', function( e ){

    var
   	  $preview = $(this).parents( 'a:first' );

    MagicZoom.update( 'MagicZoom', $preview.data( image ), $preview.attr( 'href' ) );
    MagicZoom.expand( 'MagicZoom' );
  });
});
