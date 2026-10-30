"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

export default function QrPassPage() {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [country, setCountry] = useState("NG");
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("gatepass_country");
    if (saved) setCountry(saved);
  }, []);
  useEffect(() => { localStorage.setItem("gatepass_country", country); }, [country]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await supabase.from("visitors").select("*").order("created_at", { ascending: false });
      setVisitors(data || []);
      if (data && data[0]) setSelected(data[0]);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = visitors.filter(v => {
    const name = (v.full_name || v.name || "").toLowerCase();
    return name.includes(search.toLowerCase()) || (v.phone || "").includes(search);
  });

  const displayName = selected ? (selected.full_name || selected.name) : "No Visitor";
  const qrData = selected ? `GATEPASS-${selected.id}-${displayName}-${country}-${Date.now()}` : "GATEPASS-CLOUD";
  const passId = selected ? `GP-${selected.id?.slice(0,6).toUpperCase()}` : "GP-000000";

  return (
    <div className="min-h-screen bg-[#050b14] text-white font-sans">
      <header className="flex justify-between items-center px-6 py-4 bg-[#020610] border-b border-cyan-900/30 sticky top-0 z-20">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Gatepass" className="w-9 h-9 rounded-full border border-cyan-400" />
          <div>
            <h1 className="text-[15px] font-bold leading-none">Gatepass Cloud</h1>
            <p className="text-[10px] text-gray-500 mt-1">QR Pass • {COUNTRY_NAMES[country]}</p>
          </div>
        </a>
        <div className="flex items-center gap-3">
          <a href="/visitors" className="text-xs text-gray-400 hover:text-white px-3 py-2 border border-cyan-900/30 rounded-lg bg-[#0a1628]">Visitors</a>
          <select value={country} onChange={e=>setCountry(e.target.value)} className="bg-[#0a1628] border border-cyan-700 rounded-lg px-3 py-2.5 text-xs outline-none min-w-[200px]">
            {COUNTRIES.map(c => <option key={c} value={c}>{COUNTRY_NAMES[c]} ({c})</option>)}
          </select>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT — VISITOR LIST */}
        <div className="bg-[#0a1428] rounded-2xl border border-cyan-900/30 overflow-hidden h-fit">
          <div className="p-5 border-b border-white/5 bg-[#080e1d]/50">
            <h3 className="font-bold text-sm">Select Visitor</h3>
            <p className="text-[11px] text-gray-500 mt-1">{COUNTRY_NAMES[country]} Gatepass • {visitors.length} total</p>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search visitor..." className="w-full mt-3 px-4 py-2.5 rounded-xl bg-[#050b14] border border-cyan-900/30 text-sm outline-none focus:border-cyan-600 placeholder:text-white/30" />
          </div>
          <div className="max-h-[500px] overflow-auto divide-y divide-white/[0.04]">
            {loading ? <div className="p-8 text-center text-white/30 text-sm">Loading...</div> :
            filtered.map(v => (
              <div key={v.id} onClick={()=>setSelected(v)} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-white/[0.03] transition ${selected?.id===v.id ? 'bg-cyan-500/10 border-l-2 border-l-cyan-400' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-xs">{(v.full_name||v.name||"V").charAt(0).toUpperCase()}</div>
                <div className="flex-1"><p className="text-[13px] font-bold">{v.full_name||v.name}</p><p className="text-[11px] text-white/40">{v.phone}</p></div>
                {selected?.id===v.id && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* CENTER — QR CARD - PROFESSIONAL DARK */}
        <div className="lg:col-span-2">
          <div className="bg-[#0a1428] rounded-[24px] border border-cyan-900/30 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* GLOW */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-600/20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-cyan-300/60">GATEPASS CLOUD • VERIFIED PASS</p>
                  <h2 className="text-2xl font-bold mt-1">Visitor Pass — QR Code</h2>
                  <p className="text-xs text-white/50 mt-1">Active Pass ID: <span className="text-cyan-300 font-mono">{passId}</span> • {COUNTRY_NAMES[country]}</p>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">● ACTIVE • SECURE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-[20px] p-4 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`} alt="QR" className="w-[180px] h-[180px]" />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-3 font-mono tracking-wider">{qrData.slice(0,28)}...</p>
                  <div className="flex gap-2 mt-4">
                    <button onClick={()=>window.print()} className="px-4 py-2 rounded-xl bg-[#0f1e35] border border-cyan-900/30 text-xs hover:bg-white/10">🖨 Print</button>
                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-xs font-bold">📤 Share Pass</button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#050b14]/80 border border-cyan-900/30 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 tracking-widest">VISITOR NAME</p>
                    <p className="font-bold text-lg mt-1">{displayName}</p>
                    <p className="text-xs text-white/50 mt-1">📞 {selected?.phone || "No phone"} • {country}</p>
                  </div>
                  <div className="bg-[#050b14]/80 border border-cyan-900/30 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 tracking-widest">PROPERTY DETAILS</p>
                    <p className="text-sm font-bold mt-1">Sunridge Residence • Unit 12B</p>
                    <p className="text-[11px] text-white/40 mt-1">Gate 1 Entry • {COUNTRY_NAMES[country]} • {new Date().toLocaleDateString()}</p>
                    <p className="text-[11px] text-emerald-400 mt-2">Valid until Today, 23:59 • Auto-synced</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-black/30 rounded-lg p-2.5 text-center border border-cyan-900/20"><p className="text-[9px] text-gray-500">STATUS</p><p className="text-xs font-bold text-green-400">Verified</p></div>
                    <div className="bg-black/30 rounded-lg p-2.5 text-center border border-cyan-900/20"><p className="text-[9px] text-gray-500">TYPE</p><p className="text-xs font-bold text-cyan-300">Day Pass</p></div>
                    <div className="bg-black/30 rounded-lg p-2.5 text-center border border-cyan-900/20"><p className="text-[9px] text-gray-500">GATE</p><p className="text-xs font-bold">Gate 1</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM INFO */}
          <div className="mt-4 bg-[#0a1428]/50 border border-cyan-900/20 rounded-xl p-4 flex justify-between items-center text-[11px] text-gray-500">
            <span>🔒 Secured by Gatepass Cloud • {COUNTRY_NAMES[country]} ({country}) • Supabase Live</span>
            <span className="text-cyan-400">Scan at gate to verify</span>
          </div>
        </div>
      </div>
    </div>
  );
}