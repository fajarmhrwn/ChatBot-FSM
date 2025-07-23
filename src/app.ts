import express from 'express';
import chatRoutes from './routes/chat.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './utils/swagger_output.json';
// Create Express server
export const app = express();
app.use(express.json());

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use('/api/chat', chatRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
