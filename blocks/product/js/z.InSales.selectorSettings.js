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
    if( typeof Base.url_variant_id != 'undefined' && Base.url_variant_id != '' ){
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
