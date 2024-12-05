import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.harsh.rnone",
  projectId: "67500c74002f4578dd22",
  storageId: "675010e5002efeb5a437",
  databaseId: "67500f1f0030ad6bb91f",
  userCollectionId: "67500f2f000dbdd184c9",
  videoCollectionId: "67500f45001b128c659b",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) {
      console.log("Error while creating new account for user.");
      throw Error;
    }
    const avatarUrl = avatars.getInitials(username);

    await SignIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log("Error while creating new user.");
    throw new Error(error);
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("This is my session", session);
    return session;
  } catch (error) {
    console.log("Error while signing in user.");
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
