# Rebind Hourglass Timer App

A beautiful and responsive countdown timer application built with Next.js 15, featuring real-time display, sound alerts, and complete theme support.

## Features

- ⏳ **Intuitive Input**: Set timer duration in minutes with decimal precision
- 🕐 **Real-time Display**: Live countdown showing minutes, seconds, and milliseconds
- 🔔 **Sound Alarm**: Built-in audio alert when timer reaches zero
- 🎨 **Theme Support**: Complete dark/light mode with system detection
- 🖥️ **Modern Header**: Professional header with logo and theme controls
- 🌙 **Dark by Default**: Starts in dark mode for comfortable viewing
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js 15 and TypeScript
- 🎯 **Professional UI**: Clean interface using Tailwind CSS and shadcn/ui

## Theme System

- **Dark Mode**: Rich dark theme with proper contrast (default)
- **Light Mode**: Clean light theme for bright environments
- **System Mode**: Automatically follows your OS preference
- **Smooth Transitions**: Seamless switching between themes
- **Header Controls**: Easy theme toggle in the top navigation

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Theme Management**: next-themes
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Usage

1. **Set Timer**: Enter the desired duration in minutes (supports decimal values like 1.5 for 90 seconds)
2. **Start**: Click the "Start Timer" button to begin the countdown
3. **Monitor**: Watch the real-time countdown with millisecond precision
4. **Alert**: When the timer reaches zero, you'll hear an audio alarm and see a visual notification
5. **Control**: Use Stop/Reset buttons to control the timer as needed

## Features in Detail

### Timer Display

- **Minutes:Seconds** format in large, easy-to-read digits
- **Milliseconds** displayed separately for precision
- **Progress Bar** showing visual completion status

### Audio Alert

- Uses Web Audio API for consistent cross-browser sound generation
- Generates a 800Hz square wave tone for 1 second
- No external audio files required

### Responsive Design

- Mobile-first design approach
- Adapts beautifully to all screen sizes
- Touch-friendly interface

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main timer component
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles and Tailwind imports
├── components/ui/        # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
└── lib/
    └── utils.ts          # Utility functions
```
