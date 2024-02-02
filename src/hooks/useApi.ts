import {AxiosInstance} from "axios";
import {useContext} from "react";
import {AxiosContext} from "../context/axios.context.ts";

export const useApi = <ApiType>(type: {new (axios: AxiosInstance): ApiType}): ApiType => {
    const axios = useContext(AxiosContext)!
    return new type(axios)
}

