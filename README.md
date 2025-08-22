# 桃園市公車營運評鑑填報系統

一個現代化的網頁表單系統，用於桃園市市區汽車客運營運與服務評鑑的書面資料審查填報。

## 📋 系統概述

本系統為 114 年度桃園市市區汽車客運營運與服務評鑑的線上填報平台，評鑑期間為 113.11.01~114.10.31。系統提供直觀的使用者介面，讓公車業者能夠便捷地填報各項評鑑資料。

## ✨ 主要功能

### 📊 評鑑類別
- **A類 - 場站設施與服務**：場站空間、候車設施、服務品質等
- **B類 - 運輸工具設備與安全**：車齡比率、車輛設備、安全管理等  
- **D類 - 公司經營與管理**：營運管理、財務狀況、人員管理等
- **E類 - 無障礙設施**：無障礙場站設施、服務、運輸設備與安全
- **F類 - 性別平等**：性別平等相關措施與政策

### 🎯 核心特色
- **響應式設計**：支援桌面與行動裝置
- **即時計算**：自動計算停車比率等關鍵指標
- **資料驗證**：表單欄位驗證確保資料完整性
- **進度追蹤**：視覺化進度條顯示填寫進度
- **資料匯出**：支援 Excel 格式資料匯出
- **雲端儲存**：使用 Vercel Postgres 資料庫儲存

## 🛠 技術架構

### 前端技術
- **HTML5 + CSS3**：現代化網頁標準
- **Vanilla JavaScript**：原生 JavaScript 實作
- **響應式設計**：支援各種螢幕尺寸
- **CSS 動畫**：流暢的使用者體驗

### 後端技術
- **Node.js**：伺服器端運行環境
- **Vercel**：無伺服器部署平台
- **Vercel Postgres**：雲端 PostgreSQL 資料庫
- **ExcelJS**：Excel 檔案生成與處理

### 依賴套件
```json
{
  "@vercel/postgres": "^0.10.0",
  "exceljs": "^4.4.0"
}
```

## 🚀 安裝與部署

### 本地開發環境

1. **複製專案**
```bash
git clone <repository-url>
cd tybus-assessment-form-main
```

2. **安裝依賴**
```bash
npm install
```

3. **環境設定**
建立 `.env.local` 檔案並設定資料庫連線：
```env
POSTGRES_URL="your-postgres-connection-string"
```

4. **資料庫設定**
建立評鑑資料表：
```sql
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Vercel 部署

1. **連結 Vercel 專案**
```bash
vercel link
```

2. **設定環境變數**
在 Vercel 控制台設定 `POSTGRES_URL`

3. **部署**
```bash
vercel deploy --prod
```

## 📁 專案結構

```
tybus-assessment-form-main/
├── index.html              # 主要表單頁面
├── package.json            # 專案設定與依賴
├── README.md              # 專案說明文件
├── api/                   # API 端點
│   ├── save.js           # 儲存表單資料
│   └── export.js         # 匯出 Excel 檔案
└── node_modules/         # 依賴套件
```

## 🔧 API 端點

### POST /api/save
儲存評鑑表單資料

**請求格式：**
```json
{
  "companyName": "公司名稱",
  "fillPerson": "填寫人員",
  "fillDate": "2024-01-01",
  "totalVehicles": 100,
  "stations": [
    {
      "name": "場站名稱",
      "area": 1000,
      "spaces": 50
    }
  ]
}
```

**回應格式：**
```json
{
  "ok": true,
  "id": "uuid-string"
}
```

### GET /api/export?id={uuid}
匯出指定評鑑資料為 Excel 檔案

**回應：** Excel 檔案下載

## 💡 使用說明

### 填寫流程

1. **基本資料**：填寫公司名稱、填寫人員、填表日期
2. **選擇類別**：點選頂部導航標籤切換評鑑類別
3. **填寫資料**：依據各類別要求填寫相關資料
4. **動態計算**：系統會自動計算相關比率與指標
5. **儲存資料**：點選「儲存資料」按鈕保存填寫內容
6. **匯出報告**：可匯出 Excel 格式的評鑑報告

### 場站管理

- 點選「新增場站」按鈕新增場站資料
- 系統會自動計算停車比率等指標
- 支援多個場站資料管理

## 🎨 設計特色

### 視覺設計
- **現代化介面**：採用漸層色彩與圓角設計
- **動畫效果**：流暢的過渡動畫與互動回饋
- **色彩系統**：藍色系主色調，專業且親和

### 使用者體驗
- **直觀導航**：清晰的分類標籤與進度指示
- **即時回饋**：表單驗證與狀態提示
- **響應式布局**：適應各種裝置螢幕

## 🔒 資料安全

- 使用 HTTPS 加密傳輸
- 資料庫連線加密
- 表單資料驗證
- UUID 識別碼保護隱私

## 📱 瀏覽器支援

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案
