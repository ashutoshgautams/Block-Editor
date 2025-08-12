const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		// Main editor script
		'editor': './src/js/editor.js',
		// Frontend script
		'frontend': './src/js/frontend.js',
		// Block variations
		'block-variations': './src/js/block-variations.js',
		// Individual blocks
		'basic-text-block': './blocks/basic-text-block/index.js',
		'advanced-card-block': './blocks/advanced-card-block/index.js',
		'interactive-counter-block': './blocks/interactive-counter-block/index.js',
		'data-fetching-block': './blocks/data-fetching-block/index.js',
		'custom-controls-block': './blocks/custom-controls-block/index.js',
		'pattern-block': './blocks/pattern-block/index.js',
		'theme-integration-block': './blocks/theme-integration-block/index.js',
		'accessibility-block': './blocks/accessibility-block/index.js',
		'performance-block': './blocks/performance-block/index.js',
		'security-block': './blocks/security-block/index.js',
	},
	output: {
		path: path.resolve( __dirname, 'assets/js' ),
		filename: '[name].js',
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@': path.resolve( __dirname, 'src' ),
			'@blocks': path.resolve( __dirname, 'blocks' ),
			'@components': path.resolve( __dirname, 'src/components' ),
			'@utils': path.resolve( __dirname, 'src/utils' ),
			'@styles': path.resolve( __dirname, 'src/styles' ),
		},
	},
};
