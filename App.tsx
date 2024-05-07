import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useCameraPermissions } from "./features/permissions/hooks";
import { CameraNotification } from "./features/camera/CameraNotification";
import { forwardRef, useImperativeHandle, useRef } from "react";
import {
	Camera,
	type FormatFilter,
	useCameraDevice,
	useCameraFormat,
	type TakePhotoOptions,
	type PhotoFile,
} from "react-native-vision-camera";
import { PressableOpacity } from "./features/buttons/PressableOpacity";
import { ModalRoot } from "./features/modals/ModalRoot";
import { useModal } from "./features/modals/hooks";
import { useModalStore } from "./features/modals/store";

export default function App() {
	const viewportRef = useRef<ViewportControls>(null);

	return (
		<>
			<StatusBar style="auto" />
			<View style={styles.container}>
				<ViewPort ref={viewportRef} />
				<CameraControls cameraViewPortControls={viewportRef} />
			</View>
      <ModalRoot />
		</>
	);
}

const targetFps = 30;
const cameraFormat: FormatFilter[] = [{ fps: targetFps }, { photoAspectRatio: 16 / 9 }, { videoAspectRatio: 16 / 9 }];

interface ViewportControls {
	takePhoto: (options?: TakePhotoOptions) => Promise<PhotoFile>;
}

const ViewPort = forwardRef<ViewportControls>((_, ref) => {
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef<Camera | null>(null);
	const device = useCameraDevice("back");
	const format = useCameraFormat(device, cameraFormat);
	const fps = Math.min(format?.maxFps ?? 1, targetFps);

	let child: JSX.Element;

	useImperativeHandle(
		ref,
		() => ({
			takePhoto: async (options?: TakePhotoOptions): Promise<PhotoFile> => {
				const cam = cameraRef.current;
				if (cam == null) {
					return Promise.reject("Camera not initialized");
				}

				return cam.takePhoto(options);
			},
		}),
		[],
	);

	if (!permission) {
		// Camera permissions are still loading
		child = <ActivityIndicator />;
	} else if (!permission.granted) {
		// Camera permissions are not granted yet
		child = (
			<CameraNotification message="We need your permission to use the camera" error>
				<View style={{ alignSelf: "center", padding: 20 }}>
					<Button onPress={requestPermission} title="grant permission" />
				</View>
			</CameraNotification>
		);
	} else {
		if (!device) {
			child = <Text>No device found</Text>;
		} else {
			child = (
				<Camera
					ref={cameraRef}
					device={device}
					format={format}
					photo={true}
					fps={fps}
					isActive={true}
					style={styles.camera}
					resizeMode="contain"
				/>
			);
		}
	}

	return <View style={styles.viewPort}>{child}</View>;
});

interface CameraControlsProps {
	cameraViewPortControls: React.RefObject<ViewportControls>;
}

function CameraControls({ cameraViewPortControls }: CameraControlsProps) {
	const takePicture = async () => {
		const viewport = cameraViewPortControls.current;
		if (viewport == null) {
			return;
		}

		try {
			const photo = await viewport.takePhoto();

			console.log("Photo taken:", photo);

      useModalStore.getState().setActiveModal("ViewPicture", { file: photo });

		} catch (err) {
			console.error(err);
		}
	};

	return (
		<View style={styles.cameraControls}>
      <PressableOpacity style={styles.cameraButton} onPress={takePicture} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		flexDirection: "column",
	},
	viewPort: {
		aspectRatio: 9 / 16,
		backgroundColor: "red",
	},
	camera: {
		width: "100%",
		height: "100%",
	},
	cameraControls: {
		flex: 1,
		backgroundColor: "#16313f",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
	},
	cameraButton: {
		flex: 0.5,
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 50,
	},
});
