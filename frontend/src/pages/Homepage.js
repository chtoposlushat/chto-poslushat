import React from 'react';
import Header from '../components/Header';
import HotReviewsCarousel from '../components/HotReviewsCarousel';
import GenreHighlights from '../components/GenreHighlights';
import EditorChoicePlaylist from '../components/EditorChoicePlaylist';
import DigestSidebar from '../components/DigestSidebar';
import SocialMediaLinks from '../components/SocialMediaLinks';

export const dummyReviews = [
  {
    id: 'review1',
    title: 'Альбом "Перевоплощение"',
    artist: 'ZOLOTO',
    genre: 'Поп-музыка',
    coverUrl: 'https://avatars.yandex.net/get-music-content/9868747/c91a0495.a.26898787-1/300x300',
    excerpt: 'Новый альбом ZOLOTO — это глоток свежего воздуха в мире поп-музыки. Легкие мелодии, запоминающиеся тексты и искренняя подача делают этот альбом настоящим открытием года.',
    rating: 9.2
  },
  // ... остальные обзоры с добавленным rating
  {
    id: 'review5',
    title: 'EP "Лес"',
    artist: 'другдиджея',
    genre: 'Фолк',
    coverUrl: 'https://avatars.yandex.net/get-music-content/1798699/34501a91.a.21014998-1/300x300',
    excerpt: 'Новый EP другдиджея — это трогательные фольклорные мотивы и современное звучание.',
    rating: 8.1
  }
];

function Homepage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      
      <main style={{
        flex: '1 0 auto',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <HotReviewsCarousel />
        
        <div className="content-wrapper" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: '30px',
          marginTop: '30px'
        }}>
          <div className="main-content" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px'
          }}>
            <GenreHighlights />
            <EditorChoicePlaylist />
          </div>
          
          <DigestSidebar />
        </div>
      </main>
      
      <SocialMediaLinks />
    </div>
  );
}

export default Homepage;