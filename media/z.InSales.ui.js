// =======================================================================
//                                UI
// =======================================================================

// здесь расписан дефолтный функционал для блоков и всякие UI штуки.
// всякие переключалки - вынесены в отдельные файлы шаблонов/блоков

// подключаем функционал переключаемых блоков и их плагинов плагин
var
  // менюшки
  menuToggler = new InSales.CollapseBlock({
    togglerClass: 'js-menu-toggler',
    wrapperClass: 'js-menu-wrapper',
    targetClass:  'menu',
    blockType:    'Menu',
  }),

  // секции фильтра
  filterSectionToggler = new InSales.CollapseBlock({
    togglerClass: 'js-filter_section-toggler',
    wrapperClass: 'js-filter_section-wrapper',
    targetClass:  'filter_section-values',
  }),

  // скрытие группы секций фильтра
  filterToggler = new InSales.CollapseBlock({
    togglerClass: 'js-filter-sections_toggler',
    wrapperClass: 'js-filter-sections_wrapper',
    targetClass:  'filter-hidden_sections',
  }),

  accordionToggler = new InSales.CollapseBlock({
    togglerClass: 'js-accordion-toggler',
    wrapperClass: 'js-accordion-wrapper',
    targetClass:  'accordion-content',
    blockType:    'Accordion',
  });

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
//                          COLLECTION FILTER
// =======================================================================

// перехватваем нажатия на варианты значений
$( document ).on( 'click', '.js-filter_section-value_input, .js-filter_section-value_link, .js-filter_section-value_disable', function(e){
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
  };

  $input
    .trigger( 'change' );
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
  };
});

// =======================================================================
//                          COLLECTION SORT
// =======================================================================

  $('.js-sort_by').change( function(){
    $(this).parents( 'form:first' ).submit();
  });

// =======================================================================
//                              COMPARE
// =======================================================================

// дефолтное поведение для переключателя в сравнении
$( document ).on( 'click', '.js-compare-toggle_same', function( e ){
  e.preventDefault();

  $( '.js-compare_row--same' )
    .toggle();
});

// =======================================================================
//                              TUBS
// =======================================================================

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

// =======================================================================
//                              STYLE SELECT
// =======================================================================

styleSelect = function( selector ){
  $( selector ).each( function(){
    var
      parent = $(this).parent();

    if( !parent.hasClass( 'styled_select-wrapper' ) ){
      $(this).wrap( '<div class="styled_select-wrapper" />' );
    };
  });
}