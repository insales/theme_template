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
    if( temp_id != option_id && option_id != 0 ){
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
