import React, {Component} from 'react';
import ipfsApi from 'ipfs-api';

let ipfs = ipfsApi({host: 'localhost', port: '5001', protocol: 'http'});

class TextPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peerId: "",
            hash: '',
            inputHash: ''
        }
    }

    componentDidMount() {
        ipfs.id((err, identify) => {
            if (err) {
                throw err
            }
            console.log(identify);
            this.setState({
                peerId: identify.id
            })
        })
    }

    add = () => {
        let data = this.inputNode.value;
        data = Buffer.from(data);
        ipfs.files.add(data, (err, files) => {
            if (err) {
                throw err;
            }
            this.setState({
                hash: files[0].hash,
                inputHash: files[0].hash
            })
        })
    };

    query = () => {
        let data =this.state.inputHash;
        ipfs.files.cat(data, (err, file) => {
            if (err) {
                throw err;
            }
            this.refs.outputArea.value=file.toString();
        })
    };

    setInputHash = (e) => {
        this.setState({
                inputHash: e.target.value
            }
        )
    };

    render() {
        const {peerId, hash, inputHash} = this.state;
        return (
            <div>
                <p>当前ipfs节点id:{peerId}</p>
                <hr/>

                <textarea cols="30" rows="10" ref={(input) => this.inputNode = input}
                          placeholder="text to add"/> <br/>

                <button onClick={this.add}>添加</button>
                <br/>
                {hash && <p>当前hash:{hash}</p>}
                <br/>

                <hr/>
                <textarea cols="30" rows="10" ref="outputArea" disabled="true"/> <br/>
                <input type="text" placeholder="hash to query"
                       onChange={this.setInputHash} value={inputHash}/>
                <button onClick={this.query}>查询</button>

            </div>
        );
    }
}


export default TextPage;
