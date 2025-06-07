from flask import Flask, render_template, request, send_from_directory, redirect, url_for
import os
import uuid

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400
    if file:
        unique_filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filepath)
        # For now, we'll return the unique filename as the key.
        # In a real scenario, you might want a shorter, more user-friendly key
        # and map it to the unique_filename.
        return unique_filename, 200
    return "Error uploading file", 500

@app.route('/download/<filename>')
def download_file(filename):
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    response = send_from_directory(
        app.config['UPLOAD_FOLDER'],
        filename,
        as_attachment=True,
        download_name=filename # Use the unique filename as the download name for now
    )
    # Delete the file after it has been sent
    @response.call_on_close
    def on_close():
        try:
            os.remove(filepath)
            print(f"Deleted file: {filepath}")
        except Exception as e:
            print(f"Error deleting file {filepath}: {e}")
    return response

if __name__ == '__main__':
    app.run(debug=True)
