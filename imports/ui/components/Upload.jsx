import React,{Component} from 'react';
import flat,{unflatten} from 'flat';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import Alert from 'react-s-alert';

import Loader from './Loader';
import {mapData} from './ProjectDisplay';
import HelperFunctions from '../functions';
import Charts from './Charts';

export default class Upload extends Component {
  constructor(){
    super();
    this.state = {
      uploading : false,
      data : null
    }
    this.handleUploadingFile = this.handleUploadingFile.bind(this);
    this.csvFileParse = this.csvFileParse.bind(this);
    this.excelFileParse = this.excelFileParse.bind(this);
  }
  csvFileParse(currentFile,e) {
    return new Promise(function(resolve, reject) {
      Papa.parse(currentFile, { dynamicTyping : true,header: true, complete: resolve ,error : reject});
    });
    e.preventDefault();
  }
  excelFileParse(currentFile) {
    console.log(XLS);
    var reader = new FileReader();
    var name = currentFile.name;
    reader.onload = function(e) {
      var data = currentFile;

      /* if binary string, read with type 'binary' */
      var workbook = XLS.read(data, {type: 'binary'});

      /* DO SOMETHING WITH workbook HERE */
      console.log(workbook);
    };
    reader.readAsBinaryString(currentFile);
  }
  handleUploadingFile(e) {
    var self = this;
      self.setState({
        uploading: true
      })
     let currentFile = this.refs.file.files[0];
     let fileExtension = HelperFunctions.getFileExtension(currentFile.name);
     let switchOutput;
     switch (fileExtension) {
       case 'csv':
        this.csvFileParse(currentFile,e).then((results) => {
          switchOutput = results.data.map((data) => {
            data.date = new Date(data.date);
            return unflatten(data);
          })
          let switchOutputFinal = mapData(switchOutput);
          this.setState({
            data : switchOutputFinal
          })
          console.log(switchOutputFinal,"------------------------switch final");
        },(err) => {
          Alert.error(err.message , {
            position: 'top-right',
            effect: 'jelly',
          })
        })
       break;

       case 'xls' :
        this.excelFileParse(currentFile,e);
      break;

       default :
       Alert.error('File Format is not supported',{
         position: 'top-right',
         effect: 'jelly',
       })
     }
     self.setState({
       uploading: false
     })
  }
  render() {
    let {uploading,data} = this.state;

    let renderComponent = () => {
      console.log(uploading)
      if(uploading) {
        return (<Loader />)
      }else {
        return (
          <form ref="uploadForm" className="uploader" encType="multipart/form-data" onChange={this.handleUploadingFile}>
            <input ref="file"
                  type="file"
                  onChange={this.handleUploadingFile}
                  className="uploadFile"
                  accept=".csv,.xlx,.xlxs" />
          </form>
        )
      }
    }

    let renderCharts = () => {
      if(data != null) {
        return (<Charts projectData={data} height={255} width={750} />)
      }
    }

    return(
      <div className="upload">
        <Alert stack={true} timeout={3000} />
        <h2>Upload any CSV or XLXS file</h2>
        {renderComponent()}
        {renderCharts()}
      </div>
    )
  }
}
