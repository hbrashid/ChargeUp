import React, { Component } from "react";
import "../App.css";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";

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
    textAlign: 'center',
  },
  text: {
    textAlign: 'center'
  },
   'MuiTextField-root': {
      margin: '85%',
      width: '25ch',
    },
  
};


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
          <Typography className={classes.text} variant="subtitle1" component="h2">
            <div>{this.state.desc.main}</div>
            <div>Temp: {this.state.hits.temp} F</div>
            <div>Humidity: {this.state.hits.humidity}%</div>
            <div>Feels Like: {this.state.hits.feels_like} F</div>
            <div>Sunset: {localized}</div>
            <div>
              UV Index: {this.state.hits.uvi} (Take caution when above 8)
            </div>

            {/* <div>Humidity: {props.hits.humidity}%</div>
          <div>Feels Like: {props.hits.feels_like} F</div>
          <div>Sunset: {localized}</div>
          <div>UV Index: {props.hits.uvi} (Caution when above 8) </div> */}
          </Typography>
        </CardContent>
      </Card>
      <div>
      <form className='field1' noValidate autoComplete="off">
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      
      

      <form className='field2' noValidate autoComplete="off">
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      </div>
      </div>
      




      
    );
  }
}

export default withStyles(styles)(App);
