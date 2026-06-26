import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { X, Plus, Minus, Info, ClipboardSignature, FileText } from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selections: { [key: string]: { name: string; price: number } },
    specialInstructions: string
  ) => void;
}

export default function ItemDetailModal({ item, onClose, onAddToCart }: ItemDetailModalProps) {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSelections, setSelectedSelections] = useState<{
    [customizationTitle: string]: { name: string; price: number };
  }>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Auto populate mandatory customizations when item shifts
  useEffect(() => {
    setQuantity(1);
    setSpecialInstructions('');
    
    const initialSelections: typeof selectedSelections = {};
    if (item.customizations) {
      item.customizations.forEach((cust) => {
        // By default, select the first available option for required ones
        if (cust.required && cust.options && cust.options.length > 0) {
          initialSelections[cust.title] = cust.options[0];
        }
      });
    }
    setSelectedSelections(initialSelections);
  }, [item]);

  const handleSelectionChange = (title: string, optName: string, optPrice: number) => {
    setSelectedSelections((prev) => ({
      ...prev,
      [title]: { name: optName, price: optPrice }
    }));
  };

  const handleCheckboxToggle = (title: string, optName: string, optPrice: number) => {
    setSelectedSelections((prev) => {
      const match = prev[title];
      if (match?.name === optName) {
        // If already selected, deselect
        const copy = { ...prev };
        delete copy[title];
        return copy;
      } else {
        // Select
        return {
          ...prev,
          [title]: { name: optName, price: optPrice }
        };
      }
    });
  };

  const calculateItemUnitPrice = () => {
    let price = item.price;
    Object.values(selectedSelections).forEach((sel: any) => {
      price += sel.price;
    });
    return price;
  };

  const itemTotal = calculateItemUnitPrice() * quantity;

  const handleAddClick = () => {
    onAddToCart(item, quantity, selectedSelections, specialInstructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#32302f]/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 overflow-y-auto">
      {/* Container Card */}
      <div className="bg-[#fdf8f6] rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-fade-in-scale plaster-texture border border-[#ccc6bb]/40 max-h-[92vh] flex flex-col">
        
        {/* Absolute header buttons */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 bg-[#fdf8f6]/70 backdrop-blur-sm hover:bg-[#ece7e5] text-brand-dark rounded-full flex items-center justify-center border border-brand-outline/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1">
          {/* Header Hero Image */}
          <div className="h-64 sm:h-80 w-full relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-beige via-brand-beige/10 to-transparent" />
            
            {/* Tags overlay */}
            <div className="absolute bottom-4 left-6 flex flex-wrap gap-1.5">
              {item.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="bg-brand-matcha text-brand-matcha-light text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full text-center"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-serif text-3xl text-brand-dark leading-tight">
                {item.name}
              </h3>
              <p className="text-xl font-serif text-[#705a49] font-bold mt-1">
                ₹{item.price.toFixed(2)}
              </p>
              <p className="text-sm text-brand-outline leading-relaxed mt-3 font-sans">
                {item.description}
              </p>
            </div>

            {/* Customization Options */}
            {item.customizations && item.customizations.length > 0 && (
              <div className="space-y-5 border-t border-[#ccc6bb]/30 pt-5">
                {item.customizations.map((cust, cIdx) => (
                  <div key={cIdx} className="space-y-2.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-serif font-bold text-brand-dark">
                        {cust.title}
                      </h4>
                      <span className="text-[10px] font-mono tracking-widest text-brand-outline uppercase">
                        {cust.required ? 'MANDATORY *' : 'OPTIONAL'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cust.options.map((opt, oIdx) => {
                        const isSelected = selectedSelections[cust.title]?.name === opt.name;

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => {
                              if (cust.required) {
                                handleSelectionChange(cust.title, opt.name, opt.price);
                              } else {
                                handleCheckboxToggle(cust.title, opt.name, opt.price);
                              }
                            }}
                            className={`p-3 rounded-xl border text-left text-xs transition-all duration-200 cursor-pointer flex justify-between items-center ${
                              isSelected
                                ? 'bg-brand-matcha-light border-brand-matcha text-brand-matcha-text font-bold shadow-sm'
                                : 'bg-brand-clay-light border-[#ccc6bb]/30 text-brand-outline hover:border-brand-matcha/40 hover:bg-[#faf6f4]'
                            }`}
                          >
                            <span className="font-sans font-medium">{opt.name}</span>
                            <span className="text-[10px] font-mono">
                              {opt.price === 0 ? 'Free' : `+₹${opt.price}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Special Instructions */}
            <div className="border-t border-[#ccc6bb]/30 pt-5">
              <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans">
                <FileText className="w-3.5 h-3.5 text-brand-matcha" />
                Dine-in remarks or slow preferences (e.g. Extra hot, no dressing)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Write specific slow requests to our chef..."
                rows={2}
                className="w-full text-xs font-sans p-3 bg-brand-clay-light border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none focus:border-brand-matcha resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer sticky panel */}
        <div className="p-6 bg-[#f2edea]/40 border-t border-[#ccc6bb]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 bg-brand-beige border border-[#ccc6bb]/30 px-4 py-2 rounded-full shadow-sm">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full bg-brand-clay hover:bg-brand-clay-high text-brand-dark flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-sans font-bold text-sm text-brand-dark w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-8 h-8 rounded-full bg-brand-matcha text-[#dcf2a6] hover:bg-brand-matcha/90 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleAddClick}
            className="w-full sm:w-auto bg-brand-wood hover:bg-brand-charcoal text-white font-sans font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-0.5 flex justify-between sm:justify-start items-center gap-6"
          >
            <span>Add to slow bag</span>
            <span className="font-mono bg-white/20 px-3 py-1 rounded-full text-[10px]">
              ₹{itemTotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
