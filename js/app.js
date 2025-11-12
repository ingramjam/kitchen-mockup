// Luxe Kitchen Designer - Professional Canvas Renderer
// Global renderer and AI assistant
let renderer;
let aiAssistant;

class LuxeKitchenRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.devicePixelRatio = window.devicePixelRatio || 1;
        
        // Initialize canvas with high DPI support
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Design state
        this.design = {
            cabinetStyle: 'modern',
            cabinetColor: '#2c2c2c',
            countertop: 'granite',
            backsplash: 'subway',
            backsplashColor: '#ffffff',
            flooring: 'oak',
            wallColor: '#f5f5f5',
            brightness: 100,
            contrast: 100,
            islandEnabled: false,
            backsplashEnabled: true
        };

        // Material definitions
        this.materials = {
            granite: { colors: ['#3a3a3a', '#5a5a5a', '#7a7a7a'], name: 'Granite' },
            quartz: { colors: ['#e8e8e8', '#d0d0d0', '#c0c0c0'], name: 'Quartz' },
            marble: { colors: ['#f5f5f5', '#d0d0d0', '#b0a0a0'], name: 'Marble' },
            wood: { colors: ['#8b6914', '#a0671a', '#6b4423'], name: 'Butcher Block' }
        };
    }

    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width * this.devicePixelRatio;
        this.canvas.height = rect.height * this.devicePixelRatio;
        this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
        this.render();
    }

    render() {
        const width = this.canvas.width / this.devicePixelRatio;
        const height = this.canvas.height / this.devicePixelRatio;

        // Clear canvas
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, width, height);

        // Apply lighting
        this.applyLighting(width, height);

        // Draw background walls
        this.drawWalls(width, height);

        // Draw floor
        this.drawFloor(width, height);

        // Draw cabinets
        this.drawCabinets(width, height);

        // Draw countertop
        this.drawCountertop(width, height);

        // Draw backsplash
        if (this.design.backsplashEnabled) {
            this.drawBacksplash(width, height);
        }

        // Draw appliances
        this.drawAppliances(width, height);

        // Draw island if enabled
        if (this.design.islandEnabled) {
            this.drawIsland(width, height);
        }

        // Draw accents
        this.drawAccents(width, height);
    }

    applyLighting(width, height) {
        const brightness = this.design.brightness / 100;
        const contrast = this.design.contrast / 100;

        // Create gradient overlay for lighting
        const lightingOverlay = this.ctx.createLinearGradient(0, 0, 0, height);
        const alpha = Math.max(0, 0.02 - (brightness - 1) * 0.01);
        lightingOverlay.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        lightingOverlay.addColorStop(1, `rgba(0, 0, 0, ${Math.max(0, 0.05 - brightness * 0.02)})`);

        this.ctx.fillStyle = lightingOverlay;
        this.ctx.fillRect(0, 0, width, height);
    }

    drawWalls(width, height) {
        const wallColor = this.design.wallColor;
        
        // Adjust brightness/contrast
        const adjusted = this.adjustColor(wallColor, this.design.brightness, this.design.contrast);
        this.ctx.fillStyle = adjusted;
        this.ctx.fillRect(0, 0, width, height);

        // Subtle texture
        this.drawWallTexture(width, height);
    }

    drawWallTexture(width, height) {
        this.ctx.globalAlpha = 0.03;
        this.ctx.fillStyle = '#000000';

        for (let x = 0; x < width; x += 4) {
            for (let y = 0; y < height; y += 4) {
                if (Math.random() > 0.7) {
                    this.ctx.fillRect(x, y, 2, 2);
                }
            }
        }
        this.ctx.globalAlpha = 1;
    }

    drawFloor(width, height) {
        const floorY = height * 0.75;
        const floorHeight = height * 0.25;

        // Wood floor gradient
        const floorGradient = this.ctx.createLinearGradient(0, floorY, 0, floorY + floorHeight);
        
        const woodColors = {
            oak: ['#d4a574', '#c9956f', '#b8845f'],
            walnut: ['#6b5344', '#5c3d2e', '#4a2c1a'],
            tile: ['#9c9c9c', '#808080', '#666666'],
            concrete: ['#8b8b8b', '#757575', '#5a5a5a']
        };

        const floorColor = woodColors[this.design.flooring][1];
        const adjusted = this.adjustColor(floorColor, this.design.brightness, this.design.contrast);
        this.ctx.fillStyle = adjusted;
        this.ctx.fillRect(0, floorY, width, floorHeight);

        // Floor pattern
        this.drawFloorPattern(width, floorY, floorHeight);
    }

    drawFloorPattern(width, startY, height) {
        const tileSize = 60;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
        this.ctx.lineWidth = 1;

        for (let x = 0; x < width; x += tileSize) {
            for (let y = startY; y < startY + height; y += tileSize) {
                this.ctx.strokeRect(x, y, tileSize, tileSize);
            }
        }
    }

    drawCabinets(width, height) {
        const cabinetHeight = height * 0.35;
        const cabinetY = height * 0.4;
        const cabinetPadding = width * 0.1;

        // Left cabinets
        this.drawCabinetRow(
            cabinetPadding,
            cabinetY,
            width * 0.35,
            cabinetHeight,
            this.design.cabinetStyle,
            this.design.cabinetColor
        );

        // Right cabinets
        this.drawCabinetRow(
            width * 0.65 - cabinetPadding,
            cabinetY,
            width * 0.35,
            cabinetHeight,
            this.design.cabinetStyle,
            this.design.cabinetColor
        );
    }

    drawCabinetRow(x, y, width, height, style, color) {
        const cabinetCount = 3;
        const cabinetWidth = (width - 10) / cabinetCount;

        for (let i = 0; i < cabinetCount; i++) {
            const cabinetX = x + (i * (cabinetWidth + 5));
            this.drawSingleCabinet(cabinetX, y, cabinetWidth, height, style, color);
        }
    }

    drawSingleCabinet(x, y, width, height, style, color) {
        const adjusted = this.adjustColor(color, this.design.brightness, this.design.contrast);
        
        // Cabinet body
        this.ctx.fillStyle = adjusted;
        this.ctx.fillRect(x, y, width, height);

        // Cabinet border
        this.ctx.strokeStyle = this.darkenColor(adjusted, 0.2);
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, width, height);

        // Cabinet doors
        const doorMargin = width * 0.05;
        const doorWidth = (width - doorMargin * 3) / 2;
        const doorHeight = height * 0.7;

        // Left door
        this.drawCabinetDoor(x + doorMargin, y + doorMargin, doorWidth, doorHeight, style, adjusted);

        // Right door
        this.drawCabinetDoor(x + doorMargin * 2 + doorWidth, y + doorMargin, doorWidth, doorHeight, style, adjusted);

        // Bottom panel
        const panelY = y + doorHeight + doorMargin * 2;
        this.ctx.fillStyle = this.darkenColor(adjusted, 0.1);
        this.ctx.fillRect(x + doorMargin, panelY, width - doorMargin * 2, height - panelY + y);

        // Handles
        this.drawCabinetHandle(x + doorMargin + doorWidth / 2, y + height / 3);
        this.drawCabinetHandle(x + doorMargin * 2 + doorWidth + doorWidth / 2, y + height / 3);
    }

    drawCabinetDoor(x, y, width, height, style, baseColor) {
        // Door panel
        this.ctx.fillStyle = baseColor;
        this.ctx.fillRect(x, y, width, height);

        // Door frame
        this.ctx.strokeStyle = this.darkenColor(baseColor, 0.15);
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, width, height);

        // Door detail line
        if (style === 'modern') {
            this.ctx.strokeStyle = this.darkenColor(baseColor, 0.08);
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(x + width / 2, y);
            this.ctx.lineTo(x + width / 2, y + height);
            this.ctx.stroke();
        } else if (style === 'traditional') {
            // Panel frame
            this.ctx.strokeStyle = this.darkenColor(baseColor, 0.1);
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(x + width * 0.1, y + height * 0.1, width * 0.8, height * 0.8);
        }
    }

    drawCabinetHandle(x, y) {
        this.ctx.fillStyle = '#c0c0c0';
        this.ctx.fillRect(x - 3, y - 5, 6, 10);
        this.ctx.strokeStyle = '#888';
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeRect(x - 3, y - 5, 6, 10);
    }

    drawCountertop(width, height) {
        const counterY = height * 0.75;
        const counterHeight = height * 0.03;
        const counterX = width * 0.1;
        const counterWidth = width * 0.8;

        // Countertop material
        const material = this.materials[this.design.countertop];
        const color = material.colors[1];
        const adjusted = this.adjustColor(color, this.design.brightness, this.design.contrast);

        this.ctx.fillStyle = adjusted;
        this.ctx.fillRect(counterX, counterY, counterWidth, counterHeight);

        // Countertop shadow/depth
        this.ctx.fillStyle = this.darkenColor(adjusted, 0.2);
        this.ctx.fillRect(counterX, counterY + counterHeight, counterWidth, 2);

        // Surface texture
        this.drawCountertopTexture(counterX, counterY, counterWidth, counterHeight);
    }

    drawCountertopTexture(x, y, width, height) {
        const material = this.design.countertop;
        this.ctx.globalAlpha = 0.15;

        if (material === 'granite') {
            this.ctx.fillStyle = '#000000';
            for (let i = 0; i < 200; i++) {
                this.ctx.fillRect(
                    x + Math.random() * width,
                    y + Math.random() * height,
                    Math.random() * 2,
                    Math.random() * 2
                );
            }
        } else if (material === 'marble') {
            this.ctx.strokeStyle = '#888888';
            this.ctx.lineWidth = 0.5;
            for (let i = 0; i < 5; i++) {
                const startX = x + Math.random() * width;
                const startY = y + Math.random() * height;
                this.ctx.beginPath();
                this.ctx.moveTo(startX, startY);
                this.ctx.lineTo(startX + Math.random() * 100, startY + Math.random() * 20);
                this.ctx.stroke();
            }
        }

        this.ctx.globalAlpha = 1;
    }

    drawBacksplash(width, height) {
        const backsplashHeight = height * 0.15;
        const backsplashY = height * 0.4;
        const backsplashX = width * 0.1;
        const backsplashWidth = width * 0.8;

        const adjusted = this.adjustColor(this.design.backsplashColor, this.design.brightness, this.design.contrast);
        this.ctx.fillStyle = adjusted;
        this.ctx.fillRect(backsplashX, backsplashY, backsplashWidth, backsplashHeight);

        // Pattern based on type
        this.drawBacksplashPattern(backsplashX, backsplashY, backsplashWidth, backsplashHeight);
    }

    drawBacksplashPattern(x, y, width, height) {
        const type = this.design.backsplash;

        if (type === 'subway') {
            this.drawSubwayTiles(x, y, width, height);
        } else if (type === 'herringbone') {
            this.drawHerringbonePattern(x, y, width, height);
        } else if (type === 'glass') {
            this.drawGlassTiles(x, y, width, height);
        } else if (type === 'marble') {
            this.drawMarbleTiles(x, y, width, height);
        }
    }

    drawSubwayTiles(x, y, width, height) {
        const tileWidth = 30;
        const tileHeight = 20;
        const groutSize = 1;

        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.lineWidth = groutSize;

        for (let tx = x; tx < x + width; tx += tileWidth + groutSize) {
            for (let ty = y; ty < y + height; ty += tileHeight + groutSize) {
                this.ctx.strokeRect(tx, ty, tileWidth, tileHeight);
            }
        }
    }

    drawHerringbonePattern(x, y, width, height) {
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.lineWidth = 1;

        const tileWidth = 25;
        const tileHeight = 15;

        for (let row = 0; row < height / tileHeight; row++) {
            const offset = row % 2 === 0 ? 0 : tileWidth / 2;
            for (let col = 0; col < width / tileWidth + 2; col++) {
                const tx = x + offset + col * tileWidth;
                const ty = y + row * tileHeight;
                this.ctx.save();
                this.ctx.translate(tx + tileWidth / 2, ty + tileHeight / 2);
                this.ctx.rotate(Math.PI / 4);
                this.ctx.strokeRect(-tileWidth / 2, -tileHeight / 2, tileWidth, tileHeight);
                this.ctx.restore();
            }
        }
    }

    drawGlassTiles(x, y, width, height) {
        this.ctx.globalAlpha = 0.1;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(x, y, width, height);

        this.ctx.globalAlpha = 0.3;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;

        const tileSize = 30;
        for (let tx = x; tx < x + width; tx += tileSize) {
            for (let ty = y; ty < y + height; ty += tileSize) {
                this.ctx.strokeRect(tx, ty, tileSize, tileSize);
            }
        }
        this.ctx.globalAlpha = 1;
    }

    drawMarbleTiles(x, y, width, height) {
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.lineWidth = 1;

        const tileSize = 40;
        for (let tx = x; tx < x + width; tx += tileSize) {
            for (let ty = y; ty < y + height; ty += tileSize) {
                this.ctx.strokeRect(tx, ty, tileSize, tileSize);

                // Vein pattern
                this.ctx.globalAlpha = 0.1;
                for (let i = 0; i < 3; i++) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(tx + Math.random() * tileSize, ty);
                    this.ctx.lineTo(tx + Math.random() * tileSize, ty + tileSize);
                    this.ctx.stroke();
                }
                this.ctx.globalAlpha = 1;
            }
        }
    }

    drawAppliances(width, height) {
        const applianceY = height * 0.45;
        const applianceHeight = height * 0.25;
        const spacing = width * 0.1;

        // Stove
        this.drawStove(spacing, applianceY, width * 0.2, applianceHeight);

        // Refrigerator
        this.drawRefrigerator(spacing * 3 + width * 0.2, applianceY, width * 0.2, applianceHeight);

        // Dishwasher
        this.drawDishwasher(spacing * 5 + width * 0.4, applianceY, width * 0.15, applianceHeight);
    }

    drawStove(x, y, width, height) {
        const color = '#333333';
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);

        // Burners
        const burnerRadius = width * 0.08;
        const burners = [
            { x: x + width * 0.2, y: y + height * 0.15 },
            { x: x + width * 0.6, y: y + height * 0.15 },
            { x: x + width * 0.2, y: y + height * 0.45 },
            { x: x + width * 0.6, y: y + height * 0.45 }
        ];

        burners.forEach(burner => {
            this.ctx.fillStyle = '#111111';
            this.ctx.beginPath();
            this.ctx.arc(burner.x, burner.y, burnerRadius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawRefrigerator(x, y, width, height) {
        const color = '#4a4a4a';
        const adjusted = this.adjustColor(color, this.design.brightness, this.design.contrast);
        this.ctx.fillStyle = adjusted;
        this.ctx.fillRect(x, y, width, height);

        // Door
        this.ctx.strokeStyle = '#888';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x + 2, y + 2, width - 4, height - 4);

        // Handle
        this.ctx.fillStyle = '#888';
        this.ctx.fillRect(x + width - 8, y + height / 2 - 10, 4, 20);
    }

    drawDishwasher(x, y, width, height) {
        const color = '#5a5a5a';
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);

        // Controls
        this.ctx.fillStyle = '#888';
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.arc(x + width * 0.3 + i * width * 0.2, y + height * 0.2, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawIsland(width, height) {
        const islandWidth = width * 0.3;
        const islandHeight = height * 0.15;
        const islandX = (width - islandWidth) / 2;
        const islandY = height * 0.65;

        // Island base
        const adjusted = this.adjustColor(this.design.cabinetColor, this.design.brightness, this.design.contrast);
        this.ctx.fillStyle = adjusted;
        this.ctx.fillRect(islandX, islandY, islandWidth, islandHeight);

        // Island border
        this.ctx.strokeStyle = this.darkenColor(adjusted, 0.2);
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(islandX, islandY, islandWidth, islandHeight);

        // Island countertop
        const material = this.materials[this.design.countertop];
        const color = material.colors[1];
        const adjColor = this.adjustColor(color, this.design.brightness, this.design.contrast);
        this.ctx.fillStyle = adjColor;
        this.ctx.fillRect(islandX - 10, islandY - 5, islandWidth + 20, 5);
    }

    drawAccents(width, height) {
        // Light gradient for depth
        const accent = this.ctx.createRadialGradient(width / 2, height / 3, 0, width / 2, height / 2, width);
        accent.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
        accent.addColorStop(1, 'rgba(0, 0, 0, 0.02)');

        this.ctx.globalAlpha = 0.3;
        this.ctx.fillStyle = accent;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.globalAlpha = 1;
    }

    // Utility methods
    adjustColor(color, brightness, contrast) {
        const rgb = this.hexToRgb(color);
        const b = brightness / 100;
        const c = contrast / 100;

        const adjusted = {
            r: Math.min(255, Math.max(0, (rgb.r - 128) * c + 128 * b)),
            g: Math.min(255, Math.max(0, (rgb.g - 128) * c + 128 * b)),
            b: Math.min(255, Math.max(0, (rgb.b - 128) * c + 128 * b))
        };

        return `rgb(${Math.round(adjusted.r)}, ${Math.round(adjusted.g)}, ${Math.round(adjusted.b)})`;
    }

    darkenColor(color, amount) {
        const rgb = this.parseRgb(color);
        return `rgb(${Math.max(0, rgb.r - rgb.r * amount)}, ${Math.max(0, rgb.g - rgb.g * amount)}, ${Math.max(0, rgb.b - rgb.b * amount)})`;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    parseRgb(rgb) {
        const match = rgb.match(/\d+/g);
        return { r: parseInt(match[0]), g: parseInt(match[1]), b: parseInt(match[2]) };
    }

    exportDesign() {
        const link = document.createElement('a');
        link.href = this.canvas.toDataURL('image/png', 1);
        link.download = `kitchen-design-${new Date().getTime()}.png`;
        link.click();
    }

    resetDesign() {
        this.design = {
            cabinetStyle: 'modern',
            cabinetColor: '#2c2c2c',
            countertop: 'granite',
            backsplash: 'subway',
            backsplashColor: '#ffffff',
            flooring: 'oak',
            wallColor: '#f5f5f5',
            brightness: 100,
            contrast: 100,
            islandEnabled: false,
            backsplashEnabled: true
        };
        this.render();
    }
}

// AI Design Suggestions
class AIDesignAssistant {
    constructor() {
        this.suggestions = [
            {
                title: "Modern Minimalist",
                description: "Create a sleek, contemporary look with charcoal cabinets (#2c2c2c), quartz countertops, and subway tile backsplash. Pair with white walls for maximum contrast and clean lines.",
                settings: {
                    cabinetStyle: 'modern',
                    cabinetColor: '#2c2c2c',
                    countertop: 'quartz',
                    backsplash: 'subway',
                    backsplashColor: '#ffffff',
                    wallColor: '#ffffff'
                }
            },
            {
                title: "Warm Traditional",
                description: "Embrace elegance with natural oak cabinets, marble countertops, and herringbone backsplash. Combine with cream walls to create a timeless, sophisticated kitchen.",
                settings: {
                    cabinetStyle: 'traditional',
                    cabinetColor: '#8b7355',
                    countertop: 'marble',
                    backsplash: 'herringbone',
                    backsplashColor: '#e8d5b7',
                    wallColor: '#f5ead6'
                }
            },
            {
                title: "Contemporary Luxe",
                description: "Achieve sophistication with dark espresso cabinets, granite countertops, and glass backsplash. Use soft gray walls with enhanced lighting for a premium feel.",
                settings: {
                    cabinetStyle: 'contemporary',
                    cabinetColor: '#5c4033',
                    countertop: 'granite',
                    backsplash: 'glass',
                    backsplashColor: '#e8e8e8',
                    wallColor: '#d4d4d4',
                    brightness: 110
                }
            },
            {
                title: "Organic Natural",
                description: "Go natural with walnut wood cabinets, butcher block countertops, and stone backsplash. Combine with warm beige walls for an earthy, inviting atmosphere.",
                settings: {
                    cabinetStyle: 'transitional',
                    cabinetColor: '#6b5344',
                    countertop: 'wood',
                    backsplash: 'marble',
                    backsplashColor: '#f0e6d2',
                    wallColor: '#f0e6d2',
                    flooring: 'walnut'
                }
            }
        ];
    }

    getRandomSuggestion() {
        return this.suggestions[Math.floor(Math.random() * this.suggestions.length)];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing renderer...');
    renderer = new LuxeKitchenRenderer('kitchenCanvas');
    aiAssistant = new AIDesignAssistant();
    console.log('Renderer initialized successfully');

    // Cabinet Style
    document.querySelectorAll('input[name="cabinetStyle"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            renderer.design.cabinetStyle = e.target.value;
            renderer.render();
        });
    });

    // Cabinet Colors
    document.querySelectorAll('[data-cabinet-color]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-cabinet-color]').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderer.design.cabinetColor = e.target.dataset.cabinetColor;
            renderer.render();
        });
    });

    // Countertop
    document.querySelectorAll('input[name="countertop"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            renderer.design.countertop = e.target.value;
            renderer.render();
        });
    });

    // Backsplash Type
    document.querySelectorAll('input[name="backsplash"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            renderer.design.backsplash = e.target.value;
            renderer.render();
        });
    });

    // Backsplash Colors
    document.querySelectorAll('[data-backsplash-color]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-backsplash-color]').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderer.design.backsplashColor = e.target.dataset.backsplashColor;
            renderer.render();
        });
    });

    // Flooring
    document.querySelectorAll('input[name="flooring"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            renderer.design.flooring = e.target.value;
            renderer.render();
        });
    });

    // Wall Colors
    document.querySelectorAll('[data-wall-color]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-wall-color]').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderer.design.wallColor = e.target.dataset.wallColor;
            renderer.render();
        });
    });

    // Brightness
    document.getElementById('brightness').addEventListener('input', (e) => {
        renderer.design.brightness = parseInt(e.target.value);
        document.getElementById('brightnessDisplay').textContent = e.target.value + '%';
        renderer.render();
    });

    // Contrast
    document.getElementById('contrast').addEventListener('input', (e) => {
        renderer.design.contrast = parseInt(e.target.value);
        document.getElementById('contrastDisplay').textContent = e.target.value + '%';
        renderer.render();
    });

    // Island Toggle
    document.getElementById('islandToggle').addEventListener('change', (e) => {
        renderer.design.islandEnabled = e.target.checked;
        renderer.render();
    });

    // Backsplash Toggle
    document.getElementById('backsplashToggle').addEventListener('change', (e) => {
        renderer.design.backsplashEnabled = e.target.checked;
        renderer.render();
    });

    // Export
    document.getElementById('exportBtn').addEventListener('click', () => {
        renderer.exportDesign();
    });

    // Share
    document.getElementById('shareBtn').addEventListener('click', () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({ title: 'My Kitchen Design', url });
        } else {
            alert('Design URL: ' + url);
        }
    });

    // Reset
    document.getElementById('resetDesignBtn').addEventListener('click', () => {
        renderer.resetDesign();
        // Reset UI
        document.querySelectorAll('input[type="radio"]').forEach(r => {
            if (renderer.design[r.name]) r.checked = (r.value === renderer.design[r.name]);
        });
    });

    // AI Suggestions
    document.getElementById('aiSuggestBtn').addEventListener('click', () => {
        const suggestion = aiAssistant.getRandomSuggestion();
        document.getElementById('suggestionText').textContent = suggestion.description;
        document.getElementById('suggestionModal').style.display = 'flex';

        // Apply suggestion
        document.getElementById('applySuggestionBtn').onclick = () => {
            Object.assign(renderer.design, suggestion.settings);
            renderer.render();
            document.getElementById('suggestionModal').style.display = 'none';
        };
    });

    document.getElementById('closeSuggestion').addEventListener('click', () => {
        document.getElementById('suggestionModal').style.display = 'none';
    });

    document.getElementById('resetViewBtn').addEventListener('click', () => {
        renderer.render();
    });

    // Set active color swatches
    document.querySelector('[data-cabinet-color="#2c2c2c"]').classList.add('active');
    document.querySelector('[data-backsplash-color="#ffffff"]').classList.add('active');
    document.querySelector('[data-wall-color="#f5f5f5"]').classList.add('active');
});
