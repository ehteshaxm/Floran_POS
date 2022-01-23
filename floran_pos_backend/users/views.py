from rest_framework.exceptions import ValidationError
from .serializers import *
from rest_framework import generics, permissions,viewsets,views
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.parsers import MultiPartParser, FormParser
# registeration API

class RegisterAPI(generics.GenericAPIView):
    serializer_class =  registerSerializer
    # serializer_class =  hotel_detailSerializer
    parser_classes = [MultiPartParser, FormParser]
    # add if condition to check whether all fields are there

    def post(self,request, *args, **kwargs):

        print(request.data)
        print(type(request.data))
        print(request.data["username"])

        registerData = {
            "username":request.data["username"],
            "email":request.data["email"],
            "password":request.data["password"],
            "password2":request.data["password2"]
        }

        serializer = self.get_serializer(data=registerData)
        # serializer = registerSerializer(data=registerData)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        profileData = {
            "user_linked":user.pk,
            "logo":request.data["logo"],
            "hotel_name":request.data["hotel_name"],
            "hotel_address":request.data["hotel_address"],
            "mobile_number":request.data["mobile_number"],
            "gst_number":request.data["gst_number"],
            "bank_name":request.data["bank_name"],
            "account_number":int(request.data["account_number"]),
            "IFC_number":request.data["IFC_number"],
            "branch_name":request.data["branch_name"],
            "company_pan":request.data["company_pan"]
        }
        print("Pofile  ",profileData)

        hotelSerializer = hotel_detailSerializer(data=profileData)
        # hotelSerializer =  self.get_serializer(data=profileData)

        if hotelSerializer.is_valid():
            hotelData = hotelSerializer.save()
        else:
            print("error mai hu bhai")
            user.delete()
            raise ValidationError(hotelSerializer.errors)
        return Response({
            "user": userSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],
            "user_profile": hotel_detailSerializer(hotelData).data,
            "profileExists":True

        })




#login api
class LoginAPI(generics.GenericAPIView):
    serializer_class = loginSerilaizer

    def post(self,request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user_profile = Hotel_detail.objects.filter(user_linked=user.id).values()
        if user_profile:
            profileExists = True
        else:
            profileExists = False
        return Response({
            "user": userSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],
            "user_profile": user_profile,
            "profileExists":profileExists

        })
    

# get user api
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = userSerializer

    def get_object(self):
        return self.request.user


#hotel_detail api

class hotelDetailAPI(viewsets.ModelViewSet):
    serializer_class = hotel_detailSerializer
    permission_classes = [
        permissions.IsAuthenticated
        # permissions.AllowAny
    ]
    queryset = Hotel_detail.objects.all()

    def get_queryset(self):
        return super(hotelDetailAPI, self).get_queryset().filter(user_linked=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user_linked=self.request.user)

