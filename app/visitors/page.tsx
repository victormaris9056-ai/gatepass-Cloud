"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 86 COUNTRIES — SAME LIKE DASHBOARD
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

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("NG");

  // AUTOMATIC SYNC FROM DASHBOARD
  useEffect(() => {
    const saved = localStorage.getItem("gatepass_country");
    if (saved) setCountry(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("gatepass_country", country);
  }, [country]);

  async function loadVisitors() {
    setLoading(true);
    const { data } = await supabase.from("visitors").select("*").order("created_at", { ascending: false });
    setVisitors(data || []);
    setLoading(false);
  }

  useEffect(() => { loadVisitors(); }, []);

  async function addVisitor() {
    if (!fullName.trim()) return alert("Enter full name");
    const { error } = await supabase.from("visitors").insert([{ 
      name: fullName.trim(), 
      full_name: fullName.trim(), 
      phone: phone.trim(),
      country: country
    }]);
    if (error) alert("Error: " + error.message);
    else { setFullName(""); setPhone(""); loadVisitors(); }
  }

  const filtered = visitors.filter(v => {
    const name = v.full_name || v.name || "";
    const ph = v.phone || "";
    return name.toLowerCase().includes(search.toLowerCase()) || ph.includes(search);
  });

  return (
    <div className="min-h-screen bg-[#050b14] text-white font-sans">
      {/* DARK PROFESSIONAL HEADER — SAME LIKE DASHBOARD */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#020610] border-b border-cyan-900/30 sticky top-0 z-20">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Gatepass" className="w-9 h-9 rounded-full border border-cyan-400" />
          <div>
            <h1 className="text-[15px] font-bold leading-none">Gatepass Cloud</h1>
            <p className="text-[10px] text-gray-500 mt-1">Global Visitor Management</p>
          </div>
        </a>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#0a1628] border border-cyan-800 rounded-full px-3 py-1.5 text-[11px]">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            System Online • {visitors.length} Visitors
          </div>
          {/* 86 COUNTRIES SELECTOR — DARK PROFESSIONAL */}
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="bg-[#0a1628] border border-cyan-700 rounded-lg px-3 py-2.5 text-xs outline-none min-w-[200px] focus:border-cyan-400">
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{COUNTRY_NAMES[c]} ({c})</option>
            ))}
          </select>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* BACK + TITLE */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-[#3b82f6] text-sm font-medium mb-3 hover:text-white transition">
              ← Back to Dashboard
            </a>
            <h1 className="text-3xl font-bold tracking-tight">Visitors</h1>
            {/* DYNAMIC COUNTRY TITLE — NOW AUTOMATIC */}
            <p className="text-white/50 mt-1 text-sm">
              Manage all visitors for your estate — <span className="text-cyan-300 font-semibold">{COUNTRY_NAMES[country]} Gatepass Cloud</span> • {country}
            </p>
          </div>
          <div className="bg-[#0a1428] border border-cyan-900/30 px-5 py-2.5 rounded-xl text-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold text-xs">{country}</div>
            <div>
              <p className="text-[11px] text-gray-400 leading-none">Total Visitors</p>
              <p className="font-bold text-lg leading-none mt-1">{visitors.length}</p>
            </div>
          </div>
        </div>

        {/* ADD VISITOR — DARK GLASS CARD */}
        <div className="bg-[#0a1428] rounded-2xl p-6 border border-cyan-900/30 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm tracking-wide">+ Add New Visitor</h3>
            <span className="text-[10px] bg-[#0f1e35] border border-cyan-900/30 px-3 py-1 rounded-full text-cyan-300">🌍 {COUNTRY_NAMES[country]} ({country}) • Auto-synced from Dashboard</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full Name — e.g John Ade" className="flex-1 min-w-[220px] px-5 py-3.5 rounded-xl bg-[#050b14] border border-cyan-900/30 focus:border-cyan-500 outline-none text-white placeholder:text-white/30 text-sm transition" />
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone — 080..." className="flex-1 min-w-[220px] px-5 py-3.5 rounded-xl bg-[#050b14] border border-cyan-900/30 focus:border-cyan-500 outline-none text-white placeholder:text-white/30 text-sm transition" />
            <button onClick={addVisitor} className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] transition">Add Visitor</button>
          </div>
        </div>

        {/* VISITORS LIST — DARK PROFESSIONAL TABLE */}
        <div className="bg-[#0a1428] rounded-2xl border border-cyan-900/30 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#080e1d]/50">
            <h3 className="font-bold text-sm">All Visitors — {COUNTRY_NAMES[country]} <span className="text-white/30 font-normal text-xs ml-2">• {filtered.length} filtered</span></h3>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or phone..." className="px-4 py-2 rounded-full bg-[#050b14] border border-cyan-900/30 text-sm w-[240px] outline-none focus:border-cyan-600 placeholder:text-white/30 transition" />
          </div>
          {loading ? <div className="p-12 text-center text-white/30 text-sm">Loading visitors from Supabase...</div> :
           filtered.length === 0 ? <div className="p-16 text-center text-white/30 text-sm">No visitors yet — Add one above for {COUNTRY_NAMES[country]}!</div> :
           <div className="divide-y divide-white/[0.04]">
             {filtered.map((v:any) => (
               <div key={v.id} className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                     {(v.full_name || v.name || "V").charAt(0).toUpperCase()}
                   </div>
                   <div>
                     <p className="font-bold text-[13px]">{v.full_name || v.name}</p>
                     <p className="text-xs text-white/40">📞 {v.phone} • {v.country || country} • {v.created_at ? new Date(v.created_at).toLocaleString() : ""}</p>
                   </div>
                 </div>
                 <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wider">VERIFIED</span>
               </div>
             ))}
           </div>
          }
        </div>
      </div>
    </div>
  );
}