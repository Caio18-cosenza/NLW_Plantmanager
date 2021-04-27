import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert, SafeAreaView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Button } from '../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';


import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>('');
  const navigation = useNavigation();


  async function handleSubmit(){

    if(!name)
    return Alert.alert('Me diz como chamar você 😥');

    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
    navigation.navigate('UserPhotoIdentification');

    }catch{
      Alert.alert('Não foi possivel salvar o seu nome! 😥')
    } 
    
  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!name)
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputChange(value: string){
    setIsFilled(!!value);
    setName(value);
  }


    return(
        <SafeAreaView style={styles.container}>

          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.content}>
                 <View style={styles.form}>
                   <View style={styles.header}>
                    <Text style={styles.emoji}> { isFilled ? '😃' : '😄' } </Text>
                    <Text style={styles.title}> Como podemos {'\n'} chamar você? </Text>

                    </View>

                    <TextInput style={[styles.input, (isFocused || isFilled) && {borderColor: colors.green}]} placeholder='Digite um nome' onChangeText={handleInputChange} onBlur={handleInputBlur} onFocus={handleInputFocus} />

                    <View style={styles.footer}>

                    <Button title='Confirmar' onPress={handleSubmit} />

                    </View>

                 </View>
            </View>

            </TouchableWithoutFeedback>

          </KeyboardAvoidingView>
          
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       width: '100%',
       alignItems: 'center',
       justifyContent: 'space-around'
    },
    content: {
      flex: 1,
      width: '100%'
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 54,
      alignItems: 'center'
    },
    emoji: {
      fontSize: 24
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      color: colors.heading,
      fontFamily: fonts.heading,
      lineHeight: 34,
      marginTop: 10
    },
    footer: {
      marginTop: 40,
      width: '100%',
      paddingHorizontal: 20
    },
    header: {
      alignItems: 'center'
    }
})