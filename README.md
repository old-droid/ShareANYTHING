# ShareANYTHING

ShareANYTHING is a lightweight file sharing web application built with Flask. It allows users to quickly upload files and share them using a unique key. Uploaded files are stored temporarily and automatically deleted after download, ensuring both convenience and efficient file management.

## Features

- **Simple File Upload:** Easily upload a file and receive a unique share key.
- **Secure Download:** Access shared files via a unique key.
- **Temporary Storage:** Files are automatically removed post-download.
- **Responsive UI:** A clean interface built using HTML, CSS, and JavaScript.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/old-droid/ShareANYTHING.git
   ```

2. **Change to the project directory and install the dependencies:**
   ```bash
   cd ShareANYTHING/shareanything_app
   pip install -r requirements.txt
   ```

## Running the Application

Start the Flask server:
```bash
python app.py
```
Navigate to [http://127.0.0.1:5000/](http://127.0.0.1:5000/) in your web browser to access the application.

## Project Structure

```bash
ShareANYTHING/
├── LICENSE.md
├── README.md
└── shareanything_app
    ├── app.py
    ├── requirements.txt
    ├── static
    │   ├── css
    │   │   └── style.css
    │   └── js
    │       └── script.js
    └── templates
        └── index.html
```

## Usage

### Uploading Files

- **Step 1:** Click on "Choose File" to select a file from your computer.
- **Step 2:** Click the **Upload** button. 
- **Step 3:** A unique share key will be generated and displayed. Use this key to share the file.

### Downloading Files

- **Step 1:** Enter the received share key in the **Receive File** section.
- **Step 2:** Click the **Download** button.
- **Step 3:** The file will automatically download, and the file on the server will be deleted upon completion.

## License

This project is licensed under the terms specified in [LICENSE.md](LICENSE.md).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request, or open an issue for any suggestions or bug fixes.

## Acknowledgements

- **[Flask](https://flask.palletsprojects.com/):** The web framework used for the backend.
- Thanks to the open-source community for continuous support and contributions.
