# Installation Guide / 安装指南

## Prerequisites / 前置要求

- Google Chrome browser / Google Chrome 浏览器
- Developer mode enabled in Chrome extensions / Chrome 扩展开发者模式已启用

## Installation Steps / 安装步骤

### 1. Verify Files / 验证文件

All required files are already included in the project:
- ✅ `manifest.json` - Extension configuration
- ✅ `background.js` - Service worker
- ✅ `content.js` - Main functionality
- ✅ `styles.css` - Styling
- ✅ `popup.html` - Popup interface
- ✅ `icons/icon16.png` - 16x16 icon
- ✅ `icons/icon32.png` - 32x32 icon
- ✅ `icons/icon48.png` - 48x48 icon
- ✅ `icons/icon128.png` - 128x128 icon

### 2. Load Extension / 加载扩展

1. Open Chrome and navigate to `chrome://extensions/` / 打开 Chrome 并访问扩展页面
2. Enable "Developer mode" in the top right corner / 在右上角启用"开发者模式"
3. Click "Load unpacked" button / 点击"加载已解压的扩展程序"按钮
4. Select the `dropdown-copy-helper` directory / 选择项目目录
5. The extension should now appear in your extensions list / 扩展应该出现在扩展列表中

### 3. Verify Installation / 验证安装

1. Check that the extension icon appears in the Chrome toolbar / 检查扩展图标是否出现在工具栏中
2. Visit google.com or youtube.com / 访问 google.com 或 youtube.com
3. The extension should be active on these sites / 扩展应该在这些网站上激活

## Testing / 测试

### Test on Google Search / 在 Google 搜索上测试

1. Go to https://www.google.com / 访问 Google 搜索
2. Click on the search input field / 点击搜索输入框
3. Type a few characters to trigger search suggestions / 输入几个字符触发搜索建议
4. Right-click on the search input field / 在搜索输入框上右键点击
5. Select "Copy All Dropdown Items / 复制所有下拉项" from the context menu / 从右键菜单选择复制选项
6. Check if a success toast notification appears / 检查是否出现成功提示
7. Paste (Ctrl+V) to verify the copied content / 粘贴验证复制的内容

### Test on YouTube / 在 YouTube 上测试

1. Go to https://www.youtube.com / 访问 YouTube
2. Click on the search input field / 点击搜索输入框
3. Type a few characters to trigger search suggestions / 输入几个字符触发搜索建议
4. Right-click on the search input field / 在搜索输入框上右键点击
5. Select "Copy All Dropdown Items / 复制所有下拉项" from the context menu / 从右键菜单选择复制选项
6. Check if a success toast notification appears / 检查是否出现成功提示
7. Paste (Ctrl+V) to verify the copied content / 粘贴验证复制的内容

## Troubleshooting / 故障排除

### Extension not loading / 扩展无法加载
- Make sure all required files are present / 确保所有必需文件都存在
- Check that icon files are in the `icons/` directory / 检查图标文件是否在 `icons/` 目录中
- Verify manifest.json syntax is correct / 验证 manifest.json 语法正确

### Context menu not appearing / 右键菜单不出现
- Make sure you're on a supported website (Google or YouTube) / 确保在支持的网站上
- Try refreshing the page / 尝试刷新页面
- Check that you're right-clicking on the correct input field / 检查是否在正确的输入框上右键点击

### "No input element found" error / "未找到输入元素"错误
- **First, click on the search input field** to focus it / 首先点击搜索输入框以聚焦
- Try typing something in the search box / 尝试在搜索框中输入内容
- Open browser console (F12) to see debug messages / 打开浏览器控制台查看调试信息
- Use the test page `input-detection-test.html` to verify input detection / 使用测试页面验证输入检测

### Copy function not working / 复制功能不工作
- Check browser console for error messages / 检查浏览器控制台的错误信息
- Make sure clipboard permissions are granted / 确保剪贴板权限已授予
- Try typing in the input field first to trigger suggestions / 先在输入框中输入以触发建议

### No dropdown suggestions / 没有下拉建议
- Type more characters in the search field / 在搜索框中输入更多字符
- Wait a moment for suggestions to load / 等待建议加载
- Check your internet connection / 检查网络连接

### Debug Steps / 调试步骤
1. Open `input-detection-test.html` to test input detection / 打开测试页面检测输入框识别
2. Open browser console (F12) and look for extension messages / 打开控制台查看扩展消息
3. Check if the extension content script is loaded / 检查内容脚本是否加载
4. Verify that the search input is being detected / 验证搜索输入框是否被检测到

## Development / 开发

To modify the extension:
1. Make changes to the source files / 修改源文件
2. Go to `chrome://extensions/` / 访问扩展页面
3. Click the refresh button on the extension card / 点击扩展卡片上的刷新按钮
4. Test your changes / 测试更改
