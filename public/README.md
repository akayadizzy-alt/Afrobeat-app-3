# Afrobeatinstrumental

Build an app using www.afrobeatinstrumental.com its my website to make it an app

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://afrobeatinstrumental.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3f32bf17-63f4-4233-8d21-d4fbe40cd22e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Android packaging (local frontend, live WordPress content)

The Android app packages the existing screens, styles, navigation, matcher, and
shared player. It does not redirect to the hosted website. The catalogue, policy
pages, artwork, and music remain live on afrobeatinstrumental.com. Internet access
is required for this content; no database or sign-in is added.

Capacitor uses Android's embedded WebView to render **local frontend files**. This
is not a remote-website wrapper or a rewrite using native Android widgets.

### Requirements

- Node.js 22 or newer and npm.
- Android Studio, Android SDK API 36 (Capacitor 8), and JDK 21.
- Configure your local SDK path in Android Studio or `android/local.properties`.
  Never commit signing keys or local SDK paths.

### Build and open

```sh
npm install
npm run build              # Production frontend in dist/index.html + dist/assets
npx cap sync android       # Copies dist into the Android project
npm run android:open       # Opens Android Studio
```

The Android project is already created in `android/`; do not run `cap add android`
again unless that folder was intentionally deleted. After app changes, run
`npm run android:sync` before rebuilding.

In Android Studio choose **Build > Generate App Bundles or APKs > Generate APKs**
for a debug APK, or **Generate Signed App Bundle or APK** for a signed release.

Alternatively, on macOS/Linux:

```sh
npm run android:apk
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

On Windows, after syncing, run `gradlew.bat assembleDebug` inside `android`.
Release builds require your signing key. No signed APK is included here.

### Hosted app

`npm run dev` and `npm run build:web` retain the original TanStack Start web app.
The default build uses `vite.android.config.ts` for static Android files;
`vite.config.ts` remains the hosted web configuration.

If content fails on a device, verify internet access and that the public WordPress
API allows `https://localhost`. No proxy or alternate backend is configured.
Test playback, downloads, and the signed release on a device before distributing.

### Verification and current limitations

The packaging, route, and catalogue-matching tests pass. The Android platform and
its Gradle dependency links are present. The root `index.html` starts the existing
React app, and Capacitor is configured with `webDir: 'dist'` and no remote server URL.

The Android Vite development preview was checked in desktop and mobile browsers:
live catalogue, beat detail, real MP3 playback across navigation, player hiding on
pause, six song-match results, DMCA content, and search all worked with no runtime
errors or other backend calls. This does not replace production-dist or Android
device testing. Android and hosted previews use separate dependency caches.

This workspace has no Java installation or Android SDK, so it cannot produce or
sign an APK here. If Gradle reports `JAVA_HOME is not set`, use Android Studio's
JDK 21 and install SDK API 36. Run `npm run android:sync` locally to generate and
copy production files before opening Android Studio; generated `dist` and copied
Android assets are not source files and must be regenerated after exporting.
