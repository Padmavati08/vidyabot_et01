import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Gauge, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';

interface InteractiveDiagramProps {
  type: 'force_vectors' | 'inertia_bus' | 'f_ma_calc' | 'action_reaction_rocket';
  language: LanguageCode;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ type, language }) => {
  const isMr = language === 'mr';
  const isHi = language === 'hi';

  // 1. Force Vector Simulator State
  const [forceLeft, setForceLeft] = useState<number>(30);
  const [forceRight, setForceRight] = useState<number>(30);

  // 2. Inertia Bus Simulator State
  const [busState, setBusState] = useState<'idle' | 'braking' | 'accelerating' | 'coin_flicked'>('idle');

  // 3. F = m * a Simulator State
  const [mass, setMass] = useState<number>(5); // kg
  const [force, setForce] = useState<number>(25); // N

  // 4. Action-Reaction Rocket Simulator State
  const [balloonPressure, setBalloonPressure] = useState<number>(3); // 1-5
  const [isRocketFlying, setIsRocketFlying] = useState<boolean>(false);

  // Helper calculations
  const netForce = forceRight - forceLeft;
  const isBalanced = netForce === 0;
  const acceleration = Number((force / mass).toFixed(2));

  // Handler for balloon launch
  const handleLaunchRocket = () => {
    setIsRocketFlying(true);
    setTimeout(() => {
      setIsRocketFlying(false);
      setBalloonPressure(1);
    }, 2500);
  };

  return (
    <div className="bg-gradient-to-b from-purple-50/50 to-white p-5 rounded-2xl border border-purple-100 shadow-sm my-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6C3BEF] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#3F207C]">
              {type === 'force_vectors' && (isMr ? 'परस्पर विरोधी बले सिम्युलेटर' : isHi ? 'परस्पर विरोधी बल सिम्युलेटर' : 'Interactive Force Vector Simulator')}
              {type === 'inertia_bus' && (isMr ? 'जडत्व प्रात्यक्षिक सिम्युलेटर' : isHi ? 'जड़त्व प्रयोग सिम्युलेटर' : 'Interactive Inertia & Bus Simulator')}
              {type === 'f_ma_calc' && (isMr ? 'F = m × a प्रवेग इंजिन' : isHi ? 'F = m × a त्वरण इंजन' : 'Interactive F = m × a Acceleration Engine')}
              {type === 'action_reaction_rocket' && (isMr ? 'क्रिया-प्रतिक्रिया रॉकेट सिम्युलेटर' : isHi ? 'क्रिया-प्रतिक्रिया रॉकेट सिम्युलेटर' : 'Action-Reaction Rocket Simulator')}
            </h4>
            <p className="text-xs text-slate-500">
              {isMr ? 'खालील नियंत्रणे बदलून प्रत्यक्ष परिणाम पहा' : isHi ? 'नियंत्रणों को बदलकर वास्तविक प्रभाव देखें' : 'Interact with sliders and buttons to observe physics in real-time'}
            </p>
          </div>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-100 text-[#6C3BEF]">
          {isMr ? 'थेट प्रात्यक्षिक' : isHi ? 'लाइव सिमुलेटर' : 'Live Physics Sim'}
        </span>
      </div>

      {/* 1. FORCE VECTOR SIMULATOR */}
      {type === 'force_vectors' && (
        <div className="space-y-5">
          {/* Visual Track */}
          <div className="relative h-44 bg-slate-900 rounded-2xl overflow-hidden flex flex-col justify-end p-4 border border-slate-800">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

            {/* Force Direction Indicators in Sky */}
            <div className="absolute top-3 left-4 flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/70 px-2.5 py-1 rounded-lg border border-emerald-800/60">
              <ArrowLeft className="w-3.5 h-3.5" /> F_Left: {forceLeft} N
            </div>
            <div className="absolute top-3 right-4 flex items-center gap-1.5 text-xs text-indigo-400 font-mono bg-indigo-950/70 px-2.5 py-1 rounded-lg border border-indigo-800/60">
              F_Right: {forceRight} N <ArrowRight className="w-3.5 h-3.5" />
            </div>

            {/* Center Balance Status Marker */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                  isBalanced
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {isBalanced
                  ? (isMr ? 'संतुलित बल (F_net = ० N)' : isHi ? 'संतुलित बल (F_net = 0 N)' : 'Balanced Force (F_net = 0 N)')
                  : (isMr ? `असंतुलित बल (${Math.abs(netForce)} N ${netForce > 0 ? 'उजवीकडे' : 'डावीकडे'})` : isHi ? `असंतुलित बल (${Math.abs(netForce)} N ${netForce > 0 ? 'दाएं' : 'बाएं'})` : `Unbalanced (${Math.abs(netForce)} N ${netForce > 0 ? 'Right' : 'Left'})`)}
              </span>
            </div>

            {/* The Wooden Cart */}
            <div
              className="relative z-10 transition-all duration-300 ease-out flex flex-col items-center mx-auto"
              style={{
                transform: `translateX(${Math.max(-120, Math.min(120, netForce * 2))}px)`,
              }}
            >
              {/* Force Vectors Arrows */}
              <div className="flex items-center gap-1 mb-1">
                {forceLeft > 0 && (
                  <div
                    className="h-1.5 bg-emerald-400 rounded-full flex items-center justify-start text-emerald-300"
                    style={{ width: `${Math.min(70, forceLeft * 0.7)}px` }}
                  >
                    <ArrowLeft className="w-3 h-3 -ml-1 text-emerald-400" />
                  </div>
                )}
                <span className="text-[10px] font-bold text-slate-300 uppercase px-1">Wooden Cart</span>
                {forceRight > 0 && (
                  <div
                    className="h-1.5 bg-indigo-400 rounded-full flex items-center justify-end text-indigo-300"
                    style={{ width: `${Math.min(70, forceRight * 0.7)}px` }}
                  >
                    <ArrowRight className="w-3 h-3 -mr-1 text-indigo-400" />
                  </div>
                )}
              </div>

              {/* Cart Body */}
              <div className="w-28 h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg border-2 border-amber-400/60 shadow-lg flex items-center justify-center text-white font-bold text-xs">
                Mass = 10 kg
              </div>
              {/* Wheels */}
              <div className="w-24 flex justify-between -mt-1.5">
                <div className="w-5 h-5 rounded-full bg-slate-300 border-2 border-slate-700 shadow-sm animate-spin" style={{ animationDuration: isBalanced ? '0s' : `${Math.max(0.4, 3 - Math.abs(netForce) * 0.03)}s` }} />
                <div className="w-5 h-5 rounded-full bg-slate-300 border-2 border-slate-700 shadow-sm animate-spin" style={{ animationDuration: isBalanced ? '0s' : `${Math.max(0.4, 3 - Math.abs(netForce) * 0.03)}s` }} />
              </div>
            </div>

            {/* Ground Track */}
            <div className="w-full h-2 bg-slate-700 rounded-full mt-2 relative">
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-purple-400/80 -translate-x-1/2" />
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1 text-emerald-700">
                  <ArrowLeft className="w-3.5 h-3.5" /> {isMr ? 'डावे बल (F₁)' : isHi ? 'बायां बल (F₁)' : 'Left Push Force (F₁)'}
                </span>
                <span className="font-mono font-bold text-emerald-800">{forceLeft} N</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={forceLeft}
                onChange={(e) => setForceLeft(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1 text-indigo-700">
                  {isMr ? 'उजवे बल (F₂)' : isHi ? 'दायां बल (F₂)' : 'Right Push Force (F₂)'} <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-mono font-bold text-indigo-800">{forceRight} N</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={forceRight}
                onChange={(e) => setForceRight(Number(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. INERTIA SIMULATOR */}
      {type === 'inertia_bus' && (
        <div className="space-y-4">
          {/* Stage */}
          <div className="relative h-48 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-800 flex items-center justify-center">
            {busState === 'coin_flicked' ? (
              /* Coin & Glass Mode */
              <div className="flex flex-col items-center">
                <div className="text-xs font-mono text-amber-300 mb-4">
                  {isMr ? 'नाणे विरामाच्या जडत्वामुळे थेट ग्लासात पडले!' : isHi ? 'सिक्का विराम के जड़त्व से सीधे गिलास में गिरा!' : 'Coin drops straight into glass due to Inertia of Rest!'}
                </div>
                <div className="relative flex flex-col items-center">
                  {/* Coin */}
                  <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-amber-200 text-amber-900 text-[10px] font-extrabold flex items-center justify-center shadow-md animate-bounce">
                    ₹5
                  </div>
                  {/* Glass */}
                  <div className="w-16 h-20 border-2 border-cyan-400/80 bg-cyan-500/10 rounded-b-xl border-t-0 mt-2 flex items-end justify-center pb-2">
                    <span className="text-[10px] text-cyan-300 font-mono">Glass</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Bus Mode */
              <div className="relative w-full max-w-md">
                {/* Status prompt */}
                <div className="text-center mb-3 text-xs font-bold text-slate-300 font-mono">
                  {busState === 'idle' && (isMr ? 'बस सामान्य वेगाने धावत आहे' : isHi ? 'बस सामान्य गति से चल रही है' : 'Bus moving at constant velocity')}
                  {busState === 'braking' && (isMr ? '⚠️ अचानक ब्रेक! गतीच्या जडत्वामुळे प्रवासी पुढे झुकले!' : isHi ? '⚠️ अचानक ब्रेक! गति के जड़त्व से यात्री आगे झुके!' : '⚠️ Sudden Brake! Passengers jerk forward due to Inertia of Motion!')}
                  {busState === 'accelerating' && (isMr ? '⚡ अचानक वेग! विरामाच्या जडत्वामुळे प्रवासी मागे झुकले!' : isHi ? '⚡ अचानक त्वरण! विराम के जड़त्व से यात्री पीछे झुके!' : '⚡ Sudden Acceleration! Passengers jerk backwards due to Inertia of Rest!')}
                </div>

                {/* Bus graphic */}
                <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-4 border-2 border-purple-400 shadow-xl relative">
                  <div className="text-[10px] font-extrabold text-purple-200 tracking-wider uppercase mb-2 flex justify-between">
                    <span>MH-12 State Transport</span>
                    <span>Class 9 Physics Express</span>
                  </div>

                  {/* Windows with passengers */}
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((seat) => (
                      <div key={seat} className="h-14 bg-cyan-950/80 border border-cyan-400/50 rounded-lg p-1 flex flex-col items-center justify-end overflow-hidden">
                        {/* Passenger Figure */}
                        <div
                          className={`flex flex-col items-center transition-transform duration-300 ${
                            busState === 'braking'
                              ? 'rotate-12 translate-x-3 text-amber-300'
                              : busState === 'accelerating'
                              ? '-rotate-12 -translate-x-3 text-purple-300'
                              : 'rotate-0 text-white'
                          }`}
                        >
                          <div className="w-3.5 h-3.5 rounded-full bg-amber-200" />
                          <div className="w-5 h-6 bg-purple-500 rounded-t-md mt-0.5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Wheels */}
                  <div className="flex justify-between px-6 -mb-6 mt-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-slate-400 flex items-center justify-center animate-spin">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-slate-400 flex items-center justify-center animate-spin">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            <button
              onClick={() => {
                setBusState('braking');
                setTimeout(() => setBusState('idle'), 2000);
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all active:scale-95"
            >
              🛑 {isMr ? 'अचानक ब्रेक दाबा' : isHi ? 'अचानक ब्रेक लगाएं' : 'Press Sudden Brake'}
            </button>

            <button
              onClick={() => {
                setBusState('accelerating');
                setTimeout(() => setBusState('idle'), 2000);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all active:scale-95"
            >
              ⚡ {isMr ? 'अचानक वेग वाढवा' : isHi ? 'अचानक स्पीड बढ़ाएं' : 'Sudden Accelerate'}
            </button>

            <button
              onClick={() => {
                setBusState('coin_flicked');
                setTimeout(() => setBusState('idle'), 2500);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all active:scale-95"
            >
              🪙 {isMr ? 'पुठ्ठा आणि नाणे प्रयोग' : isHi ? 'कार्डबोर्ड और सिक्का प्रयोग' : 'Flick Cardboard & Coin'}
            </button>
          </div>
        </div>
      )}

      {/* 3. F = m * a CALCULATOR SIMULATOR */}
      {type === 'f_ma_calc' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Mass control */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>{isMr ? 'वस्तुमान (m)' : isHi ? 'द्रव्यमान (m)' : 'Mass (m)'}</span>
                <span className="text-[#6C3BEF] font-mono">{mass} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={mass}
                onChange={(e) => setMass(Number(e.target.value))}
                className="w-full accent-[#6C3BEF] h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
            </div>

            {/* Force control */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>{isMr ? 'प्रयुक्त बल (F)' : isHi ? 'लगाया गया बल (F)' : 'Applied Force (F)'}</span>
                <span className="text-indigo-600 font-mono">{force} N</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={force}
                onChange={(e) => setForce(Number(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
            </div>

            {/* Instant Acceleration Result Display */}
            <div className="bg-gradient-to-br from-[#3F207C] to-[#6C3BEF] text-white p-3.5 rounded-xl flex flex-col justify-center items-center shadow-md">
              <span className="text-[10px] uppercase tracking-wider font-bold text-purple-200">
                {isMr ? 'प्रवेग (a = F / m)' : isHi ? 'त्वरण (a = F / m)' : 'Acceleration (a = F / m)'}
              </span>
              <span className="text-2xl font-black font-mono mt-0.5">{acceleration} m/s²</span>
            </div>
          </div>

          {/* Animated Speed Runway */}
          <div className="relative h-24 bg-slate-900 rounded-2xl overflow-hidden flex items-center px-4 border border-slate-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

            <div
              className="relative z-10 flex items-center gap-2 transition-all duration-300"
              style={{
                transform: `translateX(${Math.min(280, acceleration * 15)}px)`,
              }}
            >
              <div className="w-16 h-10 bg-amber-500 rounded-lg border-2 border-amber-300 text-slate-950 text-[10px] font-black flex items-center justify-center shadow-lg">
                {mass} kg
              </div>
              <div className="flex items-center text-xs text-amber-300 font-mono font-bold bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
                a = {acceleration} m/s²
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ACTION-REACTION ROCKET SIMULATOR */}
      {type === 'action_reaction_rocket' && (
        <div className="space-y-4">
          <div className="relative h-56 bg-slate-950 rounded-2xl overflow-hidden p-4 border border-slate-800 flex items-center justify-center">
            {/* Stars background */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

            {/* Rocket Balloon Unit */}
            <div
              className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${
                isRocketFlying ? '-translate-y-24 scale-90' : 'translate-y-4'
              }`}
            >
              {/* Rocket Body */}
              <div className="relative flex flex-col items-center">
                {/* Nose cone */}
                <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[24px] border-b-rose-500" />
                {/* Inflatable Balloon / Fuel Chamber */}
                <div
                  className="bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full border-2 border-purple-300 flex items-center justify-center text-white text-[10px] font-bold transition-all"
                  style={{
                    width: `${50 + balloonPressure * 14}px`,
                    height: `${60 + balloonPressure * 16}px`,
                  }}
                >
                  ISRO Chandrayaan
                </div>
                {/* Nozzle */}
                <div className="w-6 h-3 bg-slate-700 rounded-b-md" />
              </div>

              {/* Action Force Vector (Downward Exhaust) */}
              <div
                className={`flex flex-col items-center text-rose-400 mt-1 transition-opacity duration-300 ${
                  isRocketFlying ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className="w-1.5 h-10 bg-gradient-to-b from-amber-400 via-rose-500 to-transparent rounded-full animate-pulse" />
                <span className="text-[10px] font-mono font-bold bg-slate-900/80 px-2 py-0.5 rounded mt-1 text-rose-300 border border-rose-900">
                  {isMr ? 'क्रिया बल (वायू खाली)' : isHi ? 'क्रिया बल (गैस नीचे)' : 'Action: Downward Exhaust'}
                </span>
              </div>

              {/* Reaction Force Vector (Upward Thrust) */}
              <div className="absolute -top-10 flex items-center gap-1 text-emerald-400 text-[10px] font-mono font-bold bg-slate-900/90 px-2 py-0.5 rounded border border-emerald-800">
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{isMr ? 'प्रतिक्रिया बल (रॉकेट वर)' : isHi ? 'प्रतिक्रिया बल (रॉकेट ऊपर)' : 'Reaction: Upward Thrust'}</span>
              </div>
            </div>
          </div>

          {/* Launch Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setBalloonPressure((prev) => Math.min(5, prev + 1))}
              disabled={isRocketFlying}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all active:scale-95"
            >
              💨 {isMr ? 'हवा भरा (दाब वाढवा)' : isHi ? 'हवा भरें (दबाव बढ़ाएं)' : 'Pump Air (Increase Pressure)'} ({balloonPressure}/5)
            </button>

            <button
              onClick={handleLaunchRocket}
              disabled={isRocketFlying}
              className="px-5 py-2 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
            >
              🚀 {isMr ? 'रॉकेट प्रक्षेपित करा!' : isHi ? 'रॉकेट लॉन्च करें!' : 'Launch Balloon Rocket!'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
