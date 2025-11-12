# Luxe Kitchen Designer

A professional, modern kitchen design visualization application with real-time customization and AI-powered design suggestions.

## 🎯 Features

### Real-Time Visualization
- **Advanced Canvas Rendering**: Photorealistic kitchen rendering with proper lighting, shadows, and perspective
- **Responsive Design**: Adapts to any screen size with beautiful responsive layout
- **High DPI Support**: Sharp rendering on all devices including Retina displays

### Customization Options

**🚪 Cabinetry**
- 4 style options: Modern, Traditional, Transitional, Contemporary
- 8 premium color choices (Charcoal, Espresso, Walnut, Natural Oak, White, Cream, Sage Green, Navy)

**⬜ Countertops**
- 4 material options: Granite, Quartz, Marble, Butcher Block
- Realistic texturing and depth

**🧱 Backsplash**
- 4 pattern styles: Subway Tile, Herringbone, Glass, Marble
- 6 color options

**🪵 Flooring**
- 4 wood types: Oak, Walnut, Ceramic Tile, Polished Concrete

**🎨 Walls**
- 8 professional color palettes

**💡 Lighting**
- Brightness control (50-150%)
- Contrast adjustment (50-150%)

**✨ Extras**
- Toggle kitchen island
- Toggle backsplash visibility

### AI Design Assistant
- 4 pre-curated design themes:
  - Modern Minimalist
  - Warm Traditional
  - Contemporary Luxe
  - Organic Natural
- One-click application

### Export & Share
- Download designs as high-quality PNG
- Share via link or native share functionality

## 📁 Project Structure

```
kitchen-mockup/
├── index.html          # Main application
├── debug.html          # Debug version with console logging
├── test.html           # Functionality test page
├── css/
│   └── styles.css      # Complete styling (420+ lines)
├── js/
│   └── app.js          # Canvas renderer and interactivity (791 lines)
└── assets/
    └── textures/       # Reserved for texture assets
```

## 🚀 Getting Started

### Local Development
```bash
cd kitchen-mockup
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### GitHub Pages
The app is deployed on GitHub Pages at:
[https://ingramjam.github.io/kitchen-mockup/](https://ingramjam.github.io/kitchen-mockup/)

## 🛠️ Technical Details

### Architecture

**Frontend Framework**: Vanilla HTML5 + Canvas API
- No external dependencies
- Pure JavaScript rendering
- Responsive CSS Grid layout

**Canvas Rendering Pipeline**:
1. Clear canvas
2. Apply lighting/brightness adjustments
3. Draw walls with texture
4. Draw floor with pattern
5. Draw cabinets with doors and handles
6. Draw countertops with material texture
7. Draw backsplash patterns
8. Draw appliances (stove, refrigerator, dishwasher)
9. Draw optional kitchen island
10. Apply final depth and accents

**State Management**:
- Single design object stores all customization settings
- Real-time render updates on any change
- Color adjustments applied with brightness/contrast math

### Key Classes

**LuxeKitchenRenderer**
- Main rendering engine
- Handles canvas initialization and responsive sizing
- 30+ rendering methods for kitchen elements
- Color manipulation utilities

**AIDesignAssistant**
- Manages pre-designed themes
- Applies design suggestions instantly

## 🎨 Design System

### Color Palette
- Primary: #667eea (Purple accent)
- Dark: #1a1a1a (Near black headers)
- Light: #f5f5f5, #f0f0f0 (Backgrounds)
- Surfaces: White (#ffffff)

### Typography
- System fonts: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue'
- Sizes: 0.9rem - 2rem depending on hierarchy

### Spacing
- Base unit: 1rem
- Consistent 8px grid system

## 📊 Performance

- **Canvas Rendering**: 60fps target
- **No External Libraries**: Zero dependencies for faster loading
- **Lazy Rendering**: Only renders on user interaction
- **Memory Efficient**: Single canvas context, no DOM manipulation during render

## 🔧 Customization Guide

### Adding New Cabinet Colors
Edit `js/app.js` line ~69:
```javascript
<button class="color-swatch" data-cabinet-color="#YOUR_COLOR"...>
```

### Modifying Material Textures
Update the `materials` object in `LuxeKitchenRenderer` (line ~28):
```javascript
this.materials = {
    yourMaterial: { colors: ['#color1', '#color2', '#color3'], name: 'Your Name' },
    ...
}
```

### Changing Kitchen Layout
Modify percentage values in `draw*` methods. For example, `drawCabinets()` uses:
- `height * 0.35` for cabinet height
- `height * 0.4` for Y position
- `width * 0.1` for padding

## 🐛 Debugging

### Debug Console
Visit `debug.html` to see real-time console output overlaid on the app

### Common Issues

**Canvas not rendering**:
- Check browser console for JavaScript errors
- Ensure canvas element is present in DOM
- Verify canvas parent has dimensions

**Controls not responding**:
- Open browser DevTools (F12)
- Check Console tab for errors
- Verify element IDs match JavaScript selectors

**Performance issues**:
- Reduce canvas resolution if needed
- Check for console errors causing lag
- Clear browser cache

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

© 2025 Ingram Jam. All rights reserved.

## 🚀 Future Enhancements

- [ ] 3D WebGL rendering option
- [ ] Before/after comparison view
- [ ] Design history/undo functionality
- [ ] Photo upload for backsplash/countertop patterns
- [ ] Measurement tools
- [ ] Material cost calculator
- [ ] Professional PDF export
- [ ] Collaboration features

## 📞 Support

For issues or questions, contact: ingramjam@gmail.com

---

**Last Updated**: November 12, 2025
**Version**: 1.0.0
