import React from 'react';
import { dummyReviews } from '../pages/Homepage';

function GenreHighlights() {
  const genres = ['Рок', 'Электроника', 'Фолк', 'Поп-музыка', 'Инди', 'Хип-хоп', 'Андерграунд'];

  return (
    <section style={{ 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Популярные жанры</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        paddingBottom: '10px'
      }}>
        {genres.map(genre => {
          const genreReviews = dummyReviews.filter(review => review.genre === genre).slice(0, 2);

          return (
            <div 
              key={genre} 
              style={{ 
                border: '1px solid #e1e1e1', 
                borderRadius: '8px', 
                padding: '15px', 
                backgroundColor: 'white', 
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <h3 style={{ 
                margin: '0 0 10px 0', 
                fontSize: '1.1rem', 
                color: '#333'
              }}>
                {genre}
              </h3>
              
              {genreReviews.length > 0 ? (
                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  marginBottom: '10px' 
                }}>
                  {genreReviews.map(review => (
                    <img 
                      key={review.id}
                      src={review.coverUrl} 
                      alt={`${review.artist} - ${review.title}`} 
                      style={{ 
                        width: '50%', 
                        height: '100px', 
                        borderRadius: '4px',
                        objectFit: 'cover',
                        aspectRatio: '1/1'
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-cover.jpg';
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div style={{
                  height: '100px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#888',
                  marginBottom: '10px'
                }}>
                  Нет обзоров
                </div>
              )}
              
              <p style={{ 
                margin: '10px 0 0 0', 
                fontSize: '0.9rem', 
                color: '#666'
              }}>
                {genreReviews.length > 0 
                  ? `Оценки: ${genreReviews.map(r => r.rating).join(', ')}` 
                  : 'Пока нет обзоров'}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default GenreHighlights;
