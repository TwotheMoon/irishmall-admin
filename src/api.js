import axios from "axios"

// api 서버 url
export const apiServerBaseUrl = "https://port-0-irishmall-api-server-m3u68qma5d734195.sel4.cloudtype.app";
export const localServerBaseUrl = "http://localhost:4000";
export const getTokenApiEP = "/getToken";
export const getAllCateApiEP = "/getAllCate";
export const healthCkEP = "/health";
export const getPopularCateApiEP = "/getPopularCate";

// 네이버 base api url
export const openApiUrl = "https://openapi.naver.com";
export const commerceApiUrl = "https://api.commerce.naver.com";

// 네이버 api proxy nave
export const naverProxyNm = "/openApi";
export const commerceProxyNm = "/commerceApi";

// 네이버 openapi ID
export const naverApiId = '6Dy6rODwmUMPQjbUp8Wp';
export const naverApiSecret = 'UtnRYGy8ve';

// 네이버 쇼핑 api endpoint
export const naverApiShopUrl = "/v1/search/shop.json";

// 네이버 커머스 api endpoint
export const commerceToken = "/external/v1/oauth2/token";
export const commerceCate = "/external/v1/categories";

export const jsonAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-Naver-Client-Id': naverApiId,
    'X-Naver-Client-Secret': naverApiSecret,
  }  
});

