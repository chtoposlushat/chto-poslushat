import React from 'react';

function Header() {  // <--- *** ФУНКЦИОНАЛЬНЫЙ КОМПОНЕНТ (function component) `Header()` - ОЧЕНЬ ВАЖНО! ***
  return (         // <--- *** ОПЕРАТОР `return(...)` - ВНУТРИ ФУНКЦИИ `Header()` - ОЧЕНЬ ВАЖНО! ***
    <header>
      <div className="header-container">
        <div className="header-logo">
          {/* Ваш логотип */}
          <h1>Что послушать?</h1>
        </div>
        <nav className="header-nav">
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/music">Музыка</a></li>
            <li><a href="/submission">Предложка</a></li>
            <li><a href="/events">Ивенты</a></li>
            <li><a href="/about">О проекте</a></li>
            <li><a href="/contacts">Контакты</a></li>
            <li><a href="/merch">Мерч</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );  // <--- *** ЗАКРЫВАЮЩАЯ КРУГЛАЯ СКОБКА `)` ДЛЯ `return(...)` - ОЧЕНЬ ВАЖНО! ***
}         // <--- *** ЗАКРЫВАЮЩАЯ ФИГУРНАЯ СКОБКА `}` ДЛЯ ФУНКЦИИ `Header()` - ОЧЕНЬ ВАЖНО! ***

export default Header;