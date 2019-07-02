import { ActorQueries, ActorMutations } from './Actor';
import { MovieQueries, MovieMutations } from './Movie';
import { GenreQueries, GenreMutations } from './Genre';

const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    ...ActorQueries,
    ...MovieQueries,
    ...GenreQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...ActorMutations,
    ...MovieMutations,
    ...GenreMutations,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
