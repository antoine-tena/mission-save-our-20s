from typing import Callable
from django.http import HttpRequest, HttpResponse

class RequestLogMiddleware:
    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]) -> None:
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        print(f"DEBUG: Request {request.method} {request.path}")
        response = self.get_response(request)
        print(f"DEBUG: Response {response.status_code}")
        return response
