import { useState, useEffect } from 'react';
import { TuningKnob } from './components/TuningKnob';
import { Oscilloscope } from './components/Oscilloscope';
import { TimeReel } from './components/TimeReel';
import { NonLocalityBridge } from './components/NonLocalityBridge';
import { QuotePanel } from './components/QuotePanel';
import { Sparkles, Calendar, Layers, Activity, HelpCircle } from 'lucide-react';

type StateType = 'physical' | 'information' | 'consciousness';

interface Experiment {
  name: string;
  phenomenon: string;
  interpretation: string;
  triggerState: StateType;
}

const experiments: Experiment[] = [
  {
    name: "哈菲爾-基廷實驗",
    phenomenon: "原子鐘因飛行速度與重力產生時間偏差",
    interpretation: "證明時間的相對性，不存在宇宙統一的絕對「現在」。",
    triggerState: "physical"
  },
  {
    name: "ER = EPR 猜想",
    phenomenon: "量子糾纏本質為微型蟲洞（愛因斯坦-羅森橋）",
    interpretation: "證實宇宙底層是沒有距離的「單一個點」，空間是湧現結果。",
    triggerState: "information"
  },
  {
    name: "利貝特實驗 (1983)",
    phenomenon: "腦電圖顯示在受試者意識決定前，大腦已出現準備電位",
    interpretation: "三維世界的自我意識是投影後台計算後的「發言人」。",
    triggerState: "consciousness"
  },
  {
    name: "停表錯覺 (Chronostasis)",
    phenomenon: "快速轉頭看鐘時，秒針彷彿停滯更久",
    interpretation: "大腦會事後剪輯、修補視覺空白，時間感是主觀後製。",
    triggerState: "consciousness"
  }
];

function App() {
  const [timeProgress, setTimeProgress] = useState<number>(50); // 0 to 100
  const [frequency, setFrequency] = useState<number>(15); // 0 to 100 Hz
  const [state, setState] = useState<StateType>('physical');
  const [color, setColor] = useState<string>('#00d2ff');
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // Map frequency to states and colors
  useEffect(() => {
    if (frequency < 33.4) {
      setState('physical');
      setColor('#00d2ff'); // Quantum Blue
    } else if (frequency < 66.7) {
      setState('information');
      setColor('#ff007f'); // Collapse Pink
    } else {
      setState('consciousness');
      setColor('#a855f7'); // Cosmic Purple
    }
  }, [frequency]);

  return (
    <div className="w-full h-full min-h-screen text-text-primary flex flex-col overflow-hidden relative">
      {/* Decorative background grid/ambient glows */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ backgroundColor: color, transition: 'background-color 0.8s ease' }}
      />
      <div 
        className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] pointer-events-none opacity-15"
        style={{ backgroundColor: 'var(--color-purple)', opacity: 0.1 }}
      />

      {/* HEADER */}
      <header className="h-16 px-6 border-b border-[hsla(225,30%,60%,0.15)] flex items-center justify-between z-10 glass">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500"
            style={{ 
              backgroundColor: `${color}15`, 
              border: `1px solid ${color}`,
              boxShadow: `0 0 10px ${color}30`
            }}
          >
            <Sparkles size={16} style={{ color: color, transition: 'color 0.5s' }} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-gradient-cosmic">THE TIME IS NOT REAL</h1>
            <p className="text-[9px] font-mono tracking-wider text-text-muted">🌌 意識、時空與全像投影研究平台</p>
          </div>
        </div>

        {/* HUD Info */}
        <div className="flex items-center gap-6 text-[10px] font-mono text-text-muted">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} style={{ color: color }} />
            <span>DATE: 2026-07-02</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers size={12} style={{ color: color }} />
            <span>GRID: NON-LOCALITY</span>
          </div>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-1 hover:text-text-primary transition-colors cursor-pointer"
          >
            <HelpCircle size={13} style={{ color: color }} />
            <span>說明</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4 z-10">
        
        {/* LEFT COLUMN: Control Station */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-1">
          
          {/* Module 1: Tuning Console */}
          <div className="glass p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[hsla(225,30%,60%,0.1)] pb-2 mb-2">
              <span className="text-xs font-semibold tracking-wider font-mono">大腦量子接收器 (Orch-OR)</span>
              <Activity size={14} style={{ color: color }} />
            </div>
            
            {/* Tuning Knob */}
            <TuningKnob 
              frequency={frequency}
              onChange={setFrequency}
              colorClass={color}
            />

            {/* Oscilloscope */}
            <Oscilloscope 
              frequency={frequency}
              state={state}
              color={color}
            />
          </div>

          {/* Module 2: Quote/Epiphany Panel */}
          <div className="flex-1 min-h-[160px]">
            <QuotePanel 
              timeProgress={timeProgress}
              state={state}
            />
          </div>
        </div>

        {/* MIDDLE COLUMN: Spacetime Projection */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* 3D Spacetime Reel Canvas */}
          <div className="flex-1 relative">
            <TimeReel 
              timeProgress={timeProgress}
              state={state}
              color={color}
            />
          </div>

          {/* Timeline slider control board */}
          <div className="glass p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-text-muted">⏳ 線性電影膠卷 (時間流軸)</span>
              <span className="font-semibold" style={{ color: color }}>
                {timeProgress < 45 ? '過去 (Past)' : timeProgress > 55 ? '未來 (Future)' : '現在 (Present)'} | PROGRESS: {timeProgress.toFixed(0)}%
              </span>
            </div>

            {/* Slider */}
            <div className="relative flex items-center w-full group py-2">
              <input
                type="range"
                min="0"
                max="100"
                value={timeProgress}
                onChange={(e) => setTimeProgress(Number(e.target.value))}
                className="w-full h-1 bg-[hsla(225,20%,40%,0.2)] rounded-lg appearance-none cursor-pointer outline-none transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, ${color} 0%, ${color} ${timeProgress}%, hsla(225,20%,40%,0.2) ${timeProgress}%, hsla(225,20%,40%,0.2) 100%)`,
                }}
              />
              {/* Slider thumb glow styling (handled in CSS but we can inline custom style rules) */}
              <style>{`
                input[type=range]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  background: #ffffff;
                  border: 2px solid ${color};
                  box-shadow: 0 0 10px ${color};
                  cursor: pointer;
                  transition: transform 0.1s, background-color 0.2s;
                }
                input[type=range]::-webkit-slider-thumb:hover {
                  transform: scale(1.3);
                }
                input[type=range]::-moz-range-thumb {
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  background: #ffffff;
                  border: 2px solid ${color};
                  box-shadow: 0 0 10px ${color};
                  cursor: pointer;
                  transition: transform 0.1s, background-color 0.2s;
                }
                input[type=range]::-moz-range-thumb:hover {
                  transform: scale(1.3);
                }
              `}</style>
            </div>
            
            {/* Legend descriptors */}
            <div className="flex justify-between text-[9px] font-mono text-text-muted">
              <span>太初 (GENESIS)</span>
              <span>記憶 (MEMORY)</span>
              <span>當下 (PRESENCE)</span>
              <span>潛能 (POTENTIAL)</span>
              <span>終點 (OMEGA)</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quantum Grid & Science */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-1">
          
          {/* Module 1: ER=EPR Non-locality Bridge */}
          <div className="glass flex-[1.2] flex flex-col min-h-[340px]">
            <NonLocalityBridge />
          </div>

          {/* Module 2: Science Alignment List */}
          <div className="glass p-4 flex-1 min-h-[220px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase border-b border-[hsla(225,30%,60%,0.1)] pb-1.5 block mb-3">
                🔬 理論與科學實驗對照
              </span>
              
              <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[200px]">
                {experiments.map((exp, idx) => {
                  const isCurrentState = exp.triggerState === state;
                  return (
                    <div 
                      key={idx}
                      className="p-2 rounded-lg border transition-all duration-500"
                      style={{
                        backgroundColor: isCurrentState ? `${color}08` : 'transparent',
                        borderColor: isCurrentState ? `${color}35` : 'transparent',
                        boxShadow: isCurrentState ? `0 0 10px ${color}10` : 'none',
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-[11px] font-semibold transition-colors duration-500"
                          style={{ color: isCurrentState ? color : 'var(--text-primary)' }}
                        >
                          {exp.name}
                        </span>
                        <span className="text-[8px] font-mono text-text-muted px-1.5 py-0.2 rounded bg-[hsla(230,20%,15%,0.8)]">
                          {exp.triggerState.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[9px] text-text-secondary mt-1 leading-relaxed">{exp.phenomenon}</p>
                      {isCurrentState && (
                        <p 
                          className="text-[9px] italic mt-1 font-mono transition-opacity duration-500 leading-relaxed"
                          style={{ color: color }}
                        >
                          → {exp.interpretation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[8px] font-mono text-text-muted text-center pt-2 border-t border-[hsla(225,30%,60%,0.1)]">
              意識調頻至不同區間會自動對齊相關科學實驗
            </div>
          </div>
        </div>
      </div>

      {/* HELP DIALOG OVERLAY */}
      {showHelp && (
        <div className="absolute inset-0 bg-[rgba(5,5,10,0.85)] backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass max-w-lg w-full p-6 flex flex-col gap-4 relative">
            <button 
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 text-xs font-mono hover:text-text-primary text-text-muted cursor-pointer"
            >
              [ 關閉 ]
            </button>
            <h2 className="text-md font-bold tracking-widest text-gradient-cosmic">🌌 模擬平台操作指南</h2>
            <div className="text-xs text-text-secondary flex flex-col gap-3 leading-relaxed font-mono">
              <p>
                本模擬器是一個將<strong>《時間並非真實存在》</strong>研究計畫中的物理假說以視覺呈現的展示平台：
              </p>
              <ol className="list-decimal pl-4 flex flex-col gap-1.5">
                <li>
                  <strong style={{ color: 'var(--color-blue)' }}>大腦量子調頻旋鈕：</strong>
                  拖曳旋轉左側大腦接收器的旋鈕。頻率在不同區間時，右下角會自動高亮對應的科學實驗與形上學詮釋。同時，中央的 3D 塊狀宇宙會切換渲染風格：
                  <ul className="list-disc pl-4 mt-1 text-[11px]">
                    <li><strong>0 - 33 Hz (物理態)</strong>：以光滑金屬材質渲染 3D 時空。</li>
                    <li><strong>33 - 66 Hz (資訊態)</strong>：以霓虹代碼網格 wireframe 渲染，展示數據底層。</li>
                    <li><strong>66 - 100 Hz (意識態)</strong>：以發光的玻璃折射材質呈現，象徵意識的高維流動。</li>
                  </ul>
                </li>
                <li>
                  <strong style={{ color: 'var(--color-pink)' }}>線性電影膠卷 Slider：</strong>
                  拖曳下方的時間 Slider，代表意識在「塊狀宇宙」這捲拍好的電影底片中線性播放的過程。中央的 3D 切片會平滑移動，對應「太初、記憶、當下、潛能、終點」五個時空切片。
                </li>
                <li>
                  <strong style={{ color: 'var(--color-purple)' }}>ER=EPR 空間折疊：</strong>
                  在右側畫面上點擊任意兩個量子粒子，然後點擊「折疊空間」，你將看見時空網格被縮短，兩個遠端粒子在底層融合成同一個點，生出發光的蟲洞，證實非定域性的「萬物歸一」。
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
