# Task Management Application

This is a web-based task management application where users can create, update, and delete tasks. The application includes user authentication and authorization.

## Setup Instructions

1. Clone the repository:
2. Navigate to the project directory:
3. Install the required dependencies:
install
4. Start the development server:
5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Running Tests

To run tests, use the following command:
## Building for Production

To create a production build, use the following command:
This will create a `build` directory with the production-ready files.

## Deployment

To deploy the application, follow the instructions provided by your hosting provider. Ensure that you have set up the necessary environment variables for the application to function correctly.

## User Authentication and Authorization

The application includes user authentication and authorization to ensure that only authorized users can access and modify tasks. Follow these steps to set up user authentication and authorization:

1. Register a new user:
   - Navigate to the registration page.
   - Fill in the required information (username and password).
   - Submit the registration form.
2. Log in with an existing user:
   - Navigate to the login page.
   - Enter your username and password.
   - Submit the login form.
3. Log out:
   - Click the logout button to log out of the application.
4. User permissions:
   - Only authenticated users can create, update, and delete tasks.
   - Ensure that you are logged in to access and modify tasks.

## Interactive Rebase with `git rebase -i HEAD~<number_of_commits>`
The `git rebase -i HEAD~<number_of_commits>` command is used to interactively rebase the last `<number_of_commits>` commits.

## Configuring Git to Sign All Commits with a GPG Key
To configure Git to sign all commits with a GPG key by default, use the following command:

## Build Docker images using buildctl

This section describes the purpose and functionality of the `docker-build.yml` workflow.

The `docker-build.yml` workflow is a GitHub Actions workflow that builds Docker images using `buildctl`. It is triggered by pushes to the `main` or `seed` branches, as well as by the creation of tags starting with "v" and pull requests.

The workflow sets up the environment, builds the Docker image, and pushes it to a registry. It also includes steps to export and import cache for the Docker image build using `--export-cache type=gha` and `--import-cache type=gha`.

The following is an example of the `docker-build.yml` workflow:

```yaml
name: Build Docker Images

on:
  push:
    branches:
      - main
      - seed
    tags:
      - v*
  pull_request:

env:
  IMAGE_NAME: ghtoken_product_demo

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      packages: write
      contents: read

    steps:
      - name: Set up QEMU
        uses: docker/setup-qemu-action@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Build Docker image
        run: |
          buildctl build \
            --frontend dockerfile.v0 \
            --local context=. \
            --local dockerfile=. \
            --output type=image,name=docker.io/${{ github.repository_owner }}/$IMAGE_NAME,push=true

      - name: Export cache
        run: |
          buildctl build \
            --frontend dockerfile.v0 \
            --local context=. \
            --local dockerfile=. \
            --output type=image,name=docker.io/${{ github.repository_owner }}/$IMAGE_NAME,push=true \
            --export-cache type=gha

      - name: Import cache
        run: |
          buildctl build \
            --frontend dockerfile.v0 \
            --local context=. \
            --local dockerfile=. \
            --output type=image,name=docker.io/${{ github.repository_owner }}/$IMAGE_NAME,push=true \
            --import-cache type=gha

      - name: Log in to registry
        run: echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin

      - name: Push Docker image
        run: |
          IMAGE_ID=ghcr.io/${{ github.repository_owner }}/$IMAGE_NAME

          IMAGE_ID=$(echo $IMAGE_ID | tr '[A-Z]' '[a-z]')
          VERSION=$(echo "${{ github.ref }}" | sed -e 's,.*/\(.*\),\1,')
          [[ "${{ github.ref }}" == "refs/tags/"* ]] && VERSION=$(echo $VERSION | sed -e 's/^v//')
          [ "$VERSION" == "main" ] && VERSION=latest
          echo IMAGE_ID=$IMAGE_ID
          echo VERSION=$VERSION
          docker tag $IMAGE_NAME $IMAGE_ID:$VERSION
          docker push $IMAGE_ID:$VERSION
```
