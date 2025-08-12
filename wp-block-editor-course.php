<?php
/**
 * Plugin Name: WordPress VIP Block Editor Course - Practical Examples
 * Plugin URI: https://github.com/your-username/wp-block-editor-course
 * Description: A comprehensive collection of practical examples demonstrating WordPress Block Editor development concepts. Perfect for learning and testing block development techniques.
 * Version: 1.0.0
 * Author: Ashutosh Gautam
 * Author URI: https://ashutoshgautam.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: wp-block-editor-course
 * Domain Path: /languages
 * Requires at least: 6.0
 * Tested up to: 6.8
 * Requires PHP: 7.4
 * Network: false
 *
 * @category WordPress_Plugin
 * @package  WPBlockEditorCourse
 * @author   Ashutosh Gautam <ashutosh.gautam@rtcamp.com>
 * @license  GPL v2 or later
 * @link     https://ashutoshgautam.com
 * @since    1.0.0
 */

// Prevent direct access.
if (! defined('ABSPATH') ) {
    exit;
}

// Define plugin constants.
define('WP_BLOCK_EDITOR_COURSE_VERSION', '1.0.0');
define('WP_BLOCK_EDITOR_COURSE_PLUGIN_URL', plugin_dir_url(__FILE__));
define('WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('WP_BLOCK_EDITOR_COURSE_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Main plugin class
 *
 * @category WordPress_Plugin
 * @package  WPBlockEditorCourse
 * @author   Ashutosh Gautam <ashutosh.gautam@rtcamp.com>
 * @license  GPL v2 or later
 * @link     https://ashutoshgautam.com
 * @since    1.0.0
 */
class WP_Block_Editor_Course
{

    /**
     * Plugin instance
     *
     * @var WP_Block_Editor_Course
     */
    private static $_instance = null;

    /**
     * Get plugin instance
     *
     * @return WP_Block_Editor_Course The plugin instance.
     */
    public static function getInstance()
    {
        if (null === self::$_instance ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Constructor
     *
     * @return void
     */
    private function __construct()
    {
        $this->_initHooks();
    }

    /**
     * Initialize hooks
     *
     * @return void
     */
    private function _initHooks()
    {
        add_action('init', array( $this, 'init' ));
        add_action('enqueue_block_editor_assets', array( $this, 'enqueueEditorAssets' ));
        add_action('wp_enqueue_scripts', array( $this, 'enqueueFrontendAssets' ));
        add_action('admin_menu', array( $this, 'addAdminMenu' ));
        add_action('admin_init', array( $this, 'adminInit' ));
    }

    /**
     * Initialize plugin
     *
     * @return void
     */
    public function init()
    {
        // Load text domain for internationalization.
        load_plugin_textdomain('wp-block-editor-course', false, dirname(WP_BLOCK_EDITOR_COURSE_PLUGIN_BASENAME) . '/languages');

        // Register blocks.
        $this->_registerBlocks();

        // Register block patterns.
        $this->_registerPatterns();

        // Register block styles.
        $this->_registerBlockStyles();

        // Register block variations.
        $this->_registerBlockVariations();
    }

    /**
     * Register all custom blocks
     *
     * @return void
     */
    private function _registerBlocks()
    {
        // Basic Text Block.
        register_block_type(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'blocks/basic-text-block');

        // Advanced Card Block.
        register_block_type(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'blocks/advanced-card-block');

        // Interactive Counter Block.
        register_block_type(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'blocks/interactive-counter-block');

        // Data Fetching Block.
        register_block_type(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'blocks/data-fetching-block');

        // Custom Controls Block.
        register_block_type(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'blocks/custom-controls-block');

        // Pattern Block.
        register_block_type(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'blocks/pattern-block');

        // Theme Integration Block.
        register_block_type(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'blocks/theme-integration-block');

        // Accessibility Block.
        register_block_type(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'blocks/accessibility-block');

        // Performance Block.
        register_block_type(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'blocks/performance-block');

        // Security Block.
        register_block_type(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'blocks/security-block');
    }

    /**
     * Register block patterns
     *
     * @return void
     */
    private function _registerPatterns()
    {
        // Register custom block patterns.
        register_block_pattern_category(
            'wp-block-editor-course',
            array( 'label' => __('Block Editor Course Patterns', 'wp-block-editor-course') )
        );

        // Include pattern files.
        $pattern_files = glob(WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'patterns/*.php');
        foreach ( $pattern_files as $pattern_file ) {
            include_once $pattern_file;
        }
    }

    /**
     * Register block styles
     *
     * @return void
     */
    private function _registerBlockStyles()
    {
        // Register custom block styles.
        register_block_style(
            'core/paragraph',
            array(
            'name'         => 'highlighted',
            'label'        => __('Highlighted', 'wp-block-editor-course'),
            'inline_style' => '.is-style-highlighted { background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%); padding: 1rem; border-radius: 8px; }',
            )
        );

        register_block_style(
            'core/heading',
            array(
            'name'         => 'gradient-text',
            'label'        => __('Gradient Text', 'wp-block-editor-course'),
            'inline_style' => '.is-style-gradient-text { background: linear-gradient(45deg, #ff6b6b, #4ecdc4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }',
            )
        );
    }

    /**
     * Register block variations
     *
     * @return void
     */
    private function _registerBlockVariations()
    {
        // Register custom block variations.
        wp_enqueue_script(
            'wp-block-editor-course-variations',
            WP_BLOCK_EDITOR_COURSE_PLUGIN_URL . 'assets/js/block-variations.js',
            array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' ),
            WP_BLOCK_EDITOR_COURSE_VERSION,
            true
        );
    }

    /**
     * Enqueue editor assets
     *
     * @return void
     */
    public function enqueueEditorAssets()
    {
        // Enqueue editor styles.
        wp_enqueue_style(
            'wp-block-editor-course-editor',
            WP_BLOCK_EDITOR_COURSE_PLUGIN_URL . 'assets/css/editor.css',
            array(),
            WP_BLOCK_EDITOR_COURSE_VERSION
        );

        // Enqueue editor scripts.
        wp_enqueue_script(
            'wp-block-editor-course-editor',
            WP_BLOCK_EDITOR_COURSE_PLUGIN_URL . 'assets/js/editor.js',
            array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post', 'wp-element', 'wp-components' ),
            WP_BLOCK_EDITOR_COURSE_VERSION,
            true
        );

        // Localize script with data.
        wp_localize_script(
            'wp-block-editor-course-editor',
            'wpBlockEditorCourse',
            array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce'   => wp_create_nonce('wp_block_editor_course_nonce'),
            'strings' => array(
            'loading' => __('Loading...', 'wp-block-editor-course'),
            'error'   => __('An error occurred', 'wp-block-editor-course'),
            ),
            )
        );
    }

    /**
     * Enqueue frontend assets
     *
     * @return void
     */
    public function enqueueFrontendAssets()
    {
        // Enqueue frontend styles.
        wp_enqueue_style(
            'wp-block-editor-course-frontend',
            WP_BLOCK_EDITOR_COURSE_PLUGIN_URL . 'assets/css/frontend.css',
            array(),
            WP_BLOCK_EDITOR_COURSE_VERSION
        );

        // Enqueue frontend scripts.
        wp_enqueue_script(
            'wp-block-editor-course-frontend',
            WP_BLOCK_EDITOR_COURSE_PLUGIN_URL . 'assets/js/frontend.js',
            array( 'wp-element', 'wp-components' ),
            WP_BLOCK_EDITOR_COURSE_VERSION,
            true
        );
    }

    /**
     * Add admin menu
     *
     * @return void
     */
    public function addAdminMenu()
    {
        add_options_page(
            __('Block Editor Course', 'wp-block-editor-course'),
            __('Block Editor Course', 'wp-block-editor-course'),
            'manage_options',
            'wp-block-editor-course',
            array( $this, 'adminPage' )
        );
    }

    /**
     * Admin page callback
     *
     * @return void
     */
    public function adminPage()
    {
        include WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'admin/admin-page.php';
    }

    /**
     * Admin init
     *
     * @return void
     */
    public function adminInit()
    {
        // Register settings.
        register_setting('wp_block_editor_course_options', 'wp_block_editor_course_settings');
    }

    /**
     * Plugin activation hook
     *
     * @return void
     */
    public static function activate()
    {
        // Create necessary database tables or options.
        add_option('wp_block_editor_course_version', WP_BLOCK_EDITOR_COURSE_VERSION);
        
        // Flush rewrite rules.
        flush_rewrite_rules();
    }

    /**
     * Plugin deactivation hook
     *
     * @return void
     */
    public static function deactivate()
    {
        // Clean up if necessary.
        flush_rewrite_rules();
    }

    /**
     * Plugin uninstall hook
     *
     * @return void
     */
    public static function uninstall()
    {
        // Remove plugin data.
        delete_option('wp_block_editor_course_version');
        delete_option('wp_block_editor_course_settings');
    }
}

// Initialize plugin.
WP_Block_Editor_Course::getInstance();

// Register activation and deactivation hooks.
register_activation_hook(__FILE__, array( 'WP_Block_Editor_Course', 'activate' ));
register_deactivation_hook(__FILE__, array( 'WP_Block_Editor_Course', 'deactivate' ));
register_uninstall_hook(__FILE__, array( 'WP_Block_Editor_Course', 'uninstall' ));

// Include additional files.
require_once WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'includes/class-block-utilities.php';
require_once WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'includes/class-security.php';
require_once WP_BLOCK_EDITOR_COURSE_PLUGIN_PATH . 'includes/class-performance.php';
