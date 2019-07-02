import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from './schemas';


const app = express();

app.use(cors());

const dbUser = '';
const dbPassword = '';

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0-noh16.mongodb.net/test?retryWrites=true&w=majority`);
mongoose.connection.once('open', () => {
  console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(3001, () => {
  console.log('now listening for requests on port 4000');
});
