from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from model import Id

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def ome():
    print('yoooooooooooooooooooooo')

    return get_library(get_id())

    

@app.get("/library-data", response_model=Id)
async def get_library(id: Id):
    print(id)


def get_id():
    response = requests.get('https://kitsu.io/api/edge/users?filter[name]=kimeko2')
    res = response.json()
    print(res)

    for user in res['data']:
        print(user['id'])

    return user['id']

def get_library(id):
    url = 'https://kitsu.io/api/edge/users/{}/library-entries'
    response = requests.get(url.format(id))
    res = response.json()

    print(res)
    more = res['data']

    return get_animes(res['data'])

def get_animes(data):

    arr = []

    for anime in data:
        res = requests.get((((anime['relationships'])['anime'])['links'])['related'])

        print('yeyaaaaaaaaaaaaaaaaaaaa')
        print(res)
        arr.append(res.json())

    return arr


