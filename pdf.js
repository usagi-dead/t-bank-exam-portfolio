document.getElementById('download-pdf').addEventListener('click', async function () {
    const btn = this;
    const element = document.querySelector('.main-container');

    btn.disabled = true;
    btn.textContent = 'Generating...';

    try {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            unit: 'px',
            format: [ canvas.width, canvas.height ]
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
        pdf.save('portfolio.pdf');

    } catch (err) {
        console.error(err);
        alert('Error generating PDF');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Download PDF';
    }
});