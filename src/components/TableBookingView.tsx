import React, { useState } from 'react';
import { CAFE_SECTIONS, TIME_SLOTS } from '../data';
import { TableBooking } from '../types';
import { Calendar, Users, Clock, MapPin, ChevronRight, Check, Sparkles, Smile, Download, HelpCircle } from 'lucide-react';

interface TableBookingViewProps {
  onAddBooking: (booking: TableBooking) => void;
  openNotification: (msg: string) => void;
}

export default function TableBookingView({ onAddBooking, openNotification }: TableBookingViewProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Default to tomorrow
  );
  const [selectedGuests, setSelectedGuests] = useState<number>(2);
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[3]); // Default to 12:30 PM
  const [selectedSection, setSelectedSection] = useState<'atrium' | 'cozy-corners' | 'panda-niches' | 'wellness-matcha'>('atrium');
  const [selectedTable, setSelectedTable] = useState<string>('');
  
  // User Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState('');
  
  // State
  const [bookingCompleted, setBookingCompleted] = useState<TableBooking | null>(null);

  const sectionData = CAFE_SECTIONS.find(sec => sec.id === selectedSection);

  const handleTableToggle = (tableId: string, status: string) => {
    if (status === 'occupied') {
      openNotification('😔 Traditional seating is currently occupied. Please choose another slow-living table.');
      return;
    }
    setSelectedTable(tableId);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      openNotification('⚠️ Please select a specific table on our physical seat-map layout.');
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      openNotification('⚠️ Please fill in all required customer reservation contacts.');
      return;
    }

    const newBooking: TableBooking = {
      id: 'YOU-' + Math.floor(100000 + Math.random() * 900000),
      date: selectedDate,
      timeSlot: selectedSlot,
      guests: selectedGuests,
      sectionId: selectedSection,
      tableNumber: selectedTable,
      userName: name,
      userEmail: email,
      userPhone: phone,
      specialRequests: requests,
      confirmedAt: new Date().toISOString()
    };

    onAddBooking(newBooking);
    setBookingCompleted(newBooking);
    openNotification(`🎉 Seat reserved successfully! Table ${selectedTable} is waiting for you.`);
  };

  const currentSectionTables = sectionData ? sectionData.tables : [];

  return (
    <div className="bg-[#fcfbf9] rounded-3xl border border-[#ccc6bb]/40 p-6 md:p-8 clay-shadow plaster-texture">
      {!bookingCompleted ? (
        <form onSubmit={handleBookingSubmit} className="space-y-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs tracking-widest text-brand-matcha font-bold uppercase font-sans">
              INDULGE IN INTENTIONALITY
            </span>
            <h3 className="font-serif text-3xl text-brand-dark mt-2 mb-2">
              Book a Slow Bench
            </h3>
            <p className="text-sm text-brand-outline font-sans">
              We hold specific corners of our KASGNJ sanctuary for slow collaboration, readings, or quiet mindful gatherings.
            </p>
          </div>

          {/* Core Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans">
                <Calendar className="w-3.5 h-3.5 text-brand-matcha" />
                Select Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full text-sm font-sans p-3 bg-[#f2edea]/45 border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none focus:border-brand-matcha focus:ring-1 focus:ring-brand-matcha transition-colors"
                required
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans">
                <Users className="w-3.5 h-3.5 text-brand-matcha" />
                Number of Guests
              </label>
              <select
                value={selectedGuests}
                onChange={(e) => setSelectedGuests(Number(e.target.value))}
                className="w-full text-sm font-sans p-3 bg-[#f2edea]/45 border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none focus:border-brand-matcha transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 8].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Slot */}
            <div>
              <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans">
                <Clock className="w-3.5 h-3.5 text-brand-matcha" />
                Select Hours
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full text-sm font-sans p-3 bg-[#f2edea]/45 border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none focus:border-brand-matcha transition-colors"
              >
                {TIME_SLOTS.map((slot, sIdx) => (
                  <option key={sIdx} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Seating Section Buttons */}
          <div>
            <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-3 flex items-center gap-1.5 font-sans">
              <MapPin className="w-3.5 h-3.5 text-brand-matcha" />
              Seating Quadrant
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {CAFE_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    setSelectedSection(sec.id);
                    setSelectedTable(''); // Reset selected table
                  }}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    selectedSection === sec.id
                      ? 'bg-brand-matcha-light/65 border-brand-matcha text-brand-matcha-text shadow-sm'
                      : 'bg-[#fdf8f6] border-[#ccc6bb]/30 text-brand-outline hover:border-[#ccc6bb]/90 hover:bg-[#faf6f4]'
                  }`}
                >
                  <p className="text-xs font-bold tracking-tight mb-0.5 leading-none">{sec.name}</p>
                  <p className="text-[10px] leading-tight text-opacity-80 font-sans line-clamp-1">{sec.tagline}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Seating Map Grid (Interactive Seat Selection) */}
          <div className="bg-[#f2edea]/40 border border-[#ccc6bb]/40 rounded-2xl p-5 md:p-6 text-center">
            <div className="flex justify-between items-center mb-4">
              <div className="text-left">
                <h4 className="text-sm font-serif text-brand-dark font-bold leading-tight">
                  {sectionData?.name} Layout Plan
                </h4>
                <p className="text-xs text-brand-outline font-sans">
                  {sectionData?.capacityNotes}
                </p>
              </div>
              <div className="flex gap-3 text-[11px] text-brand-outline font-sans">
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-brand-clay-high border border-brand-outline/20" /> Vacant
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-brand-matcha" /> Selected
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-brand-clay-highest text-white" /> Occupied
                </span>
              </div>
            </div>

            {/* Simulated Seating Visual Plan */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-brand-beige rounded-xl border border-[#ccc6bb]/20">
              {currentSectionTables.map((tbl) => {
                const isSelected = selectedTable === tbl.id;
                const isOccupied = tbl.status === 'occupied';

                return (
                  <button
                    key={tbl.id}
                    type="button"
                    onClick={() => handleTableToggle(tbl.id, tbl.status)}
                    className={`h-20 rounded-xl relative flex flex-col justify-between p-3 border transition-all duration-300 ${
                      isSelected
                        ? 'bg-brand-matcha border-brand-matcha text-white clay-shadow scale-[1.03]'
                        : isOccupied
                        ? 'bg-brand-clay-highest text-brand-outline/70 border-[#ccc6bb]/20 cursor-not-allowed opacity-60'
                        : 'bg-[#fcfbf9] border-[#ccc6bb]/30 text-brand-dark hover:border-brand-matcha/40 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] font-mono leading-none tracking-wider">
                        {tbl.id}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>

                    <span className="text-xs font-serif font-bold text-center w-full leading-none">
                      {tbl.label}
                    </span>

                    <span className="text-[9px] w-full text-center tracking-wide uppercase font-sans">
                      {tbl.seats} Seats {isOccupied && '(Occupied)'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Detail Input fields */}
          <div className="border-t border-[#ccc6bb]/30 pt-6">
            <h4 className="text-sm font-serif text-brand-dark font-bold mb-4">
              Your Secure Seating Contacts
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2 font-sans">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kabir Sen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm font-sans p-3 bg-brand-beige border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none focus:border-brand-matcha focus:ring-1 focus:ring-brand-matcha"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2 font-sans">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="kabir@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm font-sans p-3 bg-brand-beige border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none focus:border-brand-matcha"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2 font-sans">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm font-sans p-3 bg-brand-beige border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none focus:border-brand-matcha"
                  required
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2 font-sans">
                Crucial Seating Request (e.g. Birthday, Wheat allergy, etc.)
              </label>
              <textarea
                rows={2}
                placeholder="Let us know what makes your KASGNJ visit comfortable..."
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                className="w-full text-sm font-sans p-3 bg-brand-beige border border-[#ccc6bb]/40 rounded-xl text-brand-dark focus:outline-none focus:border-brand-matcha resize-none"
              />
            </div>
          </div>

          {/* CTA Form Button */}
          <button
            type="submit"
            className="w-full bg-brand-wood hover:bg-brand-carcoal text-white font-sans font-bold text-sm uppercase tracking-widest py-4 px-8 rounded-full shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            Confirm Reservation Table
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        /* CONFIRMED VISUAL TICKET */
        <div className="text-center py-6 animate-fade-in-scale max-w-lg mx-auto">
          <div className="w-16 h-16 bg-[#bacf86]/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Sparkles className="w-8 h-8 text-brand-matcha-text" />
          </div>

          <h3 className="font-serif text-3xl text-brand-dark leading-tight">
            Ritual Appointed!
          </h3>
          <p className="text-sm text-brand-outline font-sans mt-1">
            Your slower moments are now secured in our Mumbai sanctuary.
          </p>

          {/* Visual Ticket Layout Card */}
          <div className="my-8 bg-brand-beige border-2 border-dashed border-[#ccc6bb]/60 rounded-3xl p-6 relative shadow-lg overflow-hidden text-left font-sans">
            {/* Cutout side bubbles for retro visual ticket effect */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#fcfbf9] border-r-2 border-[#ccc6bb]/40 rounded-full transform -translate-y-1/2" />
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#fcfbf9] border-l-2 border-[#ccc6bb]/40 rounded-full transform -translate-y-1/2" />

            <div className="flex justify-between items-start border-b border-[#ccc6bb]/30 pb-4 mb-4">
              <div>
                <p className="text-[10px] tracking-widest text-brand-matcha font-bold uppercase">
                  YOU KASGNJ
                </p>
                <h4 className="font-serif text-xl text-brand-dark leading-tight mt-1">
                  Table Pass
                </h4>
              </div>
              <div className="text-right">
                <span className="bg-brand-matcha-light text-brand-matcha-text text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-mono">
                  {bookingCompleted.id}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[10px] text-brand-outline uppercase tracking-wider">RESIDENT STATED</p>
                <p className="font-bold text-brand-dark mt-0.5">{bookingCompleted.userName}</p>
              </div>
              <div>
                <p className="text-[10px] text-brand-outline uppercase tracking-wider">APPOINTED HOURS</p>
                <p className="font-bold text-brand-dark mt-0.5">{bookingCompleted.timeSlot}</p>
              </div>
              <div>
                <p className="text-[10px] text-brand-outline uppercase tracking-wider">RITUAL PASS DATE</p>
                <p className="font-bold text-brand-dark mt-0.5">{bookingCompleted.date}</p>
              </div>
              <div>
                <p className="text-[10px] text-brand-outline uppercase tracking-wider">SEAT / QUADRANT</p>
                <p className="font-bold text-brand-dark mt-0.5 uppercase">
                  Table {bookingCompleted.tableNumber} ({bookingCompleted.sectionId})
                </p>
              </div>
            </div>

            <div className="border-t border-dashed border-[#ccc6bb]/40 pt-4 mt-4 grid grid-cols-3 gap-1.5 text-center text-[10px] text-brand-outline font-mono">
              <div>100% ORGANIC</div>
              <div className="border-x border-[#ccc6bb]/30">SLOW BREWING</div>
              <div>SAINT DEEP</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => {
                openNotification('📥 Your boarding pass layout has been saved offline on your device.');
              }}
              className="w-full sm:w-auto bg-brand-matcha hover:bg-brand-matcha/90 text-white font-sans font-bold text-sm uppercase tracking-wider py-3.5 px-8 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Ticket Pass
            </button>
            <button
              onClick={() => setBookingCompleted(null)}
              className="w-full sm:w-auto text-[#705a49] bg-brand-clay hover:bg-brand-clay-high text-sm font-sans font-bold py-3.5 px-6 rounded-full transition-colors border border-brand-outline/25"
            >
              Book Another Quadrant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
