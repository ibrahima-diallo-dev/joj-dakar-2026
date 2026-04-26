import 'react';

declare global {
  interface Window {
    AFRAME: any;
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-sky': any;
      'a-camera': any;
      'a-cursor': any;
      'a-entity': any;
      'a-assets': any;
    }
  }
}

export {};
