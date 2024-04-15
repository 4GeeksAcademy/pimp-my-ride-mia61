"""empty message

Revision ID: d26e9e4c0645
Revises: dc701db7ff3f
Create Date: 2024-04-15 14:08:23.040130

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd26e9e4c0645'
down_revision = 'dc701db7ff3f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('work_order_id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=500), nullable=False),
    sa.Column('public_id', sa.String(length=500), nullable=False),
    sa.ForeignKeyConstraint(['work_order_id'], ['work_orders.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('public_id')
    )
    with op.batch_alter_table('work_orders', schema=None) as batch_op:
        batch_op.drop_column('images')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('work_orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('images', sa.VARCHAR(), autoincrement=False, nullable=False))

    op.drop_table('images')
    # ### end Alembic commands ###
