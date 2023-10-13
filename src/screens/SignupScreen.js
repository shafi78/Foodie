import React, { useState } from "react";
import {  StyleSheet,  View,  Text,  TextInput,  TouchableOpacity , StatusBar} from "react-native";
import {colors, titles, btn1, hr80} from "../globals/style";
import {AntDesign,Entypo,MaterialCommunityIcons,Octicons,} from "@expo/vector-icons";

import {firebase , auth} from "../../firebase/FirebaseConfig";

const SignupScreen = ({ navigation }) => {
  const [nameFocus, setNameFocus] = useState(false);
  const [emailfocus, setEmailfocus] = useState(false);
  const [phonefocus, setphonefocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [cpasswordfocus, setcpasswordfocus] = useState(false);
  const [showcpassword, setshowcpassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [customError, setCustomError] = useState("");
  const [successmsg, setSuccessmsg] = useState(null);

  const handleSignup = () => {
    

    if (password != cpassword) {
      // alert("Password doesn't match");
      setCustomError("Password doesn't match");
      return;
    } else if (phone.length != 10) {
      setCustomError("Phone number should be 10 digit");
      return;
    }

    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          // console.log(userCredentials?.user.uid);
          console.log("User created");
          
          if (userCredentials?.user.uid)
          {
            const userRef = firebase.firestore().collection("UserData");
          
          userRef.add({
            email: email,
            password: password,
            // cpassword: cpassword,
            phone: phone,
            name: name,
            address: address,
            uid: userCredentials?.user.uid,
          }).then(() => {
            console.log("Data added to firestore")
            setSuccessmsg("User created Successfully");
          })

          .catch((error) => {
            console.log("Firestore error ",error)
          })
          }

        })
        .catch((error) => {
          console.log("Sign up firebase Error ", error.message);

          if (error.message == ' Firebase: The email address is already in use by another account. (auth/email-already-in-use).')
      {
        setCustomError("Email already exists");
      }

      else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).')
      {
        setCustomError("Invalid Email");
      }

      else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).')
      {
        setCustomError("Password should be at least 6 characters")
      }

      else {
        setCustomError(error.message)
      }
        });
    } catch (error) {
      alert(error.message);
      
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar/>
      {successmsg == null ? 
    <View style={styles.container}>
    <Text style={styles.head1}>Sign Up</Text>
    {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}

    {/* name */}
    <View style={styles.inputout}>
      <AntDesign
        name="user"
        size={24}
        color={nameFocus === true ? colors.text1 : colors.text2}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onFocus={() => {
          setNameFocus(true);
          setEmailfocus(false);
          setphonefocus(false);
          setPasswordfocus(false);
          setcpasswordfocus(false);
          setCustomError('');
        }}
        onChangeText={(text) => setName(text)}
      />
    </View>

    {/* email */}

    <View style={styles.inputout}>
      <Entypo
        name="email"
        size={24}
        color={emailfocus === true ? colors.text1 : colors.text2}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onFocus={() => {
          setNameFocus(false);
          setEmailfocus(true);
          setphonefocus(false);
          setPasswordfocus(false);
          setcpasswordfocus(false);
          setCustomError('');
        }}
        onChangeText={(text) => setEmail(text)}
      />
    </View>

    {/* phone number */}

    <View style={styles.inputout}>
      <AntDesign
        name="mobile1"
        size={24}
        color={phonefocus === true ? colors.text1 : colors.text2}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onFocus={() => {
          setNameFocus(false);
          setEmailfocus(false);
          setphonefocus(true);
          setPasswordfocus(false);
          setcpasswordfocus(false);
          setCustomError('');
        }}
        onChangeText={(text) => setPhone(text)}
      />
    </View>

    {/* password start */}

    {/* password */}

    <View style={styles.inputout}>
      <MaterialCommunityIcons
        name="lock-outline"
        size={24}
        color={passwordfocus == true ? colors.text1 : colors.text2}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onFocus={() => {
          setNameFocus(false);
          setEmailfocus(false);
          setphonefocus(false);
          setPasswordfocus(true);
          setcpasswordfocus(false);
          setCustomError('');
        }}
        secureTextEntry={showpassword === false ? true : false}
        onChangeText={(text) => setPassword(text)}
      />

      <Octicons
        name={showpassword == false ? "eye-closed" : "eye"}
        size={24}
        color="black"
        onPress={() => setshowpassword(!showpassword)}
      />
    </View>

    {/* confirm password */}

    <View style={styles.inputout}>
      <MaterialCommunityIcons
        name="lock-outline"
        size={24}
        color={cpasswordfocus == true ? colors.text1 : colors.text2}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onFocus={() => {
          setNameFocus(false);
          setEmailfocus(false);
          setphonefocus(false);
          setPasswordfocus(false);
          setcpasswordfocus(true);
          setCustomError('');
        }}
        secureTextEntry={showcpassword === false ? true : false}
        onChangeText={(text) => setcPassword(text)}
      />

      <Octicons
        name={showcpassword == false ? "eye-closed" : "eye"}
        size={24}
        color="black"
        onPress={() => setshowcpassword(!showcpassword)}
      />
    </View>

    {/* password end */}

    <Text style={styles.address}>Please enter your address</Text>
    <View style={styles.inputout}>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        onChangeText={(text) => setAddress(text)}
        onPress={() => {
          setNameFocus(false);
          setEmailfocus(false);
          setphonefocus(false);
          setPasswordfocus(false);
          setcpasswordfocus(false);
          setCustomError('');
        }}
      />
    </View>

    <TouchableOpacity style={btn1} onPress={() => handleSignup()}>
      <Text
        style={{
          color: colors.col1,
          fontSize: titles.btntxt,
          fontWeight: "bold",
        }}
      >
        Sign up
      </Text>
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
    <Text>
      Already have an account ?
      <Text
        style={styles.signup}
        onPress={() => navigation.navigate("login")}
      >
        {" "}
        Sign In{" "}
      </Text>
    </Text>
  </View>
    :  
    <View style={styles.container1}>
      <Text style={styles.successmsg}>{successmsg}</Text>
      <TouchableOpacity style={btn1} onPress={() => navigation.navigate('login')}>
      <Text
        style={{
          color: colors.col1,
          fontSize: titles.btntxt,
          fontWeight: "bold",
        }}
      >
        Sign In
      </Text>
    </TouchableOpacity>

    <TouchableOpacity style={btn1} onPress={() => setSuccessmsg(null)}>
      <Text
        style={{
          color: colors.col1,
          fontSize: titles.btntxt,
          fontWeight: "bold",
        }}
      >
        Go Back
      </Text>
    </TouchableOpacity>

    </View>
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  container1: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },

  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 10,
  },

  inputout: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignSelf: "center",
    elevation: 20,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    width: "80%",
  },

  forgot: {
    color: colors.text2,
    marginTop: 20,
    marginBottom: 10,
  },

  or: {
    color: colors.text1,
    marginVertical: 10,
    fontWeight: "bold",
  },

  gftxt: {
    color: colors.text2,
    marginBottom: 10,
    fontSize: 20,
  },

  gf: {
    flexDirection: "row",
  },

  gficon: {
    backgroundColor: "white",
    width: 50,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 20,
    marginBottom: -10,
  },

  signup: {
    color: colors.text1,
  },

  address: {
    fontSize: 18,
    color: colors.text2,
    textAlign: "center",
    marginTop: 20,
  },

  errormsg: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },

  successmsg: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  }
});

export default SignupScreen;
