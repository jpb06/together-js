import axios from "axios";
import setInterceptors from "./axios.interceptors";

const apiUrl = 'http://192.168.0.20:3001/api';

class TogetherApi {
}
TogetherApi.Instance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    validateStatus: function (status) {
    },
    params: {} // do not remove this, its added to add params later in the config
});
TogetherApi.requiresSetup = true;
TogetherApi.setup = (history) => {
    if (TogetherApi.requiresSetup) {
        console.log('Configuring API ...');
        setInterceptors(TogetherApi.Instance, history);
        TogetherApi.requiresSetup = false;
    }
};

const ensureStatus = (result) => {
    if (!result) result = {status: -1, data: undefined};

    return result;
};

export {apiUrl, ensureStatus};
export default TogetherApi;