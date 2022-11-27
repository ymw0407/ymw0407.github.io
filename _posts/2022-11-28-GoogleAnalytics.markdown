---
layout: post
title: 유레카 프로젝트 - Google Analytics
date: 2022-11-14 02:56:00 +0900
description: Jekyll # Add post description (optional)
img: analytics/analytics6.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [유레카 프로젝트, DEVELOP]
---

## Google Analytics
구글 애널리틱스는 현재 구글 마케팅 플랫폼 브랜드 내의 플랫폼으로서, 웹사이트 트래픽을 추적하고 보고하는 구글이 제공하는 웹 애널리틱스 서비스라고 합니다.<br>
어쩌다보니 구글링을 하다가 아는 선배의 velog가 맨 첫 페이지에 뜨는 것을 보고 웹사이트 트래픽을 늘리는 방법에 대해서 생각하게 되었고 이에 따라 웹사이트 트래픽을 확인할 수 있는 기능을 추가할 수 있다는 것에 호기심이 가서 추가를 해보기로 했다. (물론 추가 점수 때문도 없지 않아 있지만 나는 계속해서 작성할 것이기 때문에 분명 언젠간 넣었을 것이다 ㅎㅎ)

## Google Analytics 추가하는 방법
우선 Jekyll 블로그 테마에 따라서 할 수 있는 방법이 달라지지만, 결론적으론 한 가지 코드를 추가하는 것으로 귀결되기 때문에, 그 방법에 대해서 쓸 것이다.

1. Google Analytics에 접속하고 계정을 만든다. <br>
    [링크](https://analytics.google.com/analytics/web/#/) <br><br>
2. Google Analytics 관리(⚙️) -> 속성 -> 데이터 스트림 <br>
    <img src='{{ "/assets/img/" | prepend: site.baseurl | append : "analytics/analytics1.png"}}'><br><br>
3. Google Analytics 웹 유형으로 데이터 스트림 추가 <br>
    <img src='{{ "/assets/img/" | prepend: site.baseurl | append : "analytics/analytics2.png"}}'><br><br>
4. 스트림 설정, 웹사이트 URL에 다음과 같은 형태로 작성, 스트림 이름은 표기되는 이름으로 마음대로...
    <img src='{{ "/assets/img/" | prepend: site.baseurl | append : "analytics/analytics3.png"}}'><br><br>
5. 해당 스트림에 들어가서 태그 안내 보기 클릭
    <img src='{{ "/assets/img/" | prepend: site.baseurl | append : "analytics/analytics4.png"}}'><br><br>
6. 직접 설치 -> 수동으로 Google 태그 설치 코드 복사
    <img src='{{ "/assets/img/" | prepend: site.baseurl | append : "analytics/analytics5.png"}}'><br><br>
7. 자신의 _includes/head.html이나 _layouts/default.html 등 \<head>태그에 복사한 것을 붙여넣으면 됩니다. <br><br>

## 결과
보고서 -> 실시간에서 다음과 같은 결과를 볼 수 있습니다.
<img src='{{ "/assets/img/" | prepend: site.baseurl | append : "analytics/analytics6.png"}}'>
