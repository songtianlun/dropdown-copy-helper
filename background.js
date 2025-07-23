// Background script for Dropdown Copy Helper
// 下拉复制助手后台脚本

// Context menu item ID
const CONTEXT_MENU_ID = 'copy-dropdown-items';

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: 'Copy All Dropdown Items\n复制所有下拉项',
    contexts: ['editable'],
    documentUrlPatterns: [
      'https://www.google.com/*',
      'https://google.com/*',
      'https://www.youtube.com/*',
      'https://youtube.com/*'
    ]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === CONTEXT_MENU_ID) {
    // Send message to content script to copy dropdown items
    chrome.tabs.sendMessage(tab.id, {
      action: 'copyDropdownItems',
      frameId: info.frameId
    }, (response) => {
      // Handle response or connection errors
      if (chrome.runtime.lastError) {
        console.log('Connection error:', chrome.runtime.lastError.message);
        // Try to inject content script and retry
        injectContentScriptAndRetry(tab.id);
      } else if (response) {
        console.log('Copy operation result:', response);
      }
    });
  }
});

// Function to inject content script and retry the operation
function injectContentScriptAndRetry(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js']
  }, () => {
    if (chrome.runtime.lastError) {
      console.error('Failed to inject content script:', chrome.runtime.lastError.message);
    } else {
      // Retry after a short delay
      setTimeout(() => {
        chrome.tabs.sendMessage(tabId, {
          action: 'copyDropdownItems'
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Retry failed:', chrome.runtime.lastError.message);
          }
        });
      }, 500);
    }
  });
}

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ping') {
    sendResponse({ status: 'ready' });
  }
  // Note: Clipboard operations are now handled directly in content script
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
  console.log('Dropdown Copy Helper extension started');
});

// Handle tab updates to ensure content script is ready
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const supportedSites = [
      'https://www.google.com/',
      'https://google.com/',
      'https://www.youtube.com/',
      'https://youtube.com/'
    ];

    const isSupported = supportedSites.some(site => tab.url.startsWith(site));
    if (isSupported) {
      // Ping to check if content script is ready
      chrome.tabs.sendMessage(tabId, { action: 'ping' }, (response) => {
        if (chrome.runtime.lastError) {
          // Content script not ready, inject it
          console.log('Injecting content script for tab:', tabId);
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
          }).catch(error => {
            console.error('Failed to inject content script:', error);
          });
        } else {
          console.log('Content script ready for tab:', tabId);
        }
      });
    }
  }
});
