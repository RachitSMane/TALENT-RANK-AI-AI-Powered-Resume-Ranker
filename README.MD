# TalentRank AI – AI Powered Resume Ranker

## Overview

TalentRank AI is an AI-powered resume ranking system that helps recruiters and hiring teams automatically rank resumes based on their relevance to a given job description.

The project uses Natural Language Processing (NLP), TF-IDF vectorization, and cosine similarity to analyze resumes and determine how well candidates match the required job profile.

This project was built using:

* Python
* Flask
* SpaCy
* Scikit-learn
* React + TypeScript
* Tailwind CSS

---

# Features

* Upload multiple PDF resumes
* Paste a job description
* Automatic resume text extraction
* NLP preprocessing using SpaCy
* TF-IDF vectorization
* AI-based resume ranking
* Match score calculation
* Keyword extraction and matching
* Modern responsive frontend UI
* Candidate ranking dashboard
* HR-friendly report style cards

---

# Tech Stack

## Backend

* Python
* Flask
* SpaCy
* Scikit-learn
* pdfplumber

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* GSAP Animations

---

# Project Structure

```bash
internship_project/
│
├── BACKEND/
│   ├── app.py
│   ├── extractor.py
│   ├── preprocess.py
│   ├── vectorizer.py
│   ├── ranker.py
│   └── requirements.txt
│
├── FRONTEND/app/
│   ├── src/
│   │   ├── sections/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│
└── README.md
```

---

# How It Works

1. User pastes a job description.
2. User uploads PDF resumes.
3. Backend extracts text from resumes.
4. Text is cleaned using SpaCy NLP preprocessing.
5. TF-IDF converts text into vectors.
6. Cosine similarity compares resumes with the job description.
7. Candidates are ranked based on similarity score.
8. Frontend displays ranked candidates with match percentages.

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/RachitSMane/TALENT-RANK-AI-AI-Powered-Resume-Ranker.git
```

---

## 2. Backend Setup

```bash
cd BACKEND
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python app.py
```

Backend runs on:

```bash
http://127.0.0.1:5000
```

---

## 3. Frontend Setup

```bash
cd FRONTEND/app
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# Sample Job Description

```text
Frontend Developer with React, TypeScript, Node.js, REST APIs, Tailwind CSS, GitHub, and system design experience. Strong communication and problem-solving skills required.
```

---

# Sample Output

## Ranked Candidates

| Resume                                | Match Score |
| ------------------------------------- | ----------- |
| resume.pdf                            | 63.89%      |
| Resume-Sample-1-Software-Engineer.pdf | 62.39%      |
| cv.pdf                                | 58.63%      |

---


# Deliverables Completed

 Flask Backend

 Resume Scoring Algorithm

 NLP Preprocessing using SpaCy

 TF-IDF Vectorization

 AI Candidate Ranking

 Frontend UI

 Sample Outputs

 Responsive Design

 HR-style Candidate Cards

---

# Future Improvements

* Resume download reports
* Authentication system
* Database integration
* Resume history tracking
* Advanced AI semantic search
* GPT-based candidate summaries
* Cloud deployment

---

# Author

Rachit Mane

GitHub:

[https://github.com/RachitSMane](https://github.com/RachitSMane)

---

# License

This project is developed for educational and internship learning purposes.
