import React, { useState } from 'react';
import { StyleSheet,View,Text, TextInput, Touchable, TouchableOpacity } from 'react-native';
import {colors , titles , btn1 ,hr80} from '../globals/style';
import { AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

import {firebase , auth} from '../../firebase/FirebaseConfig';

const LoginScreen = ({navigation}) => {

    const [emailfocus,setEmailfocus] = useState(false);
    const [passwordfocus,setPasswordfocus] = useState(false);
    const [showpassword,setshowpassword] = useState(false); 

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [customError, setCustomError] = useState('');

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("Logged in successfully")
            // console.log(user);
            navigation.navigate('welcomepage')
        })
        .catch((error) => {
            var errorMessage = error.message;
            // console.log(errorMessage);

            if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email).')
            {
                setCustomError("Please enter a valid email address")
            }

            else {
                setCustomError("Incorrect email or password")
            }
        })
    }


  return (
    <View style={styles.container}>
         <Text style={styles.head1}>Sing In</Text>
         {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
         <View style={styles.inputout}>
            <AntDesign name='user' size={24} color={emailfocus === true ? colors.text1 : colors.text2}/>
            <TextInput style={styles.input} placeholder='Email'
            onFocus={() => {
                setEmailfocus(true);
                setPasswordfocus(false);
                setshowpassword(false);
                setCustomError('');
            }}

            onChangeText={(text) => {
                setEmail(text)
            }}
            />
         </View>
         <View style={styles.inputout}>
            <MaterialCommunityIcons name='lock-outline' size={24} color={passwordfocus == true ? colors.text1 : colors.text2} />

            <TextInput style={styles.input} placeholder='Password'
             onFocus={() => {
                setEmailfocus(false);
                setPasswordfocus(true);
                setCustomError('');
            }}

            onChangeText={(text) => {
                setPassword(text)
            }}

            secureTextEntry={showpassword === false ? true : false}
            />

            <Octicons name={showpassword == false ? "eye-closed" : "eye"} size={24} color="black" onPress={() => setshowpassword(!showpassword)} />
         </View>

         <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
            <Text style={{color: colors.col1, fontSize: titles.btntxt , fontWeight: "bold" }}>Sign In</Text>
         </TouchableOpacity>

         <Text style={styles.forgot}>Forgot Password ?</Text>
         <Text style={styles.or}>OR</Text>
         <Text style={styles.gftxt}>Sign In with </Text>

         <View style={styles.gf}>
            <TouchableOpacity>
                <View style={styles.gficon}>
                <AntDesign name="google" size={24} color="#EA4335" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.gficon}>
                <AntDesign name="facebook-square" size={24} color="blue" />    
                </View>
                </TouchableOpacity>
         </View>
         <View style={hr80}></View>
         <Text >Don't have an account ?
            <Text style={styles.signup} onPress={() => navigation.navigate('signup')}> Sign Up </Text>
         </Text>
    </View>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: '20%'
    },

    head1: {
        fontSize: titles.title1,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 10,
    },

    inputout: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignSelf: 'center',
        elevation: 20,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: '80%'
    },

    forgot: {
        color: colors.text2,
        marginTop: 20,
        marginBottom: 10,
    },

    or: {
        color: colors.text1,
        marginVertical: 10,
        fontWeight: 'bold',
    },

    gftxt: {
        color: colors.text2,
        marginVertical: 10,
        fontSize: 25,
    },

    gf: {
        flexDirection: 'row',
    },
    
    gficon: {
        backgroundColor: 'white',
        width: 50,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 20
    },

    signup: {
        color: colors.text1,
    }
})

export default LoginScreen