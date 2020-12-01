from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify


class UserSession(models.Model):
    unique_id=models.CharField(max_length=150)
    #probably need name field

    def __str__(self):
        return str(self.unique_id)

class Posts(models.Model):
    image=models.ImageField()#for post card
    article_detail=models.TextField(max_length=200)
    article_name=models.CharField(max_length=150)#both for post_card and article page
    article_content=models.TextField()#for article page
    slug = models.SlugField(null=False, unique=True)#both
    time_published=models.DateField(auto_now=True)#article_page
    views=models.IntegerField(default=0,null=True)

    likes=models.ManyToManyField(UserSession,blank=True, related_name='likes')#for article_page 
    # desc=models.TextField()

    def __str__(self):
        return str(self.article_name)
        
    def total_likes(self):
        return self.likes.count()

    def save(self, *args, **kwargs):
        self.slug = slugify(f"{self.article_name} {self.time_published}")
        super(Posts, self).save(*args, **kwargs)

    


class Comments(models.Model):
    commentor_name=models.CharField(max_length=100,null=True)
    commented_post=models.ForeignKey(Posts,on_delete=models.CASCADE)
    unique_ID=models.ForeignKey(UserSession,on_delete=models.CASCADE,null=True,related_name="ID")
    comment=models.TextField()
    comment_on=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.commentor_name)




        
