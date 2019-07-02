import Actor from '../models/Actor';
import Movie from '../models/Movie';
import { MovieType } from './Movie';

const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = graphql;

export const ActorType = new GraphQLObjectType({
  name: 'Actor',
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    birth_date: { type: GraphQLString },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ actors: parent.id });
      },
    },
  }),
});

export const ActorQueries = {
  actor: {
    type: ActorType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Actor.findById(args.id);
    },
  },
  actors: {
    type: new GraphQLList(ActorType),
    resolve(parent, args) {
      return Actor.find({});
    },
  },

};

export const ActorMutations = {
  addActor: {
    type: ActorType,
    args: {
      first_name: { type: new GraphQLNonNull(GraphQLString) },
      last_name: { type: new GraphQLNonNull(GraphQLString) },
      birth_date: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      const newActor = new Actor({
        first_name: args.first_name,
        last_name: args.last_name,
        birth_date: args.birth_date,
      });

      return newActor.save();
    },
  },
};
