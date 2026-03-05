import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useProducts } from '../../hooks/useProducts'
import ProductGrid from '../../organisms/ProductGrid'
import Button from '../../atoms/Button'
import styles from './HomePage.module.css'

/**
 * Page: HomePage
 * Hero + carta del restaurante Bishul.
 */
const HomePage = () => {
  const navigate = useNavigate()
  const { products, loading, error } = useProducts()
  const { handleAddItem } = useCartContext()

  const handleAddToCart = async (product) => {
    try {
      await handleAddItem(product)
    } catch {
      // El error se gestiona en CartContext
    }
  }

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`)
  }

  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero} aria-label="Bienvenida">
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Restaurante mediterráneo · Barcelona</p>
          <h1 className={styles.heroTitle}>
            La carta de<br />
            <em>Bishul</em><br />
            te espera
          </h1>
          <p className={styles.heroSubtitle}>
            Cocina mediterránea de autor elaborada con producto fresco de temporada.
            Del Levante español a los sabores de Oriente Medio, en cada plato una historia.
          </p>
          <div className={styles.heroActions}>
            <Button variant="primary" size="lg" onClick={() => navigate('/products')}>
              Ver la carta
            </Button>

          </div>
        </div>
        <div className={styles.heroDecor} aria-hidden="true">
          <span className={styles.heroEmoji}>🫕</span>
          <span className={styles.heroEmojiSm1}>🥗</span>
          <span className={styles.heroEmojiSm2}>🍋</span>
          <span className={styles.heroEmojiSm3}>🫒</span>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features} aria-label="Nuestros valores">
        {FEATURES.map(({ icon, title, text }) => (
          <div key={title} className={styles.featureCard}>
            <span className={styles.featureIcon}>{icon}</span>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureText}>{text}</p>
          </div>
        ))}
      </section>

      {/* Carta */}
      <section className={styles.catalog}>
        <div className={styles.catalogHeader}>
          <h2 className={styles.catalogTitle}>Nuestra carta</h2>
          <p className={styles.catalogSubtitle}>
            Platos elaborados cada día con ingredientes frescos, recetas de temporada
            y técnicas que respetan la tradición mediterránea
          </p>
        </div>
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          onAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
        />
      </section>
    </div>
  )
}

const FEATURES = [
  {
    icon: '🌿',
    title: 'Producto de temporada',
    text: 'Trabajamos con productores locales y seleccionamos solo ingredientes frescos cada mañana.',
  },
  {
    icon: '👨‍🍳',
    title: 'Cocina de autor',
    text: 'Recetas que fusionan la tradición culinaria mediterránea con técnicas de vanguardia.',
  },
  {
    icon: '🍷',
    title: 'Maridaje perfecto',
    text: 'Nuestra selección de vinos y bebidas está pensada para realzar cada plato de la carta.',
  },
]

export default HomePage
