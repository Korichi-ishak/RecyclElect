import { useState } from "react";
import {
  CreditCard,
  X,
  Truck,
  Package,
  Clock,
  MapPin,
  Shield
} from "lucide-react";
import { Modal, FormField, Button } from "../shared";
import type { Product } from "../shared/ProductCard";

interface DeliveryOption {
  id: string;
  name: string;
  time: string;
  price: number;
  icon: any;
}


interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { [key: string]: number };
  products: Product[];
  selectedDeliveryMethod: string;
  onDeliveryMethodChange: (method: string) => void;
  getTotalPrice: () => number;
  getDeliveryPrice: () => number;
  getFinalTotal: () => number;
  onSubmit?: () => void;
}

const deliveryOptions: DeliveryOption[] = [
  { id: 'standard', name: 'Livraison standard', time: '5-7 jours', price: 0, icon: Package },
  { id: 'express', name: 'Livraison express', time: '2-3 jours', price: 15, icon: Clock },
  { id: 'pickup', name: 'Ramassage en magasin', time: 'Disponible aujourd\'hui', price: 0, icon: MapPin }
];

export const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
  products,
  selectedDeliveryMethod,
  onDeliveryMethodChange,
  getTotalPrice,
  getDeliveryPrice,
  getFinalTotal,
  onSubmit
}: CheckoutModalProps) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      showHeader={false}
      className="p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <CreditCard className="w-6 h-6 text-primary-400 mr-3" />
          <h2 className="text-2xl font-bold">Finaliser ma commande</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h3 className="text-xl font-bold mb-4">Résumé de commande</h3>
          <div className="space-y-3 mb-6">
            {Object.entries(cartItems).map(([productId, quantity]) => {
              const product = products.find(p => p.id === productId);
              if (!product) return null;
              
              return (
                <div key={productId} className="flex justify-between items-center p-3 glass-dark rounded-xl">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-white/60">Qté: {quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-primary-400">{product.price * quantity}$ CAD</p>
                </div>
              );
            })}
          </div>

          {/* Delivery Options */}
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Truck className="w-5 h-5 mr-2 text-secondary-400" />
            Options de livraison
          </h3>
          <div className="space-y-3 mb-6">
            {deliveryOptions.map((option) => (
              <label key={option.id} className={`flex items-center p-4 glass-dark rounded-xl cursor-pointer hover:border-primary-400/50 border transition-all ${
                selectedDeliveryMethod === option.id 
                  ? 'border-primary-400 bg-primary-400/10' 
                  : 'border-white/10'
              }`}>
                <input 
                  type="radio" 
                  name="delivery" 
                  value={option.id}
                  checked={selectedDeliveryMethod === option.id}
                  onChange={(e) => onDeliveryMethodChange(e.target.value)}
                  className="sr-only" 
                />
                <div className="w-5 h-5 border-2 border-primary-400 rounded-full mr-4 flex items-center justify-center">
                  {selectedDeliveryMethod === option.id && (
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                  )}
                </div>
                <option.icon className="w-5 h-5 text-secondary-400 mr-3" />
                <div className="flex-1">
                  <p className="font-medium">{option.name}</p>
                  <p className="text-sm text-white/60">{option.time}</p>
                </div>
                <p className="font-bold text-primary-400">
                  {option.price === 0 ? 'Gratuit' : `${option.price}$ CAD`}
                </p>
              </label>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex justify-between items-center text-lg">
              <span>Sous-total</span>
              <span>{getTotalPrice()}$ CAD</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Livraison</span>
              <span className={getDeliveryPrice() === 0 ? "text-green-400" : "text-white"}>
                {getDeliveryPrice() === 0 ? 'Gratuit' : `${getDeliveryPrice()}$ CAD`}
              </span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-primary-400 mt-2">
              <span>Total</span>
              <span>{getFinalTotal()}$ CAD</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div>
          <h3 className="text-xl font-bold mb-4">Informations de paiement</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              type="email"
              label="Adresse email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="votre@email.com"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                type="text"
                label="Prénom"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
              <FormField
                type="text"
                label="Nom"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>

            <FormField
              type="text"
              label="Adresse"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="123 Rue Example"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                type="text"
                label="Ville"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              />
              <FormField
                type="text"
                label="Code postal"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder="A1A 1A1"
                required
              />
            </div>

            <FormField
              type="text"
              label="Numéro de carte"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                type="text"
                label="Date d'expiration"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                placeholder="MM/AA"
                required
              />
              <FormField
                type="text"
                label="CVV"
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                placeholder="123"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={Shield}
              className="w-full mt-6"
            >
              Finaliser l'achat - {getFinalTotal()}$ CAD
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};