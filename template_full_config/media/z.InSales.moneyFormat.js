// =====================================================================================
//                                formatMoney
// =====================================================================================

// правильно формируем объект цены
InSales.initMoney = function( params ) {
  var
    moneyParams = {},
    temp        = {};

  temp = $.parseJSON( params );

  moneyParams.format   = temp.format;
  moneyParams.unit     = temp.unit;
  moneyParams.separator = temp.separator;

  if( temp.delimiter ){
    moneyParams.delimiter = temp.delimiter ;
  }else{
    moneyParams.delimiter = '';
  }

  if( temp.show_price_without_cents == 1 ){
    moneyParams.show_price_without_cents = false;
  }else{
    moneyParams.show_price_without_cents= true;
  }

  return moneyParams;
};

//  основная функция преобразования цен
//  amount - цена товара

InSales.formatMoney = function( amount ) {
  // просто банхамер на входе
  if( amount === null ){
    return '';
  }

  // проверяем, заполнен ли объект форматирования цены,
  // если нет - заполняем.
  if( $.isEmptyObject( CurrencyFormat ) ){
    CurrencyFormat = InSales.initMoney( cv_currency_format );
  }

  var
    value  = parseFloat( amount ).toFixed( 2 ) || 0,
    split  = value.toString().split( '.' ),
    format = CurrencyFormat.format;

  split[ 0 ] = split[ 0 ].replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1'+ CurrencyFormat.delimiter );

  if( CurrencyFormat.show_price_without_cents ){
    value = split.join( CurrencyFormat.separator );
  }else{
    value = split[ 0 ];
  }

  return format.replace( '%n', value ).replace( '%u', CurrencyFormat.unit );
};
