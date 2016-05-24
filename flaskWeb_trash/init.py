from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>Hello World</h1>'

@app.route('/user/<name>')
def user(name):
    return '<h1>Hello,%s!</h1>'%name

@app.errorhandler(404)
def page_noe_found(e):
    return 

@app.errorhandler(500)
def

if __name__ == '__main__':
    app.run(debug=True)
