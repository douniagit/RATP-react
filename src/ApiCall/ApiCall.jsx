import React from 'react';
import Request from "superagent";

class ApiCall extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
          metroLine:"",
          arret:"",
          destination:"",

          stations:[],
          line:[],
          time:[]
	    }
	    this.callingApi();
      // this.handleChange = this.handleChange.bind(this);
	  }

	 callingApi(){
		// const url=`https://api-ratp.pierre-grimaud.fr/v2/${this.state.typeLine}/${this.state.metroLine}/stations?format=json`;
    //const url=`https://api-ratp.pierre-grimaud.fr/v2/metros/${this.state.metroLine}/stations/${this.state.arret}?destination=${this.state.destination}`;
    const url="https://api-ratp.pierre-grimaud.fr/v2/metros/8/stations/daumesnil?destination=balard";
    Request.get(url).then((data)=>{
		// console.log(JSON.parse(data.text));
			const ratp=JSON.parse(data.text);
       this.setState({stations:this.state.stations.concat([ratp.response.informations.station])});
        this.setState({line:this.state.line.concat([ratp.response.informations])});
       this.setState({time:ratp.response.schedules});
		 //	console.log(this.state.stations);
		 });
	}


  // handleChange(event) {
  //   this.setState({typeLine: event.target.value})
  //   this.setState({metroLine: event.target.value});
  // }

	componentDidMount(){
 // this.handleChange();
	this.callingApi();
	this.refresh = setInterval(
      ()=>this.callingApi(), 60000);
}






stationName(){
       return this.state.stations.map((info, i) =>{
          return (<div>
            stationActuelle = {info.name}
            </div>)
          });
        }

lineName(){
       return this.state.line.map((info, i) =>{
          return (<div>
            metro = {info.line}
            </div>)
          });
        }

  render() {
	  	const getInfo = this.state.time;
	  	const situation = getInfo.map((info, i) =>{
	  		console.log(info);
	        return (<div>
            stationActuelle={this.stationName()}
            metro={this.lineName()}
            direction = {info.destination}
            temps d attente = {info.message}
            </div>)
          });


    return (
      <div>
        {/*<input type="text" value={this.state.metroLine} onChange={this.handleChange} />
        <input type="text" value={this.state.arret} onChange={this.handleChange} />
        <input type="text" value={this.state.destination} onChange={this.handleChange} />
        */}
          {situation}
        </div>
    );
  }
}

export default ApiCall;
