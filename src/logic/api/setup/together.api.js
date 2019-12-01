import axios from "axios";
import setInterceptors from "./axios.interceptors";
import apiUrl from "./../private/current.config.js";

class TogetherApi {
}
TogetherApi.Instance = axios.create({
    baseURL: apiUrl,
    timeout: 15000,
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