"use strict";
import mongoose from 'mongoose';
import glob from 'glob';
import path from 'path';

import config from '../config';

glob('models/*.js', (err, files) => {
  files.forEach(file => {
    if (file.indexOf('index') === -1) {
      require(path.join(__dirname, path.basename(file)));
    }
  });
});

mongoose.connect(config.MongoDBURL, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('MongoDB has been connected.');
  }
});

export default mongoose;
