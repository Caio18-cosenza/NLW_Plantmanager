import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackRoutes from './stack.router';

const Routes = () =>(
    <NavigationContainer>
        <StackRoutes />
    </NavigationContainer>
)

export default Routes;