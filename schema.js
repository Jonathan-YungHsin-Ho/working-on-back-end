const { gql } = require('apollo-server');

typeDefs = gql`
	scalar DateTime

	type Query {
		info: String!
		user(id: ID!): User!
		me: User!
		checkToken: LoginStatus!
		allProjects: [Project!]!
		allUsers: [User!]!
	}

	type Mutation {
		signup(email: String!, username: String!, password: String!): AuthPayload!
		login(email: String!, password: String!): AuthPayload!
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
		createProject(
			name: String!
			private: Boolean!
			description: String
			status: String
			wantFeedback: Boolean
			wantAssistance: Boolean
			completed: Boolean
			designURL: String
			deploymentURL: String
			frontEndRepoURL: String
			backEndRepoURL: String
		): Project!
		updateProject(
			id: String!
			name: String
			private: Boolean
			description: String
			status: String
			wantFeedback: Boolean
			wantAssistance: Boolean
			completed: Boolean
			archived: Boolean
			designURL: String
			deploymentURL: String
			frontEndRepoURL: String
			backEndRepoURL: String
		): Project!
		deleteProject(id: String!): Project!
		createLike(projectID: String!): Project!
		deleteLike(id: String!): Project!
		createComment(projectID: String!, text: String!): Comment!
		deleteComment(id: String!): Comment!
	}

	type User {
		id: ID!
		username: String!
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
		starredProjects: [Project!]!
		followers: [User!]!
		following: [User!]!
		createdAt: DateTime!
	}

	type Project {
		id: ID!
		postedBy: User!
		starredBy: [User!]!
		name: String!
		private: Boolean!
		description: String
		status: String
		updates: [Update!]!
		wantFeedback: Boolean
		wantAssistance: Boolean
		completed: Boolean
		archived: Boolean
		deploymentURL: String
		designURL: String
		frontEndRepoURL: String
		backEndRepoURL: String
		likes: [Like!]!
		comments: [Comment!]!
		tags: [Tag!]!
		createdAt: DateTime!
		lastUpdated: DateTime!
	}

	type Update {
		id: ID!
		text: String!
		project: Project!
		createdAt: DateTime!
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

	type Tag {
		id: ID!
		name: String!
		projects: [Project!]!
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
