# Rebind Hourglass Timer App

A beautiful and responsive countdown timer application built with Next.js 15, featuring intuitive time selection, real-time display, sound alerts, and professional UI design.

## ✨ Features

- ⏱️ **Smart Time Selection**: Choose minutes and seconds via intuitive dropdown selectors
- 🕐 **Real-time Display**: Live countdown showing minutes, seconds, and milliseconds
- 🔔 **Sound Alarm**: Built-in Web Audio API alert when timer reaches zero
- 🎯 **Professional UI**: Clean "Rebind Hourglass" branding with modern design
- 🖥️ **GitHub Integration**: Direct link to project repository
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Built with Next.js 16 and TypeScript
- 🎨 **Modern Components**: Elegant interface using Tailwind CSS and shadcn/ui
- 🚀 **Component Architecture**: Modular, reusable React components

## 🎮 User Experience

### Time Input System

- **Dropdown Selectors**: Choose from preset minute and second values
- **Smart Validation**: Prevents starting empty timers
- **Disabled States**: UI feedback during timer operation
- **One-Click Start**: Immediate timer activation from time selection

### Timer Controls

- **Start/Stop/Reset**: Full timer control with visual state feedback
- **Progress Visualization**: Dynamic progress bar showing completion percentage
- **Real-time Updates**: Smooth 10ms interval updates for precise timing
- **Audio Completion**: Clear sound notification when timer finishes

## 🛠️ Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom theme variables
- **UI Components**: shadcn/ui (Button, Card, Select, Input)
- **Font**: Orbitron Google Font for modern tech aesthetic
- **Icons**: Lucide React for consistent iconography
- **Package Manager**: pnpm
- **Deployment**: Optimized for Vercel/Netlify deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Rebind-io/hourglass.git
   cd hourglass
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 🎮 Usage

1. **Select Time**: Use the dropdown menus to choose your desired minutes and seconds
2. **Start Timer**: Click the green "Start" button to begin the countdown
3. **Monitor Progress**: Watch the real-time display and progress bar
4. **Control Timer**: Use Stop/Reset buttons to control the timer as needed
5. **Audio Alert**: When the timer reaches zero, you'll hear a sound notification
