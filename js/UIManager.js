export class UIManager {
    constructor(slideManager) {
        this.slideManager = slideManager;
        this.slideListEl = document.getElementById('slide-list');
        this.previewContainer = document.getElementById('preview-container');
        this.codeEditor = document.getElementById('code-editor');
        this.tabPreview = document.getElementById('tab-preview');
        this.tabCode = document.getElementById('tab-code');
        
        this.initEvents();
    }

    initEvents() {
        this.tabPreview.addEventListener('click', () => this.switchTab('preview'));
        this.tabCode.addEventListener('click', () => this.switchTab('code'));
        
        this.codeEditor.addEventListener('input', (e) => {
            this.slideManager.updateActiveSlideContent(e.target.value);
            this.previewContainer.innerHTML = e.target.value; 
        });
    }

    switchTab(tab) {
        if (tab === 'preview') {
            this.tabPreview.classList.add('active');
            this.tabCode.classList.remove('active');
            this.previewContainer.classList.replace('hidden-view', 'active-view');
            this.codeEditor.classList.replace('active-view', 'hidden-view');
        } else {
            this.tabCode.classList.add('active');
            this.tabPreview.classList.remove('active');
            this.codeEditor.classList.replace('hidden-view', 'active-view');
            this.previewContainer.classList.replace('active-view', 'hidden-view');
        }
    }

    // --- Phương thức renderSlideList được cập nhật ---
    renderSlideList() {
        this.slideListEl.innerHTML = '';
        const slides = this.slideManager.getAllSlides();
        
        slides.forEach((slide, index) => {
            const slideItem = document.createElement('div');
            slideItem.className = `slide-item ${index === this.slideManager.activeSlideIndex ? 'active' : ''}`;
            // Đánh số thứ tự mới dựa trên vị trí mảng
            slideItem.innerText = `Slide ${index + 1}: ${slide.name}`; 
            
            // 1. Kích hoạt thuộc tính kéo thả
            slideItem.draggable = true;
            
            // Xử lý sự kiện click
            slideItem.addEventListener('click', () => {
                this.slideManager.setActiveSlide(index);
                this.updateWorkspace();
                this.renderSlideList();
            });
            
            // 2. Khi bắt đầu kéo
            slideItem.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', index);
                setTimeout(() => slideItem.classList.add('dragging'), 0);
            });

            // 3. Khi kết thúc kéo
            slideItem.addEventListener('dragend', () => {
                slideItem.classList.remove('dragging');
                this.removeDragOverClasses();
            });

            // 4. Khi kéo lướt qua một slide khác (Bắt buộc phải có preventDefault để cho phép drop)
            slideItem.addEventListener('dragover', (e) => {
                e.preventDefault(); 
                slideItem.classList.add('drag-over');
            });

            // 5. Khi kéo ra khỏi một slide khác
            slideItem.addEventListener('dragleave', () => {
                slideItem.classList.remove('drag-over');
            });

            // 6. Khi thả slide xuống
            slideItem.addEventListener('drop', (e) => {
                e.preventDefault();
                slideItem.classList.remove('drag-over');
                
                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const toIndex = index;

                if (fromIndex !== toIndex) {
                    this.slideManager.reorderSlides(fromIndex, toIndex);
                    this.updateWorkspace();
                    this.renderSlideList(); // Render lại danh sách để cập nhật số thứ tự
                }
            });

            this.slideListEl.appendChild(slideItem);
        });
    }

    // Tiện ích xóa class hiệu ứng
    removeDragOverClasses() {
        const items = this.slideListEl.querySelectorAll('.slide-item');
        items.forEach(item => item.classList.remove('drag-over'));
    }

    updateWorkspace() {
        const activeSlide = this.slideManager.getActiveSlide();
        if (activeSlide) {
            this.previewContainer.innerHTML = activeSlide.content;
            this.codeEditor.value = activeSlide.content;
        }
    }
}
