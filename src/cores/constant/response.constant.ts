export interface ServerResponse {
  status?: Number;
  data: { data: any };
  statusText?: string;
  headers?: Object;
  config?: ResponseConfig;
  request: {};
}

export interface ResponseConfig {
  transitional?: {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
  };
  adapter?: string[];
  transformRequest?: any;
  transformResponse?: any;
  timeout?: Number;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  maxContentLength?: Number;
  maxBodyLength?: Number;
  env?: Object;
  headers?: ResponseHeaders;
  method?: string;
  url?: string;
}

export interface ResponseHeaders {
  Accept?: string;
  Authorization?: string;
}
