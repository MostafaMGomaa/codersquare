# ERD: codersquare

This document explores the design of codersquare, a social experience for
sharing useful programming resources.

We'll use a basic client/server architecture, where a single server is deployed
on a cloud provider next to a relational database, and serving HTTP traffic from
a public endpoint.

## Storage

We'll use a relational database (schema follows) to fast retrieval of posts and
comments. I'll be using PostgreSQL to ensure adequate power and flexibility for my project. Data will be stored on the server on a separate, backed
up volume for resilience. There will be no replication or sharding of data at
this early stage.


### Schema:

We'll need at least the following entities to implement the service:

**Users**:
| Column | Type |
|--------|------|
| ID | STRING/UUID |
| First/Last name | STRING |
| Password | STRING |
| Email | STRING |
| Username | STRING |

**Posts**:
| Column | Type |
|--------|------|
| ID | STRING/UUID |
| Title | STRING |
| URL | STRING |
| UserId | STRING/UUID |
| PostedAt | Timestamp |

**Likes**:
| Column | Type |
|--------|------|
| UserId | STRING/UUID |
| PostId | STRING |

**Comments**:
| Column | Type |
|---------|------|
| ID | STRING |
| UserId | STRING/UUID |
| PostId | STRING |
| Comment | STRING |
| PostedAt | Timestamp |

## Server

A simple HTTP server is responsible for authentication, serving stored data, and
potentially ingesting and serving analytics data.

- Node.js is selected for implementing the server for speed of development.
- NestJs is the web server framework.
- TypeOrm to be used as an ORM.

### Auth

For v1, a simple JWT-based auth mechanism is to be used, with passwords
encrypted and stored in the database. OAuth is to be added initially or later
for Google + Facebook and maybe others (Github?).

### API

**Auth**:

```
/signIn  [POST]
/signUp  [POST]
/signOut [POST]
```

**Posts**:

```
/posts/  [GET]
/posts/  [POST]
/posts/:id  [GET]
/posts/:id  [DELETE]
```

**Likes**:

```
/likes/  [POST]
```

**Comments**:

```
/comments/     [POST]
/comments/     [GET]
/comments/:id  [DELETE]
```

## Clients

For now we'll start with a single web client, possibly adding mobile clients later.

The web client will be implemented in React.js.
See Figma/screenshots for details.
API server will serve a static bundle of the React app.
Uses ReactQuery to talk to the backend.
Uses PrimeReact for building the CSS components.

## Hosting

The code will be hosted on Github, PRs and issues welcome.

We'll deploy the server to a (likely shared) VPS for flexibility. The VM will have
HTTP/HTTPS ports open, and we'll start with a manual deployment, to be automated
later using Github actions or similar. The server will have closed CORS policy except
for the domain name and the web host server.
