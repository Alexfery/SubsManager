import express from 'express';
import { PORT } from './config/env.js';
import usersRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRounter from './routes/subscription.routes.js';
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./error.middleware.js";
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/subscriptions', subscriptionRounter);
app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Welcome to the Tracker, dar oare merge?');
})
app.listen(3000, async () => {

    console.log(`Server is running on port 3000, dar se putea si mai bine si ruleaza pe http://localhost:${PORT}`);
    await connectToDatabase();
});
export default app;
