import React from 'react';
import Request from "superagent";

class ApiCall extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
          metroLine:"9",
          position:"croix+de+chavaux",
          terminus:"mairie+de+montreuil" && "pont+de+sevres",
          stations:[],
          line:[],
          time:[]
	    }
	   this.callingApi();
	  }

	callingApi(){
    const url=`https://api-ratp.pierre-grimaud.fr/v2/metros/${this.state.metroLine}/stations/${this.state.position}?destination=${this.state.terminus}`;
    Request.get(url).then((data)=>{
		 //console.log(JSON.parse(data.text));
			const ratp=JSON.parse(data.text);
        this.setState({stations:this.state.stations.concat([ratp.response.informations.station])});
        this.setState({line:this.state.line.concat([ratp.response.informations])});
        this.setState({time:ratp.response.schedules});
		 //	console.log(this.state.stations);
		 });
	}

  // handleChange(event) {
  //  this.setState({metroLine: event.target.value})
  // console.log(this.state.metroLine);
  // }


	componentDidMount(){
  //this.handleChange();
	this.callingApi();
	this.refresh = setInterval(
      ()=>this.callingApi(), 10000);
  }

  stationName(){
         return this.state.stations.map((info, i) =>{
            return (<div>
              station Actuelle = {info.name}
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
	  	//console.log(info);
          return (<div>
            direction = {info.destination}
            <br/>
            temps d attente = {info.message}
            </div>)
          });

    return (
      <div>
        {/*<input type="text" value={this.state.metroLine} onChange={this.handleChange.bind(this)} placeholder="ligne de metro numero..."/>
        <input type="text" defaultValue={this.state.terminus} onChange={this.handleChange.bind(this)} placeholder="direction..."/>
          */}<br/>
          <br/>
          {this.lineName()}
          {this.stationName()}
          {situation}
        </div>

    );
  }
}

export default ApiCall;
