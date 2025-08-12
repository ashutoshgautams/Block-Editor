<?php
/**
 * Block Utilities Class
 * 
 * Provides common utility functions for block development
 * 
 * @package WPBlockEditorCourse
 * @since 1.0.0
 */

/**
 * Block Utilities Class
 * 
 * @category WordPress_Plugin
 * @package  WPBlockEditorCourse
 * @author   Ashutosh Gautam <ashutosh.gautam@rtcamp.com>
 * @license  GPL v2 or later
 * @link     https://ashutoshgautam.com
 * @since    1.0.0
 */
class WP_Block_Editor_Course_Block_Utilities {

	/**
	 * Get block asset URL
	 * 
	 * @param string $path Asset path relative to plugin directory.
	 * @return string Full URL to the asset.
	 */
	public static function get_asset_url( $path ) {
		return WP_BLOCK_EDITOR_COURSE_PLUGIN_URL . 'assets/' . ltrim( $path, '/' );
	}

	/**
	 * Get block asset path
	 * 
	 * @param string $path Asset path relative to plugin directory.
	 * @return string Full path to the asset.
	 */
	public static function get_asset_path( $path ) {
		return WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'assets/' . ltrim( $path, '/' );
	}

	/**
	 * Sanitize block attributes
	 * 
	 * @param array $attributes Block attributes.
	 * @param array $schema Attribute schema.
	 * @return array Sanitized attributes.
	 */
	public static function sanitize_block_attributes( $attributes, $schema ) {
		$sanitized = array();
		
		foreach ( $schema as $key => $config ) {
			if ( isset( $attributes[ $key ] ) ) {
				$value = $attributes[ $key ];
				
				switch ( $config['type'] ) {
					case 'string':
						$sanitized[ $key ] = sanitize_text_field( $value );
						break;
					case 'number':
						$sanitized[ $key ] = floatval( $value );
						break;
					case 'integer':
						$sanitized[ $key ] = intval( $value );
						break;
					case 'boolean':
						$sanitized[ $key ] = (bool) $value;
						break;
					case 'array':
						$sanitized[ $key ] = is_array( $value ) ? $value : array();
						break;
					case 'object':
						$sanitized[ $key ] = is_array( $value ) ? $value : array();
						break;
					case 'html':
						$sanitized[ $key ] = wp_kses_post( $value );
						break;
					case 'url':
						$sanitized[ $key ] = esc_url_raw( $value );
						break;
					case 'email':
						$sanitized[ $key ] = sanitize_email( $value );
						break;
					default:
						$sanitized[ $key ] = sanitize_text_field( $value );
						break;
				}
			} elseif ( isset( $config['default'] ) ) {
				$sanitized[ $key ] = $config['default'];
			}
		}
		
		return $sanitized;
	}

	/**
	 * Validate block attributes
	 * 
	 * @param array $attributes Block attributes.
	 * @param array $schema Attribute schema.
	 * @return array Validation errors.
	 */
	public static function validate_block_attributes( $attributes, $schema ) {
		$errors = array();
		
		foreach ( $schema as $key => $config ) {
			if ( isset( $attributes[ $key ] ) ) {
				$value = $attributes[ $key ];
				
				// Check required fields
				if ( isset( $config['required'] ) && $config['required'] && empty( $value ) ) {
					$errors[ $key ] = sprintf( __( '%s is required.', 'wp-block-editor-course' ), $key );
					continue;
				}
				
				// Check minimum values
				if ( isset( $config['minimum'] ) && $value < $config['minimum'] ) {
					$errors[ $key ] = sprintf( __( '%s must be at least %d.', 'wp-block-editor-course' ), $key, $config['minimum'] );
				}
				
				// Check maximum values
				if ( isset( $config['maximum'] ) && $value > $config['maximum'] ) {
					$errors[ $key ] = sprintf( __( '%s must be at most %d.', 'wp-block-editor-course' ), $key, $config['maximum'] );
				}
				
				// Check pattern matching
				if ( isset( $config['pattern'] ) && ! preg_match( $config['pattern'], $value ) ) {
					$errors[ $key ] = sprintf( __( '%s format is invalid.', 'wp-block-editor-course' ), $key );
				}
				
				// Check enum values
				if ( isset( $config['enum'] ) && ! in_array( $value, $config['enum'], true ) ) {
					$errors[ $key ] = sprintf( __( '%s must be one of: %s.', 'wp-block-editor-course' ), $key, implode( ', ', $config['enum'] ) );
				}
			}
		}
		
		return $errors;
	}

	/**
	 * Get block CSS classes
	 * 
	 * @param array $attributes Block attributes.
	 * @param array $base_classes Base CSS classes.
	 * @return string CSS classes string.
	 */
	public static function get_block_classes( $attributes, $base_classes = array() ) {
		$classes = $base_classes;
		
		// Add block name class
		$classes[] = 'wp-block-interactive-counter';
		
		// Add custom class if provided
		if ( ! empty( $attributes['className'] ) ) {
			$classes[] = $attributes['className'];
		}
		
		// Add alignment class
		if ( ! empty( $attributes['align'] ) ) {
			$classes[] = 'align' . $attributes['align'];
		}
		
		// Add text alignment class
		if ( ! empty( $attributes['textAlign'] ) ) {
			$classes[] = 'has-text-align-' . $attributes['textAlign'];
		}
		
		// Add style variations
		if ( ! empty( $attributes['style'] ) ) {
			$classes[] = 'is-style-' . $attributes['style'];
		}
		
		return implode( ' ', array_filter( $classes ) );
	}

	/**
	 * Get block inline styles
	 * 
	 * @param array $attributes Block attributes.
	 * @return string Inline styles string.
	 */
	public static function get_block_styles( $attributes ) {
		$styles = array();
		
		// Background color
		if ( ! empty( $attributes['backgroundColor'] ) ) {
			$styles[] = 'background-color: ' . esc_attr( $attributes['backgroundColor'] ) . ';';
		}
		
		// Text color
		if ( ! empty( $attributes['textColor'] ) ) {
			$styles[] = 'color: ' . esc_attr( $attributes['textColor'] ) . ';';
		}
		
		// Gradient
		if ( ! empty( $attributes['gradient'] ) ) {
			$styles[] = 'background: ' . esc_attr( $attributes['gradient'] ) . ';';
		}
		
		// Border radius
		if ( ! empty( $attributes['borderRadius'] ) ) {
			$styles[] = 'border-radius: ' . esc_attr( $attributes['borderRadius'] ) . 'px;';
		}
		
		// Custom styles
		if ( ! empty( $attributes['style'] ) && is_array( $attributes['style'] ) ) {
			foreach ( $attributes['style'] as $property => $value ) {
				if ( is_string( $value ) && ! empty( $value ) ) {
					$styles[] = esc_attr( $property ) . ': ' . esc_attr( $value ) . ';';
				}
			}
		}
		
		return implode( ' ', $styles );
	}

	/**
	 * Get block data attributes for Interactivity API
	 * 
	 * @param array $attributes Block attributes.
	 * @param string $store_name Store name.
	 * @return array Data attributes.
	 */
	public static function get_interactivity_attributes( $attributes, $store_name ) {
		$data_attrs = array(
			'data-wp-interactive' => $store_name,
		);
		
		// Add context data
		$context = array();
		foreach ( $attributes as $key => $value ) {
			if ( is_scalar( $value ) ) {
				$context[ $key ] = $value;
			}
		}
		
		if ( ! empty( $context ) ) {
			$data_attrs['data-wp-context'] = wp_json_encode( $context );
		}
		
		return $data_attrs;
	}

	/**
	 * Enqueue block assets
	 * 
	 * @param string $block_name Block name.
	 * @param array  $dependencies Script dependencies.
	 * @param bool   $in_footer Whether to enqueue in footer.
	 */
	public static function enqueue_block_assets( $block_name, $dependencies = array(), $in_footer = true ) {
		$block_path = 'blocks/' . $block_name;
		
		// Enqueue editor script
		if ( file_exists( WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . $block_path . '/index.js' ) ) {
			wp_enqueue_script(
				'wp-block-editor-course-' . $block_name . '-editor',
				WP_BLOCK_EDITOR_COURSE_PLUGIN_URL . $block_path . '/index.js',
				array_merge( array( 'wp-blocks', 'wp-element', 'wp-editor' ), $dependencies ),
				WP_BLOCK_EDITOR_COURSE_VERSION,
				$in_footer
			);
		}
		
		// Enqueue editor styles
		if ( file_exists( WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . $block_path . '/index.css' ) ) {
			wp_enqueue_style(
				'wp-block-editor-course-' . $block_name . '-editor',
				WP_BLOCK_EDITOR_COURSE_PLUGIN_URL . $block_path . '/index.css',
				array(),
				WP_BLOCK_EDITOR_COURSE_VERSION
			);
		}
		
		// Enqueue frontend styles
		if ( file_exists( WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . $block_path . '/style-index.css' ) ) {
			wp_enqueue_style(
				'wp-block-editor-course-' . $block_name . '-frontend',
				WP_BLOCK_EDITOR_COURSE_PLUGIN_URL . $block_path . '/style-index.css',
				array(),
				WP_BLOCK_EDITOR_COURSE_VERSION
			);
		}
		
		// Enqueue view script for Interactivity API
		if ( file_exists( WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . $block_path . '/view.js' ) ) {
			wp_enqueue_script(
				'wp-block-editor-course-' . $block_name . '-view',
				WP_BLOCK_EDITOR_COURSE_PLUGIN_URL . $block_path . '/view.js',
				array( 'wp-interactivity' ),
				WP_BLOCK_EDITOR_COURSE_VERSION,
				$in_footer
			);
		}
	}

	/**
	 * Get block pattern content
	 * 
	 * @param string $pattern_name Pattern name.
	 * @return string Pattern content.
	 */
	public static function get_pattern_content( $pattern_name ) {
		$pattern_file = WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'patterns/' . $pattern_name . '.php';
		
		if ( file_exists( $pattern_file ) ) {
			ob_start();
			include $pattern_file;
			return ob_get_clean();
		}
		
		return '';
	}

	/**
	 * Register block pattern
	 * 
	 * @param string $name Pattern name.
	 * @param array  $properties Pattern properties.
	 */
	public static function register_pattern( $name, $properties ) {
		if ( function_exists( 'register_block_pattern' ) ) {
			register_block_pattern( $name, $properties );
		}
	}

	/**
	 * Get block variations
	 * 
	 * @param string $block_name Block name.
	 * @return array Block variations.
	 */
	public static function get_block_variations( $block_name ) {
		$variations = array();
		
		switch ( $block_name ) {
			case 'wp-block-editor-course/basic-text-block':
				$variations = array(
					array(
						'name' => 'highlighted',
						'title' => __( 'Highlighted Text', 'wp-block-editor-course' ),
						'description' => __( 'Text with highlighted background.', 'wp-block-editor-course' ),
						'attributes' => array(
							'className' => 'is-style-highlighted',
						),
						'icon' => 'admin-appearance',
					),
					array(
						'name' => 'gradient',
						'title' => __( 'Gradient Text', 'wp-block-editor-course' ),
						'description' => __( 'Text with gradient background.', 'wp-block-editor-course' ),
						'attributes' => array(
							'className' => 'is-style-gradient',
						),
						'icon' => 'admin-appearance',
					),
				);
				break;
				
			case 'wp-block-editor-course/advanced-card-block':
				$variations = array(
					array(
						'name' => 'featured',
						'title' => __( 'Featured Card', 'wp-block-editor-course' ),
						'description' => __( 'A featured card with prominent styling.', 'wp-block-editor-course' ),
						'attributes' => array(
							'cardStyle' => 'elevated',
							'shadow' => 'large',
						),
						'icon' => 'star-filled',
					),
					array(
						'name' => 'minimal',
						'title' => __( 'Minimal Card', 'wp-block-editor-course' ),
						'description' => __( 'A minimal card with clean styling.', 'wp-block-editor-course' ),
						'attributes' => array(
							'cardStyle' => 'minimal',
							'shadow' => 'none',
						),
						'icon' => 'minus',
					),
				);
				break;
				
			case 'wp-block-editor-course/interactive-counter-block':
				$variations = array(
					array(
						'name' => 'timer',
						'title' => __( 'Timer Counter', 'wp-block-editor-course' ),
						'description' => __( 'A countdown timer counter.', 'wp-block-editor-course' ),
						'attributes' => array(
							'label' => __( 'Timer', 'wp-block-editor-course' ),
							'initialValue' => 60,
							'step' => 1,
							'autoIncrement' => true,
							'autoIncrementInterval' => 1000,
						),
						'icon' => 'clock',
					),
					array(
						'name' => 'score',
						'title' => __( 'Score Counter', 'wp-block-editor-course' ),
						'description' => __( 'A score counter for games.', 'wp-block-editor-course' ),
						'attributes' => array(
							'label' => __( 'Score', 'wp-block-editor-course' ),
							'initialValue' => 0,
							'step' => 10,
							'minValue' => 0,
							'maxValue' => 1000,
						),
						'icon' => 'chart-line',
					),
				);
				break;
		}
		
		return $variations;
	}

	/**
	 * Get block transforms
	 * 
	 * @param string $block_name Block name.
	 * @return array Block transforms.
	 */
	public static function get_block_transforms( $block_name ) {
		$transforms = array();
		
		switch ( $block_name ) {
			case 'wp-block-editor-course/basic-text-block':
				$transforms = array(
					'from' => array(
						array(
							'type' => 'block',
							'blocks' => array( 'core/paragraph' ),
							'transform' => function( $attributes, $content ) {
								return create_block( 'wp-block-editor-course/basic-text-block', array(
									'content' => $content,
								) );
							},
						),
					),
					'to' => array(
						array(
							'type' => 'block',
							'blocks' => array( 'core/paragraph' ),
							'transform' => function( $attributes ) {
								return create_block( 'core/paragraph', array(
									'content' => $attributes['content'],
								) );
							},
						),
					),
				);
				break;
		}
		
		return $transforms;
	}
}
