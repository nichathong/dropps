import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const ButtonContainer = () => {
  const [increment, setIncrement] = useState(0);
  const [text, setText] = useState(true);
  const [origin, setOrigin] = useState("xx.xx.xx.xx");
  const [disable, setDisable] = useState(false);
  const cancelLoading = useRef()

  useEffect(() => {
    getLocalData();
  }, []);

  useEffect(() => {
    saveLocalData();
  }, [origin]);

  const fetchData = async () => {
    try {
      cancelLoading.current = axios.CancelToken.source();
      const data = await axios.get('https://httpbin.org/delay/4', 
        {cancelToken: cancelLoading.current.token});
      setOrigin(JSON.stringify(data.data.origin));
      setDisable(false);
      setText(true);
    } catch (err) {
      console.log(err);
      setDisable(false);
    }
  };


  const handleOnClick = () => {
    setIncrement(increment + 1);
    setText(!true);
    setDisable(true);
    fetchData();
    saveLocalData();
  };

  const handleCancel = () => {
    setIncrement(increment + 1);
    setDisable(true);
    setText(true);
    setDisable(!true);
    cancelLoading.current.cancel();
  }
 
  const saveLocalData = () => {
    localStorage.setItem('origin', JSON.stringify(origin));
    console.log(JSON.stringify(origin));
  };

  const getLocalData = () => {
    if (localStorage.getItem('origin') === null) {
      localStorage.setItem('origin', JSON.stringify([]));
    } else {
      let localOrigin = JSON.parse(localStorage.getItem('origin'));
      setOrigin(localOrigin);
    }
  };

  return (
    <div>
      <button onClick={handleOnClick} disabled={disable}>
        {text ? 'click me' : 'click me (Loading)'}
      </button>
      <button onClick={handleCancel} disabled={!disable}>
        cancel
      </button>
      <p>Renders: {increment}</p>
      <p>Origin: {origin} </p>
    </div>
  );
};

export default ButtonContainer;

