# SDSA Membership Verification API

This is a simple microservice that will check if a given email exists in our member list per mailchimp

## Local development

### Requirements

- A recent-ish version of node (I've tested this in v7.1.0 and v9.5.0), npm, and yarn

### Setup

0. Checkout the repository:
  ```
  git checkout git@github.com:SeattleDSA/sdsa-member-verification.git
  ```

1. Install dependencies
  ```
  yarn install
  ```

2. Setup required configuration environment variables.  This can be done with a `.env` file in the project root
  ```
  MAILCHIMP_API_KEY
  MAILCHIMP_CONTACT_LIST_ID
  MAILCHIMP_MEMBER_SEGMENT_ID

  # This is the key clients will use to authenticate against this API
  API_KEY
  ```

3. Run the development server
  ```
  # Starts a server on port 3000, overridable with PORT=[port]
  npm start
  ```

## Usage

Currently, the endpoint supports a single call.  Authentication is acheived by providing an `Authorization` http header with a value of the valid API key

- `POST /?email=[email]`.  Responds with a `200` status code and `{ "isMember": [true|false ] }`, or a `400` or `500` status code and `{ "error": "an error message" }`

### Example curl

```
> curl -H "Authorization:api-key" -X POST localhost:3000/\?email='notarealmember@email.com'
{"isMember":false}%
```