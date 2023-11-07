import { useEffect, useState } from "react";
import {  StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useIsFocused} from "@react-navigation/native"
import { useStorage } from "../../hooks/useStorage";
import { PasswordItem } from "./components/passwordsItems";

export function Password() {
    const [listPassword, setListPassoword] = useState([])
    const focused = useIsFocused()
    const {getItem, removeItem} = useStorage()

    useEffect(() => {
        async function loadPasswords() {
            const passwords = await getItem("@pass")
            setListPassoword(passwords);
        }
        loadPasswords()
    },[focused])

    async function handleDeletePassword(item) {
        const passwords = await removeItem("@pass", item)
        setListPassoword(passwords)
    }


    return(
        <SafeAreaView style={{flex:1}}>
            <View style={styles.header}>
            <Text style={styles.title}> Minhas senhas</Text>
            </View>

            <View style={styles.content}>
                <FlatList
                style={{flex:1, paddingTop:14}}
                data={listPassword}
                keyExtractor={(item) => String(item)}
                renderItem={({item}) => <PasswordItem data={item} removePassword={() => handleDeletePassword(item)}/>}
                />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:"#393de9",
        paddingTop:58,
        paddingBottom:14,
        paddingLeft:14,
        paddingRight:14
    },

    title: {
        fontSize:18,
        color:"#FFF",
        fontWeight:"bold"
    },

    content: {
        flex:1,
        paddingLeft:14,
        paddingRight:14
    }
})