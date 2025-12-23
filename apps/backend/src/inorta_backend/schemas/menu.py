from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MenuBase(BaseModel):
    name: str
    location: Optional[str] = None


class MenuCreate(MenuBase):
    pass


class MenuUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None


class MenuResponse(MenuBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MenuItemBase(BaseModel):
    menu_id: int
    parent_id: Optional[int] = None
    label: str
    url: Optional[str] = None
    target: Optional[str] = "_self"
    icon: Optional[str] = None
    order: Optional[int] = 0
    is_active: Optional[bool] = True


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemUpdate(BaseModel):
    parent_id: Optional[int] = None
    label: Optional[str] = None
    url: Optional[str] = None
    target: Optional[str] = None
    icon: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class MenuItemResponse(MenuItemBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True