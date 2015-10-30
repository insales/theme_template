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
  var
    $form = $( '#feedback_form');

  if( $form.is( 'form' ) ){
    // находим все элементы для стилизации
    var
      table     = $form.find( 'table' ),
      notice    = $form.find( 'small' ),
      button    = $form.find( '#feedback_commit' ),
      textarea  = $form.find( 'textarea' ),
      email     = $form.find( 'input[name="feedback[from]"]' );

    // сносис инлайновые стили
    $form
      .removeAttr( 'style' );

    table
      .find( 'td' )
        .removeAttr( 'style' );

    // стилизуем поле сообщения и его подсказку
    textarea
      .removeAttr( 'style' )
      .attr( 'title', 'Сообщение' )
      .addClass('input-field')
      .parents( 'p:first' )
        .addClass( 'input input--required' )
        .append('<div class="input-notice notice notice--danger">Заполните поле</div>')
          .find( 'label' )
            .addClass( 'input-label' );

    // стилизуем поле ввода email
    email
      .removeAttr( 'size' )
      .attr({ type: 'email', title: "E-mail" })
      .addClass('input-field')
      .parents( 'p:first' )
        .addClass( 'input input--required' )
        .append('<div class="input-notice notice notice--danger">E-mail неправильно заполнен</div>')
          .find( 'label' )
            .addClass( 'input-label' );

    // чистим таблицу
    table
      .removeAttr( 'style' )
      .find( 'br' )
        .remove();

    // форматируем начальные подсказки
    notice
      .parent()
        .html( notice.html() )
        .addClass( 'notice notice--info' );

    // стилизуем кнопку ( отправить )
    // вешаем обработку
    button
      .addClass('button button--action mc-grid-12')
      .on( 'click', function( e ){
        e.preventDefault();

        sendForm({
          form: $form,
          from: email.val(),
          callback: function(){
            $form
              .find( '.input-field' )
                .val( '' );
          }
        });
      });
  }
});

// ===============================================================================
//                            SLIDER ARROWS & ETC
// ===============================================================================

$( document ).on( 'click', '.js-slider-left', function(){
  $(this)
    .parents( '.slider:first' )
      .find( '.slider-container' )
        .trigger( 'prev.owl.carousel' );
});

$( document ).on( 'click', '.js-slider-right', function(){
  $(this)
    .parents( '.slider:first' )
      .find( '.slider-container' )
        .trigger( 'next.owl.carousel' );
});

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

  var
    $form = $(this).parents( 'form:first' );

  $form
    .find( 'input[type="hidden"]' )
      .prop( 'disabled', true );

  $form
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

// =======================================================================
//                          COLLECTION SORT
// =======================================================================

  $('.js-sort_by').change( function(){
    $(this)
      .parents( 'form:first' )
        .submit();
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
