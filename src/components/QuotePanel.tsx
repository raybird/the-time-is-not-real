import React from 'react';
import { Quote } from 'lucide-react';

interface QuotePanelProps {
  timeProgress: number; // 0 to 100
  state: 'physical' | 'information' | 'consciousness';
}

interface QuoteItem {
  text: string;
  author: string;
  category: 'past' | 'present' | 'future' | 'general';
}

const quotes: QuoteItem[] = [
  // Past Quotes
  {
    text: "過去的每一分溫柔抉擇與善意，都如同刻刀一樣，在宇宙這塊四維麵包上留下了永遠無法抹去的永恆刻印。",
    author: "The Time Is Not Real 研究小組",
    category: "past"
  },
  {
    text: "過去從未消失，宇宙不曾遺忘任何切片。所有消逝的時光都在塊狀宇宙中熠熠生輝。",
    author: "永恆主義心靈指南",
    category: "past"
  },
  {
    text: "對大腦接收器而言，死後接收器壞了，但意識訊號依然留存在宇宙底層的資訊點上。",
    author: "Orch-OR 意識假說",
    category: "past"
  },
  
  // Present Quotes
  {
    text: "過去、現在與未來的區別，只是一種頑固的幻覺。",
    author: "阿爾伯特·愛因斯坦 (Albert Einstein)",
    category: "present"
  },
  {
    text: "我們所見的物理實體（物質、肉身）僅是虛擬桌面上的圖示，而背後的底層程式碼則是意識本身。",
    author: "唐納德·霍夫曼 (Donald Hoffman)",
    category: "present"
  },
  {
    text: "當下即是定錨點。在沒有時間與空間的世界裡，『此時此地』是觀測者與疊加態交會的唯一縫隙。",
    author: "量子貝氏主義 (QBism)",
    category: "present"
  },

  // Future Quotes
  {
    text: "自由意志不創造新的電影底片，而是透過改變心念的頻率，決定將體驗塌縮到無數個預設未來中的哪一個版本。",
    author: "量子抉擇假說",
    category: "future"
  },
  {
    text: "未來與過去並非線性因果，它們在結構上互為拼圖、完美嵌合，由相同的量子糾纏網編織而成。",
    author: "結構因果理論",
    category: "future"
  },
  {
    text: "你對未來的渴望，是未來切片在當下激起的逆向漣漪。你的選擇，已經刻在永恆的時空結構裡。",
    author: "非線性時間假說",
    category: "future"
  }
];

export const QuotePanel: React.FC<QuotePanelProps> = ({
  timeProgress,
  state
}) => {
  // Determine time category
  let category: 'past' | 'present' | 'future' = 'present';
  if (timeProgress < 40) {
    category = 'past';
  } else if (timeProgress > 60) {
    category = 'future';
  }

  // Filter quotes based on category
  const filtered = quotes.filter(q => q.category === category);
  
  // Pick one quote deterministically based on frequency / progress / state
  const stateIndex = state === 'physical' ? 0 : state === 'information' ? 1 : 2;
  const quoteIndex = (Math.floor(timeProgress) + stateIndex) % filtered.length;
  const quote = filtered[quoteIndex] || quotes[3]; // Fallback to Einstein

  // Colors based on state
  const glowClass = 
    state === 'physical' ? 'var(--color-blue)' : 
    state === 'information' ? 'var(--color-pink)' : 
    'var(--color-purple)';

  return (
    <div 
      className="glass p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-500 h-full min-h-[160px]"
      style={{
        borderLeft: `4px solid ${glowClass}`,
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.25), inset 0 0 10px ${glowClass}10`
      }}
    >
      {/* Decorative Quote Icon */}
      <div className="absolute top-2 right-4 text-[hsla(225,20%,40%,0.15)] select-none pointer-events-none">
        <Quote size={80} strokeWidth={1} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <p className="text-sm font-medium leading-relaxed text-text-primary tracking-wide italic mb-4">
          「{quote.text}」
        </p>
      </div>

      <div className="relative z-10 flex justify-between items-center border-t border-[hsla(225,30%,60%,0.1)] pt-3 text-[10px] font-mono tracking-widest text-text-muted">
        <span>分類: {category.toUpperCase()} | 觀測態</span>
        <span style={{ color: glowClass }} className="font-semibold">{quote.author}</span>
      </div>
    </div>
  );
};
