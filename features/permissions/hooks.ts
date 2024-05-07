//import * as MediaLibrary from 'expo-media-library';
import { type PermissionResponse, PermissionStatus, createPermissionHook } from "expo-modules-core";
import { useCallback, useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native";

export const useCameraPermissions = createPermissionHook({
	getMethod: async () => {
		const r = await PermissionsAndroid.check("android.permission.CAMERA");

		return {
			status: r ? PermissionStatus.GRANTED : PermissionStatus.DENIED,
			expires: "never",
			granted: r,
			canAskAgain: true,
		} satisfies PermissionResponse;
	},
	requestMethod: async () => {
		const r = await PermissionsAndroid.request("android.permission.CAMERA");

		return {
			status: r === "granted" ? PermissionStatus.GRANTED : PermissionStatus.DENIED,
			expires: "never",
			granted: r === "granted",
			canAskAgain: true,
		} satisfies PermissionResponse;
	},
});
