import { Pressable, StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import type { PhotoFile } from "react-native-vision-camera";

export interface ViewPictureProps {
	file: PhotoFile;
	close: () => void;
}

export function ViewPicture({ file, close }: ViewPictureProps) {
	return (
		<View style={[StyleSheet.absoluteFill, styles.container]}>
			<View style={styles.imageContainer}>
				<Image
					source={`file:///${file.path}`}
					style={styles.image}
					onError={(event) => {
						console.log("ERR", event);
					}}
					contentFit="scale-down"
				/>
			</View>
			<View style={styles.controls}>
				<Pressable onPress={close}>
					<Text style={styles.closeButton}>Close</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "black",
	},
	imageContainer: {
		aspectRatio: 9 / 16,
		backgroundColor: "black",
	},
	image: {
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: "black",
	},
	controls: {
		flex: 1,
		backgroundColor: "#16313f",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
	},
	closeButton: {
		color: "white",
		fontSize: 18,
		transform: [{ rotate: "90deg" }],
	},
});
