import React, { useState, useRef, useEffect } from 'react';
import "../../App.css";
import backarrow from '../../pics/backArrow.webp';


function CollapseSection({ app, sectionTitle, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  // On mount, load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(`collapse_${sectionTitle}`);
    if (savedState !== null) {
      setIsOpen(savedState === 'true');
    } else {
      // No saved state means first time viewing this section
      setIsOpen(true);
    }
  }, [sectionTitle]);

  // Whenever isOpen changes, save to localStorage
  useEffect(() => {
    localStorage.setItem(`collapse_${sectionTitle}`, isOpen.toString());
  }, [isOpen, sectionTitle]);

  // Observe size changes
    // useEffect(() => {
    //   if (!contentRef.current) return;

    //   const observer = new ResizeObserver(() => {
    //     // Whenever the content changes size, if isOpen, recalc max-height
    //     if (isOpen && contentRef.current) {
    //       contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
    //     }
    //   });

    //   observer.observe(contentRef.current);

    //   return () => observer.disconnect();
    // }, [isOpen]);

  // // Update with changes
    // useEffect(() => {
    //   const content = contentRef.current;
    //   if (!content) return;

    //   if (isOpen) {
    //     // Opening
    //     const newHeight = content.scrollHeight + "px";
    //     content.style.maxHeight = newHeight;
    //   } else {
    //     // Closing: set current height then collapse
    //     content.style.maxHeight = content.scrollHeight + "px";
    //     requestAnimationFrame(() => {
    //       content.style.maxHeight = "0px";
    //     });
    //   }
    // }, [isOpen]);

  // Re-calculate height whenever the content changes and section is open
  // This ensures new text or dynamic content doesn't get cut off
    // useEffect(() => {
    //   if (isOpen && contentRef.current) {
    //     contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
    //   }
    // }, [isOpen, children]);


  return (
    <div style={{
      marginTop: "24px", borderRadius: "11px",
      background: isOpen ? "#5565850d" : "#5565851d"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",

      }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: isOpen ? "#8d8d8d" : "#ecd23a",
            cursor: "pointer",
            fontSize: "20px",
            marginLeft: "20px",
            marginRight: "30px",
            display: "flex",
            width: "300px",
            alignItems: "center"

          }}
          onClick={() => setIsOpen(!isOpen)}
        ><img
            src={backarrow}
            alt=">"
            style={{
              width: "12px",
              height: "11px",
              marginTop: "2px", marginRight: "8px",
              transform: isOpen ? "rotate(270deg)" : "rotate(180deg)",
              filter: isOpen ? "saturate(0)" : "saturate(1)",
              transition: "transform 0.4s ease-in-out"
            }}
          />
          {isOpen ? "Hide Section" : `Show ${sectionTitle}`}

        </button>

        <div style={{
          flex: 1, mixBlendMode: "luminosity", opacity: isOpen ? ".00" : ".75", fontSize: "20px", textAlign: "center",
          marginRight: "30px", padding: "12px"
        }}>. . .</div>

      </div>


      <div className={`collapsible-content ${isOpen ? 'open' : ''}`} ref={contentRef}>

        {/* {isOpen && ( */}
        <div style={{ color: "white", padding: "14px", width: "97%", }}>
          {children}
        </div>
        {/* )} */}

      </div>
    </div>
  );
}

export default CollapseSection;