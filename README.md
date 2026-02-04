# My PWA App

A Progressive Web App (PWA) boilerplate built with Vite + React + TypeScript.

## Features

- PWA manifest for installability (name, icons, theme)
- Service worker for offline caching
- Install prompt UI (Android/Chrome)
- iOS "Add to Home Screen" support
- Basic update behavior with refresh prompt

## Getting Started

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## PWA Testing

Service workers and install prompts work best on HTTPS or production builds.

To test "real" PWA behavior locally:

1. Run `npm run build` to create a production build
2. Run `npm run preview` to serve the build
3. Open the preview URL on your phone (same Wi-Fi network)
4. For iOS, you must use Safari

## Installing the App

### Android/Chrome
- You should see an install prompt, or use browser menu -> Install

### iOS (Safari)
- Tap Share -> "Add to Home Screen"

## Customization

### App Name & Theme
Edit `vite.config.ts` to change:
- `name` / `short_name` - App name on home screen
- `description` - App description
- `theme_color` / `background_color` - App colors

### Icons
Replace the placeholder SVG icons in `public/icons/`:
- `icon-192.svg` - 192x192 icon
- `icon-512.svg` - 512x512 icon
- `apple-touch-icon.svg` - iOS home screen icon (180x180)

For production, use PNG icons. Tools like [RealFaviconGenerator](https://realfavicongenerator.net/) can generate all required sizes.

## Deployment

Deploy to any HTTPS-enabled host:
- Vercel
- Netlify
- Cloudflare Pages

PWAs require HTTPS for service workers to function (localhost is fine for dev).

## Important Notes

- **iOS PWAs have limitations**: push notifications and background sync are more limited than Android
- **Install prompt button** only works on Chrome/Android; iOS requires the manual Safari flow
- **Service worker updates** can confuse dev testing; always test updates via build/preview or deployed

## Project Structure

```
.
├── public/
│   └── icons/           # PWA icons
├── src/
│   ├── hooks/
│   │   └── useInstallPrompt.ts  # Install button hook
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point with SW registration
│   └── index.css        # Global styles
├── index.html           # HTML with iOS meta tags
├── vite.config.ts       # Vite + PWA plugin config
└── package.json
```

## Upgrade Paths

### Path A: Capacitor (Native App Shell)
Wrap your web app in a native container for App Store/Play Store distribution.

### Path B: React Native / Expo
Rewrite UI for better native feel while reusing business logic.

### Path C: Fully Native (Swift/Kotlin)
Maximum integration and performance.
