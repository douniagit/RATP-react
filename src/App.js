import React, { Component } from 'react';
import ApiCall from "./ApiCall/ApiCall.jsx";
import RerApiCall from "./ApiCall/RerApiCall.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApiCall />
        <RerApiCall />
      </div>
    );
  }
}

export default App;
