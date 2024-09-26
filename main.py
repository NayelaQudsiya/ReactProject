from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from uuid import UUID, uuid4
from typing import List

app = FastAPI()

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can limit this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    id: UUID = uuid4()  
    name: str
    email: EmailStr
    password: str

users: List[User] = []

@app.post("/users/", response_model=User)
def create_user(user: User):
    if any(u.email == user.email for u in users):
        raise HTTPException(status_code=400, detail="Email is registered")
    users.append(user)
    return user