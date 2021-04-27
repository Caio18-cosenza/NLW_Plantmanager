import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserPhotoIdentification(){
    const navigation = useNavigation();
    const [photo, setPhoto] = useState<string>();


    const savePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        if (!result.cancelled) {
          if(result.type !== 'video')
          setPhoto(result.uri)
    
          else{
            Alert.alert('⚠ Formato Inválido', 'Você precisa escolher uma imagem');
          }
        }else {
          Alert.alert('Opsss!!!', 'Não foi possível salvar sua foto');
        }
      };

    async function handleSubmit(){
    
        if(!photo)
        return Alert.alert('Escolha uma foto de perfil 📸');
    
        try {
          await AsyncStorage.setItem('@plantmanager:profile', photo);
        navigation.navigate('Confirmation', {
          title: 'Prontinho',
          subtitle: 'Agora vamos cuidar das suas plantinhas com muito cuidado',
          buttonTitle: 'Começar',
          icon: 'smile',
          nextScreen: 'PlantSelect'
        });
    
        }catch{
          Alert.alert('Não foi possivel salvar sua foto! 😥')
        }
        
      }

      useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            if(photo !== ''){
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Não permitido', 'Não foi permitido usar suas imagens no aplicativo');
              }
            }
            
          }
        })();
      }, []);


    return(
        <SafeAreaView style={styles.container}>

          <View style={styles.content}>
               <View style={styles.form}>
                 <View style={styles.header}>
                  <Text style={styles.title}> Escolha sua {'\n'} foto de perfil </Text>

                  </View>

                  <TouchableOpacity onPress={savePhoto} style={styles.buttonImage}>
                    <Image source={{ uri: photo }} style={styles.image} />
                  </TouchableOpacity>
                  <View style={styles.footer}>

                  <Button title='Prosseguir' onPress={handleSubmit} />

                  </View>

               </View>
          </View>
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
     header: {
        alignItems: 'center'
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
     image: {
        width: 200,
        height: 200,
        borderRadius: 100
      },
      buttonImage: {
        backgroundColor: colors.gray,
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 8
      },
      footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
      }
})