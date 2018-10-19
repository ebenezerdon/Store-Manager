import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/index';

const app = express();

app.set('port', process.env.PORT || 5000);

// use body parser to parse request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', router);

app.get('*', (req, res) => {
  res.json({ message: 'Hey there! Storemanager API' });
});

app.listen(app.get('port'), () => {
  console.log(`Server started Listening at localhost:${app.get('port')}`);
});

export default app;