import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { FormField, Button } from "../shared";

interface ContactFormProps {
  onSubmit: (data: any) => void;
  contactReasons: Array<{ id: string; label: string; icon: any }>;
}

export const ContactForm = ({ onSubmit, contactReasons }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-3xl p-8 border border-white/10"
    >
      <div className="flex items-center mb-6">
        <MessageSquare className="w-6 h-6 text-primary-400 mr-3" />
        <h2 className="text-2xl font-bold">Nous contacter</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            type="text"
            label="Nom complet"
            icon={User}
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
          <FormField
            type="email"
            label="Adresse email"
            icon={Mail}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Motif de contact</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {contactReasons.map((reason) => (
              <label
                key={reason.id}
                className={`flex flex-col items-center p-4 rounded-2xl cursor-pointer transition-all border ${
                  formData.reason === reason.id
                    ? 'border-primary-400 bg-primary-400/10'
                    : 'border-white/10 hover:border-primary-400/30'
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason.id}
                  checked={formData.reason === reason.id}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="sr-only"
                />
                <reason.icon className="w-6 h-6 text-primary-400 mb-2" />
                <span className="text-sm font-medium text-center">{reason.label}</span>
              </label>
            ))}
          </div>
        </div>

        <FormField
          type="textarea"
          label="Message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          rows={6}
          placeholder="Décrivez votre demande..."
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={Send}
          className="w-full"
        >
          Envoyer le message
        </Button>
      </form>
    </motion.div>
  );
};