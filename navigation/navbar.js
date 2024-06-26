import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import absensi from '../files/absensi';
import listabsensi from '../files/listabsensi';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name='Absensi Mahasiswa' component={absensi} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <Icon name='pencil' size={20} color={focused ? 'black' : 'gray'} />
                    ),
                    tabBarLabelStyle: {color: 'black'}
                }}
            />
            <Tab.Screen name='List Mahasiswa' component={listabsensi} 
                options={{
                    headerTitleAlign: 'center',
                    tabBarIcon: ({focused}) => (
                        <Icon name='list' size={20} color={focused ? 'black' : 'gray'} />
                    ),
                    tabBarLabelStyle: {color: 'black'}
                }}/>
        </Tab.Navigator>
    )
};

export default Tabs;