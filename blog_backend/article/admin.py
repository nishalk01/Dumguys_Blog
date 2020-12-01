from django.contrib import admin

# Register your models here.
from django_summernote.admin import SummernoteModelAdmin
from .models import Posts,Comments,UserSession

# Apply summernote to all TextField in model.
class SomeModelAdmin(SummernoteModelAdmin):  # instead of ModelAdmin
    summernote_fields = ('article_content',)

admin.site.register(Posts, SomeModelAdmin)
admin.site.register(Comments)
admin.site.register(UserSession)
