import { View, StyleSheet, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseConfig';
import { router } from 'expo-router';


// ✅ Interface cho dữ liệu bạn bè
interface Friend {
    uid: string;
    name: string;
    profilePicture: string;
}

export default function FriendListScreen() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const fetchFriends = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const data = userDoc.data();
                if (!data) return;

                const friendIds: string[] = data.friends || [];

                const friendPromises: Promise<Friend>[] = friendIds.map(async (id: string) => {
                    const friendDoc = await getDoc(doc(db, 'users', id));
                    const friendData = friendDoc.data();
                    return {
                        uid: id,
                        name: friendData?.username || 'No Name',
                        profilePicture: friendData?.profilePicture || '',
                    };
                });

                const friendList = await Promise.all(friendPromises);
                setFriends(friendList);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, []);

    const filteredFriends = friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FFDCD1", "#ECEBD0"]} style={styles.gradient} />
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>My family and friends</Text>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={setSearchText}
                />

                <FlatList
                    data={filteredFriends}
                    keyExtractor={(item) => item.uid}
                    numColumns={3}
                    contentContainerStyle={styles.grid}
                    renderItem={({ item }) => (
                        <View style={styles.friendItem}>
                            <Image source={{ uri: item.profilePicture }} style={styles.avatar} />
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                    )}
                />

                <TouchableOpacity style={styles.addButton} onPress={() => router.push("/(tabs)/invite_contact")}>
                    <Text style={styles.addIcon}>👥+</Text>
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
        paddingHorizontal: 24,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    contentWrapper: {
        zIndex: 2,
        width: "100%",
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        width: '90%',
        marginBottom: 20,
        fontSize: 16,
    },
    grid: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    friendItem: {
        alignItems: 'center',
        marginHorizontal: 12,
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 6,
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
    },
    addButton: {
        backgroundColor: '#333',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30,
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    addIcon: {
        fontSize: 22,
        color: '#fff',
    },
});
