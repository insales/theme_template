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
// функции для работы со свойствами модификаций
InSales.productOptions = function( $product, Base ){
  var
    self = this;

  // инициализация
  self.init = function(){
    var
      $level = Base.tree;

    Base.options = {};

    $.each( $product.option_names, function( index, $option ){
      var
        $first      = Base.treeHelpers.get_first( $level ),
        is_disabled = false;

      if( Base.settings.disableOnStart() ){
        is_disabled = true;
      };

      Base.options[ index ] = {
        id:       $option.id,
        title:    $option.title,
        selected: $first.position,
        name:     translit( $option.title ),
        disabled: is_disabled,
      };

      $level = $first.tree;
    });

    //return self;
  };

  //  option_index - порядковый номер свойства
  //  value - новое значение
  self.set = function( option_index, value ){
    var
      $options     = Base.options,
      option_index = parseInt( option_index ),
      value        = parseInt( value );

    Base.options[ option_index ].selected = value;
    // фиксим опции, которые идут выше
    var
      $level = Base.treeHelpers.get_level( option_index ),
      $leaf  = {};

    $level.forEach( function( $variant ){
      if( $variant.position == value ){
        $leaf = $variant.tree;
      };
    });

    $.each( $options, function( index, $option ){
      if( index > option_index ){
        var
          $first        = Base.treeHelpers.get_first( $leaf ),
          level         = Base.treeHelpers.get_level( index ),
          not_available = true;

        level.forEach( function( $variant ){
          if( $variant.position == $options[ index ].selected && $variant.available ){
            not_available = false;
          }
        });

        if( not_available ){
          Base.options[ index ].selected = $first.position;
        };

        $leaf = $first.tree;
      };
    });
  };

  //  получаем значение выбранной опции на уровне
  //  option_index - уровень, который проверяем
  self.get = function( option_index ){
    return Base.options[ option_index ].selected;
  };

  //  обновляем выбранные опции исходя из варианта модификации 
  //  не дописана! используется, если у нас вариант выбран внешним образом, сразу в корневом select'е
  //  new - дописано
  self.set_by_variant = function( variant_id ){
    by_variant( variant_id, Base.tree, 0 );
  };

  function by_variant( variant_id, $leaf, option_index ){
    var
      is_finded = false;

    $.each( $leaf, function( index, $variant){
      if( $variant.variant_id == variant_id ){
        is_finded = true;
      }else{
        if( $variant.tree ){
          is_finded = by_variant( variant_id, $variant.tree, option_index + 1 );
        };
      };

      if( is_finded ){
        Base.options[ option_index ].selected = $variant.position;
        return false;
      };
    });

    return is_finded;
  };

  // проверяем, было ли выбрано данное свойство
  //  используется при start_disable
  self.is_disabled = function( option_index ){
    return Base.options[ option_index ].disabled;
  };

  // разлочиваем свойство
  self.inable = function( option_index ){
    Base.options[ option_index ].disabled = false;

    var
      is_disabled = false;

    $.each( Base.options, function( key, $option ){
      if( Base.options.disabled ){ is_disabled = true };
    });

    if( !is_disabled ){
      Base.settings.start_disable.disable = false;
    };

    return is_disabled;
  };

  self.init();
};
InSales.selectorSettings = function( $config, Base ){
  var
    self = this,
    $product = $config.product;

  // инициализация настроек, установка дефолтов
  self.init = function(){
    Base.settings = self;

    // инициализация параметров рендера
    self.disable      = $config.settings.disable      || false;
    self.default_type = $config.settings.default_type || 'select';
    self.firstOption  = $config.settings.firstOption  || false;

    // кусок магии на случай нежданчика
    if( Base.url_variant_id != '' ){
      self.firstOption = false;
    };

    self.labels = {};

    if( $config.settings.labels ){
      $.each( $config.settings.labels, function( index, value ){
        self.labels[ index.toLowerCase() ] = value;
      });
    };

    // используем ли мы скрипт в коллекции?
    self.collection = $config.settings.collection || false;

    // выставляем настройки принудительного выбора модификации
    self.start_disable         = $config.settings.start_disable  || {};
    self.start_disable.disable = self.start_disable.disable || false;
    self.start_disable.first   = true;

    // дефолтный текст для селекторов
    self.start_disable.default_text = self.start_disable.default_text || 'Выберите вариант';

    // пишим свои надписи в селеты
    var
      $temp = {};

    if( $config.settings.start_disable != undefined && $config.settings.start_disable.labels ){
      $.each( $config.settings.start_disable.labels, function( index, value ){
        $temp[ index.toLowerCase() ] = value;
      });
    };

    // делаем магию на случай, если не определяли этот пааметр во входных настройках
    self.start_disable.labels = $temp;

    // подготавливаем список типов рендера
    self.params = {};

    // добавляем настройки вывода из шаблона?
    if( $config.settings.template ){
      var
        span  = $config.settings.template.span  .replace( /\s+/g, '' ).split( ',' ),
        radio = $config.settings.template.radio .replace( /\s+/g, '' ).split( ',' ),
        color = $config.settings.template.color .replace( /\s+/g, '' ).split( ',' ),
        image = $config.settings.template.image .replace( /\s+/g, '' ).split( ',' );

      $.each( span, function( index, value ){
        if( value != '' ){
          self.params[ value.toLowerCase() ] = 'span';
        };
      });

      $.each( radio, function( index, value ){
        if( value != '' ){
          self.params[ value.toLowerCase() ] = 'radio';
        };
      });

      $.each( color, function( index, value ){
        if( value != '' ){
          self.params[ value.toLowerCase() ] = 'color';
        };
      });

      $.each( image, function( index, value ){
        if( value != '' ){
          self.params[ value.toLowerCase() ] = 'image';
        };
      });
    };

    // делаем lowCase входных данных, на всякий случай
    if( $config.settings.params ){
      $.each( $config.settings.params, function( index, value ){
        self.params[ index.toLowerCase() ] = value;
      });
    };

    // настройки для файлов цветов из файлов file_url
    self.color =  {};
    if( $config.settings.color ){
      $.each( $config.settings.color, function( index, value ){
        self.color[ index.toLowerCase() ] = value;
      });
    };

    // настройки изображений из карточки товара
    self.image         = $config.settings.image  || {};
    self.image.size    = self.image.size    || 'small_url';
    self.image.preview = self.image.preview || 'large_url';

    // собираем необходимые пути изображений из карточки товара
    self.images = {};

    // сохраняем первую картинку товара
    self.images[ 'first_image' ] = {
      id:       $product.first_image.id,
      url:      $product.first_image[ self.image.size ],
      preview:  $product.first_image[ self.image.preview ],
      original: $product.first_image.original_url,
    };

    var
      $images = $product.images;

    $.each( $images, function( index, $image ){
      if( $image.title ){
        self.images[ $image.title.toLowerCase() ] = {
          id:       $image.id,
          url:      $image[ self.image.size ],
          preview:  $image[ self.image.preview ],
          original: $image.original_url,
        };
      };
    });

    //  определяем глобального родителя в DOM в зависимости от шаблона.
    //  для коллекции добавляем уточнение по форме. Требуется указать аттрибут data-product-id, куда закатываем id товара.
    if( !self.collection ){
      Base.modification_select = $( 'select'+ $config.selector );
    }else{
      Base.modification_select = $( 'form[data-product-id="'+ $product.id +'"]' ).find( 'select'+ $config.selector );
    };

    // отлавливаем вариант, когда в бек-офисе поставлена галочка "скрывать отсутствующие модификации"
    if( $( 'option', Base.modification_select ).length < $product.variants.length ){
      self.hide_unavailable = true;
    }else{
      self.hide_unavailable = false;
    };

    //return self;
  };

  self.disableOnStart = function(){
    return self.start_disable.disable && self.start_disable.first;
  };

  self.init();
};
// Функции, связанные с рендером селекторов и обработкой их событий

InSales.singleOption = function( Base ){
  var
    self = this;

  // корректируем выбранное свойство на первое доступное
  //
  //  $variants     - массив вариантов для данного уровня свойств
  //  option_id     - позиция выбранного вырианта
  //  option_index  - исходный номер опции
  self.firstAvailable = function( $variants, option_id, option_index ){
    /*
    console.log( 'firstAvailable: $variants: ', $variants );
    console.log( 'firstAvailable: start: option_id: ', option_id );
    /**/

    var
      is_first            = true,
      is_available        = false,
      available_option_id = 0,
      temp_id             = option_id;

    $.each( $variants, function( index, $variant ){
      // ищем первую доступную модификацию
      if( is_first && $variant.available ){
        is_first = false;
        available_option_id = $variant.position;
      };

      // если дошли до выбранного варианта, проверяем доступен он или нет
      if( $variant.position == option_id && $variant.available ){
        is_available = true;
      };
    });

    // если выбранный вариант не доступен
    if( !is_available ){
      option_id = available_option_id;
    };

    //console.log( 'firstAvailable: end: option_id: ', option_id );
    if( temp_id != option_id ){
      Base.optionsHelpers.set( option_index, option_id );
    };

    return option_id;
  };

  // собираем объект с данными для шаблонизатора
  self.makeData = function( $variants, index, option_id ){
    var
      title        = Base.options[ index ].title.toLowerCase(),
      disable_text = Base.settings.start_disable.labels[ title ] || Base.settings.start_disable.default_text,
      $data = new Object;

    $data = {
      options:       {},
      settings:      {},
      start_disable: {},
    };

    if( Base.settings.firstOption ){
      option_id = self.firstAvailable( $variants, option_id, index );
    };

    $data.variants = $variants;

    $data.options.selected    = option_id;
    $data.options.index       = index;
    $data.options.name        = Base.options[ index ].name;
    $data.options.is_disabled = Base.optionsHelpers.is_disabled( index );

    $data.settings.disable = Base.settings.disable;

    $data.start_disable.disable = Base.settings.start_disable.disable;
    $data.start_disable.text    = disable_text;

    $data.color  = Base.settings.color;
    $data.images = Base.settings.images;

    // прикручиваем хелперы
    // вытаскиваем цвет
    $data.getColor = function( title ){
      var
        image_name = title.toLowerCase(),
        color_path = this.color[ image_name ];

      return color_path;
    };

    // вытаскиваем url картинки для пердпросмотра
    $data.getGalleryPreview = function( title ){
      var
        image = this.getImage( title );

      return image.preview;
    };

    // вытаскиваем url оригинала картинки 
    $data.getGalleryOriginal = function( title ){
      var
        image = this.getImage( title );

      return image.original;
    };

    // вытаскиваем id картинки
    $data.getImageId = function( title ){
      var
        image = this.getImage( title );

      return image.id;
    };

    // вытаскивае картинку для блока
    $data.getBlockImage = function( title ){
      var
        image = this.getImage( title );

      return image.url;
    };

    // хелпер вытаскиваем нужную картинку
    $data.getImage = function( title ){
      var
        image_name = title.toLowerCase(),
        $images    = this.images,
        image      = {};

      if( $images[ image_name ] ){
        image = $images[ image_name ];
      }else{
        image = $images.first_image;
      };

      return image;
    };

    return $data;
  };

  //  рендер блоков со значениями
  //
  //  $variants  - объект c вариантами для данного уровня
  //  index      - порядковый номер свойства модификации для которого производим отрисовку
  //  option_id  - id варианта свойства, который выбран сейчас, на него навешивается .active
  //  
  //  считать эталоном для дебага
  self.span = function( $variants, index, option_id ){
    /*
    console.log('render: span: $variants: ', $variants);
    console.log('render: span: index: ', index);
    console.log('render: span: option_id: ', option_id);
    /**/

    var
      $data = self.makeData( $variants, index, option_id );

    return InSales.Render( $data, 'selectors', 'span' );
  };

  //  рендер radio
  self.radio = function( $variants, index, option_id ){
    var
      $data = self.makeData( $variants, index, option_id );

    return InSales.Render( $data, 'selectors', 'radio' );
  };

  //  рендер select'а
  self.select = function( $variants, index, option_id ){
    var
      $data = self.makeData( $variants, index, option_id );

    return InSales.Render( $data, 'selectors', 'select' );
  };

  //  рендер блока с цветом (из фалов)  
  self.color = function( $variants, index, option_id ){
    var
      $data = self.makeData( $variants, index, option_id );

    return InSales.Render( $data, 'selectors', 'color' );
  };

  //  рендер блока с фото товара из карточки
  self.image = function( $variants, index, option_id ){
    var
      $data = self.makeData( $variants, index, option_id );

    return InSales.Render( $data, 'selectors', 'image' );
  };

  //  прибивает все действия по изменению Основного селектора и внесение измененинй к глобальным данным
  //  $unit - ссылка на jQuery объект, который был выбран как свойство модификации
  self._bind = function( $unit ){
    var
      option_id    = $unit.data( 'option-position' ),
      option_index = $unit.data( 'option-index' ),
      is_disabled  = false;

    // для select'а нужен свой обработчик
    if( $unit.is('select') ){
      option_id = $unit.val();
    };

    Base.optionsHelpers.set( option_index, option_id );
    Base.optionsHelpers.inable( option_index );

    Base.modification_select
      .val( Base.treeHelpers.get_variant() )
      .trigger( 'change' );
  };

  // навешиваем обработку клика на отрисованный селектор
  init = function(){
    // select
    Base.main_owner.on( 'change', '.variant-select', function(){
      self._bind( $(this) );
    });

    // radio
    Base.main_owner.on( 'change', '.radio-switch', function(){
      self._bind( $(this) );
    });

    // span
    Base.main_owner.on( 'click', '.variant-span:not(.variant-span--unavailable)', function(){
      self._bind( $(this) );
    });

    // color
    Base.main_owner.on( 'click', '.variant-color:not(.variant-color--unavailable)', function(){
      self._bind( $(this) );
    });

    // image
    Base.main_owner.on( 'click', '.variant-image:not(.variant-image--unavailable)', function(){
      self._bind( $(this) );
    });
  };

  init();
};
//  функции для работы с деревом модификаций
InSales.variantsTree = function( $product, Base ){
  var
    self = this;

  //  инициализайия дерева модификаций
  self.init = function(){
    Base.tree = {};

    //  перебираем все варианты модификаций
    $.each( $product.variants, function( variants_index, $variant ) {
      var
        variant_id = $variant.id,
        $leaf      = Base.tree;

      /*
      console.log('tree: init: variants_index: ', variants_index);
      console.log('tree: init: $variant: ', $variant);
      /**/

      //  перебираем варианты свойств модификаций и вносим их в дерево модификаций
      //  так же дополняем каждый узел нужными нам свойствами
      //  если потребуется добавить информацию - делаем это тут, в нужных местах тянем нужную инфу
      $.each( $variant.option_values, function(index, $value) {
        /*
        console.log('tree: init: index: ', index);
        console.log('tree: init: $value:', $value);
        /**/

        var
          id = '';
        //  если дошли до последнего уровня, то записываем вариант модификации и ее доступность
        if( index == ($variant.option_values.length - 1) ){
          id = variant_id;
          var
            is_available = $variant.available;
        };

        //  если такого свойства модификации еще нет, то загоняем все параметры в ноду
        if( !$leaf[ $value.position ] ){
          $leaf[ parseInt( $value.position ) ] = {
            id:           parseInt( $value.id ),
            tree:         {},
            title:        $value.title,
            variant_id:   id,
            position:     parseInt( $value.position ), 
          };

          if( is_available !== undefined ){
            $leaf[ $value.position ].available = is_available;
          };
        };

        $leaf = $leaf[ $value.position ].tree;
      });

      //return $tree;
    });

    //  проставляем доступность опций модификаций по дереву
    $.each( Base.tree, function( index, $leaf ) {
      leaf_available( $leaf );
    });
  };

  //  фиксим доступность свойств модификаций прямо в дереве
  function leaf_available( $leaf ){
    if( $leaf.variant_id == '' ){
      var
        is_available = false;

      $.each( $leaf.tree, function( index, $child ){
        if( leaf_available( $child ) ){
          is_available = true;
        };
      });

      $leaf.available = is_available;
    };

    return $leaf.available;
  };

  //  получаем вариант модификации, основываясь на выбранных опциях
  //  возвращает id варианта модификации
  self.get_variant = function(){
    var
      $leaf      = Base.tree,
      variant_id = 0;

    /*
    console.log('tree: get_variant: $leaf: start: ', $leaf);
    console.log('');
    /**/

    $.each( Base.options, function( index, $option ){
      var
        option_id = $option.selected;

      /*
      console.log('tree: get_variant: each: $option: ',$option);
      console.log('tree: get_variant: each: $leaf: ',$leaf);
      /**/

      if( $leaf[ option_id ].variant_id == '' ){
          $leaf = $leaf[ option_id ].tree;
      }else{
        variant_id = $leaf[ option_id ].variant_id;
      };
    });

    return variant_id;
  };

  //  возвращает массив значений с уровня
  //  level - уровень дерева
  self.get_level = function( level ){
    var
      $leaf  = Base.tree,
      $level = [],
      sort   = [];

    $.each( Base.options, function( option_level, $option ){
      var
        option_id = $option.selected;

      if( option_level == level ){
        $.each( $leaf, function( leaf_index, $variant ){
          sort.push( parseInt( leaf_index ) );
        });

        return false;
      };

      $leaf = $leaf[ option_id ].tree;
    });

    sort.sort( function( a, b ){ 
      return a - b;
    });

    $.each( sort, function( index ){
      $level.push({
        title:     $leaf[ sort[ index ] ].title,
        available: $leaf[ sort[ index ] ].available,
        tree:      $leaf[ sort[ index ] ].tree,
        position:  $leaf[ sort[ index ] ].position,
        id:        $leaf[ sort[ index ] ].id
      });
    });

    return $level;
  };

  //  выбор первого ДОСТУПНОГО элемента на уровне дерева
  //  возвращает объект
  self.get_first = function( $level ){
    var
      $first = {},
      temp   = [],
      flag   = false;

    $.each( $level, function( position, $variant ){
      temp[ $variant.position ] = $variant;
    });

    temp.forEach( function( $key ){
      if( !flag ){
        if( Base.settings.hide_unavailable ){
          if( $key.available ){
            $first = $key;
            flag = true;
          };
        }else{
          $first = $key;
          flag = true;
        };
      };
    });

    return $first;
  };

  self.init();
};