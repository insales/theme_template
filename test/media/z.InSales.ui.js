// =======================================================================
//                                UI
// =======================================================================

// здесь расписан дефолтный функционал для блоков и всякие UI штуки.
// всякие переключалки - вынесены в отдельные файлы шаблонов/блоков

// подключаем функционал переключаемых блоков и их плагинов
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

  // сворачивающиеся блоки
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
$( function(){
  // улучшайзинг стандартной обратной связи
  if( Site.template == 'page' ){
    var
      $form = $( '#feedback_form');

    if( $form.is( 'form' ) ){
      var
        table     = $form.find( 'table' ),
        notice    = table.find( 'small' ),
        button    = table.find( '#feedback_commit' ),
        textarea  = table.find( 'textarea' ),
        email     = table.find( 'input[name="feedback[from]"]' );

      $form
        .removeAttr( 'style' );

      table
        .find( 'td' )
          .removeAttr( 'style' );

      textarea
        .removeAttr( 'style' )
        .addClass('input-field')
        
        .parents( 'p:first' )
          .addClass( 'input input--required' )
          .append('<div class="input-notice notice notice--danger">Заполните поле</div>')
            .find( 'label' )
              .addClass( 'input-label' );

      email
        .removeAttr( 'size' )
        .attr( 'type', 'email' )
        
        .addClass('input-field')
        .parents( 'p:first' )
          .addClass( 'input input--required' )
          .append('<div class="input-notice notice notice--danger">E-mail неправильно заполнен</div>')
            .find( 'label' )
              .addClass( 'input-label' );

      table
        .removeAttr( 'style' )
        .find( 'br')
          .remove();

      notice
        .parent()
          .html( notice.html() )
          .addClass( 'notice notice--info' );

      button
        .addClass('button button--action mc-grid-12')
        .on( 'click', function( e ){
          e.preventDefault();
          var
            $message = {},
            errors;

          errors = checkForm( $form );

          if( errors.length > 0 ){
            return;
          }

          $message[ 'feedback[content]' ] = textarea.val();
          $message[ 'feedback[from]' ] = email.val();

          // отправка и красивости
          InSales.sendMessage( $message )
            .done( function( response ){
              console.log( response );
              if( response.status == 'ok' ){
                showMessage( response.notice, 5000 );
              }
            });
        });
    }
  }
});
// =======================================================================
//                              TABS
// =======================================================================

$( '.tubs-node' ).on( 'click', function(){
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

// сброс фильтра
$( document ).on( 'click', '.js-filter-clear_all', function( e ){
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
