import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineCheck, HiOutlineCreditCard, HiOutlineDeviceMobile, HiOutlineLockClosed } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const paymentOptions = [
  {
    id: 'mpesa',
    title: 'M-PESA',
    description: 'Pay with Safaricom mobile money through secure checkout.',
    icon: HiOutlineDeviceMobile,
  },
  {
    id: 'visa',
    title: 'VISA',
    description: 'Complete payment with your Visa card in the secure gateway.',
    icon: HiOutlineCreditCard,
  },
];

const formatKES = amount => `KES ${amount.toLocaleString()}`;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('mpesa');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [town, setTown] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [mpesaPin, setMpesaPin] = useState('');
  const [visaCardNumber, setVisaCardNumber] = useState('');
  const [visaExpiry, setVisaExpiry] = useState('');
  const [visaCvv, setVisaCvv] = useState('');

  const shippingFee = subtotal > 0 && subtotal < 5000 ? 450 : 0;
  const total = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee]);
  const selectedPayment = paymentOptions.find(option => option.id === selectedMethod) || paymentOptions[0];

  const canPay = items.length > 0 && !receipt;

  const validateForm = () => {
    if (!fullName.trim()) {
      toast.error('Enter your full name.');
      return false;
    }

    if (!email.trim() || !email.includes('@')) {
      toast.error('Enter a valid email address.');
      return false;
    }

    if (!phone.trim()) {
      toast.error('Enter a phone number.');
      return false;
    }

    if (!address.trim()) {
      toast.error('Enter your delivery address.');
      return false;
    }

    if (!town.trim()) {
      toast.error('Enter your town or city.');
      return false;
    }

    return true;
  };

  const completeOrder = reference => {
    setReceipt({
      reference,
      method: selectedMethod,
      amount: total,
      name: fullName,
      phone,
      email,
      address,
      town,
    });
    clearCart();
    setIsProcessing(false);
    setPaymentModalOpen(false);
    setMpesaPin('');
    setVisaCardNumber('');
    setVisaExpiry('');
    setVisaCvv('');
    toast.success('Payment confirmed. Your order is in progress.');
  };

  const openFakePaymentPrompt = () => {
    if (!validateForm() || !canPay) {
      if (!items.length) {
        navigate('/shop/women');
      }
      return;
    }

    setPaymentModalOpen(true);
  };

  const confirmFakePayment = event => {
    event.preventDefault();

    if (selectedMethod === 'mpesa') {
      if (!mpesaPin.trim() || mpesaPin.trim().length < 4) {
        toast.error('Enter a 4-digit M-PESA PIN.');
        return;
      }
    } else {
      if (!visaCardNumber.replace(/\s+/g, '').match(/^\d{13,19}$/)) {
        toast.error('Enter a valid card number.');
        return;
      }

      if (!visaExpiry.trim() || visaExpiry.trim().length < 4) {
        toast.error('Enter a valid expiry date.');
        return;
      }

      if (!visaCvv.trim() || visaCvv.trim().length < 3) {
        toast.error('Enter a valid CVV.');
        return;
      }
    }

    setIsProcessing(true);

    window.setTimeout(() => {
      completeOrder(`${selectedMethod.toUpperCase()}-${Date.now()}`);
    }, 1200);
  };

  const handlePayment = event => {
    event.preventDefault();
    openFakePaymentPrompt();
  };

  if (receipt) {
    return (
      <div className="min-h-screen bg-cream px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Link to="/shop/women" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-ink/50 hover:text-ink transition-colors">
              <HiOutlineArrowLeft className="w-4 h-4" /> Continue shopping
            </Link>
          </div>
          <div className="bg-cream border border-blush/20 shadow-sm rounded-[2rem] p-8 sm:p-10">
            <div className="w-16 h-16 rounded-full border border-green-500/20 bg-green-500/10 flex items-center justify-center mb-6">
              <HiOutlineCheck className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs tracking-[0.25em] uppercase font-sans text-ink/40 mb-3">Payment successful</p>
            <h1 className="font-serif text-4xl text-ink mb-4">Your order is confirmed</h1>
            <p className="text-sm font-sans text-ink/60 max-w-2xl mb-8">
              We received your {selectedPayment.title} payment and are preparing your order for dispatch.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <div className="border border-blush/20 rounded-2xl p-5">
                <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-ink/35 mb-2">Reference</p>
                <p className="font-sans text-sm text-ink break-all">{receipt.reference}</p>
              </div>
              <div className="border border-blush/20 rounded-2xl p-5">
                <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-ink/35 mb-2">Total paid</p>
                <p className="font-sans text-sm text-ink">{formatKES(receipt.amount)}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/shop/women" className="btn-primary text-center">
                Keep Shopping
              </Link>
              <button
                type="button"
                onClick={() => {
                  setReceipt(null);
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setAddress('');
                  setTown('');
                  setSelectedMethod('mpesa');
                }}
                className="btn-outline"
              >
                New order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="min-h-screen bg-cream px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center py-20">
          <div className="w-20 h-20 border border-blush/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">♡</span>
          </div>
          <h1 className="font-serif text-4xl text-ink mb-4">Your bag is empty</h1>
          <p className="text-sm font-sans text-ink/55 mb-8 max-w-md mx-auto">
            Add pieces to your bag before heading to checkout.
          </p>
          <Link to="/shop/women" className="btn-primary inline-flex">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link to="/shop/women" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-ink/50 hover:text-ink transition-colors">
            <HiOutlineArrowLeft className="w-4 h-4" /> Back to shopping
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] items-start">
          <motion.form
            onSubmit={handlePayment}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-cream border border-blush/20 rounded-[2rem] p-6 sm:p-8 shadow-sm"
          >
            <div className="mb-8">
              <p className="text-xs tracking-[0.25em] uppercase font-sans text-ink/40 mb-3">Secure checkout</p>
              <h1 className="font-serif text-4xl text-ink mb-3">Complete your order</h1>
              <p className="font-sans text-sm text-ink/55 max-w-2xl">
                Choose how you want to pay, then complete checkout through the secure payment flow. M-PESA sends an STK prompt to your phone, where you enter your PIN.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              {paymentOptions.map(option => {
                const Icon = option.icon;
                const active = selectedMethod === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedMethod(option.id)}
                    className={`text-left border rounded-2xl p-5 transition-colors ${active ? 'border-ink bg-ink text-cream' : 'border-blush/20 bg-champagne/20 text-ink hover:border-ink/30'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`w-11 h-11 rounded-full flex items-center justify-center border ${active ? 'border-cream/20 bg-cream/10' : 'border-blush/20 bg-cream'}`}>
                            <Icon className={`w-5 h-5 ${active ? 'text-cream' : 'text-ink'}`} />
                          </span>
                          <div>
                            <p className="font-serif text-xl">{option.title}</p>
                            <p className={`text-[10px] uppercase tracking-[0.2em] font-sans ${active ? 'text-cream/60' : 'text-ink/35'}`}>Secure payment</p>
                          </div>
                        </div>
                        <p className={`text-sm font-sans leading-6 ${active ? 'text-cream/80' : 'text-ink/60'}`}>{option.description}</p>
                      </div>
                      <span className={`text-xs tracking-[0.25em] uppercase font-sans ${active ? 'text-cream' : 'text-ink/40'}`}>
                        {active ? 'Selected' : 'Choose'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 mb-8">
              <label className="space-y-2">
                <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">Full name</span>
                <input
                  value={fullName}
                  onChange={event => setFullName(event.target.value)}
                  className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50"
                  placeholder="Your full name"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50"
                  placeholder="name@example.com"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">Phone number</span>
                <input
                  value={phone}
                  onChange={event => setPhone(event.target.value)}
                  className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50"
                  placeholder="+2547XXXXXXXX"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">Town or city</span>
                <input
                  value={town}
                  onChange={event => setTown(event.target.value)}
                  className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50"
                  placeholder="Nairobi"
                />
              </label>
              <label className="space-y-2 sm:col-span-2">
                <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">Delivery address</span>
                <textarea
                  value={address}
                  onChange={event => setAddress(event.target.value)}
                  rows={4}
                  className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50 resize-none"
                  placeholder="Street, building, apartment, landmark"
                />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-t border-blush/20 pt-6">
              <div className="flex items-center gap-2 text-sm font-sans text-ink/45">
                <HiOutlineLockClosed className="w-4 h-4" />
                Secure checkout powered by Flutterwave
              </div>
              <button type="submit" disabled={isProcessing} className="btn-primary min-w-[220px] disabled:opacity-60 disabled:cursor-not-allowed">
                {isProcessing ? 'Processing…' : `Pay with ${selectedPayment.title} · ${formatKES(total)}`}
              </button>
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="bg-ink text-cream rounded-[2rem] p-6 sm:p-8 shadow-2xl sticky top-6"
          >
            <p className="text-xs tracking-[0.25em] uppercase font-sans text-cream/45 mb-3">Order summary</p>
            <h2 className="font-serif text-3xl mb-6">Your bag</h2>

            <div className="space-y-4 max-h-[28rem] overflow-y-auto pr-1">
              {items.map(item => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 pb-4 border-b border-cream/10 last:border-0 last:pb-0">
                  <img src={item.images[0]} alt={item.name} className="w-16 h-20 object-cover rounded-xl bg-cream/10 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-cream/55 capitalize mt-1">{item.size} · {item.color}</p>
                    <div className="flex items-center justify-between gap-3 mt-3 text-xs text-cream/55">
                      <span>Qty {item.quantity}</span>
                      <span>{formatKES(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-cream/10 space-y-3 text-sm font-sans">
              <div className="flex items-center justify-between text-cream/70">
                <span>Subtotal</span>
                <span>{formatKES(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-cream/70">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : formatKES(shippingFee)}</span>
              </div>
              <div className="flex items-center justify-between text-base pt-2 border-t border-cream/10">
                <span>Total</span>
                <span>{formatKES(total)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cream/10 bg-cream/5 p-4 text-sm leading-6 text-cream/75">
              {selectedMethod === 'mpesa' ? 'This is a fake M-PESA prompt for testing. Enter any 4-digit PIN to simulate approval.' : 'This is a fake Visa card flow for testing. Use any valid-looking card details to simulate payment.'}
            </div>
          </motion.aside>
        </div>
      </div>

      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/55 backdrop-blur-sm flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg rounded-[2rem] bg-cream border border-blush/20 shadow-2xl p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-ink/35 mb-2">Mock checkout</p>
                <h2 className="font-serif text-3xl text-ink">{selectedPayment.title} prompt</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPaymentModalOpen(false);
                  setIsProcessing(false);
                }}
                className="text-ink/40 hover:text-ink transition-colors"
                aria-label="Close payment prompt"
              >
                <HiOutlineArrowLeft className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <form onSubmit={confirmFakePayment} className="space-y-5">
              <div className="rounded-2xl border border-blush/20 bg-champagne/20 p-4 text-sm text-ink/70 leading-6">
                {selectedMethod === 'mpesa'
                  ? `Fake STK push sent to ${phone || 'the phone number you entered'}. Approve it by entering a 4-digit PIN below.`
                  : 'Enter mock card details to simulate a successful Visa payment.'}
              </div>

              {selectedMethod === 'mpesa' ? (
                <label className="space-y-2 block">
                  <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">M-PESA PIN</span>
                  <input
                    value={mpesaPin}
                    onChange={event => setMpesaPin(event.target.value)}
                    inputMode="numeric"
                    maxLength={4}
                    className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50"
                    placeholder="1234"
                  />
                </label>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 sm:col-span-2 block">
                    <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">Card number</span>
                    <input
                      value={visaCardNumber}
                      onChange={event => setVisaCardNumber(event.target.value)}
                      className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50"
                      placeholder="4242 4242 4242 4242"
                    />
                  </label>
                  <label className="space-y-2 block">
                    <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">Expiry</span>
                    <input
                      value={visaExpiry}
                      onChange={event => setVisaExpiry(event.target.value)}
                      className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50"
                      placeholder="12/28"
                    />
                  </label>
                  <label className="space-y-2 block">
                    <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">CVV</span>
                    <input
                      value={visaCvv}
                      onChange={event => setVisaCvv(event.target.value)}
                      inputMode="numeric"
                      maxLength={4}
                      className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50"
                      placeholder="123"
                    />
                  </label>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentModalOpen(false);
                    setIsProcessing(false);
                  }}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" disabled={isProcessing} className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isProcessing ? 'Processing…' : `Confirm ${selectedPayment.title}`}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}