import React, { Component } from 'react';
import ApiCall from "./ApiCall/ApiCall.jsx";
//import RerApiCall from "./ApiCall/RerApiCall.jsx";
import Content from "./Content/Content.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApiCall />
       <Content />
      </div>
    );
  }
}

export default App;
