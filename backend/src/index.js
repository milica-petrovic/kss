import * as http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import registerRoutes from './routes/index.js';
import sequelize from './db/index.js';
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));
app.use(bodyParser.json({limit: '25mb'}));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

registerRoutes(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {

    console.log(`App is listening on port ${port}`);
});
