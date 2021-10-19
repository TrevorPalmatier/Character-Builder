import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity, ProgressBarAndroidComponent } from "react-native";

import CameraPreview from "../components/CameraPreview";
import { Camera } from "expo-camera";

const CameraScreen = (props) => {
	const [camera, setCamera] = useState(null);
	const [flashMode, setFlashMode] = useState("off");
	const [previewVisible, setPreviewVisible] = useState(false);
	const [capturedImage, setCapturedImage] = useState(null);
	const [camType, setType] = useState(Camera.Constants.Type.back);

	const takePicture = async () => {
		// if(!camera) return
		const photo = await camera.takePictureAsync();
		// console.log(photo);
		// setStartCamera(false);
		setPreviewVisible(true);
		setCapturedImage(photo);
	};

	const savePhoto = () => {
		setPreviewVisible(false);
		props.navigation.navigate("Home");
		console.log("saved");
	};

	const retakePhoto = () => {
		setCapturedImage(null);
		setPreviewVisible(false);
		console.log("retake");
	};

	return (
		<View style={styles.main}>
			{previewVisible && capturedImage ? (
				<CameraPreview photo={capturedImage} savePhoto={savePhoto} retakePhoto={retakePhoto} />
			) : (
				<Camera style={styles.camera} type={camType} flashMode={flashMode} ref={(r) => setCamera(r)}>
					<View style={styles.camCapBtnContainer}>
						<TouchableOpacity onPress={takePicture} style={styles.camCapBtn} />
					</View>
				</Camera>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	camera: {
		flex: 1,
		width: "100%",
	},
	camCapBtnContainer: {
		alignSelf: "center",
		flex: 1,
		alignItems: "center",
	},
	camCapBtn: {
		position: "absolute",
		width: 70,
		height: 70,
		bottom: 40,
		borderRadius: 50,
		backgroundColor: "#fff",
	},
});

export default CameraScreen;
