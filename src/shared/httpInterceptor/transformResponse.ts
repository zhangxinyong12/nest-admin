import { AppLogger } from '../logger/logger.service';

const transformResponse = (logger: AppLogger, data) => {
  const resData = JSON.parse(data);
  console.log('axios 响应拦截', resData);
  logger.error(null, 'axios 响应拦截', resData);
  return resData;
};
export default transformResponse;
