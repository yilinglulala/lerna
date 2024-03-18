import { AxiosRequestConfig } from 'axios';
// import { MessageType } from 'element-plus';

export interface IRequestCustomConfig extends AxiosRequestConfig {
  hideLoading?: boolean;
  tipType?: any;
  // tipType?: MessageType;
  hideTip?: boolean;
  withDate?: boolean;
  urlSuffix?: string;
  loadingText?: string;
}

export type IRequestConfig = IRequestCustomConfig
