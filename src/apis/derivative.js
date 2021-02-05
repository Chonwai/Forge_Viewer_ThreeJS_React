import axios from '../utils/request';

class DerivativeAPI {
    static async getTheStatusOfTheTranslationJob(urn) {
        try {
            const res = await axios.get(
                `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/manifest`
            );
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
    static async translateToSVF2(urn) {
        try {
            let body = {
                input: {
                    urn: `${urn}`,
                },
                output: {
                    destination: {
                        region: 'us',
                    },
                    formats: [
                        {
                            type: 'svf2',
                            views: ['2d', '3d'],
                        },
                    ],
                },
            };
            const res = await axios.post('modelderivative/v2/designdata/job', body);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default DerivativeAPI;
