import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

export interface UserInterface {
    displayName?: string | undefined | null;
    email?: string | undefined | null;
    photoURL?: string | undefined | null;
    uid?: string | undefined | null;
    phoneNumber?: string | undefined | null;
    providerId?: string | undefined | null;
    keywords?: string | undefined | null;
}

//register
interface DataRegister {
    email: string;
    username: string;
    password: string;
    fullname: string;
    address: string;
    birthday: Date;
}

interface ResponseRegister {
    message: string[];
}

//activate user
interface DataActivateUser {
    active_token: string;
}

interface ResponseActivateUser {
    message: string;
}

//login
interface DataLogin {
    username: string;
    password: string;
}

interface ResponseLogin {
    token: string;
    user: UserInterface;
}

//send reset password
interface DataSendResetPassword {
    username: string;
}

interface ResponseSendResetPassword {
    message: string[];
}

//reset password
interface DataResetPassword {
    password: string;
    reset_password_token: string;
}

interface ResponseResetPassword {
    message: string;
}

//change password
interface DataChangePassword {
    old_password: string;
    password: string;
}

interface ResponseChangePassword {
    message: string[];
}

class userAPI {
    private resource = "apiv1/user";

    public register = (
        data: DataRegister
    ): Promise<AxiosResponse<ResponseRegister>> => {
        return AxiosAPI(false).post(`${this.resource}/register`, data);
    };

    public activateUser = (
        data: DataActivateUser
    ): Promise<AxiosResponse<ResponseActivateUser>> => {
        return AxiosAPI(false).post(`${this.resource}/activate-user`, data);
    };

    public login = (data: DataLogin): Promise<AxiosResponse<ResponseLogin>> => {
        return AxiosAPI(false).post(`${this.resource}/login`, data);
    };

    public sendResetPassword = (
        data: DataSendResetPassword
    ): Promise<AxiosResponse<ResponseSendResetPassword>> => {
        return AxiosAPI(false).post(
            `${this.resource}/send-reset-password`,
            data
        );
    };

    public resetPassword = (
        data: DataResetPassword
    ): Promise<AxiosResponse<ResponseResetPassword>> => {
        return AxiosAPI(false).post(`${this.resource}/reset-password`, data);
    };

    public changePassword = (
        data: DataChangePassword
    ): Promise<AxiosResponse<ResponseChangePassword>> => {
        return AxiosAPI(true).post(`${this.resource}/change-password`, data);
    };

    public getProfile = (): Promise<AxiosResponse<UserInterface>> => {
        return AxiosAPI(true).get(`${this.resource}/profile`);
    };

    public getUsers = (): Promise<AxiosResponse<UserInterface[]>> => {
        return AxiosAPI(false).get(`${this.resource}/list`);
    };

    public getUser = (
        id: String,
        option: string
    ): Promise<AxiosResponse<UserInterface>> => {
        return AxiosAPI(false).get(
            `${this.resource}/user/${id}?option=${option}`
        );
    };
}
export default new userAPI();
