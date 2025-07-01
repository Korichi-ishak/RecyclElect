import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  CreditCard,
  ArrowLeft,
  Package,
  Clock,
  MapPin,
  Truck,
  Shield,
  CheckCircle,
  Award,
  Calendar,
  Download,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import { CartItem } from "../components/cart";
import { EmptyState } from "../components/shared";

// Mock data pour la démo
const mockCartItems = [
  {
    id: '1',
    name: 'MacBook Pro 13" M1',
    brand: 'Apple',
    price: 1299,
    originalPrice: 1699,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
    condition: 'excellent',
    warranty: '12 mois'
  },
  {
    id: '2',
    name: 'SSD Samsung 970 EVO',
    brand: 'Samsung',
    price: 89,
    originalPrice: 129,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    condition: 'excellent',
    warranty: '24 mois'
  }
];

const mockOrders = [
  {
    id: 'CMD-2025-001',
    date: '2025-01-15',
    status: 'delivered',
    total: 1388,
    items: 2,
    tracking: 'CP123456789CA',
    deliveryDate: '2025-01-18'
  },
  {
    id: 'CMD-2025-002',
    date: '2025-01-10',
    status: 'processing',
    total: 899,
    items: 1,
    tracking: 'CP987654321CA',
    estimatedDelivery: '2025-01-25'
  }
];

const deliveryOptions = [
  { 
    id: 'standard', 
    name: 'Livraison standard', 
    time: '5-7 jours ouvrables', 
    price: 0, 
    icon: Package,
    description: 'Livraison par Postes Canada'
  },
  { 
    id: 'express', 
    name: 'Livraison express', 
    time: '2-3 jours ouvrables', 
    price: 15, 
    icon: Clock,
    description: 'Livraison prioritaire assurée'
  },
  { 
    id: 'pickup', 
    name: 'Ramassage en magasin', 
    time: 'Disponible aujourd\'hui', 
    price: 0, 
    icon: MapPin,
    description: '123 Rue Tech, Montréal, QC'
  }
];

export const CartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [activeTab, setActiveTab] = useState<'cart' | 'orders'>('cart');
  const [showCheckout, setShowCheckout] = useState(false);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getDeliveryPrice = () => {
    const option = deliveryOptions.find(opt => opt.id === selectedDelivery);
    return option ? option.price : 0;
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryPrice();
  };

  const getSavings = () => {
    return cartItems.reduce((sum, item) => {
      if (item.originalPrice) {
        return sum + ((item.originalPrice - item.price) * item.quantity);
      }
      return sum;
    }, 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-400';
      case 'processing': return 'text-blue-400';
      case 'shipped': return 'text-yellow-400';
      default: return 'text-white/60';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Livré';
      case 'processing': return 'En traitement';
      case 'shipped': return 'Expédié';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-primary-600/20 via-secondary-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-cyber opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/10 to-neutral-900/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <ShoppingCart className="w-5 h-5 text-primary-400" />
              <span className="font-medium">Votre Panier & Commandes</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Mon <span className="text-gradient">Espace</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Gérez votre panier et suivez l'historique de vos commandes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-gradient-to-r from-neutral-900/80 via-primary-900/10 to-neutral-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-2">
              <button
                onClick={() => setActiveTab('cart')}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all font-medium ${
                  activeTab === 'cart'
                    ? 'bg-primary-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Mon Panier</span>
                {getTotalItems() > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all font-medium ${
                  activeTab === 'orders'
                    ? 'bg-secondary-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Mes Commandes</span>
                <span className="bg-white/20 text-white text-xs rounded-full px-2 py-1">
                  {mockOrders.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/5 via-transparent to-primary-900/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatePresence mode="wait">
            {activeTab === 'cart' ? (
              <motion.div
                key="cart"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {cartItems.length === 0 ? (
                  <EmptyState
                    icon={ShoppingCart}
                    title="Votre panier est vide"
                    description="Découvrez nos produits reconditionnés et ajoutez-les à votre panier"
                    actionLabel="Continuer mes achats"
                    onAction={() => window.location.href = '/j-achete'}
                  />
                ) : (
                  /* Cart with Items */
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Articles dans votre panier</h2>
                        <p className="text-white/60">{getTotalItems()} article{getTotalItems() > 1 ? 's' : ''}</p>
                      </div>

                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemoveItem={removeItem}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                      <div className="glass-dark p-6 rounded-3xl border border-white/10 sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Résumé de commande</h3>
                        
                        {/* Savings Badge */}
                        {getSavings() > 0 && (
                          <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6">
                            <div className="flex items-center">
                              <Award className="w-5 h-5 text-green-400 mr-3" />
                              <div>
                                <p className="font-bold text-green-400">Vous économisez</p>
                                <p className="text-2xl font-bold text-green-400">{getSavings()}$ CAD</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between">
                            <span>Sous-total ({getTotalItems()} articles)</span>
                            <span className="font-bold">{getSubtotal()}$ CAD</span>
                          </div>
                          
                          {/* Delivery Options */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Truck className="w-4 h-4 mr-2 text-secondary-400" />
                              Livraison
                            </h4>
                            <div className="space-y-2">
                              {deliveryOptions.map((option) => (
                                <label
                                  key={option.id}
                                  className="flex items-center p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors"
                                >
                                  <input
                                    type="radio"
                                    name="delivery"
                                    value={option.id}
                                    checked={selectedDelivery === option.id}
                                    onChange={(e) => setSelectedDelivery(e.target.value)}
                                    className="sr-only"
                                  />
                                  <div className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                                    selectedDelivery === option.id
                                      ? 'border-primary-400'
                                      : 'border-white/30'
                                  }`}>
                                    {selectedDelivery === option.id && (
                                      <div className="w-2 h-2 bg-primary-400 rounded-full" />
                                    )}
                                  </div>
                                  <option.icon className="w-4 h-4 text-secondary-400 mr-3" />
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{option.name}</p>
                                    <p className="text-xs text-white/60">{option.time}</p>
                                  </div>
                                  <span className="font-bold text-primary-400 text-sm">
                                    {option.price === 0 ? 'Gratuit' : `${option.price}$ CAD`}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/10 pt-4 mb-6">
                          <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total</span>
                            <span className="text-primary-400">{getTotal()}$ CAD</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowCheckout(true)}
                            className="w-full btn-primary py-4 rounded-xl font-bold flex items-center justify-center"
                          >
                            <CreditCard className="w-5 h-5 mr-2" />
                            Passer commande
                          </motion.button>
                          
                          <Link
                            to="/j-achete"
                            className="w-full btn-secondary py-3 rounded-xl font-semibold flex items-center justify-center"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continuer mes achats
                          </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            {[
                              { icon: Shield, text: 'Paiement sécurisé' },
                              { icon: Truck, text: 'Livraison gratuite' },
                              { icon: Award, text: 'Garantie incluse' },
                              { icon: CheckCircle, text: 'Retour 30 jours' }
                            ].map((item, index) => (
                              <div key={index} className="flex items-center text-white/60">
                                <item.icon className="w-4 h-4 mr-2 text-green-400" />
                                <span>{item.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Orders Tab */
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Historique des commandes</h2>
                  <p className="text-white/60">{mockOrders.length} commande{mockOrders.length > 1 ? 's' : ''}</p>
                </div>

                {mockOrders.length === 0 ? (
                  <div className="text-center py-20">
                    <Package className="w-32 h-32 text-white/30 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Aucune commande</h3>
                    <p className="text-white/60 mb-8">
                      Vous n'avez pas encore passé de commande
                    </p>
                    <Link
                      to="/j-achete"
                      className="btn-primary py-3 px-6 rounded-xl font-semibold"
                    >
                      Découvrir nos produits
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        className="glass-dark p-6 rounded-3xl border border-white/10"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                              <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">{order.id}</h3>
                              <p className="text-white/60 text-sm flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(order.date).toLocaleDateString('fr-CA')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary-400">{order.total}$ CAD</p>
                            <p className="text-sm text-white/60">{order.items} article{order.items > 1 ? 's' : ''}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${
                                order.status === 'delivered' ? 'bg-green-400' :
                                order.status === 'processing' ? 'bg-blue-400' : 'bg-yellow-400'
                              }`} />
                              <span className={`font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                            
                            {order.tracking && (
                              <div className="text-sm text-white/60">
                                <span>Suivi: </span>
                                <span className="font-mono text-primary-400">{order.tracking}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-3">
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {(order.deliveryDate || order.estimatedDelivery) && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex items-center text-sm text-white/60">
                              <Truck className="w-4 h-4 mr-2" />
                              {order.deliveryDate ? (
                                <span>Livré le {new Date(order.deliveryDate).toLocaleDateString('fr-CA')}</span>
                              ) : (
                                <span>Livraison estimée: {new Date(order.estimatedDelivery!).toLocaleDateString('fr-CA')}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Checkout Modal - Same as BuyPage but simplified */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-dark max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold flex items-center">
                    <CreditCard className="w-6 h-6 text-primary-400 mr-3" />
                    Finaliser ma commande
                  </h2>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="glass-dark p-6 rounded-2xl">
                    <h3 className="font-bold mb-4">Résumé de votre commande</h3>
                    <div className="space-y-3 mb-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span className="text-primary-400 font-bold">{item.price * item.quantity}$ CAD</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary-400">{getTotal()}$ CAD</span>
                      </div>
                    </div>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Prénom"
                        className="p-3 bg-white/10 border border-white/20 rounded-xl focus:border-primary-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Nom"
                        className="p-3 bg-white/10 border border-white/20 rounded-xl focus:border-primary-400 focus:outline-none"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:border-primary-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Adresse"
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:border-primary-400 focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Ville"
                        className="p-3 bg-white/10 border border-white/20 rounded-xl focus:border-primary-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Code postal"
                        className="p-3 bg-white/10 border border-white/20 rounded-xl focus:border-primary-400 focus:outline-none"
                      />
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h4 className="font-bold mb-4">Informations de paiement</h4>
                      <input
                        type="text"
                        placeholder="Numéro de carte"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:border-primary-400 focus:outline-none mb-4"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="p-3 bg-white/10 border border-white/20 rounded-xl focus:border-primary-400 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="p-3 bg-white/10 border border-white/20 rounded-xl focus:border-primary-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full btn-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Finaliser l'achat - {getTotal()}$ CAD
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};