import React, { useEffect, useState } from 'react';

// Import images
import image1 from '../assets/img1.jpg';
import image2 from '../assets/alarm-clock.png';
import image3 from '../assets/computer.png';
import image4 from '../assets/digital-nomad.png';
import image5 from '../assets/pda.png';
import image6 from '../assets/solidarity.png';
import image7 from '../assets/shopping-bag.png';
import image8 from '../assets/message.png';
import image9 from '../assets/insurance.png';
import image10 from '../assets/mechanical-pencil.png';
import image11 from '../assets/shield.png';
import image12 from '../assets/sms.png';
import image13 from '../assets/social-media.png';
import image14 from '../assets/strength.png';
import image15 from '../assets/tv.png';
import image16 from '../assets/book.png';

const floatingImages = [
  image1, image2, image3, image4, image5, image6,
  image7, image8, image9, image10, image11, image12,
  image13, image14, image15, image16
];

const Layout = ({ children }) => {
  const [positions, setPositions] = useState(() => {
    const savedPositions = JSON.parse(localStorage.getItem('imagePositions'));
    return savedPositions || generatePositionGrid();
  });

  // Generate a grid-like structure optimized for visibility
  function generatePositionGrid() {
    const positions = [];
    const cols = 4;
    const rows = 4;
    const vwGap = 100 / (cols + 1);  // Horizontal spacing
    const vhGap = 100 / (rows + 1);  // Vertical spacing
    const edgeBuffer = 15; // Keep images away from edges
    const sizeRange = [30, 45]; // Define min and max sizes for images
    const randomRange = { h: 7.5, v: 5 };//Horizontal/vertical randomness

    for (let i = 0; i < floatingImages.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      positions.push({
        top: Math.min(85, Math.max(edgeBuffer, (row + 1) * vhGap + (Math.random() * randomRange.v * 2 - randomRange.v))), // V-randomness
        left: Math.min(85, Math.max(edgeBuffer, (col + 1) * vwGap + (Math.random() * randomRange.h * 2 - randomRange.h))), // H-randomness
        size: sizeRange[0] + Math.floor(Math.random() * (sizeRange[1] - sizeRange[0])), // Size Variation
        rotation: Math.floor(Math.random() * 360)
      });
    }
    return positions;
  }

  useEffect(() => {
    localStorage.setItem('imagePositions', JSON.stringify(positions));
  }, [positions]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center overflow-hidden">
      {floatingImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`decorative-${index}`}
          className="absolute pointer-events-none"
          style={{
            top: `${positions[index].top}vh`,
            left: `${positions[index].left}vw`,
            width: `${positions[index].size}px`,
            height: `${positions[index].size}px`,
            transform: `rotate(${positions[index].rotation}deg)`,
            opacity: 0.7
          }}
        />
      ))}

      <div className="w-full max-w-4xl z-10 bg-white rounded-3xl shadow-2xl p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
