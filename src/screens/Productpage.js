import { ScrollView, StyleSheet, Text, View , TouchableOpacity, Image, TextInput} from 'react-native'
import React, { useState } from 'react'
import {AntDesign} from '@expo/vector-icons'
import { navbtn,navbtnin,navbtnout,colors,veg,nonveg,btn2,incdecbtn,incdecinput, incdecout } from '../globals/style';
import {firebase , auth} from '../../firebase/FirebaseConfig';

const Productpage = ({navigation,route}) => {
    const data = route.params ;
    // console.log(data)

    if (route.params === undefined)
    {
        navigation.navigate('home')
    }

    const [quantity,setQuantity] = useState('1');
    const [addonquantity,setAddonquantity] = useState('0');


    const addtocart = () => {
        // console.log('add to cart')

        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid)

        const data1 = {data,Addonquantity : addonquantity,Foodquantity: quantity}

        // console.log('data 1',data1)

        docRef.get().then((doc) => {
            if (doc.exists){
                docRef.update({
                    cart: firebase.firestore.FieldValue.arrayUnion(data1)
                })
                alert('Added to Cart')
            }

            else {
                docRef.set(
                    {
                        cart : [data1],
                    })
                    alert('Added to Cart')
            }
        })

    }

    const increaseQuantity = () => {
        setQuantity((parseInt(quantity)+1).toString())
    }
   
    const decreaseQuantity = () => {
        if (parseInt(quantity)>1)
        {
            setQuantity((parseInt(quantity)-1).toString())
        }
    }
    
    const increaseAddonQuantity = () => {
        setAddonquantity((parseInt(addonquantity)+1).toString())
    }
   
    const decreaseAddonQuantity = () => {
        if (parseInt(addonquantity)>0)
        {
            setAddonquantity((parseInt(addonquantity)-1).toString())
        }
    }

    const cartdata = JSON.stringify({ cart: [{ Addonquantity: addonquantity, Foodquantity: quantity, data }] });
    // console.log()

    // console.log(data.foodAddonPrice)

  return (
    <ScrollView style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate('home')} style={navbtnout}>
        <View style={navbtn}>
        <AntDesign name='back' size={24} color='black' style={navbtnin} />
        </View>
      </TouchableOpacity>

      <View style={styles.container1}>
        <View style={styles.s1}>
            <Image 
            source={{
                uri: data.food_image_url,
            }} style={styles.cardimgin}
            />
        </View>

        <View style={styles.s2}>
        <View style={styles.s2in}>
            <Text style={styles.head1}>{data.food_name}</Text>
            <Text style={styles.head2}>₹ {data.food_price}/-</Text>
        </View>

      <View style={styles.s3}>
        <Text style={styles.head3}>About Food</Text>
        <Text style={styles.head4}>{data.food_description}</Text>
        <View style={styles.s3in}>
            {data.foodType == 'veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
            <Text style={styles.head5}>{data.foodType}</Text>
        </View>
      </View>

      <View style={styles.container2}>
        <Text style={styles.txt1}>Location</Text>
        <Text style={styles.txt2}>{data.restaurant_name}</Text>
        <View style={styles.container2in}>
            <Text style={styles.txt3}>{data.restaurantAddressBuilding}</Text>
            <View style={styles.dash}></View>
            <Text style={styles.txt3}>{data.restaurantAddressStreet}</Text>
            <View style={styles.dash}></View>
            <Text style={styles.txt3}>{data.restaurantAddressCity}</Text>
        </View>
      </View>

      {data.foodAddonPrice != "" && 
      <View style={styles.container3}>
        <View style={styles.hr80}></View>
        <Text style={styles.txt5}>Add Extra</Text>
        <View style={styles.c3in}>
            <Text style={styles.text4}>{data.foodAdddon}</Text>
            <Text style={styles.text4}>₹ {data.foodAddonPrice} /-</Text>
        </View>
        <View style={incdecout}>
            <Text style={incdecbtn} onPress={() => decreaseAddonQuantity()}>-</Text>
            <TextInput value={addonquantity} style={incdecinput} />
            <Text style={incdecbtn} onPress={() => increaseAddonQuantity()}>+</Text>
        </View>
      </View>
      }

      <View style={styles.container3}>
        <View style={styles.hr80}></View>
        <Text style={styles.txt5}>Food Quantity</Text>
        <View style={incdecout}>
            <Text style={incdecbtn} onPress={() => decreaseQuantity()}>-</Text>
            <TextInput value={quantity} style={incdecinput} />
            <Text style={incdecbtn} onPress={() => increaseQuantity()}>+</Text>
        </View>
        <View style={styles.hr80}></View>
      </View>

      

    <View style={styles.container4}>
        <View style={styles.c4in}>
            <Text style={styles.txt2}>Total Price</Text>
            {data.foodAddonPrice != "" ? <Text style={styles.txt6}>₹{((
                parseInt(data.food_price) * parseInt(quantity)
            )
            + parseInt(addonquantity) * parseInt(data.foodAddonPrice)
            ).toString()}
            </Text> 
            : 
            <Text style={styles.txt6}>₹{(
                parseInt(data.food_price) * parseInt(quantity)
            ).toString()}/-</Text>}
        </View>
        <View style={styles.hr80}></View>
    </View>

    </View>
   

      <View style={styles.btncont}>
        <TouchableOpacity style={btn2} onPress={() => addtocart()}>
            <Text style={styles.btnTxt}>Add to Cart</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={btn2}>
            <Text style={styles.btnTxt} onPress={() => navigation.navigate('placeorder',{cartdata})}>Buy Now</Text>
        </TouchableOpacity>

      </View>

      
      </View>

      

     

    </ScrollView>
  )
}

export default Productpage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
    },

    container1: {
        flex: 1,
        backgroundColor: '#fff',
    },

    s1: {
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardimgin: {
        width: '100%',
        height: '100%',
    },

    s2: {
        width: '100%',
        padding: 20,
    },

    s2: {
        width: '100%',
        padding: 20,
    },

    s2in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    head1: {
        fontSize: 30,
        fontWeight: '500',
        color: colors.text1,
        width: 200,
        marginRight: 10,
    },

    head2: {
        fontSize: 50,
        fontWeight: '200',
        color: colors.text3,
    },

    s3: {
        backgroundColor: colors.text1,
        padding: 20,
        borderRadius: 20,
    },

    head3: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.col1,
    },

    head4: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '400',
        color: colors.col1,
    },

    s3in: {
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
        width: 130,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    head5: {
        color: colors.text3,
        fontSize: 20,
        fontWeight: '200',
        marginLeft: 10,
    },

    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
    },

    btnTxt: {
        backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',
    },

    container2: {
        width: '90%',
        backgroundColor: colors.col1,
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 10,
        elevation: 10,
    },

    txt1: {
        color: colors.text1,
        fontSize: 20,
        fontWeight: '300',
    },

    txt2: {
        color: colors.text3,
        fontSize: 30,
        fontWeight: '300',
        marginVertical: 10,
        textTransform: 'capitalize'
    },

    container2in: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    txt3: {
        color: colors.text1,
        fontSize: 16,
        width: '30%',
        textAlign: 'center',
    },

    dash: {
        width: 1,
        height: 20,
        backgroundColor: colors.text1,
        marginHorizontal: 10,
    },

    hr80: {
        borderWidth: 0.9,
        margin: 10,
        width: '100%',
        borderColor: 'lightblue',
        elevation: 2
    },

    container3: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },

    txt5: {
        color: colors.text1,
        fontSize: 16,
        // width: '30%',
        textAlign: 'center',
    },

    c3in: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },

    text4: {
        color: colors.text3,
        fontSize: 20,
        marginHorizontal: 10,
    },

    container4: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },

    c4in: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center',
    },

    txt6: {
        color: colors.text1,
        fontSize: 35,
        textAlign: 'center',
    }
    
})