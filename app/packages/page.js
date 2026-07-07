"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
const amenityIcons = {
  WiFi: "📶", Restaurant: "🍽️", Breakfast: "🥐", Parking: "🅿️",
  "Air Conditioning": "❄️", "24/7 Security": "🔒", "Room Service": "🛎️",
  Concierge: "🎩", Spa: "💆", Gym: "🏋️", "Fitness Center": "🏋️",
  "Early Check-In": "⏰", "Daily Cleaning": "🧹", "Prayer Room": "🕌",
  "Kaaba View": "🕋", "Business Center": "💼", "Free Shuttle": "🚌",
  "Shuttle Service": "🚌",
};

const ROOM_META = {
  "Deluxe Double": { icon: "🛏️", bed: "1 King Bed", inclusions: ["WiFi", "Daily Housekeeping", "City View"] },
  "Executive Suite": { icon: "🌟", bed: "2 King Beds", inclusions: ["WiFi", "Lounge Access", "Breakfast", "City View"] },
  "Family Room": { icon: "👨‍👩‍👧", bed: "1 King + 2 Single", inclusions: ["WiFi", "Daily Housekeeping", "Connecting Rooms"] },
  "Quad Room": { icon: "🏠", bed: "4 Single Beds", inclusions: ["WiFi", "Daily Housekeeping"] },
};

// FROM HERE WHATSAPP AGENTS NUMBER WILL GET CHANGED...
const AGENTS = [
  { name: "Mr. Faizee ", number: "+923064846431", avatar: "👨‍💼", specialty: "Umrah Specialist" },
  { name: "Ms.Maryam", number: "+923064846431", avatar: "👩‍💼", specialty: "Hajj & Umrah Advisor" },
  { name: "Mr. Touseef", number: "+923064846431", avatar: "👨‍💼", specialty: "VIP Travel Consultant" },
];

const hotels = [
  { id: 1, name: "Al Ebaa Hotel", desc: "Al Ebaa Hotel is one of the 4-star hotels in Makkah. This hotel is located around 850 m away from Masjid Al Haram. All rooms feature elegant designs with premium furnishings.", price: "£99", location: "Makkah", stars: 4, rating: "4.3", reviews: "982", distanceFromHaram: "850m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/alebaa.jpg", amenities: ["WiFi", "Parking", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service"] },
  { id: 2, name: "M Hotel Al Dana Makkah by Millennium", desc: "A 4-star hotel in Makkah located 6-7 minutes' drive from Masjid Al Haram. Features spacious rooms with modern décor, a dedicated prayer area, and panoramic city views.", price: "£130", location: "Makkah", stars: 4, rating: "4.5", reviews: "1,412", distanceFromHaram: "1.2km from Masjid Al‑Haram", checkIn: "3:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/aldana.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Concierge"] },
  { id: 3, name: "Infinity Hotel Makkah", desc: "Located just a 10 to 12-minute walk from Masjid Al-Haram, the Infinity Hotel Makkah inspires pilgrims through its blend of spiritual ambiance and premium hospitality.", price: "£122", location: "Makkah", stars: 5, rating: "4.6", reviews: "2,105", distanceFromHaram: "900m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "11:00 AM", img: "/imgs/hotels/infinity.jpg", amenities: ["WiFi", "Restaurant", "Room Service", "Air Conditioning", "24/7 Security", "Early Check-In", "Fitness Center"] },
  { id: 4, name: "Al Shohada Hotel", desc: "Al Shohada Hotel Makkah provides comfortable rooms with air conditioning conveniently located near the Holy Masjid Al-Haram. Premium furnishings and daily room cleaning.", price: "£145", location: "Makkah", stars: 5, rating: "4.7", reviews: "1,890", distanceFromHaram: "500m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/alshohada.jpg", amenities: ["WiFi", "Room Service", "Air Conditioning", "24/7 Security", "Daily Cleaning", "Prayer Room"] },
  { id: 5, name: "Shaza Makkah Hotel", desc: "Shaza Makkah Hotel is a premier 5-star establishment located in Jabal Kaaba, just 710 metres from the Holy Masjid Al-Haram. Stunning front views of the Grand Mosque.", price: "£148", location: "Makkah", stars: 5, rating: "4.8", reviews: "2,340", distanceFromHaram: "710m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/shaza.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Kaaba View"] },
  { id: 6, name: "Elaf Al Mashaer Hotel", desc: "Elaf Al Mashaer Hotel Makkah offers convenient access to King Abdulaziz and King Fahad Gates, positioned just 400 metres from these important entrances to the Haram.", price: "£155", location: "Makkah", stars: 5, rating: "4.6", reviews: "1,650", distanceFromHaram: "400m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/elaf-mashaer.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Concierge"] },
  { id: 7, name: "Jabal Omar Marriott Hotel", desc: "The Jabal Omar Marriott Hotel stands as one of Makkah's premier five-star establishments, offering luxurious service and elegant accommodations with premium amenities.", price: "£165", location: "Makkah", stars: 5, rating: "4.7", reviews: "2,100", distanceFromHaram: "600m from Masjid Al‑Haram", checkIn: "3:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/jabal-marriott.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Room Service", "Business Center"] },
  { id: 8, name: "Anjum Hotel Makkah", desc: "The Anjum Hotel Makkah offers modern accommodations with stunning views of the Masjid Al-Haram, located in the city centre near the Haram. Ideal for families.", price: "£155", location: "Makkah", stars: 5, rating: "4.5", reviews: "1,320", distanceFromHaram: "300m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/anjum.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Room Service"] },
  { id: 9, name: "Elaf Kinda Hotel", desc: "The Elaf Kinda Hotel is strategically located to ensure convenience for pilgrims undertaking their spiritual journey in Makkah with premium hospitality services.", price: "£159", location: "Makkah", stars: 5, rating: "4.6", reviews: "1,540", distanceFromHaram: "450m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/elaf-kinda.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Early Check-In"] },
  { id: 10, name: "Pullman ZamZam Makkah", desc: "The Pullman ZamZam Makkah Hotel is extraordinarily close to the Grand Mosque, just 100 metres away. Luxury property with world-class amenities and exceptional service.", price: "£177", location: "Makkah", stars: 5, rating: "4.8", reviews: "2,890", distanceFromHaram: "100m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/pullman-zamzam.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Concierge", "Early Check-In"] },
  { id: 11, name: "Swissotel Hotel Makkah", desc: "One of the most modern and luxurious 5-star hotels in Makkah, Swissotel Hotel Makkah is in the exclusive Abraj Al Bait Complex with stunning Kaaba views.", price: "£188", location: "Makkah", stars: 5, rating: "4.7", reviews: "2,450", distanceFromHaram: "150m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/swissotel.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Spa", "Room Service", "Concierge"] },
  { id: 12, name: "Le Meridien Makkah Hotel", desc: "Le Meridien Makkah Hotel is situated just 4-5 minutes' walk from Masjid Al-Haram in elegant style. Air-conditioned rooms with modern amenities and attentive service.", price: "£145", location: "Makkah", stars: 5, rating: "4.6", reviews: "1,760", distanceFromHaram: "350m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/le-meridien.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Concierge"] },
  { id: 13, name: "Hilton Makkah Convention Hotel", desc: "The Hilton Makkah Convention Hotel is conveniently located near the Haram boundary and offers guests breathtaking views. World-class amenities and excellent service.", price: "£190", location: "Makkah", stars: 5, rating: "4.7", reviews: "2,670", distanceFromHaram: "500m from Masjid Al‑Haram", checkIn: "3:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/hilton.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Business Center", "Room Service"] },
  { id: 14, name: "Sheraton Makkah Jabal Al Kaaba", desc: "Sheraton Makkah Jabal Al Kaaba Hotel provides pilgrims with a luxurious stay in the holy city. This 5-star property combines elegance with spiritual proximity.", price: "£160", location: "Makkah", stars: 5, rating: "4.6", reviews: "1,890", distanceFromHaram: "550m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/sheraton.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Room Service"] },
  { id: 15, name: "Al Safwah Royale Orchid", desc: "Al Safwah Royale Orchid Hotel is a top-rated 5-star property in Makkah, located just 2-3 minutes' walking distance from the Haram. Luxury accommodations with premium service.", price: "£162", location: "Makkah", stars: 5, rating: "4.7", reviews: "1,920", distanceFromHaram: "150m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/al-safwah.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Kaaba View"] },
  { id: 16, name: "Jabal Omar Hyatt Regency Makkah", desc: "Jabal Omar Hyatt Regency Makkah is a 5-star hotel with 656 thoughtfully designed guestrooms. Located just 2-3 minutes' walking distance from Masjid Al-Haram.", price: "£160", location: "Makkah", stars: 5, rating: "4.8", reviews: "2,540", distanceFromHaram: "150m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/hyatt-regency.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Fitness Center", "Room Service"] },
  { id: 17, name: "Grand Makkah Hotel Araek Group", desc: "Grand Makkah Hotel is one of the top-rated 5-star hotels in Makkah, located just 650 metres away from the Haram boundary. Spacious rooms with modern amenities.", price: "£167", location: "Makkah", stars: 5, rating: "4.6", reviews: "1,670", distanceFromHaram: "650m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/grand-makkah.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Room Service"] },
  { id: 18, name: "M Hotel Makkah by Millennium", desc: "M Hotel Makkah by Millennium is a 5-star hotel offering excellent value. Located approximately 17-19 minutes' drive from Masjid Al-Haram with quality amenities.", price: "£70", location: "Makkah", stars: 5, rating: "4.4", reviews: "1,450", distanceFromHaram: "1.5km from Masjid Al‑Haram", checkIn: "3:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/m-hotel-millennium.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Room Service"] },
  { id: 19, name: "Swissotel Al Maqam Makkah", desc: "Swissotel Al Maqam is one of the renowned 5-star hotels in Makkah, part of the prestigious Abraj Al Bait Complex. Exceptional Swiss-standard service and amenities.", price: "£90", location: "Makkah", stars: 5, rating: "4.7", reviews: "2,180", distanceFromHaram: "100m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/swissotel-maqam.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Spa", "Room Service", "Kaaba View"] },
  { id: 20, name: "Al Marwa Rayhaan by Rotana", desc: "Al Marwa Rayhaan by Rotana is among the top-rated 5-star hotels in Makkah, located within the prestigious Abraj Al Bait Complex with stunning Haram views.", price: "£117", location: "Makkah", stars: 5, rating: "4.6", reviews: "1,780", distanceFromHaram: "120m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/al-marwa.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Concierge"] },
  { id: 21, name: "Emaar Andalusia Hotel", desc: "Located just 450 m from Masjid Al Haram, Emaar Andalusia Hotel rooms have a private bathroom and air conditioning to ensure comfort during your spiritual journey.", price: "£99", location: "Makkah", stars: 3, rating: "4.1", reviews: "920", distanceFromHaram: "450m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/emaar-andalusia.jpg", amenities: ["WiFi", "Restaurant", "Air Conditioning", "24/7 Security", "Room Service"] },
  { id: 22, name: "Elaf Ajyad Hotel Makkah", desc: "Elaf Ajyad Hotel is a highly accessible hotel in Makkah. This hotel is located on Ajyad Street and sits just 350 m away from the main prayer gates of Masjid Al Haram.", price: "£77", location: "Makkah", stars: 4, rating: "4.3", reviews: "1,450", distanceFromHaram: "350m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/elaf-ajyad.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Concierge"] },
  { id: 23, name: "Maysan Al Mashaer Hotel", desc: "Maysan Al Mashaer Hotel is a top-rated hotel in Makkah. This hotel is situated on Ajyad Street and is just a short 6-8 minute walk or shuttle ride from sacred areas.", price: "£80", location: "Makkah", stars: 3, rating: "4.0", reviews: "310", distanceFromHaram: "650m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/maysan-mashaer.jpg", amenities: ["WiFi", "Restaurant", "Air Conditioning", "Room Service"] },
  { id: 24, name: "Emaar Grand Hotel Makkah", desc: "Emaar Grand Hotel Makkah is located just 750 metres away from the Haram boundary.", price: "£90", location: "Makkah", stars: 4, rating: "4.2", reviews: "1,120", distanceFromHaram: "750m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/emaar-grand.jpg", amenities: ["WiFi", "Restaurant", "Air Conditioning", "24/7 Security", "Room Service"] },
  { id: 25, name: "Dar Al Fayzeen Makkah Hotel", desc: "Dar Al Fayzeen Makkah Hotel is ideally located on Ajyad Street in Makkah, providing close neighbourhood attractions and exciting viewpoints of the surrounding city skyline.", price: "£105", location: "Makkah", stars: 4, rating: "4.4", reviews: "860", distanceFromHaram: "400m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/dar-al-fayzeen.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "Room Service", "Concierge"] },
  { id: 26, name: "Voco Makkah Hotel", desc: "Voco Makkah Hotel by IHG is here to accompany you on the spiritual trip of a lifetime. Perfectly located on Ibrahim Al Khalil Road with premium luxury offerings.", price: "£112", location: "Makkah", stars: 5, rating: "4.7", reviews: "2,890", distanceFromHaram: "900m from Masjid Al‑Haram", checkIn: "3:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/voco-makkah.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "Gym", "24/7 Security", "Room Service", "Concierge", "Free Shuttle"] },
  { id: 27, name: "Al Massa Grand Hotel", desc: "With city views, the Al Massa Grand Hotel is conveniently located in Makkah, approximately 850 m from Masjid Al Haram.", price: "£117", location: "Makkah", stars: 5, rating: "4.4", reviews: "1,150", distanceFromHaram: "850m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/al-massa-grand.jpg", amenities: ["WiFi", "Restaurant", "Air Conditioning", "24/7 Security", "Room Service"] },
  { id: 28, name: "Al Kiswah Towers Hotel", desc: "Around 1.8 km from Masjid Al-Haram stands the Al Kiswah Towers Hotel, one of Makkah's 4-star establishments.", price: "£129", location: "Makkah", stars: 4, rating: "4.2", reviews: "3,420", distanceFromHaram: "1.8km from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/al-kiswah.jpg", amenities: ["WiFi", "Restaurant", "Air Conditioning", "Room Service", "Shuttle Service"] },
  { id: 29, name: "DoubleTree by Hilton Makkah", desc: "Having air-conditioned rooms, DoubleTree by Hilton Makkah Jabal Omar is located in the Ajyad district of Makkah.", price: "£143", location: "Makkah", stars: 4, rating: "4.5", reviews: "2,110", distanceFromHaram: "500m from Masjid Al‑Haram", checkIn: "3:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/doubletree-makkah.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Concierge"] },
  { id: 30, name: "Worth Elite Hotel", desc: "Worth Elite Hotel is an excellent budget-friendly choice for pilgrims travelling from the UK. This 3-star hotel is located close to local amenities.", price: "£79", location: "Makkah", stars: 3, rating: "3.9", reviews: "480", distanceFromHaram: "700m from Masjid Al‑Haram", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/worth-elite.jpg", amenities: ["WiFi", "Air Conditioning", "24/7 Security", "Room Service"] },
  { id: 31, name: "Jawharat Al Rasheed Hotel", desc: "The Jawharat Al Rashid Hotel is a 5 to 6-minute walk from Al Masjid An-Nabawi and has rooms with modest furnishings. A 24-hour front desk and complimentary Wi-Fi throughout.", price: "£88", location: "Madinah", stars: 3, rating: "4.7", reviews: "3,210", distanceFromHaram: "200m from Al-Masjid an-Nabawi", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/makkah_hotel.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning"] },
  { id: 32, name: "Mirage Al Salam Hotel", desc: "Mirage Al Salam Hotel Madinah is just a short distance, approximately 150 metres from the Prophet's Mosque. Very close to the Green Dome of Al Masjid An Nabwi.", price: "£68", location: "Madinah", stars: 3, rating: "4.8", reviews: "4,100", distanceFromHaram: "Direct access to Al-Masjid an-Nabawi", checkIn: "3:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/madinah2.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Parking"] },
  { id: 33, name: "Al Ansar New Palace Hotel", desc: "Located only 250 metres from the Prophet's Mosque Gate No. 17. Smoke-free with public Wi-Fi, elevator access, minibar in each room, and 24-hour service.", price: "£80", location: "Madinah", stars: 5, rating: "4.9", reviews: "1,875", distanceFromHaram: "100m from Al-Masjid an-Nabawi", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/madinah3.jpg", amenities: ["WiFi", "Restaurant", "Breakfast", "Parking"] },
  { id: 34, name: "Elaf Taiba Hotel", desc: "Elaf Taiba Hotel in Madinah is located just 2 to 3-minute walking distance from the Prophet's Mosque. Many rooms have a view of Al-Masjid An-Nabwi.", price: "£110", location: "Madinah", stars: 3, rating: "4.4", reviews: "1,620", distanceFromHaram: "800m from Al-Masjid an-Nabawi", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/madinah4.jpg", amenities: ["WiFi", "Breakfast", "Air Conditioning"] },
  { id: 35, name: "Emaar Taibah Hotel", desc: "The 3-star Emaar Taibah Hotel Madinah is conveniently located 8 to 10-minute walk from Al Masjid An-Nabwi. Free Wi-Fi and free private parking.", price: "£78", location: "Madinah", stars: 3, rating: "4.4", reviews: "1,620", distanceFromHaram: "800m from Al-Masjid an-Nabawi", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/madinah5.jpg", amenities: ["WiFi", "Breakfast", "Air Conditioning"] },
  { id: 36, name: "Grand Zowar Hotel", desc: "Grand Zowar Hotel is a 3-star hotel in the heart of Central Madinah. Around 6-7 minutes away from Masjid Al Nabawi with 340 rooms.", price: "£63", location: "Madinah", stars: 3, rating: "4.4", reviews: "1,620", distanceFromHaram: "800m from Al-Masjid an-Nabawi", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/madinah6.jpg", amenities: ["WiFi", "Breakfast", "Air Conditioning"] },
  { id: 37, name: "Artal International Hotel", desc: "Artal International Hotel, a 3-star hotel in Madinah, is around 2-3 minutes away from the Prophet's Mosque. All 378 rooms are air-conditioned and family-friendly.", price: "£70", location: "Madinah", stars: 3, rating: "4.4", reviews: "1,620", distanceFromHaram: "800m from Al-Masjid an-Nabawi", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/madinah8.jpg", amenities: ["WiFi", "Breakfast", "Air Conditioning"] },
  { id: 38, name: "Odst Al Madinah Hotel", desc: "Odst Al Madinah Hotel is around 3-4 minutes away from the Prophet's Mosque with 700 rooms featuring flat-screen TVs and kitchen facilities.", price: "£75", location: "Madinah", stars: 3, rating: "4.4", reviews: "1,620", distanceFromHaram: "600m from Al-Masjid an-Nabawi", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/madinah7.jpg", amenities: ["WiFi", "Breakfast", "Air Conditioning"] },
  { id: 39, name: "Swiss International Taba Alsalam", desc: "Swiss International Taba Alsalam Hotel Madinah is a 3-star hotel located around 650 m away from Masjid Al Nabawi with 140 air-conditioned rooms.", price: "£80", location: "Madinah", stars: 3, rating: "4.4", reviews: "1,620", distanceFromHaram: "800m from Al-Masjid an-Nabawi", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/madinah9.jpg", amenities: ["WiFi", "Breakfast", "Air Conditioning"] },
  { id: 40, name: "Grand Plaza Badr Al Maqam", desc: "Grand Plaza Badr Al Maqam is just 1-2 minutes walking distance from the Prophet's Mosque. Some rooms offer direct views of the Prophet's Mosque and Green Dome.", price: "£80", location: "Madinah", stars: 3, rating: "4.4", reviews: "1,620", distanceFromHaram: "800m from Al-Masjid an-Nabawi", checkIn: "2:00 PM", checkOut: "12:00 PM", img: "/imgs/hotels/madinah10.jpg", amenities: ["WiFi", "Breakfast", "Air Conditioning"] },
];

const rooms = [
  { id: 1, type: "Deluxe Double", price: 180, capacity: 2 },
  { id: 2, type: "Executive Suite", price: 280, capacity: 4 },
  { id: 3, type: "Family Room", price: 190, capacity: 3 },
  { id: 4, type: "Quad Room", price: 120, capacity: 2 },
];

const STEPS = [
  { num: 1, label: "Service" },
  { num: 2, label: "Package" },
  { num: 3, label: "Hotel" },
  { num: 4, label: "Room" },
  { num: 5, label: "Details" },
];
const waNum=+923124928496
// ─── Helpers ─────────────────────────────────────────────────────────────────
function Stars({ count }) {
  return (
    <span style={{ color: "#F59E0B", fontSize: "0.875rem" }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

// ─── AUTH MODAL ──────────────────────────────────────────────────────────────
function AuthModal({ onSuccess }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ fullname: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [hotelSearch, setHotelSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (mode === "register" && !form.fullname.trim()) errs.fullname = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Enter a valid email";
    if (!form.password || form.password.length < 6) errs.password = "Minimum 6 characters";
    if (mode === "register" && form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (mode === "register" && !form.phone.trim()) errs.phone = "Phone number is required";
    return errs;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();

  if (Object.keys(errs).length) {
    setErrors(errs);
    setShake(true);
    setTimeout(() => setShake(false), 600);
    return;
  }

  setLoading(true);

  try {
    if (mode === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: form.fullname,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({
          general: data.message || "Registration failed Email already exists",
        });
        return;
      }

      // Go to login page
      alert("Account created successfully!");

      setMode("login");

      setForm({
        name: "",
        email: form.email,
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});
    } else {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({
          general: data.message || "Login failed",
        });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onSuccess(data.user);
    }
  } catch (err) {
    setErrors({
      general: "Something went wrong.",
    });
  } finally {
    setLoading(false);
  }
};

  const inputStyle = (field) => ({
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.875rem",
    border: `1.5px solid ${errors[field] ? "#EF4444" : "#E5E7EB"}`,
    fontSize: "0.9rem",
    outline: "none",
    background: "#fff",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  });

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "linear-gradient(135deg, #FFF7ED 0%, #EFF6FF 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
    }} className="dark:text-black">
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(230,130,19,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(0,112,161,0.07)", pointerEvents: "none" }} />

      <div style={{
        width: "100%", maxWidth: "420px",
        background: "#fff",
        borderRadius: "1.75rem",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        overflow: "hidden",
        animation: shake ? "shake 0.5s ease" : "slideUp 0.4s ease",
       
       
      }}>
        {/* Header */}
      

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: "0", borderBottom: "1px solid #F3F4F6", background: "#FAFAFA" }}>
          {["login", "register"].map((m) => (
            <button key={m} onClick={() => { setMode(m); setErrors({}); }} style={{
              flex: 1, padding: "0.85rem", border: "none",
              background: mode === m ? "#fff" : "transparent",
              color: mode === m ? "#E68213" : "#9CA3AF",
              fontWeight: mode === m ? "700" : "500",
              fontSize: "0.9rem",
              borderBottom: mode === m ? "2px solid #E68213" : "2px solid transparent",
              cursor: "pointer", transition: "all 0.2s",
              textTransform: "capitalize",
            }}>
              {m === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {mode === "register" && (
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "0.4rem" }}>Full Name</label>
              <input name="fullname" value={form.fullname} onChange={handleChange} placeholder="Ahmed Al-Sayed" style={inputStyle("fullname")} />
              {errors.fullname && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "0.3rem 0 0" }}>{errors.fullname}</p>}
            </div>
          )}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "0.4rem" }}>Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle("email")} />
            {errors.email && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "0.3rem 0 0" }}>{errors.email}</p>}
          </div>
          {mode === "register" && (
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "0.4rem" }}>Phone Number</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+44 7700 000000" style={inputStyle("phone")} />
              {errors.phone && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "0.3rem 0 0" }}>{errors.phone}</p>}
            </div>
          )}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "0.4rem" }}>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" style={inputStyle("password")} />
            {errors.password && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "0.3rem 0 0" }}>{errors.password}</p>}
          </div>
          {mode === "register" && (
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "0.4rem" }}>Confirm Password</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" style={inputStyle("confirmPassword")} />
              {errors.confirmPassword && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "0.3rem 0 0" }}>{errors.confirmPassword}</p>}
            </div>
          )}

          {mode === "login" && (
            <div style={{ textAlign: "right", marginTop: "-0.5rem" }}>
              <button type="button" style={{ background: "none", border: "none", color: "#0070A1", fontSize: "0.8rem", cursor: "pointer", fontWeight: "500" }}>
                Forgot password?
              </button>
            </div>
          )}
          {errors.general && (
  <p
    style={{
      color: "#EF4444",
      fontSize: "0.85rem",
      textAlign: "center",
    }}
  >
    {errors.general}
  </p>
)}

          <button type="submit" disabled={loading} style={{
            background: loading ? "#D1D5DB" : "linear-gradient(135deg, #E68213, #0070A1)",
            color: "#fff", border: "none", borderRadius: "0.875rem",
            padding: "0.9rem", fontWeight: "700", fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s", marginTop: "0.25rem",
          }}>
            {loading ? "⏳ Please wait..." : (mode === "login" ? "Sign In →" : "Create Account →")}
          </button>

          {mode === "login" && (
            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#9CA3AF", margin: 0 }}>
              New to TravelHooks?{" "}
              <button type="button" onClick={() => { setMode("register"); setErrors({}); }} style={{ background: "none", border: "none", color: "#E68213", fontWeight: "600", cursor: "pointer" }}>
                Create an account
              </button>
            </p>
          )}
          {mode === "register" && (
            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#9CA3AF", margin: 0 }}>
              Already have an account?{" "}
              <button type="button" onClick={() => { setMode("login"); setErrors({}); }} style={{ background: "none", border: "none", color: "#E68213", fontWeight: "600", cursor: "pointer" }}>
                Sign in
              </button>
            </p>
          )}
          <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#D1D5DB", margin: 0 }}>
            By continuing you agree to our Terms of Service & Privacy Policy
          </p>
        </form>
      </div>

      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
      `}</style>
    </div>
  );
}

// ─── AGENT CONTACT POPUP ─────────────────────────────────────────────────────
function AgentPopup({ agent, bookingForm, selectedHotel, selectedRoom, totalPrice, onClose }) {
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => c > 0 ? c - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const progress = ((300 - countdown) / 300) * 100;

  const waMessage = encodeURIComponent(
    `Assalamu Alaikum ${agent.name}! 🌙\n\nI've just submitted a booking request on TravelHooks:\n\n` +
    `👤 Name: ${bookingForm.fullName}\n📧 Email: ${bookingForm.email}\n📞 Phone: ${bookingForm.phone}\n\n` +
    `🏨 Hotel: ${selectedHotel?.name}\n🛏️ Room: ${selectedRoom?.type}\n` +
    `📅 Check-in: ${bookingForm.checkInDate}\n📅 Check-out: ${bookingForm.checkOutDate}\n` +
    `👥 Guests: ${bookingForm.guests}\n💷 Total: £${totalPrice?.toLocaleString()}\n\n` +
    `Please confirm my booking. JazakAllah Khair! 🕋`
  );

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
      animation: "fadeIn 0.3s ease",
    }}>
      <div style={{
        width: "100%", maxWidth: "440px",
        background: "#fff", borderRadius: "1.75rem",
        boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
        overflow: "hidden",
        animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #FFA536, #0070A1)",
          padding: "1.75rem 2rem",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem", animation: "bounce 1s infinite" }}>✅</div>
          <h2 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: "800", margin: "0 0 0.25rem" }}>
            Booking Request Confirmed!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", margin: 0 }}>
            JazakAllah Khair! Your request has been received.
          </p>
        </div>

        <div style={{ padding: "1.75rem" }}>
          {/* Agent card */}
          <div style={{
            background: "linear-gradient(135deg, #FFF7ED, #EFF6FF)",
            border: "1.5px solid #FED7AA",
            borderRadius: "1.25rem",
            padding: "1.25rem",
            marginBottom: "1.25rem",
            display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <div style={{
              width: "60px", height: "60px", borderRadius: "50%",
              background: "linear-gradient(135deg, #E68213, #0070A1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.75rem", flexShrink: 0,
              boxShadow: "0 4px 12px rgba(230,130,19,0.3)",
            }}>
              {agent.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "0.7rem", color: "#9CA3AF", margin: "0 0 0.2rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600" }}>
                Your Dedicated Agent
              </p>
              <p style={{ fontSize: "1rem", fontWeight: "800", color: "#111827", margin: "0 0 0.15rem" }}>
                {agent.name}
              </p>
              <p style={{ fontSize: "0.78rem", color: "#E68213", fontWeight: "600", margin: "0 0 0.2rem" }}>
                {agent.specialty}
              </p>
              <a href={`tel:${agent.number}`} style={{
                fontSize: "0.9rem", fontWeight: "700", color: "#0070A1",
                textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem",
              }}>
                📞 {agent.number}
              </a>
            </div>
          </div>

          {/* Countdown */}
          <div style={{
            background: countdown > 0 ? "#F0FDF4" : "#FEF3C7",
            border: `1.5px solid ${countdown > 0 ? "#BBF7D0" : "#FDE68A"}`,
            borderRadius: "1rem",
            padding: "1rem",
            marginBottom: "1.25rem",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "0.78rem", color: "#6B7280", margin: "0 0 0.5rem", fontWeight: "500" }}>
              {countdown > 0 ? "Expected contact in" : "Agent is calling now!"}
            </p>
            <div style={{ fontSize: "2rem", fontWeight: "900", color: countdown > 0 ? "#0E70A0" : "#D97706", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
              {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </div>
            {/* Progress bar */}
            <div style={{ height: "4px", background: "#E5E7EB", borderRadius: "2px", marginTop: "0.75rem", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: "2px",
                background: "linear-gradient(90deg, #DF8226, #0E70A0)",
                width: `${progress}%`, transition: "width 1s linear",
              }} />
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${agent.number.replace(/[^0-9]/g, "")}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
              background: "#F4A036", color: "#fff",
              padding: "0.9rem", borderRadius: "1rem",
              fontWeight: "700", fontSize: "0.95rem",
              textDecoration: "none", marginBottom: "0.75rem",
              boxShadow: "0 4px 15px rgba(37,211,102,0.3)",
              transition: "all 0.2s",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.527 5.845L.057 23.927l6.244-1.451A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.381l-.36-.213-3.709.861.878-3.607-.235-.372A9.818 9.818 0 1112 21.818z"/>
            </svg>
            Chat on WhatsApp with {agent.name.split(" ")[1]}
          </a>

          <button onClick={onClose} style={{
            width: "100%", padding: "0.7rem", borderRadius: "1rem",
            background: "none", border: "1.5px solid #E5E7EB",
            color: "#6B7280", fontSize: "0.9rem", fontWeight: "600",
            cursor: "pointer", transition: "all 0.2s",
          }}>
            Close & Return Home
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>
    </div>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
function ProgressBar({ step, selectedPackage, selectedHotel, selectedRoom, onStepClick, user }) {
  if (step < 1) return null;
  return (
    <div style={{
      position: "sticky", zIndex: 40,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
      borderBottom: "1px solid #F3F4F6",
      boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
    }}>
      {/* WILL SEE */}
     <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto scrollbar-hide mt-30 p-2">
  {STEPS.map((s, i) => {
    const isCompleted = step > s.num;
    const isActive = step === s.num;

    return (
      <React.Fragment key={s.num}>
        <button
          onClick={() => isCompleted && onStepClick(s.num)}
          className={`flex items-center gap-2 whitespace-nowrap ${
            isCompleted ? "cursor-pointer" : "cursor-default"
          }`}
        >
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
              ${
                isCompleted
                  ? "bg-emerald-500 text-white"
                  : isActive
                  ? "bg-gradient-to-r from-[#E68213] to-[#0070A1] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
          >
            {isCompleted ? "✓" : s.num}
          </span>

          <span
            className={`text-sm font-semibold ${
              isCompleted
                ? "text-emerald-500"
                : isActive
                ? "text-[#E68213]"
                : "text-gray-400"
            }`}
          >
            {s.label}
          </span>
        </button>

        {i < STEPS.length - 1 && (
          <span className="text-gray-300 text-xl flex-shrink-0">›</span>
        )}
      </React.Fragment>
    );
  })}

  {user && (
    <div className="ml-auto pl-4 border-l border-gray-200 flex items-center gap-2 flex-shrink-0">
      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] flex items-center justify-center text-white text-xs font-bold">
        {user.fullname}
      </div>

      <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
        {user.fullname}
      </span>
    </div>
  )}
</div>
    </div>
  );
}

// ─── HOTEL DRAWER ─────────────────────────────────────────────────────────────
function HotelDrawer({ hotel, onConfirm, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  if (!hotel) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "relative", width: "100%", maxWidth: "640px",
        background: "#fff", borderRadius: "1.5rem 1.5rem 0 0",
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.15)",
      }}>
        {/* Image placeholder */}
        <div style={{
          height: "220px", background: "linear-gradient(135deg,#FED7AA,#BFDBFE)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "5rem", position: "relative",
        }}>
           <Image
    src={
      hotel.img?.startsWith("http") || hotel.img?.startsWith("/")
        ? hotel.img
        : `/${hotel.img}`
    }
    alt={hotel.name}
    fill
    className=" rounded-lg object-cover"
  />

          <button onClick={onClose} style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "rgba(0,0,0,0.5)", color: "#fff",
            border: "none", width: "36px", height: "36px", borderRadius: "50%",
            fontSize: "1.25rem", cursor: "pointer",
          }}>×</button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
            <div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: "800", margin: "0 0 0.25rem" }}>{hotel.name}</h2>
              <Stars count={hotel.stars} />
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#E68213" }}>{hotel.price}</div>
              <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>per night</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <span style={{ background: "#FFF7ED", color: "#E68213", padding: "0.4rem 0.75rem", borderRadius: "2rem", fontSize: "0.8rem", fontWeight: "600" }}>
              ⭐ {hotel.rating} ({hotel.reviews} reviews)
            </span>
            <span style={{ background: "#EFF6FF", color: "#0070A1", padding: "0.4rem 0.75rem", borderRadius: "2rem", fontSize: "0.8rem", fontWeight: "600" }}>
              📍 {hotel.distanceFromHaram}
            </span>
          </div>

          <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "1.25rem" }}>{hotel.desc}</p>

          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Amenities</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {hotel.amenities.map(a => (
                <span key={a} style={{
                  background: "#FFF7ED", color: "#C2410C",
                  padding: "0.35rem 0.75rem", borderRadius: "2rem",
                  fontSize: "0.78rem", fontWeight: "500",
                  display: "flex", alignItems: "center", gap: "0.3rem",
                }}>
                  {amenityIcons[a] || "✓"} {a}
                </span>
              ))}
            </div>
          </div>

          <button onClick={onConfirm} style={{
            width: "100%", padding: "1rem",
            background: "linear-gradient(135deg,#E68213,#0070A1)",
            color: "#fff", border: "none", borderRadius: "1rem",
            fontSize: "1rem", fontWeight: "700", cursor: "pointer",
          }}>
            Select This Hotel →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function CustomizePage() {
  const [user, setUser] = useState(null); // null = not logged in
  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState(null);
  const [hotelLocationTab, setHotelLocationTab] = useState("Makkah");
  const [hotelStarFilter, setHotelStarFilter] = useState(0);
  const [hotelSortBy, setHotelSortBy] = useState("default");
  const [drawerHotel, setDrawerHotel] = useState(null);
  const [hotelSearch, setHotelSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingSubStep, setBookingSubStep] = useState(1);

  const [bookingForm, setBookingForm] = useState(() => ({
  fullName: user?.fullname || "",
  email: user?.email || "",
  phone: user?.phone || "",
  whatsapp: user?.phone || "",
  checkInDate: "",
  checkOutDate: "",
  guests: 1,
  specialRequests: "",
}));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignedAgent, setAssignedAgent] = useState(null);
  const [showAgentPopup, setShowAgentPopup] = useState(false);

  const nightsCount = 7;
  const totalPrice = selectedRoom ? selectedRoom.price * nightsCount : 0;

  // Pre-fill form from user
 useEffect(() => {
  if (!user) return;

  queueMicrotask(() => {
    setBookingForm(prev => ({
      ...prev,
      fullName: user.fullname || "",
      email: user.email || "",
      phone: user.phone || "",
      whatsapp: user.phone || "",
    }));
  });
}, [user]);
  const fetchPackages = async (svc) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/customizepackages?type=${svc}`);
      if (!res.ok) throw new Error("Failed");
      setPackages(await res.json());
    } catch {
      // Use demo packages if API not available
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (svc) => {
    setService(svc);
    setStep(2);
    fetchPackages(svc);
  };

  const filteredPackages = packages.filter(pkg => {
    const term = searchTerm.trim().toLowerCase();
    if (term.length < 2) return true;
    return pkg.title?.toLowerCase().includes(term) || pkg.shortDesc?.toLowerCase().includes(term);
  });

  const filteredHotels = hotels
    .filter(h => {
      const term = hotelSearch.trim().toLowerCase();
      return (term.length < 2 || h.name.toLowerCase().includes(term)) &&
        h.location === hotelLocationTab &&
        (hotelStarFilter === 0 || h.stars === hotelStarFilter);
    })
    .sort((a, b) => {
      const n = p => parseInt(p.replace(/[^0-9]/g, ""));
      if (hotelSortBy === "price-asc") return n(a.price) - n(b.price);
      if (hotelSortBy === "price-desc") return n(b.price) - n(a.price);
      if (hotelSortBy === "rating") return parseFloat(b.rating) - parseFloat(a.rating);
      return 0;
    });

    // TO send email when user finishes booking
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingForm,
          hotel: selectedHotel?.name, room: selectedRoom?.type,
          package: selectedPackage?.title || "Custom", service, totalPrice,
        }),
      }).catch(() => {});

      // Assign random agent
      const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
      setAssignedAgent(agent);
      setStep(6);
      setShowAgentPopup(true);

      // Auto-send WhatsApp notification
     if (waNum) {
  const msg = encodeURIComponent(
    `Assalamu Alaikum! 🌙 Your TravelHooks booking request has been received.\n\n` +
    `Hotel: ${selectedHotel?.name}\nRoom: ${selectedRoom?.type}\nTotal: £${totalPrice?.toLocaleString()}\n\n` +
    `Your agent ${agent.name} will contact you within 5 minutes at ${agent.number}. JazakAllah Khair! 🕋`
  );

  setTimeout(() => {
    // Detect mobile devices (iOS/Android)
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Force native redirect on mobile
      window.location.href = `whatsapp://send?phone=${waNum}&text=${msg}`;
    } else {
      window.open(`whatsapp://send?phone=${waNum}&text=${msg}`, "_self");
    }
  }, 1500);
}
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(p => ({ ...p, [name]: value }));
  };

  const goToStep = (s) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inp = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "0.875rem",
    border: "1.5px solid #E5E7EB", fontSize: "0.875rem", outline: "none",
    background: "#fff", transition: "border-color 0.2s", boxSizing: "border-box",
  };
  const lbl = { display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "0.4rem" };
  if (!user) {
    return <AuthModal onSuccess={(u) => setUser(u)} />;
  }

  return (
    <div className="dark:text-black "
    style={{ minHeight: "100vh", background: "linear-gradient(135deg, #FAFAF7 0%, #FFF7ED 100%)" } }>
 

      {step >= 1 && step <= 5 && (
        <ProgressBar
          step={step}
          selectedPackage={selectedPackage}
          selectedHotel={selectedHotel}
          selectedRoom={selectedRoom}
          onStepClick={goToStep}
          user={user}
        />
      )}

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        {/* ── STEP 1: Service ── */}
        {step === 1 && (
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto", paddingTop: "2rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "#fff", padding: "0.5rem 1.25rem", borderRadius: "2rem",
              marginBottom: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E68213", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#E68213" }}>
                Welcome back, {user.fullname}!
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: "900", lineHeight: 1.1,
              background: "linear-gradient(135deg,#E68213,#0070A1)", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent", marginBottom: "1rem",
            }}>
              Customize Your<br />Sacred Journey
            </h1>
            <p style={{ color: "#6B7280", fontSize: "1.1rem", marginBottom: "3rem" }}>
              Build a tailored Umrah package — your dates, your hotel, your way.
            </p>

            <div style={{ maxWidth: "320px", margin: "0 auto" }}>
              <button onClick={() => handleServiceSelect("umrah")} style={{
                width: "100%", padding: "3rem 2rem",
                background: "#fff", border: "2px solid #FED7AA",
                borderRadius: "1.5rem", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#E68213"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(230,130,19,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#FED7AA"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🕋</div>
                <h3 style={{ fontSize: "1.75rem", fontWeight: "800", margin: "0 0 0.5rem" }}>Umrah</h3>
                <p style={{ color: "#9CA3AF", margin: "0 0 1rem" }}>Sacred journey to Makkah & Madinah</p>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  color: "#E68213", fontWeight: "700", fontSize: "0.9rem",
                }}>
                  From £399 →
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Package ── */}
  {step === 2 && (
          <div>
          <div className="mb-8">
  <button
    onClick={() => goToStep(1)}
    className="text-gray-500 dark:text-neutral-400 hover:text-black dark:hover:text-white mb-4 flex items-center gap-1 text-sm"
  >
    ← Back
  </button>

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
      Select Package
    </h1>

    <div className="relative w-full lg:max-w-2xl xl:max-w-3xl">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search packages..."
        className="w-full h-12 sm:h-14 pl-12 pr-10 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
      />

      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      )}
    </div>
  </div>
</div>

            {loading && <div className="text-center py-16 text-gray-400 dark:text-neutral-500">Loading packages...</div>}
            {error && <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl">{error}</div>}
            {!loading && !error && filteredPackages.length === 0 && (
              <div className="text-center text-gray-400 dark:text-neutral-500 py-20">
                <div className="text-5xl mb-4">🔍</div>
                No packages match {searchTerm}
              </div>
            )}

            {/* Mobile slider */}
            <div className="md:hidden">
              <div className="flex overflow-x-auto gap-5 snap-x snap-mandatory pb-4 scrollbar-hide">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => { setSelectedPackage(pkg); goToStep(3); }}
                    className="flex-shrink-0 w-[85%] snap-center bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-3xl overflow-hidden shadow-md cursor-pointer"
                  >
                    <div className="relative h-52 w-full">
                      <Image src={pkg.heroImage?.startsWith("/") ? pkg.heroImage : `/${pkg.heroImage}`} alt={pkg.title} fill className="object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold dark:text-white">{pkg.title}</h3>
                      <p className="text-gray-500 dark:text-neutral-400 mt-1 text-sm line-clamp-2">{pkg.shortDesc}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-orange-600 dark:text-orange-400 font-bold">{(pkg.price)}</span>
                        <span className="text-xs text-gray-400">View →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => { setSelectedPackage(pkg); goToStep(3); }}
                  className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image src={pkg.heroImage?.startsWith("/") ? pkg.heroImage : `/${pkg.heroImage}`} alt={pkg.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold dark:text-white">{pkg.title}</h3>
                    <p className="text-gray-500 dark:text-neutral-400 mt-2 text-sm line-clamp-2">{pkg.shortDesc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">{(pkg.price)}</span>
                      <span className="text-sm bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full font-medium group-hover:bg-orange-100 transition">
                        Select →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
{step === 3 && (
          <div>
           <button
  onClick={() => goToStep(2)}
  className="mb-4 text-gray-500 flex items-center gap-1 hover:text-black"
>
  ← Back
</button>

<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
    Choose Hotel
  </h1>

  <div className="w-full lg:flex-1 lg:max-w-3xl">
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>

      <input
        type="text"
        value={hotelSearch}
        onChange={(e) => setHotelSearch(e.target.value)}
        placeholder="Search hotels by name or description..."
        className="w-full h-14 pl-12 pr-10 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
      />

      {hotelSearch && (
        <button
          onClick={() => setHotelSearch("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
        >
          ×
        </button>
      )}
    </div>
  </div>
</div>

             <div style={{ display: "flex", gap: "0.25rem", background: "#F3F4F6", padding: "0.25rem", borderRadius: "1rem", width: "fit-content", marginBottom: "1.25rem" }}>
              {["Makkah", "Madinah"].map(loc => (
                <button key={loc} onClick={() => setHotelLocationTab(loc)} style={{
                  padding: "0.6rem 1.5rem", borderRadius: "0.75rem", border: "none",
                  background: hotelLocationTab === loc ? "#fff" : "transparent",
                  color: hotelLocationTab === loc ? "#E68213" : "#9CA3AF",
                  fontWeight: "700", fontSize: "0.9rem", cursor: "pointer",
                  boxShadow: hotelLocationTab === loc ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
                }}>
                  {loc === "Makkah" ? "🕋 " : "🕌 "}{loc}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#9CA3AF" }}>Stars:</span>
              {[0, 3, 4, 5].map(s => (
                <button key={s} onClick={() => setHotelStarFilter(s)} style={{
                  padding: "0.4rem 0.875rem", borderRadius: "0.75rem",
                  border: `1.5px solid ${hotelStarFilter === s ? "#E68213" : "#E5E7EB"}`,
                  background: hotelStarFilter === s ? "#E68213" : "#fff",
                  color: hotelStarFilter === s ? "#fff" : "#6B7280",
                  fontSize: "0.8rem", fontWeight: "600", cursor: "pointer",
                }}>
                  {s === 0 ? "All" : "★".repeat(s)}
                </button>
              ))}
              <select value={hotelSortBy} onChange={e => setHotelSortBy(e.target.value)} style={{ ...inp, width: "auto", padding: "0.4rem 0.875rem", marginLeft: "auto" }}>
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map(hotel => (
                <div key={hotel.id} onClick={() => setDrawerHotel(hotel)} 
                     className="bg-white rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl group">
                  <div className="relative h-52">
                    <Image

                      src={hotel.img} 
                      alt={hotel.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform" 
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold shadow">
                      {hotel.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg line-clamp-1">{hotel.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{hotel.distanceFromHaram}</p>
                    <div className="mt-4 flex justify-between items-end">
                      <div>
                        <span className="text-2xl font-bold text-[#E68213]">{hotel.price}</span>
                        <span className="text-xs text-gray-400"> /night</span>
                      </div>
                      <span className="text-sm text-blue-600">View →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
            {/* Desktop Grid */}
<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredHotels.map(hotel => (
    <div
      key={hotel.id}
      onClick={() => setDrawerHotel(hotel)}
      className="bg-white rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl group"
    >
      <div className="relative h-52">
        <Image
          src={hotel.img}
          alt={hotel.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />

        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold shadow">
          {hotel.rating}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg line-clamp-1">{hotel.name}</h3>

        <p className="text-sm text-gray-500 mt-1">
          {hotel.distanceFromHaram}
        </p>

        <div className="mt-4 flex justify-between items-end">
          <div>
            <span className="text-2xl font-bold text-[#E68213]">
              {hotel.price}
            </span>
            <span className="text-xs text-gray-400"> /night</span>
          </div>

          <span className="text-sm text-blue-600">View →</span>
        </div>
      </div>
    </div>
  ))}
</div>
            <div className="lg:hidden">
  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-5 scrollbar-hide">
    {filteredHotels.map((hotel) => (
      <div
        key={hotel.id}
        onClick={() => setDrawerHotel(hotel)}
        className="flex-shrink-0 w-[88%] sm:w-[70%] snap-center bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-md cursor-pointer"
      >
        <div className="relative h-56">
          <Image
            src={hotel.img}
            alt={hotel.name}
            fill
            className="object-cover"
          />

          <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-bold shadow">
            {hotel.rating}
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg dark:text-white line-clamp-1">
            {hotel.name}
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            {hotel.distanceFromHaram}
          </p>

          <div className="mt-5 flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-[#E68213]">
                {hotel.price}
              </span>

              <span className="text-xs text-gray-400">
                {" "}
                /night
              </span>
            </div>

            <span className="text-[#0070A1] font-medium">
              View →
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
          </div>
        )}
        {/* ── STEP 4: Room ── */}
        {step === 4 && selectedHotel && (
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <button onClick={() => goToStep(3)} style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
              ← Back
            </button>

            {/* Hotel recap */}
            <div style={{ background: "#fff", borderRadius: "1.25rem", padding: "1.1rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ width: "60px", height: "48px", borderRadius: "0.75rem", background: "linear-gradient(135deg,#FED7AA,#BFDBFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", flexShrink: 0 }}>🏨</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "700", margin: "0 0 0.15rem", fontSize: "0.9rem" }}>{selectedHotel.name}</p>
                <p style={{ fontSize: "0.75rem", color: "#9CA3AF", margin: 0 }}>📍 {selectedHotel.distanceFromHaram}</p>
                <Stars count={selectedHotel.stars} />
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#E68213", fontWeight: "800" }}>{selectedHotel.price}</div>
                <div style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>per night</div>
              </div>
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "1.25rem" }}>Select Room Type</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {rooms.map(room => {
                const meta = ROOM_META[room.type] || {};
                const isSelected = selectedRoom?.id === room.id;
                return (
                  <div key={room.id} onClick={() => setSelectedRoom(room)} style={{
                    padding: "1.25rem", borderRadius: "1.25rem",
                    border: `2px solid ${isSelected ? "#E68213" : "#E5E7EB"}`,
                    background: isSelected ? "#FFF7ED" : "#fff",
                    cursor: "pointer", transition: "all 0.2s",
                    boxShadow: isSelected ? "0 4px 20px rgba(230,130,19,0.12)" : "none",
                  }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div style={{ fontSize: "2rem" }}>{meta.icon || "🛏️"}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                          <p style={{ fontWeight: "700", margin: 0 }}>{room.type}</p>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <div style={{ color: "#E68213", fontWeight: "800" }}>£{room.price}</div>
                            <div style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>/night</div>
                          </div>
                        </div>
                        <p style={{ fontSize: "0.825rem", color: "#6B7280", margin: "0.25rem 0 0.75rem" }}>{meta.bed} · Max {room.capacity} guests</p>
                        {meta.inclusions && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                            {meta.inclusions.map(inc => (
                              <span key={inc} style={{ background: "#F3F4F6", color: "#374151", padding: "0.25rem 0.6rem", borderRadius: "2rem", fontSize: "0.75rem" }}>✓ {inc}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{
                        width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                        border: `2px solid ${isSelected ? "#E68213" : "#D1D5DB"}`,
                        background: isSelected ? "#E68213" : "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: "0.7rem",
                      }}>
                        {isSelected ? "✓" : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedRoom && (
              <>
                <div style={{
                  marginTop: "1.5rem", padding: "1.25rem",
                  background: "linear-gradient(135deg,#FFF7ED,#EFF6FF)",
                  border: "1.5px solid #FED7AA", borderRadius: "1.25rem",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: "0 0 0.2rem" }}>{selectedRoom.type} × {nightsCount} nights</p>
                    <p style={{ fontSize: "0.75rem", color: "#9CA3AF", margin: 0 }}>{selectedHotel.name}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "#E68213" }}>£{totalPrice.toLocaleString()}</div>
                    <div style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>estimated total</div>
                  </div>
                </div>
                <button onClick={() => goToStep(5)} style={{
                  marginTop: "1.25rem", width: "100%", padding: "1rem",
                  background: "linear-gradient(135deg,#E68213,#0070A1)",
                  color: "#fff", border: "none", borderRadius: "1rem",
                  fontSize: "1rem", fontWeight: "700", cursor: "pointer",
                }}>
                  Continue to Booking Details →
                </button>
              </>
            )}
          </div>
        )}

        {/* ── STEP 5: Details ── */}
        {step === 5 && selectedHotel && selectedRoom && (
         <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <button onClick={() => goToStep(4)} style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
              ← Back
            </button>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "800", marginBottom: "2rem" }}>Complete Your Booking</h1>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
              <div>
                {/* Sub-step tabs */}
                <div style={{ display: "flex", gap: "0.25rem", background: "#F3F4F6", padding: "0.25rem", borderRadius: "1rem", width: "fit-content", marginBottom: "1.5rem" }}>
               {[
  { n: 1, label: "Personal details" },
  { n: 2, label: "Travel details" },
].map((s) => (
  <button
    key={s.n}
    onClick={() => setBookingSubStep(s.n)}
    className={`whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
      bookingSubStep === s.n
        ? "bg-white dark:bg-neutral-900 text-[#E68213] shadow"
        : "text-gray-500 dark:text-neutral-400 hover:text-[#E68213]"
    }`}
  >
    {s.n}. {s.label}
  </button>
))}
                </div>

                <div style={{ background: "#fff", borderRadius: "1.25rem", padding: "1.75rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                  {bookingSubStep === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div>
                        <label style={lbl}>Full Name</label>
                        <input name="fullName" value={bookingForm.fullName} onChange={handleInputChange} placeholder="Ahmed Al-Sayed" style={inp} />
                      </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label style={lbl}>Email Address</label>
                          <input name="email" type="email" value={bookingForm.email} onChange={handleInputChange} placeholder="you@example.com" style={inp} />
                        </div>
                        <div>
                          <label style={lbl}>Phone Number</label>
                          <input name="phone" type="tel" value={bookingForm.phone} onChange={handleInputChange} placeholder="+44 7700 000000" style={inp} />
                        </div>
                      </div>
                      <div>
                        <label style={lbl}>WhatsApp <span style={{ color: "#9CA3AF", fontWeight: "400" }}>(for instant updates)</span></label>
                        <input name="whatsapp" type="tel" value={bookingForm.whatsapp} onChange={handleInputChange} placeholder="+44 7700 000000" style={inp} />
                      </div>
                      <button onClick={() => { if (bookingForm.fullName && bookingForm.email && bookingForm.phone) setBookingSubStep(2); }}
                        disabled={!bookingForm.fullName || !bookingForm.email || !bookingForm.phone}
                        style={{
                          padding: "0.875rem", background: "linear-gradient(135deg,#E68213,#0070A1)",
                          color: "#fff", border: "none", borderRadius: "0.875rem",
                          fontWeight: "700", cursor: "pointer", opacity: (!bookingForm.fullName || !bookingForm.email || !bookingForm.phone) ? 0.4 : 1,
                        }}>
                        Next: Travel Details →
                      </button>
                    </div>
                  )}

                  {/* {bookingSubStep === 2 && (
                    <form onSubmit={handleBookingSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div>
                          <label style={lbl}>Check-in Date</label>
                          <input name="checkInDate" type="date" value={bookingForm.checkInDate} onChange={handleInputChange} style={inp} required />
                        </div>
                        <div>
                          <label style={lbl}>Check-out Date</label>
                          <input name="checkOutDate" type="date" value={bookingForm.checkOutDate} onChange={handleInputChange} style={inp} required />
                        </div>
                      </div>
                      <div>
                        <label style={lbl}>Number of Guests</label>
                        <input name="guests" type="number" min="1" max="10" value={bookingForm.guests} onChange={handleInputChange} style={inp} />
                      </div>
                      <div>
                        <label style={lbl}>Special Requests <span style={{ color: "#9CA3AF", fontWeight: "400" }}>(optional)</span></label>
                        <textarea name="specialRequests" value={bookingForm.specialRequests} onChange={handleInputChange} rows={3} placeholder="Early check-in, wheelchair access, adjoining rooms..." style={{ ...inp, resize: "vertical" }} />
                      </div>
                      <button type="submit" disabled={isSubmitting || !bookingForm.checkInDate || !bookingForm.checkOutDate} style={{
                        padding: "1rem", background: isSubmitting ? "#D1D5DB" : "linear-gradient(135deg,#E68213,#0070A1)",
                        color: "#fff", border: "none", borderRadius: "0.875rem",
                        fontWeight: "700", fontSize: "1rem", cursor: isSubmitting ? "not-allowed" : "pointer",
                      }}>
                        {isSubmitting ? "⏳ Sending request..." : "✅ Confirm Booking Request"}
                      </button>
                    </form>
                  )} */}
                  {bookingSubStep === 2 && (
  <form
    onSubmit={handleBookingSubmit}
    className="flex flex-col gap-5"
  >
    {/* Dates */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label style={lbl}>Check-in Date</label>
        <input
          name="checkInDate"
          type="date"
          value={bookingForm.checkInDate}
          onChange={handleInputChange}
          style={inp}
          required
          className="w-full"
        />
      </div>

      <div>
        <label style={lbl}>Check-out Date</label>
        <input
          name="checkOutDate"
          type="date"
          value={bookingForm.checkOutDate}
          onChange={handleInputChange}
          style={inp}
          required
          className="w-full"
        />
      </div>
    </div>

    {/* Guests */}
    <div>
      <label style={lbl}>Number of Guests</label>
      <input
        name="guests"
        type="number"
        min="1"
        max="10"
        value={bookingForm.guests}
        onChange={handleInputChange}
        style={inp}
        className="w-full"
      />
    </div>

    {/* Special Requests */}
    <div>
      <label style={lbl}>
        Special Requests{" "}
        <span className="text-gray-400 font-normal">
          (optional)
        </span>
      </label>

      <textarea
        name="specialRequests"
        value={bookingForm.specialRequests}
        onChange={handleInputChange}
        rows={4}
        placeholder="Early check-in, wheelchair access, adjoining rooms..."
        style={{ ...inp, resize: "vertical" }}
        className="w-full"
      />
    </div>

    {/* Submit */}
    <button
      type="submit"
      disabled={
        isSubmitting ||
        !bookingForm.checkInDate ||
        !bookingForm.checkOutDate
      }
      className={`w-full rounded-2xl py-4 font-bold text-white transition ${
        isSubmitting ||
        !bookingForm.checkInDate ||
        !bookingForm.checkOutDate
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-gradient-to-r from-[#E68213] to-[#0070A1] hover:opacity-90"
      }`}
    >
      {isSubmitting
        ? "⏳ Sending request..."
        : "✅ Confirm Booking Request"}
    </button>
  </form>
)}
                </div>
              </div>

              {/* Sidebar summary */}
              <div style={{ position: "sticky", top: "80px" }}>
                <div style={{ background: "#fff", borderRadius: "1.25rem", padding: "1.5rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                  <h3 style={{ fontSize: "0.75rem", fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Your Booking</h3>

                  {selectedPackage && (
                    <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #F3F4F6" }}>
                      <p style={{ fontSize: "0.7rem", color: "#9CA3AF", margin: "0 0 0.25rem" }}>Package</p>
                      <p style={{ fontWeight: "600", fontSize: "0.875rem", margin: 0 }}>{selectedPackage.title}</p>
                    </div>
                  )}

                  <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #F3F4F6" }}>
                    <p style={{ fontSize: "0.7rem", color: "#9CA3AF", margin: "0 0 0.5rem" }}>Hotel</p>
                    <p style={{ fontWeight: "600", fontSize: "0.875rem", margin: "0 0 0.2rem" }}>{selectedHotel.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "#9CA3AF", margin: 0 }}>📍 {selectedHotel.distanceFromHaram}</p>
                  </div>

                  <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #F3F4F6" }}>
                    <p style={{ fontSize: "0.7rem", color: "#9CA3AF", margin: "0 0 0.25rem" }}>Room</p>
                    <p style={{ fontWeight: "600", fontSize: "0.875rem", margin: 0 }}>{selectedRoom.type}</p>
                  </div>

                  <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #F3F4F6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                      <span style={{ color: "#6B7280" }}>£{selectedRoom.price} × {nightsCount} nights</span>
                      <span>£{(selectedRoom.price * nightsCount).toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                      <span style={{ color: "#9CA3AF" }}>Taxes & fees</span>
                      <span style={{ color: "#9CA3AF" }}>Included</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "700" }}>Total</span>
                    <span style={{ fontSize: "1.5rem", fontWeight: "900", color: "#E68213" }}>£{totalPrice.toLocaleString()}</span>
                  </div>

                  <p style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: "0.75rem", lineHeight: "1.5" }}>
                    This is an enquiry — our team confirms availability & contacts you within 5 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 6: Success (no popup here — popup handles it) ── */}
        {step === 6 && !showAgentPopup && (
          <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center", padding: "3rem 0" }}>
            <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>✅</div>
            <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.75rem" }}>Booking Confirmed!</h1>
            <p style={{ color: "#6B7280", marginBottom: "2rem" }}>Your agent will be in touch within 5 minutes.</p>
            <button onClick={() => { setStep(1); setSelectedPackage(null); setSelectedHotel(null); setSelectedRoom(null); }} style={{
              padding: "0.875rem 2rem", background: "linear-gradient(135deg,#E68213,#0070A1)",
              color: "#fff", border: "none", borderRadius: "1rem", fontWeight: "700", cursor: "pointer",
            }}>
              ← Start New Booking
            </button>
          </div>
        )}
      </div>

      {/* Hotel Drawer */}
      {drawerHotel && (
        <HotelDrawer
          hotel={drawerHotel}
          onClose={() => setDrawerHotel(null)}
          onConfirm={() => { setSelectedHotel(drawerHotel); setDrawerHotel(null); goToStep(4); }}
        />
      )}

      {/* Agent Contact Popup */}
      {showAgentPopup && assignedAgent && (
        <AgentPopup
          agent={assignedAgent}
          bookingForm={bookingForm}
          selectedHotel={selectedHotel}
          selectedRoom={selectedRoom}
          totalPrice={totalPrice}
          key={user?.email || "loading"} user={user}
          onClose={() => {
            setShowAgentPopup(false);
            setStep(1);
            setSelectedPackage(null);
            setSelectedHotel(null);
            setSelectedRoom(null);
          }}
        />
      )}

      <style>{`
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}