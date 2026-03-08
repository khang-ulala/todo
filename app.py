from flask import Flask, render_template, request, redirect, url_for, jsonify
from markupsafe import escape
import pymongo
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
uri = "mongodb+srv://kundiep1105_db_user:hello123@study.v5oaz4f.mongodb.net/?appName=Study"
try:
    print('connect done')
    client = pymongo.MongoClient(uri)
except Exception:
    print('error' + Exception)

# truy cap vao co so du lieu khang_todo
database = client.get_database('khang_todo')
# truy cap vao collection todoList thong qua database khang_todo
todo = database.get_collection('todoList')
# truy cap vao collection users thong qua database khang_todo
users = database.get_collection('users')

todo_list = []
users_value = {}

# duyet qua collection va them vao list
for x in todo.find():
    todo_list.append(x)

# duyet qua collection va them vao dictionary
for y in users.find():
    name = y['name']
    email = y['email']
    password = y['password']
    users_value.update({name:password})

print(todo_list)
print(users_value)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login_rq')
def login_rq():
    return redirect(url_for('login'))

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup_rq')
def signup_rq():
    return redirect(url_for('signup'))

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/main')
def main():
    return render_template('main.html')

'''trang web dung de nhap ten va mat khau nguoi dung'''
@app.route('/handle_get', methods=['GET','POST'])
def handle_get():
    # lay du lieu tu tren form va kiem tra
    # xem username va password co o trong mongodb hay khong
    error = None
    print('handle_get')
    if request.method == 'POST':
        username = request.form["username"]
        password = request.form["password"]
        print("username: " + username + " password: " + password)
        print("users_value: ", users_value)
        if username in users_value and users_value[username] == password:
            # successful -> main.html
            return render_template("main.html")
        else:
            # username not found
            return render_template("login.html", error = error)
    else:
        # not a POST request
        return render_template("login.html")

@app.route('/handle_post', methods=['GET','POST'])
def handle_post():
    error = None
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        email = request.form["email"]
        if username != "" and password != "" and email != "":
            add_user = {"name": username, "password":password, "email":email}
            x = users.insert_one(add_user)
            return render_template("main.html")
        else:
            return render_template("signup.html")
    return render_template("signup.html")

@app.route('/get_data', methods=['GET'])
def get_data():
    '''
    lay du lieu khi co su thay doi
    '''
    data = list(todo.find({}, {'_id': 0}))
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/add_task', methods=['POST'])
def add_task():
    # lay thong tin duoc gui xuong tu js
    task_no = request.json['no']
    task_text = request.json['title']
    task_status = request.json['completedCheck']
    print(str(task_text))

    newTask = {
        "no": task_no,
        "title": task_text,
        "CompletedCheck": task_status
    }

    result = todo.insert_one(newTask)
    newTask["_id"] = str(result.inserted_id)

    # tra ve todolist len lai js
    data = list(todo.find({}, {"_id": 0}))
    return jsonify(data)