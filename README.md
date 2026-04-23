### Celeridad

## Framework: SolidJS (Vite)

## Module: Blue Links

## Installation

To replicate and run this project, follow these steps using Windows PowerShell:

```bash
winget install OpenJS.NodeJS.LTS
git clone <your-repository-link>
cd <your-project-folder>
npm install
npm run build
npm run preview
````

## Git Workflow

This project used a feature branch for the PWA conversion:

```bash
git checkout -b feature/pwa-ready
git push -u origin feature/pwa-ready
```

This keeps the `main` branch stable while implementing major architectural changes.

## Progressive Web App (PWA) Features Added

* Installable web application
* Offline support using Service Worker
* Cached assets for faster loading
* Custom application name and branding
* Standalone app display mode
* Responsive cross-device behavior

## AI Tools

1. ChatGPT
2. Claude (Premium)
3. VS Code - GitHub Copilot

## Master Prompt

```text
I am using SolidJS with Vite. Help me convert my existing project into a Progressive Web App using manifest.json, service worker, caching strategy, offline support, installability, and custom branding.
```

## Hallucinations / Errors Fixed Manually

1. The install prompt initially displayed an old cached icon.
2. Some icon filenames did not match the paths declared in `manifest.json`.
3. Browser cache had to be cleared manually to refresh branding assets.
4. Needed to use `npm run build` and `npm run preview` instead of `npm run dev` for proper PWA testing.
5. Updated `CACHE_NAME` versions in the service worker to force cache refresh.
6. Chrome retained previous PWA metadata even after icon changes.

## Files Added / Modified

```text
public/manifest.json
public/service-worker.js
public/icons/icon-192.png
public/icons/icon-512.png
src/index.jsx
README.md
```

## PWA Testing Checklist

* [x] Manifest detected
* [x] Service Worker registered
* [x] Install button appeared in browser
* [x] Application successfully installed
* [x] Offline mode works after refresh
* [x] Branding and app name updated

## Screenshots
<img width="87" height="109" alt="image" src="https://github.com/user-attachments/assets/67dae21b-8be7-4688-b99d-36ccfa9b9130" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5a91cf8d-b4eb-46fe-9938-edb077f3f1f8" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d063900d-6fb8-41b8-83e9-f6f536013661" />
<img width="1919" height="1080" alt="image" src="https://github.com/user-attachments/assets/c3647dc8-e14c-4fce-908e-29bc757d7616" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5932653f-5656-4013-acb4-505cc88d58a4" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dd0f8dd1-9073-434f-8874-312ad7663d19" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5f8c6f3b-94f2-4727-997a-e3008f95856d" />
<img width="1917" height="1080" alt="image" src="https://github.com/user-attachments/assets/ffa6d5d3-6742-48f2-a9b6-a180f81bd194" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e6ac1158-c3da-48ec-86ce-75b55f08ae74" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7a299d1a-0c59-4978-8477-f7e84c2bf79e" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5212a391-3a88-469a-9514-07af5d132681" />


## Author Notes

This project demonstrates how an existing SolidJS application can be transformed into a Progressive Web App through AI-assisted development while still requiring manual debugging, validation, and testing.

```
```
