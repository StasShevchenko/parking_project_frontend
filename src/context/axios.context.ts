import {AxiosInstance} from "axios";
import {createContext} from "react";

export const AxiosContext = createContext<AxiosInstance | null>(null)