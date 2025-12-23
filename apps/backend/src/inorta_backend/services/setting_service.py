from sqlalchemy.orm import Session
from typing import List, Optional

from inorta_backend.models.settings import Setting
from inorta_backend.schemas.setting import SettingCreate, SettingUpdate


class SettingService:
    @staticmethod
    def get_settings(db: Session, skip: int = 0, limit: int = 100) -> List[Setting]:
        return db.query(Setting).offset(skip).limit(limit).all()

    @staticmethod
    def get_setting_by_id(db: Session, setting_id: int) -> Optional[Setting]:
        return db.query(Setting).filter(Setting.id == setting_id).first()

    @staticmethod
    def get_setting_by_key(db: Session, key: str) -> Optional[Setting]:
        return db.query(Setting).filter(Setting.key == key).first()

    @staticmethod
    def create_setting(db: Session, data: SettingCreate) -> Setting:
        db_obj = Setting(
            key=data.key,
            value=data.value,
            data_type=data.data_type,
            category=data.category,
            description=data.description,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def update_setting(db: Session, setting_id: int, data: SettingUpdate) -> Optional[Setting]:
        db_obj = db.query(Setting).filter(Setting.id == setting_id).first()
        if not db_obj:
            return None
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def delete_setting(db: Session, setting_id: int) -> bool:
        db_obj = db.query(Setting).filter(Setting.id == setting_id).first()
        if not db_obj:
            return False
        db.delete(db_obj)
        db.commit()
        return True