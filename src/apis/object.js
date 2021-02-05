import axios from '../utils/request';

class ObjectAPIs {
    static async getTemporaryDownloadURL() {
        try {
            const res = await axios.post('oss/v2/buckets/edison_bucket/objects/box.ipt/signed', {});
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
    static async getTemporaryUploadURLforOutputIPTFile(id) {
        try {
            const res = await axios.post(
                `https://developer.api.autodesk.com/oss/v2/buckets/edison_bucket/objects/${id}.ipt/signed?access=readwrite`,
                {}
            );
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ObjectAPIs;
