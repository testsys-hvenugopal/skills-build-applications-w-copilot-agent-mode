from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
import os
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.urls import reverse

@api_view(['GET'])
def api_root(request, format=None):
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base_url = f"https://{codespace_name}-8000.app.github.dev"
    else:
        base_url = "http://localhost:8000"
    return Response({
        'users': f"{base_url}{reverse('user-list').replace('/api', '/api')}",
        'teams': f"{base_url}{reverse('team-list').replace('/api', '/api')}",
        'activities': f"{base_url}{reverse('activity-list').replace('/api', '/api')}",
        'leaderboard': f"{base_url}{reverse('leaderboard-list').replace('/api', '/api')}",
        'workouts': f"{base_url}{reverse('workout-list').replace('/api', '/api')}",
    })


router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'teams', views.TeamViewSet, basename='team')
router.register(r'activities', views.ActivityViewSet, basename='activity')
router.register(r'leaderboard', views.LeaderboardViewSet, basename='leaderboard')
router.register(r'workouts', views.WorkoutViewSet, basename='workout')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', api_root, name='api-root'),
]
