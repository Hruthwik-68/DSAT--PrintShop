import React from "react";

const Marquee = () => {
  return (
    <>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
      <div style={styles.wrapper}>
        <div style={styles.marquee}>
          <span style={styles.icon}>⭐</span>
          <span style={styles.text}>
            Contributed by Hruthwik M - ISE Department - (IDT21IS068) &nbsp; ⭐
            &nbsp; Contributed by Pooja - ISE Department - (IDT21IS106) &nbsp;
            👨‍🎓 &nbsp; Contributed by Prajwal T P - ISE Department - (IDT21IS113)
            &nbsp;
          </span>
          <span style={styles.icon}>👨‍🎓</span>
        </div>
      </div>
    </>
  );
};

const styles = {
  wrapper: {
    width: "100%",
    backgroundColor: "transparent",
    overflow: "hidden",
    whiteSpace: "nowrap",
    height: "40px",
    display: "flex",
    alignItems: "center",
  },
  marquee: {
    display: "inline-block",
    whiteSpace: "nowrap",
    animation: "scroll 20s linear infinite",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    fontSize: "18px",
    margin: "0 10px",
  },
  text: {
    margin: "0 5px",
  },
};

export default Marquee;
