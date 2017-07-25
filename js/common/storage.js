import {AsyncStorage} from "react-native"

export async function getArray(name) {
    let array = await AsyncStorage.getItem(name) || "[]"
    array = JSON.parse(array)
    return array
}

export async function getObject(name) {
    let obj = await AsyncStorage.getItem(name) || "{}"
    obj = JSON.parse(obj)
    return obj
}