import {AsyncStorage} from "react-native"

export async function getArray(name) {
    let array = await AsyncStorage.getItem(name) || "[]"
    return array
}