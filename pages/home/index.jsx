import Slider from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, Modal } from "react-native";
import { ModalPassword } from "../../components";
let charset = "abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
export function Home() {

    const [size, setSize] = useState(7);
    const [passwordValue, setPasswordValue] = useState("")
    const [modal, setModal] = useState(false)

    function generatePassword() {
        let password = "";

        for (let i = 0, n = charset.length; i < size; i++) {
            password += charset.charAt(Math.floor(Math.random() * n))
        }
        setPasswordValue(password)
        setModal(true)
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
            />
            <Text style={styles.Title}>{size} caracteres</Text>

            <View style={styles.area}>
                <Slider
                    style={{ height: 50 }}
                    minimumValue={6}
                    maximumValue={20}
                    maximumTrackTintColor="#ff0000"
                    minimumTrackTintColor="#000"
                    thumbTintColor="#392de9"
                    value={size}
                    onValueChange={(value) => setSize(value.toFixed(0))}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={generatePassword}>
                <Text style={styles.buttonText}>Gerar Senha!</Text>
            </TouchableOpacity>

            <Modal visible={modal} animationType="fade" transparent={true}>
                <ModalPassword password={passwordValue} handleClose={() => setModal(false)} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center"
    },

    logo: {
        marginBottom: 60
    },

    area: {
        marginTop: 14,
        marginBottom: 14,
        width: "80%",
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 8
    },

    button: {
        backgroundColor: "#392de9",
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8",
        marginBottom: 18
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
    },
    Title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF",
    }
})