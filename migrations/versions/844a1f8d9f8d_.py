"""empty message

Revision ID: 844a1f8d9f8d
Revises: 7340af0a7362
Create Date: 2024-04-18 16:37:19.463567

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '844a1f8d9f8d'
down_revision = '7340af0a7362'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('verification_code', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('verification_code_expires', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('reset_token', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('token_created_at', sa.DateTime(), nullable=True))

    with op.batch_alter_table('work_orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('current_stage', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('work_orders', schema=None) as batch_op:
        batch_op.drop_column('current_stage')

    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.drop_column('token_created_at')
        batch_op.drop_column('reset_token')
        batch_op.drop_column('verification_code_expires')
        batch_op.drop_column('verification_code')

    # ### end Alembic commands ###
