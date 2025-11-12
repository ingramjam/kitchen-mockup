// Kitchen Canvas Renderer
class KitchenRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.wallColor = '#f5f5f5';
        this.texture = 'none';
        this.textureOpacity = 1;
        this.lightingIntensity = 1;
        
        // Kitchen elements
        this.kitchenElements = {
            walls: { x: 50, y: 50, width: 700, height: 500 },
            floorBase: { x: 50, y: 550, width: 700, height: 50 },
            counterTop: { x: 200, y: 400, width: 400, height: 100 },
            cabinets: [
                { x: 100, y: 450, width: 100, height: 100, label: 'Cabinet 1' },
                { x: 250, y: 450, width: 100, height: 100, label: 'Cabinet 2' },
                { x: 400, y: 450, width: 100, height: 100, label: 'Cabinet 3' },
                { x: 550, y: 450, width: 100, height: 100, label: 'Cabinet 4' }
            ],
            appliances: [
                { x: 200, y: 350, width: 80, height: 90, label: 'Stove', color: '#444' },
                { x: 350, y: 350, width: 80, height: 90, label: 'Oven', color: '#555' },
                { x: 500, y: 350, width: 80, height: 90, label: 'Microwave', color: '#666' }
            ]
        };
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw walls
        this.drawWalls();

        // Draw floor
        this.drawFloor();

        // Draw cabinets
        this.drawCabinets();

        // Draw appliances
        this.drawAppliances();

        // Draw countertop
        this.drawCountertop();
    }

    drawWalls() {
        const walls = this.kitchenElements.walls;

        // Apply lighting intensity
        const adjustedColor = this.adjustBrightness(this.wallColor, this.lightingIntensity);
        this.ctx.fillStyle = adjustedColor;
        this.ctx.fillRect(walls.x, walls.y, walls.width, walls.height);

        // Apply texture if selected
        if (this.texture !== 'none') {
            this.applyTexture(walls.x, walls.y, walls.width, walls.height);
        }

        // Draw border
        this.ctx.strokeStyle = '#999';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(walls.x, walls.y, walls.width, walls.height);
    }

    drawFloor() {
        const floor = this.kitchenElements.floorBase;
        
        // Floor gradient
        const gradient = this.ctx.createLinearGradient(floor.x, floor.y, floor.x, floor.y + floor.height);
        gradient.addColorStop(0, '#d4af37');
        gradient.addColorStop(1, '#aa8c2a');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(floor.x, floor.y, floor.width, floor.height);

        // Floor tiles pattern
        this.drawFloorTiles(floor.x, floor.y, floor.width, floor.height);
    }

    drawFloorTiles() {
        const floor = this.kitchenElements.floorBase;
        const tileSize = 50;

        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.lineWidth = 1;

        for (let x = floor.x; x < floor.x + floor.width; x += tileSize) {
            for (let y = floor.y; y < floor.y + floor.height; y += tileSize) {
                this.ctx.strokeRect(x, y, tileSize, tileSize);
            }
        }
    }

    drawCabinets() {
        const cabinets = this.kitchenElements.cabinets;

        cabinets.forEach(cabinet => {
            // Cabinet body
            const cabinetColor = this.adjustBrightness('#8B4513', this.lightingIntensity);
            this.ctx.fillStyle = cabinetColor;
            this.ctx.fillRect(cabinet.x, cabinet.y, cabinet.width, cabinet.height);

            // Cabinet border/details
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(cabinet.x, cabinet.y, cabinet.width, cabinet.height);

            // Cabinet door handles
            this.ctx.fillStyle = '#C0C0C0';
            const handleX = cabinet.x + cabinet.width - 15;
            const handleY = cabinet.y + cabinet.height / 2 - 5;
            this.ctx.fillRect(handleX, handleY, 8, 10);
            this.ctx.strokeStyle = '#888';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(handleX, handleY, 8, 10);

            // Door panel line
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(cabinet.x + cabinet.width / 2, cabinet.y + 5);
            this.ctx.lineTo(cabinet.x + cabinet.width / 2, cabinet.y + cabinet.height - 5);
            this.ctx.stroke();
        });
    }

    drawAppliances() {
        const appliances = this.kitchenElements.appliances;

        appliances.forEach(appliance => {
            const adjustedColor = this.adjustBrightness(appliance.color, this.lightingIntensity);
            this.ctx.fillStyle = adjustedColor;
            this.ctx.fillRect(appliance.x, appliance.y, appliance.width, appliance.height);

            // Appliance border
            this.ctx.strokeStyle = '#222';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(appliance.x, appliance.y, appliance.width, appliance.height);

            // Appliance details (stove burners, oven door handle, etc)
            if (appliance.label === 'Stove') {
                this.drawStoveDetails(appliance);
            } else if (appliance.label === 'Oven') {
                this.drawOvenDetails(appliance);
            }

            // Label
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 11px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(appliance.label, appliance.x + appliance.width / 2, appliance.y + appliance.height + 15);
        });
    }

    drawStoveDetails(appliance) {
        // Draw burner circles
        const burnerRadius = 8;
        const burners = [
            { x: appliance.x + 15, y: appliance.y + 15 },
            { x: appliance.x + 55, y: appliance.y + 15 },
            { x: appliance.x + 15, y: appliance.y + 55 },
            { x: appliance.x + 55, y: appliance.y + 55 }
        ];

        burners.forEach(burner => {
            this.ctx.fillStyle = '#333';
            this.ctx.beginPath();
            this.ctx.arc(burner.x, burner.y, burnerRadius, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.strokeStyle = '#111';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });
    }

    drawOvenDetails(appliance) {
        // Oven door
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(appliance.x + 5, appliance.y + 30, appliance.width - 10, appliance.height - 40);

        // Window
        this.ctx.fillStyle = '#ffeb3b';
        this.ctx.fillRect(appliance.x + 15, appliance.y + 40, appliance.width - 30, 30);
    }

    drawCountertop() {
        const counter = this.kitchenElements.counterTop;
        
        // Countertop surface
        const gradient = this.ctx.createLinearGradient(counter.x, counter.y, counter.x, counter.y + counter.height);
        gradient.addColorStop(0, '#e8d5b7');
        gradient.addColorStop(1, '#d4c5a0');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(counter.x, counter.y, counter.width, counter.height);

        // Counter edge shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(counter.x, counter.y + counter.height - 3, counter.width, 3);

        // Countertop border
        this.ctx.strokeStyle = '#999';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(counter.x, counter.y, counter.width, counter.height);
    }

    applyTexture(x, y, width, height) {
        switch (this.texture) {
            case 'wood':
                this.drawWoodTexture(x, y, width, height);
                break;
            case 'tile':
                this.drawTileTexture(x, y, width, height);
                break;
            case 'marble':
                this.drawMarbleTexture(x, y, width, height);
                break;
            case 'paint':
                this.drawPaintTexture(x, y, width, height);
                break;
        }
    }

    drawWoodTexture(x, y, width, height) {
        this.ctx.globalAlpha = this.textureOpacity;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';

        for (let i = 0; i < height; i += 2) {
            if (Math.random() > 0.5) {
                this.ctx.fillRect(x, y + i, width, 1);
            }
        }

        this.ctx.globalAlpha = 1;
    }

    drawTileTexture(x, y, width, height) {
        this.ctx.globalAlpha = this.textureOpacity;
        const tileSize = 40;

        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.lineWidth = 2;

        for (let tx = x; tx < x + width; tx += tileSize) {
            for (let ty = y; ty < y + height; ty += tileSize) {
                this.ctx.strokeRect(tx, ty, tileSize, tileSize);

                // Grout shadow
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                this.ctx.fillRect(tx, ty + tileSize - 1, tileSize, 1);
                this.ctx.fillRect(tx + tileSize - 1, ty, 1, tileSize);
            }
        }

        this.ctx.globalAlpha = 1;
    }

    drawMarbleTexture(x, y, width, height) {
        this.ctx.globalAlpha = this.textureOpacity;

        // Random veining
        for (let i = 0; i < 15; i++) {
            const startX = x + Math.random() * width;
            const startY = y + Math.random() * height;
            const veinLength = Math.random() * 100 + 50;
            const angle = Math.random() * Math.PI * 2;

            this.ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.1})`;
            this.ctx.lineWidth = Math.random() * 2 + 1;
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(startX + Math.cos(angle) * veinLength, startY + Math.sin(angle) * veinLength);
            this.ctx.stroke();
        }

        this.ctx.globalAlpha = 1;
    }

    drawPaintTexture(x, y, width, height) {
        this.ctx.globalAlpha = this.textureOpacity;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';

        // Subtle stipple pattern
        for (let i = 0; i < width * height / 200; i++) {
            const px = x + Math.random() * width;
            const py = y + Math.random() * height;
            const size = Math.random() * 2 + 1;
            this.ctx.fillRect(px, py, size, size);
        }

        this.ctx.globalAlpha = 1;
    }

    adjustBrightness(color, intensity) {
        // Convert hex to RGB, adjust brightness, convert back
        const num = parseInt(color.replace('#', ''), 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;

        const newR = Math.min(255, Math.floor(r * intensity));
        const newG = Math.min(255, Math.floor(g * intensity));
        const newB = Math.min(255, Math.floor(b * intensity));

        return `rgb(${newR}, ${newG}, ${newB})`;
    }

    setWallColor(color) {
        this.wallColor = color;
        this.render();
    }

    setTexture(texture) {
        this.texture = texture;
        this.render();
    }

    setTextureOpacity(opacity) {
        this.textureOpacity = opacity / 100;
        this.render();
    }

    setLightingIntensity(intensity) {
        this.lightingIntensity = intensity / 100;
        this.render();
    }

    exportDesign() {
        const link = document.createElement('a');
        link.href = this.canvas.toDataURL('image/png');
        link.download = `kitchen-design-${new Date().getTime()}.png`;
        link.click();
    }

    resetDesign() {
        this.wallColor = '#f5f5f5';
        this.texture = 'none';
        this.textureOpacity = 1;
        this.lightingIntensity = 1;

        // Reset UI
        document.getElementById('wallColorPicker').value = '#f5f5f5';
        document.getElementById('colorValue').textContent = '#f5f5f5';
        document.getElementById('textureSelect').value = 'none';
        document.getElementById('textureOpacity').value = 100;
        document.getElementById('opacityValue').textContent = '100%';
        document.getElementById('lightingIntensity').value = 100;
        document.getElementById('brightnessValue').textContent = '100%';

        this.render();
    }
}

// AI Design Helper
class AIDesignHelper {
    constructor() {
        this.suggestions = [
            "Try a soft sage green (#9fbc8f) for a modern, calming aesthetic with warm wood tones.",
            "Consider a crisp white (#ffffff) with marble tile texture for a luxury contemporary look.",
            "Warm cream (#f5deb3) with wood grain texture creates a cozy, traditional kitchen feel.",
            "A light gray (#d3d3d3) with subway tile texture offers a clean, Scandinavian design.",
            "Soft blue (#add8e6) with matte paint texture provides a coastal, refreshing atmosphere.",
            "Warm beige (#f5e6d3) works beautifully with natural lighting for a timeless design."
        ];
    }

    getSuggestions() {
        return this.suggestions[Math.floor(Math.random() * this.suggestions.length)];
    }
}

// Initialize Application
let renderer;
let aiHelper;

document.addEventListener('DOMContentLoaded', () => {
    renderer = new KitchenRenderer('kitchenCanvas');
    aiHelper = new AIDesignHelper();

    // Initial render
    renderer.render();

    // Event Listeners - Color Picker
    const wallColorPicker = document.getElementById('wallColorPicker');
    const colorValue = document.getElementById('colorValue');

    wallColorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        colorValue.textContent = color;
        renderer.setWallColor(color);
    });

    // Event Listeners - Texture Select
    const textureSelect = document.getElementById('textureSelect');
    textureSelect.addEventListener('change', (e) => {
        renderer.setTexture(e.target.value);
    });

    // Event Listeners - Texture Opacity
    const textureOpacity = document.getElementById('textureOpacity');
    const opacityValue = document.getElementById('opacityValue');

    textureOpacity.addEventListener('input', (e) => {
        const value = e.target.value;
        opacityValue.textContent = value + '%';
        renderer.setTextureOpacity(value);
    });

    // Event Listeners - Lighting Intensity
    const lightingIntensity = document.getElementById('lightingIntensity');
    const brightnessValue = document.getElementById('brightnessValue');

    lightingIntensity.addEventListener('input', (e) => {
        const value = e.target.value;
        brightnessValue.textContent = value + '%';
        renderer.setLightingIntensity(value);
    });

    // Event Listeners - Buttons
    document.getElementById('exportBtn').addEventListener('click', () => {
        renderer.exportDesign();
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        renderer.resetDesign();
    });

    document.getElementById('aiSuggestBtn').addEventListener('click', () => {
        const suggestion = aiHelper.getSuggestions();
        const suggestionDiv = document.getElementById('aiSuggestions');
        const suggestionText = document.getElementById('suggestionText');

        suggestionText.textContent = suggestion;
        suggestionDiv.style.display = 'block';
    });

    document.getElementById('shareBtn').addEventListener('click', () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: 'My Kitchen Design',
                text: 'Check out my custom kitchen design!',
                url: url
            });
        } else {
            alert('Share URL: ' + url);
        }
    });
});
