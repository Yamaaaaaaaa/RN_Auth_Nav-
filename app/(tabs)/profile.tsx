import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { screenRatio } from '@/utils/initScreen';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '@/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as FileSystem from 'expo-file-system';


export default function ProfileScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const uid = auth.currentUser?.uid;
                if (!uid) return;

                const userDoc = await getDoc(doc(db, "users", uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setName(userData.username || '');
                    setEmail(userData.email || '');
                    setImageUri(userData.profilePicture || null);
                }
            } catch (err) {
                console.error("Lỗi khi load thông tin người dùng:", err);
            }
        };

        loadUserData();
    }, []);


    // Upload ảnh
    const uploadImageToStorage = async (uri: string): Promise<string> => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) throw new Error("Người dùng chưa đăng nhập");

            // Đọc file ảnh dưới dạng base64
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const imageRef = ref(storage, `avatars/${uid}.jpg`);

            // Upload chuỗi base64
            await uploadString(imageRef, base64, 'base64');

            // Lấy URL ảnh
            const downloadURL = await getDownloadURL(imageRef);
            return downloadURL;
        } catch (error) {
            console.error("🔥 Lỗi khi upload ảnh:", error);
            throw error;
        }
    };

    // Mở thư viện và upload
    const pickImage = async () => {
        // const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // if (!permission.granted) return;

        // const result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //     allowsEditing: true,
        //     aspect: [1, 1],
        //     quality: 0.7,
        // });

        // if (!result.canceled && result.assets.length > 0) {
        //     const uri = result.assets[0].uri;
        //     const downloadUrl = await uploadImageToStorage(uri);
        //     setImageUri(downloadUrl);
        // }
    };


    const handleSave = async () => {
        try {
            const uid = auth.currentUser?.uid;

            if (!uid) {
                alert("Không tìm thấy người dùng");
                return;
            }

            const userRef = doc(db, "users", uid);

            await setDoc(userRef, {
                username: name,
                email,
                profilePicture: imageUri ?? null, // nếu người dùng đã chọn ảnh
            }, { merge: true }); // không xóa các field cũ nếu có

            alert("Thông tin đã được cập nhật!");
        } catch (error) {
            console.error("Lỗi khi lưu thông tin:", error);
            alert("Có lỗi xảy ra khi lưu thông tin.");
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FFDCD1", "#ECEBD0"]} style={styles.gradient} />
            <View style={styles.contentWrapper}>
                <View style={styles.avatarWrapper}>
                    <View>
                        <Image
                            source={imageUri ? { uri: imageUri } : require('../../assets/images/NewUI/NewUI_Logo.png')}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editBtn} onPress={pickImage}>
                            <Text style={styles.editText}>Edit</Text>
                            <Image source={require('../../assets/images/NewUI/pen.png')} style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputLabel}>
                            Name
                        </Text>
                        <TextInput value={name} onChangeText={setName} style={styles.inputEnterText} />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputLabel}>
                            Email
                        </Text>
                        <TextInput
                            placeholder=""
                            editable={false}
                            value={email}
                            onChangeText={setEmail}
                            style={styles.inputEnterText}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputLabel}>
                            New password
                        </Text>
                        <TextInput
                            placeholder=""
                            value={newPassword}
                            onChangeText={setNewPassword}
                            style={styles.inputEnterText}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputLabel}>
                            Confirm new password
                        </Text>
                        <TextInput
                            placeholder=""
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.inputEnterText}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>Save changes</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.logoutBtn} onPress={() => signOut(auth)}>
                    <Text style={styles.logoutBtnText}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column-reverse",
        paddingHorizontal: 49,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    contentWrapper: {
        zIndex: 2,
        width: "100%",
        alignItems: 'center',
    },
    avatarWrapper: {
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 128,
        height: 128,
        borderRadius: 100,
        backgroundColor: '#eee',
    },
    editBtn: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "center"
    },
    editIcon: {
        width: 20,
        height: 20,
    },
    editText: {
        marginRight: 8,
        fontSize: 22,
        fontFamily: "Alberts"
    },
    inputWrapper: {
        width: "100%",
    },
    inputItem: {
    },
    inputLabel: {
        marginTop: screenRatio >= 2 ? 8 : 5,
        fontSize: screenRatio >= 2 ? 22 : 18,
        fontWeight: "500",
        fontFamily: "Alberts",
    },
    inputEnterText: {
        marginTop: screenRatio >= 2 ? 8 : 5,
        height: screenRatio >= 2 ? 44 : 35,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 12,
    },
    saveBtn: {
        alignSelf: "flex-end",
        backgroundColor: '#FEA36680',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginTop: 20,
    },
    saveBtnText: {
        fontSize: screenRatio >= 2 ? 22 : 18,
        fontFamily: "Alberts"
    },
    logoutBtn: {
        marginTop: screenRatio >= 2 ? 36 : 20,
        marginBottom: screenRatio >= 2 ? 115 : 80,

        backgroundColor: '#353A3F',
        paddingVertical: screenRatio >= 2 ? 16 : 14,
        borderRadius: 1000,
        width: "100%",
        alignItems: "center",
    },
    logoutBtnText: {
        color: '#FEF4F6',
        fontSize: screenRatio >= 2 ? 22 : 18,
        fontFamily: "Alberts"
    },
});