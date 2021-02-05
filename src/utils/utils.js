class Utils {
    static getFormData(object) {
        let formData = new FormData();
        for (var k in object) {
            formData.append(k, object[k]);
        }
        return formData;
    }
    static getFormUrlencodedData(object) {
        let formBody = [];
        for (var property in object) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(object[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        return formBody;
    }
}

export default Utils;
