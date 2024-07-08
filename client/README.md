# Ottonova Coding Challenge

This web app displays information about different cities from around the world that are fetched from the corresponding server. It offers the user multiple ways to display the data:

1. **Carousel View:**
    - Displays cities in a carousel with flip cards:
      - **Front Side:** City name, native name (if different)
      - **Back Side:** Tabular information about the city

2. **Map View:**
    - Utilizes Mapbox GL to show a world map with a marker for each city. Clicking on a marker opens a popup detailing city name, latitude, and longitude.

3. **Table View:**
    - Uses AG Grid to display a sortable and filterable table, giving an overview of the information of all cities.

4. **Data Export:**
    - Allows users to download the city data as a JSON file.

4. **Quiz:**
    - The user can try to find the cities on a map

## Installation
**Prerequisites:**
- Node.js

**Install Dependencies:**
   ```bash
   npm install
   ```
   
## Usage

**Development Mode:**
```bash
npm run dev
```
**Production Build:**
```bash
npm run build
```
*Please note: Production build cannot be opened by just opening built html.*
*Instead, run*
```bash
npx vite preview
```
*Explanation <a href="https://vitejs.dev/guide/troubleshooting#build">in Vite FAQs</a>*


**Environment Variables:**

- Create a .env file in the root directory with the following variables:
    `VITE_SERVER_URL`: URL for the server
    
    `VITE_MAPBOX_ACCESS_TOKEN`: Mapbox access token

## Folder Structure

- **`public/`**: contains used icons
- **`src/`**: main source folder
   - **`components/`**: components used in the app
      - **`Buttons/`**: button components
      - `ExampleComponent.jsx`: Example component
      - `ExampleComponent.scss`: Sass file for component styles
   - `base.scss`: global styles

## Styling
This project uses Sass for styling.
Each component has an associated .scss file for styling. Styles are located in the same directory as their respective components.

## Dependencies

- **React**: JavaScript UI library
- **Vite**: build tool for web projects
- **Mapbox**: for visualizing data on a map
- **AG Grid** for visualizing data in a table
- **Axios**: Promise-based HTTP client for HTTP requests
- **Sass**: CSS preprocessor
- **FontAwesome** for icons
