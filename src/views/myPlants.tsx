import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert } from 'react-native';
import { Header } from '../components/header';

import colors from '../styles/colors';
import waterDrop from '../assets/waterdrop.png';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCartSecondary } from '../components/plantCartSecondary';
import { Load } from '../components/load';

export function MyPlants() {
    const [myplants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    function handleRemove(plant: PlantProps) {
      Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
        {
          text: 'Não 👎',
          style: 'cancel'
        },
        {
          text: 'Sim 👍',
          onPress: async () => {
            try {
              await removePlant(plant.id);
              setMyPlants((oldData) => 
                oldData.filter((item) => item.id !== plant.id)
              );

            }catch {
               Alert.alert('Não foi possivel remover! 😪');
            }
          }
        }
      ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWaterd(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
            )

            setMyPlants(plantsStoraged);
            setLoading(false);

        }

        loadStorageData();

    },[])

    if (loading)
        return <Load />


    return(
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image source={waterDrop} style={styles.spotlightImage} />
                <Text style={styles.spotlightText}> {nextWaterd} </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}> Próximas Regadas </Text>

                <FlatList data={myplants} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => ( <PlantCartSecondary data={item} handleRemove={() => handleRemove(item)} /> )} showsVerticalScrollIndicator={false} />
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
  containerScroll: {
     flex: 1
  },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingTop: 50,
      backgroundColor: colors.background
    },
    spotlight: {
      backgroundColor: colors.blue_light,
      paddingHorizontal: 20,
      borderRadius: 20,
      height: 110,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    spotlightImage: {
      width: 60,
      height: 60
    },
    spotlightText: {
      flex: 1,
      color: colors.blue,
      paddingHorizontal: 20
    },
    plants: {
      flex: 1,
      width: '100%'
    },
    plantsTitle: {
      fontSize: 24,
      fontFamily: fonts.heading,
      color: colors.heading,
      marginVertical: 20
    }
})