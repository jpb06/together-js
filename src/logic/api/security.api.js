import axios from "axios";
import {apiUrl} from "./setup/together.api";

const login = async (email, password) => {
    try {
        const result = await axios.post(`${apiUrl}/login`, {
            login: email,
            password: password
        });

        if (result && result.data && (
            result.data.status === 200 && result.data.token && result.data.user && result.data.expirationDate
        )) {
            return {
                ...result.data
            };
        }

        return undefined;

    } catch (error) {
        return undefined;
    }
};

export {login};