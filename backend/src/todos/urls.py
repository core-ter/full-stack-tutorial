from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
