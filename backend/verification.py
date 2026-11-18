
import secrets
from datetime import datetime, timedelta, timezone

from pwdlib import PasswordHash
from sqlalchemy.orm import Session

from models import PhoneVerificationCode

otp_hash = PasswordHash.recommended()

OTP_EXPIRY_MINUTES = 5
MAX_OTP_ATTEMPTS = 5


def generate_otp() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"


def hash_otp(code: str) -> str:
    return otp_hash.hash(code)


def verify_otp(code: str, hashed_code: str) -> bool:
    return otp_hash.verify(code, hashed_code)


def create_verification_code(db: Session, phone_number: str):
    # Invalidate previous unused codes for this phone number.
    old_codes = db.query(PhoneVerificationCode).filter(
        PhoneVerificationCode.phone_number == phone_number,
        PhoneVerificationCode.used_at.is_(None)
    ).all()

    for old_code in old_codes:
        old_code.used_at = datetime.now(timezone.utc)

    code = generate_otp()

    record = PhoneVerificationCode(
        phone_number=phone_number,
        code_hash=hash_otp(code),
        expires_at=datetime.now(timezone.utc)
        + timedelta(minutes=OTP_EXPIRY_MINUTES),
    )

    db.add(record)
    db.commit()

    # The caller will pass this code to the SMS provider.
    return code


def check_verification_code(
    db: Session,
    phone_number: str,
    code: str
) -> bool:
    record = db.query(PhoneVerificationCode).filter(
        PhoneVerificationCode.phone_number == phone_number,
        PhoneVerificationCode.used_at.is_(None)
    ).order_by(
        PhoneVerificationCode.created_at.desc()
    ).first()

    if record is None:
        return False

    now = datetime.now(timezone.utc)

    if record.expires_at <= now:
        record.used_at = now
        db.commit()
        return False

    if record.attempts >= MAX_OTP_ATTEMPTS:
        record.used_at = now
        db.commit()
        return False

    record.attempts += 1

    if not verify_otp(code, record.code_hash):
        if record.attempts >= MAX_OTP_ATTEMPTS:
            record.used_at = now

        db.commit()
        return False

    record.used_at = now
    db.commit()
    return True
