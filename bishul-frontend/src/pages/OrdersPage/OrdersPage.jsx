import { useNavigate } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders'
import Badge from '../../atoms/Badge'
import Button from '../../atoms/Button'
import Spinner from '../../atoms/Spinner'
import styles from './OrdersPage.module.css'

/**
 * Page: OrdersPage
 * Historial de pedidos del usuario autenticado.
 */
const OrdersPage = () => {
  const navigate = useNavigate()
  const { orders, loading, error } = useOrders()

  if (loading) {
    return (
      <div className={styles.centered}>
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <p className={styles.errorMsg}>⚠️ {error}</p>
        <Button variant="secondary" onClick={() => navigate('/')}>Volver al inicio</Button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mis comandas</h1>
        <p className={styles.subtitle}>{orders.length} {orders.length === 1 ? 'comanda' : 'comandas'}</p>
      </div>

      {orders.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🍽️</span>
          <p className={styles.emptyText}>Aún no tienes comandas</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Ver la carta
          </Button>
        </div>
      ) : (
        <div className={styles.list}>
          {orders.map((order) => (
            <div key={order.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardMeta}>
                  <span className={styles.orderNumber}>#{order.orderNumber?.slice(-8).toUpperCase()}</span>
                  {order.tableNumber > 0 && (
                    <span className={styles.tableNumber}>🪑 Mesa {order.tableNumber}</span>
                  )}
                  <span className={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
                <Badge variant={order.status?.toLowerCase()}>{order.status}</Badge>
              </div>

              <div className={styles.cardItems}>
                {order.orderItems?.map((item, i) => (
                  <div key={i} className={styles.item}>
                    <span className={styles.itemName}>{item.productName}</span>
                    <span className={styles.itemQty}>x{item.quantity}</span>
                    <span className={styles.itemPrice}>
                      {(Number(item.price) * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.total}>
                  <span className={styles.totalLabel}>Total</span>
                  <span className={styles.totalValue}>{Number(order.totalPrice).toFixed(2)} €</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage
