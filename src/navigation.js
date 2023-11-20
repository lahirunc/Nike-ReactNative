import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable, Text } from 'react-native'
import { useSelector } from 'react-redux'

import ProductDetailsScreen from './screens/ProductDetailsScreen'
import ProductScreen from './screens/ProductSceen'
import ShoppingCart from './screens/ShoppingCart'

import TrackOrder from './screens/TrackOrderScreen'
import { selectNumberOfItems } from './store/cartSlice'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const numberOfItems = useSelector(selectNumberOfItems)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
      >
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                style={{ flexDirection: 'row' }}
                onPress={() => navigation.navigate('Cart')}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                  {numberOfItems}
                </Text>
              </Pressable>
            ),
            headerLeft: () => (
              <Pressable onPress={() => navigation.navigate('Track Order')}>
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={22}
                  color="gray"
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen name="Cart" component={ShoppingCart} />
        <Stack.Screen name="Track Order" component={TrackOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
