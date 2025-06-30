import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenRatio } from '@/utils/initScreen';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '@/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uploading, setUploading] = useState(false);

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

    // Alternative upload method using uploadBytesResumable
    const uploadImageToStorage = async (uri: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const uid = auth.currentUser?.uid;
                if (!uid) {
                    reject(new Error("Người dùng chưa đăng nhập"));
                    return;
                }

                console.log("=== STARTING UPLOAD ===");
                console.log("User ID:", uid);
                console.log("Image URI:", uri);

                // Convert image to blob
                const response = await fetch(uri);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const blob = await response.blob();
                console.log("Blob created:", {
                    size: blob.size,
                    type: blob.type
                });

                // Create storage reference with simpler path
                const fileName = `${uid}_${Date.now()}.jpg`;
                const imageRef = ref(storage, fileName); // Simplified path - just filename

                console.log("Storage reference:", imageRef.fullPath);

                // Use uploadBytesResumable for better error handling
                const uploadTask = uploadBytesResumable(imageRef, blob);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload progress:', progress + '%');
                    },
                    (error) => {
                        console.error("Upload failed:", error);
                        reject(error);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            console.log("Upload completed, URL:", downloadURL);
                            resolve(downloadURL);
                        } catch (urlError) {
                            console.error("Error getting download URL:", urlError);
                            reject(urlError);
                        }
                    }
                );

            } catch (error) {
                console.error("Upload setup error:", error);
                reject(error);
            }
        });
    };

    // Fallback upload method
    const uploadImageFallback = async (uri: string): Promise<string> => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) throw new Error("Không có user ID");

            // Convert to base64 and upload as string
            const response = await fetch(uri);
            const blob = await response.blob();

            // Simple upload without folder structure
            const fileName = `avatar_${uid}.jpg`;
            const imageRef = ref(storage, fileName);

            const uploadResult = await uploadBytes(imageRef, blob);
            const downloadURL = await getDownloadURL(uploadResult.ref);

            return downloadURL;
        } catch (error) {
            console.error("Fallback upload failed:", error);
            throw error;
        }
    };

    const pickImage = async () => {
        try {
            // Check authentication
            if (!auth.currentUser) {
                Alert.alert("Lỗi", "Bạn cần đăng nhập để upload ảnh");
                return;
            }

            // Request permission
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert("Cần quyền truy cập", "Vui lòng cấp quyền truy cập thư viện ảnh.");
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.3, // Very low quality for testing
            });

            if (!result.canceled && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                setUploading(true);

                try {
                    let downloadUrl: string;

                    try {
                        // Try main upload method first
                        downloadUrl = await uploadImageToStorage(uri);
                    } catch (mainError) {
                        console.log("Main upload failed, trying fallback...");
                        // Try fallback method
                        downloadUrl = await uploadImageFallback(uri);
                    }

                    setImageUri(downloadUrl);

                    // Update Firestore
                    const uid = auth.currentUser?.uid;
                    if (uid) {
                        const userRef = doc(db, "users", uid);
                        await setDoc(userRef, {
                            profilePicture: downloadUrl,
                        }, { merge: true });
                    }

                    Alert.alert("Thành công", "Ảnh đại diện đã được cập nhật!");

                } catch (error: any) {
                    console.error("All upload methods failed:", error);
                    Alert.alert(
                        "Lỗi Upload",
                        "Không thể upload ảnh. Vui lòng:\n1. Kiểm tra kết nối mạng\n2. Thử lại sau\n3. Chọn ảnh khác"
                    );
                }

                setUploading(false);
            }
        } catch (error: any) {
            console.error("Pick image error:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi chọn ảnh.");
            setUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) {
                Alert.alert("Lỗi", "Không tìm thấy người dùng");
                return;
            }

            if (newPassword && newPassword !== confirmPassword) {
                Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
                return;
            }

            const userRef = doc(db, "users", uid);
            const updateData: any = {
                username: name,
                email,
                profilePicture: imageUri ?? null,
            };

            await setDoc(userRef, updateData, { merge: true });
            Alert.alert("Thành công", "Thông tin đã được cập nhật!");
        } catch (error) {
            console.error("Lỗi khi lưu thông tin:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi lưu thông tin.");
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
                        <TouchableOpacity
                            style={[styles.editBtn, uploading && styles.editBtnDisabled]}
                            onPress={pickImage}
                            disabled={uploading}
                        >
                            <Text style={styles.editText}>
                                {uploading ? "Uploading..." : "Edit"}
                            </Text>
                            {!uploading && (
                                <Image source={require('../../assets/images/NewUI/pen.png')} style={styles.editIcon} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputLabel}>Name</Text>
                        <TextInput value={name} onChangeText={setName} style={styles.inputEnterText} />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            placeholder=""
                            editable={false}
                            value={email}
                            onChangeText={setEmail}
                            style={styles.inputEnterText}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputLabel}>New password</Text>
                        <TextInput
                            placeholder=""
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={true}
                            style={styles.inputEnterText}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputLabel}>Confirm new password</Text>
                        <TextInput
                            placeholder=""
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
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
    editBtnDisabled: {
        opacity: 0.6,
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
        paddingHorizontal: 12,
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