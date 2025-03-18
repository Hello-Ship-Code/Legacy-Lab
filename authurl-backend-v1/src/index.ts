// Express Server Setup
import cookieParser from 'cookie-parser';
import express from "express";
import path from "path";

import { env } from './config/env.config';

import { appRouter } from './routes';

const app = express();
const viewsPath = path.join(__dirname, "..", "src", "views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Server-Side Rendering Setup
app.set("view engine", "ejs");
app.set("views", viewsPath);

// Routes
appRouter(app)

// Start Server
app.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}`));
