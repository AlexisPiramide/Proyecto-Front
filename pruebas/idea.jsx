import React, { useState } from 'react';
import './idea.css';  // Assuming the CSS above is in App.css

export default function Idea(){

    const botones = [
        { nombre: 'Boton 1' },
        { nombre: 'Boton 2' },
        { nombre: 'Boton 3' },
        { nombre: 'Boton 4' },
        { nombre: 'Boton 5' }];
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);
    const [direction, setDirection] = useState('left-to-right'); // Default direction

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX);
        e.currentTarget.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setEndX(e.pageX);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;

        if (endX > startX) {
            setDirection('left-to-right');  // Dragged right
        } else if (endX < startX) {
            setDirection('right-to-left');  // Dragged left
        }

        setIsDragging(false);
        document.querySelector('.marquee-track').classList.remove('left-to-right', 'right-to-left');
        document.querySelector('.marquee-track').classList.add(direction); // Apply direction class
        document.querySelector('.marquee-container').style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        document.querySelector('.marquee-container').style.cursor = 'grab';
    };

    return (
        <div className="marquee-container" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave}>
            <div className={`marquee-track ${direction}`}>
                {botones.forEach(boton => {
                <button className="button">{boton.nombre}</button>
                })}

                {/* Repeat for seamless looping */}
                
                {botones.forEach(boton => {
                <button className="button">{boton.nombre}</button>
                })}
            </div>

    
            
        </div>
    );
};
