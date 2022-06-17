<div align = "center">

  # Affluent-Closet
  
  👉<a href="https://affluent-closet.netlify.app/">쇼핑몰 바로가기</a>👈
 
</div>

## 프로젝트 설명

무신사나 29cm 스타일쉐어 같은 쇼핑몰 프로젝트를 벤치마킹해서 직접 우리손으로 쇼핑몰을 만들어 보고 나중에 
기회가 된다면 운영까지 해보고 싶어 개발하였습니다.


## 핵심기능 💻

* jwt를 이용한 로그인 기능
* nodeMailer 를 이용한 회원가입 이메일 인증 이메일 전송 기능
* 상품, 유저, 리뷰 등등 crud
* 토스 api를 이용한 결제 기능
* AWS S3를 이용한 이미지 업로드 기능


## 기술 스택

* NestJS
* TypeOrm
* Postgres DB
* AWS S3
* Heroku
* Typescript

## 데이터베이스 ERD

<img width="644" alt="스크린샷 2022-06-17 오후 3 38 50" src="https://user-images.githubusercontent.com/67010993/174240464-55a3e7e2-5f86-470b-94ce-b46fd7c37684.png">

## 프로젝트를 통해 배운점

* NestJS 처음 사용해 봤습니다. NestJS <a href="https://wikidocs.net/book/7059">NestJS로 배우는 벡엔드 프로그래밍</a> 전자책을 보고 따라하면서 모르는 게 생기면 <a href="https://docs.nestjs.com/">NestJS 공식문서</a>를 찾아보거나 velog, stackoverflow 등등 구글링을 통해 공부하였습니다.
* 또한, TypeOrm 을 처음 사용해 봤습니다. 이전에는 MongoDB만 사용해보고 RDB 자체를 처음 사용해보았기 때문에  상당히 애를 먹었습니다. 프로젝트를 하면서 기본적인 SQL 문법과 RDS는 무엇이고 ORM은 무엇인지에 대해 알게되었습니다.
* 배포환경에서 개발 할 수 있게 되었습니다. Heroku와 AWS S3를 이용해서 배포환경과 로컬환경은 어떻게 다른지를 알게 되었습니다. 그리고 github와 heroku 연동을 해놓았는데, 이를 통해 git flow로 개발하다가 main 브렌치로 머지하면 자동으로 배포할 수 있게 되었습니다. 

