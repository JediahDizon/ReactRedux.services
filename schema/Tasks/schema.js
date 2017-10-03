const axios = require("axios");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLBoolean, GraphQLString, GraphQLSchema } = require("graphql");
const { firebase, database } = require("../../lib/services/firebase.js");


const TaskType = new GraphQLObjectType({
  name: "Task",
	fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    timestamp: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Task: {
      type: TaskType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) }},
      resolve(parentValue, args) {
				return database.child(args) || {};
		}},
    Tasks: {
			type: new GraphQLList(TaskType),
			resolve(parentValue, args) {
				return database.once("value").then(dataSnapshot =>
					Object.keys(dataSnapshot.val()).map(taskId =>
						Object.assign({}, dataSnapshot.val()[taskId], { id: taskId })
				)).catch(error => {
					// LIKELY ERROR: Data not found.
					return null;
				});
  }}}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addTask: {
			type: TaskType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLString },
				timestamp: { type: new GraphQLNonNull(GraphQLString) }
			},
      resolve(parentValue, args) {
				return database.push(args).then(() => Object.assign({}, args));
			}
		},
		removeTask: {
			type: TaskType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
      resolve(parentValue, args) {
				return database.child(args.id).remove().then(() => Object.assign({}));
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
