$(function(){
  $( '.js-popup-form' ).on( 'click', function(){
    var
      $data = {
        template: 'form',
        header: "Задайте Ваш вопрос",
        fields: [
          {
            required: true,
            label: 'Имя', title: 'Имя',
            name: 'name', placeholder: 'введите имя',
          },
          {
            required: true,
            label: 'E-mail', title: 'E-mail',
            name: 'email', placeholder: 'введите e-mail',
          },
          {
            required: true,
            label: 'Телефон', title: 'Телефон',
            name: 'phone', placeholder: 'введите телефон',
            error: 'Не правильно введен телефон',
          },
          {
            required: true,
            label: 'Ваш вопрос', title: 'Ваш вопрос',
            type: 'textarea', name: 'content', placeholder: 'Ваш вопрос',
          },
        ],
        from: 'test@poligon.ru',
        subject: 'test email',
      };

    modal.show( $data );
  });
});
