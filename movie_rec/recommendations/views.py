from django.shortcuts import render

from django.http import JsonResponse
from .recommender import recommend_similar_movies  # importing recommendation functio
import pandas as pd


# Create your views here.

def get_recommendations(request, movie_title):
    recommended_movies = recommend_similar_movies(movie_title)
    return JsonResponse({'recommended_movies': recommended_movies})

def get_all_movies(request):
    movie_profiles = pd.read_csv('models/movie_profiles.csv') 
    movie_profiles.reset_index(inplace=True)

    movies_df = pd.read_csv('data/movies_df.csv')
    
    # Assuming movie_profiles has a column 'movieId'
    print(movies_df.columns)
    print(movie_profiles.columns)

    movies = movies_df[movies_df['movieId'].isin(movie_profiles['index'])]
    
    return JsonResponse(movies.to_dict(orient='records'), safe=False)