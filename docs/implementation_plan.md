# 🌌 實作計畫：時空與意識互動模擬平台 (Track 3)
`Interactive Spacetime & Consciousness Simulator`

本計畫旨在實作一個兼具前沿科技感與哲學美感的 Web 互動應用程式，並在此修訂版中規劃**專案結構重構**：將前端 Vite 專案從根目錄移入獨立的 `simulator/` 子目錄內，以保持根目錄結構乾淨。

---

## 📂 專案結構重構 (Structure Refactoring)

為了不讓前端開發檔案直接鋪展開在專案根目錄，我們將所有與模擬器（Track 3）相關的前端專案檔案，獨立收納至名為 `simulator/` 的子資料夾內。

### 1. 搬遷檔案與目錄明細

#### ➡️ 移入 `simulator/` 的檔案與資料夾：
*   `src/` $\rightarrow$ `simulator/src/` (包含所有 React 組件與設計系統 CSS)
*   `public/` $\rightarrow$ `simulator/public/`
*   `package.json` $\rightarrow$ `simulator/package.json`
*   `package-lock.json` $\rightarrow$ `simulator/package-lock.json`
*   `tsconfig.json` $\rightarrow$ `simulator/tsconfig.json`
*   `tsconfig.app.json` $\rightarrow$ `simulator/tsconfig.app.json`
*   `tsconfig.node.json` $\rightarrow$ `simulator/tsconfig.node.json`
*   `vite.config.ts` $\rightarrow$ `simulator/vite.config.ts`
*   `index.html` $\rightarrow$ `simulator/index.html`
*   `.oxlintrc.json` $\rightarrow$ `simulator/.oxlintrc.json`
*   `.gitignore` $\rightarrow$ `simulator/.gitignore` (並在根目錄重新配置一個簡單的 `.gitignore`)

#### ❌ 刪除並於新目錄重建：
*   `node_modules/` (直接於根目錄刪除，避免跨目錄搬移時 symbolic links 損壞。完成搬移後於 `simulator/` 下執行 `npm install` 重新安裝)
*   `dist/` (直接刪除，搬移後於 `simulator/` 下重新執行生產環境打包 `npm run build`)

---

## 🛠️ 技術堆疊 (Tech Stack)

*   **建置工具**：Vite
*   **前端框架**：React + TypeScript
*   **視覺與 3D 渲染**：Three.js / React Three Fiber
*   **動畫庫**：Framer Motion
*   **樣式與美學**：Vanilla CSS

---

## 🎯 核心功能模組

1.  **🎬 塊狀宇宙 (Block Universe) 互動膠卷**：3D 立體時空切片隨時間 Slider 平滑旋轉聚焦。
2.  **🧠 大腦微管 (Orch-OR) 意識調頻旋鈕**：手動調頻旋鈕配合即時波形示波器，切換物理態、資訊態與意識態。
3.  **🌀 ER = EPR 量子非定域性橋樑**：點選粒子觸發空間折疊動畫，生成愛因斯坦-羅森橋。
4.  **🕯️ 永恆主義心靈金句生成器**：對齊觀測狀態的哲學與存在主義心靈療癒文字。

---

## 📋 重構與實作步驟 (Refactoring & Implementation Steps)

### 📌 Phase 0: 專案目錄重構 (當前任務)
1. 刪除根目錄的 `node_modules/` 與 `dist/`。
2. 建立 `simulator/` 資料夾。
3. 將所有前端檔案（`src/`、`public/`、`package.json` 等）移動到 `simulator/` 內。
4. 在根目錄建立一個乾淨的 `.gitignore`，忽略 `/simulator/node_modules/`、`/simulator/dist/` 以及任何無關的系統檔案。
5. 切換至 `simulator/` 目錄，重新執行 `npm install` 恢復依賴套件。
6. 執行 `npm run build` 確認新目錄下的編譯與打包完全正常。

### 📌 Phase 1 ~ Phase 5: 前端組件開發 (已於 2026-07-02 完成實作與調試)
*   完成五大核心組件之開發，並已透過 Hex 顏色與 HTML DOM 文字元素優化 WebGL 穩定度，免除黑屏崩潰問題。

---

## 🔬 驗證計劃 (Verification Plan)

### 自動化建置與檢查
*   切換至 `simulator/` 目錄下執行 `npm run build`，驗證打包輸出無 any 型別或編譯錯誤。

### 運行測試
*   於 `simulator/` 下執行 `npm run dev`，確認網頁可正常啟動於本機（預設 `http://localhost:5173`），且所有互動功能（調頻、3D 膠卷、空間折疊）完全正常。

---

## 💬 使用者審閱與確認

> [!IMPORTANT]
> **請在點選「Proceed」前確認：**
> 1. 您是否同意將前端子目錄命名為 **`simulator/`**？
> 2. 我們將會在重構期間暫時刪除根目錄的 `node_modules/`，並在搬遷後於 `simulator/` 內自動重新安裝。這可能需要幾十秒的時間來執行下載。

*計畫修訂日期：2026年7月3日*  
*修訂單位：The Time Is Not Real 開發組*
