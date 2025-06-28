import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenRatio } from '@/utils/initScreen';
import { router } from 'expo-router';

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FFDCD1", "#ECEBD0"]} style={styles.gradient} />
            <View style={styles.contentWrapper}>
                <View style={styles.headerView}>
                    <Text style={styles.headerTxt}>Welcome Hanjun</Text>
                    <Image source={require("../../assets/images/NewUI/Waving Hand.png")}></Image>
                </View>
                <View style={styles.navWrapper}>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navIxt}>
                            My stories
                        </Text>
                        <Image style={styles.navIcon} source={require("../../assets/images/NewUI/book.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/friend_list")}>
                        <Text style={styles.navIxt}>
                            Contact list
                        </Text>
                        <Image style={styles.navIcon} source={require("../../assets/images/NewUI/profile-add.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/profile")}>
                        <Text style={styles.navIxt}>
                            Profile
                        </Text>
                        <Image style={styles.navIcon} source={require("../../assets/images/NewUI/user-square.png")}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column-reverse",
        paddingHorizontal: "12%",
        paddingBottom: 63,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    contentWrapper: {
        zIndex: 2,
        width: "100%",
    },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTxt: {
        fontSize: screenRatio >= 2 ? 36 : 30,
        fontWeight: "600",
        fontFamily: "Alberts",
        marginRight: 16,
    },
    navWrapper: {
        alignItems: "center",
        gap: 20,
        marginTop: 40,
        paddingHorizontal: 47,
        marginBottom: screenRatio >= 2 ? 200 : 100,
    },
    navItem: {
        backgroundColor: "#353A3F",
        paddingVertical: 20,
        width: 242,
        alignItems: "center",
        borderRadius: 12,
    },
    navIxt: {
        fontSize: 22,
        fontFamily: "Alberts",
        color: "#FEF4F6",
        marginBottom: 8,
    },
    navIcon: {

    }
});