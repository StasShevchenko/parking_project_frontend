import {AxiosInstance} from "axios";

export abstract class Api {
    protected axios: AxiosInstance

    constructor(axios: AxiosInstance) {
        this.axios = axios
    }
}
