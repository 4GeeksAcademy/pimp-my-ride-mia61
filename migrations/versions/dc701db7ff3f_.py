"""empty message

Revision ID: dc701db7ff3f
Revises: 7c47be5291f4
Create Date: 2024-04-14 21:35:35.160460

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dc701db7ff3f'
down_revision = '7c47be5291f4'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('work_orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('images', sa.String(), nullable=False, server_default='default_value'))
    # Once all existing entries have the default value, you can remove the server_default if not needed permanently
    with op.batch_alter_table('work_orders', schema=None) as batch_op:
        batch_op.alter_column('images', server_default=None)


def downgrade():
    with op.batch_alter_table('work_orders', schema=None) as batch_op:
        batch_op.drop_column('images')

    # ### end Alembic commands ###
