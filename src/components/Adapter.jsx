import React, { Fragment } from 'react';
import AdapterConfig from './AdapterConfig';
import { dump } from 'js-yaml';
import changePropertyValue from '../helpers/helper.js';
import Dependecies from './Dependecies'
const Adapter = (props) => {
  const { adapterArray } = props;

  const downloadToFile = async (data, filename, contentType) => {
    const file = new Blob([data], { type: contentType });

    if (window.showSaveFilePicker !== undefined) {
      const newHandle = await window.showSaveFilePicker({
        types: [{
          description: 'Yaml file',
          accept: { 'text/plain': ['.yaml'] }
        }]
      });
      const writableStream = await newHandle.createWritable();
      await writableStream.write(file);
      await writableStream.close();
    } else {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
    }
  };

  const saveAdapter = () => {
    const yamlData = dump(adapterArray);
    console.log(yamlData);
    downloadToFile(yamlData, 'adapter.yml', 'text/plain');
  };
  
  return (
    <Fragment>
      {adapterArray && adapterArray.map((item) => (
        <div key={item.mainClass}>
          <h2 className="h1 text-center">Output Handler</h2>
          <h5 className="text-primary">Plugin Configuration</h5>
          <div className="row g-2">
            <div className="col-sm-5">
              <div className="form-floating mb-3 ">
                <input type="text" className="form-control" defaultValue={item.id} onChange={(e) => changePropertyValue(item, 'id', e.target.value)}/>
                <label>ID</label>
              </div>
            </div>
            <div className="col-sm-5">
              <Dependecies/>
            </div>
            <div className="col-sm-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" defaultValue={item.stepName} onChange={(e) => changePropertyValue(item, 'stepName', e.target.value)}/>
                <label>StepName</label>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" readOnly value={item.mainClass} onChange={(e) => changePropertyValue(item, 'mainClass', e.target.value)}/>
                <label>MainClass</label>
              </div>
            </div>
          </div>
          <h5 className="text-primary">Config</h5>
          
          <AdapterConfig
            key={item.id}
            config={item.config}
          />
        </div>
      ))}
      <div className="row">
        <div className="float-end">
          <button type="button" className="btn btn-primary float-end" onClick={saveAdapter}>
            Save
          </button>
          <button
            type="button"
            className="btn btn-outline-primary float-end me-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </Fragment>
  )
};

export default Adapter;