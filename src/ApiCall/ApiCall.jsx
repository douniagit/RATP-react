import React from 'react';
import Request from "superagent";

class ApiCall extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
        typeLine:'metros'||'rers',
        numberLine:' ',
        stations:[]
	    }
	    this.callingApi();
	  }

	 callingApi(){
		// const url=`https://api-ratp.pierre-grimaud.fr/v2/${this.state.typeLine}/${this.state.numberLine}/stations?format=json`;
    const url="https://api-ratp.pierre-grimaud.fr/v2/metros/9/stations?format=json";
    Request.get(url).then((data)=>{
		 // console.log(JSON.parse(data.text));
			const ratp=JSON.parse(data.text);
			 this.setState({stations:ratp.response.stations});
		 	console.log(this.state.stations);
		 });
	}
  // handleChange(event) {
  //   this.setState({typeLine: event.target.value})
  //   this.setState({numberLine: event.target.value});
  // }

// 	componentDidMount(){
// 	this.callingApi();
// 	this.refresh = setInterval(
//       ()=>this.callingApi(), 10000);
// }

  render() {
	  	const getInfo = this.state.stations;
	  	const velib = getInfo.map((info, i) =>{
	  		console.log(info);
	        return (<div>
            	name = {info.name}
            </div>)
          });

    return (
      <div >
        {velib}
      <input type="text" value={this.state.typeLine} onChange={this.handleChange} />
    <input type="text" value={this.state.numberLine} onChange={this.handleChange} />
      </div>

    );
  }
}

export default ApiCall;
