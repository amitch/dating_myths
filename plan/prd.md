<context>
# Product Requirements Document for Bust the Dating Myth Bubble Quiz Application

## 1. Introduction
This Product Requirements Document (PRD) outlines the specifications for the "Bust the Dating Myth Bubble" quiz application, an interactive web platform designed to debunk common dating myths and foster confidence among Indian family members in Silicon Valley. The purpose of this PRD is to provide a clear and comprehensive guide for the development team, ensuring all stakeholders understand the project’s scope, features, and requirements. This document serves as the foundation for building a culturally relevant, engaging, and user-friendly application to support a date night event.

## 2. Product overview
The "Bust the Dating Myth Bubble" quiz application is a mobile-friendly web platform that empowers Indian family members in Silicon Valley to challenge dating myths and gain confidence for a date night event. Featuring a clean, culturally resonant design with subtle Indian motifs, the application offers an interactive quiz with multiple-choice questions, a visually appealing results page with a progress wheel, personalized tips based on user responses, and a screenshot-sharing prompt. By making dating approachable and fun, the platform delivers an authentic experience that resonates with its target audience.

## 3. Goals and objectives
The primary goals of the "Bust the Dating Myth Bubble" quiz application are to:

- Engage Indian family members in Silicon Valley with a culturally relevant, interactive experience.
- Promote the date night event by encouraging users to share their quiz results.
- Help users rethink dating myths and build confidence through personalized, actionable feedback.

**Success Metrics:**
- Number of completed quizzes (target: 500+ within the event timeframe).
- Number of shared screenshots (target: 200+ shares).
- Positive qualitative feedback on user satisfaction and cultural relevance.

## 4. Target audience
The target audience consists of Indian family members aged 30-50 living in Silicon Valley. This demographic includes individuals who may feel rusty or skeptical about dating due to cultural expectations, personal experiences, or family responsibilities (e.g., some with kids). The application addresses their need for a fun, approachable, and culturally sensitive tool to debunk myths and prepare for a date night event.

</context>
<PRD>
## 5. Features and requirements

### 5.1 Intro page
- Display a welcome message: “Welcome to Bust the Dating Myth Bubble! Let’s rethink dating together—there may be more than one right answer, so choose all that feel true to you!” with a rangoli-inspired SVG header (scalable, Sienna/Pale Violet Red).
- Include a text input for the user’s name (non-empty validation, placeholder: “What should we call you?”).
- Provide a “Start Quiz” button (Sienna, touch-friendly) to navigate to the quiz page, passing the name via React Router state.
- Apply a fade-in animation (Framer Motion, 0.3s) for the header and button on page load.
- Ensure a centered layout with responsive padding on a Lavender Blush background.

### 5.2 Quiz interface
- Present 15 multiple-choice questions across 5 areas (First Impressions, Compatibility, Communication, Expectations, Inner Confidence; 3 questions per area) from a JSON data source, with all 3 questions per area on a single page (5 pages total).
- Allow 1-3 correct answers per question (positive, myth-busting options); award 1 point per question if any correct answer is selected (max 15 points).
- Display the area name and a progress bar (Steel Blue, “Area X of 5”) at the top, with lotus/paisley SVG separators (Pale Violet Red).
- Render answer options as touch-friendly checkboxes (high contrast on Lavender Blush) with slide-in animation (Framer Motion, 0.3s) per page.
- Include a “Next” button (Sienna, disabled until at least one selection per question) to advance; navigate to the results page after the 5th area, passing answers via state.
- Save progress (current area, answers, name) in `sessionStorage`, cleared on tab close; reload progress on page refresh.
- Prevent revisiting previous areas to enforce a one-way flow.

### 5.3 Results page
- Calculate and display the total score (out of 15) and area scores (out of 3 per area, based on any correct answer selected).
- Show a rangoli progress wheel (SVG, dynamic segments for area scores, Sienna/Steel Blue, fade-in via Framer Motion) and a score list below.
- Assign a title based on the total score:
  - 12-15: “Confident Connector” – “You embrace dating’s real, human side!”
  - 8-11: “Curious Explorer” – “You’re discovering a fresh take on dating!”
  - 0-7: “Courageous Starter” – “You’re ready to rethink dating myths!”
- Identify the strongest and weakest areas; prioritize First Impressions for ties in the weakest area.
- Include a screenshot prompt: “Take a screenshot to share your results at the Silicon Valley date night event!” in a styled container (Lavender Blush background, Sienna border, rangoli dot SVG, fade-in animation).
- Ensure a scalable chart and legible text (Dark Slate Gray) with a responsive layout on mobile.

### 5.4 Tips section
- Display 3 personalized tips based on the weakest area (e.g., Inner Confidence: “Own your journey—your life experience is your charm”).
- Present tips in cards (Lavender Blush background, Sienna border) with rangoli floral SVG accents (Pale Violet Red) and slide-in animation (Framer Motion, 0.3s).
- Include Silicon Valley-specific nudges (e.g., “Try a coffee date at Philz Coffee”).
- Stack cards vertically on mobile with readable spacing and Dark Slate Gray text.

## 6. User stories and acceptance criteria
**ST-101**: As a user, I want to access the intro page so that I can start the quiz.
- The intro page loads with a welcome message and rangoli-inspired header.
- A text input for my name is present with validation.
- A “Start Quiz” button navigates to the quiz page when clicked.

**ST-102**: As a user, I want to take the quiz by answering questions in each area so that I can get my results.
- The quiz shows 3 questions per area on one page.
- Each question offers radio buttons for answers.
- The “Next” button is disabled until I select at least one answer per question.
- My progress is saved in `sessionStorage` and reloaded on refresh.
- After all 5 areas, I’m directed to the results page.

**ST-103**: As a user, I want to view my quiz results so that I can see my score and personalized tips.
- The results page shows my total score and area scores.
- A rangoli progress wheel visualizes my area scores.
- A title is assigned based on my total score.
- Personalized tips appear based on my weakest area.
- A screenshot prompt is displayed in a styled container.

**ST-104**: As a user, I want to resume my quiz if I accidentally close the tab so that I don’t lose progress.
- On reopening the tab, my quiz progress loads from `sessionStorage`.
- I can continue from my last saved area.

**ST-105**: As a user, I want to see an error message if I try to proceed without answering all questions on a page.
- Clicking “Next” without all questions answered shows an error message.
- The “Next” button stays disabled until all questions have at least one selection.

**ST-106**: As a user, I want to enter my name so that my results feel personalized.
- The intro page includes a name input field.
- The name is required to start the quiz.
- My name appears on the results page.

**ST-107**: As a developer, I want to load quiz questions from a JSON file so that content is easy to manage.
- Questions are stored in a JSON file.
- The app loads questions from the JSON file at runtime.
- Content updates can be made by editing the JSON file without code changes.

## 7. Technical requirements / stack
- **Frontend Framework**: React 18+ for interactive UI development.
- **Build Tool**: Vite for fast builds and hot module replacement.
- **Routing**: React Router v6 for client-side navigation.
- **Styling**: Emotion for CSS-in-JS, ensuring scoped and maintainable styles.
- **Animations**: Framer Motion for smooth transitions (e.g., fade-ins, slide-ins).
- **Package Manager**: npm for dependency management.
- **Code Quality**: ESLint with Airbnb rules for consistent code style.
- **JavaScript Compiler**: Babel for modern JavaScript transpilation.
- **CSS Processing**: PostCSS with autoprefixer for CSS compatibility.
- **Deployment**: Vercel for hosting and CI/CD integration with Vite.

## 8. Design and user interface

### 8.1 Design principles
- **Mobile-first**: Prioritize functionality and aesthetics on mobile devices.
- **Clean and minimal**: Use whitespace for a calm, focused experience.
- **Culturally relevant**: Incorporate subtle Indian motifs (e.g., rangoli, lotus).
- **Accessible**: Follow WCAG 2.1 with high-contrast colors for readability.

### 8.2 Visual elements
- **Color Palette**:
  - Sienna (#A0522D): Buttons, rangoli accents.
  - Steel Blue (#4682B4): Progress bar, separators.
  - Lavender Blush (#FFF0F5): Backgrounds for warmth.
  - Pale Violet Red (#DB7093): Hover effects, highlights.
  - Dark Slate Gray (#2F4F4F): Text, outlines for contrast.
- **Typography**: Poppins or Montserrat for legibility.
- **SVGs**: Mandala, rangoli wheel, dots, and floral accents for cultural flair.

### 8.3 User interface components
- **Buttons**: Sienna with white text, min. 48x48px for touch-friendliness.
- **Input Fields**: Lavender Blush background, Dark Slate Gray text, required field validation.
- **Progress Bar**: Steel Blue fill on Lavender Blush, labeled “Area X of 5”.
- **Cards**: Lavender Blush with Sienna borders for tips and results.
- **Animations**: Subtle fade-ins and slide-ins via Framer Motion.

### 8.4 Page layouts
- **Intro Page**: Centered header, name input, and “Start Quiz” button.
- **Quiz Page**: 3 questions per area, checkboxes, and “Next” button.
- **Results Page**: Progress wheel, score list, title, tips cards, screenshot prompt.
</PRD>