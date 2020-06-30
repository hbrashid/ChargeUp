import React, { Component } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
// import Router from "./Router";
// import { BrowserRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      desc: [],
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

  render() {
    const useStyles = makeStyles({
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
      },
    });

    const unixTimestamp = this.state.hits.sunset * 1000;
    const date = new Date(unixTimestamp);

    const localized = date.toLocaleString();

    const classes = useStyles();
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.MuiCardContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Current Weather
          </Typography>
          <Typography variant="subtitle1" component="h2">
            <div>{this.state.desc.main}</div>
            <div>Temp: {this.state.hits.temp} F</div>
            <div>Feels Like: {this.state.hits.feels_like} F</div>
            <div>Humidity: {this.state.hits.humidity}%</div>
            <div>Sunset: {localized}</div>
            <div>UV Index: {this.state.hits.uvi} (Take caution when above 8)</div>

            {/* <div>Humidity: {props.hits.humidity}%</div>
          <div>Feels Like: {props.hits.feels_like} F</div>
          <div>Sunset: {localized}</div>
          <div>UV Index: {props.hits.uvi} (Caution when above 8) </div> */}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default App;
