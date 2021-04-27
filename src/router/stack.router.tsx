import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import { Welcome } from '../views/welcome';
import { UserIdentification } from '../views/userIdentification';
import { Confirmation } from '../views/confirmation';
import { PlantSave } from '../views/plantSave';
import { MyPlants } from '../views/myPlants';
import AuthRoutes from './tab.routes';
import { UserPhotoIdentification } from '../views/userPhotoIdentification';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator headerMode='none' screenOptions={{ cardStyle: {backgroundColor: colors.white} }}>
        <stackRoutes.Screen name='Welcome' component={Welcome} />
        <stackRoutes.Screen name='UserIdentification' component={UserIdentification} />
        <stackRoutes.Screen name='UserPhotoIdentification' component={UserPhotoIdentification} />
        <stackRoutes.Screen name='Confirmation' component={Confirmation} />
        <stackRoutes.Screen name='PlantSelect' component={AuthRoutes} />
        <stackRoutes.Screen name='PlantSave' component={PlantSave} />
        <stackRoutes.Screen name='MyPlants' component={AuthRoutes} />
    </stackRoutes.Navigator>
)

export default AppRoutes;