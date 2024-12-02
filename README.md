# MockMaster: AI-Powered Mock Interview Platform

MockMaster is an innovative web application that helps users practice mock interviews tailored to their specific roles and skills. It leverages AI to evaluate video responses, provide feedback, and give performance ratings based on user input. This platform aims to simulate real-world interview scenarios to enhance interview preparedness.

## Features

- **Role and Skill Selection**: Choose your desired role and the specific skills you want to be assessed on.
- **AI-Powered Interview**: The AI generates relevant interview questions based on the chosen role and skill.
- **Video Recording**: Record your responses directly within the platform.
- **AI Evaluation**: The AI evaluates your video responses and provides feedback based on criteria such as clarity, content relevance, and communication skills.
- **Feedback and Rating**: Receive detailed feedback and a performance rating to help you improve.
- **Real-time Performance Tracking**: View progress and track improvements over time.
- **Secure Authentication**: User authentication powered by Clerk, ensuring secure login and registration.
- **MongoDB Integration**: MongoDB stores user data, interview responses, feedback, and performance ratings for efficient retrieval.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, MongoDB
- **Authentication**: Clerk
- **Database**: MongoDB (for storing user data, responses, feedback, and performance)

## Installation

Follow the steps below to run the project locally:

### Prerequisites

Make sure you have **Node.js** and **MongoDB** installed on your local machine.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/Ai-mock-interviewer.git
```

### 2. Install Dependencies

Navigate to the project folder and install the required dependencies for the frontend and backend:

```
npm install
```

### 3. Set Up MongoDB

Ensure MongoDB is running locally or use a cloud MongoDB service (e.g., MongoDB Atlas). Update the .env file with your MongoDB URI.

```
MONGODB_URI=your_mongodb_connection_string
```

### 4. Set Up Clerk Authentication

Sign up on Clerk and create a new project.
Add your Clerk API keys to the .env file.

```
CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
```

### 5. Run the Development Server

Now, start the development server:

`npm run dev`

Open your browser and visit http://localhost:3000 to access the MockMaster platform.

In the above section:

- **Step 1** guides the user to clone the repository.
- **Step 2** shows how to install dependencies using `npm`.
- **Step 3** explains how to set up MongoDB and configure the connection string.
- **Step 4** provides instructions on integrating Clerk authentication into the project.
- **Step 5** outlines how to run the development server locally.

Let me know if you need further clarification or more modifications!
