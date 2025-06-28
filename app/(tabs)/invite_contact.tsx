import React, { useEffect, useState } from 'react';
import {
    View, StyleSheet, Text, TouchableOpacity, SectionList, Alert,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import { LinearGradient } from 'expo-linear-gradient';

interface ContactItem {
    id: string;
    name: string;
}

interface SectionData {
    title: string;
    data: ContactItem[];
}

export default function InviteContactScreen() {
    const [contacts, setContacts] = useState<SectionData[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchContacts = async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Cannot access contacts without permission.');
                return;
            }

            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                const grouped: Record<string, ContactItem[]> = {};

                for (const contact of data) {
                    const name = contact.name || 'Unnamed';
                    const firstLetter = name[0].toUpperCase();

                    if (!grouped[firstLetter]) grouped[firstLetter] = [];

                    grouped[firstLetter].push({
                        id: contact.id as string,
                        name,
                    });
                }

                const sortedSections: SectionData[] = Object.keys(grouped)
                    .sort()
                    .map((letter) => ({
                        title: letter,
                        data: grouped[letter].sort((a, b) => a.name.localeCompare(b.name)),
                    }));

                setContacts(sortedSections);
            }
        };

        fetchContacts();
    }, []);

    const toggleSelect = (id: string) => {
        setSelectedContacts((prev) => {
            const updated = new Set(prev);
            if (updated.has(id)) updated.delete(id);
            else updated.add(id);
            return updated;
        });
    };

    const renderItem = ({ item }: { item: ContactItem }) => {
        const isSelected = selectedContacts.has(item.id);
        return (
            <TouchableOpacity
                onPress={() => toggleSelect(item.id)}
                style={[
                    styles.contactItem,
                    isSelected && styles.contactItemSelected,
                ]}
            >
                <Text style={styles.contactText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FFDCD1", "#ECEBD0"]} style={styles.gradient} />

            <View style={styles.contentWrapper}>
                <Text style={styles.title}>Invite family and friends</Text>
                <Text style={styles.subtitle}>Share your stories with your loved ones.</Text>

                <View style={styles.contactHeader}>
                    <Text style={styles.icon}>👥</Text>
                    <Text style={styles.contactTextLabel}>From your contacts</Text>
                </View>

                <SectionList
                    sections={contacts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{title}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.sectionList}
                />

                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continue →</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    contentWrapper: {
        zIndex: 2,
        flex: 1,
        paddingTop: 60,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: 'green',
        textAlign: 'center',
        marginBottom: 24,
    },
    contactHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        fontSize: 18,
        marginRight: 8,
    },
    contactTextLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    sectionList: {
        paddingBottom: 100,
    },
    sectionHeader: {
        paddingVertical: 6,
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
    },
    contactItem: {
        padding: 12,
        backgroundColor: '#FFEFEF',
        marginBottom: 6,
        borderRadius: 10,
    },
    contactItemSelected: {
        backgroundColor: '#B6EFB4',
    },
    contactText: {
        fontSize: 16,
    },
    continueButton: {
        position: 'absolute',
        bottom: 30,
        left: 24,
        right: 24,
        backgroundColor: '#333',
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
