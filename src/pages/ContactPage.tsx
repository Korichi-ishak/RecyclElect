import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormField, Button } from "../components/shared";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  User,
  FileText,
  Image,
  Shield,
  Clock,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Users,
  Leaf,
  Recycle,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  HeadphonesIcon,
  AlertCircle,
  Info,
  RefreshCw,
  Package,
  ChevronDown
} from "lucide-react";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  contactReason: string;
}

const contactReasons = [
  { value: 'vente', label: 'Vendre mon équipement', icon: Package, color: 'text-green-400' },
  { value: 'achat', label: 'Question sur un achat', icon: MessageSquare, color: 'text-blue-400' },
  { value: 'plainte', label: 'Déposer une plainte', icon: AlertCircle, color: 'text-red-400' },
  { value: 'reclamation', label: 'Faire une réclamation', icon: RefreshCw, color: 'text-yellow-400' },
  { value: 'negociation', label: 'Négocier un prix', icon: ArrowRight, color: 'text-purple-400' },
  { value: 'autre', label: 'Autre demande', icon: Info, color: 'text-white/70' }
];

const companyValues = [
  {
    icon: Recycle,
    title: "Durabilité",
    description: "Nous donnons une seconde vie aux équipements électroniques pour réduire les déchets"
  },
  {
    icon: Shield,
    title: "Qualité garantie",
    description: "Tous nos produits sont testés et garantis jusqu'à 24 mois"
  },
  {
    icon: Users,
    title: "Service client",
    description: "Une équipe dédiée pour vous accompagner dans vos projets"
  },
  {
    icon: Globe,
    title: "Impact global",
    description: "Contribution à une économie circulaire pour un avenir durable"
  }
];

const policies = [
  {
    title: "Politique de retour",
    description: "Retour gratuit sous 30 jours",
    details: [
      "Produit en état d'origine avec emballage",
      "Frais de retour pris en charge",
      "Remboursement sous 5-7 jours ouvrables",
      "Échange possible selon disponibilité"
    ],
    icon: RefreshCw,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Garantie produits",
    description: "Protection étendue sur tous nos équipements",
    details: [
      "Garantie 12-24 mois selon le produit",
      "Support technique inclus",
      "Réparation ou remplacement gratuit",
      "Service après-vente réactif"
    ],
    icon: Shield,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Livraison & Installation",
    description: "Service complet de la commande à l'utilisation",
    details: [
      "Livraison gratuite partout au Canada",
      "Installation et configuration",
      "Formation à l'utilisation",
      "Suivi personnalisé"
    ],
    icon: Package,
    color: "from-purple-500 to-violet-500"
  }
];

export const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactReason: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.subject.trim()) newErrors.subject = 'L\'objet est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    if (!formData.contactReason) newErrors.contactReason = 'Veuillez sélectionner un motif';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleReasonChange = (reason: string) => {
    setFormData(prev => ({ ...prev, contactReason: reason }));
    if (errors.contactReason) {
      setErrors(prev => ({ ...prev, contactReason: undefined }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      contactReason: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
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
              <HeadphonesIcon className="w-5 h-5 text-primary-400" />
              <span className="font-medium">Support & Contact</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Nous <span className="text-gradient">Contacter</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Une question, une réclamation ou envie de vendre ? Notre équipe est là pour vous accompagner
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/5 via-transparent to-primary-900/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-dark p-8 rounded-3xl border border-white/10"
            >
              <div className="flex items-center mb-8">
                <MessageSquare className="w-6 h-6 text-primary-400 mr-3" />
                <h2 className="text-2xl font-bold">Envoyer un message</h2>
              </div>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6"
                  >
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <div>
                        <p className="font-bold text-green-400">Message envoyé !</p>
                        <p className="text-sm text-green-300">Nous vous répondrons dans les 24h</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    type="text"
                    label="Prénom"
                    icon={User}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Jean"
                    error={errors.firstName}
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 rounded-xl transition-all duration-300 border-white/20 focus:border-primary-400 focus:outline-none"
                        placeholder="Dupont"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 rounded-xl transition-all duration-300 border-white/20 focus:border-primary-400 focus:outline-none"
                      placeholder="jean.dupont@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone (optionnel)</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 rounded-xl transition-all duration-300 border-white/20 focus:border-primary-400 focus:outline-none"
                      placeholder="+1 (514) 123-4567"
                    />
                  </div>
                </div>

                {/* Contact Reason */}
                <div>
                  <label className="block text-sm font-medium mb-4">Motif de contact *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {contactReasons.map((reason) => (
                      <label key={reason.value} className="relative">
                        <input
                          type="radio"
                          value={reason.value}
                          checked={formData.contactReason === reason.value}
                          onChange={() => handleReasonChange(reason.value)}
                          className="sr-only"
                        />
                        <div className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          formData.contactReason === reason.value
                            ? 'border-primary-400 bg-primary-500/20'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}>
                          <div className="flex items-center">
                            <reason.icon className={`w-5 h-5 mr-3 ${reason.color}`} />
                            <span className="font-medium text-sm">{reason.label}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.contactReason && (
                    <p className="mt-1 text-sm text-red-400">{errors.contactReason}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium mb-2">Objet du message *</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 rounded-xl transition-all duration-300 border-white/20 focus:border-primary-400 focus:outline-none"
                      placeholder="Résumez votre demande en quelques mots"
                    />
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full p-4 bg-white/10 border-2 rounded-xl transition-all duration-300 border-white/20 focus:border-primary-400 focus:outline-none resize-none"
                    placeholder="Décrivez votre demande en détail..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Photos Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Photos (optionnel)</label>
                  <div className="relative">
                    <Image className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 rounded-xl transition-all duration-300 border-white/20 focus:border-primary-400 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-600"
                    />
                  </div>
                  <p className="text-xs text-white/50 mt-1">Formats acceptés: JPG, PNG, WebP (max 5 fichiers)</p>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                      />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & Company Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="glass-dark p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Phone className="w-5 h-5 text-secondary-400 mr-3" />
                  Informations de contact
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold">Email</p>
                      <p className="text-white/70">contact@recyclelect.ca</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold">Heures d'ouverture</p>
                      <p className="text-white/70">Lun-Ven: 9h-18h</p>
                      <p className="text-white/70">Sam: 10h-16h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold">Adresse</p>
                      <p className="text-white/70">123 Rue Tech</p>
                      <p className="text-white/70">Montréal, QC H1A 2B3</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Mission */}
              <div className="glass-dark p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Leaf className="w-5 h-5 text-green-400 mr-3" />
                  Notre mission
                </h3>
                <p className="text-white/80 mb-6">
                  <strong>RecyclElect</strong> est une entreprise en démarrage spécialisée dans la commercialisation 
                  d'équipements électroniques d'occasion. Nous promouvons la durabilité en donnant une seconde vie 
                  aux appareils électroniques.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {companyValues.map((value, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <value.icon className="w-6 h-6 text-primary-400" />
                      </div>
                      <h4 className="font-bold text-sm mb-1">{value.title}</h4>
                      <p className="text-xs text-white/60">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-dark p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold mb-6">Suivez-nous</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, color: 'hover:text-blue-400', bg: 'hover:bg-blue-400/20' },
                    { icon: Instagram, color: 'hover:text-pink-400', bg: 'hover:bg-pink-400/20' },
                    { icon: Twitter, color: 'hover:text-sky-400', bg: 'hover:bg-sky-400/20' },
                    { icon: Linkedin, color: 'hover:text-blue-600', bg: 'hover:bg-blue-600/20' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-xl transition-all duration-300 ${social.color} ${social.bg} border border-white/10 hover:border-white/30`}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20 bg-gradient-to-r from-neutral-900/80 via-primary-900/10 to-neutral-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Nos <span className="text-gradient">Politiques</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Transparence et confiance au cœur de notre relation client
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-3xl border border-white/10 overflow-hidden group hover:border-primary-400/50 transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${policy.color}`} />
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${policy.color} flex items-center justify-center mr-4`}>
                      <policy.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{policy.title}</h3>
                      <p className="text-white/60 text-sm">{policy.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {policy.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPolicy(selectedPolicy === index ? null : index)}
                    className="w-full mt-6 btn-secondary py-3 rounded-xl font-semibold flex items-center justify-center"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Questions <span className="text-gradient">Fréquentes</span>
            </h2>
            <p className="text-white/60">Les réponses aux questions les plus courantes</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "Comment puis-je vendre mon équipement ?",
                answer: "Utilisez notre formulaire de contact en sélectionnant 'Vendre mon équipement'. Incluez des photos et une description détaillée. Nous vous ferons une offre sous 24h."
              },
              {
                question: "Quelle est votre politique de garantie ?",
                answer: "Tous nos produits sont garantis entre 12 et 24 mois selon le type d'équipement. La garantie couvre les défauts de fabrication et inclut le support technique."
              },
              {
                question: "Livrez-vous partout au Canada ?",
                answer: "Oui, nous livrons gratuitement partout au Canada. Livraison standard (5-7 jours) gratuite, express (2-3 jours) pour 15$ CAD."
              },
              {
                question: "Comment puis-je faire une réclamation ?",
                answer: "Contactez-nous via le formulaire en sélectionnant 'Faire une réclamation'. Notre équipe traitera votre demande dans les 24h."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl border border-white/10"
              >
                <details className="group">
                  <summary className="p-6 cursor-pointer flex items-center justify-between">
                    <h3 className="font-bold text-lg">{faq.question}</h3>
                    <ChevronDown className="w-5 h-5 text-white/60 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-white/80">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};