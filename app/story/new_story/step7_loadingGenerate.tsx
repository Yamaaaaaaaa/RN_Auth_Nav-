"use client"

import { useEffect, useState } from "react"
import { View, StyleSheet, Text, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function Step7_Loading() {
    const [progress] = useState(new Animated.Value(0))
    const [progressText, setProgressText] = useState(0)

    useEffect(() => {
        // Animate the pen moving from left to right
        Animated.timing(progress, {
            toValue: 1,
            duration: 3000, // 3 seconds
            useNativeDriver: false,
        }).start(() => {
            console.log("Gen Completed")
            // You can navigate to next screen or show completion
        })

        // Update progress text
        const progressListener = progress.addListener(({ value }) => {
            setProgressText(Math.round(value * 100))
        })

        return () => {
            progress.removeListener(progressListener)
        }
    }, [])

    const penPosition = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["10%", "90%"],
    })

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FFDCD1", "#ECEBD0"]} style={styles.gradient} />
            <View style={styles.contentWrapper}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Generating your story...</Text>

                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <Animated.View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: progress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ["0%", "100%"],
                                        }),
                                    },
                                ]}
                            />
                        </View>

                        <Animated.View
                            style={[
                                styles.penContainer,
                                {
                                    left: penPosition,
                                },
                            ]}
                        >
                            <Text style={styles.penIcon}>✏️</Text>
                        </Animated.View>
                    </View>

                    <Text style={styles.progressText}>{progressText}%</Text>
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
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    loadingContainer: {
        alignItems: "center",
        width: "100%",
    },
    loadingText: {
        fontSize: 20,
        color: "#333",
        marginBottom: 50,
        fontWeight: "500",
    },
    progressContainer: {
        width: "100%",
        height: 60,
        position: "relative",
        marginBottom: 30,
    },
    progressBar: {
        width: "100%",
        height: 8,
        backgroundColor: "#E0E0E0",
        borderRadius: 4,
        position: "absolute",
        top: 26,
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#4CAF50",
        borderRadius: 4,
    },
    penContainer: {
        position: "absolute",
        top: 0,
        transform: [{ translateX: -15 }],
    },
    penIcon: {
        fontSize: 30,
    },
    progressText: {
        fontSize: 18,
        color: "#666",
        fontWeight: "600",
    },
})
