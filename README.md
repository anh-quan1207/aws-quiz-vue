# AWS Quiz - Vue.js Edition

Ứng dụng luyện thi chứng chỉ AWS Certified Cloud Practitioner được xây dựng bằng Vue 3, Vite, Tailwind CSS và Pinia.

## 🚀 Tính năng

- ✅ **2 chế độ học tập:**
  - **Exam Mode**: Làm bài thi với thời gian và tính điểm
  - **Study Mode**: Học tập với đáp án ngay lập tức, không giới hạn thời gian

- ✅ **6 bộ đề thi** với hàng trăm câu hỏi thực tế

- ✅ **Auto-save tiến trình** với LocalStorage - không lo mất bài khi tắt trình duyệt

- ✅ **Xem kết quả chi tiết** với giải thích cho từng câu hỏi

- ✅ **Responsive design** - chạy mượt trên mọi thiết bị

- ✅ **Links mở tab mới** - không làm mất tiến trình làm bài

## 🛠 Technologies

- **Vue 3** - Progressive JavaScript Framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **Vue Router** - Official router for Vue.js

## 📦 Cài đặt

```bash
# Clone repository
git clone <your-repo-url>
cd aws-quiz-vue

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deploy

### Vercel (Recommended)

1. Push code lên GitHub
2. Import project trên [Vercel](https://vercel.com)
3. Vercel sẽ tự động detect Vite config và deploy

### Netlify

1. Build project: `npm run build`
2. Deploy folder `dist` lên [Netlify](https://netlify.com)

### GitHub Pages

```bash
# Build with correct base path
npm run build

# Deploy dist folder to gh-pages branch
npx gh-pages -d dist
```

## 📝 Project Structure

```
src/
├── assets/          # CSS và static assets
├── components/      # Vue components
│   ├── QuizSelection.vue
│   ├── QuizQuestion.vue
│   ├── QuizNavigation.vue
│   ├── QuestionIndex.vue
│   ├── QuizResult.vue
│   └── DetailedResult.vue
├── data/            # Question data (JSON files)
│   ├── test001.json
│   ├── test002.json
│   └── ...
├── stores/          # Pinia stores
│   └── quiz.js
├── utils/           # Helper functions
│   ├── localStorage.js
│   └── shuffle.js
├── views/           # Page views
│   ├── HomeView.vue
│   └── QuizView.vue
├── router/          # Vue Router config
│   └── index.js
├── App.vue          # Root component
└── main.js          # Entry point
```

## 🎯 Features Details

### Auto-save Progress
- Tự động lưu sau mỗi câu trả lời
- Lưu trữ trong LocalStorage
- Hỏi khôi phục khi quay lại
- Tự động xóa sau 7 ngày

### Navigation Guards
- Cảnh báo khi thoát giữa chừng bài thi
- Ngăn truy cập trực tiếp vào `/quiz` khi chưa bắt đầu

### External Links
- Tất cả links trong câu hỏi/giải thích mở tab mới
- Không làm mất tiến trình làm bài

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ for AWS learners
