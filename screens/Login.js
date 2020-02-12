import React from 'react'
import { Statusbar, KeyboardAvoidingView, View, TextInput, StyleSheet, TouchableOpacity, Text, Button, Image } from 'react-native'
import Firebase from '../config/Firebase'

export default class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }
    handleLogin = () => {
        const { email, password } = this.state

        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Matches'))
            .catch(error => alert(error))
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formContainer}>
                    <Image source={require('../asset-img/vcl.png')} style={{width: 150, height: 120}} />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder='Email'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        autoCapitalize='none'
                        autoCorrect={false}
                        returnKeyType='next'
                        keyboardType="email-address"
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder='Password'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        secureTextEntry={true}
                        returnKeyType='go'
                        ref={(input) => this.passwordInput = input}
                    />
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Button
                        color="#fff"
                        fontSize="10"
                        title="Don't have an account yet? Sign up"
                        onPress={() => this.props.navigation.navigate('Signup')}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff7858',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff'
    },
    buttonContainer: {
        margin: 20,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        width: '85%',

    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff7858'
    },
    buttonSignup: {
        fontSize: 10,
        color: '#fff',
    },
    logo:{
        width: 150,
        height: 150,
    },
    logoContainer:{
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
    },
    formContainer:{        
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
});
