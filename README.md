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

The `docker-build.yml` workflow file is used to build Docker images using `buildctl`. This workflow is triggered on push events to the `main` or `seed` branches, as well as on the creation of tags starting with "v" and pull request events.

The workflow includes the following steps:

1. Set up QEMU for multi-platform builds.
2. Set up Docker Buildx.
3. Checkout the repository.
4. Build the Docker image using `buildctl`.
5. Export the cache for the Docker image build.
6. Import the cache for the Docker image build.
7. Log in to the GitHub Container Registry.
8. Push the Docker image to the registry.

The `buildctl` command is used to build the Docker image with the specified frontend, context, dockerfile, and output type. The cache is exported and imported using the `--export-cache` and `--import-cache` options with the `gha` type.

The `buildctl` command can also be used to build the Docker image with multiple tags and push it to the registry. The `docker tag` and `docker push` commands are used to tag and push the image with the appropriate version.

The `etc/buildkit/buildkitd.toml` file is used to configure the buildkitd daemon settings. This file includes global settings for debug, trace, root, and insecure-entitlements, as well as specific sections for logging, DNS, gRPC, OTEL, build history, worker configurations, registry settings, and frontend control.
