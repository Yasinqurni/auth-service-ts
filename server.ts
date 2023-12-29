import { ConfigLoader } from './pkg/config';
import { DatabaseSequelize } from './pkg/sequelize';

async function initialize() {
  try {
    const configLoader = new ConfigLoader();
    const configEnv = configLoader.loadConfig();
    console.log(configEnv)

    const db = new DatabaseSequelize(configEnv);
    await db.connect();

  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

initialize();
 