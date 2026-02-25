import { useState, useEffect } from "react";
import saveTheDate from "../assets/saveTheDate.png"
import saveTheDateBack from "../assets/saveTheDateBack.png"



const EnvelopeReveal = () => {
  const [phase, setPhase] = useState("closed");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("flap"), 800);  
    const t2 = setTimeout(() => setPhase(saveTheDate), 1800); 
    const t3 = setTimeout(() => setPhase(saveTheDateBack), 2700);  
    const t4 = setTimeout(() => setPhase("scrollable"), 3600);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

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