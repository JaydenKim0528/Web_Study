import React, { useState, useEffect } from 'react';
import '../css/Banner.css';

const images = [
    '/images/banner_01.png',
    '/images/banner_02.png',
    '/images/banner_03.png',
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const totalImages = [images[images.length - 1], ...images, images[0]];

    useEffect(() => {
        const interval = setInterval(() => {
            moveToNextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const moveToNextSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === totalImages.length - 1) {
            setCurrentIndex(1);
        } else if (currentIndex === 0) {
            setCurrentIndex(images.length);
        }
    };

    return (
        <div className="banner">
            <div
                className="banner-container"
                style={{
                    transform: `translateX(${-currentIndex * 100}%)`,
                    transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {totalImages.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Slide ${index}`}
                        className="banner-image"
                    />
                ))}
            </div>
            <div className="banner-navigation">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index + 1 === currentIndex ? 'active' : ''}`}
                        onClick={() => {
                            setIsTransitioning(true);
                            setCurrentIndex(index + 1);
                        }}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Banner;
