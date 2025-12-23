from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MediaBase(BaseModel):
    filename: str
    original_filename: Optional[str] = None
    file_path: str
    file_url: Optional[str] = None
    file_type: Optional[str] = None
    mime_type: Optional[str] = None
    size: Optional[int] = None
    alt_text: Optional[str] = None
    caption: Optional[str] = None
    uploaded_by: Optional[int] = None


class MediaCreate(MediaBase):
    pass


class MediaUpdate(BaseModel):
    alt_text: Optional[str] = None
    caption: Optional[str] = None


class MediaResponse(MediaBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True