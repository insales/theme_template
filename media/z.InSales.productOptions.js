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