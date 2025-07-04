"use client"

import { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { screenRatio } from "@/utils/initScreen"

const questions = [
    "What is this story about?",
    "Who are the key people in this story?",
    "When did this story take place?",
    "Describe the key moments of this story?",
]

export default function Step2_Questions() {
    const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""))
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const handleAnswerChange = (text: string, index: number) => {
        const newAnswers = [...answers]
        newAnswers[index] = text
        setAnswers(newAnswers)
    }

    const handleNext = (index: number) => {
        if (answers[index].trim()) {
            if (index < questions.length - 1) {
                setCurrentQuestionIndex(index + 1)
            } else {
                // All questions answered, navigate to next step
                router.push("/story/new_story/step3_startStory")
            }
        }
    }

    const handleErase = (index: number) => {
        const newAnswers = [...answers]
        newAnswers[index] = ""
        setAnswers(newAnswers)
    }

    const handleBack = () => {
        router.back()
    }

    // Show questions up to current question index + 1
    const questionsToShow = currentQuestionIndex + 1

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FFDCD1", "#ECEBD0"]} style={styles.gradient} />
            <View style={styles.containerWrapper}>
                <View style={styles.header}>
                    <TextInput style={styles.title}>Learn or depart</TextInput>
                    <Image source={require("../../../assets/images/NewUI/pen.png")} style={styles.headerIcon} />
                </View>

                <ScrollView style={styles.conversationContainer} showsVerticalScrollIndicator={false}>
                    {Array.from({ length: questionsToShow }).map((_, index) => (
                        <View key={index} style={styles.questionAnswerPair}>
                            {/* Question Bubble */}
                            <View style={styles.questionBubble}>
                                <Text style={styles.questionText}>{questions[index]}</Text>
                            </View>

                            {/* Answer Input Bubble */}
                            <View style={styles.answerBubbleContainer}>
                                <View style={styles.answerBubble}>
                                    <TextInput
                                        style={styles.answerInput}
                                        value={answers[index]}
                                        onChangeText={(text) => handleAnswerChange(text, index)}
                                        placeholder="Type your answer here..."
                                        multiline
                                        textAlignVertical="top"
                                        autoFocus={index === currentQuestionIndex}
                                    />
                                </View>

                                {/* Action Buttons directly below answer bubble */}
                                <View style={styles.actionSection}>
                                    <View style={styles.actionButtonsRow}>
                                        <TouchableOpacity style={styles.typeButton}>
                                            <Text style={styles.typeButtonText}>Type</Text>
                                            <Image source={require("../../../assets/images/NewUI/pen.png")} style={styles.buttonIcon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.typeButton}>
                                            <Text style={styles.typeButtonText}>Speak</Text>
                                            <Image source={require("../../../assets/images/NewUI/pen.png")} style={styles.buttonIcon} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.controlButtonsRow}>
                                        <TouchableOpacity
                                            style={styles.eraseButton}
                                            onPress={() => handleErase(index)}
                                        >
                                            <Text style={styles.typeButtonText}>Erase</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.typeButton,
                                                !answers[index].trim() && styles.disabledButton
                                            ]}
                                            onPress={() => handleNext(index)}
                                            disabled={!answers[index].trim()}
                                        >
                                            <View style={styles.nextButtonView}>
                                                <Text style={styles.typeButtonText}>
                                                    {index === questions.length - 1 ? "Complete" : "Next"}
                                                </Text>
                                                <Image source={require("../../../assets/images/NewUI/chev_black.png")} style={styles.buttonIcon} resizeMode="cover" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    containerWrapper: {
        flex: 1,
        paddingTop: screenRatio >= 2 ? 60 : 30,
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: screenRatio >= 2 ? 40 : 20,
    },
    headerIcon: {
        width: 20,
        height: 20,
    },
    title: {
        fontSize: screenRatio >= 2 ? 28 : 26,
        fontFamily: "Alberts",
        color: "#333",
        marginRight: 8,
    },
    conversationContainer: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: screenRatio >= 2 ? 60 : 50,
    },
    questionAnswerPair: {
        marginBottom: screenRatio >= 2 ? 40 : 20,
    },
    questionBubble: {
        backgroundColor: "#66621C",
        padding: 20,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        marginBottom: 8,
        alignSelf: "flex-start",
        maxWidth: "80%",
    },
    questionText: {
        color: "white",
        fontSize: screenRatio >= 2 ? 18 : 16,
        fontFamily: "Judson",
        lineHeight: 22,
    },
    answerBubbleContainer: {
        alignSelf: "flex-end",
        maxWidth: "80%",
    },
    answerBubble: {
        backgroundColor: "#FFFEDD",
        borderRadius: 15,
        padding: 20,
        borderBottomRightRadius: 0,
        marginBottom: 12,
    },
    answerInput: {
        fontSize: screenRatio >= 2 ? 18 : 16,
        fontFamily: "Judson",
        color: "#000",
        minHeight: 80,
    },
    actionSection: {
        // alignItems: "center",
    },
    actionButtonsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        marginBottom: 8,
    },
    typeButton: {
        backgroundColor: "#FFDAB9",
        paddingVertical: 11,
        paddingHorizontal: 22,
        borderRadius: 100,
        flexDirection: "row",
    },
    typeButtonText: {
        color: "#597184",
        fontSize: screenRatio >= 2 ? 16 : 14,
        fontFamily: "Alberts",
    },
    eraseButton: {
        backgroundColor: "#FFDAB9",
        paddingVertical: 11,
        paddingHorizontal: 22,
        borderRadius: 100,
    },

    controlButtonsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
    },

    nextButton: {
        backgroundColor: "#FEA366",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    nextButtonView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonIcon: {
        width: 14,
        height: 14,
        marginLeft: 8,

    },
    disabledButton: {
        backgroundColor: "#CCC",
    },
    nextButtonText: {
        fontSize: 16,
        fontFamily: "Alberts",
    },
})