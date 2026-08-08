export class ExportManager {
    static exportToReveal(slides) {
        let sectionsHTML = slides.map(slide => `
            <section>
                ${slide.content}
            </section>
        `).join('\n');

        const htmlTemplate = `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Presentation</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reset.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reveal.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/theme/black.css" id="theme">
    </head>
    <body>
        <div class="reveal">
            <div class="slides">
                ${sectionsHTML}
            </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reveal.js"></script>
        <script>
            Reveal.initialize();
        </script>
    </body>
</html>`;

        const blob = new Blob([htmlTemplate], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'presentation.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
