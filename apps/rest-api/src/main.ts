import userRouter from './routers/v1/userRouter';
import chatRouter from "./routers/v1/chatRouter";
import utilRouter from "./routers/v1/utilRouter";
import { db_initializer } from './utilities';
import * as express from 'express';
import * as cors from "cors";

/**
 * Main function to start the server.
 */
async function main() {
  // initialize the database and sync models
  console.log('Initializing the database... ↻');
  await db_initializer();
  console.log('Database initialized ✓');

  // get the server port from variable
  const port = process.env.PORT || 8000;

  // create a new express application
  const app = express();

  // middleware to handle CORS
  app.use(cors({ exposedHeaders: ['auth-token', 'chat-token', 'Link'] }));

  // middleware to handle json body
  app.use(express.json({limit: '50mb'}));

  // For https
  app.enable('trust proxy');

  // add the user router
  app.use('/api/v1/users', userRouter);

  // add the chat router
  app.use('/api/v1/users/:user_id/chats', chatRouter);

  // add util Router
  app.use('/api/v1/util', utilRouter);

  // add welcome handler
  app.get('/', (req, res) => {
    res.send('Hey, welcome to the API!');
  });

  // start the express application
  app.listen(port, () => {
    console.log(`Server started!, Click Below Link`);
    console.log(`http://localhost:${port}`);
  });
}

// start the server
if (require.main === module) {
  main().then(() => {
    console.log('Start using the API!');
  });
}
