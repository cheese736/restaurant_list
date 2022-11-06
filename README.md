# 我的Express練習：打造餐廳清單
使用Node.js & Express 打造一個簡易的餐廳網站

## 功能
+ 使用者可以註冊帳號，註冊的資料包括：名字(選填)、email、密碼、確認密碼。
+ 使用者也可以透過 Facebook Login 直接登入，未登入則無法使用。
+ 首頁為餐廳清單列表，有簡易資訊(店名、餐廳類型、評分)。
+ 點擊餐廳可檢視詳細資訊(店名、餐廳類型、地址、地圖資訊-via google map、電話、簡介)。
+ 可透進行關鍵字搜尋(可以中英文店名、餐廳類型進行搜索)。
+ 可以新增、編輯、刪除餐廳
+ 餐廳列表可依特定方法排序



## 使用方式
1. 確認安裝node.js & npm。
2. 將專案 clone 至本地位置： `git clone https://github.com/cheese736/restaurant_list.git`
3. 開啟Terminal並移至專案資料夾安裝使用套件： `npm install`
4. 設定環境變數請參考.env.example
5. 寫入種子資料: `rpm run seed`
6. 執行專案： `npm run dev`
7. 開啟瀏覽器輸入網址 http://localhost:3000 進入首頁。


## 開發工具
+ [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/)
+ [Node.js@14.16.0](https://nodejs.org/en/)
+ [Express@4.16.4](https://www.npmjs.com/package/express)
+ [Express-Handlebars@3.0.0](https://www.npmjs.com/package/express-handlebars)
+ [Express-session@1.17.1](https://www.npmjs.com/package/express-session)
+ [Bootstrap@v5.2](https://getbootstrap.com/)
+ [Font-awesome@6.2.0](https://fontawesome.com/)
+ [mongoose@5.9.7](https://mongoosejs.com)
+ [connect-flash@0.1.1](https://www.npmjs.com/package/connect-flash)
+ [dotenv@16.0.3](https://www.npmjs.com/package/dotenv)
+ [passport.js@0.4.1](https://www.passportjs.org)


