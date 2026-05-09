from sklearn.metrics.pairwise import cosine_similarity

def rank_candidates(vectors, filenames):
    similarity_scores = cosine_similarity(
        vectors[0:1],
        vectors[1:]
    ).flatten()

    ranked_results = sorted(
        zip(filenames, similarity_scores),
        key=lambda x: x[1],
        reverse=True
    )

    output = []

    for index, (name, score) in enumerate(ranked_results):

        boosted_score = score * 100

        if boosted_score < 55:
            boosted_score += 55

        if boosted_score > 98:
            boosted_score = 98

        output.append({
            "name": name,
            "score": round(boosted_score, 2),
            "rank": index + 1
        })

    return output