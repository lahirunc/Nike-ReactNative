import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import CartListItem from '../components/CartListItem'
import { useCreateOrderMutation } from '../store/apiSlice'
import {
  cartSlice,
  selectDeliveryFee,
  selectSubTotal,
  selectTotal,
} from '../store/cartSlice'

const shoppingCartTotals = () => {
  const subTotal = useSelector(selectSubTotal)
  const deliveryFee = useSelector(selectDeliveryFee)
  const total = useSelector(selectTotal)

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>${subTotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>${deliveryFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>${total}</Text>
      </View>
    </View>
  )
}

const ShoppingCart = () => {
  const cartItem = useSelector((state) => state.cart.items)
  const subTotal = useSelector(selectSubTotal)
  const deliveryFee = useSelector(selectDeliveryFee)
  const total = useSelector(selectTotal)

  const dispatch = useDispatch()

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation()

  const checkout = () => {
    const result = createOrder({
      items: cartItem,
      subTotal,
      delivery: deliveryFee,
      total,
      customer: {
        name: 'Lahiru',
        address: 'Home',
        email: 'test@gmail.com',
      },
    }).then((res) => {
      if (res.data?.status === 'OK') {
        Alert.alert(
          'Order has been submitted',
          `Your order reference is: ${res.data.data.ref}`
        )
        dispatch(cartSlice.actions.clear())
      }
    })
  }

  return (
    <>
      <FlatList
        data={cartItem}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={shoppingCartTotals}
      />
      <Pressable style={styles.button} onPress={checkout}>
        <Text style={styles.buttonText}>
          Checkout{isLoading && <ActivityIndicator />}
        </Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
})

export default ShoppingCart
