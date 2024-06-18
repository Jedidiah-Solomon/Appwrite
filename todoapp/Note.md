## Methods on the client object

```
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6671a47a002a00f6ebd8")
  .setEndpointRealtime()
  .setJWT()
  .setLocale()
  .setSession()
```

````
1. setEndpoint("https://cloud.appwrite.io/v1") --(Purpose: Sets the endpoint for the Appwrite server.
    Usage: This is the base URL for the Appwrite API, and all requests made by the client will be directed to this endpoint.)

2.  setProject("6671a47a002a00f6ebd8") -- (Purpose: Sets the project ID for the Appwrite project.
    Usage: This is necessary to specify which project the client is working with.)
3.  setEndpointRealtime() -- (Purpose: Sets the endpoint for the Appwrite real-time server.
    Usage: This is used to configure the endpoint for real-time communication, such as real-time database updates, subscriptions, etc.

    ```client.setEndpointRealtime("wss://realtime.cloud.appwrite.io");```

    Explanation: This method sets the WebSocket endpoint for real-time functionality. The provided URL would be the WebSocket server endpoint for Appwrite's real-time features.)

4.  setJWT() -- (setJWT():

    Purpose: Sets the JSON Web Token (JWT) for authentication.
    Usage: JWT is used for authenticating requests securely.

    ```client.setJWT("your_jwt_token");```

    Explanation: This method configures the client to use the provided JWT for authenticating API requests. The JWT should be a token generated and signed by Appwrite.)

5.  setLocale() -- (setLocale():

    Purpose: Sets the locale for the client.
    Usage: This can be used to specify the language or region for the client, affecting how data is formatted or returned.

    ```client.setLocale("en-US");```

    Explanation: This method configures the client to use the specified locale, which can affect responses from the server that are locale-dependent (such as date formats, language translations, etc.).)

6.  setSession() -- (setSession():

    Purpose: Sets the session for the client.
    Usage: This can be used to specify a session for the client, allowing for session-based authentication.

    ```client.setSession("your_session_id");```

    Explanation: This method configures the client to use the provided session ID for authentication. This can be useful for managing user sessions in a stateful way.)
````

### Databases

The database uses mariadb, it uses Databse -> Collections -> Data unlike MySQL that uses Database -> Table -> Data.

##### Each Collection have:

1. Document -- like a field or row
2. Attributes -- Like columns
3. You can add permissions like -- Any, All guests, All users, Select users, Select teams, label, Custom permission.

```
Collection Level Permissions
These permissions apply to the entire collection:

Any: Any user can access.
All Guests: Any guest user (unauthenticated) can access.
All Users: Any authenticated user can access.
Select Users: Specific users can access.
Select Teams: Specific teams can access.
Custom Permission: Custom-defined permissions
```

For instance, I can say "All guests" can do CRUD -- CREATE READ UPDATE DELETE

Permissions define who can access documents in a collection. By default no permissions are granted to any users, so no user can access any documents. Permissions exist at two levels, collection level and document level permissions.

In Appwrite, permissions are granted, meaning a user has no access by default and receive access when granted. A user with access granted at either collection level or document level will be able to access a document. Users don't need access at both levels to access documents.

Configure collection level permissions by navigating to Your collection > Settings > Permissions.

Document level permissions grant access to individual documents. If a user has read, create, update, or delete permissions at the document level, the user can access the individual document.

Document level permissions are only applied if Document Security is enabled in the settings of your collection. Enable document level permissions by navigating to Your collection > Settings > Document security.
When document security is enabled, users will be able to access documents for which they have been granted either document or collection permissions.

If document security is disabled, users can access documents only if they have collection permissions. Document permissions will be ignored.

### ExampleS

#### In MySQL:

Database -> Tables -> Rows
`school -> students -> John Doe`

#### In Appwrite:

Database -> Collections -> Documents
`school -> students -> John Doe`

## Conclusion

#### CRUD

1. Create - AddTask()
2. Read - getTask()
3. Update - //UPDATE TASK EVENT HANDLER
4. Delete - //DELETE TASK EVENT HANDLER

### Using

```
db.createDocument();
db.listDocuments();
db.updateDocument();
db.deleteDocument();
```

Note: we also have `db.getDocument();`

##### Examples

1. `db.createDocument(collectionId, documentId, data, permissions);`
2. `db.listDocuments(collectionId, filters, limit, offset);`
3. `db.updateDocument(collectionId, documentId, data, permissions);`
4. `db.deleteDocument(collectionId, documentId);`
5. `db.getDocument(collectionId, documentId);`

```
List documents
Retrieves a list of documents from a collection. This is useful when you need to get multiple documents at once, often with optional filters, limit, and offset.
Returns an array of documents.
```

```
Get a specific document
Retrieves a single document by its unique ID. This is useful when you need to get the details of a specific document.
Returns a single document object.

```

```

```
