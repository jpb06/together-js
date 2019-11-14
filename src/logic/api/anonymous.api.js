import axios from "axios";
import {apiUrl} from "./setup/together.api";

const createNewUser = async (firstName, lastName, email, password) => {
    try {
        const result = await axios.post(`${apiUrl}/user/create`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
        if (result && result.data && result.data.status === 200 && result.data.user) {
            return {status: 200, user: result.data.user};
        }

        return undefined;

    } catch (error) {
        console.log(error.response);
        if (error.response.status === 400) {
            return {status: 400};
        }

        return undefined;
    }
};

export {
    createNewUser
};