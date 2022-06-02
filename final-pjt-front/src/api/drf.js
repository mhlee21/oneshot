const HOST = 'http://localhost:8000/api/v1/'
// const HOST = 'https://one-shot.link/api/v1/'
// const HOST = 'https://one-shot-api.link/api/v1/'

const MOVIES = 'movies/'
const SHOTS = 'shots/'
const COMMENTS = 'comments/'
const ACCOUNTS = 'accounts/'

export default {
  
  movies: {
    // 인기있는 영화
    popular: pageNum => HOST + MOVIES + 'popular/' + `${pageNum}/`,
    //실시간 영화 순위
    nowPlaying: pageNum => HOST + MOVIES + 'now_playing/' + `${pageNum}/`,
    // 평점 기반 영화 추천
    myMovies: () => HOST + MOVIES + 'my_movies/',
    // shotest
    shotest: () => HOST + MOVIES + 'shotest/',
    // 영화 예고편
    movieTrailer: () => HOST + MOVIES + 'movie_trailer/',
    // 영화 상세
    movie: moviePk => HOST + MOVIES + `${moviePk}/`,
    // 영화 검색 및 기본 조회
    movies: pageNum => HOST + MOVIES + 'search/' + `${pageNum}/`,
    // 영화 좋아요
    likeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'likes/',
    // 댓글 생성
    comments: moviePk => HOST + MOVIES + `${moviePk}/` + COMMENTS,
    // 댓글 수정 및 삭제
    comment: (moviePk, commentPk) =>
      HOST + MOVIES + `${moviePk}/` + COMMENTS + `${commentPk}/`,
    // 별점 생성 및 삭제
    starRating: (moviePk) =>
      HOST + MOVIES + `${moviePk}/` + 'star_rating/',
    //영화 이름
    movieTitle: () => HOST + MOVIES + 'movie_title/',
  },
  shots: {
    // 전체 shot 조회
    shots: pageNum => HOST + SHOTS + 'page/' + `${pageNum}/`,
    //shot 생성
    shotCreate: () => HOST + SHOTS,
    // 단일 shot 상세 조회, 수정 및 삭제
    shotDetail: shotPk => HOST + SHOTS + 'detail/' + `${shotPk}/`,
    // 단일 shot 상세 조회, 수정 및 삭제
    shot: shotPk => HOST + SHOTS + `${shotPk}/`,
    // 좋아요 기능
    likeShot: shotPk => HOST + SHOTS + `${shotPk}/` + 'likes/',
    // 댓글 생성
    comments: shotPk => HOST + SHOTS + `${shotPk}/` + COMMENTS,
    // 댓글 수정 및 삭제
    comment: (shotPk, commentPk) =>
      HOST + SHOTS + `${shotPk}/` + COMMENTS + `${commentPk}/`,
  },
  accounts: {
    // 로그인
    login: () => HOST + ACCOUNTS + 'login/',
    // 로그아웃
    logout: () => HOST + ACCOUNTS + 'logout/',
    // 회원가입
    signup: () => HOST + ACCOUNTS + 'signup/',
    // Token 으로 현재 user 판단
    currentUserInfo: () => HOST + ACCOUNTS + 'user/',
    // username으로 프로필 제공
    profile: username => HOST + ACCOUNTS + 'profile/' + `${username}/`,
    //팔로우 추가 및 취소
    follow: userPk => HOST + ACCOUNTS + `${userPk}/` + 'follow/',
    // 소셜 로그인
    socialLogin: site => HOST + ACCOUNTS + `${site}/` +'login/',
  },
}
