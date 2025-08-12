/**
 * Interactive Counter Block - View Script (Interactivity API)
 * 
 * This script implements the WordPress Interactivity API for the counter block
 * providing client-side interactivity without React
 * 
 * @package WPBlockEditorCourse
 * @since 1.0.0
 */

// Register the counter interactivity store
wp.interactivity.store('counter', {
	// State management
	state: {
		/**
		 * Check if counter is at minimum value
		 * 
		 * @param {Object} state - Current state
		 * @param {Object} context - Block context
		 * @returns {boolean} True if at minimum
		 */
		isMin: (state, context) => {
			return context.value <= context.min;
		},

		/**
		 * Check if counter is at maximum value
		 * 
		 * @param {Object} state - Current state
		 * @param {Object} context - Block context
		 * @returns {boolean} True if at maximum
		 */
		isMax: (state, context) => {
			return context.value >= context.max;
		},

		/**
		 * Get formatted value with leading zeros
		 * 
		 * @param {Object} state - Current state
		 * @param {Object} context - Block context
		 * @returns {string} Formatted value
		 */
		formattedValue: (state, context) => {
			const absValue = Math.abs(context.value);
			const sign = context.value < 0 ? '-' : '';
			return sign + absValue.toString().padStart(3, '0');
		}
	},

	// Actions for user interactions
	actions: {
		/**
		 * Increase counter value
		 * 
		 * @param {Object} state - Current state
		 * @param {Object} context - Block context
		 * @param {Event} event - Click event
		 */
		increase: (state, context, event) => {
			// Prevent default button behavior
			event.preventDefault();
			
			// Check if we can increase
			if (context.value >= context.max) {
				return;
			}

			// Calculate new value
			const newValue = Math.min(context.value + context.step, context.max);
			
			// Update context
			context.value = newValue;

			// Add visual feedback
			const button = event.target;
			button.classList.add('clicked');
			setTimeout(() => {
				button.classList.remove('clicked');
			}, 150);

			// Trigger custom event for external listeners
			const customEvent = new CustomEvent('counter:increased', {
				detail: {
					oldValue: newValue - context.step,
					newValue: newValue,
					step: context.step,
					max: context.max
				}
			});
			event.target.dispatchEvent(customEvent);
		},

		/**
		 * Decrease counter value
		 * 
		 * @param {Object} state - Current state
		 * @param {Object} context - Block context
		 * @param {Event} event - Click event
		 */
		decrease: (state, context, event) => {
			// Prevent default button behavior
			event.preventDefault();
			
			// Check if we can decrease
			if (context.value <= context.min) {
				return;
			}

			// Calculate new value
			const newValue = Math.max(context.value - context.step, context.min);
			
			// Update context
			context.value = newValue;

			// Add visual feedback
			const button = event.target;
			button.classList.add('clicked');
			setTimeout(() => {
				button.classList.remove('clicked');
			}, 150);

			// Trigger custom event for external listeners
			const customEvent = new CustomEvent('counter:decreased', {
				detail: {
					oldValue: newValue + context.step,
					newValue: newValue,
					step: context.step,
					min: context.min
				}
			});
			event.target.dispatchEvent(customEvent);
		},

		/**
		 * Reset counter to initial value
		 * 
		 * @param {Object} state - Current state
		 * @param {Object} context - Block context
		 * @param {Event} event - Click event
		 */
		reset: (state, context, event) => {
			// Prevent default button behavior
			event.preventDefault();
			
			// Get initial value from data attribute
			const block = event.target.closest('[data-wp-interactive="counter"]');
			const initialValue = parseInt(block.dataset.initialValue || 0);
			
			// Store old value for event
			const oldValue = context.value;
			
			// Reset to initial value
			context.value = initialValue;

			// Add visual feedback
			const button = event.target;
			button.classList.add('clicked');
			setTimeout(() => {
				button.classList.remove('clicked');
			}, 150);

			// Trigger custom event for external listeners
			const customEvent = new CustomEvent('counter:reset', {
				detail: {
					oldValue: oldValue,
					newValue: initialValue
				}
			});
			event.target.dispatchEvent(customEvent);
		},

		/**
		 * Handle keyboard navigation
		 * 
		 * @param {Object} state - Current state
		 * @param {Object} context - Block context
		 * @param {Event} event - Keydown event
		 */
		handleKeydown: (state, context, event) => {
			switch (event.key) {
				case 'ArrowUp':
				case '+':
					event.preventDefault();
					this.increase(state, context, event);
					break;
				case 'ArrowDown':
				case '-':
					event.preventDefault();
					this.decrease(state, context, event);
					break;
				case 'Home':
					event.preventDefault();
					this.reset(state, context, event);
					break;
				case 'Enter':
				case ' ':
					event.preventDefault();
					// Toggle auto increment if enabled
					if (context.autoIncrement) {
						this.toggleAutoIncrement(state, context, event);
					}
					break;
			}
		},

		/**
		 * Toggle auto increment functionality
		 * 
		 * @param {Object} state - Current state
		 * @param {Object} context - Block context
		 * @param {Event} event - Click event
		 */
		toggleAutoIncrement: (state, context, event) => {
			// Prevent default button behavior
			event.preventDefault();
			
			// Toggle auto increment state
			context.isAutoIncrementing = !context.isAutoIncrementing;
			
			if (context.isAutoIncrementing) {
				// Start auto increment
				context.autoIncrementInterval = setInterval(() => {
					if (context.value < context.max) {
						context.value += context.step;
					} else {
						// Stop when reaching max
						context.isAutoIncrementing = false;
						clearInterval(context.autoIncrementInterval);
					}
				}, context.autoIncrementInterval || 1000);
			} else {
				// Stop auto increment
				if (context.autoIncrementInterval) {
					clearInterval(context.autoIncrementInterval);
					context.autoIncrementInterval = null;
				}
			}

			// Add visual feedback
			const button = event.target;
			button.classList.toggle('auto-incrementing', context.isAutoIncrementing);
		}
	},

	// Callbacks for lifecycle events
	callbacks: {
		/**
		 * Initialize counter when block is mounted
		 * 
		 * @param {Object} state - Current state
		 * @param {Object} context - Block context
		 * @param {HTMLElement} element - Block element
		 */
		mounted: (state, context, element) => {
			// Store initial value for reset functionality
			element.dataset.initialValue = context.value;
			
			// Add keyboard event listener for accessibility
			element.addEventListener('keydown', (event) => {
				wp.interactivity.store('counter').actions.handleKeydown(state, context, event);
			});
			
			// Add focus management
			element.addEventListener('focusin', () => {
				element.classList.add('focused');
			});
			
			element.addEventListener('focusout', () => {
				element.classList.remove('focused');
			});

			// Initialize auto increment if enabled
			if (context.autoIncrement) {
				// Add auto increment button if not present
				const controls = element.querySelector('.counter-controls');
				if (controls && !controls.querySelector('.counter-auto-increment')) {
					const autoButton = document.createElement('button');
					autoButton.type = 'button';
					autoButton.className = 'counter-button counter-auto-increment';
					autoButton.setAttribute('aria-label', 'Toggle auto increment');
					autoButton.textContent = '▶';
					autoButton.addEventListener('click', (event) => {
						wp.interactivity.store('counter').actions.toggleAutoIncrement(state, context, event);
					});
					controls.appendChild(autoButton);
				}
			}

			// Add performance monitoring
			if (window.performance && window.performance.mark) {
				window.performance.mark('counter-mounted');
			}

			// Trigger custom event for external listeners
			const customEvent = new CustomEvent('counter:mounted', {
				detail: {
					element: element,
					context: context
				}
			});
			element.dispatchEvent(customEvent);
		},

		/**
		 * Clean up when block is unmounted
		 * 
		 * @param {Object} state - Current state
		 * @param {Object} context - Block context
		 * @param {HTMLElement} element - Block element
		 */
		unmounted: (state, context, element) => {
			// Clear any running intervals
			if (context.autoIncrementInterval) {
				clearInterval(context.autoIncrementInterval);
			}

			// Remove event listeners
			element.removeEventListener('keydown', null);
			element.removeEventListener('focusin', null);
			element.removeEventListener('focusout', null);

			// Trigger custom event for external listeners
			const customEvent = new CustomEvent('counter:unmounted', {
				detail: {
					element: element,
					context: context
				}
			});
			element.dispatchEvent(customEvent);
		}
	}
});

// Add global error handling for the counter
window.addEventListener('error', (event) => {
	if (event.target && event.target.closest('[data-wp-interactive="counter"]')) {
		console.error('Counter block error:', event.error);
		
		// Attempt to recover by resetting the counter
		const counter = event.target.closest('[data-wp-interactive="counter"]');
		if (counter) {
			const initialValue = parseInt(counter.dataset.initialValue || 0);
			const valueElement = counter.querySelector('.counter-value');
			if (valueElement) {
				valueElement.textContent = initialValue;
			}
		}
	}
});

// Add performance monitoring
if (window.performance && window.performance.measure) {
	window.addEventListener('load', () => {
		window.performance.measure('counter-interactivity', 'counter-mounted');
	});
}
