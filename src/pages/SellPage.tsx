import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, type SubmitHandler, type UseFormRegister, type FieldError, type UseFormGetValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  Mail, 
  Phone, 
  ChevronRight, 
  ArrowLeft,
  Laptop, 
  UploadCloud, 
  Trash2,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import React from 'react';

// Schéma de validation avec Zod
const sellSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("L'adresse email est invalide"),
  phone: z.string().optional(),
  deviceType: z.string().min(1, "Le type d'appareil est requis"),
  brand: z.string().min(2, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  description: z.string().min(10, "Donnez une description d'au moins 10 caractères"),
  photos: z.array(z.instanceof(File)).min(1, "Veuillez télécharger au moins une photo").max(5, "Maximum 5 photos"),
});

type SellFormInputs = z.infer<typeof sellSchema>;

const steps = [
  { id: 1, name: 'Contact', fields: ['firstName', 'lastName', 'email', 'phone'] as const },
  { id: 2, name: 'Appareil', fields: ['deviceType', 'brand', 'model', 'description'] as const },
  { id: 3, name: 'Photos', fields: ['photos'] as const },
  { id: 4, name: 'Révision', fields: [] as const },
];

export const SellPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, trigger, getValues, watch, reset, formState: { errors } } = useForm<SellFormInputs>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      photos: []
    }
  });

  const photos = watch('photos', []);

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  const onSubmit: SubmitHandler<SellFormInputs> = (data) => {
    console.log(data);
    // Logique de soumission du formulaire
    toast.success('Votre demande a été envoyée !', {
      description: "Notre équipe l'examinera et vous contactera sous peu.",
      duration: 5000,
    });
    reset();
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-24 pb-12 overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-cyber opacity-5"></div>
      <div className="relative max-w-4xl mx-auto px-4 w-full flex-grow flex flex-col">
        
    <motion.div
          initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gradient mb-4">
            Vendez votre appareil
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Suivez ces quelques étapes simples pour obtenir une offre pour votre matériel électronique. C'est rapide, juste et sécurisé.
          </p>
        </motion.div>

        <div className="glass-dark rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col">
          {/* Indicateur d'étapes */}
          <div className="flex items-center w-full mb-10">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center flex-shrink-0">
                  <motion.div
                    animate={currentStep >= index ? "active" : "inactive"}
                    variants={{
                      active: { scale: 1.1, backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' },
                      inactive: { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold"
                  >
                    {currentStep > index ? '✓' : step.id}
                  </motion.div>
                  <p className={`ml-4 font-semibold hidden md:block ${currentStep >= index ? 'text-white' : 'text-white/50'}`}>{step.name}</p>
          </div>
                {index < steps.length - 1 && (
                  <motion.div
                    className="h-1 rounded-full mx-4 flex-grow"
                    initial={false}
                    animate={{ backgroundColor: currentStep > index ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)' }}
                  />
                )}
              </React.Fragment>
            ))}
      </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
            <div className="flex-grow">
              <AnimatePresence mode="wait">
    <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 0 && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField label="Prénom" name="firstName" register={register} error={errors.firstName} icon={User} />
                      <InputField label="Nom" name="lastName" register={register} error={errors.lastName} icon={User} />
                      <InputField label="Email" name="email" type="email" register={register} error={errors.email} icon={Mail} className="md:col-span-2" />
                      <InputField label="Téléphone (Optionnel)" name="phone" type="tel" register={register} error={errors.phone} icon={Phone} className="md:col-span-2" />
        </div>
                  )}
                  {currentStep === 1 && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField label="Type d'appareil" name="deviceType" register={register} error={errors.deviceType} icon={Laptop} placeholder="Ex: Ordinateur portable" />
                      <InputField label="Marque" name="brand" register={register} error={errors.brand} icon={Laptop} placeholder="Ex: Apple" />
                      <InputField label="Modèle" name="model" register={register} error={errors.model} icon={Laptop} placeholder="Ex: MacBook Pro 13&quot; 2019" />
                      <TextareaField label="Description de l'état" name="description" register={register} error={errors.description} className="md:col-span-2" />
      </div>
                  )}
                  {currentStep === 2 && (
                    <PhotoUploadField name="photos" register={register} error={errors.photos} photos={photos} />
                  )}
                  {currentStep === 3 && (
                    <ReviewStep getValues={getValues} photos={photos} />
      )}
    </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation du formulaire */}
            <div className="mt-10 flex justify-between items-center">
              <motion.button
                type="button"
                onClick={prevStep}
                className="btn-secondary py-3 px-6 rounded-xl flex items-center font-semibold"
                style={{ visibility: currentStep > 0 ? 'visible' : 'hidden' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Précédent
              </motion.button>
              
              {currentStep < steps.length - 1 && (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary text-white py-3 px-6 rounded-xl flex items-center font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Suivant
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.button>
              )}
              {currentStep === steps.length - 1 && (
                <motion.button
                  type="submit"
                  className="btn-primary text-white py-3 px-6 rounded-xl font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Envoyer ma demande
                </motion.button>
              )}
            </div>
          </form>
            </div>
            </div>
          </div>
        );
};

// --- Composants du formulaire ---

interface InputFieldProps {
    label: string;
    name: keyof SellFormInputs;
    type?: string;
    register: UseFormRegister<SellFormInputs>;
    error?: FieldError;
    icon?: LucideIcon;
    className?: string;
    placeholder?: string;
}

const InputField = ({ label, name, type = 'text', register, error, icon: Icon, className = '', placeholder = '' }: InputFieldProps) => (
  <div className={`relative ${className}`}>
    <label htmlFor={name} className="block text-sm font-medium text-white/80 mb-2">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full bg-white/5 border-2 rounded-xl py-3 pr-4 transition-all duration-300 ${Icon ? 'pl-12' : 'pl-4'} ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-primary-400'} focus:outline-none focus:ring-0`}
                />
              </div>
    {error && <p className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{error.message}</p>}
          </div>
        );

interface TextareaFieldProps {
    label: string;
    name: keyof SellFormInputs;
    register: UseFormRegister<SellFormInputs>;
    error?: FieldError;
    className?: string;
}

const TextareaField = ({ label, name, register, error, className = '' }: TextareaFieldProps) => (
  <div className={`relative ${className}`}>
    <label htmlFor={name} className="block text-sm font-medium text-white/80 mb-2">{label}</label>
    <textarea
      id={name}
      rows={4}
      {...register(name)}
      className={`w-full bg-white/5 border-2 rounded-xl py-3 px-4 transition-all duration-300 ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-primary-400'} focus:outline-none focus:ring-0`}
      placeholder="Décrivez les défauts esthétiques ou fonctionnels, l'état de la batterie, etc."
    />
    {error && <p className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{error.message}</p>}
          </div>
        );

interface PhotoUploadFieldProps {
    name: 'photos';
    register: UseFormRegister<SellFormInputs>;
    error?: FieldError | { message?: string };
    photos: File[];
}

const PhotoUploadField = ({ name, register, error, photos }: PhotoUploadFieldProps) => {
  const { onChange, ...rest } = register(name);

  return (
    <div>
      <label className="block text-sm font-medium text-white/80 mb-2">Photos de votre appareil</label>
      <div className="mt-2 flex justify-center rounded-2xl border-2 border-dashed border-white/20 px-6 py-10">
        <div className="text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-white/40" />
          <div className="mt-4 flex text-sm leading-6 text-white/60">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold text-primary-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 focus-within:ring-offset-neutral-900 hover:text-primary-300"
            >
              <span>Téléchargez des fichiers</span>
              <input 
                id="file-upload" 
                type="file" 
                className="sr-only" 
                multiple
                accept="image/*"
                onChange={(e) => {
                    const files = e.target.files ? Array.from(e.target.files) : [];
                    onChange({ target: { name, value: files } });
                }}
                {...rest}
              />
            </label>
            <p className="pl-1">ou glissez-déposez</p>
          </div>
          <p className="text-xs leading-5 text-white/50">PNG, JPG, GIF jusqu'à 10MB (max 5)</p>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{error?.message}</p>}

      {photos && photos.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-white/80">Aperçu :</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {photos.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Aperçu ${index}`}
                  className="w-full h-24 object-cover rounded-lg"
                  onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button type="button" className="text-red-500 hover:text-red-400">
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
            )}
          </div>
  );
};

interface ReviewStepProps {
    getValues: UseFormGetValues<SellFormInputs>;
    photos: File[];
}

const ReviewStep = ({ getValues, photos }: ReviewStepProps) => {
  const values = getValues();
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gradient">Vérifiez vos informations</h3>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        <ReviewItem label="Prénom" value={values.firstName} />
        <ReviewItem label="Nom" value={values.lastName} />
        <ReviewItem label="Email" value={values.email} />
        <ReviewItem label="Téléphone" value={values.phone || 'Non fourni'} />
        <ReviewItem label="Type d'appareil" value={values.deviceType} />
        <ReviewItem label="Marque" value={values.brand} />
        <ReviewItem label="Modèle" value={values.model} />
        <ReviewItem label="Description" value={values.description} className="md:col-span-2" />
              </div>
      <div>
        <h4 className="text-lg font-semibold text-white/80 mb-2">Photos</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {photos.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Aperçu ${index}`}
              className="w-full h-24 object-cover rounded-lg"
              onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 

interface ReviewItemProps {
    label: string;
    value?: string;
    className?: string;
}

const ReviewItem = ({ label, value, className = '' }: ReviewItemProps) => (
  <div className={className}>
    <p className="text-sm text-white/60">{label}</p>
    <p className="font-semibold text-white">{value}</p>
  </div>
); 