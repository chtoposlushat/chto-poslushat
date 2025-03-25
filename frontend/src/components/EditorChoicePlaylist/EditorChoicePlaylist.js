import React from 'react';

function EditorChoicePlaylist() {
  return (
    <section style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h2>Плейлист Недели - Выбор Редакции</h2>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
        {/* Placeholder для плеера Яндекс.Музыки */}
        <div style={{ height: '100px', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Placeholder плеера Яндекс.Музыки
        </div>
        <p style={{ marginTop: '15px', fontSize: '0.9em', color: '#555' }}>Описание плейлиста "Выбор редакции" и ссылка на полный плейлист...</p>
      </div>
    </section>
  );
}

export default EditorChoicePlaylist;