import React from 'react';

const MASCOT_URL = `${import.meta.env.BASE_URL}mascot.png`;

export const MASCOT_IMAGE = MASCOT_URL;
export const MASCOT_AVATAR_URL = MASCOT_URL;

export const MascotImage: React.FC<{ className?: string; alt?: string }> = ({
  className,
  alt = 'JOJ Dakar 2026 mascot',
}) => (
  <img
    src={MASCOT_URL}
    alt={alt}
    loading="eager"
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default MascotImage;
