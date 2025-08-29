/**
 * @jest-environment jsdom
 */

require('./utils.js');

describe('updateProgressBar - progressPercentage', () => {
    const setupDOM = () => {
        document.body.innerHTML = `
            <div class="progress-bar" role="progressbar" aria-valuenow="0">
                <div id="progressFill" style="width:0%"></div>
                <span id="progressPercentage">0%</span>
            </div>
        `;
    };

    beforeEach(() => {
        setupDOM();
    });

    test('sets progressPercentage to 0% when current is 0', () => {
        window.updateProgressBar(0, 3);
        const progressPercentage = document.getElementById('progressPercentage');
        expect(progressPercentage.textContent).toBe('0%');
    });

    test('rounds down correctly (1/3 -> 33%) and updates aria-valuenow', () => {
        window.updateProgressBar(1, 3);
        const progressPercentage = document.getElementById('progressPercentage');
        const progressFill = document.getElementById('progressFill');
        const progressBar = document.querySelector('.progress-bar');

        expect(progressPercentage.textContent).toBe('33%');
        expect(progressFill.style.width).toBe('33%');
        expect(progressBar.getAttribute('aria-valuenow')).toBe('33');
    });

    test('rounds up correctly (2/3 -> 67%)', () => {
        window.updateProgressBar(2, 3);
        const progressPercentage = document.getElementById('progressPercentage');
        const progressFill = document.getElementById('progressFill');
        const progressBar = document.querySelector('.progress-bar');

        expect(progressPercentage.textContent).toBe('67%');
        expect(progressFill.style.width).toBe('67%');
        expect(progressBar.getAttribute('aria-valuenow')).toBe('67');
    });

    test('sets progressPercentage to 100% when complete', () => {
        window.updateProgressBar(5, 5);
        const progressPercentage = document.getElementById('progressPercentage');
        const progressFill = document.getElementById('progressFill');
        const progressBar = document.querySelector('.progress-bar');

        expect(progressPercentage.textContent).toBe('100%');
        expect(progressFill.style.width).toBe('100%');
        expect(progressBar.getAttribute('aria-valuenow')).toBe('100');
    });

    test('does nothing when progressPercentage element is missing', () => {
        // Remove progressPercentage only
        document.getElementById('progressPercentage').remove();
        const progressFill = document.getElementById('progressFill');
        const initialWidth = progressFill.style.width;

        expect(() => window.updateProgressBar(1, 2)).not.toThrow();
        // Since the guard requires both elements, width should remain unchanged
        expect(progressFill.style.width).toBe(initialWidth);
    });
});