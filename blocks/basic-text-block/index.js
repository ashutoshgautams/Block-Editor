/**
 * Basic Text Block - Demonstrates fundamental block development concepts
 * 
 * This block shows:
 * - Basic block structure and registration
 * - Attributes definition and usage
 * - Edit and save functions
 * - Block controls and toolbar
 * - WordPress components usage
 * - Styling and theming integration
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
	__experimentalNumberControl as NumberControl
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

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
		content,
		textAlign,
		fontSize,
		textColor,
		backgroundColor,
		gradient,
		style,
		className
	} = attributes;

	// Get block props for styling and attributes
	const blockProps = useBlockProps( {
		className: `wp-block-basic-text ${ className }`,
		style: {
			textAlign,
			...style
		}
	} );

	// Get color settings from theme
	const colors = settings?.colors || [];
	const gradients = settings?.gradients || [];

	/**
	 * Handle content change
	 * 
	 * @param {string} newContent - New content value
	 */
	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } );
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
	 * Handle font size change
	 * 
	 * @param {string} newFontSize - New font size value
	 */
	const onChangeFontSize = ( newFontSize ) => {
		setAttributes( { fontSize: newFontSize } );
	};

	/**
	 * Handle text color change
	 * 
	 * @param {string} newColor - New text color value
	 */
	const onChangeTextColor = ( newColor ) => {
		setAttributes( { textColor: newColor } );
	};

	/**
	 * Handle background color change
	 * 
	 * @param {string} newColor - New background color value
	 */
	const onChangeBackgroundColor = ( newColor ) => {
		setAttributes( { backgroundColor: newColor } );
	};

	/**
	 * Handle gradient change
	 * 
	 * @param {string} newGradient - New gradient value
	 */
	const onChangeGradient = ( newGradient ) => {
		setAttributes( { gradient: newGradient } );
	};

	/**
	 * Handle custom style change
	 * 
	 * @param {Object} newStyle - New style object
	 */
	const onChangeStyle = ( newStyle ) => {
		setAttributes( { style: { ...style, ...newStyle } } );
	};

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
				<PanelBody title={ __( 'Text Settings', 'wp-block-editor-course' ) }>
					<SelectControl
						label={ __( 'Font Size', 'wp-block-editor-course' ) }
						value={ fontSize }
						options={ [
							{ label: __( 'Small', 'wp-block-editor-course' ), value: 'small' },
							{ label: __( 'Medium', 'wp-block-editor-course' ), value: 'medium' },
							{ label: __( 'Large', 'wp-block-editor-course' ), value: 'large' },
							{ label: __( 'Extra Large', 'wp-block-editor-course' ), value: 'x-large' }
						] }
						onChange={ onChangeFontSize }
					/>

					{/* Text Color Palette */}
					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Text Color', 'wp-block-editor-course' ) }
						</label>
						<ColorPalette
							value={ textColor }
							onChange={ onChangeTextColor }
							colors={ colors }
						/>
					</div>

					{/* Background Color Palette */}
					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Background Color', 'wp-block-editor-course' ) }
						</label>
						<ColorPalette
							value={ backgroundColor }
							onChange={ onChangeBackgroundColor }
							colors={ colors }
						/>
					</div>

					{/* Gradient Palette */}
					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Gradient', 'wp-block-editor-course' ) }
						</label>
						<ColorPalette
							value={ gradient }
							onChange={ onChangeGradient }
							gradients={ gradients }
						/>
					</div>
				</PanelBody>

				<PanelBody title={ __( 'Advanced Settings', 'wp-block-editor-course' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Custom CSS Class', 'wp-block-editor-course' ) }
						value={ className }
						onChange={ ( newClassName ) => setAttributes( { className: newClassName } ) }
						help={ __( 'Add custom CSS classes for additional styling.', 'wp-block-editor-course' ) }
					/>

					<NumberControl
						label={ __( 'Line Height', 'wp-block-editor-course' ) }
						value={ style?.lineHeight }
						onChange={ ( newLineHeight ) => onChangeStyle( { lineHeight: newLineHeight } ) }
						min={ 0.5 }
						max={ 3 }
						step={ 0.1 }
					/>

					<ToggleControl
						label={ __( 'Enable Drop Cap', 'wp-block-editor-course' ) }
						checked={ style?.dropCap }
						onChange={ ( newDropCap ) => onChangeStyle( { dropCap: newDropCap } ) }
						help={ __( 'Add a decorative first letter.', 'wp-block-editor-course' ) }
					/>
				</PanelBody>
			</InspectorControls>

			{/* Block Content */}
			<div { ...blockProps }>
				<RichText
					tagName="p"
					value={ content }
					onChange={ onChangeContent }
					placeholder={ __( 'Enter your text here...', 'wp-block-editor-course' ) }
					className={ `has-text-align-${ textAlign } has-${ fontSize }-font-size` }
					style={ {
						color: textColor,
						backgroundColor: backgroundColor,
						background: gradient,
						...style
					} }
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/link',
						'core/strikethrough',
						'core/underline',
						'core/text-color',
						'core/subscript',
						'core/superscript'
					] }
					keepPlaceholderOnFocus={ true }
				/>
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
		content,
		textAlign,
		fontSize,
		textColor,
		backgroundColor,
		gradient,
		style,
		className
	} = attributes;

	// Get block props for styling and attributes
	const blockProps = useBlockProps.save( {
		className: `wp-block-basic-text ${ className }`,
		style: {
			textAlign,
			...style
		}
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="p"
				value={ content }
				className={ `has-text-align-${ textAlign } has-${ fontSize }-font-size` }
				style={ {
					color: textColor,
					backgroundColor: backgroundColor,
					background: gradient,
					...style
				} }
			/>
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
registerBlockType( 'wp-block-editor-course/basic-text-block', {
	edit: EnhancedEdit,
	save: Save,
} );
