"""empty message

Revision ID: 306cb4240224
Revises: 
Create Date: 2023-08-15 11:41:34.669201

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '306cb4240224'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('friends',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fromUser', sa.String(length=20), nullable=True),
    sa.Column('toUser', sa.String(length=20), nullable=True),
    sa.Column('status', sa.String(length=10), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profile_imageURL', sa.Text(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('totalExp', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('texts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('typingText', sa.Text(), nullable=False),
    sa.Column('wordCount', sa.Integer(), nullable=False),
    sa.Column('characterCount', sa.Integer(), nullable=False),
    sa.Column('noSpaceCharacterCount', sa.Integer(), nullable=False),
    sa.Column('public', sa.Boolean(), nullable=False),
    sa.Column('textExp', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('scores',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('textId', sa.Integer(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('time', sa.Integer(), nullable=False),
    sa.Column('mistakes', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('kpm', sa.Integer(), nullable=False),
    sa.Column('runExp', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['textId'], ['texts.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('scores')
    op.drop_table('texts')
    op.drop_table('users')
    op.drop_table('friends')
    # ### end Alembic commands ###
