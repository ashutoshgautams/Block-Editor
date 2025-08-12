/**
 * Interactive Counter Block - Demonstrates WordPress Interactivity API
 * 
 * This block shows:
 * - Interactivity API implementation
 * - Client-side state management
 * - Event handling and user interactions
 * - Performance optimization techniques
 * - Accessibility considerations
 * - Real-time updates and animations
 * 
 * @package WPBlockEditorCourse
 * @since 1.0.0
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	RichText, 
	BlockControls,
	AlignmentToolbar,
	InspectorControls
} from '@wordpress/block-editor';
import { 
	PanelBody, 
	SelectControl, 
	ToggleControl,
	TextControl,
	ColorPalette,
	RangeControl,
	__experimentalNumberControl as NumberControl
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

/**
 * Edit function - Renders the block in the editor
 * 
 * @param {Object} props - Block props
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Function to update attributes
 * @param {string} props.clientId - Unique block ID
 * @param {boolean} props.isSelected - Whether block is selected
 * @returns {JSX.Element} Edit component
 */
function Edit( { 
	attributes, 
	setAttributes, 
	clientId, 
	isSelected,
	settings 
} ) {
	const {
		initialValue,
		step,
		minValue,
		maxValue,
		label,
		showControls,
		showReset,
		buttonStyle,
		counterStyle,
		textAlign,
		labelColor,
		valueColor,
		buttonColor,
		backgroundColor,
		gradient,
		borderRadius,
		animation,
		autoIncrement,
		autoIncrementInterval,
		style,
		className
	} = attributes;

	// Get block props for styling and attributes
	const blockProps = useBlockProps( {
		className: `wp-block-interactive-counter counter-style-${ counterStyle } ${ className }`,
		style: {
			textAlign,
			borderRadius: `${ borderRadius }px`,
			...style
		}
	} );

	// Get color settings from theme
	const colors = settings?.colors || [];
	const gradients = settings?.gradients || [];

	// Local state for preview
	const [previewValue, setPreviewValue] = useState(initialValue);

	/**
	 * Handle label change
	 * 
	 * @param {string} newLabel - New label value
	 */
	const onChangeLabel = ( newLabel ) => {
		setAttributes( { label: newLabel } );
	};

	/**
	 * Handle initial value change
	 * 
	 * @param {number} newValue - New initial value
	 */
	const onChangeInitialValue = ( newValue ) => {
		setAttributes( { initialValue: newValue } );
		setPreviewValue(newValue);
	};

	/**
	 * Handle step change
	 * 
	 * @param {number} newStep - New step value
	 */
	const onChangeStep = ( newStep ) => {
		setAttributes( { step: newStep } );
	};

	/**
	 * Handle min value change
	 * 
	 * @param {number} newMin - New minimum value
	 */
	const onChangeMinValue = ( newMin ) => {
		setAttributes( { minValue: newMin } );
	};

	/**
	 * Handle max value change
	 * 
	 * @param {number} newMax - New maximum value
	 */
	const onChangeMaxValue = ( newMax ) => {
		setAttributes( { maxValue: newMax } );
	};

	/**
	 * Handle text alignment change
	 * 
	 * @param {string} newAlign - New alignment value
	 */
	const onChangeAlign = ( newAlign ) => {
		setAttributes( { textAlign: newAlign } );
	};

	/**
	 * Handle border radius change
	 * 
	 * @param {number} newRadius - New border radius value
	 */
	const onChangeBorderRadius = ( newRadius ) => {
		setAttributes( { borderRadius: newRadius } );
	};

	/**
	 * Handle preview increment
	 */
	const handlePreviewIncrement = () => {
		const newValue = Math.min(previewValue + step, maxValue);
		setPreviewValue(newValue);
	};

	/**
	 * Handle preview decrement
	 */
	const handlePreviewDecrement = () => {
		const newValue = Math.max(previewValue - step, minValue);
		setPreviewValue(newValue);
	};

	/**
	 * Handle preview reset
	 */
	const handlePreviewReset = () => {
		setPreviewValue(initialValue);
	};

	// Button style options
	const buttonStyleOptions = [
		{ label: __( 'Default', 'wp-block-editor-course' ), value: 'default' },
		{ label: __( 'Rounded', 'wp-block-editor-course' ), value: 'rounded' },
		{ label: __( 'Outlined', 'wp-block-editor-course' ), value: 'outlined' },
		{ label: __( 'Minimal', 'wp-block-editor-course' ), value: 'minimal' }
	];

	// Counter style options
	const counterStyleOptions = [
		{ label: __( 'Default', 'wp-block-editor-course' ), value: 'default' },
		{ label: __( 'Card', 'wp-block-editor-course' ), value: 'card' },
		{ label: __( 'Minimal', 'wp-block-editor-course' ), value: 'minimal' },
		{ label: __( 'Gradient', 'wp-block-editor-course' ), value: 'gradient' }
	];

	// Animation options
	const animationOptions = [
		{ label: __( 'None', 'wp-block-editor-course' ), value: 'none' },
		{ label: __( 'Pulse', 'wp-block-editor-course' ), value: 'pulse' },
		{ label: __( 'Bounce', 'wp-block-editor-course' ), value: 'bounce' },
		{ label: __( 'Fade', 'wp-block-editor-course' ), value: 'fade' }
	];

	return (
		<>
			{/* Block Controls - Toolbar */}
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ onChangeAlign }
				/>
			</BlockControls>

			{/* Inspector Controls - Sidebar */}
			<InspectorControls>
				{/* Counter Settings */}
				<PanelBody title={ __( 'Counter Settings', 'wp-block-editor-course' ) } initialOpen={ true }>
					<NumberControl
						label={ __( 'Initial Value', 'wp-block-editor-course' ) }
						value={ initialValue }
						onChange={ onChangeInitialValue }
						min={ minValue }
						max={ maxValue }
						step={ 1 }
					/>

					<NumberControl
						label={ __( 'Step Value', 'wp-block-editor-course' ) }
						value={ step }
						onChange={ onChangeStep }
						min={ 1 }
						max={ 100 }
						step={ 1 }
					/>

					<NumberControl
						label={ __( 'Minimum Value', 'wp-block-editor-course' ) }
						value={ minValue }
						onChange={ onChangeMinValue }
						min={ -1000 }
						max={ maxValue }
						step={ 1 }
					/>

					<NumberControl
						label={ __( 'Maximum Value', 'wp-block-editor-course' ) }
						value={ maxValue }
						onChange={ onChangeMaxValue }
						min={ minValue }
						max={ 1000 }
						step={ 1 }
					/>

					<ToggleControl
						label={ __( 'Show Controls', 'wp-block-editor-course' ) }
						checked={ showControls }
						onChange={ ( newShowControls ) => setAttributes( { showControls: newShowControls } ) }
					/>

					<ToggleControl
						label={ __( 'Show Reset Button', 'wp-block-editor-course' ) }
						checked={ showReset }
						onChange={ ( newShowReset ) => setAttributes( { showReset: newShowReset } ) }
					/>

					<ToggleControl
						label={ __( 'Auto Increment', 'wp-block-editor-course' ) }
						checked={ autoIncrement }
						onChange={ ( newAutoIncrement ) => setAttributes( { autoIncrement: newAutoIncrement } ) }
					/>

					{autoIncrement && (
						<RangeControl
							label={ __( 'Auto Increment Interval (ms)', 'wp-block-editor-course' ) }
							value={ autoIncrementInterval }
							onChange={ ( newInterval ) => setAttributes( { autoIncrementInterval: newInterval } ) }
							min={ 100 }
							max={ 10000 }
							step={ 100 }
						/>
					)}
				</PanelBody>

				{/* Style Settings */}
				<PanelBody title={ __( 'Style Settings', 'wp-block-editor-course' ) }>
					<SelectControl
						label={ __( 'Counter Style', 'wp-block-editor-course' ) }
						value={ counterStyle }
						options={ counterStyleOptions }
						onChange={ ( newStyle ) => setAttributes( { counterStyle: newStyle } ) }
					/>

					<SelectControl
						label={ __( 'Button Style', 'wp-block-editor-course' ) }
						value={ buttonStyle }
						options={ buttonStyleOptions }
						onChange={ ( newStyle ) => setAttributes( { buttonStyle: newStyle } ) }
					/>

					<SelectControl
						label={ __( 'Animation', 'wp-block-editor-course' ) }
						value={ animation }
						options={ animationOptions }
						onChange={ ( newAnimation ) => setAttributes( { animation: newAnimation } ) }
					/>

					<RangeControl
						label={ __( 'Border Radius', 'wp-block-editor-course' ) }
						value={ borderRadius }
						onChange={ onChangeBorderRadius }
						min={ 0 }
						max={ 50 }
						step={ 1 }
					/>
				</PanelBody>

				{/* Color Settings */}
				<PanelBody title={ __( 'Color Settings', 'wp-block-editor-course' ) }>
					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Label Color', 'wp-block-editor-course' ) }
						</label>
						<ColorPalette
							value={ labelColor }
							onChange={ ( newColor ) => setAttributes( { labelColor: newColor } ) }
							colors={ colors }
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Value Color', 'wp-block-editor-course' ) }
						</label>
						<ColorPalette
							value={ valueColor }
							onChange={ ( newColor ) => setAttributes( { valueColor: newColor } ) }
							colors={ colors }
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Button Color', 'wp-block-editor-course' ) }
						</label>
						<ColorPalette
							value={ buttonColor }
							onChange={ ( newColor ) => setAttributes( { buttonColor: newColor } ) }
							colors={ colors }
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Background Color', 'wp-block-editor-course' ) }
						</label>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( newColor ) => setAttributes( { backgroundColor: newColor } ) }
							colors={ colors }
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Gradient', 'wp-block-editor-course' ) }
						</label>
						<ColorPalette
							value={ gradient }
							onChange={ ( newGradient ) => setAttributes( { gradient: newGradient } ) }
							gradients={ gradients }
						/>
					</div>
				</PanelBody>

				{/* Advanced Settings */}
				<PanelBody title={ __( 'Advanced Settings', 'wp-block-editor-course' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Custom CSS Class', 'wp-block-editor-course' ) }
						value={ className }
						onChange={ ( newClassName ) => setAttributes( { className: newClassName } ) }
						help={ __( 'Add custom CSS classes for additional styling.', 'wp-block-editor-course' ) }
					/>
				</PanelBody>
			</InspectorControls>

			{/* Block Content */}
			<div { ...blockProps }>
				{/* Counter Label */}
				<RichText
					tagName="h3"
					className="counter-label"
					value={ label }
					onChange={ onChangeLabel }
					placeholder={ __( 'Counter Label', 'wp-block-editor-course' ) }
					style={ { color: labelColor } }
					allowedFormats={ ['core/bold', 'core/italic'] }
				/>

				{/* Counter Value Display */}
				<div 
					className={ `counter-value animation-${ animation }` }
					style={ { color: valueColor } }
				>
					{ previewValue }
				</div>

				{/* Counter Controls */}
				{showControls && (
					<div className={ `counter-controls button-style-${ buttonStyle }` }>
						<button
							type="button"
							className="counter-button counter-decrease"
							onClick={ handlePreviewDecrement }
							disabled={ previewValue <= minValue }
							style={ { backgroundColor: buttonColor } }
							aria-label={ __( 'Decrease counter', 'wp-block-editor-course' ) }
						>
							−
						</button>

						<button
							type="button"
							className="counter-button counter-increase"
							onClick={ handlePreviewIncrement }
							disabled={ previewValue >= maxValue }
							style={ { backgroundColor: buttonColor } }
							aria-label={ __( 'Increase counter', 'wp-block-editor-course' ) }
						>
							+
						</button>

						{showReset && (
							<button
								type="button"
								className="counter-button counter-reset"
								onClick={ handlePreviewReset }
								style={ { backgroundColor: buttonColor } }
								aria-label={ __( 'Reset counter', 'wp-block-editor-course' ) }
							>
								{ __( 'Reset', 'wp-block-editor-course' ) }
							</button>
						)}
					</div>
				)}

				{/* Editor Notice */}
				{isSelected && (
					<div className="editor-notice">
						<p>{ __( 'This is a preview. The counter will be interactive on the frontend.', 'wp-block-editor-course' ) }</p>
					</div>
				)}
			</div>
		</>
	);
}

/**
 * Save function - Renders the block for the frontend
 * 
 * @param {Object} props - Block props
 * @param {Object} props.attributes - Block attributes
 * @returns {JSX.Element} Save component
 */
function Save( { attributes } ) {
	const {
		initialValue,
		step,
		minValue,
		maxValue,
		label,
		showControls,
		showReset,
		buttonStyle,
		counterStyle,
		textAlign,
		labelColor,
		valueColor,
		buttonColor,
		backgroundColor,
		gradient,
		borderRadius,
		animation,
		autoIncrement,
		autoIncrementInterval,
		style,
		className
	} = attributes;

	// Get block props for styling and attributes
	const blockProps = useBlockProps.save( {
		className: `wp-block-interactive-counter counter-style-${ counterStyle } button-style-${ buttonStyle } animation-${ animation } ${ className }`,
		style: {
			textAlign,
			borderRadius: `${ borderRadius }px`,
			backgroundColor: backgroundColor,
			background: gradient,
			...style
		}
	} );

	// Build data attributes for Interactivity API
	const dataAttributes = {
		'data-wp-interactive': 'counter',
		'data-wp-context': JSON.stringify({
			value: initialValue,
			step: step,
			min: minValue,
			max: maxValue,
			autoIncrement: autoIncrement,
			autoIncrementInterval: autoIncrementInterval
		})
	};

	return (
		<div { ...blockProps } { ...dataAttributes }>
			{/* Counter Label */}
			<RichText.Content
				tagName="h3"
				className="counter-label"
				value={ label }
				style={ { color: labelColor } }
			/>

			{/* Counter Value Display */}
			<div 
				className="counter-value"
				style={ { color: valueColor } }
				data-wp-text="context.value"
			>
				{ initialValue }
			</div>

			{/* Counter Controls */}
			{showControls && (
				<div className="counter-controls">
					<button
						type="button"
						className="counter-button counter-decrease"
						data-wp-on--click="actions.decrease"
						data-wp-bind--disabled="state.isMin"
						style={ { backgroundColor: buttonColor } }
						aria-label={ __( 'Decrease counter', 'wp-block-editor-course' ) }
					>
						−
					</button>

					<button
						type="button"
						className="counter-button counter-increase"
						data-wp-on--click="actions.increase"
						data-wp-bind--disabled="state.isMax"
						style={ { backgroundColor: buttonColor } }
						aria-label={ __( 'Increase counter', 'wp-block-editor-course' ) }
					>
						+
					</button>

					{showReset && (
						<button
							type="button"
							className="counter-button counter-reset"
							data-wp-on--click="actions.reset"
							style={ { backgroundColor: buttonColor } }
							aria-label={ __( 'Reset counter', 'wp-block-editor-course' ) }
						>
							{ __( 'Reset', 'wp-block-editor-course' ) }
						</button>
					)}
				</div>
			)}
		</div>
	);
}

// Enhance the Edit component with WordPress data
const EnhancedEdit = compose( [
	withSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		return {
			settings: getSettings()
		};
	} ),
	withDispatch( ( dispatch ) => {
		return {};
	} )
] )( Edit );

// Register the block
registerBlockType( 'wp-block-editor-course/interactive-counter-block', {
	edit: EnhancedEdit,
	save: Save,
} );
