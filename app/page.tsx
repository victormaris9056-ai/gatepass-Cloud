"use client";
import { useState } from "react";

const SELAR = "https://selar.com/4du163999g";
const WHATSAPP = "https://wa.me/2347037250820?text=Hello%20Gatepass%20Cloud";

const COUNTRIES = [
  "NG","US","GB","DE","GH","CA","AU","FR","IT","NL","ES","SE","NO","DK","BE","CH","AT","IE","PT","PL","ZA","KE","UG","TZ","RW","ZM","ZW","BW","NA","MU","ET","EG","MA","DZ","TN","AE","SA","QA","KW","OM","BH","JO","LB","TR","IN","PK","BD","LK","NP","PH","MY","SG","ID","TH","VN","KH","MM","BN","JP","KR","CN","HK","TW","NZ","FJ","BR","AR","CL","CO","PE","MX","PA","CR","DO","JM","TT","BB","BS","GY","UY","PY","EC","BO","GT","HN","SV","NI"
];

const COUNTRY_NAMES: any = {
  NG: "Nigeria", US: "United States", GB: "United Kingdom", DE: "Germany",
  GH: "Ghana", CA: "Canada", AU: "Australia", FR: "France", IT: "Italy",
  NL: "Netherlands", ES: "Spain", SE: "Sweden", NO: "Norway", DK: "Denmark",
  BE: "Belgium", CH: "Switzerland", AT: "Austria", IE: "Ireland", PT: "Portugal",
  PL: "Poland", ZA: "South Africa", KE: "Kenya", UG: "Uganda", TZ: "Tanzania",
  RW: "Rwanda", ZM: "Zambia", ZW: "Zimbabwe", BW: "Botswana", NA: "Namibia",
  MU: "Mauritius", ET: "Ethiopia", EG: "Egypt", MA: "Morocco", DZ: "Algeria",
  TN: "Tunisia", AE: "United Arab Emirates", SA: "Saudi Arabia", QA: "Qatar",
  KW: "Kuwait", OM: "Oman", BH: "Bahrain", JO: "Jordan", LB: "Lebanon",
  TR: "Turkey", IN: "India", PK: "Pakistan", BD: "Bangladesh", LK: "Sri Lanka",
  NP: "Nepal", PH: "Philippines", MY: "Malaysia", SG: "Singapore", ID: "Indonesia",
  TH: "Thailand", VN: "Vietnam", KH: "Cambodia", MM: "Myanmar", BN: "Brunei",
  JP: "Japan", KR: "South Korea", CN: "China", HK: "Hong Kong", TW: "Taiwan",
  NZ: "New Zealand", FJ: "Fiji", BR: "Brazil", AR: "Argentina", CL: "Chile",
  CO: "Colombia", PE: "Peru", MX: "Mexico", PA: "Panama", CR: "Costa Rica",
  DO: "Dominican Republic", JM: "Jamaica", TT: "Trinidad & Tobago", BB: "Barbados",
  BS: "Bahamas", GY: "Guyana", UY: "Uruguay", PY: "Paraguay", EC: "Ecuador",
  BO: "Bolivia", GT: "Guatemala", HN: "Honduras", SV: "El Salvador", NI: "Nicaragua"
};

const PLATES: any = {
  NG: "KJA-123AB", GB: "AB12 CDE", US: "7ABC123", DE: "B AB 1234",
  GH: "GT 1234-21", CA: "ABCD 123", AU: "ABC-12D", FR: "AB-123-CD",
  IT: "AB 123CD", NL: "12-AB-34", ES: "1234 ABC", SE: "ABC 123",
  NO: "AB 12345", DK: "AB 12 345", BE: "1-ABC-123", CH: "ZH 123456",
  AT: "W 12345 A", IE: "191-D-1234", PT: "AA-12-BB", PL: "WWA 1A234",
  ZA: "CA 123-456", KE: "KDA 123A", UG: "UAJ 123A", TZ: "T123 ABC",
  RW: "RAB 123A", ZM: "BAF 1234", ZW: "ACD 1234", BW: "B 123 ABC",
  NA: "N 12345 W", MU: "1234 AB 12", ET: "2-12345-AA", EG: "123 ABC",
  MA: "12345 | أ | 12", DZ: "12345 123 16", TN: "123 تونس 4567",
  AE: "A 12345", SA: "1234 ABC", QA: "123456", KW: "12 12345",
  OM: "12345", BH: "123456", JO: "12-12345", LB: "B 123456",
  TR: "34 ABC 123", IN: "MH 01 AB 1234", PK: "ABC-123", BD: "GA-12-1234",
  LK: "WP ABC-1234", NP: "BA 1 JA 1234", PH: "ABC 1234", MY: "WAB 1234",
  SG: "SBA 1234A", ID: "B 1234 ABC", TH: "กข 1234", VN: "30A-123.45",
  KH: "2AB-1234", MM: "YGN-12-1234", BN: "BAH 1234", JP: "品川 300 あ 1234",
  KR: "12가 1234", CN: "京A·12345", HK: "AB 1234", TW: "ABC-1234",
  NZ: "ABC123", FJ: "AB 123", BR: "ABC1D23", AR: "AA 123 AA",
  CL: "AB·CD·12", CO: "ABC 123", PE: "ABC-123", MX: "ABC-123-A",
  PA: "AB1234", CR: "ABC123", DO: "A123456", JM: "1234 AB",
  TT: "PCD 1234", BB: "X 1234", BS: "AB 1234", GY: "PAA 1234",
  UY: "SAA 1234", PY: "AABC 123", EC: "ABC-1234", BO: "1234 ABC",
  GT: "P123ABC", HN: "HAA 1234", SV: "P 123-456", NI: "M 123 456"
};

const PRICING: any = {
  NG: { starter: "₦15,000", pro: "₦50,000", enterprise: "₦150,000" },
  US: { starter: "$49", pro: "$149", enterprise: "$499" },
  GB: { starter: "£49", pro: "£149", enterprise: "£499" },
  DEFAULT: { starter: "$49", pro: "$149", enterprise: "$499" },
};

export default function Dashboard() {
  const [country, setCountry] = useState("NG");
  const getPrice = () => {
    if (country === "NG") return PRICING.NG;
    if (country === "GB") return PRICING.GB;
    return PRICING.US;
  };
  const price = getPrice();
  const plate = PLATES[country] || `${country} 123 ABC`;

  return (
    <div className="min-h-screen bg-[#050b14] text-white font-sans relative">
      <header className="flex justify-between items-center px-6 py-4 bg-[#020610] border-b border-cyan-900/30">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Gatepass" className="w-10 h-10 rounded-full border border-cyan-400" />
          <div>
            <h1 className="text-xl font-bold">Gatepass Cloud</h1>
            <p className="text-[10px] text-gray-400">Global Visitor Management System</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="bg-[#0a1628] border border-cyan-700 rounded-lg px-3 py-2 text-xs outline-none min-w-[180px]">
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{COUNTRY_NAMES[c]} ({c})</option>
            ))}
          </select>
          <div className="flex items-center gap-2 bg-[#0a1628] border border-cyan-800 rounded-full px-3 py-1 text-[11px]">
            <div className="w-6 h-6 bg-cyan-500 text-black font-bold rounded flex items-center justify-center">AD</div>
            Admin — Global HQ
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-[160px] bg-[#080e1d] border-r border-cyan-900/20 p-3 min-h-screen hidden md:block">
          <div className="bg-cyan-600 rounded-lg px-3 py-2 text-xs mb-1">Dashboard</div>
          <div className="px-3 py-2 text-xs text-gray-400">Visitors</div>
          <div className="px-3 py-2 text-xs text-gray-400">QR Passes</div>
          <div className="px-3 py-2 text-xs text-gray-400">AI Face Log</div>
          <div className="px-3 py-2 text-xs text-gray-400">License Plate Scanner</div>
          <div className="px-3 py-2 text-xs text-gray-400">Entry/Exit Logs</div>
          <div className="px-3 py-2 text-xs text-gray-400">Devices</div>
          <div className="px-3 py-2 text-xs text-gray-400">Reports</div>
          <div className="px-3 py-2 text-xs text-gray-400">Settings</div>
          <div className="mt-10 text-[10px] text-green-400">● System: Online</div>
        </aside>

        <main className="flex-1 p-4">
          <div className="bg-[#0a1428] border border-cyan-900/30 rounded-xl p-4 mb-4 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg">Dashboard Overview — {COUNTRY_NAMES[country]}</h2>
              <p className="text-[11px] text-gray-400">Real-time monitoring for {COUNTRY_NAMES[country]} • Updated just now</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-[#0f1e35] border border-cyan-900/20 rounded-lg p-3 text-center min-w-[120px]">
                <p className="text-[10px] text-gray-400">Today's Visitors</p>
                <p className="text-2xl font-bold">128</p>
                <p className="text-[10px] text-green-400">↑12% vs yesterday</p>
              </div>
              <div className="bg-[#0f1e35] border border-cyan-900/20 rounded-lg p-3 text-center min-w-[120px]">
                <p className="text-[10px] text-gray-400">Active Passes</p>
                <p className="text-2xl font-bold">64</p>
                <p className="text-[10px] text-gray-400">32 Checked In • 28 Pending</p>
              </div>
              <div className="bg-[#0f1e35] border border-green-900/30 rounded-lg p-3 text-center min-w-[120px]">
                <p className="text-[10px] text-gray-400">Security Status</p>
                <p className="text-xl font-bold text-green-400">Secure</p>
                <p className="text-[10px] text-gray-400">No threats • 24/7 Monitoring</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FIXED: AI FACE LOG NOW FULL - NOT EMPTY */}
            <div className="bg-[#0a1428] border border-cyan-900/30 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <p className="font-bold text-sm">🧠 AI Face Log — Live</p>
                <span className="text-[9px] bg-green-900/40 border border-green-600/30 text-green-400 px-2 py-0.5 rounded-full animate-pulse">● Live AI</span>
              </div>
              
              <div className="flex gap-3 mt-3 bg-black/50 p-3 rounded-lg border border-cyan-600/30">
                <img src="https://i.pravatar.cc/100?img=12" className="w-16 h-16 rounded border-2 border-cyan-500" alt="" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-xs font-bold">Face ID Verification</p>
                    <p className="text-[9px] bg-green-700 px-2 py-0.5 rounded-full">Verified 98.7%</p>
                  </div>
                  <p className="text-xs mt-1">Detected: <b>John Martinez</b> — {COUNTRY_NAMES[country]}</p>
                  <p className="text-[10px] text-gray-400">Time: 09:38:12 • Gate 1 Entry • Confidence 98.7%</p>
                  <div className="w-full h-1 bg-gray-800 rounded mt-2"><div className="h-1 bg-cyan-400 rounded w-[98%]"></div></div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-bold">Recent Detections <span className="text-[9px] text-gray-500 font-normal">Today</span></p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between bg-[#0f1e35]/70 border border-cyan-900/20 rounded-lg px-2 py-2">
                    <div className="flex items-center gap-2">
                      <img src="https://i.pravatar.cc/100?img=32" className="w-6 h-6 rounded-full" alt="" />
                      <div><p className="text-[11px]">Sarah Lee</p><p className="text-[9px] text-gray-500">09:30 • Exit • Gate 2</p></div>
                    </div>
                    <span className="text-[9px] bg-green-700/50 text-green-300 px-2 py-0.5 rounded-full">Verified 97.2%</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#0f1e35]/70 border border-cyan-900/20 rounded-lg px-2 py-2">
                    <div className="flex items-center gap-2">
                      <img src="https://i.pravatar.cc/100?img=8" className="w-6 h-6 rounded-full" alt="" />
                      <div><p className="text-[11px]">Michael Chen</p><p className="text-[9px] text-gray-500">09:22 • Entry • Gate 1</p></div>
                    </div>
                    <span className="text-[9px] bg-green-700/50 text-green-300 px-2 py-0.5 rounded-full">Verified 99.1%</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#0f1e35]/70 border border-cyan-900/20 rounded-lg px-2 py-2">
                    <div className="flex items-center gap-2">
                      <img src="https://i.pravatar.cc/100?img=26" className="w-6 h-6 rounded-full" alt="" />
                      <div><p className="text-[11px]">Emily Rodriguez</p><p className="text-[9px] text-gray-500">09:10 • Entry • QR + Face</p></div>
                    </div>
                    <span className="text-[9px] bg-green-700/50 text-green-300 px-2 py-0.5 rounded-full">Verified 98.4%</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#0f1e35]/70 border border-red-900/20 rounded-lg px-2 py-2">
                    <div className="flex items-center gap-2">
                      <img src="https://i.pravatar.cc/100?img=15" className="w-6 h-6 rounded-full" alt="" />
                      <div><p className="text-[11px]">Unknown</p><p className="text-[9px] text-gray-500">09:05 • Attempted • Gate 3</p></div>
                    </div>
                    <span className="text-[9px] bg-red-800/60 text-red-300 px-2 py-0.5 rounded-full">Flagged 42%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="bg-black/30 rounded p-2 text-center border border-cyan-900/20"><p className="text-[9px] text-gray-400">Today Scans</p><p className="text-sm font-bold text-cyan-300">84</p></div>
                <div className="bg-black/30 rounded p-2 text-center border border-cyan-900/20"><p className="text-[9px] text-gray-400">Avg Accuracy</p><p className="text-sm font-bold text-green-400">97.8%</p></div>
                <div className="bg-black/30 rounded p-2 text-center border border-cyan-900/20"><p className="text-[9px] text-gray-400">Blocked</p><p className="text-sm font-bold text-red-400">2</p></div>
              </div>
            </div>

            <div className="bg-[#0a1428] border border-cyan-900/30 rounded-xl p-4 text-center">
              <p className="font-bold text-sm">Visitor Pass — QR Code</p>
              <p className="text-[10px] text-cyan-300">Active Pass ID: GP-849271</p>
              <div className="w-28 h-28 bg-white mx-auto my-3 rounded-lg p-1 shadow-[0_0_15px_#00e5ff]">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GP-849271-EMILY-RODRIGUEZ-GATEPASS" alt="QR Code" className="w-full h-full" />
              </div>
              <p className="text-xs">Visitor: Emily Rodriguez</p>
              <p className="text-[10px] text-gray-400">Property: Sunridge Residence • Unit 12B</p>
              <p className="text-[10px] text-green-400">Valid until Today, 23:59</p>
              <div className="flex gap-2 justify-center mt-3">
                <button className="border border-cyan-800 px-3 py-1 rounded text-[10px]">Share Pass</button>
                <button className="border border-cyan-800 px-3 py-1 rounded text-[10px]">Revoke</button>
              </div>
              <div className="mt-4 pt-3 border-t border-cyan-900/20">
                <p className="text-[9px] text-cyan-400 tracking-widest">▼ SCAN TO VERIFY ▼</p>
                <div className="flex items-center justify-center gap-2 mt-2 bg-black/40 rounded p-2 border border-cyan-900/20">
                  <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-400 rounded flex items-center justify-center">📷</div>
                  <div className="text-left">
                    <p className="text-[9px] text-cyan-300">Scanner Active</p>
                    <p className="text-[8px] text-gray-500">Place QR under scanner • {COUNTRY_NAMES[country]}</p>
                  </div>
                </div>
                <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-2"></div>
              </div>
            </div>

            <div className="bg-[#0a1428] border border-cyan-900/30 rounded-xl p-4">
              <p className="font-bold text-sm">License Plate Scanner — {COUNTRY_NAMES[country]}</p>
              <div className="bg-black/60 border border-cyan-800/40 rounded-lg p-4 mt-3 text-center">
                <p className="text-2xl tracking-widest text-cyan-300 font-mono">{plate}</p>
                <div className="text-left mt-3 space-y-1">
                  <p className="text-[11px]">Authorized <span className="bg-gray-700 px-2 py-0.5 rounded text-[10px] ml-2">Registered</span></p>
                  <p className="text-[11px]">Vehicle: Tesla Model Y — Black</p>
                  <p className="text-[10px] text-gray-400">Last Scan: 09:35:04 • {COUNTRY_NAMES[country]} • {country}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0a1428] border border-cyan-900/30 rounded-xl p-4">
              <p className="font-bold text-sm">Visitor List</p>
              <div className="mt-3 text-[11px] space-y-2">
                <div className="flex justify-between text-gray-400 text-[10px] border-b border-gray-700 pb-1"><span>VISITOR</span><span>STATUS</span></div>
                <div className="flex justify-between"><span>1. David Kim - Delivery</span><span className="bg-green-600 px-2 rounded-full text-[10px]">Checked In</span></div>
                <div className="flex justify-between"><span>2. Anna Patel - Airbnb</span><span className="bg-green-600 px-2 rounded-full text-[10px]">Checked In</span></div>
                <div className="flex justify-between"><span>3. Ryan Park - Plumbing</span><span className="bg-yellow-700 px-2 rounded-full text-[10px]">Exited 09:10</span></div>
                <div className="flex justify-between"><span>4. Luis Gomez - Family</span><span className="bg-yellow-600 px-2 rounded-full text-[10px]">Pending</span></div>
              </div>
            </div>
          </div>

          <div className="bg-[#0a1428] border border-cyan-500/20 rounded-xl p-5 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold">Current Plan Pricing — {COUNTRY_NAMES[country]} ({country})</h3>
                <p className="text-[11px] text-gray-400">Selar Custom Editable: NGN, USD, GBP</p>
              </div>
              <p className="text-[10px] text-gray-500">86 countries supported</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#050b14] border border-cyan-900/30 rounded-lg p-4 text-center">
                <p className="text-[11px] text-gray-400">STARTER</p>
                <p className="text-2xl font-bold text-cyan-300 mt-1">{price.starter}</p>
                <p className="text-[10px] text-gray-500 mt-1">1 Gate • 500 Visitors</p>
                <a href={SELAR} target="_blank" className="block bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold py-2 rounded mt-3">BUY STARTER</a>
              </div>
              <div className="bg-cyan-900/20 border border-cyan-500/40 rounded-lg p-4 text-center relative">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[9px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>
                <p className="text-[11px] text-cyan-300">PRO</p>
                <p className="text-2xl font-bold text-cyan-300 mt-1">{price.pro}</p>
                <p className="text-[10px] text-gray-400 mt-1">5 Gates • Unlimited Visitors</p>
                <a href={SELAR} target="_blank" className="block bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold py-2 rounded mt-3">BUY PRO — {price.pro}</a>
              </div>
              <div className="bg-[#050b14] border border-cyan-900/30 rounded-lg p-4 text-center">
                <p className="text-[11px] text-gray-400">ENTERPRISE</p>
                <p className="text-2xl font-bold text-cyan-300 mt-1">{price.enterprise}</p>
                <p className="text-[10px] text-gray-500 mt-1">Unlimited Gates • API Access</p>
                <a href={SELAR} target="_blank" className="block bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold py-2 rounded mt-3">BUY ENTERPRISE</a>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* FIXED: REALISTIC WHATSAPP - WHITE CIRCLE WITH OFFICIAL LOGO */}
      <a href={WHATSAPP} target="_blank" className="fixed bottom-6 right-6 z-50">
        <div className="w-[56px] h-[56px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-gray-100 hover:scale-110 transition-transform">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-[32px] h-[32px]" />
        </div>
      </a>
    </div>
  );
}