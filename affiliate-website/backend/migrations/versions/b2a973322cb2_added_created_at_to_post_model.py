"""added created at to post model

Revision ID: b2a973322cb2
Revises: 32e8e31b22b2
Create Date: 2024-12-08 00:51:13.284647

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b2a973322cb2'
down_revision = '32e8e31b22b2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_date', sa.DateTime(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.drop_column('created_date')

    # ### end Alembic commands ###
