export class FileHandler {
    static handleUpload(files, onFileRead) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                onFileRead(content, file.name);
            };
            reader.readAsText(file);
        });
    }
}
