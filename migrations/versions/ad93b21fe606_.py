"""empty message

Revision ID: ad93b21fe606
Revises: 37de532cb008
Create Date: 2024-04-17 14:18:01.898150

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ad93b21fe606'
down_revision = '37de532cb008'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('reset_token', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('token_created_at', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.drop_column('token_created_at')
        batch_op.drop_column('reset_token')

    # ### end Alembic commands ###