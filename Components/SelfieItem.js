import { SafeAreaView, ImageBackground, Text, View, Pressable, StyleSheet, Dimensions } from 'react-native';

const numColumns = 2;
const { height, width } = Dimensions.get('window');

function SelfieItem({selfie, onSelect}) {

    return (
        <SafeAreaView>
            <Pressable onPress={onSelect.bind(this, selfie.id)}>
                <View>
                    <ImageBackground style={styles.image} imageStyle={{borderRadius: 16}} blurRadius={8} source={{ uri: selfie.imageUri}}> 
                        <Text style={styles.imageText}>{selfie.getDate()}</Text>   
                        <Text style={styles.imageText}>{selfie.getTime()}</Text>   
                    </ImageBackground>
                </View>
            </Pressable>
        </SafeAreaView>
    );
}

export default SelfieItem;

const styles = StyleSheet.create({
    pressed: {

    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height / 3,
        flex: 1,
        margin: 1,
        width: width / numColumns,
        paddingHorizontal: 15,
        marginTop: 15,
    },
    imageText: {
        color: "white",
        fontSize: 30,
        lineHeight: 40,
        fontWeight: "bold",
        textAlign: "center",
    },
});