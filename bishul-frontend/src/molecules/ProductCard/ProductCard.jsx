import Badge from '../../atoms/Badge'
import Button from '../../atoms/Button'
import { useToast } from '../../atoms/Toast/ToastContainer'
import styles from './ProductCard.module.css'

/**
 * Molecule: ProductCard
 * Muestra un plato de la carta con imagen, nombre, categoría, precio y botón de pedir
 *
 * @param {{ id, name, imageUrl, category, price, stock, shortDescription }} product
 * @param {(product) => void} onAddToCart
 * @param {() => void} onClick  — navega al detalle
 */
const ProductCard = ({ product, onAddToCart, onClick }) => {
  const { name, imageUrl, category, price, stock, shortDescription } = product
  const { addToast } = useToast()

  const outOfStock = stock === 0

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (!outOfStock && onAddToCart) {
      onAddToCart(product)
      addToast(`${name} añadido a tu comanda`, 'success', 2500)
    }
  }

  return (
    <article className={styles.card} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`Ver detalle de ${name}`}
    >
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={name}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
              e.target.onerror = null
              e.target.src = `https://placehold.co/400x300/F5EDD6/C1440E?text=${encodeURIComponent(name)}`
            }}
        />
        {outOfStock && (
          <div className={styles.outOfStockOverlay}>
            <span>No disponible</span>
          </div>
        )}
        <div className={styles.badgeWrapper}>
          <Badge variant="category" size="sm">{category}</Badge>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {shortDescription && (
          <p className={styles.description}>{shortDescription}</p>
        )}
        <div className={styles.footer}>
          <span className={styles.price}>
            {Number(price).toFixed(2)} €
          </span>
          <Button
            variant="primary"
            size="sm"
            disabled={outOfStock}
            onClick={handleAddToCart}
            aria-label={`Pedir ${name}`}
          >
            Pedir
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
