from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class ContentStatus(str, Enum):
    draft = "draft"
    published = "published"
    archived = "archived"


class ContentType(str, Enum):
    post = "post"
    page = "page"
    article = "article"


class ContentBase(BaseModel):
    title: str
    slug: str
    content: Optional[str] = None
    excerpt: Optional[str] = None
    status: Optional[ContentStatus] = ContentStatus.draft
    content_type: Optional[ContentType] = ContentType.post
    featured_image_id: Optional[int] = None


class ContentCreate(ContentBase):
    author_id: int


class ContentUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    status: Optional[ContentStatus] = None
    content_type: Optional[ContentType] = None
    featured_image_id: Optional[int] = None


class ContentResponse(ContentBase):
    id: int
    author_id: int
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
