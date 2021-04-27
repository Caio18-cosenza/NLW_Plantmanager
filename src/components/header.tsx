import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import colors from '../styles/colors';

import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header(){
  const [userName, setUserName] = useState<string>();
  const [userPhoto, setUserPhoto] = useState<string>();

     useEffect(() => {
      async function loadingStorageUserName() {
        const user = await AsyncStorage.getItem('@plantmanager:user');
        setUserName(user || '');
      } 

      loadingStorageUserName();

     },[])

     useEffect(() => {
      async function loadingStorageUserPhoto() {
        const profile = await AsyncStorage.getItem('@plantmanager:profile');
        setUserPhoto(profile || '');
      } 

      loadingStorageUserPhoto();

     },[])

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}> Olá, </Text>
                <Text style={styles.userName}> {userName} </Text>
            </View>

            <Image source={{ uri: userPhoto }} style={styles.image} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    greeting: {
      fontSize: 32,
      color: colors.heading,
      fontFamily: fonts.text
    },
    userName: {
      fontSize: 32,
      fontFamily: fonts.heading,
      color: colors.heading,
      lineHeight: 40
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 40
    }
})