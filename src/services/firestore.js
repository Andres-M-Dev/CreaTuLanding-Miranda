import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  where
} from 'firebase/firestore'
import { db } from '../firebase/config'

const productsCollection = collection(db, 'products')

export const getProducts = async (category) => {
  const productsQuery = category
    ? query(productsCollection, where('category', '==', category))
    : productsCollection

  const snapshot = await getDocs(productsQuery)

  if (snapshot.empty) {
    throw new Error('No hay productos disponibles para mostrar')
  }

  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
}

export const getProductById = async (productId) => {
  const productRef = doc(db, 'products', productId)
  const snapshot = await getDoc(productRef)

  if (!snapshot.exists()) {
    throw new Error('Producto no encontrado')
  }

  return { id: snapshot.id, ...snapshot.data() }
}

export const createOrder = async (order, cartItems) => {
  const ordersCollection = collection(db, 'orders')
  const orderRef = doc(ordersCollection)

  await runTransaction(db, async (transaction) => {
    const productRefs = cartItems.map((item) => doc(db, 'products', item.id))
    const productSnapshots = await Promise.all(
      productRefs.map((productRef) => transaction.get(productRef))
    )

    productSnapshots.forEach((snapshot, index) => {
      const item = cartItems[index]

      if (!snapshot.exists()) {
        throw new Error(`El producto "${item.name}" ya no está disponible`)
      }

      const currentStock = snapshot.data().stock

      if (currentStock < item.quantity) {
        throw new Error(`No hay stock suficiente de "${item.name}"`)
      }
    })

    productSnapshots.forEach((snapshot, index) => {
      const item = cartItems[index]
      transaction.update(productRefs[index], { stock: snapshot.data().stock - item.quantity })
    })

    transaction.set(orderRef, { ...order, date: serverTimestamp() })
  })

  return orderRef.id
}
