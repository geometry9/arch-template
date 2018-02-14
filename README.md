# Tesla Exercise

For this exercise I've separated first exercise 1 and 2 into the `./frontend/public` folder,
and the rest of this repo is exercise 3

### Prerequisites

For running this application from a docker compose file you need docker for your OS
depending on your set up. You can find more information [here](https://docs.docker.com/compose/install/)


## Getting Started

To run exercise 3 you can run `. ./bin/cycle-local.sh`.

This will destroy the existing containers if they exist and recreate them.

These will be a postgres database, node/express backend and a node front end built with the `create-react-app` github repo from Facebook.

## Julian Saenz

* **Julian S** - *Initial work* - [geometry9](https://github.com/geometry9)

## Wishlist

- Have better test coverage
- Create schemas for API to test against when running any CRUD request.
- Dashboard for CRUD operations
- package.json scripts for testing/linting
- Not use random() in postgres! suboptimal
- Use a more relational approach, jsonb column is definitely not optimum column for data that will be updated by attribute.
