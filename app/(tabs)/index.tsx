import { auth } from '@/firebase/firebaseConfig';
import { Link } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Button title="Trang chủ" />
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