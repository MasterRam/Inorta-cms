from sqlalchemy.orm import Session
from typing import List, Optional

from inorta_backend.models.menu import Menu
from inorta_backend.models.menu_item import MenuItem
from inorta_backend.schemas.menu import MenuCreate, MenuUpdate, MenuItemCreate, MenuItemUpdate


class MenuService:
    @staticmethod
    def get_menus(db: Session, skip: int = 0, limit: int = 100) -> List[Menu]:
        return db.query(Menu).offset(skip).limit(limit).all()

    @staticmethod
    def get_menu_by_id(db: Session, menu_id: int) -> Optional[Menu]:
        return db.query(Menu).filter(Menu.id == menu_id).first()

    @staticmethod
    def create_menu(db: Session, data: MenuCreate) -> Menu:
        db_obj = Menu(name=data.name, location=data.location)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def update_menu(db: Session, menu_id: int, data: MenuUpdate) -> Optional[Menu]:
        db_obj = db.query(Menu).filter(Menu.id == menu_id).first()
        if not db_obj:
            return None
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def delete_menu(db: Session, menu_id: int) -> bool:
        db_obj = db.query(Menu).filter(Menu.id == menu_id).first()
        if not db_obj:
            return False
        db.delete(db_obj)
        db.commit()
        return True

    # MenuItem operations
    @staticmethod
    def get_menu_items(db: Session, menu_id: int, skip: int = 0, limit: int = 100) -> List[MenuItem]:
        return db.query(MenuItem).filter(MenuItem.menu_id == menu_id).order_by(MenuItem.order).offset(skip).limit(limit).all()

    @staticmethod
    def create_menu_item(db: Session, data: MenuItemCreate) -> MenuItem:
        db_obj = MenuItem(
            menu_id=data.menu_id,
            parent_id=data.parent_id,
            label=data.label,
            url=data.url,
            target=data.target,
            icon=data.icon,
            order=data.order,
            is_active=data.is_active,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def update_menu_item(db: Session, item_id: int, data: MenuItemUpdate) -> Optional[MenuItem]:
        db_obj = db.query(MenuItem).filter(MenuItem.id == item_id).first()
        if not db_obj:
            return None
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def delete_menu_item(db: Session, item_id: int) -> bool:
        db_obj = db.query(MenuItem).filter(MenuItem.id == item_id).first()
        if not db_obj:
            return False
        db.delete(db_obj)
        db.commit()
        return True