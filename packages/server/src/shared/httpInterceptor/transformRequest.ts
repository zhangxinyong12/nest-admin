import { AppLogger } from '../logger/logger.service';

const transformRequest = (logger: AppLogger, data, headers) => {
  console.log('请求拦截', data, headers);
  return data;
};
export default transformRequest;
