<?php
/**
 * Basic Text Block - Server-side Render
 * 
 * This file handles server-side rendering of the basic text block
 * when JavaScript is disabled or for better SEO
 * 
 * @package WPBlockEditorCourse
 * @since 1.0.0
 */

/**
 * Render the basic text block on the server
 * 
 * @param array $attributes Block attributes.
 * @param string $content Block content.
 * @return string Rendered block HTML.
 */
function render_basic_text_block( $attributes, $content ) {
	// Extract attributes with defaults
	$content_text = isset( $attributes['content'] ) ? $attributes['content'] : '';
	$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
	$font_size = isset( $attributes['fontSize'] ) ? $attributes['fontSize'] : 'medium';
	$text_color = isset( $attributes['textColor'] ) ? $attributes['textColor'] : '';
	$background_color = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : '';
	$gradient = isset( $attributes['gradient'] ) ? $attributes['gradient'] : '';
	$style = isset( $attributes['style'] ) ? $attributes['style'] : array();
	$className = isset( $attributes['className'] ) ? $attributes['className'] : '';
	
	// Build CSS classes
	$classes = array(
		'wp-block-basic-text',
		'has-text-align-' . $text_align,
		'has-' . $font_size . '-font-size'
	);
	
	// Add custom class if provided
	if ( ! empty( $className ) ) {
		$classes[] = $className;
	}
	
	// Build inline styles
	$inline_styles = array();
	
	if ( ! empty( $text_color ) ) {
		$inline_styles[] = 'color: ' . esc_attr( $text_color ) . ';';
	}
	
	if ( ! empty( $background_color ) ) {
		$inline_styles[] = 'background-color: ' . esc_attr( $background_color ) . ';';
	}
	
	if ( ! empty( $gradient ) ) {
		$inline_styles[] = 'background: ' . esc_attr( $gradient ) . ';';
	}
	
	// Add custom styles from style object
	if ( ! empty( $style ) ) {
		foreach ( $style as $property => $value ) {
			if ( is_string( $value ) && ! empty( $value ) ) {
				$inline_styles[] = esc_attr( $property ) . ': ' . esc_attr( $value ) . ';';
			}
		}
	}
	
	// Build the HTML
	$wrapper_attributes = array(
		'class' => implode( ' ', array_filter( $classes ) ),
	);
	
	if ( ! empty( $inline_styles ) ) {
		$wrapper_attributes['style'] = implode( ' ', $inline_styles );
	}
	
	// Sanitize content
	$content_text = wp_kses_post( $content_text );
	
	// Build wrapper attributes string
	$wrapper_attr_string = '';
	foreach ( $wrapper_attributes as $attr => $value ) {
		$wrapper_attr_string .= ' ' . $attr . '="' . esc_attr( $value ) . '"';
	}
	
	// Return the rendered HTML
	return sprintf(
		'<div%s><p>%s</p></div>',
		$wrapper_attr_string,
		$content_text
	);
}

// Register the render callback
register_block_type( 'wp-block-editor-course/basic-text-block', array(
	'render_callback' => 'render_basic_text_block',
) );
