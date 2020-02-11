from django.shortcuts import render
from django.http import HttpResponse
from .forms import UploadFileForm
from .scrips import getPdf


# Create your views here.
def index(request):
    return render(request, 'drawer2/index.html')

def upload_file(request):
    if request.method == 'POST':
        status, file = getPdf(request.FILES['file'])
        if status == 0:
            return HttpResponse(file,content_type='application/pdf')
        else:
            return HttpResponse("Error in input file.")
    else:
        form = UploadFileForm()
    return render(request, 'drawer2/upload.html', {'form': form})
