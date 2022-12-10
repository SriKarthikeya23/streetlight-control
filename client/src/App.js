import Axios from 'axios';
import './App.css';
import React, { useState } from 'react';

function App() {
  
  const [val1, setVal1] = useState(false);
  const [val2, setVal2] = useState(false);
  const [val3, setVal3] = useState(false);
  const [val4, setVal4] = useState(false);

  var light1 = 0;
  var light2 = 0;
  var light3 = 0;
  var light4 = 0;
  
  const getLightData = () => {
    Axios.get('http://65.49.44.136:6001/get/light/all').then((res) => {
      light1 = res.data.light1;
      light2 = res.data.light2;
      light3 = res.data.light3;
      light4 = res.data.light4;
      lightState1(light1);
      lightState2(light2);
      lightState3(light3);
      lightState4(light4);
      })
    }

    const lightState1 = (val) => {
      if(val === 1) {
        setVal1(true);
      } else if(val === 0) {
        setVal1(false);
      }
    }
    const lightState2 = (val) => {
      if(val === 1) {
        setVal2(true);
      } else if(val === 0) {
        setVal2(false);
      }
    }
    const lightState3 = (val) => {
      if(val === 1) {
        setVal3(true);
      } else if(val === 0) {
        setVal3(false);
      }
    }
    const lightState4 = (val) => {
      if(val === 1) {
        setVal4(true);
      } else if(val === 0) {
        setVal4(false);
      }
    }

    const postLight1 = (state) => {
      Axios.post("http://65.49.44.136:6001/post/light/1", {
        data: state
      }).then(() => {
        console.log("Light 1 status sent");
      })
    }
  
    const postLight2 = (state) => {
      Axios.post("http://65.49.44.136:6001/post/light/2", {
        data: state
      }).then(() => {
        console.log("Light 2 status sent");
      })
    }
  
    const postLight3 = (state) => {
      Axios.post("http://65.49.44.136:6001/post/light/3", {
        data: state
      }).then(() => {
        console.log("Light 3 status sent");
      })
    }
  
    const postLight4 = (state) => {
      Axios.post("http://65.49.44.136:6001/post/light/4", {
        data: state
      }).then(() => {
        console.log("Light 4 status sent");
      })
    }

  const toggler1 = () => {
    if(val1 === true) {
      setVal1(false);
      postLight1(0);
    } else {
      setVal1(true);
      postLight1(1);
    }
  }
  const toggler2 = () => {
    if(val2 === true) {
      setVal2(false);
      postLight2(0);
    } else {
      setVal2(true);
      postLight2(1);
    }
  }
  const toggler3 = () => {
    if(val3 === true) {
      setVal3(false);
      postLight3(0);
    } else {
      setVal3(true);
      postLight3(1);
    }
  }
  const toggler4 = () => {
    if(val4 === true) {
      setVal4(false);
      postLight4(0);
    } else {
      setVal4(true);
      postLight4(1);
    }
  }

  const [ct1, setCt1] = useState(0);
  const [ct2, setCt2] = useState(0);
  const [ct3, setCt3] = useState(0);
  const [ct4, setCt4] = useState(0);

  const getCtData = () => {
    Axios.get("http://65.49.44.136:6001/get/ct/all").then((response) => {
      setCt1(response.data.ct1);
      setCt2(response.data.ct2);
      setCt3(response.data.ct3);
      setCt4(response.data.ct4);
    })
  };

  setInterval(getLightData, 5000);
  setInterval(getCtData, 10000);
  setInterval(window.location.reload, 300000);

  return (
    <div className='App'>
      <h1>Smart Street Light</h1>

      <div className='light-control'>
        <h1>Light Control</h1>

        <h3>Light 1</h3>
        <label className="switch" >
          <input type="checkbox" checked={val1} onClick={toggler1}></input>
          <span className="slider round"></span>
        </label>

        <h3>Light 2</h3>
        <label className="switch" >
          <input type="checkbox" checked={val2} onClick={toggler2}></input>
          <span className="slider round"></span>
        </label>

        <h3>Light 3</h3>
        <label className="switch" >
          <input type="checkbox" checked={val3} onClick={toggler3}></input>
          <span className="slider round"></span>
        </label>

        <h3>Light 4</h3>
        <label className="switch" >
          <input type="checkbox" checked={val4} onClick={toggler4}></input>
          <span className="slider round"></span>
        </label>
      </div>

      <div className='ct'>
        <h2>CT values</h2>
        <p>CT Value 1 = {ct1}</p>
        <p>CT Value 2 = {ct2}</p>
        <p>CT Value 3 = {ct3}</p>
        <p>CT Value 4 = {ct4}</p>
      </div>
    </div>
 );
}

export default App
