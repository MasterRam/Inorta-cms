from sqlalchemy.orm import Session
from typing import List, Optional

from inorta_backend.models.role import Role
from inorta_backend.schemas.role import RoleCreate, RoleUpdate


class RoleService:
    @staticmethod
    def get_roles(db: Session, skip: int = 0, limit: int = 100) -> List[Role]:
        return db.query(Role).offset(skip).limit(limit).all()

    @staticmethod
    def get_role_by_id(db: Session, role_id: int) -> Optional[Role]:
        return db.query(Role).filter(Role.id == role_id).first()

    @staticmethod
    def get_role_by_name(db: Session, name: str) -> Optional[Role]:
        return db.query(Role).filter(Role.name == name).first()

    @staticmethod
    def create_role(db: Session, role: RoleCreate) -> Role:
        db_role = Role(name=role.name, description=role.description)
        db.add(db_role)
        db.commit()
        db.refresh(db_role)
        return db_role

    @staticmethod
    def update_role(db: Session, role_id: int, role: RoleUpdate) -> Optional[Role]:
        db_role = db.query(Role).filter(Role.id == role_id).first()
        if not db_role:
            return None
        update_data = role.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_role, field, value)
        db.commit()
        db.refresh(db_role)
        return db_role

    @staticmethod
    def delete_role(db: Session, role_id: int) -> bool:
        db_role = db.query(Role).filter(Role.id == role_id).first()
        if not db_role:
            return False
        db.delete(db_role)
        db.commit()
        return True
