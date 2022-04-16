import ApiService from '../Util/ApiService';
import Urls from '../Util/Urls';
import ApiResponse from '../Mapping/ApiResponse';
import ProductResponse from '../Mapping/Response/productResponse';
import { get } from 'lodash';
import currentConfig from '../../../azp-website/src/Constant/env';


export const getListService = (params) => {
    return new ApiService({
        baseURL: process.env.REACT_APP_FURNITURE_DEV_HOST || "",
        endpoint: Urls.PRODUCT.getList,
        params: params,
        parser: parseData
    }).get();
}

export const getInitService = () => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.PRODUCT.init,
        parser: parseItem
    }).get();
}

export const getDetailService = (id) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.PRODUCT.getDetail,
        endpointParams: {id},
        parser: parseItem
    }).get();
}

export const createService = (data) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.PRODUCT.create,
    }).post(data);
}

export const updateService = (id, data) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpointParams: {id},
        endpoint: Urls.PRODUCT.update
    }).put(data);
}

const parseItem = (data) => {
    if(Object.keys(data.result).length > 0) {
        return {
            ...data,
            test: 1,
            result: new ProductResponse(data.result)
        }
    }
}

const parseData = (data) => {
    return data?.result?.length >= 0 ? {
        ...data,
        result: data.result.map((item) => new ProductResponse(item))
    } : new ApiResponse(data)
};