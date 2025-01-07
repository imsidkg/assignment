import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './LazyImage.module.css';

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml,...', 
  ...props 
}) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [ref, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (!isIntersecting || loaded) return;

    const image = new Image();
    image.src = src;
    image.onload = () => {
      setCurrentSrc(src);
      setLoaded(true);
    };
  }, [src, isIntersecting, loaded]);

  return (
    <div 
      ref={ref}
      className={`${styles.wrapper} ${className}`}
      {...props}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={`${styles.image} ${loaded ? styles.loaded : ''}`}
      />
      {!loaded && (
        <div className={styles.placeholder}>
          <div className={styles.shimmer}></div>
        </div>
      )}
    </div>
  );
}
