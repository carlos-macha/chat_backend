import app from './app';
import userRoutes from "./routes/user.routes";
import authRouter from './routes/auth.routes';
import contactRouter from './routes/contact.routes';
import messageRouter from './routes/message.routes';

const PORT = process.env.PORT || 3000;
app.use(userRoutes);
app.use(authRouter);
app.use(contactRouter);
app.use(messageRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});