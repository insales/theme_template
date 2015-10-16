// =======================================================================
//                          COLLECTION FILTER
// =======================================================================

// перехватваем нажатия на варианты значений
var
  targets = '.js-filter_section-value_input, .js-filter_section-value_link, .js-filter_section-value_disable';

$( document ).on( 'click touchstart', targets, function(e){
  var
    $section_value = $(this).parents( '.filter_section-value:first' ),
    $checkbox      = $section_value.find( '.js-filter_section-value_input' ),
    $input         = $section_value.find( '.js-filter_section-characteristic' );

  if( !$(this).hasClass( 'js-filter_section-value_input' ) ){
    e.preventDefault();

    $checkbox
      .prop( 'checked', function( i, val ){
        return !val;
      });
  }

  $input
    .trigger( 'change' );
});

// сброс фильтра
$( document ).on( 'click touchstart', '.js-filter-clear_all', function( e ){
  e.preventDefault();

  $( '.js-filter_section-value_input:checked' ).each( function(){
    $(this)
      .trigger( 'click' );
  });

  $( '.filter_section-value--range' ).each( function(){
    var
      params = getParams( $(this) );

    $(this).get( 0 )
      .noUiSlider.set([ params.min, params.max ]);
  });

  $(this)
    .parents( 'form:first' )
      .submit();
});

// ловим изменение значения в скрытых полях фильтра
$( document ).on( 'change', '.js-filter_section-characteristic', function(){
  var
    $section_value = $(this).parents( '.filter_section-value:first' ),
    $form          = $(this).parents( 'form:first' ),
    params         = getParams( $form );

  $(this)
    .prop( 'disabled', function( i, val ){
      return !val;
    });

  $section_value
    .toggleClass( 'filter_section-value--current' );

  if( params.submit ){
    $form.submit();
  }
});
