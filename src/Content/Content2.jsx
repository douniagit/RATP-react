import React from 'react';
import "./content.css";
import RerApiCall from "./../ApiCall/RerApiCall.jsx";
import {Router, Route, Link } from 'react-router';

class Content2 extends React.Component {

	
  render() {
	  	

    return (
      <div>
        <div className="info">
              <img src="http://img0.gtsstatic.com/logo/logo-ratp_114128_w620.jpg" alt="ratp"/>
        </div>
          <div className="content">
            <div className="container">
              <h1> Choppes Ton Train</h1>
              <br/>
            <div className="cadrant" style={{width:"500px", height:" 280px", overflow:"hidden"}}>
            <RerApiCall />
            </div>
        </div>
          </div>
      </div>
    );
  }
}

export default Content2;