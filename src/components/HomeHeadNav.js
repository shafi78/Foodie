import React from 'react'
import { StyleSheet , View , Text, TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons ,EvilIcons } from '@expo/vector-icons';
import { colors } from '../globals/style';

const HomeHeadNav = ({navigation}) => {
  return (
    <View style={styles.container}>
        <FontAwesome name="navicon" size={20} color="black" style={StyleSheet.myicon} />
        <View style={styles.containerin}>
            <Text style={styles.mytext}>Foodie</Text>
            <Ionicons name="fast-food-outline" size={24} color="black"  style={styles.myicon} />        
        </View>

        <TouchableOpacity onPress={() => {navigation.navigate('userprofile')}}>
        <EvilIcons name="user" size={34} color="black" style={styles.myicon} />
        </TouchableOpacity>
        
    </View>
  )
}

export default HomeHeadNav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        backgroundColor: colors.col1,
        elivation: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    containerin: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    myicon: {
        color: colors.text1,
        paddingTop: 3
    },

    mytext: {
        fontSize: 25,
        marginTop: 3,
        color: colors.text1,
        paddingRight: 10
    }
})