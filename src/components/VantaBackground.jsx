import { useEffect, useRef } from "react";

export default function VantaBackground({ children }) {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current && window.VANTA) {
      vantaEffect.current = window.VANTA.DOTS({
        el: vantaRef.current,
        THREE: window.THREE,
        backgroundColor: 0x221F62,
        color: 0xFF8A60,
        color2: 0xFF8A60,
        size: 8.8,
        spacing: 74,
        showLines: false,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div ref={vantaRef} style={{ width: "100%", height: "100vh" }}>
      {children}
    </div>
  );
}