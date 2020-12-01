from django.urls import path
from .views import api_post,api_get_article,api_get_comment,api_post_comment,api_like_post,api_check_like,SearchArticle
app_name="article"

urlpatterns=[
    path("posts/",api_post,name="posts"),
    path("article/<slug:slug>/",api_get_article,name="article_content"),
    path("comments/<slug:slug>/",api_get_comment,name="article_comment"),
    path("comments_post/<slug:slug>/",api_post_comment,name="article_post_comment"),
    path("like/<slug:slug>/",api_like_post,name="article_like"),
    path("check_like/<slug:slug>/",api_check_like,name="check_like"),
    path("article_search/",SearchArticle.as_view(),name="article_search"),
]