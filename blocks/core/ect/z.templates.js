// ====================================================================================
//                                  TEMPLATES
// ====================================================================================

// обертка для сборщика шаблонов.
// handle - строка, содержащая название класса <template />
// перебирает все <template /> с заданным классом, и забивает их шаблоны в структуру,
// согласно id
// например <template id='dropdown' class='basket' ></template>
// занесется в список как вьюха 'dropdown' объекта 'basket'
// TemplateList.basket -> dropdown
InSales.Template = function( handle ){
  var
    $root = {};

  $( 'script.'+ handle ).each( function(){
    var
      template = $(this).html();

    $root[ $(this).attr( 'id' ) ] = template;
  });

  TemplateList[ handle ] = ECT({
    root: $root
  });
};

// обертка для рендера
// вытаскивает нужную вьюху определенного объекта
// здесь втыкаем общие хелперы
// например, форматирование валюты в нужный вид, согласно настройкам БО
InSales.Render = function( $data, class_name, view ){
  $data[ 'formatMoney' ] = function( price ){
    return InSales.formatMoney( price );
  };

  if( TemplateList[ class_name ] ){
    return TemplateList[ class_name ].render( view, $data );
  }else{
    console.log( 'Вы не подключили шаблон', class_name );
  }
};