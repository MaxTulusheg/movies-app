import Genre from '../models/Genre';

const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

export const GenreType = new GraphQLObjectType({
  name: 'Genre',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

export const GenreQueries = {
  genre: {
    type: GenreType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Genre.findById(args.id);
    },
  },
  genres: {
    type: new GraphQLList(GenreType),
    resolve() {
      return Genre.find({});
    },
  },

};

export const GenreMutations = {
  addGenre: {
    type: GenreType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      const genre = new Genre({
        name: args.name,
      });

      return genre.save();
    },
  },
};
