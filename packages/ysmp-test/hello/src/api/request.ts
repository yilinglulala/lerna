
import { getRequestId, getSessionId } from "@/utils/tools/request";
import { IRequestConfig } from "./interface";
import axios from 'axios'
import { set } from "lodash";

const SESSION_ID = getSessionId();

const http = axios.create({
  baseURL: process.env.VUE_APP_API_PREFIX,
  timeout: 1000 * 60 * 30,
  headers: {
    'Content-Type': 'application/json',
    'X-Y-Session-Id': SESSION_ID,
    'X-Y-Request-Id': getRequestId()
  }
});

// 请求拦截器
const beforeRequest = (config: any) => {
  const data = config?.data;
  if (data) {
    try {
      if (data.token) {
        set(config, 'headers.token', data.token)
      }
      // 验证提交参数是否包含非法字符、表情等
      // const checkResult = checkApiParams(data || {});
      // if (checkResult) return Promise.reject({ ret: -1, bizCode: $t('@i18n.the.submitted.data.contains.illegal.characters.tijiaoshuj'), error: checkResult });
    } catch (error) {
      console.error('[Axios] ', config, error);
    }
  }
  return config
}

http.interceptors.request.use(beforeRequest)