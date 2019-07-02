import Actor from '../models/Actor';
import Genre from '../models/Genre';
import Movie from '../models/Movie';
import { ActorType } from './Actor';
import { GenreType } from './Genre';

const graphql = require('graphql');


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

export const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    poster: { type: GraphQLString },
    genres: {
      type: new GraphQLList(GenreType),
      resolve(parent) {
        return Genre.find({ _id: { $in: parent.genres } });
      },
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent) {
        return Actor.find({ _id: { $in: parent.actors } });
      },
    },
    rating: { type: new GraphQLList(GraphQLInt) },
    runtime: { type: GraphQLInt },
    release: { type: GraphQLString },
    age_restriction: { type: GraphQLInt },
    trailer: { type: GraphQLString },
    comments: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'Comment',
        fields: () => ({
          // author: {
          //   type: new GraphQLList(UserType),
          //   resolve(parent, args) {
          //     return User.find({ ??? });
          //   },
          // },
          date: { type: GraphQLString },
          message: { type: GraphQLString },
        }),
      })),
    },
  }),
});

export const MovieQueries = {
  movie: {
    type: MovieType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Movie.findById(args.id);
    },
  },
  movies: {
    type: new GraphQLList(MovieType),
    resolve() {
      return Movie.find({});
    },
  },
};

export const MovieMutations = {
  addMovie: {
    type: MovieType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      poster: { type: GraphQLString },
      genres: { type: new GraphQLList(GraphQLID) },
      actors: { type: new GraphQLList(GraphQLID) },
      runtime: { type: new GraphQLNonNull(GraphQLInt) },
      release: { type: new GraphQLNonNull(GraphQLString) },
      age_restriction: { type: new GraphQLNonNull(GraphQLInt) },
      trailer: { type: GraphQLString },
    },
    resolve(parent, args) {
      const movie = new Movie({
        title: args.title,
        description: args.description,
        poster: args.poster || '',
        genres: args.genres || [],
        actors: args.actors || [],
        rating: [],
        runtime: args.runtime || 0,
        release: args.release,
        age_restriction: args.age_restriction,
        trailer: args.trailer || '',
        comments: [],
      });

      return movie.save();
    },
  },
};
