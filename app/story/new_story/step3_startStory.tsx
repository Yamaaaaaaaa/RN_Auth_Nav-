import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

export default function Step3_StartStory() {
    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FFDCD1", "#ECEBD0"]} style={styles.gradient} />
            <View style={styles.contentWrapper}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Learn or depart ✏️</Text>
                </View>

                <View style={styles.iconContainer}>
                    <View style={styles.glowCircle}>
                        <Text style={styles.iconText}>📚✏️</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.startButton} onPress={() => router.push("/story/new_story/step4_selectShareStories")}>
                        <Text style={styles.startButtonText}>Start story</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.skipButton} onPress={() => router.push("/story/new_story/step6_generateScreen")}>
                        <Text style={styles.skipButtonText}>Skip to Generate</Text>
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
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 60,
    },
    backButton: {
        alignSelf: "flex-start",
        padding: 10,
        marginBottom: 20,
    },
    backText: {
        fontSize: 24,
        color: "#333",
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 80,
    },
    headerText: {
        fontSize: 18,
        color: "#333",
        fontWeight: "500",
    },
    iconContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        marginBottom: 100,
    },
    glowCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#FFB366",
        shadowColor: "#FFB366",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    iconText: {
        fontSize: 35,
    },
    buttonContainer: {
        alignItems: "center",
        paddingBottom: 50,
    },
    startButton: {
        backgroundColor: "#4A4A4A",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 15,
        minWidth: 200,
        alignItems: "center",
    },
    startButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
    skipButton: {
        backgroundColor: "transparent",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#999",
        minWidth: 200,
        alignItems: "center",
    },
    skipButtonText: {
        color: "#666",
        fontSize: 14,
    },
})
