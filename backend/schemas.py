
from pydantic import BaseModel, Field, ConfigDict


class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    phone_number: str = Field(
        pattern=r"^\+[1-9]\d{7,14}$",
        description="International phone number, e.g. +254712345678"
    )
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    phone_number: str = Field(
        pattern=r"^\+[1-9]\d{7,14}$"
    )
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    phone_number: str
    is_verified: bool
