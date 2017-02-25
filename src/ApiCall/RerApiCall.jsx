import React from 'react';
import Request from "superagent";

class RerApiCall extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
        typeLine:"",
        numberLine:"",
        stations:[],
        time:[]
	    }
	    this.callingApi();
      this.stationName();
	  }

	 callingApi(){
		// const url=`https://api-ratp.pierre-grimaud.fr/v2/${this.state.typeLine}/${this.state.numberLine}/stations?format=json`;
    const url="https://api-ratp.pierre-grimaud.fr/v2/rers/B/stations/denfert+rochereau?destination=robinson+saint+remy+les+chevreuse&endingstation=arcueil+cachan";
    Request.get(url).then((data)=>{
		 // console.log(JSON.parse(data.text));
			const ratp=JSON.parse(data.text);
       this.setState({stations:this.state.stations.concat([ratp.response.informations.station])});
       this.setState({time:ratp.response.schedules});
		 //	console.log(this.state.stations);
		 });
	}


  // handleChange(event) {
  //   this.setState({typeLine: event.target.value})
  //   this.setState({numberLine: event.target.value});
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

  render() {
	  	const getInfo = this.state.time;
	  	const situation = getInfo.map((info, i) =>{
	  		console.log(info);
	        return (<div>
            {this.stationName()}
            direction = {info.destination}
            File d attente = {info.message}
            </div>)
          });



    return (
      <div >
        {situation}
      </div>

    );
  }
}

export default RerApiCall;