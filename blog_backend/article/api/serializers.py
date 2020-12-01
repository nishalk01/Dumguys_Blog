from rest_framework import serializers

from article.models import Posts
from article.models import Comments

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Posts
        fields=['article_name','image','slug','id','article_detail']

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Posts
        fields=['article_name','article_content','time_published']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields=['commentor_name','comment','comment_on']

class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields=['commentor_name','unique_ID','comment','commented_post']