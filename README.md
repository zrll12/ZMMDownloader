# ZMMDownloader
A hybrid app using capacitor for downloading videos on bilibili
## usage
### Download apk files directly
This project is in early developing age now,
and contains only the gui. So I am not planning to provide apk file currently.
If you want to try out the unfinished app, please build on your own.
### Build application(for Android)
1. clone the code<br>
You can download the code or use
```
git clone https://github.com/zrll12/ZMMDownloader.git
```
2. setup the building environment<br>
Install nodejs, ionic, java and android studio.<br>
Then, run these in your project folder
```
npm install
```
3. make build for web and create android project<br>
```
npm run build
ionic capacitor add android
ionic capacitor build android
cd android
gradlew build
```
4. add permissions to application<br>
Add the following to the permission part of *\android\app\src\main\AndroidManifest.xml*<br>
If you are trying to build for android 10 and 11, please add *android:requestLegacyExternalStorage="true"* into \<application>
```
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE"/>
```
5. build and create apk
Open this project in Android Studio, then click <br>***Build > Build Bundle(s) / APK(s) > Build APK(s)***<br>
Then, you can find your apk in *\android\app\build\outputs\apk\debug*
## Contribute
If you interested in contributing, please fork this repository, make changes and create pull request.
### TODOs:
- [ ] Add download functions
- [ ] Add instructions for building ipa files
- [ ] Add support for saving to photo gallery