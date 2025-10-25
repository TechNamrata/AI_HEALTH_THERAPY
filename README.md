<div align="center">
  <br/>
  <h1>⚕️ AI Health Therapist ⚕️</h1>
  <p>
    <b>A full-stack, AI-powered web application that provides users with an instant, data-driven bio-assessment based on their health concerns.</b>
  </p>
  <p>
    <i>A collaborative project by Dristi Laskar and Namrata Nayak.</i>
  </p>
  
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript)
  ![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js)
  ![Express.js](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)
  ![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

</div>

---

## 🌟 About The Project

AI Health Therapist is a cutting-edge personal health analysis tool. It addresses the need for immediate, accessible health information by leveraging the power of Google's Gemini AI. Users can describe their symptoms in natural language and receive a comprehensive, structured analysis, including potential conditions, recommended remedies, and personalized health scores—all presented through a dynamic and intuitive user interface.

This project demonstrates a full development lifecycle, from user authentication and data collection to secure, real-time AI integration and final deployment on a cloud platform.



## 🚀 Key Features

* **Secure User Authentication**: JWT-based authentication with password hashing ensures user data is secure.
* **Personalized Health Profile**: A multi-step onboarding process collects user biometrics (age, gender, BMI) for more tailored AI analysis.
* **Real-time AI Analysis**: Integrates with the Google Gemini API to process user queries and generate structured health insights.
* **Dynamic Data Visualization**: Uses Chart.js to present mental/physical health scores and trends in an easy-to-understand format.
* **Interactive Anatomical Map**: Visually pinpoints symptom locations on a body map for enhanced clarity.
* **Full-Stack & Deployable**: A complete monolithic application built with the MERN stack (minus React), ready for cloud deployment.

---

## 🛠️ Tech Stack & Architecture

This project is a monolithic application where a Node.js/Express backend serves a static frontend, handles all API logic, and manages the database connection.

| Tier | Technology |
| :--- | :--- |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript) ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chart.js) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js) ![Express.js](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square) |
| **AI Integration**| ![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat-square&logo=google) |
| **Deployment** | ![Render](https://img.shields.io/badge/Render-4A90E2?style=flat-square&logo=render) ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git) |

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v20.x or later)
* npm
* Git

### Local Installation

1.  **Clone the repository:**
    ```bash
    git clone [[https://github.com/DristiLaskar/AI-Health-Therapist.git](https://github.com/DristiLaskar/AI-Health-Therapist.git](https://github.com/TechNamrata/AI_HEALTH_THERAPY.git))
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd AI-Health-Therapist/backend
    ```

3.  **Install NPM packages:**
    ```bash
    npm install
    ```

4.  **Create your Environment File:**
    Create a `.env` file inside the `backend` folder and add your secret keys:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

5.  **Start the server:**
    ```bash
    npm start
    ```
    The application will be running on `http://localhost:3000`.

---

## 👥 Project Authors

This project was a collaborative effort.

* **Dristi Laskar**: [GitHub Profile](https://github.com/DristiLaskar) | [LinkedIn](https://www.linkedin.com/in/your-username/)
* **Namrata Nayak**: [GitHub Profile](https://github.com/NamrataNayak) | [LinkedIn](https://www.linkedin.com/in/her-username/)

*(Note: Remember to update the LinkedIn profile links!)*


