Trying to show a reproducable app where the react-native-vision-camera preview is not ligned up with the picture that is taken.

## Video Recording when using resizeMode = 'contain'
- [visioncamera_contain.mp4](visioncamera_contain.mp4)
- Viewport is specified in ReactNative to be 16:9, but there are still blackbars on the Preview, and my image & video aspect ratio is also 16:9 specified via the cameraFormat
- After taking the picture lots of cropping is done, thus making it very difficult to take pictures that need some sort of alignments

## Video Recording when using resizeMode = 'cover'
- [visioncamera_cover.mp4](visioncamera_cover.mp4)
- Cover is closer to what is desired, but still not perfect
- It still crops the image compared to the preview, feels like it crops one side more than the other