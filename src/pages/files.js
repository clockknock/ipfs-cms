import React, {Component} from 'react';
import ipfsAPI from 'ipfs-api';

const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});

class Files extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dirHash: '',
            fileNames: []
        }
    }


    lsDir = () => {
        let dir = this.refs.lsDir.value;
        dir = dir || "/";
        ipfs.files.ls(dir, (err, files) => {
            if (err) {
                throw err;
            }
            this.setState({
                fileNames: files.map((file, index) => {
                    return file.name;
                })
            })
        })
    };

    getHash = () => {
        let dir = this.refs.lsDir.value;
        dir = dir || "/";
        ipfs.files.stat(dir, (err, files) => {
            if (err) {
                throw err;
            }
            console.log(files);
            console.log(files.hash);
            this.setState({
                dirHash: files.hash
            })
        })
    };

    copy = () => {
        let srcFilePath = this.refs.srcFile.value;
        let dirFile = this.refs.dirFile.value;

        console.log(srcFilePath + "   " + dirFile);
    };

    render() {
        const {dirHash, fileNames} = this.state;
        return (
            <div>
                <h1>文件/文件夹管理</h1>

                <h3>查看路径(ls)</h3>
                <hr/>
                <input type="text" placeholder="请输入路径" ref="lsDir"/>
                <button onClick={this.lsDir}>查看文件/文件夹</button>
                <button onClick={this.getHash}>查看hash</button>
                {dirHash &&
                <p>文件/文件夹的hash为:{dirHash}</p>
                }
                <ol>
                    {fileNames &&
                    fileNames.map((fileName, i) => {
                        return <li>{fileName}</li>
                    })
                    }
                </ol>


                <h3>复制到路径(cp)</h3>
                <hr/>
                <input type="text" ref="srcFile" placeholder="hash or file or dir"/>->
                <input type="text" ref="dirFile" placeholder="dir"/>
                <button onClick={this.copy}>执行复制</button>


                <h3>删除路径(rm)</h3>
                <hr/>
                <input type="text" placeholder="file"/>
                <button>执行删除</button>


            </div>
        );
    }
}


export default Files;
