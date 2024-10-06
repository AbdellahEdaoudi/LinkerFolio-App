"use client"
import React, { useState, useEffect } from 'react';

const ParticleComponent = ({bgcolor}) => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 150 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
      }));
    };

    setParticles(generateParticles());

    const handleResize = () => {
      setParticles(generateParticles());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const moveParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
        }))
      );
    };

    const intervalId = setInterval(moveParticles, 50);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`${bgcolor && bgcolor}  fixed inset-0 overflow-hidden z-0`}>
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-teal-200"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: 0.4,
            transform: `translate(${(mousePos.x - particle.x) / 20}px, ${(mousePos.y - particle.y) / 20}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      ))}
    </div>
  );
};

export default ParticleComponent;
