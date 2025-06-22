import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)'); // chuyển sang màn hình chính sau khi đăng nhập
    } catch (error: any) {
      Alert.alert('Lỗi đăng nhập', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Mật khẩu" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/(auth)/register")}>
        <Text style={{ color: 'blue', marginTop: 10 }}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 12, padding: 10, borderRadius: 5 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center' },
});
