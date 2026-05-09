from sklearn.feature_extraction.text import TfidfVectorizer

def vectorize(job_description, resumes):
    corpus = [job_description] + resumes

    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(corpus)

    return vectors