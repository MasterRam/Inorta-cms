from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from inorta_backend.db.session import Base


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    menu_id = Column(Integer, ForeignKey('menus.id'), nullable=False)
    menu = relationship('Menu', backref='items')
    parent_id = Column(Integer, ForeignKey('menu_items.id'), nullable=True)
    label = Column(String(200), nullable=False)
    url = Column(String(1024), nullable=True)
    target = Column(String(20), default='_self')
    icon = Column(String(200), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
