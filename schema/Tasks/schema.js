const axios = require("axios");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString, GraphQLSchema } = require("graphql");


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
			args: { id: { type: GraphQLID }},
			resolve(parentValue, args) {
				return axios.get(`http://www.json-generator.com/api/json/get/cpEsqSStvm?indent=2`)
					.then(response => response.data)
					.then(response => response[_.findIndex(response, {id: args.id})]);
		}},
		Tasks: {
			type: new GraphQLList(TaskType),
			resolve(parentValue, args) {
				return axios.get(`http://www.json-generator.com/api/json/get/cpEsqSStvm?indent=2`)
					.then(response => response.data)
		}}
}});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addTask: {
			type: TaskType,
			args: {
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				timestamp: { type: GraphQLString }
			},
			resolve() {
				// POST
			}
		},
		deleteTask: {
			type: TaskType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve() {
				// POST
	}}}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
