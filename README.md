# Youtube Clone Coding Project

NodeJS, Express, MongoDB를 활용하여 유튜브 웹사이트를 클론코딩 하였습니다.(디자인은 제외)

<br/>

> 기술스택: HTML5, CSS3, JS(ES6+), WebAPIs, Node.js, Express.js, MongoDB<br/>
> 이론: MVC, Routing, Templates, Models<br/><br/>
> 구현 기능: 
>   >유저: User Authentication, Github Login, User Profile, Log In, Log Out<br/>
>   >비디오: Video Upload, Video Recording, Search Video, Comment, View Count<br/>
>   >배포: Heroku, S3 Upload, Mongo Atlas<br/>


<br/>

### Home

업로드 된 비디오 목록을 확인 할 수 있습니다. 

<img width="800" alt="wetube_home-min" src="https://user-images.githubusercontent.com/56289900/144786291-ab4d854b-66bf-4d14-9ea6-c271b7095f5b.PNG">

<br/>

### Join

회원가입을 할 수 있는 페이지 입니다. MongoDB와 연결되어 유저 정보를 저장합니다. 

<img width="800" alt="wetube_join-min" src="https://user-images.githubusercontent.com/56289900/144786293-b1c615d1-1b21-45a8-9e0a-8834637c80a4.PNG">

<br/>

### Login

로그인 페이지 입니다. 세션을 활용하여 세션ID로 유저를 판독합니다. 깃허브아이디로 소셜 로그인 기능도 구현하였습니다. 

<img width="800" alt="wetube_login-min" src="https://user-images.githubusercontent.com/56289900/144786296-122172a3-1caa-4aaf-9065-3344c72bab9f.PNG">

<br/>

### After Login

로그인 한 뒤의 웹사이트 모습입니다. 비디오 업로드, 프로필 수정과 같이 유저 권한이 있는 사람에게 기능을 보여주었습니다. 

<img width="800" alt="wetube_after-login-min" src="https://user-images.githubusercontent.com/56289900/144786308-8fc4450f-22cc-43ed-bbe1-9488cd4f42e3.PNG">

<br/>

### Edit Profile

프로필 정보를 수정하는 페이지 입니다. 로그인 한 유저 정보를 가지고 와서 유저정보를 수정하여 다시 MongoDB로 저장합니다. 

<img width="800" alt="wetube_edit-profile-min" src="https://user-images.githubusercontent.com/56289900/144786290-4d304edd-e371-433b-b780-13ced4411274.PNG">

<br/>

### Upload Video

PC에 연결된 카메라를 활용하여 비디오를 촬영하고, 다운로드를 받아 비디오를 업로드 할 수 있는 페이지 입니다. 

<img width="800" alt="wetube_upload-video-min" src="https://user-images.githubusercontent.com/56289900/144786300-c5d30000-a7a5-4294-9079-bb26d82492a5.PNG">

<br/>

### Update Video

비디오에 대한 정보를 수정할 수 있는 페이지 입니다. 비디오 설명, 해쉬테그 등을 수정할 수 있습니다.  

<img width="800" alt="wetube_update-video-min" src="https://user-images.githubusercontent.com/56289900/144786299-fcb8730d-d427-44f1-9a08-bdd16a10b687.PNG">

<br/>

### Delete Video

비디오를 삭제하는 기능입니다. 해당 비디오ID를 찾아서 DB에서 삭제합니다. 

<img width="454" alt="wetube_editAndDeleteVideo-min" src="https://user-images.githubusercontent.com/56289900/144786288-3abfab85-6a8e-4437-a201-887c794e4893.PNG">

<br/>

### Watch and Comment 

비디오 플레이어를 WebAPIs를 활용하여 직접 만들었고, 해당 비디오에 댓글 추가 삭제 기능을 추가하였습니다. 

<img width="800" alt="wetube_watchAndComment-min" src="https://user-images.githubusercontent.com/56289900/144786306-c7fec17b-2deb-4c49-8498-b6ee5a6967c2.PNG">

<br/>

### Video Search

비디오 제목을 검색하여 해당하는 비디오를 DB에서 검색하여 보여줍니다. 

<img width="800" alt="wetube_search-min" src="https://user-images.githubusercontent.com/56289900/144786298-b69a3468-f3e6-4a34-a039-a4f2343adf00.PNG">

링크주소: <a href="https://wantube.herokuapp.com/" target="_blank">유튜브 웹사이트 보러가기</a>
