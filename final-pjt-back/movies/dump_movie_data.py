import requests
from decouple import config
from .models import Movie, Genre, Video

def get_url(path):
    return 'https://api.themoviedb.org/3' + path

def get_api_key():
    return config('API_KEY')

def get_genres():
    url = get_url('/genre/movie/list')
    params = {
        'api_key': get_api_key(),
        'language' : 'ko-KR',
    }
    response = requests.get(url, params=params)
    data = response.json()
    genres = data.get('genres')
    for genre in genres:
        obj_genre = Genre()
        obj_genre.pk = genre['id']
        obj_genre.name = genre['name']
        obj_genre.save()

def save_movie_obj(movie):
    if Movie.objects.filter(pk=movie['id']):
        return

    obj_movie = Movie()
    obj_movie.pk = movie['id']
    obj_movie.title = movie['title']
    obj_movie.release_date = movie['release_date']
    obj_movie.overview = movie['overview']
    obj_movie.adult = movie['adult']
    obj_movie.popularity = movie['popularity']
    obj_movie.backdrop_path = movie['backdrop_path'] if movie['backdrop_path'] else ''
    obj_movie.poster_path = movie['poster_path'] if movie['poster_path'] else ''
    obj_movie.vote_average = movie['vote_average']
    obj_movie.vote_count = movie['vote_count']
    obj_movie.save()
    
    for genre_id in movie['genre_ids']:
        obj_movie.genres.add(Genre.objects.get(pk=genre_id))
    
    url = get_url(f'/movie/{movie["id"]}/videos')
    params = {
        'api_key' : get_api_key(),
    }
    response = requests.get(url, params=params)
    data = response.json()
    videos = data.get('results')
    for video in videos:
        obj_video = Video()
        obj_video.name = video['name']
        obj_video.key = video['key']
        obj_video.size = video['size']
        obj_video.type = video['type']
        obj_video.official = video['official']
        obj_video.save()
        obj_movie.video.add(obj_video)

def get_movie_data():
    get_genres()

    ### GET POPULAR
    for i in range(1,101):
        popular_url = get_url('/movie/popular')
        params = {
            'api_key': get_api_key(),
            'language': 'ko-KR',
            'page': i,
        }
        # Get a list of the current popular movies on TMDB. This list updates daily.
        response = requests.get(popular_url, params=params)
        data = response.json()
        movies = data.get('results')
        for movie in movies:
            if movie.get('release_date', ''):
                save_movie_obj(movie)
        
        # Get a list of movies in theatres. 
        nowplaying_url = get_url('/movie/now_playing')
        response = requests.get(nowplaying_url, params=params)
        data = response.json()
        movies = data.get('results')
        for movie in movies:
            if movie.get('release_date', ''):
                save_movie_obj(movie)
    return