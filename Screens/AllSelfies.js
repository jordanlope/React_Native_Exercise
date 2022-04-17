import SelfieList from "../Components/SelfieList"
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Selfie } from "../models/selfie";
import { Alert } from 'react-native';
import IconButton from '../Components/UI/IconButton';
import { useState, useEffect, useLayoutEffect } from 'react';

export default function AllSelfies({navigation}) {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const [selfies, setSelfies] = useState([]);

  useEffect(() => {
    console.log("Fetch Selfies: " +  selfies);
  }, [selfies]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton 
          icon="camera" 
          size={24} 
          color={tintColor} 
          onPress={takeImageHandler} />
      ),
    });
  }, [navigation]);

  async function verifyPermission() {
    // console.log(cameraPermissionInformation.status);
    // if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED || cameraPermissionInformation.status === null) {
    //   const permissionResponse = await requestPermission();

    //   return permissionResponse.granted;
    // }
  
    // if(cameraPermissionInformation.status === PermissionStatus.DENIED) {
    //   console.log("2");
    //   Alert(
    //     "Insufficent Permissions", 
    //     "Please grant camera permissions to use this app");
    //   return false;
    // }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    console.log(hasPermission);
    if(!hasPermission) {
      console.log("Has no permission");
      return;
    }
    
    await launchCameraAsync({
        allowsEditing: false,
        aspect: [16, 9],
        quality: 0.5,
        cameraType: 'front',
        mediaType: 'photo'
    }).then((value) => {
      console.log("Uri value: " + value["uri"]);
      saveSelfieHandler(value["uri"]);
    });
  }

  const saveSelfieHandler = (uri) => {
    const selfieData = new Selfie(uri);

    setSelfies((selfies) => [
      selfieData,
      ...selfies
    ]);
  }

  return (
    <SelfieList selfies={selfies}/>
  )
}
