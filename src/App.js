import React, { Component } from 'react';
import './App.css';


class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				
			</div>
		);
	}
}





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: []
    };
  }


  componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&units=imperial&exclude=minutely&appid=d52bf8a50a9a8e883cbeec88eea8d31e`
		)
			.then((json) => json.json())
			.then((data) => {
				this.setState({
					hits: data.current
				});
				console.log(data);
			})
			.catch((error) => console.log("parsing failed", error));
	}

  render() {
  return (
    <div className="App">

  <div> Current Temp: {this.state.hits.temp} F</div>
  <div>Feels Like: {this.state.hits.feels_like} F</div>
  <div>Humidity: {this.state.hits.humidity}%</div>
  <div>UV Index: {this.state.hits.uvi} (Take caution when above 8) </div>

      {/* {this.state.hits.map((hitData, index) => (
					<Weather key={index} forecast={hitData} />
				))} */}
    </div>
  );
  }
}

export default App;
