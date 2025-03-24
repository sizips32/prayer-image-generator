import React, { useState } from 'react';
import PrayerImageGenerator from './PrayerImageGenerator';

function App() {
  const [prayerText, setPrayerText] = useState('');
  
  return (
    <div className="App">
      <h1>묵상 & 중보 기도 카드</h1>
      <div className="text-input-container">
        <textarea
          value={prayerText}
          onChange={(e) => setPrayerText(e.target.value)}
          maxLength={1000}
          placeholder="기도문을 입력하세요 (최대 1000자)..."
        />
        <div className="character-count">
          {prayerText.length}/1000
        </div>
      </div>
      <PrayerImageGenerator />
    </div>
  );
}

export default App;
