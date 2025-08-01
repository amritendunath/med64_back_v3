from pydantic import BaseModel


class ErrorResponse(BaseModel):
    error: str
    detail: str


class GenerationRequest(BaseModel):
    query: str
    queryModeType: str


class GenerationResponse(BaseModel):
    answer: str
    dialog_state: str
