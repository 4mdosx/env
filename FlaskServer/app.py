from flask import Flask,render_template
from flask.ext.script import Manager
app = Flask(__name__)
manager = Manager(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/favor')
def favor():
    return render_template('favor.html')

@app.route('/like')
def like():
    return render_template('like.html')

@app.route('/me')
def me():
    return render_template('me.html')


@app.route('/api/wechat1')
def message():
    return '{key:message 1}'

@app.route('/api/query')
def eventQuery():
    return 'query results'

if __name__ == '__main__':
     manager.run()
