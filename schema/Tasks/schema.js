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
    date: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Task: {
      type: TaskType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) }},
			resolve(parentValue, args) {
				return axios.get(`http://${process.env.HOST || "192.168.0.103"}:4000/Goals`,
				{
					params: {
						id: args.id
					}
				}).then(response => response.data);
		}},
		Tasks: {
			type: new GraphQLList(TaskType),
			resolve(parentValue, args) {
				return axios.get(`http://${process.env.HOST || "192.168.0.103"}:4000/Goals`).then(response => response.data);
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addTask: {
			type: TaskType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLString },
				date: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, args) {
        return axios.put(`http://${process.env.HOST || "192.168.0.103"}:4000/Goals`, args).then(response => response.data);
			}
		},
		removeTask: {
			type: TaskType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, args) {
				return axios.delete(`http://${process.env.HOST || "192.168.0.103"}:4000/Goals`, args).then(response => response.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
