// =======================================================================
//                        OPTIONS SELECTOR
// ver 0.9
//
// отличия:
// - использование шаблонизатора ECT для рендера селекторов
// - скрипт разбит на несколько функциональных блоков
//
// =======================================================================

InSales.OptionSelectors = function( $config ){
  var
    Base = this;

  // основная логика вывода и построения селекторов
  build = function(){
    // готовим общие переменные и прочие ништяки
    var
      $select_wrapper = Base.main_owner.find('div.option_selector'),
      render_type     = '',
      selectors       = '';

    $select_wrapper.remove();

    // проверяем, было ли измнено значение основного селекта внешним способом
    if( Base.modification_select.val() != Base.treeHelpers.get_variant() ){
      Base.optionsHelpers.set_by_variant( parseInt( Base.modification_select.val() ) );
    };
    
    // основной цикл отрисовки селетора
    $.each( Base.options, function( option_index, $option ) {
      var
        title           = $option.title.toLowerCase(),
        selected_option = $option.selected,
        option_title    = Base.settings.labels[ title ] || $option.title;
        render_type     = Base.settings.params[ title ] || Base.settings.default_type,
        $variants       = Base.treeHelpers.get_level( option_index );

      // сборка селектора
      selectors +=
        '<div class="option_selector '+
                    'option_selector--'+ $option.name +'" >'+

          '<label class="option_selector-label '+
                        'option_selector-label--'+ $option.name +'">'+
            option_title +
          '</label>'+

          '<div class="option_selector-container '+
                      'option_selector-container--'+ $option.name +'" >'+
            Base.render[ render_type ]( $variants, option_index, selected_option ) +
          '</div>'+
        '</div>';
    });

    Base.main_owner.append(selectors);
  };

  init = function(){
    // старт отрисовки
    // готовим настройки, дерево вариантов модификаций, общие переменные и прочее
    var
      url_variant_id = getUrlValuy( 'variant_id' ),
      $product       = $config.product;

    Base.settings       = new InSales.selectorSettings( $config, Base );
    Base.main_owner     = Base.modification_select.parent();
    Base.treeHelpers    = new InSales.variantsTree( $product, Base );
    Base.optionsHelpers = new InSales.productOptions( $product, Base );
    Base.render         = new InSales.singleOption( Base );
    Base.variants       = {};

    $.each( $product.variants, function( index, $variant ){
      Base.variants[ $variant.id ] = $variant;
    });

    // проверяем, есть ли в адресной строке выбранный вариант. Фикс для Яндекса
    if( url_variant_id != '' ){
      Base.modification_select.val( url_variant_id );
    };

    // запускаем отрисовку и вешаем обновление на первый селектор.
    Base.modification_select
      .hide()
      .on( 'change', function(){
        build();

        // выполняем callback
        // возможно проще собрать нужную инфу и скинуть черз событие
        var
          variant_id = Base.treeHelpers.get_variant(),
          $data      = {};

        $data = {
          variant: Base.variants[ variant_id ],
          jqObj: Base.modification_select,
          is_disabled: Base.settings.disableOnStart(),
        };

        Events( 'onProductOption_Changed' ).publish( $data );
      })
      .trigger( 'change' );
  };

  init();
};