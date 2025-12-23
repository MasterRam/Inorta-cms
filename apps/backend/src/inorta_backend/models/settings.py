from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from inorta_backend.db.session import Base


class Setting(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(150), unique=True, nullable=False, index=True)
    value = Column(Text, nullable=True)
    data_type = Column(String(50), default="string")
    category = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
