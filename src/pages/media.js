import React, {Component} from 'react';
import {addFile} from "../utils/ipfsUtil";

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hash: '',
            inputHash: ''
        }
    }

    handleAddFile = () => {
        const file = this.fileInput.files[0];
        addFile(file)
            .then(hash => {
                this.setState({
                    hash: hash,
                    inputHash: hash
                });
                this.refs.inputHash.value = hash;
            })
            .catch(e => {
                throw e;
            });
    };

    setInputHash = () => {
        console.log("setInputHash");
        let data = this.refs.inputHash.value;
        this.setState({
            inputHash: data
        })
    };

    render() {
        const {hash, inputHash} = this.state;
        return (
            <div>
                <h1>媒体文件上传&获取</h1>
                <h3>媒体文件上传</h3>
                <fieldset>
                    <legend>请选择媒体文件:</legend>
                    <input type="file" ref={input => this.fileInput = input}/><br/>
                </fieldset>
                <button onClick={this.handleAddFile}>上传媒体文件</button>

                {hash && <p>上传成功,hash为:{hash}</p>}< br/>
                <hr/>
                <h3>媒体文件获取</h3>
                <input type="text" ref="inputHash"/>
                <button onClick={this.setInputHash}>获取媒体文件</button>
                {inputHash &&
                <div>
                    <video src={`http://localhost:8090/ipfs/${inputHash}`}/>
                </div>
                }
            </div>
        );
    }
}


export default Media;
