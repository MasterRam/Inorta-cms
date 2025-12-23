from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )

    # App Settings
    app_name: str = "Inorta CMS Backend"
    env: str = "development"
    debug: bool = True

    # Database Settings
    database_url: str = "mysql+pymysql://root:password@localhost:3306/inorta_cms"
    
    # Alternative SQLite for development
    # database_url: str = "sqlite:///./dev.db"
    
    # Security
    secret_key: str = "replace-me-with-secure-key"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30


settings = Settings()