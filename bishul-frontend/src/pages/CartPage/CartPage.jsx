import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useOrders } from '../../hooks/useOrders'
import { useToast } from '../../atoms/Toast/ToastContainer'
import Button from '../../atoms/Button'
import Spinner from '../../atoms/Spinner'
import styles from './CartPage.module.css'

const PAYMENT_METHODS = [
  { value: 'CREDIT_CARD', label: '💳 Tarjeta de crédito' },
  { value: 'CASH',        label: '💵 Efectivo' },
]

const CartPage = () => {
  const navigate = useNavigate()
  const { cart, loading, handleUpdateItem, handleRemoveItem, handleClearCart } = useCartContext()
  const { handleCreateOrder } = useOrders()

  const { addToast } = useToast()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [form, setForm] = useState({ paymentMethod: '' })
  const [formErrors, setFormErrors] = useState({})

  const items = cart?.cartItems ?? []
  const total = items.reduce(
    (acc, item) => acc + Number(item.productPrice) * item.quantity,
    0
  )

  const handleQuantityChange = async (item, newQty) => {
    if (newQty < 1) return
    try {
      await handleUpdateItem({
        productId: item.productId,
        productName: item.productName,
        productPrice: item.productPrice,
        quantity: newQty,
      })
    } catch {
      // Error gestionado en CartContext
    }
  }

  const handleRemove = async (cartItemId) => {
    try {
      await handleRemoveItem(cartItemId)
    } catch {
      // Error gestionado en CartContext
    }
  }

  const handleClear = async () => {
    try {
      await handleClearCart()
    } catch {
      // Error gestionado en CartContext
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!form.paymentMethod) errors.paymentMethod = 'Selecciona un método de pago'
    return errors
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setCheckoutError('')
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setCheckoutLoading(true)
    try {
      await handleCreateOrder({
        orderNumber: `ORD-${Date.now()}`,
        paymentMethod: form.paymentMethod,
      })
      addToast('¡Comanda enviada a cocina! 🍽️', 'success', 3500)
      navigate('/orders')
    } catch (err) {
      setCheckoutError(err.response?.data?.message || 'Error al confirmar la comanda')
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.centered}>
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tu comanda</h1>
        {items.length > 0 && (
          <button className={styles.clearBtn} onClick={handleClear}>
            Vaciar comanda
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🍽️</span>
          <p className={styles.emptyText}>Tu comanda está vacía</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Ver la carta
          </Button>
        </div>
      ) : (
        <div className={styles.layout}>

          {/* Lista de platos */}
          <div className={styles.itemsList}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.productName}</p>
                  <p className={styles.itemPrice}>
                    {Number(item.productPrice).toFixed(2)} € / ud.
                  </p>
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.qtyControl}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      aria-label="Reducir cantidad"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className={styles.qty}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  <span className={styles.itemSubtotal}>
                    {(Number(item.productPrice) * item.quantity).toFixed(2)} €
                  </span>

                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Eliminar ${item.productName}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen + checkout */}
          <div className={styles.summary}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Resumen</h2>
              <div className={styles.summaryRow}>
                <span>{items.length} {items.length === 1 ? 'plato' : 'platos'}</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>

              {!checkoutOpen ? (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => setCheckoutOpen(true)}
                >
                  Confirmar comanda
                </Button>
              ) : (
                <form className={styles.checkoutForm} onSubmit={handleCheckout} noValidate>
                  <h3 className={styles.checkoutTitle}>Método de pago</h3>

                  {checkoutError && (
                    <p className={styles.checkoutError}>⚠️ {checkoutError}</p>
                  )}

                  <div className={styles.field}>
                    <div className={styles.paymentMethods}>
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method.value}
                          type="button"
                          className={[
                            styles.paymentOption,
                            form.paymentMethod === method.value ? styles.paymentOptionSelected : ''
                          ].join(' ')}
                          onClick={() => setForm((p) => ({ ...p, paymentMethod: method.value }))}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                    {formErrors.paymentMethod && (
                      <span className={styles.fieldError}>{formErrors.paymentMethod}</span>
                    )}
                  </div>

                  <div className={styles.checkoutActions}>
                    <Button type="submit" variant="primary" size="lg" fullWidth loading={checkoutLoading}>
                      Enviar a cocina
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      fullWidth
                      onClick={() => setCheckoutOpen(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
