import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  const { value } = props;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 10) * circumference;

  // Determine the label based on the rating
  let label = "Fair";
  if (value >= 8) label = "Great";
  else if (value >= 5) label = "Good";
  else if (value >= 2) label = "Poor";

  return (
    <div>
      <div className={styles.progressCircle}>
        <svg>
          <circle className={styles.background} cx="40" cy="40" r={radius} />
          <circle
            className={styles.foreground}
            cx="40"
            cy="40"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className={styles.progressValue}>{value}</div>
      </div>
      <p className={`text-center ${styles.label}`}>{label}</p>
    </div>
  );
};

export default ProgressBar;
