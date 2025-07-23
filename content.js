// Content script for Dropdown Copy Helper
// 下拉复制助手内容脚本

class DropdownCopyHelper {
  constructor() {
    this.currentInputElement = null;
    this.init();
  }

  init() {
    // Prevent multiple initialization
    if (window.dropdownCopyHelperInitialized) {
      console.log('⚠️ Dropdown Copy Helper already initialized');
      return;
    }
    window.dropdownCopyHelperInitialized = true;

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      try {
        if (request.action === 'copyDropdownItems') {
          this.handleCopyRequest(sendResponse);
          return true; // Keep message channel open for async response
        } else if (request.action === 'ping') {
          sendResponse({ status: 'ready', timestamp: Date.now() });
          return false; // Synchronous response
        }
      } catch (error) {
        console.error('❌ Message handling error:', error);
        sendResponse({ success: false, error: error.message });
      }
    });

    // Track focused input elements
    this.trackInputFocus();

    console.log('✅ Dropdown Copy Helper loaded on:', window.location.hostname);
  }

  // Get dropdown items using simplified strategy
  getDropdownItems() {
    const hostname = window.location.hostname;
    let items = [];
    
    if (hostname.includes('google.com')) {
      items = this.getGoogleDropdownItems();
    } else if (hostname.includes('youtube.com')) {
      items = this.getYouTubeDropdownItems();
    }

    // If no items found with standard methods, try emergency fallback
    if (items.length === 0) {
      items = this.getEmergencyFallbackItems();
    }

    // Filter and clean items
    const cleanItems = items
      .filter(item => item && item.trim().length > 0)
      .filter(item => !this.isUIElement(item))
      .map(item => this.cleanSearchSuggestionText(item))
      .filter(item => item && item.length > 0 && item.length < 150);

    return [...new Set(cleanItems)]; // Remove duplicates
  }


  // Get Google search suggestions
  getGoogleDropdownItems() {
    const items = [];

    // Comprehensive list of selectors from most modern to legacy
    const selectors = [
      // Most modern Google selectors (2024+)
      'ul[role="listbox"] li[role="option"]',
      'div[role="listbox"] div[role="option"]',
      '[role="listbox"] [role="option"]',
      
      // Alternative modern structures
      '.G43f7e li[role="option"]',
      '.G43f7e div[role="option"]', 
      '.aajZCb li[role="option"]',
      '.aajZCb div[role="option"]',
      '.erkvQe li[role="option"]',
      '.erkvQe li',
      '.erkvQe div',
      
      // Google suggestions container variations
      '.sbsb_b li',
      '.sbsb_b div',
      '.sbsb_c',
      '.sbqs_c',
      '.gsq_a',
      '.pcTkSc',
      '.sbtc',
      '.sbl1',
      
      // Broader searches for any suggestion-like elements
      'li[data-ved]',
      'div[data-ved]',
      'span[data-ved]',
      
      // Last resort - any li under potential containers
      '.sbsb_b li',
      'ul li',
      'div[jsname] li',
      'div[jsname] div'
    ];

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      
      if (elements.length > 0) {
        let foundInThisSelector = 0;
        elements.forEach(el => {
          if (this.isVisible(el)) {
            const text = this.extractCleanText(el);
            if (text && text.length > 0 && text.length < 200) {
              if (this.looksLikeSearchSuggestion(text)) {
                items.push(text);
                foundInThisSelector++;
              }
            }
          }
        });
        
        // If we found items with this selector, stop trying others
        if (foundInThisSelector > 0) {
          break;
        }
      }
    }

    return items;
  }

  // Check if text looks like a search suggestion rather than UI element
  looksLikeSearchSuggestion(text) {
    // Reject obviously non-suggestion text
    const rejectPatterns = [
      /^(搜索|查看更多|删除|更多|清除|历史记录)$/i,
      /^(search|view more|delete|more|clear|history)$/i,
      /^[×✕]$/,
      /^[\s]*$/,
      /^[0-9]+$/,
      /^(OM|中国国际航空|Airbnb)$/
    ];

    return !rejectPatterns.some(pattern => pattern.test(text));
  }

  // Extract clean text from element - simplified version
  extractCleanText(element) {
    if (!element) return '';

    // Get the text content
    let text = element.textContent || element.innerText || '';
    
    // Basic cleaning
    text = text.trim();
    
    // Remove obvious UI elements by splitting and taking the first part
    const parts = text.split(/[,，·•\|\n]/);
    text = parts[0].trim();
    
    // Remove common trailing UI text
    text = text.replace(/(查看更多|删除|更多|OM|View more|Delete|Remove)$/gi, '').trim();
    
    return text;
  }

  // Check if text appears to be a UI element rather than search suggestion
  isUIElement(text) {
    const uiPatterns = [
      /^查看更多/,
      /删除$/,
      /^更多$/,
      /^搜索$/,
      /^OM$/,
      /^×$/,
      /^✕$/,
      /^\s*$/ // empty or whitespace only
    ];

    return uiPatterns.some(pattern => pattern.test(text));
  }

  // Get YouTube search suggestions
  getYouTubeDropdownItems() {
    const items = [];

    const selectors = [
      // Modern YouTube selectors
      '[role="listbox"] [role="option"]',
      '.ytd-searchbox [role="option"]',
      
      // Traditional YouTube selectors
      '.sbsb_c',
      '.sbsb_a',
      '.sbqs_c',
      
      // Container-based searches
      '.ytd-searchbox .sbsb_c',
      '#search-container [role="option"]',
      '.search-container [role="option"]',
      
      // Broader searches
      'li[data-ved]',
      'div[data-ved]',
      
      // Last resort
      '.ytd-searchbox li',
      '.ytd-searchbox div',
      '#search li',
      '#search div'
    ];

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      
      if (elements.length > 0) {
        let foundInThisSelector = 0;
        elements.forEach(el => {
          if (this.isVisible(el)) {
            const text = this.extractCleanText(el);
            if (text && text.length > 0 && text.length < 200) {
              if (this.looksLikeSearchSuggestion(text)) {
                items.push(text);
                foundInThisSelector++;
              }
            }
          }
        });
        
        if (foundInThisSelector > 0) {
          break;
        }
      }
    }

    return items;
  }

  // Emergency fallback - try to find ANY dropdown-like elements on the page
  getEmergencyFallbackItems() {
    const items = [];
    
    // Look for any elements that might contain suggestions
    const emergencySelectors = [
      // Any list items anywhere
      'li',
      // Any divs with suggestion-like attributes
      'div[role]',
      'span[role]',
      // Elements with data attributes (common in modern web apps) 
      '[data-ved]',
      '[data-value]',
      '[data-suggestion]',
      // Any elements that might be in a dropdown
      'ul > *',
      'ol > *',
      '.dropdown *',
      '.suggestions *',
      '.autocomplete *'
    ];

    for (const selector of emergencySelectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        let foundCount = 0;
        elements.forEach(el => {
          if (foundCount >= 10) return; // Limit to prevent spam
          
          if (this.isVisible(el)) {
            const text = this.extractCleanText(el);
            if (text && text.length > 2 && text.length < 100) {
              if (this.looksLikeSearchSuggestion(text) && !items.includes(text)) {
                items.push(text);
                foundCount++;
              }
            }
          }
        });
        
        if (foundCount > 0) {
          break;
        }
      }
    }

    return items.slice(0, 10); // Limit to 10 items max
  }

  // Track input element focus
  trackInputFocus() {
    // Track right-click context menu
    document.addEventListener('contextmenu', (event) => {
      this.handleContextMenu(event);
    });

    // Also track focus and input events to better detect active search inputs
    document.addEventListener('focusin', (event) => {
      if (this.isSearchInput(event.target)) {
        this.currentInputElement = event.target;
        console.log('✅ Search input focused:', event.target);
      }
    });

    // Track input events to detect when user is typing
    document.addEventListener('input', (event) => {
      if (this.isSearchInput(event.target)) {
        this.currentInputElement = event.target;
        console.log('✅ Search input active:', event.target);
      }
    });
  }

  // Handle context menu event
  handleContextMenu(event) {
    // Check if right-clicked element is a search input
    if (this.isSearchInput(event.target)) {
      this.currentInputElement = event.target;
      console.log('✅ Search input detected via context menu:', event.target);
      return;
    }

    // Check if right-clicked near a search input
    const nearbyInput = this.findNearbySearchInput(event.target);
    if (nearbyInput) {
      this.currentInputElement = nearbyInput;
      console.log('✅ Nearby search input detected:', nearbyInput);
      return;
    }

    // Fallback: find main search input on page
    this.currentInputElement = this.findMainSearchInput();
    console.log('🔍 Using main search input fallback:', this.currentInputElement);
  }

  // Find search input near the clicked element
  findNearbySearchInput(element) {
    // Check parent elements up to 5 levels
    let current = element;
    for (let i = 0; i < 5 && current; i++) {
      const searchInput = current.querySelector('input, textarea');
      if (searchInput && this.isSearchInput(searchInput)) {
        return searchInput;
      }
      current = current.parentElement;
    }

    // Check sibling elements
    if (element.parentElement) {
      const siblings = element.parentElement.querySelectorAll('input, textarea');
      for (const sibling of siblings) {
        if (this.isSearchInput(sibling)) {
          return sibling;
        }
      }
    }

    return null;
  }

  // Find the main search input on the page
  findMainSearchInput() {
    const hostname = window.location.hostname;

    if (hostname.includes('google.com')) {
      const selectors = [
        'input[name="q"]',
        'textarea[name="q"]',
        '.gLFyf',
        'input[role="combobox"]',
        'input[aria-label*="Search"]',
        'input[aria-label*="搜索"]',
        'input[title*="Search"]',
        'input[placeholder*="Search"]'
      ];
      
      for (const selector of selectors) {
        const input = document.querySelector(selector);
        if (input && this.isVisible(input)) {
          return input;
        }
      }
    }

    if (hostname.includes('youtube.com')) {
      const selectors = [
        'input[name="search_query"]',
        'input#search',
        'input[aria-label*="Search"]',
        'input[placeholder*="Search"]',
        '.ytd-searchbox input',
        '#search-input input'
      ];
      
      for (const selector of selectors) {
        const input = document.querySelector(selector);
        if (input && this.isVisible(input)) {
          return input;
        }
      }
    }

    // Generic fallback - look for any search-related input
    const genericSelectors = [
      'input[name="search"]',
      'input[name="query"]', 
      'input[name="q"]',
      'input[type="search"]',
      'input[aria-label*="search" i]',
      'input[placeholder*="search" i]',
      'input[title*="search" i]'
    ];

    for (const selector of genericSelectors) {
      const input = document.querySelector(selector);
      if (input && this.isVisible(input)) {
        return input;
      }
    }

    return null;
  }

  // Enhanced search input detection
  isSearchInput(element) {
    if (!element || (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA')) return false;
    
    // Check if element is visible
    if (!this.isVisible(element)) return false;

    const hostname = window.location.hostname;
    const name = element.name?.toLowerCase() || '';
    const id = element.id?.toLowerCase() || '';
    const className = element.className?.toLowerCase() || '';
    const placeholder = element.placeholder?.toLowerCase() || '';
    const ariaLabel = element.getAttribute('aria-label')?.toLowerCase() || '';
    const title = element.title?.toLowerCase() || '';
    const type = element.type?.toLowerCase() || '';

    // Site-specific checks
    if (hostname.includes('google.com')) {
      return name === 'q' || 
             className.includes('glfyf') ||
             element.getAttribute('role') === 'combobox' ||
             ariaLabel.includes('search') ||
             ariaLabel.includes('搜索');
    }

    if (hostname.includes('youtube.com')) {
      return name === 'search_query' || 
             id === 'search' ||
             className.includes('search') ||
             ariaLabel.includes('search');
    }

    // Generic search input detection
    const searchTerms = ['search', 'query', 'find', '搜索', '查找'];
    const searchFields = [name, id, className, placeholder, ariaLabel, title];
    
    // Check if type is search
    if (type === 'search') return true;
    
    // Check if any field contains search terms
    return searchTerms.some(term => 
      searchFields.some(field => field.includes(term))
    ) || name === 'q';
  }

  // Handle copy request from context menu - simplified and fast
  async handleCopyRequest(sendResponse) {
    let responseSent = false;
    
    const safeResponse = (data) => {
      if (!responseSent) {
        responseSent = true;
        try {
          sendResponse(data);
        } catch (error) {
          console.error('Failed to send response:', error);
        }
      }
    };

    try {

      // Find search input if not already set
      if (!this.currentInputElement) {
        this.currentInputElement = this.findMainSearchInput();
      }

      if (!this.currentInputElement) {
        const errorMsg = 'No search input found. Please click on a search input field first.\n未找到搜索输入框。请先点击搜索框，然后输入内容显示下拉建议。';
        this.showToast(`❌ ${errorMsg}`, 'error');
        safeResponse({ success: false, error: errorMsg });
        return;
      }

      // Focus input briefly to ensure dropdown is active
      this.currentInputElement.focus();
      
      // Get dropdown items immediately - no complex waiting
      let dropdownItems = this.getDropdownItems();
      
      // If no items found, wait a very short time and try once more
      if (dropdownItems.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 300));
        dropdownItems = this.getDropdownItems();
      }

      if (dropdownItems.length === 0) {
        const errorMsg = 'No dropdown suggestions found. Please type something to show suggestions first.\n未找到下拉建议。请在搜索框中输入内容以显示建议列表。';
        this.showToast(`❌ ${errorMsg}`, 'error');
        safeResponse({ success: false, error: errorMsg });
        return;
      }

      // Copy to clipboard
      const textToCopy = dropdownItems.join('\n');
      await this.copyToClipboard(textToCopy);

      this.showToast(`✅ Successfully copied ${dropdownItems.length} items!\n成功复制 ${dropdownItems.length} 条建议！`, 'success');
      safeResponse({ success: true, count: dropdownItems.length, items: dropdownItems });

    } catch (error) {
      console.error('❌ Copy failed:', error);
      this.showToast(`❌ ${error.message}`, 'error');
      safeResponse({ success: false, error: error.message });
    }
  }




  // Extract clean text from element with filtering
  extractTextFromElement(element) {
    // Remove script and style elements
    const clone = element.cloneNode(true);
    const scripts = clone.querySelectorAll('script, style');
    scripts.forEach(script => script.remove());

    let text = clone.textContent || clone.innerText || '';
    
    // Clean up the text
    text = this.cleanSearchSuggestionText(text);

    return text;
  }

  // Clean search suggestion text - simplified version
  cleanSearchSuggestionText(text) {
    if (!text) return '';

    // Basic cleaning
    text = text.trim().replace(/\s+/g, ' ');

    // Remove common UI elements at the end
    text = text.replace(/(查看更多删除|查看更多|删除|更多|OM|View more|Delete|Remove)$/gi, '').trim();

    // Remove trailing dots and clean up
    text = text.replace(/\.{2,}$/, '').trim();

    return text;
  }

  // Check if element is visible
  isVisible(element) {
    if (!element) return false;

    const style = window.getComputedStyle(element);
    return style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0' &&
      element.offsetWidth > 0 &&
      element.offsetHeight > 0;
  }

  // Copy text to clipboard
  async copyToClipboard(text) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }



  // Show enhanced toast notification
  showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.getElementById('dropdown-copy-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'dropdown-copy-toast';
    toast.className = `dropdown-copy-toast ${type}`;
    
    // Handle multi-line messages (bilingual support)
    if (message.includes('\n')) {
      const lines = message.split('\n');
      lines.forEach((line, index) => {
        const lineDiv = document.createElement('div');
        lineDiv.textContent = line;
        if (index > 0) {
          lineDiv.style.fontSize = '12px';
          lineDiv.style.opacity = '0.9';
          lineDiv.style.marginTop = '2px';
        }
        toast.appendChild(lineDiv);
      });
    } else {
      toast.textContent = message;
    }

    // Enhanced styling
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      color: 'white',
      backgroundColor: this.getToastColor(type),
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: '2147483647', // Maximum z-index
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
      maxWidth: '400px',
      wordBreak: 'break-word',
      transition: 'all 0.3s ease',
      opacity: '0',
      transform: 'translateX(100%)'
    });

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    });

    // Auto-remove with fade out animation
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);

    // Click to dismiss
    toast.addEventListener('click', () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    });
  }

  // Get toast background color based on type
  getToastColor(type) {
    switch (type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': 
      default: return '#3b82f6';
    }
  }
}

// Initialize the helper when DOM is ready (only once)
if (!window.dropdownCopyHelper) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.dropdownCopyHelper = new DropdownCopyHelper();
    });
  } else {
    window.dropdownCopyHelper = new DropdownCopyHelper();
  }
}
