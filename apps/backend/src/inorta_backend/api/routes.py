from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from inorta_backend.db.session import get_db
from inorta_backend.schemas.user import UserCreate, UserUpdate, UserResponse
from inorta_backend.services.user_service import UserService

# Role imports
from inorta_backend.schemas.role import RoleCreate, RoleUpdate, RoleResponse
from inorta_backend.services.role_service import RoleService

router = APIRouter()


@router.get("/")
def read_root():
    return {"message": "Welcome to Inorta Backend API"}


@router.get("/health")
def health():
    return {"status": "ok", "service": "inorta-backend"}


# Role endpoints
@router.post("/roles", response_model=RoleResponse, status_code=status.HTTP_201_CREATED)
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    existing = RoleService.get_role_by_name(db, role.name)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Role already exists")
    return RoleService.create_role(db, role)


@router.get("/roles", response_model=List[RoleResponse])
def get_roles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return RoleService.get_roles(db, skip=skip, limit=limit)


@router.get("/roles/{role_id}", response_model=RoleResponse)
def get_role(role_id: int, db: Session = Depends(get_db)):
    role = RoleService.get_role_by_id(db, role_id)
    if not role:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Role not found")
    return role


@router.put("/roles/{role_id}", response_model=RoleResponse)
def update_role(role_id: int, role: RoleUpdate, db: Session = Depends(get_db)):
    updated = RoleService.update_role(db, role_id, role)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Role not found")
    return updated


@router.delete("/roles/{role_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_role(role_id: int, db: Session = Depends(get_db)):
    deleted = RoleService.delete_role(db, role_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Role not found")
    return None


# Category endpoints
@router.post("/categories", response_model="inorta_backend.schemas.category.CategoryResponse", status_code=status.HTTP_201_CREATED)
def create_category(category: "inorta_backend.schemas.category.CategoryCreate", db: Session = Depends(get_db)):
    existing = __import__('inorta_backend.services.category_service', fromlist=['CategoryService']).CategoryService.get_category_by_slug(db, category.slug)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category slug already exists")
    return __import__('inorta_backend.services.category_service', fromlist=['CategoryService']).CategoryService.create_category(db, category)


@router.get("/categories", response_model=List["inorta_backend.schemas.category.CategoryResponse"])
def get_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return __import__('inorta_backend.services.category_service', fromlist=['CategoryService']).CategoryService.get_categories(db, skip=skip, limit=limit)


@router.get("/categories/{category_id}", response_model="inorta_backend.schemas.category.CategoryResponse")
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = __import__('inorta_backend.services.category_service', fromlist=['CategoryService']).CategoryService.get_category_by_id(db, category_id)
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return category


@router.put("/categories/{category_id}", response_model="inorta_backend.schemas.category.CategoryResponse")
def update_category(category_id: int, category: "inorta_backend.schemas.category.CategoryUpdate", db: Session = Depends(get_db)):
    updated = __import__('inorta_backend.services.category_service', fromlist=['CategoryService']).CategoryService.update_category(db, category_id, category)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return updated


@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    deleted = __import__('inorta_backend.services.category_service', fromlist=['CategoryService']).CategoryService.delete_category(db, category_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return None


# Tag endpoints
@router.post("/tags", response_model="inorta_backend.schemas.tag.TagResponse", status_code=status.HTTP_201_CREATED)
def create_tag(tag: "inorta_backend.schemas.tag.TagCreate", db: Session = Depends(get_db)):
    existing = __import__('inorta_backend.services.tag_service', fromlist=['TagService']).TagService.get_tag_by_slug(db, tag.slug)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Tag slug already exists")
    return __import__('inorta_backend.services.tag_service', fromlist=['TagService']).TagService.create_tag(db, tag)


@router.get("/tags", response_model=List["inorta_backend.schemas.tag.TagResponse"])
def get_tags(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return __import__('inorta_backend.services.tag_service', fromlist=['TagService']).TagService.get_tags(db, skip=skip, limit=limit)


@router.get("/tags/{tag_id}", response_model="inorta_backend.schemas.tag.TagResponse")
def get_tag(tag_id: int, db: Session = Depends(get_db)):
    tag = __import__('inorta_backend.services.tag_service', fromlist=['TagService']).TagService.get_tag_by_id(db, tag_id)
    if not tag:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tag not found")
    return tag


@router.put("/tags/{tag_id}", response_model="inorta_backend.schemas.tag.TagResponse")
def update_tag(tag_id: int, tag: "inorta_backend.schemas.tag.TagUpdate", db: Session = Depends(get_db)):
    updated = __import__('inorta_backend.services.tag_service', fromlist=['TagService']).TagService.update_tag(db, tag_id, tag)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tag not found")
    return updated


@router.delete("/tags/{tag_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tag(tag_id: int, db: Session = Depends(get_db)):
    deleted = __import__('inorta_backend.services.tag_service', fromlist=['TagService']).TagService.delete_tag(db, tag_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tag not found")
    return None


# Media endpoints
@router.post("/media", response_model="inorta_backend.schemas.media.MediaResponse", status_code=status.HTTP_201_CREATED)
def create_media(media: "inorta_backend.schemas.media.MediaCreate", db: Session = Depends(get_db)):
    return __import__('inorta_backend.services.media_service', fromlist=['MediaService']).MediaService.create_media(db, media)


@router.get("/media", response_model=List["inorta_backend.schemas.media.MediaResponse"])
def get_media(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return __import__('inorta_backend.services.media_service', fromlist=['MediaService']).MediaService.get_media(db, skip=skip, limit=limit)


@router.get("/media/{media_id}", response_model="inorta_backend.schemas.media.MediaResponse")
def get_media_item(media_id: int, db: Session = Depends(get_db)):
    item = __import__('inorta_backend.services.media_service', fromlist=['MediaService']).MediaService.get_media_by_id(db, media_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")
    return item


@router.put("/media/{media_id}", response_model="inorta_backend.schemas.media.MediaResponse")
def update_media(media_id: int, media: "inorta_backend.schemas.media.MediaUpdate", db: Session = Depends(get_db)):
    updated = __import__('inorta_backend.services.media_service', fromlist=['MediaService']).MediaService.update_media(db, media_id, media)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")
    return updated


@router.delete("/media/{media_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_media(media_id: int, db: Session = Depends(get_db)):
    deleted = __import__('inorta_backend.services.media_service', fromlist=['MediaService']).MediaService.delete_media(db, media_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")
    return None


# User CRUD endpoints
@router.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user"""
    # Check if user already exists
    existing_user = UserService.get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    return UserService.create_user(db, user)


@router.get("/users", response_model=List[UserResponse])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all users with pagination"""
    return UserService.get_users(db, skip=skip, limit=limit)


@router.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get user by ID"""
    user = UserService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@router.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    """Update user by ID"""
    updated_user = UserService.update_user(db, user_id, user)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return updated_user


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete user by ID"""
    deleted = UserService.delete_user(db, user_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return None
