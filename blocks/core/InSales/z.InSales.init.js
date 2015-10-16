// =====================================================================================
//                                 INIT GLOBAL VARIABLES
// =====================================================================================

// cv_currency_format - исторический хвост, в него из liquid сбрасываем значение {{ money_with_currency_format }}

// Cart           - глобальный (!) объект корзины, через него ведем всю работу с корзиной
// Compare        - глобальный (!) объект для работы со сравнением
// InSales        - глобальный (!) объект для подключения 'API'
// Site           - глобальный (!) объект, в который сваливаем все переменные и флаги из liquid, которые нам могут понадобиться для работы js

// CurrencyFormat - объект в который сваливаем разобраный и сконфигуренный формат денег для InSales.formatMoney()
// EventsList     - список событий
// TemplateList   - объект с шаблонами для виджетов и прочей ереси js

var
  cv_currency_format = '',
  Cart               = {},
  Compare            = {},
  InSales            = {},
  CurrencyFormat     = {},
  EventsList         = {},
  TemplateList       = {};

if( !Site ){
  var
    Site = {};
}

// =====================================================================================
//                                UTILITY FUNCTIONS
// =====================================================================================

// дополнительный метод, упрощает сборку плагинов для jQuery
Object.create = function( obj ){
  function F() {}
  F.prototype = obj;
  return new F();
};

// правильное написание "товар" в зависимости от количества
ProductsCount = function( items_count ){
  var
    str = 'товар';

  if ( items_count > 4 || items_count === 0 ){
    str = 'товаров';
  } else if( items_count != 1 ){
    str = 'товара';
  }

  return str;
};

// вспомогательная функция, точно определяет тип переменной, исходя из ее прототипа
// свой маленький велосипедик для упрощения работы некоторых кусков кода
type_of = function( $obj ){
  var
    string = Object.prototype.toString.call( $obj ),
    temp   = string.split( ' ' ),
    type   = '';

  if( $obj.jquery ){
    type = 'jQuery';
  } else {
    type = temp[ 1 ].replace( ']', '' );
  }

  return type;
};

// подготовка для json
//
// делает валидный? Json из строки data-params DOM элемента

prepareJSON = function( string ){
  if( !string ){
    return {};
  }

  var
    temp   = [],
    result = [];

  string = string.replace(/\s+/g, '').split(';');

  for( var i = 0; i < string.length; i++ ){
    if( string[i] !== '' ){
      temp = string[i].split( ':' );

      result.push( '"'+ temp[0] +'":'+ temp[1].replace( /\'/g, '"' ) );
    }
  }

  return $.parseJSON( '{'+ result.join(',') +'}' );
};

// забираем data-params DOM элемента
getParams = function( $obj ){
  var
    readyParams = $obj.data( 'readyParams' ),
    params;

  // есть ли у нас разобранный объект?
  if( !$.isEmptyObject( readyParams ) ){
    return readyParams;
  }

  // если нет, то
  // разбираем строку и сохраняем готовый объект
  params = prepareJSON( $obj.attr( 'data-params' ) );
  $obj
    .data( 'readyParams', params );

  return params;
};

setParams = function( $obj, params ){
  $obj
    .data( 'readyParams', params );
};

// производим транслитерацию строки
translit = function( string ){
  var
    space     = '_',
    $translit = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
      'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
      ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
      '#': space, '$': space, '%': space, '^': space, '&': space, '*': space,
      '(': space, ')': space,'-': space, '\=': space, '+': space, '[': space,
      ']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
      '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
      '?': space, '<': space, '>': space, '№':space
    },
    result  = '',
    current = '';

  string = string.toLowerCase();

  for( i = 0; i < string.length; i++ ){
    if( $translit[ string[ i ] ] !== undefined ){
      result += $translit[ string[i] ];
    }else{
      result += string[ i ];
    }
  }

  return result;
};

// хелпер для позиционирования разного рода всплывашек
changeCss = function( $obj ){
  var
    modalHeight  = parseInt( $obj.height() ),
    modalWidth   = parseInt( $obj.width() ),
    windowWidth  = parseInt( $(window).width() ),
    windowHeight = parseInt( $(window).height() );

  $obj.css({
    'left': ( windowWidth - modalWidth ) / 2 ,
    'top':  ( windowHeight - modalHeight ) / 2,
  });
};

// разбираем location.search на ключи
if( !Site.urlKeys ){
  Site.urlKeys = {};

  var
    search = window.location.search.replace( '?', '' ).split( '&' );

  $.each( search, function( index, part ){
    if( part !== '' ){
      part = part.split( '=' );

      Site.urlKeys[ part[ 0 ] ] = part[ 1 ];
    }
  });
}

// забираем значение по ключу
getUrlValuy = function( key ){
  if( Site.urlKeys[ key ] ){
    return Site.urlKeys[ key ];
  }else{
    return false;
  }
};

// разворачиваем массив продуктов в объект для более прозрачного доступа к информации
convertProducts = function( array ){
  var
    obj = {};

  $.each( array, function( index, product ){
    obj[ product.id ] = product;
  });

  return obj;
};

// формируем объект ответа
makeData = function( $input, $data ){
  $data = $data || {};

  // выкидываем из ответа функции и прочее, нам нужна просто голая информация
  $.each( $input, function( key, value ){
    if( typeof( value ) !== 'function' ){
      $data[ key ] = value;
    }
  });

  return $data;
};
