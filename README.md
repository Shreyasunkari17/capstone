# Capstone Portfolio Platform

## Overview
The Capstone Portfolio Platform is a centralized digital platform designed for storing, showcasing, and discovering capstone projects. It allows students, faculty, and external stakeholders to collaborate and engage with academic projects effectively, fostering academic development and innovation.

## Key Features
### Functional Features
1. **Structured Project Uploads and Metadata:**
   - Standardized format for project uploads, including project name, abstract, team members, academic advisers, and media files.

2. **Media Integration:**
   - Support for PDF reports and images, securely stored in AWS S3.

3. **Advanced Search and Filtering:**
   - Robust search capabilities with filtering and sorting options (e.g., title, department, year).

4. **Role-Based Access Control:**
   - Secure login system with differentiated roles for students, faculty, and administrators.

5. **Bookmarking and Favorites:**
   - Personalized bookmarking of projects for quick access.

6. **Featured Projects Section:**
   - Highlight notable projects on the homepage to improve visibility.

7. **Dynamic Tagging and Categorization:**
   - Projects are tagged and categorized logically to enhance discoverability.

8. **User Profile Pages:**
   - Profiles showcasing uploaded projects, bookmarks, and personalized recommendations.

9. **Portfolio Analytics:**
   - Insights into project views, bookmarks, and platform usage trends.

### Non-Functional Features
1. **Scalability:**
   - AWS-hosted infrastructure using EC2 instances and PostgreSQL for handling growing data and user traffic.

2. **Security:**
   - Role-based permissions and data validation to ensure secure and reliable operations.

3. **Performance:**
   - Optimized database queries and caching for low-latency operations.

4. **Usability:**
   - Responsive design built with React.js for seamless experience across devices.

## System Architecture
1. **Frontend:**
   - Built with React.js for a dynamic and user-friendly interface.
2. **Backend:**
   - Python-based Flask application providing RESTful APIs for managing requests.
3. **Database:**
   - PostgreSQL database for structured storage and optimized queries.
4. **Hosting:**
   - Deployed on AWS using EC2 instances for the backend and database.

## Workflow
1. Users interact with the web application through their browsers.
2. The React.js frontend communicates with the Flask backend via RESTful APIs.
3. The backend handles operations like project uploads, searches, and analytics.
4. Data is stored and retrieved from the PostgreSQL database.

## Setup Instructions
### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 13+
- AWS account for deployment

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Shreyasunkari17/capstone.git
   cd capstone
   ```
2. **Backend Setup:**
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Create a virtual environment and install dependencies:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     ```
   - Configure database settings in the `.env` file.
   - Run the backend server:
     ```bash
     flask run
     ```

3. **Frontend Setup:**
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

4. **Deploy to AWS:**
   - Use EC2 instances to host the backend and PostgreSQL database.
   - Deploy the frontend on AWS S3 or another hosting service.

## Testing
- Use Postman for API testing to validate endpoints.
- Conduct performance testing for search and upload features.
- Verify role-based access control by testing with different user roles.

## Future Enhancements
1. Advanced analytics with project ratings and engagement metrics.
2. Mobile-friendly version for better accessibility.
3. Toggle between public and private visibility for projects.
4. Integration with learning management systems like Canvas or Blackboard.

## Contributing
We welcome contributions to enhance this platform. Please submit pull requests with a detailed description of changes.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please contact Shreya Sunkari at [your-email@example.com].



Project Public URL
http://3.129.207.78:3000/home
