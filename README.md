# WordPress VIP Block Editor Course - Practical Examples

This repository contains practical, working examples that demonstrate all concepts covered in the WordPress VIP Block Editor course. Each block is fully functional and can be installed as a plugin for testing and learning.

## 🚀 Quick Start

### Installation
1. Download this repository as a ZIP file
2. Extract to your WordPress site's `/wp-content/plugins/` directory
3. Activate the plugin from WordPress Admin → Plugins
4. Start using the blocks in the Block Editor!

### Alternative: Git Clone
```bash
git clone <repository-url>
cd wp-block-editor-course
# Copy to your WordPress plugins directory
cp -r . /path/to/wordpress/wp-content/plugins/wp-block-editor-course/
```

## 📚 Course Coverage

This repository covers all major topics from the WordPress VIP Block Editor course:

### 1. Introduction & Building With Blocks
- **Basic Block Structure** - Understanding block anatomy
- **Block Themes** - Working with theme.json and block themes
- **Block Patterns** - Reusable block layouts
- **Block Templates** - Template hierarchy in block themes

### 2. Building Custom Blocks
- **Environment Setup** - Complete development workflow
- **Block Scaffolding** - Project structure and build tools
- **Block Development** - From simple to complex blocks

### 3. WordPress Components
- **@wordpress/components** - Using official WordPress UI components
- **Component Best Practices** - Proper implementation patterns

### 4. Advanced Block Development
- **Block Features** - Attributes, controls, and settings
- **Styling Blocks** - CSS, theme.json integration
- **InnerBlocks** - Nested block structures
- **Block Context** - Data sharing between blocks

### 5. Editor Customization
- **Custom Controls** - Block toolbar and sidebar controls
- **Slot & Fill System** - Extending the editor interface
- **Editor Filters** - Modifying editor behavior

### 6. WordPress Data Layer
- **wp.data** - Working with WordPress data stores
- **useSelect & useDispatch** - React hooks for data management
- **Custom Data Stores** - Creating and using custom stores

### 7. Interactivity API
- **Interactive Blocks** - Client-side interactivity
- **State Management** - Global and local state handling

### 8. Performance & Security
- **Optimization** - JavaScript and CSS optimization
- **Security Best Practices** - Safe block development
- **Accessibility** - WCAG compliance in blocks

## 🧩 Block Examples

### 1. **Basic Text Block** (`blocks/basic-text-block/`)
Demonstrates fundamental block structure, attributes, and basic controls.

**Concepts Covered:**
- Block registration
- Attributes definition
- Basic edit and save functions
- Block controls

### 2. **Advanced Card Block** (`blocks/advanced-card-block/`)
Shows complex block with multiple attributes, InnerBlocks, and styling.

**Concepts Covered:**
- Multiple attributes
- InnerBlocks implementation
- Block styling
- Responsive design
- Block variations

### 3. **Interactive Counter Block** (`blocks/interactive-counter-block/`)
Demonstrates the Interactivity API with state management.

**Concepts Covered:**
- Interactivity API
- Client-side state
- Event handling
- Performance optimization

### 4. **Data Fetching Block** (`blocks/data-fetching-block/`)
Shows how to fetch and display data using wp.data.

**Concepts Covered:**
- WordPress data layer
- useSelect and useDispatch
- API integration
- Loading states

### 5. **Custom Controls Block** (`blocks/custom-controls-block/`)
Demonstrates custom block controls and editor customization.

**Concepts Covered:**
- Custom block controls
- Slot & Fill system
- Editor filters
- Advanced UI components

### 6. **Pattern Block** (`blocks/pattern-block/`)
Shows block patterns and reusable layouts.

**Concepts Covered:**
- Block patterns
- Reusable layouts
- Pattern registration
- Template parts

### 7. **Theme Integration Block** (`blocks/theme-integration-block/`)
Demonstrates theme.json integration and global styles.

**Concepts Covered:**
- theme.json configuration
- Global styles
- Color palettes
- Typography settings

### 8. **Accessibility Block** (`blocks/accessibility-block/`)
Shows accessibility best practices in block development.

**Concepts Covered:**
- WCAG compliance
- Screen reader support
- Keyboard navigation
- ARIA attributes

### 9. **Performance Block** (`blocks/performance-block/`)
Demonstrates optimization techniques and best practices.

**Concepts Covered:**
- JavaScript optimization
- CSS optimization
- Lazy loading
- Bundle optimization

### 10. **Security Block** (`blocks/security-block/`)
Shows security best practices and data sanitization.

**Concepts Covered:**
- Data sanitization
- Nonce verification
- Capability checks
- XSS prevention

## 🛠️ Development Setup

### Prerequisites
- WordPress 6.0+
- Node.js 16+
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Build blocks
npm run build

# Watch for changes
npm run dev

# Lint code
npm run lint

# Run tests
npm run test
```

### Build Process
The repository uses a modern build system with:
- **@wordpress/scripts** - Official WordPress build tools
- **Webpack** - Module bundling
- **Babel** - JavaScript transpilation
- **Sass** - CSS preprocessing

## 📖 Learning Path

### Beginner Level
1. Start with `basic-text-block`
2. Move to `pattern-block`
3. Explore `theme-integration-block`

### Intermediate Level
1. Study `advanced-card-block`
2. Learn `data-fetching-block`
3. Understand `custom-controls-block`

### Advanced Level
1. Master `interactive-counter-block`
2. Implement `accessibility-block`
3. Optimize with `performance-block`
4. Secure with `security-block`

## 🔧 Customization

Each block is designed to be easily customizable:

1. **Modify Attributes** - Change block behavior
2. **Update Styling** - Customize appearance
3. **Add Features** - Extend functionality
4. **Integrate APIs** - Connect external services

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the GPL v2 or later - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the inline comments in each block
- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join the conversation in GitHub Discussions

## 🎯 Learning Objectives

By the end of this course, you will be able to:
- ✅ Build custom blocks from scratch
- ✅ Use WordPress components effectively
- ✅ Implement advanced block features
- ✅ Create interactive blocks
- ✅ Optimize block performance
- ✅ Ensure accessibility compliance
- ✅ Apply security best practices
- ✅ Deploy blocks to production

---

**Happy Block Building! 🚀**
