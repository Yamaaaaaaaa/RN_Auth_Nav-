"use client"

import { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

const questions = [
    "What is this story about?",
    "Who are the key people in this story?",
    "When did this story take place?",
    "Describe the key moments of this story?",
    "How did this experience change you?",
]

export default function Step2_Questions() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""))
    const [currentAnswer, setCurrentAnswer] = useState("")

    const handleNext = () => {
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = currentAnswer
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setCurrentAnswer(answers[currentQuestion + 1])
        } else {
            router.push("/story/new_story/step3_startStory")
        }
    }

    const handleBack = () => {
        if (currentQuestion > 0) {
            const newAnswers = [...answers]
            newAnswers[currentQuestion] = currentAnswer
            setAnswers(newAnswers)
            setCurrentQuestion(currentQuestion - 1)
            setCurrentAnswer(answers[currentQuestion - 1])
        } else {
            router.back()
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FFDCD1", "#ECEBD0"]} style={styles.gradient} />
            <View style={styles.contentWrapper}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Text style={styles.backText}>‹</Text>
                    </TouchableOpacity>
                    <Text style={styles.progressText}>{currentQuestion + 1}/5</Text>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{questions[currentQuestion]}</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={currentAnswer}
                        onChangeText={setCurrentAnswer}
                        placeholder="Type your answer here..."
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Type ✏️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Speak 🎤</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.nextButton, !currentAnswer.trim() && styles.disabledButton]}
                    onPress={handleNext}
                    disabled={!currentAnswer.trim()}
                >
                    <Text style={styles.nextButtonText}>{currentQuestion === questions.length - 1 ? "Complete" : "Next"}</Text>
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
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40,
    },
    backButton: {
        padding: 10,
    },
    backText: {
        fontSize: 24,
        color: "#333",
    },
    progressText: {
        fontSize: 16,
        color: "#666",
    },
    questionContainer: {
        backgroundColor: "#8B7355",
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
        alignSelf: "flex-start",
    },
    questionText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
    inputContainer: {
        flex: 1,
        backgroundColor: "#F5F5DC",
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        textAlignVertical: "top",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 30,
    },
    actionButton: {
        backgroundColor: "#D2B48C",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    actionButtonText: {
        color: "#8B4513",
        fontSize: 14,
        fontWeight: "500",
    },
    nextButton: {
        backgroundColor: "#8B7355",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 30,
    },
    disabledButton: {
        backgroundColor: "#CCC",
    },
    nextButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
})
