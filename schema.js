const { gql } = require('apollo-server');

typeDefs = gql`
	scalar DateTime

	type Query {
		info: String!
		user(id: ID!): User!
		me: User!
		checkToken: LoginStatus!
	}

	type Mutation {
		signup(username: String!, password: String!): AuthPayload!
		login(username: String!, password: String!): AuthPayload!
		updateUser(
			username: String
			password: String
			name: String
			email: String
			bio: String
			techStack: String
			avatarURL: String
			githubURL: String
			linkedinURL: String
			portfolioURL: String
			twitterURL: String
		): User!
		deleteUser: User!
	}

	type User {
		id: ID!
		username: String!
		password: String!
		name: String
		email: String
		bio: String
		techStack: String
		avatarURL: String
		githubURL: String
		linkedinURL: String
		portfolioURL: String
		twitterURL: String
		projects: [Project!]!
		followers: [User!]!
		following: [User!]!
		createdAt: DateTime!
	}

	type Project {
		id: ID!
		postedBy: User!
		name: String!
		private: Boolean!
		status: String
		wantFeedback: Boolean
		wantAssistance: Boolean
		deploymentURL: String
		frontEndRepoURL: String
		backEndRepoURL: String
		likes: [Like!]!
		comments: [Comment!]!
		createdAt: DateTime!
		lastUpdated: DateTime!
	}

	type Like {
		id: ID!
		project: Project!
		user: User!
	}

	type Comment {
		id: ID!
		user: User!
		text: String!
		project: Project!
		createdAt: DateTime!
	}

	type AuthPayload {
		token: String!
		user: User!
	}

	type LoginStatus {
		token: String
		valid: Boolean!
	}
`;

module.exports = typeDefs;
