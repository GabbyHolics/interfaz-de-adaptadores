import './App.css';
import React, { useState, useEffect } from 'react';
import { load } from 'js-yaml';
import Main from './components/Main';

const App = () => {
  const [adapterArray, setAdapterArray] = useState([]);

  useEffect(() => {
    fetch('./data/config/inputHandler.yml')
      .then((response) => response.text())
      .then((yamlText) => {
        const yamlObject = load(yamlText);
        // console.log(yamlObject);
        setAdapterArray(yamlObject);
      }).catch((err) => console.log('failed to load yaml file', err));
  }, []);

  return (
    <div>
      <Main adapterArray={adapterArray}/>
    </div>
  );
};

export default App;
