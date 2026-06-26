import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ChevronRight, Clipboard, ShoppingCart, ShieldAlert, CheckCircle, Truck, HelpCircle, UtensilsCrossed } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  openNotification: (msg: string) => void;
}

type OrderStage = 'pending' | 'preparing' | 'cooking' | 'serving' | 'success';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  openNotification,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState<'dine-in' | 'delivery'>('dine-in');
  const [tableNumber, setTableNumber] = useState('A1'); // Default table
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  
  // Kitchen state
  const [orderStage, setOrderStage] = useState<OrderStage>('pending');
  const [activeReceipt, setActiveReceipt] = useState<{
    orderId: string;
    subtotal: number;
    taxes: number;
    grandTotal: number;
  } | null>(null);

  // Math totals
  const subtotal = cart.reduce((sums, item) => {
    let unitPrice = item.item.price;
    Object.values(item.selectedSelections).forEach((sel) => {
      unitPrice += sel.price;
    });
    return sums + unitPrice * item.quantity;
  }, 0);

  const packagingFee = deliveryType === 'delivery' ? 50 : 0;
  const taxes = subtotal * 0.05; // 5% CGST+SGST
  const total = subtotal + packagingFee + taxes;

  // kitchen state timer effects
  useEffect(() => {
    let timer1: any, timer2: any, timer3: any;
    if (orderStage === 'preparing') {
      timer1 = setTimeout(() => {
        setOrderStage('cooking');
        openNotification('🔥 Cooking in action! Our chef is grilling your avo sourdough.');
      }, 5000);
    } else if (orderStage === 'cooking') {
      timer2 = setTimeout(() => {
        setOrderStage('serving');
        openNotification('🍵 Plating and whisking! Adding microgreens and final drizzles.');
      }, 5000);
    } else if (orderStage === 'serving') {
      timer3 = setTimeout(() => {
        setOrderStage('success');
        openNotification('🎉 Served! Your slow feast has arrived safely at your table.');
      }, 5000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [orderStage]);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      openNotification('⚠️ Your slow bag is empty. Explore and select a brew!');
      return;
    }

    if (deliveryType === 'delivery' && (!address.trim() || !phone.trim())) {
      openNotification('⚠️ Please enter your delivery address and contact phone number.');
      return;
    }

    // Set active receipt
    setActiveReceipt({
      orderId: 'YOU-ORDER-' + Math.floor(1000 + Math.random() * 9000),
      subtotal,
      taxes,
      grandTotal: total
    });

    setOrderStage('preparing');
    openNotification('👨‍🍳 Order received! Our kitchen is preparing the slow breakfast.');
  };

  const handleResetOrder = () => {
    onClearCart();
    setOrderStage('pending');
    setActiveReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Black Translucent backdrop */}
      <div
        className="fixed inset-0 bg-[#32302f]/50 backdrop-blur-sm transition-opacity"
        onClick={orderStage === 'pending' ? onClose : undefined}
      />

      {/* Slideout Container */}
      <div className="relative w-full max-w-md bg-[#fdf8f6] h-full shadow-2xl flex flex-col z-[1001] border-l border-[#ccc6bb]/40 plaster-texture overflow-hidden">
        
        {/* Header bar */}
        <div className="p-6 border-b border-[#ccc6bb]/30 flex justify-between items-center bg-[#f2edea]/45">
          <div className="flex items-center gap-2 text-brand-dark">
            <ShoppingCart className="w-5 h-5 text-brand-wood" />
            <h4 className="font-serif text-xl font-bold leading-none">
              Your Slow Bag
            </h4>
          </div>
          {orderStage === 'pending' && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-brand-clay hover:bg-brand-clay-high text-brand-dark flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dynamic content panels based on Kitchen stages */}
        {orderStage === 'pending' ? (
          /* PANNER 1: STANDARD SHOPPING CART */
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 bg-brand-clay rounded-full flex items-center justify-center mx-auto text-brand-outline">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <h5 className="font-serif text-lg text-brand-dark">Bag is Empty</h5>
                  <p className="text-xs text-brand-outline max-w-xs mx-auto leading-relaxed">
                    Browse our slow-living creations to build your perfect mindful meal.
                  </p>
                </div>
              ) : (
                cart.map((cartItem) => {
                  const hasSelections = Object.keys(cartItem.selectedSelections).length > 0;
                  
                  // calculated unit item price with customizations
                  let customPrice = cartItem.item.price;
                  Object.values(cartItem.selectedSelections).forEach(c => {
                    customPrice += c.price;
                  });

                  return (
                    <div
                      key={cartItem.cartId}
                      className="p-4 rounded-2xl bg-brand-clay-light border border-[#ccc6bb]/25 flex gap-4 hover:border-[#ccc6bb]/70 transition-all duration-200 shadow-sm"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 clay-shadow">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h5 className="font-serif text-sm text-brand-dark font-bold leading-snug line-clamp-1">
                              {cartItem.item.name}
                            </h5>
                            <button
                              onClick={() => {
                                onRemoveItem(cartItem.cartId);
                                openNotification(`🗑️ Removed ${cartItem.item.name}`);
                              }}
                              className="text-brand-outline hover:text-red-700 p-1 rounded-full transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Selections details list item */}
                          {hasSelections && (
                            <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-brand-outline">
                              {Object.entries(cartItem.selectedSelections).map(([title, selected]) => (
                                <span
                                  key={title}
                                  className="bg-[#ece7e5] px-2 py-0.5 rounded-md border border-[#ccc6bb]/30"
                                >
                                  {selected.name} (+₹{selected.price})
                                </span>
                              ))}
                            </div>
                          )}

                          {cartItem.specialInstructions && (
                            <p className="text-[10px] italic text-[#705a49] mt-1 font-mono">
                              * Notes: "{cartItem.specialInstructions}"
                            </p>
                          )}
                        </div>

                        {/* Adjust quantities */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-2 bg-brand-beige border border-[#ccc6bb]/30 px-2 py-0.5 rounded-full inline-flex">
                            <button
                              onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                              className="w-5 h-5 rounded-full text-brand-outline hover:bg-brand-clay-highest flex items-center justify-center cursor-pointer font-bold"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-brand-dark font-sans text-center w-4">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                              className="w-5 h-5 rounded-full text-brand-outline hover:bg-brand-clay-highest flex items-center justify-center cursor-pointer font-bold"
                            >
                              +
                            </button>
                          </div>

                          <p className="text-xs font-mono font-bold text-brand-wood">
                            ₹{(customPrice * cartItem.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Delivery fields structure */}
              {cart.length > 0 && (
                <div className="border-t border-[#ccc6bb]/30 pt-4 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#705a49] uppercase block mb-2 font-bold">
                      DELIVERY SPECIFICATION
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDeliveryType('dine-in')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-sans font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          deliveryType === 'dine-in'
                            ? 'bg-brand-matcha text-white'
                            : 'bg-brand-clay-light border-[#ccc6bb]/30 text-brand-outline hover:bg-[#faf6f4]'
                        }`}
                      >
                        <UtensilsCrossed className="w-3.5 h-3.5" />
                        At Table (Dine-in)
                      </button>
                      <button
                        onClick={() => setDeliveryType('delivery')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-sans font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          deliveryType === 'delivery'
                            ? 'bg-brand-matcha text-white'
                            : 'bg-brand-clay-light border-[#ccc6bb]/30 text-brand-outline hover:bg-[#faf6f4]'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Door Delivery
                      </button>
                    </div>
                  </div>

                  {/* Mode input specifics */}
                  {deliveryType === 'dine-in' ? (
                    <div>
                      <label className="block text-[11px] font-bold text-brand-wood uppercase tracking-wider mb-1 font-sans">
                        Select Diner Table ID
                      </label>
                      <select
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full text-xs font-sans p-2.5 bg-brand-clay-light border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none"
                      >
                        {['A1', 'A2', 'C1', 'C3', 'P2', 'W1', 'W4'].map((tbl) => (
                          <option key={tbl} value={tbl}>
                            Sanctuary Table {tbl}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Full Delivery Address in KASGNJ, KASGNJ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full text-xs font-sans p-2.5 bg-brand-clay-light border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="Diner Contact Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs font-sans p-2.5 bg-brand-clay-light border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Calculations and submit sticky bottom footer panel */}
            {cart.length > 0 && (
              <div className="bg-[#f2edea]/45 border-t border-[#ccc6bb]/30 p-6 space-y-4">
                <div className="space-y-1.5 font-sans text-xs">
                  <div className="flex justify-between text-brand-outline">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {deliveryType === 'delivery' && (
                    <div className="flex justify-between text-brand-outline">
                      <span>Eco-Packaging & Courier fee</span>
                      <span>₹{packagingFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-outline">
                    <span>CGST + SGST (5%)</span>
                    <span>₹{taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-dark font-serif font-bold text-sm border-t border-[#ccc6bb]/20 pt-2 mt-2">
                    <span>Total Amount</span>
                    <span className="text-brand-wood text-base">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-brand-wood hover:bg-brand-charcoal text-white font-sans font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  Send to Kitchen
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* PANNER 2: REAL-TIME KITCHEN ORDER TRACKER FLOW */
          <div className="flex-1 overflow-y-auto p-6 text-center flex flex-col justify-between">
            <div className="space-y-6 pt-8">
              {orderStage !== 'success' ? (
                <>
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-[#ccc6bb]/30 rounded-full" />
                    <div className="absolute inset-0 border-4 border-brand-matcha rounded-full border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-brand-wood font-serif text-xs font-bold font-mono">
                      {orderStage === 'preparing' ? 'Mulling' : orderStage === 'cooking' ? 'Fires' : 'Whipping'}
                    </div>
                  </div>

                  <span className="text-[10px] tracking-widest text-[#705a49] font-bold uppercase font-mono">
                    ORDER IN PROGRESS • ACTIVE TRACKER
                  </span>

                  <h4 className="font-serif text-2xl text-brand-dark leading-tight">
                    {orderStage === 'preparing'
                      ? 'Whacking Flour'
                      : orderStage === 'cooking'
                      ? 'Slow Fires Cooking'
                      : 'Whipping & Plating'}
                  </h4>

                  <p className="text-xs text-brand-outline max-w-xs mx-auto leading-relaxed">
                    {orderStage === 'preparing'
                      ? 'Our chefs have checked our stock. Slicing artisanal sourdough and matching farm eggs.'
                      : orderStage === 'cooking'
                      ? 'Toasting seeds to deep golden browns, fires are heating the dashi custard bases with care.'
                      : 'Noodles are matching spring onions and the matcha latte is receiving delicate foam leaves.'}
                  </p>
                </>
              ) : (
                <div className="animate-fade-in-scale">
                  <div className="w-20 h-20 bg-brand-matcha-light rounded-full flex items-center justify-center mx-auto mb-4 border border-[#ccc6bb]/40">
                    <CheckCircle className="w-10 h-10 text-brand-matcha-text" />
                  </div>
                  <span className="text-[10px] tracking-widest text-brand-matcha-text font-bold uppercase font-mono">
                    MEAL APPOINTED SUCCESS
                  </span>
                  <h4 className="font-serif text-3xl text-brand-dark leading-tight mt-1">
                    Bon Appétit!
                  </h4>
                  <p className="text-xs text-brand-outline max-w-xs mx-auto leading-relaxed mt-2">
                    Your gourmet creations are fully assembled with love and laid down in front of you.
                  </p>
                </div>
              )}

              {/* Graphical status steps timeline map */}
              <div className="space-y-3 bg-brand-clay/35 rounded-2xl p-5 text-left border border-[#ccc6bb]/30 max-w-xs mx-auto">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      orderStage !== 'pending' ? 'bg-brand-matcha text-white' : 'bg-[#ece7e5] text-brand-outline'
                    }`}
                  >
                    1
                  </div>
                  <span
                    className={`text-xs font-sans font-bold ${
                      orderStage !== 'pending' ? 'text-brand-dark' : 'text-brand-outline'
                    }`}
                  >
                    Kitchen Prep Secured
                  </span>
                </div>

                <div className="w-0.5 h-4 bg-[#ccc6bb]/50 ml-2.5" />

                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      orderStage === 'cooking' || orderStage === 'serving' || orderStage === 'success'
                        ? 'bg-brand-matcha text-white'
                        : 'bg-[#ece7e5] text-brand-outline'
                    }`}
                  >
                    2
                  </div>
                  <span
                    className={`text-xs font-sans font-bold ${
                      orderStage === 'cooking' || orderStage === 'serving' || orderStage === 'success'
                        ? 'text-brand-dark'
                        : 'text-brand-outline'
                    }`}
                  >
                    Roasting & Cooking
                  </span>
                </div>

                <div className="w-0.5 h-4 bg-[#ccc6bb]/50 ml-2.5" />

                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      orderStage === 'serving' || orderStage === 'success'
                        ? 'bg-brand-matcha text-white'
                        : 'bg-[#ece7e5] text-brand-outline'
                    }`}
                  >
                    3
                  </div>
                  <span
                    className={`text-xs font-sans font-bold ${
                      orderStage === 'serving' || orderStage === 'success'
                        ? 'text-brand-dark'
                        : 'text-brand-outline'
                    }`}
                  >
                    Whipped & Served
                  </span>
                </div>
              </div>
            </div>

            {/* Receipt Summary printable layout block */}
            {activeReceipt && (
              <div className="border border-[#ccc6bb]/40 rounded-2xl p-4 bg-brand-clay-light text-left font-mono text-[10px] space-y-2 mt-4 text-brand-outline">
                <div className="flex justify-between border-b border-[#ccc6bb]/25 pb-2 text-brand-dark font-bold">
                  <span>ORDER CODE</span>
                  <span>{activeReceipt.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span>₹{activeReceipt.subtotal.toFixed(2)}</span>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>COURIER PACK</span>
                    <span>₹50.00</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>CGST & SGST (5%)</span>
                  <span>₹{activeReceipt.taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-[#ccc6bb]/20 pt-2 text-brand-dark font-bold text-xs mt-1">
                  <span>GRAND TOTAL</span>
                  <span className="text-brand-wood">₹{activeReceipt.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* CTA action closing/clearing flow */}
            <div className="pt-6">
              {orderStage === 'success' ? (
                <button
                  onClick={handleResetOrder}
                  className="w-full bg-brand-matcha hover:bg-brand-matcha/90 text-white font-sans font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-lg transition-all cursor-pointer"
                >
                  Close & clear bag
                </button>
              ) : (
                <div className="text-[10px] text-brand-outline font-sans flex items-center justify-center gap-1.5 p-2 bg-brand-clay-light rounded-xl border border-[#ccc6bb]/25">
                  <ShieldAlert className="w-3.5 h-3.5 text-brand-matcha" />
                  Please hold tight, we are heating your breakfast companion.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
