import { SlideManager } from './SlideManager.js';
import { FileHandler } from './FileHandler.js';
import { UIManager } from './UIManager.js';
import { ExportManager } from './ExportManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const slideManager = new SlideManager();
    const uiManager = new UIManager(slideManager);

    // Xử lý nút Upload
    const btnUpload = document.getElementById('btn-upload');
    const uploadInput = document.getElementById('upload-input');

    btnUpload.addEventListener('click', () => uploadInput.click());

    uploadInput.addEventListener('change', (e) => {
        FileHandler.handleUpload(e.target.files, (content, fileName) => {
            slideManager.addSlide(content, fileName);
            uiManager.renderSlideList();
            uiManager.updateWorkspace();
        });
        // Reset input để có thể tải lên file cùng tên lần sau
        uploadInput.value = ''; 
    });

    // Xử lý nút Export
    const btnExport = document.getElementById('btn-export');
    btnExport.addEventListener('click', () => {
        const slides = slideManager.getAllSlides();
        if (slides.length === 0) {
            alert('Vui lòng thêm ít nhất 1 slide trước khi xuất!');
            return;
        }
        ExportManager.exportToReveal(slides);
    });
});
