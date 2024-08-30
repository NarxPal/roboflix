import pandas as pd

# Load your pre-engineered data
movie_profiles = pd.read_csv('models/movie_profiles.csv')
movie_similarity = pd.read_csv('models/movie_similarity.csv')
movies_df = pd.read_csv('data/movies_df.csv')

def recommend_similar_movies(movie_title, n_recommendations=10):
    # Get movie ID and index
    movie_id = movies_df[movies_df['title'] == movie_title].iloc[0]['movieId']
    movie_index = movie_profiles.index.get_loc(movie_id)
    
    # Get similarity scores and sort
    similarity_scores = movie_similarity.iloc[movie_index-1] # doing -1 for decreasing the index position and grab the row 
    
    similar_movie_indices = similarity_scores.argsort()[::-1]
    
    # Get top recommendations
    top_recommendations = similar_movie_indices[1:n_recommendations + 1]
    recommended_movies = movies_df.iloc[top_recommendations]['title']
    movies_genres = movies_df.iloc[top_recommendations]['genres']

    recommended_movies_list = recommended_movies.tolist()
    movies_genres_list = movies_genres.tolist()

    return {
        'titles': recommended_movies_list,
        'genres': movies_genres_list
    }


# def call():
#     print(movies_df)
#     movie_id = movies_df[movies_df['title'] == "Jumanji (1995)"].iloc[0]['movieId']
#     movie_index = movie_profiles.index.get_loc(movie_id)
#     print(movie_index, "movie_index bro")