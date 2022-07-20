## UserAccounts-Auth

This project is about to the **UserAccounts Auth**

### Prerequisites: 

Must have installed Django and React and setup requirement.

### Table of Content

[Setup](#Backend Setup)

[Settings.py Code]()


### Backend Setup

For authentication, we need to install the following pkg.

    pip install djangorestframework-simplejwt

Also need to install *djoser* pkg

    pip install djoser

### Include

After this need to add in the project
**`settings.py`** at *INSTALLED_APPS* include the below lines of code.

    'djoser',

[official djoser docs](https://djoser.readthedocs.io/en/latest/getting_started.html)

#### Models.py

In the models of this app have custom user model.

In the `settings.py` also need to add this:

    AUTH_USER_MODEL = "accounts4.UserAccount"

### Frontend

    npm install --save axios react-router-dom redux redux-devtools-extension react-redux redux-thunk 

For build

     npm run build 

After this move the build folder in the backend folder.

[React Login with Djoser - Part 6](https://www.youtube.com/watch?v=5gnixz0Q3co)

#### JWT Endpoints

[Djoser JWT Endpoints](https://djoser.readthedocs.io/en/latest/base_endpoints.html#user-create)

#### Build, file package.json

By adding this line of code, We do not need
to copy build from frontend and then
past in the backend folder.

_Note:_ This code is only works in window
for mac you can search on Google/StackOverFlow.

    "build": "rm -rf ../backend/build && react-scripts ../backend/build && cp -r build ../backend/build",

By default, it should like this in `package.json` file

       "build": "react-scripts build",

### Backend Django Settings.py

Need to include these following code in the **`settings.py`**.

    INSTALLED_APPS = [
        ....
        'rest_framework',
        'rest_framework.authtoken',
        'corsheaders', 
        'djoser',
        ....
    ]

Build we will get from _React Frontend_

    TEMPLATES = [
        {
        ......
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        .....
        },
    ]

**Email**

    EMAIL_BACKEND = 'django.core.mail.backends.smpt.EmailBackend'
    EMAIL_HOST = 'smpt.gmail.com'
    EMAIL_PORT = 587
    EMAIL_HOST_USER = 'mt8000045@gmail.com'
    EMAIL_HOST_PASSWORD = 'dvtrvsrcelhkjiqd'
    EMAIL_USE_TLS = True

In google gmail need to turn on two-step verification so able to send email to users.
Need to get _EMAIL_HOST_PASSWORD_ from google account.


[Google Account](https://myaccount.google.com/security)

**DRF and Djoser Settings**

    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': [
           'rest_framework.permissions.IsAuthenticated',
        ],
       'DEFAULT_AUTHENTICATION_CLASSES': (
           'rest_framework_simplejwt.authentication.JWTAuthentication',
       ),
    }

### JWT (Json Web Tokens)

**[JWT Docs](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html)**

    SIMPLE_JWT = {
        'AUTH_HEADER_TYPES': ('JWT',),

         # If in this period of time, user refresh page
         # he will remain login

        'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
        'REFRESH_TOKEN_LIFETIME': timedelta(days=1),

        'ROTATE_REFRESH_TOKENS': False,
        'BLACKLIST_AFTER_ROTATION':  False
    }

### Djoser

**[Djoser Docs](https://djoser.readthedocs.io/en/latest/settings.html)**

    DJOSER = {

    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'SEND_CONFIRMATION_EMAIL': True,
    'SEND_USERNAME_RETYPE': True,
    'SET_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,

    # 'SOCIAL_AUTH_TOKEN_STRATEGY': 'djoser.social.token.jwt.TokenStrategy',
    # 'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': ['http://localhost:8000/google',
                                        'http://localhost:8000/facebook'],
    'SERIALIZERS': {
        'user_create': 'accounts.serializers.UserCreateSerializer',
        'user': 'accounts.serializers.UserCreateSerializer',
        'current_user': 'accounts.serializers.UserCreateSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
        }
    }

#### Custom User Model

    AUTH_USER_MODEL = "accounts.UserAccount"

In `models.py` created a custom model for
user and then need to let the django to know 
the model s

### Backend Django Urls.py

Need to include the following code in the **`backend/urls.py`**.

    from django.urls import path, include, re_path

    # need for frontend react
    from django.views.generic import TemplateView

    urlpatterns = [
        path('auth/', include('djoser.urls')),
        path('auth/', include('djoser.urls.jwt')),

        path('admin/', admin.site.urls),
    ]
    urlpatterns += [re_path(r'.*', TemplateView.as_view(template_name='index.html'))]

As we know that React frontend have root `index.html` file.
So, we need to add template_name index.html.



#### YT Tutorial

Following this tutorial
series [Django & React JWT auth](https://youtube.com/playlist?list=PLJRGQoqpRwdfoa9591BcUS6NmMpZcvFsM)


### Errors in Axios

[Errors with Axios](https://stackabuse.com/handling-errors-with-axios/)

### Errors Handling

[Error Handing with React & Redux](https://www.pluralsight.com/guides/centralized-error-handing-with-react-and-redux)

[Error Handling](https://alexandrempsantos.com/sane-error-handling-react-redux/#before---the-default-way)
