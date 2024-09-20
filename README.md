# Sommelier Circle (Wine App)

![Website Preview](/src/assets/sc-sc.png))

## Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to create a thriving online wine community. Users can create and manage blog posts, connect with other wine enthusiasts, explore a comprehensive wine encyclopedia, and discover new wines through a custom API. The app includes features for following friends, exploring wines and critics, and interacting with events. Please note: All content, including images and descriptions, is for demonstration purposes and not owned by the app creators. The data generated should not be considered over authenticated wine APIs.

### Key Features

Blog Posts

    •	Create, edit, read, and delete blog posts using a rich text editor (Quill).
    •	All blogs are sanitized for security and rendered cleanly.
    •	Upvoting and commenting features planned as stretch goals.

### Follow Friends

    •	Users can connect with others by following and unfollowing.
    •	Although there’s no dedicated feed for followers’ posts yet, the app supports the many-to-many relationships for followers and following.

### Wine Encyclopedia

    •	Explore a comprehensive list of wines, populated from a custom API.
    •	Each wine entry includes details about its type, origin, and characteristics.

### Efficient Wine Search

    •	A custom search feature powered by IndexedDB and Fuse.js for fast and intuitive searching.
    •	The app utilizes inverted indexing for efficient lookups by wine name. When no exact matches are found, the app falls back to fuzzy search, allowing for user error or partial matches.
    •	IndexedDB is also used to cache search results, improving performance and reducing the load on the server.

**In Context Provider**

    ``` javascript
///////////////////////////

// Form Data For Filtering Search
///////////////////////////
const [formData, setFormData] = useState(initialFormData);

const handleUpdateForm = (e) => {
const { name, value } = e.target;
setFormData({ ...formData, [name]: value });
};

///////////////////////////
// Fetch Filtered Wine Data | Whenever formData changes
///////////////////////////
useEffect(() => {
fetchFilteredWineData(formData);
}, [formData]);

///////////////////////////////
// Fetch Filtered Wine Data
///////////////////////////////

const fetchFilteredWineData = async (formData) => {
const { grape, region, style, price, rating, query } = formData;
const invertedIdx = await getItemIndexedDB("wines", "invertedIndex");
let wines = await getItemIndexedDB("wines", "all");
// filter wine data from indexedDB
if (invertedIdx && wines) {
try {
if (grape) {
wines = wines.filter((wine) => wine.grape === grape);
}
if (region) {
wines = wines.filter((wine) => wine.region === region);
}
if (style) {
wines = wines.filter(
(wine) => wine.category.toLocaleLowerCase() === style
);
}
if (price) {
if (price === "low") {
wines = wines.sort((a, b) => a.avgPrice - b.avgPrice);
} else {
wines = wines.sort((a, b) => b.avgPrice - a.avgPrice);
}
}
if (rating) {
if (rating === "100") {
wines = wines.filter((wine) => wine.criticScore === 100);
} else if (rating === "95+") {
wines = wines.filter((wine) => wine.criticScore > 94);
} else {
wines = wines.filter(
(wine) => wine.criticScore > 89 && wine.criticScore < 95
);
}
}
if (query) {
wines = searchInvertedIndex(query, wines, invertedIdx);
}
setWines(wines);
} catch (err) {
console.error(err);
}
} else {
// fitler wine data on backend
try {
const data = await postFilterWineResults(formData);
setWines(data);
} catch (err) {
console.log(`Error filtering and fetching wines: ${err}`);
} finally {
setIsLoading(false);
}
}
};

///////////////////////////
// Search Inverted Index
///////////////////////////

const searchInvertedIndex = (query, wines, invertedIdx) => {
// split query into small array of words
const obtainSearchWordsArray = query.toLocaleLowerCase().split(/\s+/);
// initalize a set for unique wine indices
const matchedWineIndices = new Set();
// iterate over query and add each word to the set
obtainSearchWordsArray.forEach((word) => {
if (invertedIdx[word]) {
invertedIdx[word].forEach((idx) => matchedWineIndices.add(idx));
}
});

    // inital matches | looking for inverted index exact  key name match
    const closelyMatchedWines = Array.from(matchedWineIndices).map(
      (idx) => wines[idx]
    );
    // if there is no inverted idx match then use the entire list
    const winesToSearch =
      closelyMatchedWines.length > 0 ? closelyMatchedWines : wines;
    // fuse options for fuzzy search
    const fuseOptions = {
      keys: ["name"],
      threshold: 0.3,
    };
    // initialize new fuse with wines to search adn options
    const fuse = new Fuse(winesToSearch, fuseOptions);
    const fuzzyResults = fuse.search(query);
    // match the wines with the logic of fuse
    const matchedWines = fuzzyResults.map((result) => result.item);
    return matchedWines;

};

    ```

### Events

    •	Users can post and explore events related to wine.
    •	Events include details such as location, ticketing information (mock payment gate for demo purposes), photos, and times.
    •	Integration with Google Places API enables users to explore nearby wine-related locations.

### User Profile

    •	Customizable user profiles: update profile pictures, add social media links, set unique usernames and display names, and write bios.
    •	Users can save their favorite wines, critics, events, and blogs, which are accessible through a categorized table on their profile page.
    •	Followers and following relationships are implemented, but there’s no dedicated follower feed or messaging system (potential future enhancements).

### Critics

    •	Discover critics through the “Critic Explore” feature.
    •	Each critic’s details and favorites are displayed for users to explore.

### Mobile Responsiveness

    •	Special attention was given to ensure the app is fully responsive and provides a smooth mobile experience.
    •	Custom-designed navigation menus for mobile devices, ensuring easy access to features.

## New Features & Enhancements

### Navigating Blogs

Users can now navigate between the next and previous blogs, with logic ensuring that the navigation pertains specifically to the category or subject currently being viewed. For example, blogs about red wines are cycled separately from blogs about white wines or community blogs, ensuring a relevant browsing experience based on the selected category.

### Google Places API Integration

    •	Users can explore nearby wine-related locations through the Google Places API.
    •	The app leverages the user’s location (lat/lng) stored in session storage to fetch up to 20 nearby locations. These results are cached in IndexedDB for faster access and reduced API calls.
    •	A refresh option is available to update the list of nearby locations.

### Profile Management

    •	Users can update their profile with a custom display name, username (must be unique), profile picture, and social media links.
    •	Favorite wines, critics, blogs, and events are saved and displayed on the user’s profile, with the ability to view detailed lists of each category.


### API Caching and Performance Optimization

    •	IndexedDB is heavily used throughout the application to cache data, including wines, locations, events, and blogs, reducing the need for repeated API calls and improving overall performance.

**Example of Setting Items in IndexedDB**

    ``` javascript

export async function setItemIndexedDB(key, value, type) {
try {
const db = await openIndexedDB();
const typeKey = `${key}-${type}`;

    const count = await db.count(STORE_NAME);
    if (count >= 1000) {
      await deleteOldestItem(db);
    }

await db.put(STORE_NAME, value, typeKey);
console.log(key, ' <-- key set item')
if (key === "wines") {
const invertedIdx = await buildInvertedIndex(value)
await db.put(STORE_NAME, invertedIdx, 'wines-invertedIndex');

}
} catch (err) {
console.error("Error setting item in indexedDB:", err);
}
}

````

**Example of fetching wines from indexedDB before trying backend api**

```javascript
///////////////////////////////
// Fetch Wines Data
///////////////////////////////

const fetchWines = async () => {
  setIsLoading(true);
  const cachedWines = await getItemIndexedDB("wines", "all");
  if (cachedWines) {
    setWines(cachedWines);
    setIsLoading(false);
    return;
  }
  try {
    const data = await getWines();
    setWines(data);
    await setItemIndexedDB("wines", data, "all");
  } catch (err) {
    console.log(`Error fetching wines: ${err}`);
  } finally {
    setIsLoading(false);
  }
};
````
## Development Challenges

### Quill Integration

    •	Blog posts are created using Quill, a rich text editor. While powerful, some limitations arose due to a lack of support for certain new functionalities in Quill v2.

### Routing

    •	Managed using React Router. All routes are organized within the routerConfig folder for easy maintainability.
    •	Context API is used for state management when state needed to be shared across multiple components.

### Google OAuth
   In development, Google OAuth was successfully implemented for my personal email. However, in production, additional troubleshooting is required to ensure consistent functionality, allowing all users to sign in seamlessly using Google OAuth with Passport.js.

## Technical Stack

### Frontend

    •	React: Dynamic user interface and state management.
    •	TailwindCSS: Responsive and modern styling.
    •	GSAP: For animations.
    •	Quill: Rich text editor for blog post creation.
    •	Fuse.js: Enables fuzzy searching for better search experience.
    •	IndexedDB: Used for caching wines, events, and location data for performance improvements.
    •	Axios: HTTP client for API requests.
    •	Iconscout: Icon library for UI elements.

### Backend

    •	Node.js & Express: Server-side application logic.
    •	MongoDB: Database for storing user data, blogs, events, and more.
    •	Multer: Handles file uploads.
    •	Date-fns: Date manipulation.
    •	Sanitize-html & DOMPurify: Ensure secure handling of HTML input.
    •	Diacritics: Used to remove diacritics from strings for better search indexing.
    •	Fuse.js: Fuzzy search algorithm for enhanced user queries.
    •	Nodemailer: Used for sending email notifications.
    •	Passport & Passport-Google-OAuth20: Provides Google OAuth login functionality.

Stretch Goals

    •	Upvoting and commenting on blog posts.
    •	Viewing a dedicated feed for following user activities.
    •	Implementing Google OAuth for all users

## Acknowledgements

    •	Special thanks to wine-searcher.com for the inspiration and content used for demonstration purposes.

There are many more things to observe and explore about the app, so please feel free to continue exploring the app and become part of an engaging and rewarding wine community. Cheers!
