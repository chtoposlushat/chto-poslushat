import React from 'react';
import { dummyReviews } from '../pages/Homepage';

function HotReviewsCarousel() {
  const hotReviews = dummyReviews.slice(0, 3);

  return (
    <section style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h2>Сверхновые. Горячие обзоры</h2>
      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: '20px', 
        padding: '20px 0',
        scrollbarWidth: 'none' /* Скрываем scrollbar для Firefox */,
        msOverflowStyle: 'none' /* Скрываем scrollbar для IE/Edge */
      }}>
        {/* Добавляем псевдоэлемент для скролла */}
        <style>
          {`/* Скрываем scrollbar для WebKit браузеров */
          div::-webkit-scrollbar {
            display: none;
          }`}
        </style>
        
        {hotReviews.map(review => (
          <div 
            key={review.id} 
            style={{ 
              minWidth: '200px', 
              maxWidth: '200px', 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              padding: '15px', 
              backgroundColor: 'white', 
              /* Исправлена ошибка в box-shadow: добавлены недостающие кавычки */
              boxShadow: 'rgba(0,0,0,0.1) 2px 2px 5px',
              flexShrink: 0 /* Важно: предотвращает сжатие элементов */
            }}
          >
            <img 
              src={review.coverUrl} 
              alt={review.title} 
              style={{ 
                width: '100%', 
                height: '150px', 
                display: 'block', 
                marginBottom: '10px', 
                objectFit: 'cover',
                borderRadius: '4px' /* Добавлено для эстетики */
              }} 
              onError={(e) => {
                e.target.onError = null; /* Добавлена обработка ошибок загрузки изображений */
                e.target.src = 'placeholder-image-url.jpg'
              }}
            />
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {review.title}
            </h3>
            <p style={{ margin: '0', fontSize: '0.9em', color: '#555', height: '40px', overflow: 'hidden' }}>
              {review.excerpt}
            </p>
            <p style={{ margin: '10px 0 0 0', fontSize: '0.8em', fontWeight: 'bold', color: '#777' }}>
              {review.artist} - {review.genre}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HotReviewsCarousel;
