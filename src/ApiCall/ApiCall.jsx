import React from 'react';
import Request from "superagent";

class ApiCall extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
          metroLine:"",
          position:"",
          terminus:"",
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

  handleChange(key, event ) {
    console.log(key)
   this.setState({[key]: event.target.value.substring(0,30)})
  }


	componentDidMount(){
	this.refresh = setInterval(
      ()=>this.callingApi(), 10000);
  }

  // stationName(){
  //        return this.state.stations.map((info, i) =>{
  //           return (<div>
  //             station Actuelle = {info.name}
  //             </div>)
  //           });
  //         }

  // lineName(){
  //       return this.state.line.map((info, i) =>{
  //           return (<div>
  //             metro = {info.line}
  //             </div>)
  //           });
  //         }

  render() {

	  	const getInfo = this.state.time;
	  	const situation = getInfo.map((info, i) =>{
	  	//console.log(info);
          return (<div>
            <br/>
            metro = {this.state.metroLine} <br/>
            position ={this.state.position} <br/>
            direction = {info.destination} <br/>
           <div style={{color:"red"}}> temps d attente = {info.message}</div>
            <br/>
            </div>)
          });

    return (
      <div>
        <input type="text" value={this.state.metroLine} onChange={this.handleChange.bind(this,'metroLine')} placeholder="ligne de metro numero..."/>
        <input type="text" value={this.state.position} onChange={this.handleChange.bind(this,'position')} placeholder="la station la plus proche..."/> 
        <input type="text" value={this.state.terminus} onChange={this.handleChange.bind(this, 'terminus')} placeholder="direction..."/>
          <br/>
          <br/>
          {situation}
        </div>

    );
  }
}

export default ApiCall;
