import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
}

const products = [
  {
    name: 'Hidromiel Tradicional',
    description: 'Nuestra receta ancestral elaborada con miel de flores silvestres y agua de manantial. Fermentada lentamente durante tres meses, esta hidromiel clásica ofrece notas florales suaves con un final dulce y equilibrado.',
    stock: 12,
    image: '/img/hidromiel-tradicional.svg',
    price: 18500,
    category: 'hidromieles'
  },
  {
    name: 'Hidromiel Especiada Yule',
    description: 'Edición especial inspirada en los festines vikingos de invierno. Elaborada con miel de ulmo y una selección de especias nórdicas: canela, clavo, cardamomo y jengibre. Su calidez aromática evoca las noches junto al fuego.',
    stock: 7,
    image: '/img/hidromiel-yule.svg',
    price: 22000,
    category: 'hidromieles'
  },
  {
    name: 'Hidromiel de Frambuesa',
    description: 'Un elixir frutal y vibrante, elaborada con miel multiflora y frambuesas frescas de temporada. De color rubí intenso y aroma afrutado, con una acidez natural que equilibra la dulzura de la miel. Perfecta para los amantes de los sabores frutales.',
    stock: 9,
    image: '/img/hidromiel-frambuesa.svg',
    price: 20000,
    category: 'hidromieles'
  },
  {
    name: 'Vela Rúnica de Cera de Abeja',
    description: 'Elaborada a mano con cera de abeja pura, esta vela lleva grabada la runa Algiz para protección y conexión espiritual. Arde con una llama cálida y dorada, liberando el suave aroma natural de la cera. Cada vela es única, moldeada con intención artesanal.',
    stock: 15,
    image: '/img/vela-runica.svg',
    price: 9500,
    category: 'cera'
  },
  {
    name: 'Kit de Velas Futhark',
    description: 'Colección de 8 velas de cera de abeja, cada una marcada con una runa del alfabeto fúthark antiguo. Presentadas en una caja de madera artesanal, son perfectas como regalo o para ceremonias personales. La cera es 100% natural sin aditivos ni fragancias artificiales.',
    stock: 5,
    image: '/img/kit-futhark.svg',
    price: 35000,
    category: 'cera'
  },
  {
    name: 'Bálsamo de Cera y Miel',
    description: 'Bálsamo multiusos elaborado con cera de abeja y miel pura. Hidrata y protege la piel con los beneficios naturales de la colmena. Sin parabenos ni conservantes artificiales. Ideal para labios, cutículas y zonas de piel seca. Aroma suave a miel y propóleo.',
    stock: 20,
    image: '/img/balsamo-cera.svg',
    price: 8000,
    category: 'cera'
  }
]

const seed = async () => {
  if (!firebaseConfig.projectId) {
    console.error('Faltan credenciales de Firebase. Completa el archivo .env antes de correr el seed (ver .env.example).')
    process.exit(1)
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const productsCollection = collection(db, 'products')

  for (const product of products) {
    const docRef = await addDoc(productsCollection, product)
    console.log(`Producto creado: ${product.name} (${docRef.id})`)
  }

  console.log('Seed completo.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Error al cargar los productos:', error)
  process.exit(1)
})
