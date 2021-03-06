"""add lang to user

Revision ID: a143b60aad61
Revises: 78b52ca39419
Create Date: 2018-08-20 10:17:14.859250

"""

# revision identifiers, used by Alembic.
revision = 'a143b60aad61'
down_revision = '78b52ca39419'

from alembic import op
import sqlalchemy as sa


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('lang', sa.Unicode(length=3), nullable=True))  # nopep8
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'lang')
    # ### end Alembic commands ###
