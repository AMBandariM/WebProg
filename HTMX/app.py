from flask import Flask, send_from_directory, request, Response

app = Flask(__name__)
tasks = [{"id": 1, "title": "First Task"}, {"id": 2, "title": "Second Task"}]
next_id = 3

@app.route("/")
def index():
    return send_from_directory("templates", "index.html")

@app.route("/static/<path:path>")
def static_files(path):
    return send_from_directory("static", path)

@app.route("/tasks", methods=["GET"])
def get_tasks():
    html = ""
    for task in tasks:
        html += task_html(task)
    return Response(html, mimetype="text/html")

@app.route("/tasks", methods=["POST"])
def add_task():
    global next_id
    title = request.form.get("title", "").strip()
    if title:
        task = {"id": next_id, "title": title}
        tasks.append(task)
        next_id += 1
        return Response(task_html(task), mimetype="text/html")
    return "", 204

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    print(tasks)
    return "", 200

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    title = request.form.get("title", "").strip()
    for task in tasks:
        if task["id"] == task_id:
            task["title"] = title
            return Response(task_html(task), mimetype="text/html")
    return "", 404

@app.route("/tasks/<int:task_id>/edit", methods=["GET"])
def edit_task(task_id):
    for task in tasks:
        if task["id"] == task_id:
            return Response(edit_form_html(task), mimetype="text/html")
    return "", 404

def task_html(task):
    return f'''
    <div id="task-{task["id"]}" class="task-item">
        <span 
            hx-get="/tasks/{task["id"]}/edit"
            hx-trigger="click"
            hx-target="#task-{task["id"]}"
            hx-swap="outerHTML"
        >{task["title"]}</span>

        <button 
            hx-delete="/tasks/{task["id"]}" 
            hx-target="closest .task-item" 
            hx-swap="delete"
        >Delete</button>
    </div>
    '''


def edit_form_html(task):
    return f'''
    <form 
        hx-put="/tasks/{task["id"]}" 
        hx-target="#task-{task["id"]}" 
        hx-swap="outerHTML"
    >
        <input name="title" value="{task["title"]}" required>
        <button type="submit">Save</button>
    </form>
    '''

if __name__ == "__main__":
    app.run(debug=True)
