import React, { cloneElement, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
// iconos
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function Carnet() {
    const [flipped, setFlipped] = useState(false);
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const frontInterpolate = rotateAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });
    const backInterpolate = rotateAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    });

    const frontAnimatedStyle = {
        transform: [
            { scale: scaleAnim },
            { perspective: 1000 },
            { rotateY: frontInterpolate },
        ],
    };
    const backAnimatedStyle = {
        transform: [
            { scale: scaleAnim },
            { perspective: 1000 },
            { rotateY: backInterpolate },
        ],
    };

    const flipCard = () => {
        const toValue = flipped ? 0 : 180;
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue,
                duration: 700,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => setFlipped(!flipped));
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardWrapper}>
                <Animated.View
                    style={[styles.card, frontAnimatedStyle, styles.face, { backfaceVisibility: 'hidden' }]}
                >
                    {!flipped && (
                        <>
                            <Image source={require('../assets/Andres.jpg')} style={styles.photo} />

                            <View style={styles.row}>
                                <Ionicons name="person-circle-outline" size={24} />
                                <Text style={styles.name}>Andres Felipe Urango Pacheco</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.info}>Matrícula: 04522343</Text>
                            </View>

                            <View style={styles.row}>
                                <MaterialCommunityIcons style={styles.school} name="school" size={20} />
                                <Text style={styles.info}> Análisis y desarrollo de software</Text>
                            </View>

                            <View style={styles.separator} />

                            <View>
                                <Image source={require('../assets/QR.png')} style={styles.qr} />
                            </View>
                        </>
                    )}
                </Animated.View>

                <Animated.View
                    style={[styles.card, backAnimatedStyle, styles.face, { backfaceVisibility: 'hidden' }]}
                >
                    {flipped && (
                        <>
                            <View style={styles.row}>
                                <Ionicons name="calendar-outline" size={20} />
                                <Text style={styles.validity}>Válido hasta: 27/02/2027</Text>
                            </View>

                            <View style={styles.row}>
                                <MaterialCommunityIcons name="alert-circle-outline" size={20} />
                                <Text style={styles.instructions}>Este carnet es personal e intransferible</Text>
                            </View>
                        </>
                    )}
                </Animated.View>
            </View>

            <TouchableOpacity onPress={flipCard} style={styles.button}>
                <Text style={styles.buttonText}>Girar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 12,
    },
    cardWrapper: {
        width: 300,
        height: 460,
        marginBottom: 16,
    },
    face: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,

    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    info: {
        fontSize: 14,
        textAlign: "center",
        color: '#555',
    },
    separator: {
        width: '80%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 12,
    },
    qr: {
        width: 120,
        height: 120,
        marginLeft: 8,
        marginTop: 12,
    },
    validity: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    instructions: {
        fontSize: 14,
        marginLeft: 8,
        color: '#555',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 16,
        zIndex: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});