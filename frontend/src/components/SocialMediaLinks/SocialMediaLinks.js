import React from 'react';

function SocialMediaLinks() {
  return (
    <footer style={{ padding: '20px', backgroundColor: '#f8f8f8', borderTop: '1px solid lightgray', textAlign: 'center' }}>
      <h2>Мы в Соцсетях</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
        {/* Заглушки для иконок соцсетей (несколько штук) */}
        {['ВКонтакте', 'YouTube', 'Telegram', 'Дзен'].map((social, index) => ( // Массив названий соцсетей для примера
          <a key={index} href="#" style={{ display: 'inline-block', width: '40px', height: '40px', backgroundColor: '#ddd', borderRadius: '50%', textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {social.slice(0, 1)} {/* Первая буква названия соцсети как "иконка" */}
          </a>
        ))}
      </div>
      <p style={{ marginTop: '15px', fontSize: '0.8em', color: '#777' }}>© 2025 Что послушать?</p> {/* Копирайт */}
    </footer>
  );
}

export default SocialMediaLinks;