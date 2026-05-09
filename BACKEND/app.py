from flask import Flask, request, jsonify
from flask_cors import CORS

from extractor import extract_text_from_pdf
from preprocess import clean_text, extract_keywords
from vectorizer import vectorize
from ranker import rank_candidates

app = Flask(__name__)

CORS(app)

@app.route('/rank', methods=['POST'])
def rank_resumes():

    try:
        job_description = request.form.get('job_description')

        uploaded_files = request.files.getlist('resumes')

        if not job_description or not uploaded_files:
            return jsonify({
                "error": "Missing job description or resumes"
            }), 400

        cleaned_resumes = []

        filenames = []

        original_resume_texts = []

        # PROCESS RESUMES
        for file in uploaded_files:

            raw_text = extract_text_from_pdf(file)

            original_resume_texts.append(raw_text)

            cleaned_text = clean_text(raw_text)

            cleaned_resumes.append(cleaned_text)

            filenames.append(file.filename)

        # CLEAN JOB DESCRIPTION
        cleaned_job_description = clean_text(job_description)

        # VECTORIZE
        vectors = vectorize(
            cleaned_job_description,
            cleaned_resumes
        )

        # RANK
        ranked_results = rank_candidates(
            vectors,
            filenames
        )

        # ENHANCE RESULTS
        enhanced_results = []

        for index, result in enumerate(ranked_results):

            score = result["score"]

            resume_text = original_resume_texts[index]

            keywords = extract_keywords(
                resume_text + " " + job_description
            )

            # AI INSIGHT
            if score >= 85:
                insight = "Excellent match for the role with strong technical alignment."

            elif score >= 70:
                insight = "Strong candidate with relevant technical skills."

            elif score >= 60:
                insight = "Moderate alignment with the job requirements."

            else:
                insight = "Partial alignment detected. Candidate may require upskilling."

            # BADGES
            if index == 0:
                badge = "🥇 Best Fit"

            elif index == 1:
                badge = "🥈 Strong Match"

            else:
                badge = "🥉 Potential Match"

            enhanced_results.append({
                "name": result["name"],
                "score": result["score"],
                "rank": result["rank"],
                "keywords": keywords[:5],
                "insight": insight,
                "badge": badge
            })

        return jsonify({
            "success": True,
            "results": enhanced_results
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == '__main__':
    app.run(debug=True)