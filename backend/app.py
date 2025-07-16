from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
import os

app = Flask(__name__)
CORS(app)

# Configure SQLite database
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'alevelmentor.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class PastPaper(db.Model):
    __tablename__ = 'past_papers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    exam_board = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    paper_num = db.Column(db.Integer, nullable=False)
    progress = db.Column(db.Integer, default=0)
    recentMark = db.Column(db.String(20))
    status = db.Column(db.String(20), default='Not Started')
    timeTaken = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'paper': self.name,
            'subject': self.subject,
            'exam_board': self.exam_board,
            'year': self.year,
            'paper_num': self.paper_num,
            'progress': self.progress,
            'recentMark': self.recentMark,
            'status': self.status,
            'timeTaken': self.timeTaken
        }

@app.route('/api/past-papers', methods=['GET'])
def get_past_papers():
    try:
        papers = PastPaper.query.all()
        return jsonify([paper.to_dict() for paper in papers])
    except Exception as e:
        print(f"Error fetching past papers: {str(e)}")
        return jsonify({"error": "Failed to fetch past papers"}), 500

@app.route('/api/past-papers/filter', methods=['POST'])
def filter_past_papers():
    try:
        data = request.get_json()
        print('Received filter data:', data)

        if not data:
            return jsonify({"error": "No filter data provided"}), 400

        query = PastPaper.query

        if 'subject' in data and data['subject'] != 'All Subjects':
            query = query.filter_by(subject=data['subject'])
        if 'exam_board' in data and data['exam_board'] != 'All Boards':
            query = query.filter_by(exam_board=data['exam_board'])
        if 'year' in data and data['year'] != 'All Years':
            try:
                query = query.filter_by(year=int(data['year']))
            except ValueError:
                return jsonify({"error": "Invalid year format"}), 400
        if 'paper_type' in data and data['paper_type'] != 'All Papers':
            try:
                paper_num = int(data['paper_type'].split(' ')[1])
                query = query.filter(PastPaper.paper_num == paper_num)
            except (ValueError, IndexError):
                return jsonify({"error": "Invalid paper type format"}), 400

        papers = query.all()
        result = [paper.to_dict() for paper in papers]
        print('Filtered query results:', result)
        
        return jsonify(result)
    except Exception as e:
        print(f"Error filtering past papers: {str(e)}")
        return jsonify({"error": "Failed to filter past papers"}), 500

@app.route('/api/past-papers/search', methods=['POST'])
def search_papers():
    try:
        search_term = request.json.get('searchTerm', '').lower()
        
        # Try to convert search term to integer for year comparison
        try:
            year_search = int(search_term)
            year_condition = PastPaper.year == year_search
        except ValueError:
            year_condition = False

        # Search across multiple fields
        papers = PastPaper.query.filter(
            or_(
                PastPaper.name.ilike(f'%{search_term}%'),
                PastPaper.subject.ilike(f'%{search_term}%'),
                PastPaper.exam_board.ilike(f'%{search_term}%'),
                year_condition if year_condition else False,
                # Include paper number search if it's a number
                PastPaper.paper_num == int(search_term) if search_term.isdigit() else False
            )
        ).all()
        
        # Use the existing to_dict method for consistent response format
        return jsonify([paper.to_dict() for paper in papers])
    except Exception as e:
        print(f"Search error: {str(e)}")  # Add logging for debugging
        return jsonify({'error': str(e)}), 500

def init_db():
    with app.app_context():
        # Drop all tables first to ensure a clean slate
        db.drop_all()
        # Create all tables
        db.create_all()
        
        # Only add sample data if the table is empty
        if PastPaper.query.count() == 0:
            sample_papers = [
                # Physics Papers
                PastPaper(
                    name='Physics 9702/42 M/J/22',
                    subject='Physics',
                    exam_board='Cambridge',
                    year=2022,
                    paper_num=2,
                    progress=75,
                    recentMark='38/60',
                    status='In Progress',
                    timeTaken='45 minutes'
                ),
                PastPaper(
                    name='Physics 9702/41 O/N/23',
                    subject='Physics',
                    exam_board='Cambridge',
                    year=2023,
                    paper_num=1,
                    progress=100,
                    recentMark='52/60',
                    status='Completed',
                    timeTaken='1 hour 15 minutes'
                ),
                PastPaper(
                    name='Physics 9702/43 M/J/23',
                    subject='Physics',
                    exam_board='Cambridge',
                    year=2023,
                    paper_num=3,
                    progress=0,
                    status='Not Started'
                ),
                
                # Mathematics Papers
                PastPaper(
                    name='Mathematics 9709/32 O/N/23',
                    subject='Mathematics',
                    exam_board='Cambridge',
                    year=2023,
                    paper_num=2,
                    progress=100,
                    recentMark='72/75',
                    status='Completed',
                    timeTaken='1 hour 30 minutes'
                ),
                PastPaper(
                    name='Mathematics 9709/31 M/J/23',
                    subject='Mathematics',
                    exam_board='Cambridge',
                    year=2023,
                    paper_num=1,
                    progress=45,
                    recentMark='35/75',
                    status='In Progress',
                    timeTaken='50 minutes'
                ),
                PastPaper(
                    name='Mathematics 9709/33 M/J/22',
                    subject='Mathematics',
                    exam_board='Cambridge',
                    year=2022,
                    paper_num=3,
                    progress=100,
                    recentMark='68/75',
                    status='Completed',
                    timeTaken='1 hour 25 minutes'
                ),
                
                # Computer Science Papers
                PastPaper(
                    name='Computer Science 9618/41 M/J/23',
                    subject='Computer Science',
                    exam_board='Cambridge',
                    year=2023,
                    paper_num=1,
                    progress=0,
                    status='Not Started'
                ),
                PastPaper(
                    name='Computer Science 9618/42 O/N/22',
                    subject='Computer Science',
                    exam_board='Cambridge',
                    year=2022,
                    paper_num=2,
                    progress=85,
                    recentMark='68/75',
                    status='In Progress',
                    timeTaken='1 hour 10 minutes'
                ),
                PastPaper(
                    name='Computer Science 9618/43 M/J/22',
                    subject='Computer Science',
                    exam_board='Cambridge',
                    year=2022,
                    paper_num=3,
                    progress=100,
                    recentMark='71/75',
                    status='Completed',
                    timeTaken='1 hour 20 minutes'
                ),
                
                # Add some papers from other exam boards
                PastPaper(
                    name='Physics IAL WPH14/01 Jan/23',
                    subject='Physics',
                    exam_board='Edexcel',
                    year=2023,
                    paper_num=1,
                    progress=60,
                    recentMark='45/80',
                    status='In Progress',
                    timeTaken='1 hour'
                ),
                PastPaper(
                    name='Mathematics IAL WMA14/01 Jun/23',
                    subject='Mathematics',
                    exam_board='Edexcel',
                    year=2023,
                    paper_num=1,
                    progress=100,
                    recentMark='87/100',
                    status='Completed',
                    timeTaken='1 hour 45 minutes'
                ),
                PastPaper(
                    name='Computer Science 7517/2 Jun/23',
                    subject='Computer Science',
                    exam_board='AQA',
                    year=2023,
                    paper_num=2,
                    progress=0,
                    status='Not Started'
                )
            ]
            
            for paper in sample_papers:
                db.session.add(paper)
            
            db.session.commit()
            print("Sample past papers added to database")

if __name__ == '__main__':
    init_db()  # Initialize database and add sample data
    app.run(debug=True, port=5000)