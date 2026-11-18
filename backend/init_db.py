
from database import engine
from models import Base, User, PhoneVerificationCode

Base.metadata.create_all(bind=engine)

print("VYORA database tables created successfully!")
