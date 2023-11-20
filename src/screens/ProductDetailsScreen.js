import { useNavigation } from '@react-navigation/native'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useGetProductQuery } from '../store/apiSlice'
import { cartSlice } from '../store/cartSlice'

const ProductDetailsScreen = ({ route }) => {
  const id = route.params.id
  const { data, isLoading, error } = useGetProductQuery(id)

  const navigation = useNavigation()
  // const product = useSelector((state) => state.products.selectedProduct)
  const dispatch = useDispatch()

  const { width } = useWindowDimensions()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>{error.error}</Text>
  }

  const product = data?.data

  const addToCart = () => {
    // since the param in the addCartItem is same as product no need to do product: product
    dispatch(cartSlice.actions.addCartItem({ product }))

    navigation.pop()
  }
  return (
    <View>
      <ScrollView>
        {/* Image Carousel */}
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Add to cart button */}
      <Pressable style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>
      {/* Navigation icon */}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 10,
  },
  price: {
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
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

export default ProductDetailsScreen
