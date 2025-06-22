import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Thành công', 'Tài khoản đã được tạo');
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Lỗi đăng ký', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Mật khẩu" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
        <Text style={{ color: 'blue', marginTop: 10 }}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 12, padding: 10, borderRadius: 5 },
  button: { backgroundColor: '#34C759', padding: 12, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center' },
});
