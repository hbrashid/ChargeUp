import React, { Component } from "react";
import "../App.css";
// import {ProgressBar} from './Progress'
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
  root: {
    maxWidth: 450,
    margin: "0 auto",
  },
  MuiCardContent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 2,
    },
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
  "MuiTextField-root": {
    margin: "85%",
    width: "25ch",
  },
  barColorPrimary: {
    backgroundColor: 'green',
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      desc: [],
      outdoor: 0,
      water: 0,
      value: null,
      outBeforCalc: [],
      waterBeforCalc: [],
      waterPercentage: 0,
      outdoorPercentage: 0
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&units=imperial&exclude=minutely&appid=${process.env.REACT_APP_WEATHER_KEY}`
    )
      .then((json) => json.json())
      .then((data) => {
        this.setState({
          hits: data.current,
          desc: data.current.weather[0],
        });
        console.log(data);
      })

      .catch((error) => console.log("parsing failed", error));
  }

// To capture user input from text fields
// Have separate onChange for each input field. Previous state + new state(e.target.value), not overriding. Add separate state. Have ideal values at top of file.
  onChangeOutdoor = e => {
    this.setState({
      outdoor: +e.target.value
    })
  }

  onChangeWater = e => {
    this.setState({
      water: +e.target.value
    })
  }

  Formula(e) {
    e.preventDefault();
    let joinedOut = this.state.outBeforCalc.concat(this.state.outdoor);
    this.setState({ outBeforCalc: joinedOut });

    let joinedWater = this.state.waterBeforCalc.concat(this.state.water);
    this.setState({ waterBeforCalc: joinedWater });

    let OutdoorCo;
    let WaterCo;
    this.setState({}, () => {
      let outSum = this.state.outBeforCalc.reduce((a, b) => a + b, 0);
      OutdoorCo = (outSum * 100) / 15;
      let waterSum = this.state.waterBeforCalc.reduce((a, b) => a + b, 0);
      WaterCo = (waterSum * 100) / 80;
      const sum = (WaterCo + OutdoorCo) / 2;
      this.setState({
        value: +sum,
        waterPercentage: WaterCo,
        outdoorPercentage: OutdoorCo
      });
      this.setState({
        hits: [],
        desc: [],
        outdoor: 0,
        water: 0
      });
    });
  }

  // updateProgress = (field, val) => {
  //   this.setState({ [field]: val });
  // };

  render() {

    const keyPress = e => {
      if (e.key === "Enter") {
        this.Formula();
      }
    };

    const unixTimestamp = this.state.hits.sunset * 1000;
    const date = new Date(unixTimestamp);

    const localized = date.toLocaleString();

    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.root} variant="outlined">
          <CardContent className={classes.MuiCardContent}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Current Weather
            </Typography>
            <Typography
              className={classes.text}
              variant="subtitle1"
              component="h2"
            >
              <div>{this.state.desc.main}</div>
              <div>Temp: {this.state.hits.temp} F</div>
              <div>Humidity: {this.state.hits.humidity}%</div>
              <div>Feels Like: {this.state.hits.feels_like} F</div>
              <div>Sunset: {localized}</div>
              <div>
                UV Index: High of {this.state.hits.uvi} (Caution if above 8)
              </div>

              {/* <div>Humidity: {props.hits.humidity}%</div>
          <div>Feels Like: {props.hits.feels_like} F</div>
          <div>Sunset: {localized}</div>
          <div>UV Index: {props.hits.uvi} (Caution when above 8) </div> */}
            </Typography>
          </CardContent>
        </Card>
        <form onSubmit={e => this.Formula(e)}>
        <div>
          <div className="field1">
            <TextField
              id="standard-number1"
              label="Outdoor Time"
              type="number"
              value={`${this.state.outdoor}`}
              onChange={this.onChangeOutdoor}
              // onSubmit={this.updateProgress("percent", this.state.text)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            outdoor percentage : {this.state.outdoorPercentage}
            </div>
          

          <div className="field2" noValidate autoComplete="off">
            <TextField
              id="standard-number2"
              label="Water Consumption"
              type="number"
              value={`${this.state.water}`}
              onChange={this.onChangeWater}
              InputLabelProps={{
                shrink: true,
              }}
            />
            water percentage : {this.state.waterPercentage}
          </div>
        </div>
        <button style={{ marginTop: 25, marginLeft: '45%' }} type="submit" onKeyDown={keyPress}>
            {" "}
             Get Energy Level{" "}
          </button>
          </form>
          <div className="progress-div">
          <LinearProgress
          classes={{barColorPrimary: classes.barColorPrimary}}
            variant="determinate"
            style={{ margin: 20, width: 400, marginLeft: '36%', height: 50 }}
            value={this.state.value <= 100 ? this.state.value : 100}
          />
          <h4>
            {typeof this.state.value === "number"
              ? `${this.state.value}%`
              : this.state.value}
          </h4>
        </div>
        {/* <ProgressBar width={400} percent={this.state.percent} /> */}
      </div>
    );
  }
}

export default withStyles(styles)(App);
