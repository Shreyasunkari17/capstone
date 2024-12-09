from flask import Blueprint, request, jsonify
from models import db, User, Project, Media, Department,Bookmark
import os
from datetime import date
api = Blueprint('api', __name__,url_prefix='/api')

def handle_preflight():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'CORS preflight successful'})
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Origin'] = 'http://3.129.207.78:3000'
        return response, 200

# Upload Project
@api.route('/upload_project', methods=['POST', 'OPTIONS'])
def upload_project():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'CORS preflight successful'}), 200

    try:
        data = request.form
        created_by_user = User.query.get(data['created_by'])  # Fetch the selected user

        # Create a new project entry
        new_project = Project(
            title=data['title'],
            abstract=data['abstract'],
            team_members=data['team_members'],  #TODO: expect a list
            created_by_user=created_by_user,  # Set the selected user
            year=data.get('year'),
            sponsor=data.get('sponsor'),
            is_featured=False
        )
        db.session.add(new_project)
        db.session.commit()

        if 'file' in request.files:
            file = request.files['file']
            upload_folder = '~/static/uploads'

            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)

            file_path = os.path.join(upload_folder, file.filename)
            file.save(file_path)

            media = Media(
                project_id=new_project.id,
                file_name=file.filename,
                file_type=file.content_type,
                file_path=file_path
            )
            db.session.add(media)
            db.session.commit()

        return jsonify({'message': 'Project uploaded successfully!'}), 200
    except Exception as e:
        print(f"Error during project upload: {e}")
        return jsonify({'message': 'Internal server error'}), 500
# Fetch all projects
@api.route('/projects', methods=['GET'])
def get_projects():
    try:
        projects = Project.query.all()
        projects_list = [
            {
                'id': project.id,
                'title': project.title,
                'department': project.created_by_user.department.name,
                'abstract':project.abstract,
                'year':project.year,
                'sponsor':project.sponsor,
                'is_featured': project.is_featured,
                'favorite':False,
                'no_of_views': project.no_of_views//2,
                'created_by':project.created_by
            }
            for project in projects
        ]
        user_id=None
        user_id=request.args.get('userId')
        if user_id:
            print(get_bookmarks(user_id)[0].json["project_ids"])
            bookmarked_project_ids=set(get_bookmarks(user_id)[0].json["project_ids"])
            for project in projects_list:
                if project["id"] in bookmarked_project_ids:
                    project["favorite"]=True
        return jsonify(projects_list), 200
    except Exception as e:
        print(f"Error fetching projects: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Fetch project details by ID
@api.route('/project/<int:project_id>', methods=['GET'])
def get_project_details(project_id):
    try:
        project = Project.query.get_or_404(project_id)
        
        seen_media = set()

        project_details = {
            'id': project.id,
            'title': project.title,
            'abstract': project.abstract,
            'team_members': project.team_members.split(', '), 
            'department': project.created_by_user.department.name,
            'created_by': {
                'name': project.created_by_user.name,
                'email': project.created_by_user.email
            },
            'media_files': [
                {
                    'file_name': media.file_name,
                    'file_path': media.file_path
                }
                for media in project.media_files
                if media.file_path not in seen_media and not seen_media.add(media.file_path) 
            ],
            'year':project.year,
            'sponsor':project.sponsor,
            'is_featured': project.is_featured,
            'favorite':False,
            'no_of_views':project.no_of_views//2
        }

        #adding the no.of views
        project.no_of_views = project.no_of_views + 1  # Increment by 1
        db.session.commit()


        return jsonify(project_details), 200
    except Exception as e:
        print(f"Error fetching project details: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Fetch user details by ID
@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    try:
        user = User.query.get_or_404(user_id)
        
        user_profile = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'role': user.role,
            'department': user.department.name if user.department else None, 
            'projects': [
                {'id': project.id, 'title': project.title}
                for project in user.projects_created
            ]
        }

        return jsonify(user_profile), 200
    except Exception as e:
        print(f"Error fetching user: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Fetch all departments for dropdown selection
@api.route('/departments', methods=['GET'])
def get_departments():
    try:
        departments = Department.query.all()
        departments_list = [{'id': dept.id, 'name': dept.name} for dept in departments]
        return jsonify(departments_list), 200
    except Exception as e:
        print(f"Error fetching departments: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Create a new user
@api.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')
        department_id = data.get('department')

        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'Email is already registered.'}), 400

        department = Department.query.get(department_id)
        if not department:
            return jsonify({'message': 'Invalid department selected.'}), 400

        new_user = User(
            name=name,
            email=email,
            role=role,
            department_id=department_id
        )
        new_user.set_password(password)  
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully!'}), 201
    except Exception as e:
        print(f"Error creating user: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Fetch all users
@api.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        users_list = [
            {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'role': user.role,
                'department': user.department.name if user.department else None 
            }
            for user in users
        ]
        return jsonify(users_list), 200
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# Test route
@api.route('/test-user', methods=['GET'])
def test_user():
    user = User.query.get(1) 
    if user:
        return jsonify({'id': user.id, 'name': user.name})
    return jsonify({'message': 'User not found'}), 404

# search project
@api.route('/search-project', methods=['POST'])
def search_project():
    try:
        data = request.get_json()
        term = data.get('term')
        results = Project.query.filter(Project.ts_vector.match(term)).all()
        projects_list = [
                {
                    'id': project.id,
                    'title': project.title,
                    'abstract': project.abstract, 
                    'department': project.created_by_user.department.name,
                }
                for project in results
            ]
        return jsonify(projects_list), 200
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({'message': 'Internal server error'}), 500



@api.route('/login',methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            user_profile = {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'role': user.role,
                'department': user.department.name if user.department else None,
                'projects': [
                    {'id': project.id, 'title': project.title}
                    for project in user.projects_created
                ]
            }
            return jsonify({"data": user_profile}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({'message': 'Internal server error'}), 500
        
@api.route('/add_bookmark',methods=['POST'])
def add_bookmark():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        project_id = data.get('project_id')
        if not user_id or not project_id:
            return jsonify({"error": "user_id and project_id are required"}), 400
        
        # Check if the bookmark already exists
        existing_bookmark = Bookmark.query.filter_by(user_id=user_id, project_id=project_id).first()
        if existing_bookmark:
            return jsonify({"message": "Bookmark already exists"}), 200
        
        # Add the new bookmark
        new_bookmark = Bookmark(user_id=user_id, project_id=project_id, created_time=date.today())
        db.session.add(new_bookmark)
        db.session.commit()
        return jsonify({"message": "Bookmark added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error adding bookmark: {str(e)}"}), 500

@api.route('/remove_bookmark', methods=['DELETE'])
def remove_bookmark():
    try:
        data = request.json
        user_id = data.get('user_id')
        project_id = data.get('project_id')

        if not user_id or not project_id:
            return jsonify({"error": "user_id and project_id are required"}), 400

        # Find the bookmark to delete
        bookmark_to_delete = Bookmark.query.filter_by(user_id=user_id, project_id=project_id).first()
        if not bookmark_to_delete:
            return jsonify({"error": "Bookmark not found"}), 404

        # Delete the bookmark
        db.session.delete(bookmark_to_delete)
        db.session.commit()
        return jsonify({"message": "Bookmark removed successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error removing bookmark: {str(e)}"}), 500


#using project id instead of user id
@api.route('/get_bookmarks/<int:user_id>', methods=['GET'])
def get_bookmarks(user_id):
    try:
        # Extract user_id from the query parameters
        # user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        # Query to fetch all bookmarks for the given user_id
        bookmarks = Bookmark.query.filter_by(user_id=user_id).all()
        if not bookmarks:
            return jsonify({"message": "No bookmarks found for the given user_id", "project_ids": []}), 200

        # Extract project_ids from the bookmarks
        project_ids = [bookmark.project_id for bookmark in bookmarks]
        return jsonify({"user_id": user_id, "project_ids": project_ids}), 200
    except Exception as e:
        return jsonify({"error": f"Error removing bookmark: {str(e)}"}), 500

@api.route('/get_featured_projects',methods=['GET'])
def get_featured_projects():
    try:
        projects = Project.query.filter_by(is_featured=True).all()
        projects_list = [
            {
                'id': project.id,
                'title': project.title,
                'department': project.created_by_user.department.name,
                'abstract':project.abstract,
                'year':project.year,
                'sponsor':project.sponsor,
                'is_featured': project.is_featured,
                'favorite':False,
                'no_of_views':project.no_of_views//2
            }
            for project in projects
        ]
        user_id=None
        user_id=request.args.get('userId')
        if user_id:
            print(get_bookmarks(user_id)[0].json["project_ids"])
            bookmarked_project_ids=set(get_bookmarks(user_id)[0].json["project_ids"])
            for project in projects_list:
                if project["id"] in bookmarked_project_ids:
                    project["favorite"]=True
        for project in projects_list:
            project_id = project['id']
            bookmark_count = db.session.query(Bookmark).filter_by(project_id=project_id).count()
            project["bookmark_count"]=bookmark_count if bookmark_count else 0

        return jsonify(projects_list), 200
    except Exception as e:
        print(f"Error fetching projects: {e}")
        return jsonify({'message': 'Internal server error'}), 500


# API to delete project
@api.route('/remove_project', methods=['DELETE'])
def remove_project():
    try:
        data = request.json
        # user_id = data.get('user_id')
        project_id = data.get('project_id')

        if not project_id:
            return jsonify({"error": "project_id is required"}), 400

        # Find the bookmark to delete
        project_to_delete = Project.query.filter_by(id=project_id).first()
        if not project_to_delete:
            return jsonify({"error": "Project not found"}), 404

        # Delete the bookmark
        db.session.delete(project_to_delete)
        db.session.commit()
        return jsonify({"message": "Project removed successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error removing Project: {str(e)}"}), 500


# API to delete user
@api.route('/remove_user', methods=['DELETE'])
def remove_user():
    try:
        data = request.json
        user_id = data.get('user_id')
        # project_id = data.get('project_id')

        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        # Find the user to delete
        user_to_delete = User.query.filter_by(id=user_id).first()
        if not user_to_delete:
            return jsonify({"error": "User not found"}), 404

        # Delete the user
        db.session.delete(user_to_delete)
        db.session.commit()
        return jsonify({"message": "User removed successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error removing User: {str(e)}"}), 500

@api.route('/add_featured',methods=['POST'])
def add_featured():
    try:
        data = request.get_json()
        project_id = data.get('project_id')
        if not project_id:
            return jsonify({"error": "project_id is required"}), 400
        
        # Check if the bookmark already exists
        project = Project.query.filter_by( id=project_id).first()
        if not project:
            return jsonify({"message": "Project doesn't exist"}), 400
        project.is_featured=True

        db.session.commit()
        return jsonify({"message": f"project {project_id} is made featured"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error adding featured: {str(e)}"}), 500

@api.route('/remove_featured', methods=['POST'])
def remove_featured():
    try:
        data = request.get_json()
        # user_id = data.get('user_id')
        project_id = data.get('project_id')
        if  not project_id:
            return jsonify({"error": "project_id is required"}), 400
        
        # Check if the bookmark already exists
        project = Project.query.filter_by(id=project_id).first()
        if not project:
            return jsonify({"message": "Project doesn't exist"}), 400
        project.is_featured=False   #set bookmark to false

        db.session.commit()
        return jsonify({"message": f"{project_id} is made featured"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error adding featured: {str(e)}"}), 500





