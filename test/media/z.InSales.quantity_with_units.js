// =====================================================================================
//                                QUANTITY
// =====================================================================================


// NOTE!!
// терминальные случаи,
// вроде того, что на складе доступно меньше минимального для счетчика количества товаров,
// нужно обрабатывать в шалоне, например через liquid

(function ( $, window, document ){

  // объявляем логику
  var quantity = {
    // инициализация,
    //
    // options - настройки. можно передать классы элементов для поиск
    //    - plusSelector, клас кнопки "минус"
    //    - minusSelector, класс кнопки "плюс"
    //    - inputSelector, класс поля ввода
    //
    // qntty_container - контейнер счетчика
    init: function( options, qntty_container ){
      var
        self    = this,
        params  = {},
        mod     = 0;

      options = options || {};

      options.plusSelector  = options.plusSelector  || '.js-quantity-plus';
      options.minusSelector = options.minusSelector || '.js-quantity-minus';
      options.inputSelector = options.inputSelector || '.js-quantity-input';

      if( !options.units ){
        options.units = {
          "шт": 0,
          "кг": 1,
          "л; дм3": 2,
          "м": 2,
          "м2": 2,
          "г": 0,
          "т": 3
        };
      }

      self.container  = $( qntty_container );

      self.isLess = false;
      self.isMore = false;

      // привязываем кнопки и поле ввода
      self.plusElement  = self.container.find( options.plusSelector );
      self.minusElement = self.container.find( options.minusSelector );
      self.inputElement = self.container.find( options.inputSelector );

      // тянем параметры счетчика
      params = getParams( self.inputElement );

      // настройки упаковок товара
      self.packSize = parseFloat( params.pack ) || 1;

      // настройки единиц измерения
      self.unit = params.unit || "шт";
      self.decimal = options.units[ self.unit ];

      // вариант логики.
      // если указаны упаковки, то проверка для поля ввода должна происходить после .blur()
      if( params.pack ){
        self.packLogic = true;
      }else{
        self.packLogic = false;
      }

      // настройки минимума и максимума
      // min & max - из параметров тега
      // minCheck & maxCheck - параметры для сравнения. приводятся к кратному виду.
      self.max = parseFloat( params.max ) || 100000000;
      self.min = parseFloat( params.min ) || 1;

      if( self.min < self.packSize ){
        self.min = self.packSize;
      }
      self.minCheck = self.min;

      // правим максимум так, чтобы он был кратен,
      self.maxCheck = self.max;
      if( self.packLogic ){
        mod = self.max % self.packSize;
        if( mod !== 0 ){
          self.maxCheck = self.maxCheck - mod;
        }
      }

      // выставляем стартовое кол-во
      self.current = parseFloat( self.inputElement.val() );

      if( self.current < self.minCheck ){
        self.current = self.minCheck;
      }

      self.countCheck = self.current;

      self.inputElement.val( self.current.toFixed( self.decimal ) );

      // вешаем события на элементы
      self.plusElement
        .on( 'click', function( e ){
          e.preventDefault();

          self.countCheck += self.packSize;
          self.check();
        });

      self.minusElement
        .on( 'click', function( e ){
          e.preventDefault();

          self.countCheck -= self.packSize;
          self.check();
        });

      self.inputElement
        /*
        .on( 'keyup', function( e ){
          //
          var
            codes = {
              //8:  true, //backspace
              //46: true, // delete
              37: true,
              38: true,
              39: true,
              40: true,
            };

          self.countCheck = parseFloat( self.inputElement.val() );

          // если нажали "функциональную клавишу" - забиваем
          if( codes[ e.keyCode ] ){
            return false;
          }

          // если вводим что-то кроме цифр - забиваем
          if( isNaN( self.countCheck ) ){
            self.inputElement.val( '' );
            return false;
          }

          // если у нас не указаны упаковки,
          // то проверяем корректность на вводе
          // иначе - при потере фокуса
          if( !self.packLogic ){
            self.check();
          }
        })
        */
        .on( 'blur', function( e ){
          self.countCheck = parseFloat( self.inputElement.val() );

          if( isNaN( self.countCheck ) ){
            self.countCheck = self.packSize;
          }

          self.check();
        });

      // прибиваем настройки
      self.options = $.extend( {}, self.container.data(), options );
    },
    check: function(){
      var
        self   = this,
        mod = 0;

      self.isLess = false;
      self.isMore = false;

      // приводим введеное кол-во к кратному виду
      if( self.packLogic ){
        mod = self.countCheck % self.packSize;
        if( mod !== 0 ){
          self.countCheck = self.countCheck - mod + self.packSize;
        }
      }

      if( self.countCheck < self.minCheck ){
        self.countCheck = self.minCheck;
        self.isLess = true;
      }

      if( self.countCheck >= self.maxCheck ){
        self.countCheck = self.maxCheck;
        self.isMore = true;
      }

      self.current = self.countCheck;

      $data = makeData( self );

      self.inputElement
        .val( self.current.toFixed( self.decimal ) )
        .trigger( 'change' );

      Events( 'onQuantity_Change' ).publish( $data );
    },
  };

  // навешиваем все это на каждый объект
  // так же проверяем, инициировали мы этот эелемент или еще нет
  $.fn.quantity = function( options ){
    this.each( function(){
      if( !$(this).data( 'quantity' ) ) {
        var
          prices = Object.create( quantity );

        prices.init( options, this );
        $.data( this, "quantity", prices );
      }
    });

    return this;
  };

}( jQuery, window, document ));
