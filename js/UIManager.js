export class UIManager {
    constructor(slideManager) {
        this.slideManager = slideManager;
        
        // DOM Elements
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
        
        // Tự động lưu nội dung code khi người dùng gõ
        this.codeEditor.addEventListener('input', (e) => {
            this.slideManager.updateActiveSlideContent(e.target.value);
            this.previewContainer.innerHTML = e.target.value; // Cập nhật preview realtime
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

    renderSlideList() {
        this.slideListEl.innerHTML = '';
        const slides = this.slideManager.getAllSlides();
        
        slides.forEach((slide, index) => {
            const slideItem = document.createElement('div');
            slideItem.className = `slide-item ${index === this.slideManager.activeSlideIndex ? 'active' : ''}`;
            slideItem.innerText = `Slide ${index + 1}: ${slide.name}`;
            
            slideItem.addEventListener('click', () => {
                this.slideManager.setActiveSlide(index);
                this.updateWorkspace();
                this.renderSlideList();
            });
            
            this.slideListEl.appendChild(slideItem);
        });
    }

    updateWorkspace() {
        const activeSlide = this.slideManager.getActiveSlide();
        if (activeSlide) {
            this.previewContainer.innerHTML = activeSlide.content;
            this.codeEditor.value = activeSlide.content;
        }
    }
}
