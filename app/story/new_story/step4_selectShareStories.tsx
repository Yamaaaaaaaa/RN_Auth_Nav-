import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

export default function Step4_SelectShare() {
    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FFDCD1", "#ECEBD0"]} style={styles.gradient} />
            <View style={styles.contentWrapper}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>

                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>Who would you like to share your story with/tell your story to?</Text>
                </View>

                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.optionButton} onPress={() => router.push("/story/new_story/step5_colabChooseCallType")}>
                        <Text style={styles.optionIcon}>👤</Text>
                        <Text style={styles.optionText}>Myself</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton} onPress={() => router.push("/story/new_story/step5_colabChooseCallType")}>
                        <Text style={styles.optionIcon}>👥</Text>
                        <Text style={styles.optionText}>Me plus one</Text>
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
        marginBottom: 40,
    },
    backText: {
        fontSize: 24,
        color: "#333",
    },
    questionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    questionText: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        lineHeight: 26,
        marginBottom: 60,
        fontWeight: "400",
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 100,
    },
    optionButton: {
        backgroundColor: "#4A4A4A",
        width: 120,
        height: 120,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    optionIcon: {
        fontSize: 30,
        marginBottom: 10,
    },
    optionText: {
        color: "white",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
})
