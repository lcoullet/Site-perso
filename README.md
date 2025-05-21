# Ludovic Coullet's Personal Website

This is my personal website, built with Astro and Tailwind CSS.

## Running Locally

To run this project locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

3.  **Build the project:**
    ```bash
    npm run build
    ```

4.  **Preview the build:**
    ```bash
    npm run preview
    ```

## Project Structure

Here's a brief overview of the main directories in this project:

-   `src/`: Contains the source code of the website. This includes:
    -   Astro components (`.astro` files)
    -   Layouts for pages
    -   Markdown content for pages
    -   Static assets like images and fonts that are processed by Astro
-   `public/`: Contains static assets that are copied to the build output directory as-is. This is suitable for files like:
    -   `favicon.ico`
    -   `robots.txt`
    -   `CNAME` (for custom domains on GitHub Pages)
-   `dist/`: The directory where the built site is generated after running `npm run build`. This directory is usually not tracked by Git (and should be added to `.gitignore` if it isn't already).

## Deployment

This website is configured for deployment on GitHub Pages. The deployment is automated using GitHub Actions.

For details on the deployment workflow, please refer to the `.github/workflows/deploy.yml` file.

## Contributing

While this is a personal website and contributions are not actively solicited, any suggestions or bug reports are welcome. Please feel free to open an issue on GitHub if you have any feedback.

## License

This project is open source. It is recommended to add a `LICENSE` file to the project (e.g., an MIT License).

Once a `LICENSE` file is added (e.g., using the MIT License), you would find its details in the [MIT License](LICENSE) file.
