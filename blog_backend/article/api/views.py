from rest_framework.decorators import api_view
from django.contrib.auth.models import User
import uuid
import json
from django.db.models import F
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status,generics
from django.shortcuts import get_object_or_404
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer,ArticleSerializer,CommentSerializer,PostCommentSerializer
from article.models import Posts,Comments,UserSession


def check_for_id(request):
    if(request.method=="GET"):
      id_request=request.GET["ID"]

    elif(request.method=="POST"):
      data_id=request.data #handle if there is no id in request *
      id_request=data_id["ID"]

    if(id_request):
        unique_id=""  #already present
        check=True    
    else:
        unique_id=uuid.uuid4() #create new id 
        UserSession.objects.create(unique_id=str(unique_id))
        check=False
    return unique_id,check


@api_view(['GET',])
def api_post(request):
    if request.method == "GET":
        posts=Posts.objects.all()
        serializer=PostSerializer(posts,context={"request":request},many=True)
        data_to=json.loads(json.dumps(serializer.data))
        unique_id,check=check_for_id(request)  #handle request without id dict *
        print(check)
        data_to={"data":data_to,"unique_id":unique_id} 
        return Response(data_to)

@api_view(['GET',])
def api_get_article(request,slug):
    if request.method=="GET":
     try:
        get_article=Posts.objects.get(slug=slug)
        get_article.views =get_article.views+1
        get_article.save()
        # print(get_article.views)
        serializer=ArticleSerializer(get_article)
        return Response(serializer.data)
     except:
         return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET',])
def api_get_comment(request,slug):
    if request.method=="GET":
        get_comments=Comments.objects.filter(commented_post__slug__contains=slug)
        unique_id=request.GET["ID"]
        unique_id_from_check,_=check_for_id(request)
        print(unique_id_from_check)
        if(unique_id):
         instance_user=UserSession.objects.get(unique_id=str(unique_id))
         obj=Comments.objects.all().filter(unique_ID=instance_user.id)
        
        
        serializer=CommentSerializer(get_comments,many=True)
        comment_data=json.loads(json.dumps(serializer.data))
        try:
            commentor_name=obj[0].commentor_name
        except (IndexError,UnboundLocalError):
            commentor_name=""
        comment_get={"comment_data":comment_data,"commentor_name":commentor_name,"unique_id_get_comment":unique_id_from_check}     
        return Response(comment_get)



@api_view(['POST'])
def api_post_comment(request,slug):
    if request.method=="POST":
        comment_data=request.data
        comment_data["commented_post"]=str(slug)
        comment_data_json=json.dumps(comment_data)
        print(comment_data["commentor_name"])
        try:
            commentor_name=comment_data["commentor_name"]
            # commented_post=comment_data["commented_post"]
            ID=comment_data["ID"]
            comment=comment_data["comment"]
            
            instance_post=Posts.objects.get(slug=slug)
            instance_ID=UserSession.objects.get(unique_id=ID)
            # print(instance_ID.id)
            Comments.objects.create(commentor_name=commentor_name,commented_post=instance_post,unique_ID=instance_ID,comment=comment)
            return Response({'message': 'comment uploaded'},status=status.HTTP_201_CREATED)
        except:
            return Response({'message': 'comment not proper'},status=status.HTTP_400_BAD_REQUEST)

# {
#     "user_name":"nishal",
#     "ID":"uud",
#     "commented_post":"how are you"
#     "comment":"comment it is",
# }


@api_view(['POST',])
def api_like_post(request,slug):
    if request.method=="POST":
        unique_id,check=check_for_id(request)
        print(request.data["ID"])
        unique_id_for_userauth=request.data["ID"]
        unique_id_instance=UserSession.objects.get(unique_id=unique_id_for_userauth)#handle query doesnot exists*
        post_instance=Posts.objects.get(slug=slug)#handle slug not there*
        if(post_instance.likes.filter(id=unique_id_instance.id)):
            post_instance.likes.remove(unique_id_instance)
            like_status=False
        else:
            post_instance.likes.add(unique_id_instance)
            like_status=True
        like_status_obj={"like_status":like_status}
        return Response(like_status_obj,status.HTTP_200_OK)

@api_view(['GET',])
def api_check_like(request,slug):#change this method later*
    if request.method=="GET":
        check_like={"check_like":False}
        if(request.GET["ID"]):
         post_instance=Posts.objects.get(slug=slug)
         unique_id,check=check_for_id(request)
         check_like["unique_id"]=unique_id
         unique_id_for_check=request.GET["ID"]
         print(check_like)
         unique_id_check_instance=UserSession.objects.get(unique_id=unique_id_for_check)
         print(post_instance)
         if(post_instance.likes.filter(id=unique_id_check_instance.id)):
             check_like["check_like"]=True
             return Response(check_like,status.HTTP_200_OK)
         else:
             return Response(check_like,status.HTTP_200_OK)
        else:
            return Response(check_like,status.HTTP_200_OK)

class SearchArticle(generics.ListAPIView):
    queryset=Posts.objects.all()
    serializer_class=PostSerializer
    filter_backends= (SearchFilter, OrderingFilter)
    search_fields=['article_name','article_detail']


# https://www.nishalk01.pythonanywhere.com/
