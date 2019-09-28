import {clearLocalStorage, getFromLocalStorage} from "../../local.store";

const setInterceptors = (instance, history) => {

    instance.interceptors.request.use(function (config) {

        const token = getFromLocalStorage('token');
        const expiration = getFromLocalStorage('expiration');
        if (!token || !expiration) {
            clearLocalStorage();
            history.push({
                pathname: '/'
            });
        } else {
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    }, function (error) {
        // Do something with request error

        return Promise.reject(error);
    });

    instance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            if (error.response.status === 401) {
                clearLocalStorage();
                history.push({
                    pathname: '/'
                });
            }

            return Promise.resolve(error.response.data);

        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
            return Promise.resolve(undefined);

        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject(error);
        }
    });
};
export default setInterceptors;