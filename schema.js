const { gql } = require('apollo-server');

typeDefs = gql`
	scalar DateTime

	type Query {
		info: String
	}

	type User {
		id: ID!
		username: String!
		password: String!
		name: String
		bio: String
		techStack: String
		avatarURL: String
		githubURL: String
		linkedinURL: String
		portfolioURL: String
		twitterURL: String
		projects: [Project!]!
		createdAt: DateTime!
	}

	type Project {
		id: ID!
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
`;

module.exports = typeDefs;
