import { FlatList, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import {firebase , auth} from '../../firebase/FirebaseConfig';
import { btn2, colors, navbtn, navbtnin, navbtnout } from '../globals/style';
import {AntDesign} from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const UserCart = ({navigation}) => {
    const [cartdata,setCartdata] = useState(null);
    const [totalCost,setTotalCost] = useState('0');

    const getCartdata = async() => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);

        docRef.get().then((doc) => {
            if (doc.exists)
            {
              const data = JSON.stringify(doc.data());
              setCartdata(data);
            }

            else {
                console.log('No such document')
            }
        }).catch((error) => {
            console.log('Error getting document : ',error)
        })
    }

    useEffect(() => {
      getCartdata();
    },[]);

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

// console.log(cartdata)
const deleteitem = (item) => {
  const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);

  docRef.update({
    cart: firebase.firestore.FieldValue.arrayRemove(item)
  })
  getCartdata();
}

  return (
    <View style={styles.containerout}>
      <TouchableOpacity onPress={() => navigation.navigate('home')} style={navbtnout}>
        <View style={navbtn}>
        <AntDesign name='back' size={24} color='black' style={navbtnin} />
        </View>
      </TouchableOpacity>

      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <View styles={styles.container}>
        <Text style={styles.head1}>
          Your Cart
        </Text>
        {/* <View style={styles.cartout}> */}
        {cartdata == null || JSON.parse(cartdata).cart.length == 0 ? 
        <Text style={styles.head2}>Your Cart is Empty</Text>
        :
        <FlatList style={styles.cardlist} data={JSON.parse(cartdata).cart} 
        renderItem={
          ({item}) => {
            return(
              <View style={styles.cartcard}>
                <Image source={{
                  uri: item.data.food_image_url,
                }} style={styles.cartimg} />

                <View style={styles.cartcardin}>
                  <View style={styles.c1}>

                    <Text style={styles.txt1}>{item.Foodquantity}&nbsp;{item.data.food_name} </Text>

                    <Text style={styles.txt2}>₹{item.data.food_price} /each</Text>

                  </View>
                  {item.Addonquantity > 0 &&
                  <View style={styles.c2}>

                    <Text style={styles.txt3}>{item.Addonquantity}&nbsp;{item.data.foodAdddon}</Text>

                    <Text style={styles.txt3}>₹{item.data.foodAddonPrice}/each</Text>

                  </View>
                  }
                  <TouchableOpacity style={styles.c4}
                  onPress={() => deleteitem(item)}
                  >
                    <Text style={styles.txt1}>Delete</Text>
                    <AntDesign name='delete' size={24} color='black' style={styles.del} />

                  </TouchableOpacity>
                </View>

              </View>
            )
          }
        }
        />
        }
        {/* </View> */}

        <View style={styles.btncont}>

          <View style={styles.c3}>
            <Text style={styles.txt5}>Total</Text>
            <Text style={styles.txt6}>₹{totalCost}</Text>
          </View>

          <TouchableOpacity style={btn2}>
            <Text style={styles.btntxt} onPress={() => navigation.navigate('placeorder',{cartdata})} >Place Order</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default UserCart

const styles = StyleSheet.create({
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 20,
  },

  containerout: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: '100%',
    // alignItems: 'center',
  },

  head1: {
    fontSize: 40,
    textAlign: 'center',
    color: colors.text1,
  },

  head2: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '200',
    marginVertical: 20,
    elevation: 10,
    backgroundColor: colors.col1,
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    paddingVertical: '25%',
    borderRadius: 10,
  },

  cardlist: {
    width: '100%'
  },

  cartcard: {
    flexDirection: 'row',
    backgroundColor: colors.col1,
    marginVertical: 5,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    elevation: 10,
    alignItems: 'center'
  },

  cartimg: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },

  cartcardin: {
    flexDirection: 'column',
    margin: 5,
    width: '58%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  c1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.col1,
  },

  c2: {
    backgroundColor: colors.text1,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    flexDirection: 'row',
  },

  txt1: {
    fontSize: 16,
    color: colors.text1,
    width: '60%',
    fontWeight: 'bold',
  },

  txt2: {
    fontSize: 16,
    color: colors.text3,
    fontWeight: 'bold',
  },

  txt3: {
    fontSize: 15,
    color: colors.col1,
  },

  del: {
    color: colors.text1,
  },

  c4: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 10,
    borderColor: colors.text1,
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
  },

  btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        borderTopColor: colors.text3,
        borderTopWidth: 0.2,
  },

  btntxt: {
    backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',
  },

  c3: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  txt5: {
    fontSize: 20,
    color: colors.text3,
    marginHorizontal: 5,
  },

  txt6: {
    fontSize: 25,
    color: colors.text3,
    marginHorizontal: 5,
    fontWeight: 'bold',
  }


})