![image](https://github.com/user-attachments/assets/27a742f6-b93d-485a-b9bb-e39945261476)
# U:Mate

***
## 1. Project Overview (프로젝트 개요)

본 프로젝트는 URECA의 종합 프로젝트로, 여AI챗봇기반 통신사 요금제 추천 및 관리 서비스을 개발하는 것을 목표로 합니다.  
AI챗봇과 **요금제 조회·비교·리뷰 기능을 통해 합리적인 선택**을 돕고, **디지털 취약 계층(시니어)**도 쉽게 이용할 수 있도록 접근성과 편의성을 강화하는 것이 목적입니다.

- 🔹 프로젝트명: U:Mate
  <aside>
👭 **U:Mate (유메이트)**
- **뜻**: LG **U+** + **Mate (친구, 도우미)**
- **의미**: 모든 세대의 디지털 친구, 사용자 맞춤 요금제 도우미
- *"U+의 모든 세대의 메이트가 되겠습니다"*
</aside>
- 🔹 프로젝트 기간: 2025.06.02 ~ 2025.06.27 (3주)
- 🔹 개발 인원: 김민석, 김현우B, 백세진, 염승아, 이승우
- 🔹 주요 목표: 디지털 취약 계층(시니어)도 쉽게 요금제 서비스를 이용할 수 있도록 접근성과 편의성을 강화하는 것이 목표

## 2. Service Introduction (서비스 소개)
#### [URECA] Mini Project  김민석, 김현우B, 백세진, 염승아, 이승우
U:Mate는 LG U+가 제공하는 AI 챗봇 기반 요금제 추천 및 관리 서비스입니다.사용자의 통신 사용 패턴을 분석해 가장 적합한 요금제를 찾아주고,
요금제 조회, 비교, 리뷰까지 한눈에 확인할 수 있도록 도와드립니다.
특히 디지털에 익숙하지 않은 시니어 세대도 쉽게 사용할 수 있도록간편한 인터페이스와 음성 기반 안내 기능도 함께 제공합니다.
***

## 3.U:Mate에 대해 더 알아보고 싶다면?
#### U:Mate : [U:Mate 보러가기](https://umate.vercel.app/)
#### BackEnd : [백엔드 보러가기](https://github.com/U-Mate/back)
#### Notion : [노션 보러가기](https://www.notion.so/U-Mate-220101197f7080d58047d933367c231d)

## 4. 기술 스택
개발환경 :<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" />  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white" /> </br>
프레임워크 :<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" /> </br>
상태관리 :<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white" /></br>
스타일링 :<img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /> </br>
데이터베이스 :<img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" /> </br>
협업 도구 :<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" /> <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" /> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" /> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
## 5. ✨Key Features(주요 기능)✨
1. 챗봇 기반 요금제 추천
+ 사용자의 요금제 이용 이력, 회원 정보, 대화 내용, 음성/텍스트 입력을 종합적으로 분석하여 최적의 요금제를 추천합니다.
+ 대화형 인터페이스를 통해 복잡한 조건 없이 자연스럽게 요금제를 탐색할 수 있습니다.
+ 시니어 사용자를 위한 음성 입력 지원 강화
  + 음성으로 쉽게 질문하고 답변받을 수 있어, 타이핑에 익숙하지 않은 사용자도 손쉽게 이용 가능합니다.
+ 개인화 추천 강화
  + 로그인 상태에서는 사용자의 이전 대화 기록과 프로필 정보(나이,사용중인 요금제 등)를 기반으로 더 정교한 요금제를 추천합니다.
  비로그인 상태에서는 세션 기반 저장을 통해, 페이지를 닫지 않는 한 이전 대화 흐름을 유지할 수 있습니다.

2. 디지털 취약 계층(시니어)을 위한 전용 페이지(바로가기 페이지)
+ 시니어 사용자의 접근성과 사용성을 고려한 별도 바로가기 페이지를 구현하였습니다.
+ 필수 기능만을 큼직한 버튼으로 구성, 한눈에 보기 쉽고 조작이 편리합니다.
+ 복잡한 기존 통신사 사이트 구조와 차별화된 심플하고 직관적인 인터페이스 제공을 통해 시니어도 쉽게 주요기능에 접근 가능합니다.

3. 요금제별 사용자 리뷰 시스템
+ 요금제별로 사용자가 직접 리뷰 및 별점을 남길 수 있습니다.
+ CRUD 기능 지원: 생성(Create), 조회(Read), 수정(Update), 삭제(Delete)
+ 다른 사용자의 리뷰를 통해 실제 사용 경험 기반의 신뢰도 높은 정보 제공합니다.

4. 챗봇 만족도 조사 기능
+ 사용자는 챗봇 대화가 끝난 뒤 만족도 평가 및 피드백 제출이 가능합니다.
+ 피드백은 챗봇 개선 및 추천 알고리즘 고도화에 반영됩니다.

5. 요금제 목록 페이지
+ 약 50여 개의 요금제를 다양한 필터(연령, 가격, 데이터, 음성, 혜택 등) 를 통해 탐색할 수 있습니다.
+ 사용자의 조건에 맞는 요금제를 쉽고 빠르게 찾을 수 있도록 지원합니다.

6. 요금제 비교 분석 기능
+ 2개 이상의 요금제를 선택하여 주요 항목(데이터, 음성, 영상, 혜택 등) 을 표 형태로 직관적으로 비교할 수 있습니다.
+ 사용자가 현재 이용 중인 요금제는 자동으로 ‘요금제 1’ 위치에, 비교 대상은 **‘요금제 2’**에 배치됩니다.
+ 차이가 있는 항목은 컬러로 강조하여 차이점을 한눈에 파악할 수 있도록 시각적으로 설계하였습니다.
+ 복잡한 정보 없이, 실질적인 차이만 쉽게 확인할 수 있도록 구성되어 있습니다.

7. 회원가입 및 로그인 기능
+ JWT 기반 로그인 구현으로 사용자 인증 상태를 안전하게 유지합니다.
+ 로그인 시 서버에서 암호화된 JWT 토큰을 발급하고, 클라이언트는 이를 저장해 인증 요청에 사용합니다.
+ CSRF 토큰을 함께 적용하여 이중 보안 체계를 갖췄습니다.
+ 로그인 시 이메일 인증 완료 여부를 검증하여, 인증되지 않은 계정의 접근을 차단합니다.
+ 로그인된 사용자는 이전 챗봇 대화 기록 및 개인화된 요금제 추천 기능을 이용할 수 있습니다

## 6.Team Members (팀원 소개)
<table>
  <tbody>
    <tr> 
      <td align="center"><a href=""><img src="https://avatars.githubusercontent.com/u/144529720?v=4" width="100px" alt=""/><br /><sub><b>김현우(팀장)</b></sub></a><br /></td>
       <td align="center"><a href=""><img src="https://avatars.githubusercontent.com/u/84384915?v=4"width="100px;" alt=""/><br /><sub><b>김민석</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="https://avatars.githubusercontent.com/u/196058650?v=4"width="100px;" alt=""/><br /><sub><b>백세진</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="https://avatars.githubusercontent.com/u/75061562?v=4" width="100px;" alt=""/><br /><sub><b>염승아</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="https://avatars.githubusercontent.com/u/196058650?v=4" width="100px;" alt=""/><br /><sub><b>이승우</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

## 7.주요 화면 
<h3 align="center">📱 주요 화면 미리보기</h3>
<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/c916d99f-1c34-4e95-8d01-52a231467189" height="400" /><br />
      <sub>📍첫 사용자들을 위한 온보딩 </sub>
    </td>
    <td align="center" >
      <img src="https://github.com/user-attachments/assets/1da6e60d-e8ae-4e91-bb7b-fa42efc191f0" height="400" /><br />
      <sub>🎉 디지털 취약 계층을 위한 바로가기 페이지</sub>
    </td>
    <td align ="center">
      <img src="https://github.com/user-attachments/assets/fb480c36-f885-4589-9a60-247964a2ae7a" height="400" /><br />
      <sub>🔐요금제 페이지 필터링 기능 </sub>
    </td>
     <td align ="center">
      <img src="https://github.com/user-attachments/assets/9a477470-88c0-4fa9-9cb3-d86effdc5389" height="400" /><br />
      <sub>🔐요금제 비교 기능 </sub>
    </td>
  </tr>
  <tr>
    <td align="center" >
      <img src="https://github.com/user-attachments/assets/ab45db0a-e6a7-42e2-9887-f69c3431629a" height="400" /><br />
      <sub>🗺️ 리뷰 작성 기능 </sub>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/affe234d-1b66-4658-a439-fab61cdb0e54" height="400" /><br />
      <sub>📆 리뷰 수정 및 삭제 기능 </sub>
    </td>
    <td align="center" >
      <img src="https://github.com/user-attachments/assets/303db2e5-96ae-433b-826b-164d036e7f52" height="400" /><br />
      <sub>👤챗봇 개인화 대화 기능</sub>
    </td>
     <td align ="center">
      <img src="https://github.com/user-attachments/assets/62db3362-8d09-47d6-97b4-94e3753e975d" height="400" /><br />
      <sub>🔐챗봇 만족도 조사 기능</sub>
    </td>
  </tr>
</table>

## 8. 🛠 트러블슈팅 & 개선 사례
#### 🔧 1. 리뷰작성자 탈퇴 시 리뷰 신뢰성 문제
📌 문제
리뷰를 기반으로 각 나이대에 맞는 요금제를 추천하고 있으나, 사용자가 탈퇴할 경우 개인정보 보호를 위해 생년월일이 완전히 삭제되어 나이대 정보가 사라짐. 이로 인해 리뷰의 신뢰성과 통계 기반 추천의 정확도가 저하되는 문제가 발생함.

✅ 해결
사용자의 생년월일 중 연도 정보만 별도로 보존하여 개인정보 보호 원칙을 지키면서도 최소한의 나이대 분석이 가능하도록 개선함.

🎯 효과
+ 탈퇴 이후에도 연령대 기반 통계 유지 가능
+ 요금제 추천을 위한 리뷰 신뢰성 향상
+ 개인정보 보호와 데이터 활용 간의 균형 확보
#### 🚨 2. OpenAI Real-Time API 한국어 호환 문제
📌 문제
OpenAI의 Real-Time API를 활용하여 음성 기반의 한국어 대화 기능을 구현하고자 하였으나, 한국어의 음성 인식 및 합성 품질이 충분히 안정적이지 않아 실제 사용자 환경에서는 자연스러운 대화 흐름이 어렵고 실사용이 불가능한 수준임.
✅ 해결
보다 안정적인 Speech Synthesis API 및 Web Speech API를 활용하여 브라우저 기반 음성 입출력 기능으로 대체함. 특히 한국어 인식률이 높은 브라우저 환경에 최적화된 방식으로 구성.
🎯 효과
+ 보다 안정적인 한국어 음성 입출력 환경 확보
+ 실사용 가능 수준의 자연스러운 대화 흐름 구현
+ 외부 API의 제약 없이 브라우저에서 직접 동작 가능하여 확장성 및 유지보수 용이


#### 🌐 3. 사용자 대상 구체화
📌 문제
디지털 취약 계층도 쉽게 사용할 수 있도록 접근성과 편의성을 고려한 설계를 시도했으나, 디지털 취약 계층이라는 개념이 포괄적이어서 어떤 사용자를 중심으로 설계할 것인지가 불분명했고, 이로 인해 기능 범위 확정과 UI/UX 방향성 설정에 어려움이 있었음.
✅ 해결
디지털 취약 계층 중 '시니어 사용자'로 대상을 구체화
시니어 기기의 ‘큰 글씨 보기’ 기능에 대응하기 위해 폰트 단위를 px에서 rem으로 일괄 변경
바로가기 페이지 및 온보딩 절차 제공으로 초기 진입 장벽 완화
음성 지원 기능 추가로 텍스트 입력에 대한 부담 최소화

🎯 효과
+ 대상 사용자에 특화된 UI/UX 설계 가능
+ 고령 사용자도 별도 학습 없이 쉽게 이용 가능
+ 접근성·편의성 모두 확보하여 실질적인 사용자 경험 개선


## 9. Development Workflow (개발 워크플로우)
### 브랜치 전략
| 커밋 유형 | 의미 |
| --- | --- |
| `Feat` | 새로운 기능 추가 |
| `Fix` | 버그 수정 |
| `Docs` | 문서 수정 |
| `Style` | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| `Refactor` | 코드 리팩토링 |
| `Test` | 테스트 코드, 리팩토링 테스트 코드 추가 |
| `Chore` | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
| `Design` | CSS 등 사용자 UI 디자인 변경 |
| `Comment` | 필요한 주석 추가 및 변경 |
| `Rename` | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
| `Remove` | 파일을 삭제하는 작업만 수행한 경우 |
| `!BREAKING CHANGE` | 커다란 API 변경의 경우 |
| `!HOTFIX` | 급하게 치명적인 버그를 고쳐야 하는 경우 |

#### main 브랜치는 배포 가능한 최신 상태를 유지하고 기능 개발이나 버그 수정은 별도의 브랜치에서 작업한 후, 
#### 리뷰를 거쳐 main 브랜치에 Merge 하는 방식으로 진행 하였습니다.

### Prettier
```
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```
## 수행절차 로드맵
![image](https://github.com/user-attachments/assets/6bd48961-d668-4af7-81dc-0a80b1927dcb)

## 테이블 구조
![image](https://github.com/user-attachments/assets/846eeb59-7931-4e02-8cf5-a874db37cb47)

## 개발과정 기록
1. 안내페이지 경연대회
서비스 초기 진입 시 사용자에게 정보를 효과적으로 전달하기 위해 안내 페이지 디자인을 다양하게 시도하였으며, 이를 내부 경연 방식으로 구성하여 가장 효과적인 시안을 선정하였습니다.
시안 비교를 통해 UX 직관성, 색상 대비, 정보 전달력 등을 평가
사용자의 첫인상과 클릭 유도 효과 분석

2. 공통 컴포넌트 분류
프로젝트의 유지보수성과 일관된 UI/UX를 위해 컴포넌트 분류 작업을 체계적으로 정리하였습니다.
공통 요소 분리 및 정리(버튼, 카드, 리스트 등)
작업 우선순위 및 사용 페이지 명세를 문서화하여 협업 효율성 강화

3. 요금제 상세페이지 경연대회
요금제 페이지는 사용자의 서비스 선택에 직접적인 영향을 미치는 핵심 콘텐츠로, 다양한 레이아웃 및 가격 강조 방식을 시도하였습니다.
가격 강조 및 혜택 정보의 시각적 전달력 평가
내부 피드백을 통해 가장 사용자 친화적인 구조 선정

4. 스토리 포인트 설계
프로젝트 개발 과정에서는 각 작업 항목별로 난이도와 소요 시간을 정량적으로 추정하기 위해 스토리 포인트 방식을 도입하였습니다.
모든 팀원이 각 작업에 대해 난이도 점수를 투표하여 스토리 포인트를 산정
이를 통해 작업량을 균등하게 배분하고, 특정 인원에게 부담이 쏠리지 않도록 조율
팀 전체의 **작업 속도(Velocity)**를 추적하며 주차별 일정 조정 및 리소스 계획에 활용
스프린트 회고 시 실제 소요 시간과 비교하여 예측 정확도 개선
이 방식은 개발 과정의 투명성, 공정성, 협업 효율성을 동시에 향상시키는 데 기여하였습니다.

![image](https://github.com/user-attachments/assets/ee06dd49-09c8-43e9-9a8c-8088abea37e8)


## 개선 목표
1. 리뷰 유도 강화
사용자에게 요금제 이용 후 리뷰를 작성하도록 유도
요금제 변경 시점에 맞춘 리마인드 리뷰 요청 팝업 또는 배너 제공
리뷰 작성 시 포인트 또는 혜택 제공 이벤트와 연계

2. 만족도 조사 및 피드백 수집
간단한 별점 평가 + 주관식 의견을 통해 정성·정량 데이터 동시 수집
설문 응답자에게 이벤트 참여 기회 제공으로 참여율 제고
사용자 유형별 만족도 분석을 통해 요금제 개선 및 개인화 추천에 활용

3. 즐겨찾기 기능 도입
자주 사용하는 요금제나 스토리 카드를 즐겨찾기로 저장 가능하도록 구현
즐겨찾기 기반 빠른 접근 UI 제공으로 사용자 편의성 향상

5. 챗봇 시각화 및 사용자 경험 강화
챗봇 UI를 더 직관적이고 친근한 그래픽 기반 인터페이스로 개선
상황별 추천 카드, 음성 입출력, 애니메이션 반응 등 시각적 피드백 추가
시니어 사용자 등 디지털 취약계층도 쉽게 사용할 수 있도록 접근성 최적화

## 프로젝트 소감
좋은 팀원들분과 많은 소통을 하며 소통의 중요성을 다시한번 느꼇고 챗봇을 활용한 프로젝트가  좋은 경험이 되었습니다. 
