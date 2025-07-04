import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { screenRatio } from "@/utils/initScreen"

export default function Step6_Generate() {
    return (
        <View style={styles.container}>
            <LinearGradient colors={["#353A3F", "#353A3F"]} style={styles.gradient} />
            <View style={styles.contentWrapper}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>

                <View style={styles.iconContainer}>
                    <View style={styles.glowCircle}>
                        <Image source={require("../../../assets/images/NewUI/Group 70.png")} style={styles.headerIcon} />

                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Generate a story from our conversation or save your in-progress story for another day.
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>View transcript</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Save story</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/story/new_story/step7_loadingGenerate")}>
                        <Text style={styles.actionButtonText}>Generate story</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    contentWrapper: {
        zIndex: 2,
        width: "100%",
        paddingHorizontal: 30,
        paddingTop: screenRatio >= 2 ? 60 : 30,
    },
    closeButton: {
        alignSelf: "flex-end",
        marginBottom: screenRatio >= 2 ? 60 : 30,
    },
    closeText: {
        fontSize: screenRatio >= 2 ? 35 : 30,
        color: "#999",
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: screenRatio >= 2 ? 40 : 20,
    },
    glowCircle: {
        paddingVertical: screenRatio >= 2 ? 58 : 40,
        paddingHorizontal: screenRatio >= 2 ? 50 : 30,
        borderRadius: 1000,
        backgroundColor: "#FFD700",
        justifyContent: "center",
        alignItems: "center",
    },
    iconText: {
        fontSize: 35,
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 60,
    },
    mainText: {
        color: "white",
        fontSize: screenRatio >= 2 ? 22 : 18,
        fontFamily: "Alberts",
        textAlign: "center",
        paddingHorizontal: 20,
    },
    buttonContainer: {
        paddingBottom: 50,
    },
    actionButton: {
        backgroundColor: "#EAF2F8",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 1000,
        alignItems: "center",
        marginBottom: 15,
    },
    actionButtonText: {
        color: "#333",
        fontSize: screenRatio >= 2 ? 22 : 18,
        fontFamily: "Alberts",
    },
    generateButton: {
        backgroundColor: "#E5E5E5",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
    },
    generateButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "500",
    },
})
