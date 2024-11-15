import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import routes from './routes/routes';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.DB_URI as string)
.then(()=> console.log('Database Connected'))
.catch((error)=> console.error('Database Connection Error: ', error));

//
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(
    session({
        secret: 'my secret key',
        saveUninitialized: true,
        resave: false
    })
);

declare module 'express-session' {
    interface SessionData {
      message?: string;
    }
  }

app.use((req: Request, res: Response, next: NextFunction)=>{
    res.locals.message = req.session?.message;
    delete req.session?.message;
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', express.static(path.join(__dirname, 'views/assets')));
// app.get('/', (req:Request, res: Response)=>{
//     res.send('Hallo');
// });
app.use('/',routes)

app. listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`);
});

