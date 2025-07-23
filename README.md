# Dropdown Copy Helper / 下拉复制助手

A Chrome extension that helps you copy all dropdown options from input fields on supported websites like Google Search and YouTube.

## ✨ Features / 功能

- **🔍 Smart Detection**: Automatically detects dropdown menus associated with search input fields
- **📋 Right-click Menu**: Adds a context menu option "Copy All Dropdown Items / 复制所有下拉项"
- **📢 Toast Notifications**: Shows success/failure notifications with item count
- **🌐 Multi-site Support**: Currently supports Google Search and YouTube
- **🎯 Precise Targeting**: Only activates on supported websites for better performance
- **🐛 Debug Support**: Comprehensive logging for troubleshooting

## 🌍 Supported Websites / 支持的网站

- **Google Search** (google.com) - Main search suggestions
- **YouTube** (youtube.com) - Video search suggestions

## 📦 Installation / 安装

### Quick Start / 快速开始

1. **Ready to Use / 即开即用**
   - All required files including icons are already included / 所有必需文件包括图标都已包含
   - No additional setup required / 无需额外设置

2. **Load Extension / 加载扩展**
   - Open Chrome and go to `chrome://extensions/` / 打开Chrome扩展页面
   - Enable "Developer mode" / 启用开发者模式
   - Click "Load unpacked" and select this directory / 加载此目录

3. **Verify Installation / 验证安装**
   - Extension icon should appear in Chrome toolbar / 工具栏应显示扩展图标
   - Visit google.com or youtube.com to test / 访问支持的网站测试

For detailed installation instructions, see [INSTALLATION.md](INSTALLATION.md)

## 🚀 Usage / 使用方法

1. **Navigate** to Google Search or YouTube / 访问Google搜索或YouTube
2. **Click** on the search input field / 点击搜索输入框
3. **Type** a few characters to trigger dropdown suggestions / 输入字符触发下拉建议
4. **Right-click** on the search input field / 在搜索框上右键点击
5. **Select** "Copy All Dropdown Items / 复制所有下拉项" / 选择复制选项
6. **Success!** All suggestions are copied to clipboard, one per line / 成功复制所有建议到剪贴板

## 🧪 Testing / 测试

Open `test.html` in your browser for a comprehensive testing guide with step-by-step instructions.

## 📁 Project Structure / 项目结构

```
dropdown-copy-helper/
├── manifest.json          # Extension configuration / 扩展配置
├── background.js          # Service worker for context menus / 后台服务
├── content.js            # Main functionality / 主要功能实现
├── styles.css            # Toast notification styles / 通知样式
├── popup.html            # Extension popup interface / 弹窗界面
├── icons/                # Extension icons / 扩展图标
├── generate-icons.html   # Icon generator tool / 图标生成工具
├── test.html            # Testing guide / 测试指南
├── INSTALLATION.md      # Detailed installation guide / 详细安装指南
└── README.md           # This file / 说明文档
```

## 🔧 Development / 开发

### Key Components / 核心组件

- **`manifest.json`**: Defines permissions, content scripts, and extension metadata
- **`background.js`**: Handles context menu creation and clipboard operations
- **`content.js`**: Core functionality for dropdown detection and text extraction
- **`styles.css`**: Styling for toast notifications with responsive design
- **`popup.html`**: User-friendly popup with usage instructions

### Debugging / 调试

The extension includes comprehensive logging. Open browser console (F12) to see:
- Content script loading status
- Input element detection
- Dropdown item discovery
- Copy operation results

## 🤝 Contributing / 贡献

1. Fork the repository / 分叉仓库
2. Create a feature branch / 创建功能分支
3. Make your changes / 进行更改
4. Test thoroughly using `test.html` / 使用测试页面充分测试
5. Submit a pull request / 提交拉取请求

## 📄 License / 许可证

MIT License - see LICENSE file for details
