# Project_3_WaveWeb
This is our third and last project from Reboot Academy Full Stack Web Developer Bootcamp

## Summary:

Project Name: Wave Web

- Vision: Facilitate the connection between freelance developers and entrepreneurs, offering personalized digital solutions that meet the specific needs of each client.

- Purpose: Simplify the search for opportunities for developers and provide small businesses access to high-quality digital development services.

- Commitment: Wave Web is committed to delivering customized digital products within a maximum of one month, ensuring customer satisfaction and timely delivery of digital solutions.

## About "Wave Web":

"Wave Web" evokes a connection with the sea and nature, representing fluidity and constant evolution. The word "Wave" suggests dynamic energy and continuous movement, reflecting the changing nature of business and technology. The sea symbolizes vast possibilities and an adventurous spirit.

The choice of "Wave Web" also holds a more personal significance for us as developers. As Canarians connected to the sea and nature, the name reflects our deep roots to the land but also our desire to explore new opportunities, much like the waves that constantly change while maintaining an essential connection to their origin.

Furthermore, the duality of "Wave Web" can be interpreted as the convergence of two worlds: the digital world of the web and the natural world of the sea, blending technology with the beauty and strength of nature.

In summary, "Wave Web" encapsulates the idea of a dynamic project, in constant change and evolution, rooted in the connection with nature and the pursuit of new experiences.

## Our services:

- Basic Informative Website Development
- Dynamic Website Development
- E-commerce (Online Store) Development
- PLUS Prototype (1 week)

## User Profiles:

- Admin (GOD): Full management and supervision.
- Dev: Freelance developers selected through interviews and technical tests.
- Client: Entrepreneurs and small businesses seeking digital services.

## Some Mobile design...

![image](https://github.com/jmorma3/Project_3_WaveWeb/assets/122170615/a6b63ae7-c00a-4db4-8515-96bc14c733b2)

## Some Web design...

![image](https://github.com/jmorma3/Project_3_WaveWeb/assets/122170615/b6735d47-f70c-441d-ab8b-292ba51d85b0)

## Tables:

![image](https://github.com/jmorma3/Project_3_WaveWeb/assets/122170615/acf01a2b-4bfa-4a6a-9d27-e4cc66386a1b)

## Relationships between tables:

**One-to-One:**
- A Payment/Transaction has only one Invoice, and an Invoice is associated with only one Payment/Transaction.

**One-to-Many:**
- A User can have multiple Projects, but a Project can belong to only one User.
- A User can have multiple entries in the Agenda, but an Agenda entry can belong to only one User.
- A User can make or receive multiple Payments/Transactions, but a Payment/Transaction can belong to only one User.
- A Project can have multiple entries in the Agenda, but an Agenda entry can belong to only one Project.
- A Project can have multiple Payments/Transactions, but a Payment/Transaction can belong to only one Project.

**Many-to-Many:**
- A User (Developer) can work on multiple Projects, and a Project can have multiple Developers.

## Endpoints:

### User Signup/Login

#### Client Signup/Login

| METHOD | ENDPOINT          | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                               | RETURNS               |
|--------|-------------------|-------|------|--------------------------|-------------------------------------------|------------------------|
| POST   | /auth/client/signup | -     | user | Client Signup           | first_name, last_name, email, password, profile_type | { token: token }       |
| POST   | /auth/client/login  | -     | user | Client Login            | email, password                           | { token: token }       |

#### Developer Login

| METHOD | ENDPOINT             | TOKEN | ROLE      | DESCRIPTION              | POST PARAMS                       | RETURNS               |
|--------|----------------------|-------|-----------|--------------------------|-----------------------------------|------------------------|
| POST   | /auth/developer/login| -     | developer | Developer Login          | email, password                   | { token: token }       |

### User Endpoints

| METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS               |
|--------|------------------|-------|------|--------------------------|-------------------------------------------------|------------------------|
| GET    | /user/profile    | YES   | -    | Get own profile          | -                                               | {user}                |
| GET    | /user            | YES   | admin| Get all users            | Query params                                    | [{user}]              |
| GET    | /user/:userId    | YES   | admin| Get one user             | -                                               | {user}                |
| POST   | /user            | YES   | admin| Create one user          | first_name, last_name, email, password, profile_type | {user}        |
| PUT    | /user/profile    | YES   | -    | Update user profile (client and developer only update own profile)         | first_name, last_name, email, password, profile_type | {message: "Profile updated!"} |
| PUT    | /user/password   | YES   | -    | Reset user password (client and developer only reset own password)         | newPassword, repeatPassword | {message: "Password updated!"} |
| PUT    | /user/:userId    | YES   | admin| Update one user          | first_name, last_name, email, password, profile_type | {message: "User updated!"} |
| DELETE | /user/profile    | YES   | -    | Delete user profile (client and developer only delete own profile)         | -                                               | {message: "Profile deleted!"} |
| DELETE | /user/:userId    | YES   | admin| Delete one user          | -                                               | {message: "User deleted!"} |

### Project Endpoints

| METHOD | ENDPOINT           | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS               |
|--------|--------------------|-------|------|--------------------------|-------------------------------------------------|------------------------|
| GET    | /project           | YES   | -    | Get all projects         | Query params                                    | [{project}]            |
| GET    | /project/:projectId| YES   | -    | Get one project          | -                                               | {project}              |
| POST   | /project           | YES   | admin, client | Create one project | userID, project_name, project_type, price, progress_status, developerID, plusProtoype | {project} |
| PUT    | /project/:projectId| YES   | admin, developer | Update one project      | userID, project_name, project_type, price, progress_status, developerID, plusProtoype | {message: "Project updated!"} |
| DELETE | /project/:projectId| YES   | admin | Delete one project      | -                                               | {message: "Project deleted!"} |

### Agenda Endpoints

| METHOD | ENDPOINT           | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS               |
|--------|--------------------|-------|------|--------------------------|-------------------------------------------------|------------------------|
| GET    | /agenda            | YES   | -    | Get all agenda entries   | Query params                                    | [{agenda}]             |
| GET    | /agenda/:agendaId  | YES   | -    | Get one agenda entry     | -                                               | {agenda}               |
| POST   | /agenda            | YES   | admin, developer | Create one agenda entry | meeting_date_time, developerID, clientID, projectID | {agenda}     |
| PUT    | /agenda/:agendaId  | YES   | admin, developer | Update one agenda entry | meeting_date_time, developerID, clientID, projectID | {message: "Agenda entry updated!"} |
| DELETE | /agenda/:agendaId  | YES   | admin, developer | Delete one agenda entry | -                                               | {message: "Agenda entry deleted!"} |

### Transaction Endpoints

| METHOD | ENDPOINT             | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS               |
|--------|----------------------|-------|------|--------------------------|-------------------------------------------------|------------------------|
| GET    | /transaction         | YES   | -    | Get all transactions     | Query params                                    | [{transaction}]        |
| GET    | /transaction/:transID| YES   | -    | Get one transaction      | -                                               | {transaction}          |
| POST   | /transaction         | YES   | admin | Create one transaction | projectID, clientID, developerID, payment_date_time, amount, payment_method, payment_details | {transaction} |
| PUT    | /transaction/:transID| YES   | admin | Update one transaction   | projectID, clientID, developerID, payment_date_time, amount, payment_method, payment_details | {message: "Transaction updated!"} |
| DELETE | /transaction/:transID| YES   | admin | Delete one transaction   | -                                               | {message: "Transaction deleted!"} |

### Invoice Endpoints

| METHOD | ENDPOINT           | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS               |
|--------|--------------------|-------|------|--------------------------|-------------------------------------------------|------------------------|
| GET    | /invoice           | YES   | -    | Get all invoices         | Query params                                    | [{invoice}]            |
| GET    | /invoice/:invoiceID| YES   | -    | Get one invoice          | -                                               | {invoice}              |
| POST   | /invoice           | YES   | admin | Create one invoice   | transactionID, projectID, clientID, developerID, invoice_date, amount, paymentStatus | {invoice} |
| PUT    | /invoice/:invoiceID| YES   | admin | Update one invoice       | transactionID, projectID, clientID, developerID, invoice_date, amount, paymentStatus | {message: "Invoice updated!"} |
| DELETE | /invoice/:invoiceID| YES   | admin | Delete one invoice       | -                                               | {message: "Invoice deleted!"} |
