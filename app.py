from boggle import Boggle
from flask import Flask, render_template, session, jsonify, request
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)
app.config["SECRET_KEY"] = "iLove$pringb0ard!"


app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False
debug = DebugToolbarExtension(app)


boggle_game = Boggle()

@app.route('/', methods=["GET", "POST"])
def display_home():
    board = boggle_game.make_board()
    session['board'] = board

    return render_template("home.html", board = board)


@app.route('/word-validate')
def validate_word():

    word = request.args['word']
    board = session['board']
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})
    