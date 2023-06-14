# Wall O' Clock

Wall O' Clock is a web application built with Next.js, NextAuth.js and MongoDB.
It provides a platform for users to share and explore their favorite images with others. The application allows users to upload images, categorize them, and add descriptions.


<div align="center">
  <img src="https://github.com/KunaAl22/wall-o-clock/blob/master/public/images/s1.png" alt="Logo" width="1000"  />
</div>



## Features

- **User Authentication:** Wall O' Clock uses NextAuth.js for secure user authentication. Users can create an account, log in, and log out to access and manage their uploaded images.
- **Image Upload:** Users can upload their favorite images to the platform. The images are securely stored on the server and associated with the user's account.
- **Categorization:** Users can categorize their uploaded images based on various categories such as nature, dark, 4K, cartoon, abstract, desktop, anime, and more. This categorization helps users easily discover images of their interest.
- **Descriptions:** Users can provide descriptions for their uploaded images, allowing them to share additional details or stories behind the images.
- **Interactive Interface:** Wall O' clock offers a user-friendly interface that allows users to navigate through the images, search for specific categories, and interact with other users through likes and comments.
- **Data Persistence:** MongoDB is used as the database to store user account information, uploaded images, and associated metadata. This ensures data durability and allows for efficient retrieval and management of user data.



## Installation

To run the Wall O' Clock application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/KunaAl22/wall-o-clock`
2. Install dependencies: `cd wall-o-clock` and `npm install`
3. Set up environment variables: Create a `.env` file and provide the necessary environment variables for NextAuth.js and MongoDB configuration.
4. Start the development server: Run `npm run dev` to start the application in development mode.
5. Access the application: Open your web browser and navigate to `http://localhost:3000` to access the Wall O' clock application.



## Technologies Used

- **Next.js:** A React framework for building server-side rendered and statically generated applications.
- **NextAuth.js:** An authentication library for Next.js applications that provides a complete user authentication system.
- **MongoDB:** A NoSQL document database for storing and retrieving user data and uploaded images.
- **CSS:** Used for styling the application with pre-built responsive components.

## Future Enhancements

The Wall O' Clock application has great potential for further enhancements and features, including:

- **User Profiles:** Implement user profile pages to showcase user's uploaded images, likes, and comments.
- **Social Sharing:** Integrate social media sharing functionality to allow users to share images on their social networks.
- **Image Tags:** Implement a tagging system to enable users to add tags to their images, enhancing discoverability.
- **User Interactions:** Allow users to follow each other, like and comment on images, and receive notifications.


## License

The Wall O' Clock project is open-source and released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

