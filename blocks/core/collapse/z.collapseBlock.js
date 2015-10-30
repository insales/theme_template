// =======================================================================
//                                UI
// =======================================================================

// здесь расписан дефолтный функционал для блоков и всякие UI штуки.
// всякие переключалки - вынесены в отдельные файлы шаблонов/блоков

// подключаем функционал переключаемых блоков и их плагинов
var
  // менюшки
  menuToggler = new InSales.CollapseBlock({
    togglerClass: 'js-menu-toggler',
    wrapperClass: 'js-menu-wrapper',
    targetClass:  'menu',
    blockType:    'Menu',
  }),

  // секции фильтра
  filterSectionToggler = new InSales.CollapseBlock({
    togglerClass: 'js-filter_section-toggler',
    wrapperClass: 'js-filter_section-wrapper',
    targetClass:  'filter_section-values',
  }),

  // скрытие группы секций фильтра
  filterToggler = new InSales.CollapseBlock({
    togglerClass: 'js-filter-sections_toggler',
    wrapperClass: 'js-filter-sections_wrapper',
    targetClass:  'filter-hidden_sections',
  }),

  // сворачивающиеся блоки
  accordionToggler = new InSales.CollapseBlock({
    togglerClass: 'js-accordion-toggler',
    wrapperClass: 'js-accordion-wrapper',
    targetClass:  'accordion-content',
    blockType:    'Accordion',
  });
