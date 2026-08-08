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
}
