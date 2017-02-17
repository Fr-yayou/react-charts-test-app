import React,{Component} from 'react';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import Alert from 'react-s-alert';
import flat,{unflatten} from 'flat';

import Loader from './Loader';
import HelperFunctions from '../functions';

export default class Upload extends Component {
  constructor(){
    super();
    this.state = {
      uploading : false
    }
    this.handleUploadingFile = this.handleUploadingFile.bind(this);
    this.csvFileParse = this.csvFileParse.bind(this);
  }
  csvFileParse(currentFile,e) {
    Papa.parse( currentFile, {
     header: true,
     complete( results, file ) {
       // Handle the upload here
       console.log(unflatten(results.data[0]),results.data);
       return results;
     },
     error(error,file) {
       console.log(error.reason)
     }
     });
    e.preventDefault()
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
        this.csvFileParse(currentFile,e);
       break;
       default :
       Alert.error('File Format is not supported',{
         position: 'top-right',
         effect: 'jelly',
       })
     }
     console.log(switchOutput,unflatten);
     self.setState({
       uploading: false
     })
  }
  render() {
    let {uploading} = this.state;
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

    return(
      <div className="upload">
        <Alert stack={true} timeout={3000} />
        <h2>Upload any CSV or XLXS file</h2>
        {renderComponent()}
      </div>
    )
  }
}
