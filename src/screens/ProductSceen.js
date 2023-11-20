import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useGetProductsQuery } from '../store/apiSlice'

const ProductScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  // const products = useSelector((state) => state.products.products)

  const { data, error, isLoading } = useGetProductsQuery()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>{error.error}</Text>
  }

  const products = data.data

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            // update selected product
            // dispatch(productSlice.actions.setSelectedProduct(item.id))

            navigation.navigate('Product Details', { id: item._id })
          }}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </Pressable>
      )}
      numColumns={2}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  itemContainer: {
    width: '50%',
    padding: 1,
  },
})

export default ProductScreen
