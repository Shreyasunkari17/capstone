# Capstone Portfolio Platform


### Website Public URL: http://3.129.207.78:3000/home

## Project Description
The focus of Capstone Portfolio is to build a centralized digital platform where in students can exhibit their capstone projects. This portfolio serves a hub for exploring diverse projects with a structured environment for students to upload comprehensive detailing about their projects including essential metadata like titles, abstracts, team members, sponsors, faculty advisors, and various media types such as reports, videos, and images. The Capstone Portfolio consolidates these features into a unified repository, making it simple for students, faculty, and potential sponsors to access and share academic work. This streamlined platform enhances collaboration and engagement within the academic community, fostering connections that can lead to innovative partnerships and opportunities.

With the system's powerful search and browsing features, academics, students, and outside organizations will be able to find interesting projects, work together on ongoing initiatives, and gain knowledge from previous projects.


---

## Table of Contents
- [Project Description](#project-description)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [User Stories](#user-stories)
- [Sequence Diagram](#sequence-diagram)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Key Features
### Functional Features
- **Structured Project Uploads and Metadata:**
  Standardized format for uploading project details such as project name, abstract, team members, academic advisers, and media files.

- **Media Integration:**
  Secure handling of PDF reports and images, stored in AWS S3 for optimized retrieval.

- **Advanced Search and Filtering:**
  Comprehensive search with robust filtering options (e.g., title, department, year).

- **Role-Based Access Control (RBAC):**
  Secure login and role management for students, faculty, and administrators.

- **Bookmarking and Favorites:**
  Personalize user experience with bookmarking functionality.

- **Featured Projects Section:**
  Highlight standout projects for increased visibility.

- **Dynamic Tagging and Categorization:**
  Enable logical organization of projects for enhanced discoverability.

- **User Profile Pages:**
  Showcase uploaded projects, bookmarks, and personalized recommendations.

- **Portfolio Analytics:**
  Track key metrics like project views, bookmarks, and platform usage trends.

### Non-Functional Features
- **Scalability:**
  AWS-hosted with EC2 instances and PostgreSQL, ensuring seamless growth.

- **Security:**
  Role-based permissions and robust data validation.

- **Performance:**
  Optimized queries and caching for low-latency operations.

- **Usability:**
  Intuitive, responsive design using React.js for cross-device compatibility.

---

## System Architecture

<img width="682" alt="image" src="https://github.com/user-attachments/assets/f3f87e98-9137-483d-8181-439da666aee7" />

1. **Frontend:** React.js for a dynamic, user-friendly interface.
2. **Backend:** Flask (Python) providing RESTful APIs.
3. **Database:** PostgreSQL for structured storage and efficient querying.
4. **Hosting:** AWS-hosted backend and database using EC2 instances.

**Workflow:**
1. Users interact via a browser-based React.js frontend.
2. The backend API processes requests for uploads, searches, and analytics.
3. PostgreSQL handles all structured data storage.

---

## Setup Instructions
### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 13+
- AWS account for deployment

### Steps
#### Clone the Repository
```bash
git clone https://github.com/Shreyasunkari17/capstone.git
cd capstone
```

#### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. Configure database settings in the `.env` file.
4. Start the Flask server:
   ```bash
   flask run
   ```

#### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

#### Deployment to AWS
- Use EC2 instances for backend and database hosting.
- Deploy the React frontend using AWS S3 or similar hosting services.

---

## User Stories

| **ID** | **User Story**                                                                                      | **Status** |
|--------|----------------------------------------------------------------------------------------------------|------------|
| 1   | As a user, I want to upload my project in a structured way so that my project details are consistent and easy to retrieve.  | ✅ Done     |
| 2   | As a user, I want to attach media files (reports, code, videos, etc.) to my project.	                                         | ✅ Done     |
| 3   | As a user, I want to search for projects using specific criteria like title, course, or semester.          | ✅ Done     |
| 4   | As a user, I want to securely log in and have role-based access (e.g., student, faculty, external).                 | ✅ Done     |
| 5   | As a user, I want to bookmark or mark projects as favourites.	          | ✅ Done     |
| 6   | As a user, I want to view analytics (views, bookmarks) for a project.                 | ✅ Done     |
| 7   | As a user, I want a profile page displaying my contributions, uploaded projects, and bookmarks	                         | ✅ Done     |
| 8   | As a user, I want to sort and filter projects by criteria such as popularity.                       | ✅ Done     |
| 9   | As an administrator, I want to showcase specific projects in a “Featured Projects” section.            | ✅ Done  |
| 10   | As a user, I want to tag projects with relevant keywords and categories (e.g., "AI," "Blockchain").    | ✅ Done  |
| 11   | As a user, I want to view detailed profiles of students behind each project.    | ✅ Done   |

---

## Sequence Diagram

<img width="453" alt="image" src="https://github.com/user-attachments/assets/2435334c-5f4a-45ca-a94a-4631d40647ae" />


The sequence diagram illustrates the interactions between the User, Frontend, Backend, and Database during the Project Upload process. It highlights key steps such as user authentication, metadata validation, and project storage. This visualization clarifies the platform's workflow, ensuring efficient handling of data uploads and secure user interactions.

### Workflow:
1. **Project Upload Request:**
   - The User fills out the Project Upload Form on the Frontend.
2. **POST Request:**
   - The Frontend sends a `POST /api/upload_project` request to the Backend with the project details.
3. **User Authentication:**
   - The Backend validates user credentials.
     - **Condition 1:** If the user is authenticated:
       - Proceed to project upload.
     - **Condition 2:** If the user is not authenticated:
       - Return an "Unauthorized access" error.
4. **Insert Project Details:**
   - The Backend inserts project metadata (e.g., title, description) into the Database.
5. **Media File Handling (Conditional):**
   - **If media exists:**
     - The backend processes and stores the media file details in the database.
   - **If no media is uploaded:**
     - The backend logs "No media" and skips media processing.
6. **Response to Frontend:**
   - Upon successful upload, the Backend returns a success message to the Frontend.
   - If an error occurs (e.g., unauthorized access or database failure), an appropriate error message is returned.
7. **Frontend Display:**
   - The Frontend displays a success or error message to the User.
   - In case of failure, the user is given the option to retry.

---

## Testing
- Use **Postman** for validating backend APIs.
- Conduct performance tests for search and upload operations.
- Verify role-based access control with different user roles.

---

## Future Enhancements
1. Advanced analytics with project ratings and engagement metrics.
2. Mobile app or optimized mobile web interface for on-the-go accessibility.
3. Public/private toggle for project visibility.
4. Integration with campus tools like Canvas or Blackboard.

---

## Contributing
We welcome contributions to enhance the platform. Please create a pull request with a detailed explanation of your changes.


---

## Contact
For inquiries or feedback, contact **Shreya Sunkari** at pf60494@umbc.edu.

