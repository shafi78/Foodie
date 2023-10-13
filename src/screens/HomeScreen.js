import React, { useEffect, useState } from 'react'
import { StyleSheet , View , Text , StatusBar , TextInput , ScrollView, FlatList} from 'react-native'
import HomeHeadNav from '../components/HomeHeadNav';
import Categories from '../components/Categories';
import OfferSlider from '../components/OfferSlider';
import { AntDesign } from '@expo/vector-icons';
import style, { colors } from '../globals/style';
import {firebase} from '../../firebase/FirebaseConfig';
import Cardslider from '../components/Cardslider';
import BottomNav from '../components/BottomNav';

const HomeScreen = ({navigation}) => {
  
  const [foodData,setfoodData] = useState([]);
  const [VegData,setVegData] = useState([]);
  const [NonVegData,setNonVegData] = useState([]);

  const foodRef = firebase.firestore().collection('FoodData');

  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setfoodData(snapshot.docs.map(doc => doc.data()))
    })
  },[])

  useEffect(() => {
    setVegData(foodData.filter((item) => item.foodType == 'veg'))
    setNonVegData(foodData.filter((item) => item.foodType == 'non-veg'))
}, [foodData])

  const [search,setSearch] = useState('');

  return (
    <View style={styles.container}>
        <StatusBar />
        <HomeHeadNav navigation={navigation} />
        <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
        </View>
        <ScrollView>
        <View style={styles.searchbox}>
        <AntDesign name="search1" size={24} color="black" style={styles.searchicon} />
          <TextInput placeholder='Search' style={styles.input} 
          onChangeText={(text) => {
            setSearch(text)
          }}
          /> 
        </View>
        {search != '' &&  <View style={styles.searchresultouter}>
          <FlatList style={styles.searchresultinner} 
          data={foodData}
          renderItem={({item}) => {
            if (item.food_name.toLowerCase().includes(search)){
              return (
                <View style={styles.searchresult}>
                  <AntDesign name='arrowright' size={24} color='black' />
                  <Text style={styles.searchresulttext}>{item.food_name}</Text>
                </View>
              )
            }
          }}
          />
          </View>}
        <Categories/>
        <OfferSlider/>
        <Cardslider title={"Today's special"} data={foodData} navigation={navigation} />
        <Cardslider title={"Non Veg Love"} data={NonVegData} navigation={navigation} />
        <Cardslider title={"Veg Hunger"} data={VegData} navigation={navigation} />
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    // alignItems: 'center',
    width: '100%',
  },

  searchbox: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: 'center',
    padding: 10,
    margin: 20,
    elevation: 10
  },

  input: {
    marginLeft: 10,
    width: '90%',
    fontSize: 18,
    color: colors.text1,
  },

  searchicon: {
    color: colors.text1,
  },

  searchresultouter: {
    width: '100%',
    marginHorizontal: 30,
    backgroundColor: colors.col1
  },

  searchresultinner: {
    width: '100%',
  },

  searchresult: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
  },

  bottomnav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 20,
  }
})

export default HomeScreen
