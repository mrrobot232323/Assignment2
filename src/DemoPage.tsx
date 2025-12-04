import { useState, useEffect, useRef } from "react";
import "./DemoPage.css";
import { throttle } from "./validator/utils";

const nameSuggestions = [
  "John Doe", "Jane Smith", "Alice Johnson", "Bob Williams",
  "Emma Brown", "Michael Chen", "Sarah Davis", "David Wilson"
];

export default function DemoPage({ onClose }: { onClose: () => void }) {









  // Name Suggestion System
  
  const [nameInput, setNameInput] = useState("");
  const [nameSuggestionsList, setNameSuggestionsList] = useState<string[]>([]);

  const handleNameChange = (value: string) => {
    setNameInput(value);
    if (value.trim()) {
      const filtered = nameSuggestions.filter(name =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setNameSuggestionsList(filtered.slice(0, 5));
    } else {
      setNameSuggestionsList([]);
    }
  };

  const selectSuggestion = (name: string) => {
    setNameInput(name);
    setNameSuggestionsList([]);
  };











  
  // Throttle System


  const [throttleInput, setThrottleInput] = useState<string>("");
  const [throttleStatus, setThrottleStatus] = useState<string>("Waiting for input...");
  const [throttleCount, setThrottleCount] = useState<number>(0);

  const throttledUpdate = useRef<(value: string) => void>(
    throttle((value: string) => {
      setThrottleCount(prev => {
        const newCount = prev + 1;
        setThrottleStatus(`Throttle executed! Count: ${newCount}`);
        return newCount;
      });
    }, 1000)
  ).current;

  const handleThrottleChange = (value: string) => {
    setThrottleInput(value);
    setThrottleStatus("Throttle active (1 sec limit)...");
    throttledUpdate(value);
  };










  // Debounce System

  const [rightFormValue, setRightFormValue] = useState<string>("");
  const [debounceStatus, setDebounceStatus] = useState<string>("Waiting for input...");
  const [showRestartPopup, setShowRestartPopup] = useState<boolean>(false);
  const [showApiCallPopup, setShowApiCallPopup] = useState<boolean>(false);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastInputTimeRef = useRef<number>(0);

  const handleRightFormChange = (value: string) => {
    setRightFormValue(value);

    const now = Date.now();
    const delta = now - lastInputTimeRef.current;





    // Show "Restart" popup if user types again too soon
    if (lastInputTimeRef.current > 0 && delta < 4000) {
      setShowRestartPopup(true);
      setTimeout(() => setShowRestartPopup(false), 2000);
    }

    lastInputTimeRef.current = now;
    setDebounceStatus("Typing... (Debounce active)");
    setShowApiCallPopup(false);










    



    // Clear old timer
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    // Start new debounce timer
    debounceTimerRef.current = setTimeout(() => {
      setDebounceStatus("Debounce completed - API call ready");
      setShowApiCallPopup(true);

      // Hide popup after 3 seconds
      setTimeout(() => setShowApiCallPopup(false), 3000);
    }, 4000);
  };

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // UI Rendering

  return (
    <div className="demo-overlay" onClick={onClose}>
      <div className="demo-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="demo-content">
          
    
          <div className="demo-form left-form">

            <h3>Throttle Demo</h3>

            <div className="form-field">
        <label>Name (with suggestions)</label>
              <div className="input-wrapper">
               <input
                  type="text"
             value={nameInput}
          onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Type a name..."
                />
                {nameSuggestionsList.length > 0 && (
        <div className="suggestions-dropdown">
                    {nameSuggestionsList.map((name, i) => (
                      <div           key={i}
                        className="suggestion-item"
                    onClick={() => selectSuggestion(name)}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Throttle Input Field */}
            <div className="form-field">
              <label>Throttle (1 sec limit)</label>
              <input
                type="text"
                value={throttleInput}
                onChange={(e) => handleThrottleChange(e.target.value)}
                placeholder="Type to test throttle..."
              />
            </div>

            <div className="status-display">
              <div className="status-text">{throttleStatus}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* ---------------- RIGHT SIDE (Debounce) ---------------- */}
          <div className="demo-form right-form">
            <h3>Debounce Demo</h3>

            <div className="form-field">
              <label>Type here (4 sec debounce)</label>
              <input
                type="text"
                value={rightFormValue}
                onChange={(e) => handleRightFormChange(e.target.value)}
                placeholder="Start typing..."
              />
            </div>

            <div className="status-display">
              <div className="status-text">{debounceStatus}</div>
            </div>
          </div>
        </div>













        {/* Restart Popup */}
        {showRestartPopup && (
          <div className="restart-popup">
            <div className="popup-content restart">
              <span className="popup-icon">⚠️</span>
              <span className="popup-text">Restart!</span>
            </div>
          </div>
        )}

        {/* API Call Popup */}
        {showApiCallPopup && (
          <div className="restart-popup">
            <div className="popup-content api-call">
              <span className="popup-icon">📡</span>
              <span className="popup-text">API Calls</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
