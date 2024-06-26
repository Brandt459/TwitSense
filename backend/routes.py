from flask import Blueprint, jsonify, request
from functions import analyze_user_posts_safe, get_user_analysis
from models import RedditUser
from client import reddit
from prawcore.exceptions import NotFound
from qa_model import global_embeddings_store, prompt


route_blueprint = Blueprint('my_blueprint', __name__)


@route_blueprint.route('/user', methods=['GET'])
def get_user():
    username = request.args.get('username', '').lower()
    if not username:
        return jsonify({'error': 'Username parameter is required'}), 400

    reddit_user = RedditUser.query.filter_by(username=username).first()
    
    if not reddit_user:
        analyze_user_posts_safe(username)

    global_embeddings_store.load(username)
    
    return jsonify(get_user_analysis(username))


@route_blueprint.route('/analyze_user', methods=['GET'])
def analyze_user():    
    username = request.args.get('username', '').lower()
    if not username:
        return jsonify({'error': 'Username parameter is required'}), 400
    
    analyze_user_posts_safe(username)

    return jsonify(get_user_analysis(username))


@route_blueprint.route('/profile-photo', methods=['GET'])
def get_profile_photo():
    username = request.args.get('username', '').lower()
    if not username:
        return jsonify({'error': 'Username parameter is required'}), 400

    try:
        user = reddit.redditor(username)
        profile_photo_url = user.icon_img
        return jsonify({'username': username, 'profile_photo_url': profile_photo_url})
    
    except NotFound:
        return jsonify({'message': f'User "{username}" not found'}), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@route_blueprint.route('/prompt', methods=['POST'])
def prompt_qa_model():
    data = request.json
    question = data.get('question')
    username = data.get('username')
    messages = data.get('messages', [])
    
    if not question:
        return jsonify({'error': 'Question parameter is required'}), 400
    
    if not username:
        return jsonify({'error': 'Username parameter is required'}), 400
    
    if global_embeddings_store.username != username:
        global_embeddings_store.load(username)
    
    return jsonify(prompt(question, messages))
