import express from 'express';
import cors from 'cors';
import dataRoutes from './routes/data.routes.js';

/** Initialize Express app */
const app = express();
/** Middleware to parse JSON requests */
app.use(express.json());
/** Middleware to enable Cross-Origin Resource Sharing (CORS) */
app.use(cors());

/**
 * Route handling for '/data'
 * @module routes/data
 */
app.use('/data', dataRoutes);

const PORT = 5000;

let server;

/** Start the server and listen on specified port */
server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/** getter for testing */
export function getServer() {
  return server;
}

/** export stopServer to close server properly after test */
export async function stopServer() {
  await server.close();
}
