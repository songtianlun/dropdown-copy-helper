# Privacy Policy / 隐私政策

## Single Purpose Statement / 单一用途说明

**English:**
Dropdown Copy Helper is a single-purpose Chrome extension designed exclusively to copy dropdown suggestions from search input fields on Google and YouTube websites. The extension allows users to right-click on search boxes and copy all visible dropdown suggestions to their clipboard with one click. This tool is intended for productivity purposes, helping users quickly collect search suggestions for research, content creation, or analysis. The extension does not perform any other functions beyond this core feature and does not collect, store, or transmit any user data.

**中文:**
下拉复制助手是一个单一用途的Chrome扩展程序，专门用于从Google和YouTube网站的搜索输入框中复制下拉建议。该扩展允许用户右键点击搜索框，一键将所有可见的下拉建议复制到剪贴板。此工具旨在提高生产力，帮助用户快速收集搜索建议用于研究、内容创作或分析。该扩展除了这个核心功能外不执行任何其他功能，也不收集、存储或传输任何用户数据。

---

## Permission Justifications / 权限说明

### contextMenus Permission / 右键菜单权限

**English:**
The contextMenus permission is essential for this extension's core functionality. It allows the extension to add a "Copy All Dropdown Items" option to the right-click context menu when users right-click on search input fields. This permission is used solely to provide the user interface for triggering the copy action. Without this permission, users would have no way to activate the extension's functionality. The context menu is only shown on supported websites (Google.com and YouTube.com) and only appears when right-clicking on search input fields.

**中文:**
contextMenus权限对于此扩展的核心功能至关重要。它允许扩展在用户右键点击搜索输入框时，在右键菜单中添加"复制所有下拉项"选项。此权限仅用于提供触发复制操作的用户界面。没有此权限，用户将无法激活扩展功能。右键菜单仅在支持的网站（Google.com和YouTube.com）上显示，且仅在右键点击搜索输入框时出现。

### activeTab Permission / 活动标签页权限

**English:**
The activeTab permission allows the extension to interact with the currently active tab when the user explicitly invokes the extension through the context menu. This permission is necessary to access the DOM elements of the webpage to identify search input fields and dropdown suggestions. The extension only accesses the active tab when the user specifically requests the copy action, and only on supported websites. No background monitoring or automatic access to tabs occurs. This permission ensures the extension can read the dropdown suggestions that the user wants to copy.

**中文:**
activeTab权限允许扩展在用户通过右键菜单明确调用扩展时与当前活动标签页进行交互。此权限对于访问网页的DOM元素以识别搜索输入框和下拉建议是必需的。扩展仅在用户特别请求复制操作时访问活动标签页，且仅在支持的网站上。不会进行后台监控或自动访问标签页。此权限确保扩展能够读取用户想要复制的下拉建议。

### clipboardWrite Permission / 剪贴板写入权限

**English:**
The clipboardWrite permission is fundamental to the extension's purpose. It enables the extension to write the collected dropdown suggestions to the user's system clipboard. When users trigger the copy action, the extension formats the dropdown suggestions as plain text (one suggestion per line) and places them in the clipboard for the user to paste elsewhere. This permission is used only at the moment when the user explicitly requests the copy action. The extension never reads from the clipboard or accesses clipboard data - it only writes the collected suggestions when requested.

**中文:**
clipboardWrite权限是扩展用途的基础。它使扩展能够将收集的下拉建议写入用户的系统剪贴板。当用户触发复制操作时，扩展将下拉建议格式化为纯文本（每行一个建议）并放入剪贴板供用户在其他地方粘贴。此权限仅在用户明确请求复制操作时使用。扩展从不读取剪贴板或访问剪贴板数据——它只在被请求时写入收集的建议。

### scripting Permission / 脚本权限

**English:**
The scripting permission allows the extension to inject content scripts into supported web pages when necessary. This permission is required because the extension needs to execute JavaScript code on Google and YouTube pages to locate search input fields, identify dropdown suggestions, and extract their text content. The scripting occurs only on explicitly supported websites and only when the user activates the extension. The injected scripts are minimal and focused solely on finding and reading dropdown suggestions. No persistent scripts or background monitoring is performed.

**中文:**
scripting权限允许扩展在必要时向支持的网页注入内容脚本。此权限是必需的，因为扩展需要在Google和YouTube页面上执行JavaScript代码来定位搜索输入框、识别下拉建议并提取其文本内容。脚本注入仅在明确支持的网站上进行，且仅在用户激活扩展时进行。注入的脚本最小化，专注于查找和读取下拉建议。不执行持久脚本或后台监控。

### Host Permissions / 主机权限

**English:**
The extension requests host permissions for specific Google and YouTube domains (https://www.google.com/*, https://google.com/*, https://www.youtube.com/*, https://youtube.com/*) because these are the only websites where the extension functions. These permissions allow the extension to access the page content and DOM structure necessary to identify search boxes and dropdown suggestions. The extension is designed to work exclusively on these platforms where dropdown search suggestions are commonly available. Host permissions ensure the extension can reliably detect and interact with the search interfaces on these sites. No other websites are accessed or monitored.

**中文:**
扩展请求特定Google和YouTube域名的主机权限（https://www.google.com/*、https://google.com/*、https://www.youtube.com/*、https://youtube.com/*），因为这些是扩展功能运行的唯一网站。这些权限允许扩展访问识别搜索框和下拉建议所必需的页面内容和DOM结构。扩展专门设计用于这些平台，在这些平台上下拉搜索建议通常可用。主机权限确保扩展能够可靠地检测并与这些网站上的搜索界面交互。不会访问或监控其他网站。

---

## Data Collection and Privacy / 数据收集和隐私

**English:**
This extension does not collect, store, transmit, or process any personal data. The extension operates entirely locally within the user's browser. When activated, it only reads the visible dropdown suggestions from the current webpage and copies them to the clipboard. No data is sent to external servers, stored in browser storage, or shared with third parties. The extension does not track user behavior, search queries, or browsing history. All operations are performed locally and temporarily, with no persistent data storage.

**中文:**
此扩展不收集、存储、传输或处理任何个人数据。扩展完全在用户浏览器内本地运行。激活时，它仅从当前网页读取可见的下拉建议并将其复制到剪贴板。不会向外部服务器发送数据、存储在浏览器存储中或与第三方共享。扩展不跟踪用户行为、搜索查询或浏览历史。所有操作都在本地临时执行，不进行持久数据存储。

---

## Contact Information / 联系信息

For questions about this privacy policy or the extension's functionality, please visit the project repository or contact the developer through the official Chrome Web Store listing.

如有关于此隐私政策或扩展功能的问题，请访问项目代码库或通过官方Chrome网上应用店页面联系开发者。