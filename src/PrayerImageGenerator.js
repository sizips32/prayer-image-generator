import React, { useState, useMemo } from 'react';
import html2canvas from 'html2canvas';
import './PrayerImageGenerator.css';

function PrayerImageGenerator() {
  const [prayer, setPrayer] = useState('');
  const [verse, setVerse] = useState('');
  const [textStyle, setTextStyle] = useState({
    fontSize: '1.2rem',
    color: '#000000',
    textAlign: 'center'
  });
  const CREDIT = '(by Last Mission (https://lastm.net))';
  const [opacity, setOpacity] = useState(0.7);

  const backgroundImages = useMemo(() => [
    '/images/cross-background1.png',
    '/images/cross-background2.png',
    '/images/cross-background3.png',
    '/images/cross-background4.png',
    '/images/cross-background5.png',
    '/images/cross-background6.png',
    '/images/cross-background7.png',
    '/images/cross-background8.png',
    '/images/cross-background9.png',
    '/images/cross-background10.png',
    '/images/cross-background11.png',
    '/images/cross-background12.png',
    '/images/cross-background13.png',
    // 추가된 이미지 파일명을 여기에 나열하세요
  ], []);

  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

  const handleDownload = () => {
    const element = document.getElementById('prayer-card');
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    html2canvas(element, {
      scale: 2,
      width: width,
      height: height,
      scrollY: -window.scrollY,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById('prayer-card');
        Object.assign(clonedElement.style, {
          width: `${width}px`,
          height: `${height}px`,
          transform: 'none'
        });
      }
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'prayer-card.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    });
  };

  const handleBackgroundChange = (e) => {
    setBackgroundImage(e.target.value);
  };

  return (
    <div className="prayer-container">
      <h1 className="prayer-title">묵상 & 중보 기도 카드</h1>
      <div className="prayer-content">
        <div className="style-controls">
          <select 
            value={textStyle.fontSize} 
            onChange={(e) => setTextStyle({...textStyle, fontSize: e.target.value})}
          >
            <option value="0.8rem">매우 작게</option>
            <option value="1rem">작게</option>
            <option value="1.2rem">보통</option>
            <option value="1.5rem">크게</option>
          </select>
          <input 
            type="color" 
            value={textStyle.color}
            onChange={(e) => setTextStyle({...textStyle, color: e.target.value})}
          />
          <select 
            value={textStyle.textAlign} 
            onChange={(e) => setTextStyle({...textStyle, textAlign: e.target.value})}
          >
            <option value="left">왼쪽</option>
            <option value="center">가운데</option>
            <option value="right">오른쪽</option>
          </select>
          <select 
            value={backgroundImage}
            onChange={handleBackgroundChange}
            className="background-select"
          >
            {backgroundImages.map((image, index) => (
              <option key={image} value={image}>
                배경 {index + 1}
              </option>
            ))}
          </select>
          <input 
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(e.target.value)}
            className="opacity-slider"
          />
        </div>
        <input
          type="text"
          className="verse-input"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          placeholder="말씀 묵상기도문 (성경구절)"
        />
        <div className="text-input-container">
          <textarea
            className="prayer-input"
            value={prayer}
            onChange={(e) => setPrayer(e.target.value)}
            maxLength={3000}
            placeholder="기도문을 입력하세요 (최대 3000자)..."
          />
          <div className="character-count">
            {prayer.length}/3000
          </div>
        </div>
        <div id="prayer-card" className="prayer-card" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}${backgroundImage})`, '--bg-opacity': opacity }}>
          {verse && <div className="verse-text" style={textStyle}>{verse}</div>}
          <div className="prayer-text" style={textStyle}>{prayer}</div>
          <div className="credit-text">{CREDIT}</div>
        </div>
        <button className="download-button" onClick={handleDownload}>
          이미지 저장하기
        </button>
      </div>
    </div>
  );
}

export default PrayerImageGenerator;
