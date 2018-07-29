import ipfsAPI from 'ipfs-api';

const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});
const addFile = (file) => {
        return new Promise((resolve, reject) => {
            let fr = new FileReader();
            console.log(file);
            fr.onloadend = (ev) => {
                console.log("end");
                const data = Buffer.from(fr.result);

                ipfs.files.add(data, (err, files) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(files[0].hash)
                })
            };
            fr.readAsArrayBuffer(file);
        });
    }
;
export {addFile};