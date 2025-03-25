import React from 'react';

function DigestSidebar() {
  return (
    <aside style={{ padding: '20px', backgroundColor: '#e0e0e0', borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
      <h2>Дайджест - Лучшее от Редакции</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {/* Заглушки для пунктов дайджеста (несколько штук) */}
        {Array.from({ length: 4 }).map((_, index) => ( // Создаем 4 пункта для примера
          <li key={index} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px dashed #ccc' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Заголовок дайджест-пункта {index + 1}</a> {/* Заголовок пункта дайджеста */}
            <p style={{ margin: '5px 0 0 0', fontSize: '0.85em', color: '#777' }}>Краткое описание дайджест-пункта {index + 1}...</p> {/* Краткое описание */}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default DigestSidebar;