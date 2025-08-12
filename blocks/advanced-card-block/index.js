/**
 * Advanced Card Block - Demonstrates complex block development concepts
 * 
 * This block shows:
 * - Multiple attributes and complex data handling
 * - InnerBlocks for nested content
 * - Media handling and image management
 * - Advanced styling and layout options
 * - Block variations and transformations
 * - Custom controls and inspector panels
 * - Responsive design considerations
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
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
	useInnerBlocksProps,
	store as blockEditorStore
} from '@wordpress/block-editor';
import { 
	PanelBody, 
	SelectControl, 
	ToggleControl,
	TextControl,
	ColorPalette,
	Button,
	ButtonGroup,
	RangeControl,
	__experimentalNumberControl as NumberControl,
	__experimentalUnitControl as UnitControl,
	__experimentalBoxControl as BoxControl
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { 
	formatBold, 
	formatItalic, 
	link, 
	moreHorizontal,
	edit,
	trash,
	plus
} from '@wordpress/icons';

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
		title,
		subtitle,
		imageUrl,
		imageAlt,
		imageId,
		cardStyle,
		showImage,
		showSubtitle,
		imagePosition,
		cardLayout,
		textAlign,
		titleColor,
		subtitleColor,
		backgroundColor,
		gradient,
		borderRadius,
		shadow,
		hoverEffect,
		linkUrl,
		linkTarget,
		rel,
		style,
		className
	} = attributes;

	// Get block props for styling and attributes
	const blockProps = useBlockProps( {
		className: `wp-block-advanced-card card-style-${ cardStyle } card-layout-${ cardLayout } ${ className }`,
		style: {
			textAlign,
			borderRadius: `${ borderRadius }px`,
			...style
		}
	} );

	// Get color settings from theme
	const colors = settings?.colors || [];
	const gradients = settings?.gradients || [];

	// InnerBlocks props
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'card-content' },
		{
			allowedBlocks: [
				'core/paragraph',
				'core/heading',
				'core/list',
				'core/buttons',
				'core/separator',
				'wp-block-editor-course/basic-text-block'
			],
			template: [
				['core/paragraph', { placeholder: 'Add card content...' }]
			],
			templateLock: false
		}
	);

	/**
	 * Handle title change
	 * 
	 * @param {string} newTitle - New title value
	 */
	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};

	/**
	 * Handle subtitle change
	 * 
	 * @param {string} newSubtitle - New subtitle value
	 */
	const onChangeSubtitle = ( newSubtitle ) => {
		setAttributes( { subtitle: newSubtitle } );
	};

	/**
	 * Handle image selection
	 * 
	 * @param {Object} media - Selected media object
	 */
	const onSelectImage = ( media ) => {
		setAttributes( {
			imageUrl: media.url,
			imageAlt: media.alt || '',
			imageId: media.id
		} );
	};

	/**
	 * Remove image
	 */
	const removeImage = () => {
		setAttributes( {
			imageUrl: '',
			imageAlt: '',
			imageId: null
		} );
	};

	/**
	 * Handle card style change
	 * 
	 * @param {string} newStyle - New card style
	 */
	const onChangeCardStyle = ( newStyle ) => {
		setAttributes( { cardStyle: newStyle } );
	};

	/**
	 * Handle layout change
	 * 
	 * @param {string} newLayout - New layout value
	 */
	const onChangeLayout = ( newLayout ) => {
		setAttributes( { cardLayout: newLayout } );
	};

	/**
	 * Handle image position change
	 * 
	 * @param {string} newPosition - New image position
	 */
	const onChangeImagePosition = ( newPosition ) => {
		setAttributes( { imagePosition: newPosition } );
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
	 * Handle shadow change
	 * 
	 * @param {string} newShadow - New shadow value
	 */
	const onChangeShadow = ( newShadow ) => {
		setAttributes( { shadow: newShadow } );
	};

	/**
	 * Handle hover effect change
	 * 
	 * @param {string} newEffect - New hover effect value
	 */
	const onChangeHoverEffect = ( newEffect ) => {
		setAttributes( { hoverEffect: newEffect } );
	};

	/**
	 * Handle link URL change
	 * 
	 * @param {string} newUrl - New link URL
	 */
	const onChangeLinkUrl = ( newUrl ) => {
		setAttributes( { linkUrl: newUrl } );
	};

	/**
	 * Handle link target change
	 * 
	 * @param {string} newTarget - New link target
	 */
	const onChangeLinkTarget = ( newTarget ) => {
		setAttributes( { linkTarget: newTarget } );
	};

	/**
	 * Handle rel attribute change
	 * 
	 * @param {string} newRel - New rel value
	 */
	const onChangeRel = ( newRel ) => {
		setAttributes( { rel: newRel } );
	};

	// Card style options
	const cardStyleOptions = [
		{ label: __( 'Default', 'wp-block-editor-course' ), value: 'default' },
		{ label: __( 'Minimal', 'wp-block-editor-course' ), value: 'minimal' },
		{ label: __( 'Elevated', 'wp-block-editor-course' ), value: 'elevated' },
		{ label: __( 'Outlined', 'wp-block-editor-course' ), value: 'outlined' },
		{ label: __( 'Gradient', 'wp-block-editor-course' ), value: 'gradient' }
	];

	// Layout options
	const layoutOptions = [
		{ label: __( 'Vertical', 'wp-block-editor-course' ), value: 'vertical' },
		{ label: __( 'Horizontal', 'wp-block-editor-course' ), value: 'horizontal' }
	];

	// Image position options
	const imagePositionOptions = [
		{ label: __( 'Top', 'wp-block-editor-course' ), value: 'top' },
		{ label: __( 'Bottom', 'wp-block-editor-course' ), value: 'bottom' },
		{ label: __( 'Left', 'wp-block-editor-course' ), value: 'left' },
		{ label: __( 'Right', 'wp-block-editor-course' ), value: 'right' }
	];

	// Shadow options
	const shadowOptions = [
		{ label: __( 'None', 'wp-block-editor-course' ), value: 'none' },
		{ label: __( 'Small', 'wp-block-editor-course' ), value: 'small' },
		{ label: __( 'Medium', 'wp-block-editor-course' ), value: 'medium' },
		{ label: __( 'Large', 'wp-block-editor-course' ), value: 'large' }
	];

	// Hover effect options
	const hoverEffectOptions = [
		{ label: __( 'None', 'wp-block-editor-course' ), value: 'none' },
		{ label: __( 'Lift', 'wp-block-editor-course' ), value: 'lift' },
		{ label: __( 'Glow', 'wp-block-editor-course' ), value: 'glow' },
		{ label: __( 'Scale', 'wp-block-editor-course' ), value: 'scale' }
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
				{/* Content Settings */}
				<PanelBody title={ __( 'Content Settings', 'wp-block-editor-course' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Show Image', 'wp-block-editor-course' ) }
						checked={ showImage }
						onChange={ ( newShowImage ) => setAttributes( { showImage: newShowImage } ) }
					/>

					<ToggleControl
						label={ __( 'Show Subtitle', 'wp-block-editor-course' ) }
						checked={ showSubtitle }
						onChange={ ( newShowSubtitle ) => setAttributes( { showSubtitle: newShowSubtitle } ) }
					/>

					{showImage && (
						<>
							<SelectControl
								label={ __( 'Image Position', 'wp-block-editor-course' ) }
								value={ imagePosition }
								options={ imagePositionOptions }
								onChange={ onChangeImagePosition }
							/>

							<MediaUploadCheck>
								<MediaUpload
									onSelect={ onSelectImage }
									allowedTypes={ ['image'] }
									value={ imageId }
									render={ ( { open } ) => (
										<div className="components-base-control">
											<label className="components-base-control__label">
												{ __( 'Card Image', 'wp-block-editor-course' ) }
											</label>
											<div className="components-base-control__field">
												{imageUrl ? (
													<div className="image-preview">
														<img 
															src={ imageUrl } 
															alt={ imageAlt }
															style={ { maxWidth: '100%', height: 'auto' } }
														/>
														<ButtonGroup>
															<Button 
																variant="secondary" 
																onClick={ open }
																icon={ edit }
															>
																{ __( 'Replace', 'wp-block-editor-course' ) }
															</Button>
															<Button 
																variant="secondary" 
																onClick={ removeImage }
																icon={ trash }
															>
																{ __( 'Remove', 'wp-block-editor-course' ) }
															</Button>
														</ButtonGroup>
													</div>
												) : (
													<Button 
														variant="secondary" 
														onClick={ open }
														icon={ plus }
													>
														{ __( 'Select Image', 'wp-block-editor-course' ) }
													</Button>
												)}
											</div>
										</div>
									) }
								/>
							</MediaUploadCheck>
						</>
					)}

					<TextControl
						label={ __( 'Link URL', 'wp-block-editor-course' ) }
						value={ linkUrl }
						onChange={ onChangeLinkUrl }
						placeholder={ __( 'https://example.com', 'wp-block-editor-course' ) }
						help={ __( 'Make the entire card clickable by adding a link URL.', 'wp-block-editor-course' ) }
					/>

					<SelectControl
						label={ __( 'Link Target', 'wp-block-editor-course' ) }
						value={ linkTarget }
						options={ [
							{ label: __( 'Same Window', 'wp-block-editor-course' ), value: '_self' },
							{ label: __( 'New Window', 'wp-block-editor-course' ), value: '_blank' }
						] }
						onChange={ onChangeLinkTarget }
					/>

					<TextControl
						label={ __( 'Rel Attribute', 'wp-block-editor-course' ) }
						value={ rel }
						onChange={ onChangeRel }
						placeholder={ 'nofollow noopener' }
						help={ __( 'Add rel attributes for security and SEO.', 'wp-block-editor-course' ) }
					/>
				</PanelBody>

				{/* Layout Settings */}
				<PanelBody title={ __( 'Layout Settings', 'wp-block-editor-course' ) }>
					<SelectControl
						label={ __( 'Card Style', 'wp-block-editor-course' ) }
						value={ cardStyle }
						options={ cardStyleOptions }
						onChange={ onChangeCardStyle }
					/>

					<SelectControl
						label={ __( 'Card Layout', 'wp-block-editor-course' ) }
						value={ cardLayout }
						options={ layoutOptions }
						onChange={ onChangeLayout }
					/>

					<RangeControl
						label={ __( 'Border Radius', 'wp-block-editor-course' ) }
						value={ borderRadius }
						onChange={ onChangeBorderRadius }
						min={ 0 }
						max={ 50 }
						step={ 1 }
					/>

					<SelectControl
						label={ __( 'Shadow', 'wp-block-editor-course' ) }
						value={ shadow }
						options={ shadowOptions }
						onChange={ onChangeShadow }
					/>

					<SelectControl
						label={ __( 'Hover Effect', 'wp-block-editor-course' ) }
						value={ hoverEffect }
						options={ hoverEffectOptions }
						onChange={ onChangeHoverEffect }
					/>
				</PanelBody>

				{/* Color Settings */}
				<PanelBody title={ __( 'Color Settings', 'wp-block-editor-course' ) }>
					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Title Color', 'wp-block-editor-course' ) }
						</label>
						<ColorPalette
							value={ titleColor }
							onChange={ ( newColor ) => setAttributes( { titleColor: newColor } ) }
							colors={ colors }
						/>
					</div>

					{showSubtitle && (
						<div className="components-base-control">
							<label className="components-base-control__label">
								{ __( 'Subtitle Color', 'wp-block-editor-course' ) }
							</label>
							<ColorPalette
								value={ subtitleColor }
								onChange={ ( newColor ) => setAttributes( { subtitleColor: newColor } ) }
								colors={ colors }
							/>
						</div>
					)}

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
				{/* Card Image */}
				{showImage && imageUrl && (
					<div className={ `card-image image-position-${ imagePosition }` }>
						<img 
							src={ imageUrl } 
							alt={ imageAlt }
							style={ { borderRadius: `${ borderRadius }px` } }
						/>
					</div>
				)}

				{/* Card Content */}
				<div className="card-body">
					{/* Card Title */}
					<RichText
						tagName="h3"
						className="card-title"
						value={ title }
						onChange={ onChangeTitle }
						placeholder={ __( 'Card Title', 'wp-block-editor-course' ) }
						style={ { color: titleColor } }
						allowedFormats={ ['core/bold', 'core/italic', 'core/link'] }
					/>

					{/* Card Subtitle */}
					{showSubtitle && (
						<RichText
							tagName="p"
							className="card-subtitle"
							value={ subtitle }
							onChange={ onChangeSubtitle }
							placeholder={ __( 'Card subtitle or description', 'wp-block-editor-course' ) }
							style={ { color: subtitleColor } }
							allowedFormats={ ['core/bold', 'core/italic', 'core/link'] }
						/>
					)}

					{/* InnerBlocks for additional content */}
					<div { ...innerBlocksProps } />
				</div>
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
		title,
		subtitle,
		imageUrl,
		imageAlt,
		cardStyle,
		showImage,
		showSubtitle,
		imagePosition,
		cardLayout,
		textAlign,
		titleColor,
		subtitleColor,
		backgroundColor,
		gradient,
		borderRadius,
		shadow,
		hoverEffect,
		linkUrl,
		linkTarget,
		rel,
		style,
		className
	} = attributes;

	// Get block props for styling and attributes
	const blockProps = useBlockProps.save( {
		className: `wp-block-advanced-card card-style-${ cardStyle } card-layout-${ cardLayout } shadow-${ shadow } hover-${ hoverEffect } ${ className }`,
		style: {
			textAlign,
			borderRadius: `${ borderRadius }px`,
			backgroundColor: backgroundColor,
			background: gradient,
			...style
		}
	} );

	// Build link attributes
	const linkAttributes = {};
	if ( linkUrl ) {
		linkAttributes.href = linkUrl;
		linkAttributes.target = linkTarget;
		if ( rel ) {
			linkAttributes.rel = rel;
		}
	}

	// Card content
	const cardContent = (
		<>
			{/* Card Image */}
			{showImage && imageUrl && (
				<div className={ `card-image image-position-${ imagePosition }` }>
					<img 
						src={ imageUrl } 
						alt={ imageAlt }
						style={ { borderRadius: `${ borderRadius }px` } }
					/>
				</div>
			)}

			{/* Card Content */}
			<div className="card-body">
				{/* Card Title */}
				<RichText.Content
					tagName="h3"
					className="card-title"
					value={ title }
					style={ { color: titleColor } }
				/>

				{/* Card Subtitle */}
				{showSubtitle && (
					<RichText.Content
						tagName="p"
						className="card-subtitle"
						value={ subtitle }
						style={ { color: subtitleColor } }
					/>
				)}

				{/* InnerBlocks content */}
				<div className="card-content">
					<InnerBlocks.Content />
				</div>
			</div>
		</>
	);

	// Return wrapped in link if URL is provided
	if ( linkUrl ) {
		return (
			<div { ...blockProps }>
				<a { ...linkAttributes }>
					{ cardContent }
				</a>
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			{ cardContent }
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
registerBlockType( 'wp-block-editor-course/advanced-card-block', {
	edit: EnhancedEdit,
	save: Save,
} );
