import React, { useEffect } from 'react';

const Background = () => {
  useEffect(() => {
    const container = document.querySelector('.particles-container');
    const particles = [];

    // Dynamically create particles
    for (let i = 0; i < 200; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = `${Math.random() * 1}rem`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 5 + 10}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    // Cleanup particles on unmount
    return () => {
      particles.forEach((particle) => particle.remove());
    };
  }, []);

  return <div className="particles-container"></div>;
};

export default Background;
