import { ConfigLoader } from './pkg/config';
import { DatabaseSequelize } from './pkg/sequelize';
import express from 'express';
import Init from './src/init';

async function initialize() {
  try {
    const configLoader = new ConfigLoader();
    const configEnv = configLoader.loadConfig();

    const db = new DatabaseSequelize(configEnv);
    await db.connect();

    const app = express();
    //Middleware definitions
    app.disable('x-powered-by');
    app.use(express.json()); //form data to json
    app.use(express.urlencoded({extended: true})); //support for multiform data

    //router definition
    app.use('/api/v1', Init(db.getSequelizeInstance(), express.Router())); // API endpoint

    //launch the server
    app.listen(configEnv.app.port, () => {
        console.log(`server running at port ${configEnv.app.port}`);
    });
    

  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

initialize();
 