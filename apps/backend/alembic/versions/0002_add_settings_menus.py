"""Add settings, menus, menu_items tables

Revision ID: 0002_add_settings_menus
Revises: 0001_add_cms_models
Create Date: 2025-12-23 00:00:00.000001
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0002_add_settings_menus'
down_revision = '0001_add_cms_models'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'settings',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('key', sa.String(length=150), nullable=False, unique=True),
        sa.Column('value', sa.Text(), nullable=True),
        sa.Column('data_type', sa.String(length=50), nullable=True, server_default='string'),
        sa.Column('category', sa.String(length=100), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )

    op.create_table(
        'menus',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.Column('location', sa.String(length=100), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )

    op.create_table(
        'menu_items',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('menu_id', sa.Integer(), nullable=False),
        sa.Column('parent_id', sa.Integer(), nullable=True),
        sa.Column('label', sa.String(length=200), nullable=False),
        sa.Column('url', sa.String(length=1024), nullable=True),
        sa.Column('target', sa.String(length=20), nullable=True, server_default='_self'),
        sa.Column('icon', sa.String(length=200), nullable=True),
        sa.Column('"order"', sa.Integer(), nullable=True, server_default='0'),
        sa.Column('is_active', sa.Boolean(), nullable=True, server_default=sa.sql.expression.true()),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['menu_id'], ['menus.id'], name='fk_mi_menu'),
        sa.ForeignKeyConstraint(['parent_id'], ['menu_items.id'], name='fk_mi_parent'),
    )


def downgrade() -> None:
    op.drop_table('menu_items')
    op.drop_table('menus')
    op.drop_table('settings')
