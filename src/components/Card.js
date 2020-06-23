import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
    margin: '0 auto'
  },
  title: {
    fontSize: 14,
  },
});

export default function WeatherCard(props) {
  const classes = useStyles();
  
  const unixTimestamp = props.hits.sunset * 1000;
    const date = new Date(unixTimestamp);

    
    const localized = date.toLocaleString();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Current Weather
        </Typography>
        <Typography variant="subtitle1" component="h2">
        <div>Current Temp: {props.hits.temp} F</div>
        <div>Feels Like: {props.hits.feels_like} F</div>
        <div>Humidity: {props.hits.humidity}%</div>
        <div>Sunset: {localized}</div>
        <div>UV Index: {props.hits.uvi} (Take caution when above 8) </div>
        <div>Rain: {props.rain['1h']}mm (in last hour)</div>
          
        </Typography>
        
        
      </CardContent>
      <CardActions>
      
        
      </CardActions>
    </Card>
  );
}