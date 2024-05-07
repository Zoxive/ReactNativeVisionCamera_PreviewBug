import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export type CameraNotificationProps = {
	error?: boolean;
	message?: string | [string, string];
	children?: React.ReactNode;
};

export function CameraNotification({ message, error, children }: CameraNotificationProps) {
	const [layoutInfo, setLayoutInfo] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

	if (!message) return null;

	return (
		<View style={styles.notification} onLayout={(e) => setLayoutInfo(e.nativeEvent.layout)}>
			<View style={[styles.rotatedContainer, { width: layoutInfo.height }]}>
				<View style={styles.innerContainer}>
					<View style={styles.iconStack}>
					</View>
					<View style={styles.textContainer}>
						{typeof message === 'string' ? <Text style={styles.text}>{message}</Text> : null}
						{Array.isArray(message) && (
							<>
								<Text style={styles.text}>{message[0]}</Text>
								<Text style={[styles.text, { color: '#B6EADA' }]}>{message[1]}</Text>
							</>
						)}
					</View>
				</View>
				{children}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	notification: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		backgroundColor: '#99999955',
	},
	rotatedContainer: {
		transform: [{ rotate: '90deg' }],
		alignContent: 'flex-start',
		justifyContent: 'flex-start',
		position: 'relative',
		top: 0,
		left: -30,
		right: 0,
		bottom: 0,
	},
	innerContainer: {
		padding: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'center',
		borderRadius: 20,
		backgroundColor: '#575858DD',
	},
	textContainer: {
		marginRight: 10,
		flexDirection: 'row',
	},
	text: {
		color: 'white',
	},
	iconStack: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
});
