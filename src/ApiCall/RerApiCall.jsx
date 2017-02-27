import React from 'react';
import Request from "superagent";

class RerApiCall extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
        rerLine:"",
        position:"",
        terminus:"",
        stations:[],
        // line:[],
        time:[]
	    }
	    this.callingApi();
	  }

	 callingApi(){
		const url=`https://api-ratp.pierre-grimaud.fr/v2/rers/${this.state.rerLine}/stations/${this.state.position}?destination=${this.state.terminus}`;
    //const url="https://api-ratp.pierre-grimaud.fr/v2/rers/B/stations/denfert+rochereau?destination=robinson+saint+remy+les+chevreuse&endingstation=arcueil+cachan";
    //const url="https://api-ratp.pierre-grimaud.fr/v2/rers/B/stations/denfert+rochereau?destination=robinson+saint+remy+les+chevreuse"; ca fonctionne dans renseigner l'arret

    Request.get(url).then((data)=>{
		 // console.log(JSON.parse(data.text));
			const ratp=JSON.parse(data.text);
       this.setState({stations:this.state.stations.concat([ratp.response.informations.station])});
       this.setState({time:ratp.response.schedules});
		 //	console.log(this.state.stations);
		 });
	}


  handleChange(key, event) {
    this.setState({[key]: event.target.value})
  }

	componentDidMount(){
	this.refresh = setInterval(
      ()=>this.callingApi(), 10000);
}

// stationName(){
//        return this.state.stations.map((info, i) =>{
//           return (<div>
//             stationActuelle = {info.name}
//             </div>)
//           });
//         }

  render() {
	  	const getInfo = this.state.time;
	  	const situation2 = getInfo.map((info, i) =>{
	  		//console.log(info);
	        return (<div>
            RER = {this.state.rerLine} <br/>
            position ={this.state.position} <br/>
            direction = {info.destination}
            File d attente = {info.message}
            </div>)
          });



    return (
      <div >
        <input type="text" value={this.state.rerLine} onChange={this.handleChange.bind(this,'rerLine')} placeholder="ligne de rer..."/>
        <input type="text" value={this.state.position} onChange={this.handleChange.bind(this,'position')} placeholder="la station la plus proche..."/> 
        <input type="text" value={this.state.terminus} onChange={this.handleChange.bind(this, 'terminus')} placeholder="direction..."/>
          
        {situation2}
      </div>

    );
  }
}

export default RerApiCall;