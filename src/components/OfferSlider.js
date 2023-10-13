import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react';
import Swiper from 'react-native-swiper';
import {colors} from '../globals/style';

const OfferSlider = () => {
  return (
    <View>
      <View style={styles.offerslider}>
      <Swiper autoplay={true} autoplayTimeout={5} showsButtons={true}
                    dotColor={colors.text2} activeDotColor={colors.text1}
                    nextButton={<Text style={styles.buttonText}>›</Text>}
                    prevButton={<Text style={styles.buttonText}>‹</Text>}
                >
          <View style={styles.slide}>
            <Image source={require('../../assets/78dbf8d6e686589677a321b399ef51c2.png')} style={styles.image}/>
          </View>
          <View style={styles.slide}>
            <Image source={require('../../assets/7dfe3285c55e406b295018bf683771cd.jpg')} style={styles.image}/>
          </View>
          <View style={styles.slide}>
            <Image source={require('../../assets/78dbf8d6e686589677a321b399ef51c2.png')} style={styles.image}/>
          </View>
          <View style={styles.slide}>
            <Image source={require('../../assets/7dfe3285c55e406b295018bf683771cd.jpg')} style={styles.image}/>
          </View>
        </Swiper>
      </View>
    </View>
  )
}

export default OfferSlider

const styles = StyleSheet.create({
  offerslider: {
    width: '100%',
    height: 200,
    backgroundColor: colors.col1,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 30,
  },

  slide: {
    width: '100%',
    height: 200,
    backgroundColor: colors.text1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    resizeMode: 'contain'
  },

  buttonText: {
    color: colors.text1,
    fontSize: 40,
    fontWeight: '500',
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
}

})