import React from 'react'
import { KeyboardAvoidingView, View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import Firebase from '../config/Firebase'

export default class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        username: '',
    }
    
    handleSignUp = () => {
        const { email, password, username } = this.state
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('Matches')
                var user = Firebase.auth().currentUser;
                user.username = this.state.username;
                
                Firebase
                      .database()
                      .ref('/users/' + user.uid)
                      .set({
                        email: user.email,
                        created_at: Date.now(),
                        name: user.username,
                        team1: '0',
                        team2: '0',
                        team3: '0',
                        team4: '0',
                        team5: '0',
                        team6: '0',
                        total1: '0',
                        total2: '0',
                        total3: '0',
                        total4: '0',
                        total5: '0',
                        total6: '0',
                        totalfinal: '0'
                      })
                      .then(function(snapshot) {
                         console.log('Snapshot', snapshot);
                      });
                  
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                    placeholder='Full Name'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    returnKeyType='next'
                    ref={(input) => this.usernameInput = input}
                    onSubmitEditing={() => this.emailInput.focus()}
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    autoCapitalize='none'
                    autoCorrect={false}
                    returnKeyType='next'
                    keyboardType="email-address"
                    ref={(input) => this.emailInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    ref={(input) => this.passwordInput = input}
                    returnKeyType='go'
                />
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
                <Button
                        color="#fff"
                        fontSize="10"
                        title="Go Back" 
                        onPress={() => this.props.navigation.navigate('Login')}        
                />
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
    button: {
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
        fontSize: 12
    }
})
