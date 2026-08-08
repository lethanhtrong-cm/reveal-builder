export class SlideManager {
    constructor() {
        this.slides = [];
        this.activeSlideIndex = null;
    }

    addSlide(content, name) {
        this.slides.push({
            name: name || `Slide ${this.slides.length + 1}`,
            content: content
        });
        if (this.activeSlideIndex === null) {
            this.activeSlideIndex = 0;
        }
    }

    updateActiveSlideContent(newContent) {
        if (this.activeSlideIndex !== null && this.slides[this.activeSlideIndex]) {
            this.slides[this.activeSlideIndex].content = newContent;
        }
    }

    setActiveSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.activeSlideIndex = index;
        }
    }

    getActiveSlide() {
        if (this.activeSlideIndex !== null) {
            return this.slides[this.activeSlideIndex];
        }
        return null;
    }

    getAllSlides() {
        return this.slides;
    }

    // --- Phương thức mới thêm vào ---
    reorderSlides(fromIndex, toIndex) {
        // Cắt slide ở vị trí cũ
        const [movedSlide] = this.slides.splice(fromIndex, 1);
        // Chèn slide vào vị trí mới
        this.slides.splice(toIndex, 0, movedSlide);
        // Cập nhật lại activeSlideIndex để hiển thị đúng slide đang kéo
        this.activeSlideIndex = toIndex;
    }
}
