import app from './app';
import userRoutes from "./routes/user.routes";
import authRouter from './routes/auth.routes';

const PORT = process.env.PORT || 3000;
app.use('/users', userRoutes);
app.use(authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});