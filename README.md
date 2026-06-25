# HCI Theory Learning App

An interactive single-page learning app for BSCS-level Human Computer Interaction theory practice. It is built to help students revise core HCI concepts, test recall, write exam-style answers, and understand visual/interaction topics through small hands-on demos.

## Why This App Was Made

HCI theory topics are often studied from scattered notes, slides, and past-paper questions. That makes revision slow because definitions, examples, mistakes, practice questions, and quizzes are not in one place.

This app brings the whole practice workflow into one local web app:

- Read topic explanations in a consistent format.
- Practice exam-style answers.
- Test yourself with quizzes and flashcards.
- Track completed, weak, and bookmarked topics.
- Use visual demos for graphics and interaction concepts like lerp, Fitts Law, rubber banding, raster/vector, and transformations.

The goal is not just to list theory, but to make revision active and repeatable.

## Purpose

The app is designed for students preparing HCI and Computer Graphics theory exams. It focuses on:

- Quick revision before exams.
- Understanding short-note and long-answer topics.
- Remembering differences between similar concepts.
- Practicing written answers.
- Identifying weak areas through quiz mistakes and flashcard marking.
- Making abstract interaction concepts easier to see through demos.

## Main Features

### Dashboard

The dashboard gives a quick overview of study progress:

- Total topics
- Completed topics
- Quiz average score
- Bookmarked topics
- Weak topics
- Category-wise progress
- Continue learning button

### Topic Library

The topic library includes all 50 HCI theory topics. Students can:

- Search topics by title, category, or keywords
- Filter by category
- Mark topics as completed
- Bookmark important topics
- See difficulty levels
- Open detailed explanations

### Topic Detail Pages

Each topic includes:

- Simple definition
- Exam-style answer
- Real-world example
- Common mistake
- Practice question
- Keywords
- Related topics
- Completion, bookmark, and weak-topic controls

### Flashcard Mode

Flashcards are useful for quick recall. Each card shows a question/topic on the front and the answer on the back. Progress is saved locally.

Features include:

- Previous and next card controls
- 3D flip animation
- Mark known
- Mark weak
- Saved flashcard progress

### Quiz Mode

Quiz mode supports mixed practice:

- MCQs
- True/false questions
- Short-answer reveal questions
- Category-based quiz
- Random quiz
- Score screen
- Quiz score history
- Wrong objective answers automatically mark topics as weak

### Written Practice

Written practice helps students prepare exam-style responses.

Students can:

- Select a topic
- Write an answer in a textarea
- Reveal the model answer
- Self-rate the answer as Poor, Okay, or Good
- Save attempts locally

### Interactive Mini Demos

The app includes visual demos for important HCI and graphics concepts:

- 1D lerp
- 2D lerp
- Rubber banding
- Translation, rotation, and scaling
- Pixel vs point
- Raster vs vector images
- Fitts Law
- Norman 7 stages
- Model Human Processor

These demos use sliders, SVG, CSS transforms, and simple interactive UI elements.

## LocalStorage Persistence

The app does not use a backend or database. All progress is stored in the browser through `localStorage`.

Stored data includes:

- `completedTopics`
- `bookmarkedTopics`
- `weakTopics`
- `quizHistory`
- `writtenAttempts`
- `lastOpenedTopic`
- `theme`
- `flashcardProgress`

This means progress stays saved in the same browser even after refreshing or closing the app. Clearing browser storage will reset the saved progress.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Browser localStorage

No backend, external database, or server API is required.

## Project Structure

```text
src/
  App.jsx
  main.jsx
  index.css
  assets/
    raster-landscape.png
  data/
    topics.js
    quizzes.js
  hooks/
    useLocalStorage.js
  components/
    CelebrationBurst.jsx
    Dashboard.jsx
    FlashcardMode.jsx
    InteractiveDemo.jsx
    ProgressBar.jsx
    ProgressRing.jsx
    QuizMode.jsx
    Sidebar.jsx
    ThemeToggle.jsx
    TopicCard.jsx
    TopicDetail.jsx
    TopicLibrary.jsx
    WrittenPractice.jsx
```

## Covered Topics

The app includes all 50 requested topics, including usability, UX, HCI principles, Norman models, Fitts Law, MHP, GOMS, lerp, raster/vector images, mental models, accessibility, paradigms, and related exam-style questions.

## Installation And Running

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

- The app is fully client-side.
- All topic data is stored locally in JavaScript files.
- All user progress is stored in localStorage.
- The bottom-left signature badge displays `SAMI KA CODEX :)`.
