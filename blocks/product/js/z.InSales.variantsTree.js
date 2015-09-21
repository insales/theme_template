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