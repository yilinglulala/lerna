import { v4 as uuid } from 'uuid';
import moment from 'moment';

export const getRequestId = () => {
  return uuid()
    .split('-')
    .join('');
};

const clientId = getRequestId()

export const getSessionId = () => {
  return `${clientId}_${moment().format('MMddHHmmss')}`;
};



