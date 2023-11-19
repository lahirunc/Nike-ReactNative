import { FlatList, Image, Pressable, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { productSlice } from '../store/productSlice'

const ProductScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products)

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            // update selected product
            dispatch(productSlice.actions.setSelectedProduct(item.id))

            navigation.navigate('Product Details')
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
