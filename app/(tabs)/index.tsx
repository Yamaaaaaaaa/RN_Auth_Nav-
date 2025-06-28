import { auth } from '@/firebase/firebaseConfig';
import { Link } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
export default function HomeScreen() {
    const handleGetContacts = async () => {
        // ➕ Gọi lấy danh bạ ở đây
        const { status } = await Contacts.requestPermissionsAsync(); // Cái này là xin cấp quyền nè
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                console.log("Contacts", data);

            }
        } else {
            Alert.alert('Permission Denied', 'Cannot access contacts without permission.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Trang chủ" />
            <TouchableOpacity onPress={handleGetContacts} style={styles.button}><Text>Get Contacts</Text></TouchableOpacity>
            <Link href={"/about"} style={styles.button}>Nav to About</Link>
            <Link href={"/about2"} style={styles.button}>Nav to ... (Check Not Found)</Link>
            <TouchableOpacity onPress={() => signOut(auth)} style={styles.button}>
                <Text>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    button: {
        backgroundColor: "green",
        padding: 10,
        marginVertical: 20,
        color: "white",
        textAlign: "center",
    }
});