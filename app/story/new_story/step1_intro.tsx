import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

export default function Step1_IntroScreen() {
    return (
        <View style={styles.container}>
            <LinearGradient colors={["#4A4A4A", "#2A2A2A"]} style={styles.gradient} />
            <View style={styles.contentWrapper}>
                <View style={styles.iconContainer}>
                    <View style={styles.glowCircle}>
                        <View style={styles.iconWrapper}>
                            <Text style={styles.iconText}>✏️📄</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Take a moment to reflect on that period of your life, and the experience that created your memory and formed
                        your story.
                    </Text>

                    <Text style={styles.subText}>Channel your reflections into the next 5 questions</Text>
                </View>

                <TouchableOpacity style={styles.continueButton} onPress={() => router.push("/story/new_story/step2_initQuestion")}>
                    <Text style={styles.buttonText}>Continue</Text>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
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
        justifyContent: "space-between",
        paddingTop: 100,
        paddingBottom: 50,
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 50,
    },
    glowCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#FFD700",
        shadowColor: "#FFD700",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    iconWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    iconText: {
        fontSize: 40,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    mainText: {
        color: "white",
        fontSize: 18,
        lineHeight: 26,
        textAlign: "left",
        marginBottom: 30,
        fontWeight: "400",
    },
    subText: {
        color: "white",
        fontSize: 16,
        lineHeight: 24,
        textAlign: "left",
        opacity: 0.9,
    },
    continueButton: {
        backgroundColor: "#4A4A4A",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
        marginRight: 8,
    },
    arrow: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
})
