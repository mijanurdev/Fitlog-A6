# 💪 FitLog

FitLog is a responsive workout library and daily fitness planning web application built with Next.js, TypeScript, and Tailwind CSS.

Users can browse workouts, view complete exercise details, add workouts to Today's Plan, save workouts for later, track workout metrics, sort their plan, and mark workouts as completed.

## 🌐 Live Website

**Live Site:** https://fitlog-a6-rose.vercel.app/

## 💻 GitHub Repository

**Repository:** https://github.com/mijanurdev/Fitlog-A6

## 🚀 Technologies Used

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Context API
- React Toastify
- Lucide React
- Next.js App Router
- REST API

## ✨ Key Features

- Browse 12 workout exercises fetched from the FitLog API
- View detailed workout information including equipment, difficulty, sets, reps, duration, calories, rating, and instructions
- Add workouts to Today's Plan with a maximum limit of 5 workouts
- Save workouts for later and manage them from the Saved tab
- Live Plan and Saved counters in the navbar
- Track total Exercises, Minutes, and Calories
- Sort workouts by Duration, Calories, or Rating
- Mark planned workouts as completed
- Remove workouts from Today's Plan or Saved
- Responsive layout for mobile, tablet, laptop, and desktop
- Loading state while workout data is being fetched
- Toast notifications for important actions
- Custom 404 page for invalid routes

## 📄 Main Routes

| Route | Description |
|---|---|
| `/` | Home page with Hero and Workout Library |
| `/workout/:id` | Dynamic workout details page |
| `/my-plan` | Today's Plan and Saved workouts |
| Invalid route | Custom 404 page |

## 🔗 API

### All Workouts

https://api.abcz.workers.dev/api/fitlog

### Single Workout

https://api.abcz.workers.dev/api/fitlog/:id

### Alternative API

https://api.api-store.workers.dev/api/fitlog

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/mijanurdev/Fitlog-A6.git
```

Go to the project directory:

```bash
cd Fitlog-A6
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 📦 Production Build

```bash
npm run build
```

Run the production build:

```bash
npm start
```

## 📱 Responsive Design

FitLog is fully responsive for:

- Mobile
- Tablet
- Laptop
- Desktop

## 🧭 Main Functionality

### Today's Plan

- Add workouts to Today's Plan
- Maximum 5 workouts
- View workout details
- Mark workouts as done
- Remove workouts
- Track exercises, minutes, and calories

### Saved Workouts

- Save workouts for later
- View saved workouts
- Add saved workouts to Today's Plan
- Remove saved workouts
- View workout details

### Sorting

Workouts can be sorted by:

- Duration
- Calories
- Rating

## 👨‍💻 Author

**Mijanur Rashid**