import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<View style={styles.container}>
				<ViewPort />
        <CameraControls />
			</View>
		</>
	);
}

function ViewPort() {
	return <View style={styles.viewPort} />;
}

function CameraControls() {
  return <View style={styles.cameraControls} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
    flexDirection: 'column',
	},
  viewPort: {
    aspectRatio: 9 / 16,
    backgroundColor: 'red',
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
