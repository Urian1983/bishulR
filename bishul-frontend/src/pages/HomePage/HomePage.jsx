import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useProducts } from '../../hooks/useProducts'
import ProductGrid from '../../organisms/ProductGrid'
import Button from '../../atoms/Button'
import styles from './HomePage.module.css'

/**
 * Page: HomePage
 * Versión simplificada: Hero enfocado + Catálogo de productos.
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

      {/* Hero Simplificado */}
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
          </p>
          <div className={styles.heroActions}>
            <Button variant="primary" size="lg" onClick={() => navigate('/products')}>
              Ver la carta
            </Button>
          </div>
        </div>
        {/* Se ha eliminado la decoración de emojis para una estética más limpia */}
      </section>

      {/* Carta (Sección Principal) */}
      <section className={styles.catalog}>
        <div className={styles.catalogHeader}>
          <h2 className={styles.catalogTitle}>Nuestra carta</h2>
          <p className={styles.catalogSubtitle}>
            Platos elaborados cada día con ingredientes frescos y técnicas tradicionales.
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

export default HomePage