import Auth from '../utils/auth';
import Utils from '../utils/utils';
import LocalStorgae from '../utils/localstorage';

class AuthAPIs {
    static async getAccessToken() {
        let body = {
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            grant_type: process.env.REACT_APP_GRANT_TYPE,
            scope: process.env.REACT_APP_SCOPE,
        };
        let formData = Utils.getFormUrlencodedData(body);
        try {
            const res = await Auth.post('authentication/v1/authenticate', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
            });
            LocalStorgae.set('access_token', res.data.access_token);
        } catch (error) {
            console.log(error);
        }
    }
}

export default AuthAPIs;
