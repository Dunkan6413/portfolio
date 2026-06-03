import { useEffect, useRef, useState } from "react";

export default function VantaBackground({ children }) {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!vantaEffect.current && window.VANTA) {
      vantaEffect.current = window.VANTA.DOTS({
        el: vantaRef.current,
        THREE: window.THREE,
        backgroundColor: 0x3c3c3c,
        color: 0xff8a60,
        color2: 0xff8a60,
        size: 8.8,
        spacing: 74,
        showLines: false,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 0.6,
        scaleMobile: 0.6,
      });
      setTimeout(() => setReady(true), 500);
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 0.3s ease",
        position: "fixed",
        top: "30%",
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      {children}
    </div>
  );
}
