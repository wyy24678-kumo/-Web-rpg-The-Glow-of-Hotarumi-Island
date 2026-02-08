/**
 * Simple Performance Monitor
 * Usage: Include this script or run snippets in console.
 */

(function() {
    console.log('Starting Performance Monitor...');

    // 1. Paint Timing
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log(`[Perf] ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
            if (entry.name === 'first-contentful-paint' && entry.startTime > 1000) {
                console.warn('⚠️ FCP is slow (> 1s)!');
            }
        }
    });
    observer.observe({ type: 'paint', buffered: true });

    // 2. Resource Timing (Check for heavy assets)
    window.addEventListener('load', () => {
        const resources = performance.getEntriesByType('resource');
        let cssSize = 0;
        resources.forEach(res => {
            if (res.name.endsWith('.css')) {
                // Approximate transfer size if available, else 0 (cross-origin might hide it)
                cssSize += res.transferSize || 0; 
                console.log(`[Resource] ${res.name.split('/').pop()} - ${res.duration.toFixed(2)}ms`);
            }
        });
        
        console.log(`[Perf] Total CSS Transfer Size: ${(cssSize / 1024).toFixed(2)} KB`);
        
        // 3. Lighthouse-like basic checks
        const btns = document.querySelectorAll('button');
        let accessible = true;
        btns.forEach(b => {
            const style = getComputedStyle(b);
            if (style.outlineStyle === 'none' && style.boxShadow === 'none') {
                console.warn('⚠️ Button missing focus ring:', b);
                accessible = false;
            }
        });
        if (accessible) console.log('✅ Basic A11y Check Passed: Buttons have focus styles.');
    });

})();
