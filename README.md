SmartBrain Face Recognition App

Table of Contents
Introduction
Features
Technologies Used
Setup and Installation
APIs Used
Contributions
Introduction
SmartBrain is a React-based web application that allows users to detect faces in any given image. Additionally, users can log in to track the number of submissions they have made, and view their rank based on the number of images they've processed.

Features
Face Detection: SmartBrain uses the Clarifai API to detect faces in images. Simply input the URL of an image, and the application will highlight the faces found.

User Authentication: Users can create an account and log in to track the number of images they've submitted.

Ranking System: Based on the number of submissions, users can see their rank, motivating them to use the application more.

Technologies Used
React: The core frontend framework used for building the user interface.
CSS: Styling and animations.
Clarifai API: The AI service used to detect faces in images.
(Any other backend technology or database used, if any)

Setup and Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your_github_username/smartbrain.git

Navigate into the project directory:
bash
Copy code
cd smartbrain

Install the necessary dependencies:
Copy code
npm install

Start the development server:
sql
Copy code
npm start
Visit http://localhost:3000 in your browser to see the application in action.

APIs Used
Clarifai API: Used for face detection. Read more.
(Note: Replace the API keys in the source code with your own API keys before using.)

Contributions
Feel free to fork this project, open a pull request, or report any issues you find.
