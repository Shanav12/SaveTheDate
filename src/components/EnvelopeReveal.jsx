import { useState, useRef } from "react";
import saveTheDate from "../assets/saveTheDate.png"
import saveTheDateBack from "../assets/saveTheDateBack.png"
import efecto from "../assets/efecto.mp3"


const EnvelopeReveal = () => {
  const [phase, setPhase] = useState("closed");
  const [showMessage, setShowMessage] = useState(true);
  const audioRef = useRef(null);

  const handleReveal = () => {
    setShowMessage(false);
    audioRef.current = new Audio(efecto);
    audioRef.current.currentTime = 38;
    audioRef.current.play();
    const t1 = setTimeout(() => setPhase("flap"));  
    const t2 = setTimeout(() => setPhase(saveTheDate), 900); 
    const t3 = setTimeout(() => setPhase(saveTheDateBack), 1800);  
    const t4 = setTimeout(() => setPhase("scrollable"), 2700);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }

  const flapOpen = ["flap", saveTheDate, saveTheDateBack, "scrollable"].includes(phase);
  const photo1Vis = [saveTheDate, saveTheDateBack, "scrollable"].includes(phase);
  const photo2Vis = [saveTheDateBack, "scrollable"].includes(phase);
  const scrollVis = phase === "scrollable";
  const envelopeDropped = [saveTheDate, saveTheDateBack, "scrollable"].includes(phase);

  return (
    <div className='bg-[#FFCCCB]'>
      <div className="page" style={{ overflowY: scrollVis ? "auto" : "hidden" }}>
        <div className="envelope-stage">
          <div className={`envelope-wrap ${envelopeDropped ? "dropped" : ""}`}>
            <img src={saveTheDate} alt="wedding memory" className={`env-photo photo1 ${photo1Vis ? "visible" : ""}`} />
            <img src={saveTheDateBack} alt="wedding memory" className={`env-photo photo2 ${photo2Vis ? "visible" : ""}`} />
            <div className="env-body" />
            {showMessage && <button 
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(105, 23, 0, 0.08)";
                e.currentTarget.style.borderColor = "rgba(105, 23, 0, 0.8)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(105, 23, 0, 0.4)";
              }}
              onClick={handleReveal}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 20,
                background: "transparent",
                border: "1px solid rgba(105, 23, 0, 0.4)",
                borderRadius: "15px",
                padding: "10px 24px",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "16px",
                letterSpacing: "0.1em",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                animation: "pulse 2s ease-in-out infinite",
              }}>
                Tap to Reveal
            </button>}
            <div style={{ perspective: "600px", width: "100%", height: 0 }}>
              <div className={`env-flap ${flapOpen ? "open" : ""}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default EnvelopeReveal;