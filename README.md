# PermiVue Management System 🚀

A comprehensive management system built with Vue 3 and Element Plus, featuring dynamic routing, state management with Pinia, and visualization with ECharts.
## 📋 Overview

PermiVue is a management system framework developed with Element Plus components. It provides a compact and efficient user experience with dynamic route permissions, data visualization, centralized state management, and customizable interfaces.

## ✨ Features

- **🔐 Dynamic Route Permission Control**: User-specific permission schemes without requiring re-login or redirects. Handles 404 for undefined routes.
- **🗄️ Pinia State Management**: Centralized state management using Pinia combined with LocalStorage persistence.
- **📊 Data Visualization**: Integration with ECharts for highly effective data visualization capabilities.
- **🔄 Secondary Axios Encapsulation**: Automatic base URL switching, support for mock/real data, enhanced development reusability.
- **🎨 UI Framework**: Built on Element Plus for a modern, responsive interface.

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3
- **State Management**: Pinia 3.0
- **Routing**: Vue Router 4.5
- **UI Components**: Element Plus 2.9
- **Styling**: Less
- **Data Visualization**: ECharts 5.6
- **HTTP Client**: Axios
- **Build Tool**: Vite 6.2
- **Mock Data**: MockJS

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ContinueHY/Vue3-Vite_Management.git

# Navigate to project directory
cd Vue3-Vite_Management

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📥 Dependencies

```json
{
  "dependencies": {
    "@element-plus/icons-vue": "^2.3.1",
    "echarts": "^5.6.0",
    "element-plus": "^2.9.6",
    "less": "^4.2.2",
    "vue": "^3.5.13",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "axios": "^1.8.4",
    "mockjs": "^1.1.0",
    "pinia": "^3.0.1",
    "vite": "^6.2.0"
  }
}
```

## 🚀 Scripts

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## 🌟 Highlights

1. **🔑 Permission System**
   - Role-based access control
   - Dynamic route generation
   - No page refresh required when permissions change

2. **📱 Responsive Design**
   - Mobile-friendly interface
   - Adaptive layout for different screen sizes

3. **🔧 Customization**
   - Extensible component structure
   - Configurable themes and styles

4. **⚡ Performance Optimized**
   - Fast loading times
   - Efficient state management
   - Optimized rendering

## 📁 Project Structure

```
PermiVue/
├── public/
├── src/
│   ├── api/           # API requests
│   ├── assets/        # Static assets
│   ├── components/    # Global components
│   ├── layouts/       # Layout components
│   ├── router/        # Routes configuration
│   ├── store/         # Pinia store modules
│   ├── styles/        # Global styles
│   ├── utils/         # Utility functions
│   ├── views/         # Page components
│   ├── App.vue        # Root component
│   └── main.js        # Application entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```
