import minimist from 'minimist';

/*
  Capture CLI args that might have been passed in
 */
var knowOptions = {
  string: 'env',
  boolean: 'debug',
  default: {
    env: process.env.NODE_ENV || 'development',
    debug: true
  }
};

export default minimist(process.argv.slice(2), knowOptions);