import app from './app';
import authRouter from './routes/auth.routes';
import contactRouter from './routes/contact.routes';
import messageRouter from './routes/message.routes';
import http from 'http';

const server = http.createServer(app);


const PORT = process.env.PORT || 3000;
app.use(authRouter);
app.use(contactRouter);
app.use(messageRouter);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});