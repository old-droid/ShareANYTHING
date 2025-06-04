document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const uploadStatus = document.getElementById('uploadStatus');
    const shareKeyContainer = document.getElementById('shareKeyContainer');
    const shareKeyInput = document.getElementById('shareKey');
    const copyKeyButton = document.getElementById('copyKeyButton');

    const downloadKeyInput = document.getElementById('downloadKey');
    const downloadButton = document.getElementById('downloadButton');
    const downloadStatus = document.getElementById('downloadStatus');

    uploadButton.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (!file) {
            uploadStatus.textContent = 'Please select a file.';
            uploadStatus.style.color = 'red';
            return;
        }

        uploadStatus.textContent = 'Uploading...';
        uploadStatus.style.color = 'orange';
        shareKeyContainer.style.display = 'none';

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const key = await response.text();
                uploadStatus.textContent = 'Upload successful!';
                uploadStatus.style.color = 'green';
                shareKeyInput.value = key;
                shareKeyContainer.style.display = 'block';
            } else {
                const errorText = await response.text();
                uploadStatus.textContent = `Upload failed: ${errorText}`;
                uploadStatus.style.color = 'red';
            }
        } catch (error) {
            uploadStatus.textContent = `An error occurred: ${error.message}`;
            uploadStatus.style.color = 'red';
            console.error('Upload error:', error);
        }
    });

    copyKeyButton.addEventListener('click', () => {
        shareKeyInput.select();
        shareKeyInput.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        alert('Key copied to clipboard!');
    });

    downloadButton.addEventListener('click', () => {
        const key = downloadKeyInput.value.trim();
        if (!key) {
            downloadStatus.textContent = 'Please enter a share key.';
            downloadStatus.style.color = 'red';
            return;
        }

        downloadStatus.textContent = 'Attempting download...';
        downloadStatus.style.color = 'orange';

        // Construct the download URL
        const downloadUrl = `/download/${key}`;

        // Create a temporary anchor element to trigger the download
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = key; // This will suggest the filename, but the server can override it
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        downloadStatus.textContent = 'Download initiated. Check your downloads.';
        downloadStatus.style.color = 'green';
    });
});
