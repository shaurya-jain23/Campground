const existingImagesContainer = document.getElementById('existing-images');
// Mark images to be deleted
if(existingImagesContainer){
    existingImagesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const filename = e.target.dataset.filename;
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'deleteImages[]';
            input.value = filename;
            document.querySelector('.edit-form').appendChild(input);
            e.target.closest('.image-box').remove(); // Remove from view
        }
    });
}
    



    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('image-upload');
    const previewArea = document.getElementById('preview-area');

    let filesToUpload = [];

    // Trigger input when "Browse" is clicked
    dropArea.addEventListener('click', (e) =>{
        if(!e.target.closest('.image-box')){
            fileInput.click()
        }
    });

    // Handle manual file selection
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, e => e.preventDefault());
        dropArea.addEventListener(eventName, e => e.stopPropagation());
    });

    // Highlight drop area
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'));
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'));
    });

    // Handle dropped files
    dropArea.addEventListener('drop', (e) => {
        handleFiles(e.dataTransfer.files);
    });

    // Handle selected or dropped files
    function handleFiles(files) {
        Array.from(files).forEach((file, index)=>{
            filesToUpload.push(file);
            const reader = new FileReader();
            reader.onload = e => {
                const previewBox = document.createElement('div');
                previewBox.classList.add('image-box');
                previewBox.innerHTML = `
                <img src="${e.target.result}" class="preview-img" />
                <button class="delete-btn" data-index="${index}">&#x2715;</button>`;
                previewArea.appendChild(previewBox);
            };
            reader.readAsDataURL(file);
        })

        // Sync files with file input manually
        syncFileInput();
    }

    // Delete previewed image
    previewArea.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const indexToRemove = parseInt(event.target.getAttribute('data-index'));
            filesToUpload.splice(indexToRemove, 1);
            event.target.closest('.image-box').remove(); // Remove from view
        }
    });
    
    // Keep file input in sync
    function syncFileInput() {
        const dataTransfer = new DataTransfer();
        filesToUpload.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
    }