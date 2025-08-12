<?php
/**
 * Interactive Counter Block - Server-side Render
 * 
 * This file handles server-side rendering of the interactive counter block
 * when JavaScript is disabled or for better SEO
 * 
 * @package WPBlockEditorCourse
 * @since 1.0.0
 */

/**
 * Render the interactive counter block on the server
 * 
 * @param array $attributes Block attributes.
 * @param string $content Block content.
 * @return string Rendered block HTML.
 */
function render_interactive_counter_block( $attributes, $content ) {
	// Extract attributes with defaults
	$initial_value = isset( $attributes['initialValue'] ) ? intval( $attributes['initialValue'] ) : 0;
	$step = isset( $attributes['step'] ) ? intval( $attributes['step'] ) : 1;
	$min_value = isset( $attributes['minValue'] ) ? intval( $attributes['minValue'] ) : -100;
	$max_value = isset( $attributes['maxValue'] ) ? intval( $attributes['maxValue'] ) : 100;
	$label = isset( $attributes['label'] ) ? $attributes['label'] : 'Counter';
	$show_controls = isset( $attributes['showControls'] ) ? $attributes['showControls'] : true;
	$show_reset = isset( $attributes['showReset'] ) ? $attributes['showReset'] : true;
	$button_style = isset( $attributes['buttonStyle'] ) ? $attributes['buttonStyle'] : 'default';
	$counter_style = isset( $attributes['counterStyle'] ) ? $attributes['counterStyle'] : 'default';
	$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'center';
	$label_color = isset( $attributes['labelColor'] ) ? $attributes['labelColor'] : '';
	$value_color = isset( $attributes['valueColor'] ) ? $attributes['valueColor'] : '';
	$button_color = isset( $attributes['buttonColor'] ) ? $attributes['buttonColor'] : '';
	$background_color = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : '';
	$gradient = isset( $attributes['gradient'] ) ? $attributes['gradient'] : '';
	$border_radius = isset( $attributes['borderRadius'] ) ? intval( $attributes['borderRadius'] ) : 8;
	$animation = isset( $attributes['animation'] ) ? $attributes['animation'] : 'none';
	$auto_increment = isset( $attributes['autoIncrement'] ) ? $attributes['autoIncrement'] : false;
	$auto_increment_interval = isset( $attributes['autoIncrementInterval'] ) ? intval( $attributes['autoIncrementInterval'] ) : 1000;
	$style = isset( $attributes['style'] ) ? $attributes['style'] : array();
	$className = isset( $attributes['className'] ) ? $attributes['className'] : '';
	
	// Build CSS classes
	$classes = array(
		'wp-block-interactive-counter',
		'counter-style-' . $counter_style,
		'button-style-' . $button_style,
		'animation-' . $animation
	);
	
	// Add custom class if provided
	if ( ! empty( $className ) ) {
		$classes[] = $className;
	}
	
	// Build inline styles
	$inline_styles = array();
	
	if ( ! empty( $text_align ) ) {
		$inline_styles[] = 'text-align: ' . esc_attr( $text_align ) . ';';
	}
	
	if ( ! empty( $border_radius ) ) {
		$inline_styles[] = 'border-radius: ' . esc_attr( $border_radius ) . 'px;';
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
		'data-wp-interactive' => 'counter',
		'data-wp-context' => wp_json_encode( array(
			'value' => $initial_value,
			'step' => $step,
			'min' => $min_value,
			'max' => $max_value,
			'autoIncrement' => $auto_increment,
			'autoIncrementInterval' => $auto_increment_interval
		) ),
		'data-initial-value' => $initial_value
	);
	
	if ( ! empty( $inline_styles ) ) {
		$wrapper_attributes['style'] = implode( ' ', $inline_styles );
	}
	
	// Sanitize content
	$label = wp_kses_post( $label );
	
	// Build wrapper attributes string
	$wrapper_attr_string = '';
	foreach ( $wrapper_attributes as $attr => $value ) {
		$wrapper_attr_string .= ' ' . $attr . '="' . esc_attr( $value ) . '"';
	}
	
	// Build label styles
	$label_styles = '';
	if ( ! empty( $label_color ) ) {
		$label_styles = ' style="color: ' . esc_attr( $label_color ) . ';"';
	}
	
	// Build value styles
	$value_styles = '';
	if ( ! empty( $value_color ) ) {
		$value_styles = ' style="color: ' . esc_attr( $value_color ) . ';"';
	}
	
	// Build button styles
	$button_styles = '';
	if ( ! empty( $button_color ) ) {
		$button_styles = ' style="background-color: ' . esc_attr( $button_color ) . ';"';
	}
	
	// Build controls HTML
	$controls_html = '';
	if ( $show_controls ) {
		$controls_html .= '<div class="counter-controls">';
		
		// Decrease button
		$controls_html .= sprintf(
			'<button type="button" class="counter-button counter-decrease" data-wp-on--click="actions.decrease" data-wp-bind--disabled="state.isMin"%s aria-label="%s">−</button>',
			$button_styles,
			esc_attr__( 'Decrease counter', 'wp-block-editor-course' )
		);
		
		// Increase button
		$controls_html .= sprintf(
			'<button type="button" class="counter-button counter-increase" data-wp-on--click="actions.increase" data-wp-bind--disabled="state.isMax"%s aria-label="%s">+</button>',
			$button_styles,
			esc_attr__( 'Increase counter', 'wp-block-editor-course' )
		);
		
		// Reset button
		if ( $show_reset ) {
			$controls_html .= sprintf(
				'<button type="button" class="counter-button counter-reset" data-wp-on--click="actions.reset"%s aria-label="%s">%s</button>',
				$button_styles,
				esc_attr__( 'Reset counter', 'wp-block-editor-course' ),
				esc_html__( 'Reset', 'wp-block-editor-course' )
			);
		}
		
		$controls_html .= '</div>';
	}
	
	// Return the rendered HTML
	return sprintf(
		'<div%s>
			<h3 class="counter-label"%s>%s</h3>
			<div class="counter-value" data-wp-text="context.value"%s>%d</div>
			%s
		</div>',
		$wrapper_attr_string,
		$label_styles,
		$label,
		$value_styles,
		$initial_value,
		$controls_html
	);
}

// Register the render callback
register_block_type( 'wp-block-editor-course/interactive-counter-block', array(
	'render_callback' => 'render_interactive_counter_block',
) );
