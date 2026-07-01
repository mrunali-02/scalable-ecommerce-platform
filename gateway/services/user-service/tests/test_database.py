from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker

from sqlalchemy.orm import declarative_base


SQLALCHEMY_DATABASE_URL = (

    "postgresql://postgres:password@localhost:5432/test_userdb"

)

engine = create_engine(

    SQLALCHEMY_DATABASE_URL

)

TestingSessionLocal = sessionmaker(

    autocommit=False,

    autoflush=False,

    bind=engine

)

Base = declarative_base()
