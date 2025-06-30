import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

export default function Step6_Generate() {
    return (
        <View style={styles.container}>
            <LinearGradient colors={["#4A4A4A", "#2A2A2A"]} style={styles.gradient} />
            <View style={styles.contentWrapper}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>

                <View style={styles.iconContainer}>
                    <View style={styles.glowCircle}>
                        <Text style={styles.iconText}>📖✏️</Text>
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Generate a story from our conversation or save your in-progress story for another day.
                    </Text>
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>M</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>View transcript</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Save story</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.generateButton} onPress={() => router.push("/story/new_story/step7_loadingGenerate")}>
                        <Text style={styles.generateButtonText}>Generate story</Text>
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
    closeButton: {
        alignSelf: "flex-end",
        padding: 10,
        marginBottom: 20,
    },
    closeText: {
        fontSize: 20,
        color: "#999",
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    glowCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#FFD700",
        shadowColor: "#FFD700",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 25,
        elevation: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    iconText: {
        fontSize: 35,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mainText: {
        color: "white",
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
    },
    logoText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonContainer: {
        paddingBottom: 50,
    },
    actionButton: {
        backgroundColor: "white",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 15,
    },
    actionButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "500",
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
