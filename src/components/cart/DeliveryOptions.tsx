import { Package, Clock, MapPin } from "lucide-react";

interface DeliveryOption {
  id: string;
  name: string;
  time: string;
  price: number;
  icon: any;
}

interface DeliveryOptionsProps {
  selectedDelivery: string;
  onDeliveryChange: (deliveryId: string) => void;
  className?: string;
}

const deliveryOptions: DeliveryOption[] = [
  { id: 'standard', name: 'Livraison standard', time: '5-7 jours', price: 0, icon: Package },
  { id: 'express', name: 'Livraison express', time: '2-3 jours', price: 15, icon: Clock },
  { id: 'pickup', name: 'Ramassage en magasin', time: 'Disponible aujourd\'hui', price: 0, icon: MapPin }
];

export const DeliveryOptions = ({ 
  selectedDelivery, 
  onDeliveryChange, 
  className = "" 
}: DeliveryOptionsProps) => {
  return (
    <div className={className}>
      <h4 className="font-semibold mb-4">Options de livraison</h4>
      <div className="space-y-3">
        {deliveryOptions.map((option) => (
          <label 
            key={option.id} 
            className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all border ${
              selectedDelivery === option.id 
                ? 'border-primary-400 bg-primary-400/10' 
                : 'border-white/10 hover:border-primary-400/30'
            }`}
          >
            <input
              type="radio"
              name="delivery"
              value={option.id}
              checked={selectedDelivery === option.id}
              onChange={(e) => onDeliveryChange(e.target.value)}
              className="sr-only"
            />
            <div className="w-5 h-5 border-2 border-primary-400 rounded-full mr-4 flex items-center justify-center">
              {selectedDelivery === option.id && (
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
    </div>
  );
};