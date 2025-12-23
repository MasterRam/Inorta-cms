from sqlalchemy.orm import Session
from typing import List, Optional

from inorta_backend.models.tag import Tag
from inorta_backend.schemas.tag import TagCreate, TagUpdate


class TagService:
    @staticmethod
    def get_tags(db: Session, skip: int = 0, limit: int = 100) -> List[Tag]:
        return db.query(Tag).offset(skip).limit(limit).all()

    @staticmethod
    def get_tag_by_id(db: Session, tag_id: int) -> Optional[Tag]:
        return db.query(Tag).filter(Tag.id == tag_id).first()

    @staticmethod
    def get_tag_by_slug(db: Session, slug: str) -> Optional[Tag]:
        return db.query(Tag).filter(Tag.slug == slug).first()

    @staticmethod
    def create_tag(db: Session, data: TagCreate) -> Tag:
        db_obj = Tag(name=data.name, slug=data.slug)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def update_tag(db: Session, tag_id: int, data: TagUpdate) -> Optional[Tag]:
        db_obj = db.query(Tag).filter(Tag.id == tag_id).first()
        if not db_obj:
            return None
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def delete_tag(db: Session, tag_id: int) -> bool:
        db_obj = db.query(Tag).filter(Tag.id == tag_id).first()
        if not db_obj:
            return False
        db.delete(db_obj)
        db.commit()
        return True