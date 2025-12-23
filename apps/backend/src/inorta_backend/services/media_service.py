from sqlalchemy.orm import Session
from typing import List, Optional

from inorta_backend.models.media import Media
from inorta_backend.schemas.media import MediaCreate, MediaUpdate


class MediaService:
    @staticmethod
    def get_media(db: Session, skip: int = 0, limit: int = 100) -> List[Media]:
        return db.query(Media).offset(skip).limit(limit).all()

    @staticmethod
    def get_media_by_id(db: Session, media_id: int) -> Optional[Media]:
        return db.query(Media).filter(Media.id == media_id).first()

    @staticmethod
    def create_media(db: Session, data: MediaCreate) -> Media:
        db_obj = Media(
            filename=data.filename,
            original_filename=data.original_filename,
            file_path=data.file_path,
            file_url=data.file_url,
            file_type=data.file_type,
            mime_type=data.mime_type,
            size=data.size,
            alt_text=data.alt_text,
            caption=data.caption,
            uploaded_by=data.uploaded_by,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def update_media(db: Session, media_id: int, data: MediaUpdate) -> Optional[Media]:
        db_obj = db.query(Media).filter(Media.id == media_id).first()
        if not db_obj:
            return None
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def delete_media(db: Session, media_id: int) -> bool:
        db_obj = db.query(Media).filter(Media.id == media_id).first()
        if not db_obj:
            return False
        db.delete(db_obj)
        db.commit()
        return True