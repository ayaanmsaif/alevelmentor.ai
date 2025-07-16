# ALevelMentor Flask Backend

## Setup Instructions

1. **Create a virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   ```

2. **Activate the virtual environment:**
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask application:**
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

## API Endpoints

### Users
- `POST /api/users` - Create a new user
- `GET /api/users/<user_id>` - Get user details
- `GET /api/users/<user_id>/subjects` - Get user's subjects
- `POST /api/users/<user_id>/subjects` - Add a subject for user

### Past Papers
- `GET /api/past-papers` - Get all past papers
- `GET /api/past-papers/<paper_id>/questions` - Get questions for a paper
- `GET /api/users/<user_id>/paper-progress` - Get user's progress on papers

### Todo Items
- `GET /api/users/<user_id>/todos` - Get user's todos
- `POST /api/users/<user_id>/todos` - Create a new todo
- `PUT /api/todos/<todo_id>` - Update a todo
- `DELETE /api/todos/<todo_id>` - Delete a todo

### Analytics
- `GET /api/users/<user_id>/analytics` - Get user's performance analytics

## Database Schema

The database follows your proposed schema with these tables:
- `users` - User accounts
- `subjects_exam_board` - User's subjects and exam boards
- `past_papers` - Available past papers
- `questions` - Questions within papers
- `user_paper_progress` - User's progress on papers
- `todo_items` - User's todo list items

## Sample Data

The application initializes with sample data including:
- User: Neil George (bobu@bobu.com)
- Sample subjects: Physics, Mathematics, Computer Science
- Past papers from 2017-2024
- Progress data matching the dashboard
- Todo items as shown in the UI