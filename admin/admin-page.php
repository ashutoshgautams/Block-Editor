<?php
/**
 * Admin Page for Block Editor Course Plugin
 * 
 * @package WPBlockEditorCourse
 * @since 1.0.0
 */

// Prevent direct access.
if (! defined('ABSPATH') ) {
    exit;
}
?>

<div class="wrap">
    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
    
    <div class="card">
        <h2><?php esc_html_e('About This Plugin', 'wp-block-editor-course'); ?></h2>
        <p><?php esc_html_e('This plugin provides practical examples for learning WordPress Block Editor development. It includes various blocks demonstrating different concepts and techniques.', 'wp-block-editor-course'); ?></p>
    </div>

    <div class="card">
        <h2><?php esc_html_e('Available Blocks', 'wp-block-editor-course'); ?></h2>
        <ul>
            <li><strong><?php esc_html_e('Basic Text Block', 'wp-block-editor-course'); ?></strong> - <?php esc_html_e('Demonstrates fundamental block development concepts', 'wp-block-editor-course'); ?></li>
            <li><strong><?php esc_html_e('Advanced Card Block', 'wp-block-editor-course'); ?></strong> - <?php esc_html_e('Shows complex block with InnerBlocks and multiple attributes', 'wp-block-editor-course'); ?></li>
            <li><strong><?php esc_html_e('Interactive Counter Block', 'wp-block-editor-course'); ?></strong> - <?php esc_html_e('Demonstrates the Interactivity API with state management', 'wp-block-editor-course'); ?></li>
            <li><strong><?php esc_html_e('Data Fetching Block', 'wp-block-editor-course'); ?></strong> - <?php esc_html_e('Shows how to fetch and display data using wp.data', 'wp-block-editor-course'); ?></li>
            <li><strong><?php esc_html_e('Custom Controls Block', 'wp-block-editor-course'); ?></strong> - <?php esc_html_e('Demonstrates custom block controls and editor customization', 'wp-block-editor-course'); ?></li>
            <li><strong><?php esc_html_e('Pattern Block', 'wp-block-editor-course'); ?></strong> - <?php esc_html_e('Shows block patterns and reusable layouts', 'wp-block-editor-course'); ?></li>
            <li><strong><?php esc_html_e('Theme Integration Block', 'wp-block-editor-course'); ?></strong> - <?php esc_html_e('Demonstrates theme.json integration and global styles', 'wp-block-editor-course'); ?></li>
            <li><strong><?php esc_html_e('Accessibility Block', 'wp-block-editor-course'); ?></strong> - <?php esc_html_e('Shows accessibility best practices in block development', 'wp-block-editor-course'); ?></li>
            <li><strong><?php esc_html_e('Performance Block', 'wp-block-editor-course'); ?></strong> - <?php esc_html_e('Demonstrates optimization techniques and best practices', 'wp-block-editor-course'); ?></li>
            <li><strong><?php esc_html_e('Security Block', 'wp-block-editor-course'); ?></strong> - <?php esc_html_e('Shows security best practices and data sanitization', 'wp-block-editor-course'); ?></li>
        </ul>
    </div>

    <div class="card">
        <h2><?php esc_html_e('Getting Started', 'wp-block-editor-course'); ?></h2>
        <ol>
            <li><?php esc_html_e('Go to any post or page in the Block Editor', 'wp-block-editor-course'); ?></li>
            <li><?php esc_html_e('Click the "+" button to add a new block', 'wp-block-editor-course'); ?></li>
            <li><?php esc_html_e('Search for "Block Editor Course" to find the available blocks', 'wp-block-editor-course'); ?></li>
            <li><?php esc_html_e('Add blocks and explore their settings in the sidebar', 'wp-block-editor-course'); ?></li>
            <li><?php esc_html_e('Check the frontend to see how the blocks render', 'wp-block-editor-course'); ?></li>
        </ol>
    </div>

    <div class="card">
        <h2><?php esc_html_e('Plugin Information', 'wp-block-editor-course'); ?></h2>
        <table class="form-table">
            <tr>
                <th scope="row"><?php esc_html_e('Version', 'wp-block-editor-course'); ?></th>
                <td><?php echo esc_html(WP_BLOCK_EDITOR_COURSE_VERSION); ?></td>
            </tr>
            <tr>
                <th scope="row"><?php esc_html_e('Author', 'wp-block-editor-course'); ?></th>
                <td><?php esc_html_e('Ashutosh Gautam', 'wp-block-editor-course'); ?></td>
            </tr>
            <tr>
                <th scope="row"><?php esc_html_e('Website', 'wp-block-editor-course'); ?></th>
                <td><a href="https://ashutoshgautam.com" target="_blank">https://ashutoshgautam.com</a></td>
            </tr>
            <tr>
                <th scope="row"><?php esc_html_e('License', 'wp-block-editor-course'); ?></th>
                <td><?php esc_html_e('GPL v2 or later', 'wp-block-editor-course'); ?></td>
            </tr>
        </table>
    </div>

    <div class="card">
        <h2><?php esc_html_e('Support', 'wp-block-editor-course'); ?></h2>
        <p><?php esc_html_e('For questions, issues, or contributions, please visit the plugin repository or contact the author.', 'wp-block-editor-course'); ?></p>
        <p>
            <a href="https://github.com/your-username/wp-block-editor-course" target="_blank" class="button button-primary">
                <?php esc_html_e('View Repository', 'wp-block-editor-course'); ?>
            </a>
        </p>
    </div>
</div>

<style>
.card {
    max-width: 800px;
    margin: 20px 0;
    padding: 20px;
    background: #fff;
    border: 1px solid #ccd0d4;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0,0,0,.04);
}

.card h2 {
    margin-top: 0;
    color: #23282d;
    font-size: 1.3em;
    font-weight: 600;
}

.card ul {
    margin-left: 20px;
}

.card ol {
    margin-left: 20px;
}

.card li {
    margin-bottom: 8px;
}

.form-table th {
    width: 200px;
}

.button-primary {
    margin-top: 10px;
}
</style>
