import {
  RequesterMethodEnum,
  RequesterServiceModel,
} from '../@types';

interface Services {
  getPopular: RequesterServiceModel;
  getDetails: RequesterServiceModel;
}

const services: Services = {
  getPopular: {
    method: RequesterMethodEnum.GET,
    endpoint: 'popular?',
  },
  getDetails: {
    method: RequesterMethodEnum.GET,
    endpoint: '{{movie_id}}?',
  },
};

export default services;
