import re
import spacy

nlp = spacy.load("en_core_web_sm")

# TECH + ATS KEYWORDS
TECH_KEYWORDS = [

    # FRONTEND
    "react",
    "nextjs",
    "next.js",
    "typescript",
    "javascript",
    "html",
    "css",
    "tailwind",
    "redux",

    # BACKEND
    "nodejs",
    "node.js",
    "express",
    "flask",
    "django",
    "fastapi",

    # DATABASES
    "mongodb",
    "mysql",
    "postgresql",
    "sql",

    # CLOUD / DEVOPS
    "aws",
    "docker",
    "kubernetes",
    "firebase",
    "vercel",
    "netlify",

    # AI / ML
    "python",
    "machine learning",
    "deep learning",
    "ai",
    "nlp",
    "tensorflow",
    "pytorch",
    "scikit-learn",

    # GENERAL
    "git",
    "github",
    "rest api",
    "api",
    "data structures",
    "algorithms",
    "system design",
]

def clean_text(text):

    # LOWERCASE
    text = text.lower()

    # REMOVE SPECIAL CHARACTERS
    text = re.sub(
        r'[^a-zA-Z0-9\s]',
        ' ',
        text
    )

    # REMOVE EXTRA SPACES
    text = re.sub(
        r'\s+',
        ' ',
        text
    )

    # NLP PROCESSING
    doc = nlp(text)

    tokens = [

        token.lemma_

        for token in doc

        if (
            not token.is_stop
            and not token.is_punct
            and len(token.text) > 2
        )
    ]

    return " ".join(tokens)

def extract_keywords(text):

    text_lower = text.lower()

    found_keywords = set()

    for keyword in TECH_KEYWORDS:

        if keyword in text_lower:

            found_keywords.add(keyword)

    # SORT KEYWORDS
    return sorted(list(found_keywords))

def generate_ai_insight(score):

    if score >= 90:

        return (
            "Outstanding candidate with exceptional alignment "
            "to the job description and strong technical relevance."
        )

    elif score >= 80:

        return (
            "Excellent match with highly relevant technical "
            "skills and ATS compatibility."
        )

    elif score >= 70:

        return (
            "Strong candidate with good alignment "
            "to the required role and technologies."
        )

    elif score >= 60:

        return (
            "Moderate match. Candidate meets several "
            "requirements but may need upskilling."
        )

    else:

        return (
            "Limited alignment detected. Candidate may not "
            "fully satisfy the core job requirements."
        )

def get_match_badge(rank):

    if rank == 1:
        return "🥇 Best Fit"

    elif rank == 2:
        return "🥈 Strong Match"

    elif rank == 3:
        return "🥉 Potential Match"

    else:
        return "📄 Candidate"