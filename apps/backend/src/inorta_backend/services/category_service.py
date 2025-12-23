from sqlalchemy.orm import Session
from typing import List, Optional

from inorta_backend.models.category import Category
from inorta_backend.schemas.category import CategoryCreate, CategoryUpdate


class CategoryService:
    @staticmethod
    def get_categories(db: Session, skip: int = 0, limit: int = 100) -> List[Category]:
        return db.query(Category).offset(skip).limit(limit).all()

    @staticmethod
    def get_category_by_id(db: Session, category_id: int) -> Optional[Category]:
        return db.query(Category).filter(Category.id == category_id).first()

    @staticmethod
    def get_category_by_slug(db: Session, slug: str) -> Optional[Category]:
        return db.query(Category).filter(Category.slug == slug).first()

    @staticmethod
    def create_category(db: Session, data: CategoryCreate) -> Category:
        db_obj = Category(
            name=data.name,
            slug=data.slug,
            description=data.description,
            parent_id=data.parent_id,
            order=data.order,
            is_active=data.is_active,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def update_category(db: Session, category_id: int, data: CategoryUpdate) -> Optional[Category]:
        db_obj = db.query(Category).filter(Category.id == category_id).first()
        if not db_obj:
            return None
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def delete_category(db: Session, category_id: int) -> bool:
        db_obj = db.query(Category).filter(Category.id == category_id).first()
        if not db_obj:
            return False
        db.delete(db_obj)
        db.commit()
        return True