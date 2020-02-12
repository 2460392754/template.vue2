import development from './development';
import production from './production';
import common from './common';

const NODE_ENV = process.env.NODE_ENV;
const config = NODE_ENV === 'development' ? development : production;

export default {
    ...common,
    ...config
};
