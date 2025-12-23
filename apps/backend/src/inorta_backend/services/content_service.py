from sqlalchemy.orm import Session
from typing import List, Optional
from sqlalchemy.exc import IntegrityError

from inorta_backend.models.content import Content
from inorta_backend.schemas.content import ContentCreate, ContentUpdate


class ContentService:
    @staticmethod
    def get_contents(db: Session, skip: int = 0, limit: int = 100) -> List[Content]:
        return db.query(Content).offset(skip).limit(limit).all()

    @staticmethod
    def get_content_by_id(db: Session, content_id: int) -> Optional[Content]:
        return db.query(Content).filter(Content.id == content_id).first()

    @staticmethod
    def get_content_by_slug(db: Session, slug: str) -> Optional[Content]:
        return db.query(Content).filter(Content.slug == slug).first()

    @staticmethod
    def create_content(db: Session, data: ContentCreate) -> Content:
        db_content = Content(
            title=data.title,
            slug=data.slug,
            content=data.content,
            excerpt=data.excerpt,
            author_id=data.author_id,
            status=data.status,
            content_type=data.content_type,
            featured_image_id=data.featured_image_id,
        )
        db.add(db_content)
        try:
            db.commit()
        except IntegrityError:
            db.rollback()
            raise
        db.refresh(db_content)
        return db_content

    @staticmethod
    def update_content(db: Session, content_id: int, data: ContentUpdate) -> Optional[Content]:
        db_content = db.query(Content).filter(Content.id == content_id).first()
        if not db_content:
            return None
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_content, field, value)
        db.commit()
        db.refresh(db_content)
        return db_content

    @staticmethod
    def delete_content(db: Session, content_id: int) -> bool:
        db_content = db.query(Content).filter(Content.id == content_id).first()
        if not db_content:
            return False
        db.delete(db_content)
        db.commit()
        return True
