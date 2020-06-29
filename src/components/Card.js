import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

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

export default function WeatherCard(props) {
  const classes = useStyles();

  // const unixTimestamp = props.hits.sunset * 1000;
  // const date = new Date(unixTimestamp);

  // const localized = date.toLocaleString();

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
          <div>{props.desc.main}</div>
          <div>Temp: {props.hits.temp} F</div>
          <div>Humidity: {props.hits.humidity}%</div>
          <div>Feels Like: {props.hits.feels_like} F</div>
          {/* <div>Sunset: {localized}</div> */}
          <div>UV Index: {props.hits.uvi} (Caution when above 8) </div>
        </Typography>
      </CardContent>
    </Card>
  );
}
