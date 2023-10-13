import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { btn1, colors, navbtn, navbtnin, navbtnout } from '../globals/style'
import {AntDesign} from '@expo/vector-icons'
import {firebase , auth} from '../../firebase/FirebaseConfig';

const Placeorder = ({navigation,route}) => {

    const {cartdata} = route.params ;
    const [orderdata,setOrderdata] = useState([]);
    const [totalCost,setTotalCost] = useState('0');

    useEffect(() => {
        setOrderdata(JSON.parse(cartdata))
    },[cartdata])

    // price calculation

    useEffect(() => {
        if (cartdata != null)
        {
          const foodprice = JSON.parse(cartdata).cart ;
  
          let totalfoodprice = 0;
  
          // food price * quantity
          foodprice.map((item) => {
            totalfoodprice = (parseInt(item.data.food_price) * parseInt(item.Foodquantity)) + 
           ( parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity) ) +
           totalfoodprice 
          })
  
          // console.log(totalfoodprice)
          setTotalCost(JSON.stringify(totalfoodprice))
        }
      },[cartdata])

    //   user data

    const [userloggeduid, setUserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);

    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                // console.log(user);
                if (user) {
                    // navigation.navigate('home');
                    setUserloggeduid(user.uid);
                } else {
                    // No user is signed in.
                    console.log('no user');
                }
            });
        }
        checklogin();
    }, [])

    // console.log(userloggeduid);
    // console.log(userdata)

    const getuserdata = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUserdata(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }

    useEffect(() => {

        getuserdata();
    }, [userloggeduid]);

    // proceed payment

    const placenow = () => {
        const docRef = firebase.firestore().collection('Userorders').doc(new Date().getTime().toString());

        docRef.set({
            orderid: docRef.id,
            orderdata: orderdata.cart,
            orderstatus: 'pending',
            ordercost: totalCost,
            orderdate: firebase.firestore.FieldValue.serverTimestamp(),
            orderaddress: userdata.address,
            orderphone: userdata.phone,
            ordername: userdata.name,
            orderuserid: userloggeduid,
            orderpayment: 'online',
            paymentstatus: 'paid',
        }).then(() => {
            alert('Order placed')
        })
    }

  return (
    <ScrollView style={styles.containerout}>
        <TouchableOpacity onPress={() => navigation.navigate('home')} style={navbtnout}>
        <View style={navbtn}>
        <AntDesign name='back' size={24} color='black' style={navbtnin} />
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.head1}>Your Order Summary</Text>
        <FlatList style={styles.c1} data={orderdata.cart}
        renderItem={({item}) => {
            return (
             <View style={styles.rowout}>
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={styles.qty}>{item.Foodquantity}</Text>
                        <Text style={styles.title}>{item.data.food_name}</Text>
                        <Text style={styles.price1}>₹{item.data.food_price}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.totalprice}>₹{parseInt(item.Foodquantity) * parseInt(item.data.food_price) }</Text>
                    </View>
                </View>

                {item.Addonquantity > 0 &&
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={styles.qty}>{item.Addonquantity}</Text>
                        <Text style={styles.title}>{item.data.foodAdddon}</Text>
                        <Text style={styles.price1}>₹{item.data.foodAddonPrice}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.totalprice}>₹{parseInt(item.Addonquantity) * parseInt(item.data.foodAddonPrice) }</Text>
                    </View>
                </View>
                }


             </View>   
            )
        }}
        />
        
        <View style={styles.hr80}></View>

        <View style={styles.row}>
            <View style={styles.left}>
                <Text style={styles.title}>Order Total :</Text>
            </View>
            <View style={styles.left}>
                <View style={styles.left}>
                    <Text style={styles.totalprice}>₹{totalCost}</Text>
                </View>
            </View>
        </View>

        <View style={styles.hr80}></View>

        <View style={styles.userdataout}>
            <Text style={styles.head1}>Your Details</Text>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={styles.title}>Name :</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.title}>{userdata?.name}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={styles.title}>Email :</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.title}>{userdata?.email}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={styles.title}>Phone :</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.title}>{userdata?.phone}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={styles.title}>Address :</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.title}>{userdata?.address}</Text>
                </View>
            </View>
        </View>

        <View style={styles.hr80}></View>
        <View>
            <TouchableOpacity style={btn1}>
                <Text style={styles.btntxt} onPress={() => placenow()}>Proceed to Payment</Text>
            </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )
}

export default Placeorder

const styles = StyleSheet.create({

    hr80: {
        borderColor: 'red',
        borderWidth: 0.2,
        width: '90%',
        margin: 10
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },

    head1: {
        marginTop: 50,
        fontSize: 30,
        fontWeight: '200',
        color: colors.text1,
        marginVertical: 10,
        textAlign: 'center',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    
    rowout: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
    },

    qty: {
        width: 40,
        height: 30,
        backgroundColor: colors.text1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: colors.col1,
        fontSize: 17,
        fontWeight: 'bold',
    },

    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
    },

    price1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color: colors.text1,
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    totalprice: {
        fontSize: 17,
        fontWeight: 'bold',
        borderColor: colors.text1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },

    btntxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.col1,
        margin: 10,
    }
})