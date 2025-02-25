import starlette.status as status

from app.exceptions import IvarehAPIError


class _DBErrorLogBase(IvarehAPIError):
    """If you want DB error to be logged, inherit from this class."""

    def __init__(
        self,
        *,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        headers: dict[str, str] | None = None,
        function_name: str | None = "Unknown function",
        detail: str | None = "Unknown error in the database",
        class_name: str | None = None,
    ):
        # Insert logger here:

        super().__init__(
            status_code=status_code,
            headers=headers,
            function_name=function_name,
            class_name=class_name,
            detail=detail,
        )


class DbObjectAlreadyExistsError(_DBErrorLogBase):
    """Exception raised for db object already exists errors."""

    def __init__(
        self,
        *,
        model_table_name: str,
        function_name: str | None = "Unknown function",
        class_name: str | None = None,
        status_code: int = status.HTTP_409_CONFLICT,
    ):
        detail = f"Object(s) try to be created in '{model_table_name}' already exists"
        super().__init__(
            status_code=status_code,
            function_name=function_name,
            class_name=class_name,
            detail=detail,
        )
