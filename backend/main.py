
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base, User
from schemas import RegisterRequest, LoginRequest, UserResponse
from auth import hash_password, verify_password, create_access_token

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="VYORA API",
    description="The backend powering the VYORA social network",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://vyora-tan.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to VYORA API!",
        "status": "running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "application": "VYORA"
    }


@app.post(
    "/api/register",
    response_model=UserResponse,
    status_code=201
)
def register(data: RegisterRequest, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.phone_number == data.phone_number
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="This phone number is already registered."
        )

    user = User(
        full_name=data.full_name,
        phone_number=data.phone_number,
        hashed_password=hash_password(data.password),
        is_verified=False
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


@app.post("/api/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.phone_number == data.phone_number
    ).first()

    if not user or not verify_password(
        data.password,
        user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect phone number or password."
        )

    token = create_access_token(user.id)

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "phone_number": user.phone_number,
            "is_verified": user.is_verified
        }
    }
