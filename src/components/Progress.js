import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./ProgressBar.css"
export default function ProgressBar(props) {
  const [value, setValue] = React.useState(0);

  function setFormula() {
    let outdoor = (props.outdoor * 100) / 15;
    let water = (props.water * 100) / 80;
    let sum = (outdoor + water) / 2;
    setValue(sum);
  }

  return (
    <div>
      <div className="progress-div" style={{ width: props.width }}>
        <LinearProgress
          variant="determinate"
          style={{ margin: 20 }}
          value={value}
        />
        <button onClick={setFormula}> percent </button>
        <h4>{value}%</h4>
        <div style={{ width: `${value}px` }} className="progress" />
      </div>
    </div>
  );
}
