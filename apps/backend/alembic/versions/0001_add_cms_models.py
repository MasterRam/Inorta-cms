"""Add CMS models: roles, contents, categories, tags, content relations, media

Revision ID: 0001_add_cms_models
Revises: 
Create Date: 2025-12-23 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '0001_add_cms_models'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create roles table
    op.create_table(
        'roles',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('name', sa.String(length=50), nullable=False, unique=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )

    # Add role_id to users (if not present)
    try:
        op.add_column('users', sa.Column('role_id', sa.Integer(), nullable=True))
        op.create_foreign_key('fk_users_role', 'users', 'roles', ['role_id'], ['id'])
    except Exception:
        # If users table or column already exists in some setups, ignore
        pass

    # Categories
    op.create_table(
        'categories',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False, unique=True),
        sa.Column('slug', sa.String(length=150), nullable=False, unique=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('parent_id', sa.Integer(), nullable=True),
        sa.Column('order', sa.Integer(), nullable=True, server_default='0'),
        sa.Column('is_active', sa.Boolean(), nullable=True, server_default=sa.sql.expression.true()),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )

    # Tags
    op.create_table(
        'tags',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False, unique=True),
        sa.Column('slug', sa.String(length=150), nullable=False, unique=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )

    # Contents
    content_status = sa.Enum('draft', 'published', 'archived', name='contentstatus')
    content_type = sa.Enum('post', 'page', 'article', name='contenttype')
    content_status.create(op.get_bind(), checkfirst=True)
    content_type.create(op.get_bind(), checkfirst=True)

    op.create_table(
        'contents',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('slug', sa.String(length=255), nullable=False, unique=True),
        sa.Column('content', sa.Text(), nullable=True),
        sa.Column('excerpt', sa.String(length=512), nullable=True),
        sa.Column('author_id', sa.Integer(), nullable=False),
        sa.Column('status', content_status, nullable=True, server_default='draft'),
        sa.Column('content_type', content_type, nullable=True, server_default='post'),
        sa.Column('published_at', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.Column('views_count', sa.Integer(), nullable=True, server_default='0'),
        sa.Column('featured_image_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['author_id'], ['users.id'], name='fk_contents_author'),
    )

    # Content <-> Category
    op.create_table(
        'content_categories',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('content_id', sa.Integer(), nullable=False),
        sa.Column('category_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['content_id'], ['contents.id'], name='fk_cc_content'),
        sa.ForeignKeyConstraint(['category_id'], ['categories.id'], name='fk_cc_category'),
    )

    # Content <-> Tag
    op.create_table(
        'content_tags',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('content_id', sa.Integer(), nullable=False),
        sa.Column('tag_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['content_id'], ['contents.id'], name='fk_ct_content'),
        sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], name='fk_ct_tag'),
    )

    # Media
    op.create_table(
        'media',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('filename', sa.String(length=255), nullable=False),
        sa.Column('original_filename', sa.String(length=255), nullable=True),
        sa.Column('file_path', sa.String(length=1024), nullable=False),
        sa.Column('file_url', sa.String(length=1024), nullable=True),
        sa.Column('file_type', sa.String(length=50), nullable=True),
        sa.Column('mime_type', sa.String(length=100), nullable=True),
        sa.Column('size', sa.Integer(), nullable=True),
        sa.Column('alt_text', sa.String(length=255), nullable=True),
        sa.Column('caption', sa.Text(), nullable=True),
        sa.Column('uploaded_by', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['uploaded_by'], ['users.id'], name='fk_media_uploader'),
    )


def downgrade() -> None:
    # Drop media
    op.drop_table('media')

    # Drop content_tag and content_category
    op.drop_table('content_tags')
    op.drop_table('content_categories')

    # Drop contents (also drop enums)
    op.drop_table('contents')
    sa.Enum(name='contentstatus').drop(op.get_bind(), checkfirst=True)
    sa.Enum(name='contenttype').drop(op.get_bind(), checkfirst=True)

    # Drop tags and categories
    op.drop_table('tags')
    op.drop_table('categories')

    # Remove role_id foreign key/column from users if present
    try:
        op.drop_constraint('fk_users_role', 'users', type_='foreignkey')
        op.drop_column('users', 'role_id')
    except Exception:
        pass

    # Drop roles
    op.drop_table('roles')
