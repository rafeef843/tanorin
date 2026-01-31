from django.http import JsonResponse
from django.core.management import call_command
from io import StringIO
import os

def load_data_view(request):
    out = StringIO()
    err = StringIO()
    
    try:
        # Check if file exists
        file_path = 'db_dump.json'
        if not os.path.exists(file_path):
             return JsonResponse({"status": "error", "message": f"File not found: {os.path.abspath(file_path)}"})

        # Run loaddata
        call_command('loaddata', file_path, stdout=out, stderr=err)
        
        return JsonResponse({
            "status": "success",
            "output": out.getvalue(),
            "error": err.getvalue()
        })
    except Exception as e:
        return JsonResponse({
            "status": "exception",
            "message": str(e),
            "output": out.getvalue(),
            "error": err.getvalue()
        })
