from django.urls import path
from recommendations import views

urlpatterns = [
    path('recommend/<str:movie_title>/', views.get_recommendations, name='get_recommendations'),
    path('movies/', views.get_all_movies, name='get_all_movies'),

]
