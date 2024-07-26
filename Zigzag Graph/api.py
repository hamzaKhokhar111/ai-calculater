'''
    to try from the api run this code and visit http://127.0.0.1:8000/docs
'''
from fastapi import FastAPI
from angle_drawer import draw_lines

app = FastAPI()

@app.get("/")
def home():
    return "welcome to zigzag graph drawer. append /docs to the server link to see documentation"

@app.get("/make_graph")
def make_graph(angle1_degrees: int, angle2_degrees: int, angle3_degrees: int):
    draw_lines(angle1_degrees, angle2_degrees, angle3_degrees)
    return "graph saved"


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", port=8000, reload=True)